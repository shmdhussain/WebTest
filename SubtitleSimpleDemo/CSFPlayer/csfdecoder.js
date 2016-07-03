/**
 * Compact Subtitle Format Decoder
 *
 * This is a decoder for the Compact Subtitle Format (CSF).
 * Input is simply an ArrayBuffer containing the entire CSF file. Typically,
 * this would be obtained by downloading the file from a web server or loading
 * a local file.
 *
 * A new decoder instance automatically decodes the CSF header and index and
 * makes the header available through its 'header' property. Each one minute
 * block of subtitle commands is decoded only when explicitly requested, thus
 * avoiding the overhead of decoding the whole file unnecessarily.
 *
 * @author Roland Boorman
 * @version 1.0
 * @copyright Screen Systems 2013
 */

 
 /* jshint bitwise: false, globalstrict: true */
 'use strict';

/* used to choose the time source if required */ 


if (screenSystems === undefined) {
    /**
     * Namespace for all Screen Systems libraries.
     * @namespace
     */
    var screenSystems = {};
}

screenSystems.UseProgramDate = 'true';


/**
 * Creates a new CSF decoder. If successful, the decoded header is available
 * as the property 'header' on the new decoder instance.
 *
 * @constructor
 * @param {ArrayBuffer} csfBuffer - contains the entire CSF file
 * @throws {TypeError} if csf is not an ArrayBuffer
 * @throws {Error} if the file cannot be decoded
 */
screenSystems.CSFDecoder = function (csfBuffer) {
    if (!(csfBuffer instanceof ArrayBuffer))
        throw new TypeError('ArrayBuffer expected');

    this.csfBuffer = csfBuffer;
    this.csf = new Uint8Array(csfBuffer);
    this.decodeHeader();
    this.decodeIndex();
};


/**
 * Object type of decoder's 'header' property.
 *
 * @typedef CSFHeader
 * @type {object}
 * @property {number} startTime - start time of first block of subtitle commands,
 * in minutes from time 00:00:00 (always zero for VOD)
 * @property {number} numBlocks - number of one minute subtitle command blocks
 * @property {number} targetWidth - target frame width, in pixels
 * @property {number} targetHeight - target frame height, in pixels
 * @property {boolean} imageResize - true if the subtitle images must be scaled
 * to a specified size, false if their sizes are correct for the target frame
 * @property {string} imageTemplate - a string containing the URL pattern for
 * the subtitle image files. Contains "{%d}" or "{%0Nd}" (where N is a field width)
 * which must be replaced by an image number
 * @property {number} refreshInterval - for a live broadcast, specifies the
 * recommended interval, in seconds, for refreshing the local copy of the CSF file
 * from the server (zero for VOD)
 */


// Command codes. Note that ADD_NEXT_IMAGE is used in the file encoding but is
// always returned as ADD_IMAGE in a decoded command, with the implied next image
// number explicitly specified
/** @constant {number} CLEAR */
screenSystems.CSFDecoder.CLEAR = 0;
/** @constant {number} ADD_IMAGE */
screenSystems.CSFDecoder.ADD_IMAGE = 1;
/**
 * @private
 * @constant {number} ADD_NEXT_IMAGE
 */
screenSystems.CSFDecoder.ADD_NEXT_IMAGE = 2;


/**
 * Data returned by the command decoder. Position and size are in target frame
 * coordinates. A CLEAR command only has the properties 'time' and 'command',
 * while ADD_IMAGE has all properties listed here.
 *
 * @typedef CSFCommand
 * @type {object}
 * @property {number} time - the time at which the command is to be executed,
 * in 10 ms units measured from the start time of the one minute block
 * containing the command
 * @property {number} cmdType - command type (CLEAR or ADD_IMAGE)
 * @property {number} imageNum - image number
 * @property {number} centreOffset - X offset from centre of frame, in pixels
 * @property {number} bottomOffset - Y offset from bottom of frame, in pixels
 * @property {number} width - required image width in pixels or zero if image
 * is not to be resized
 * @property {number} height - required image height in pixels or zero if image
 * is not to be resized
 */
 
 
/**
 * Gets the decoded subtitle commands for a specified one minute block.
 *
 * @param {number} blockNum - the number of the block, where block zero is the
 * first block in the file
 * @returns {CSFCommand[]} a list containing the subtitle commands in time order
 * @throws {RangeError} if the block number is not in the range [0, header.numBlocks)
 * @throws {Error} if a command cannot be decoded
 */
screenSystems.CSFDecoder.prototype.getCommandsForBlock = function (blockNum) {
    if (blockNum < 0  ||  blockNum >= this.header.numBlocks)
        throw new RangeError('CSF block number out of range');

    var commands = [],
        command,
        offset = this.index[blockNum],
        endOffset = (blockNum < (this.index.length - 1)) ? this.index[blockNum + 1]
                                                         : this.indexOffset,
        varinfo = {};

    this.lastImageNum = -1;
    
    while (offset < endOffset)
    {
        command = this.decodeCommand(this.csf, offset, varinfo);
        commands.push(command);
        offset += varinfo.length;
    }

    return commands;
};


/**
 * Data returned by the variable length integer decoders.
 *
 * @private
 * @typedef Varinfo
 * @type {object}
 * @property {number} value - decoded value
 * @property {number} length - length of coded value in bytes
 */

 
/**
 * Decodes an unsigned variable length integer.
 *
 * @private
 * @param {Uint8Array} data - a byte array containing the coded value
 * @param {number} offset - the byte offset in 'data' of the coded value
 * @param {Varinfo} result - an object which receives the decoded value and
 * coded length
 * @throws {Error} if decoding runs off the end of the supplied data
 */
screenSystems.CSFDecoder.prototype.decodeUVInt = function (data, offset, result) {
    var code,
        shift = 0,
        length = 0,
        value = 0,
        MARKER = 0x80;
    
    do {
        if (offset >= data.length)
            throw new Error('CSF data truncated');

        code = data[offset++];
        value += (code & 0x7f) << shift;
        shift += 7;
        ++length;
    }
    while ((code & MARKER) !== 0);
    
    result.value = value;
    result.length = length;
};


/**
 * Decodes a signed variable length integer.
 *
 * @private
 * @param {Uint8Array} data - a byte array containing the coded value
 * @param {number} offset - the byte offset in 'data' of the coded value
 * @param {Varinfo} result - an object which receives the decoded value and
 * coded length
 * @throws {Error} if decoding runs off the end of the supplied data
 */
screenSystems.CSFDecoder.prototype.decodeSVInt = function (data, offset, result) {
    this.decodeUVInt(data, offset, result);
    
    if ((result.value & 1) === 0)
        result.value /= 2;
    else
        result.value = -((result.value + 1) / 2);
};


/**
 * Decodes a UTF-8 string. This version supports codes up to 16 bits and does
 * not reject surrogate values if encountered.
 *
 * @private
 * @param {Uint8Array} data - a byte array containing the coded string
 * @param {number} offset - the byte offset in 'data' of the coded string
 * @param {number} length - the length of the coded string in bytes
 * @returns {string} the decoded string
 * @throws {Error} if the coded string is not entirely within the array or
 * a coded value exceeds 16 bits
 */
screenSystems.CSFDecoder.prototype.decodeString = function (data, offset, length) {
    var endOffset = offset + length;

    if (endOffset > data.length)
        throw new Error('CSF string data truncated');

    var code,
        charVal,
        numExtra,
        chars = [],
        charNum = 0,
        i;
    
    while (offset < endOffset) {
        code = data[offset++];
        
        if ((code & 0x80) === 0) {
            // ASCII
            charVal = code;
            numExtra = 0;
        }
        else if ((code & 0xE0) === 0xC0) {
            // 11 bits in two bytes
            numExtra = 1;
        }
        else if ((code & 0xF0) === 0xE0) {
            // 16 bits in three bytes
            numExtra = 2;
        }
        else {
            throw new Error('Invalid or unsupported UTF-8 string');
        }
        
        if ((offset + numExtra) > endOffset)
            throw new Error('UTF-8 data truncated');
            
        for (i = 0; i < numExtra; i++) {
            code = data[offset++];
            
            if ((code & 0xC0) !== 0x80)
                throw new Error('Invalid UTF-8 continuation byte');
                
            charVal = (charVal << 6) + (code & 0x3F);
        }
        
        chars[charNum++] = charVal;
    }
    
    return String.fromCharCode.apply(null, chars);
};


/**
 * Decodes the CSF header from 'csf' into 'header'.
 *
 * @private
 * @throws {Error} if the header cannot be decoded
 */
screenSystems.CSFDecoder.prototype.decodeHeader = function() {
    this.header = {};
    var signature = this.decodeString(this.csf, 0, 4);
    
    if (signature !== 'CSF1')
        throw new Error('CSF signature mismatch');

    var offset = 4,
        varinfo = {};
    
    // Refresh interval
    this.decodeUVInt(this.csf, offset, varinfo);
    this.header.refreshInterval = varinfo.value;
    offset += varinfo.length;

    if (this.header.refreshInterval === 0)
    {
        screenSystems.UseProgramDate = 'false';
        this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
             'Subtitle source is NOT live - using player position');
    }
    else
    {
        screenSystems.UseProgramDate = 'true';
//        if (screenSystems.UseProgramDate === 'true')
//        {
//	    screenSystems.UseProgramDate = 'false';
//          this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
//             'Subtitle source is Live - using program date');
//        }
    }

    // Start time in one minute blocks
    this.decodeUVInt(this.csf, offset, varinfo);
    this.header.startTime = varinfo.value;
    offset += varinfo.length;

    // Number of one minute blocks
    this.decodeUVInt(this.csf, offset, varinfo);
    this.header.numBlocks = varinfo.value;
    offset += varinfo.length;
    
    // Target frame size
    this.decodeUVInt(this.csf, offset, varinfo);
    this.header.targetWidth = varinfo.value;
    offset += varinfo.length;
    this.decodeUVInt(this.csf, offset, varinfo);
    this.header.targetHeight = varinfo.value;
    offset += varinfo.length;
    
    // Image resize flag
    this.decodeUVInt(this.csf, offset, varinfo);
    this.header.imageResize = (varinfo.value !== 0);
    offset += varinfo.length;
    
    // Image URL template length
    this.decodeUVInt(this.csf, offset, varinfo);
    var templateLength = varinfo.value;
    offset += varinfo.length;
    
    // Image URL template
    this.header.imageTemplate = this.decodeString(this.csf, offset, templateLength);
    offset += templateLength;
    
    // Byte offset of index
    this.decodeUVInt(this.csf, offset, varinfo);
    this.indexOffset = varinfo.value;
};


/**
 * Decodes the CSF index from 'csf' into 'index'.
 *
 * @private
 * @throws {Error} if the index cannot be decoded
 */
screenSystems.CSFDecoder.prototype.decodeIndex = function() {
    this.index = [];
    var numBlocks = this.header.numBlocks,
        varinfo = {},
        offset = this.indexOffset,
        blockNum;
    
    for (blockNum = 0; blockNum < numBlocks; blockNum++)
    {
        this.decodeUVInt(this.csf, offset, varinfo);
        this.index[blockNum] = varinfo.value;
        offset += varinfo.length;
    }
};


/**
 * Decodes a subtitle command.
 *
 * @private
 * @param {Uint8Array} data - a byte array containing the coded command
 * @param {number} offset - the byte offset in 'data' of the coded command
 * @param {Varinfo} result - an object which receives the coded length
 * (the object's 'value' property is not set)
 * @returns {CSFCommand} the decoded command
 * @throws {Error} if the command cannot be decoded
 */
screenSystems.CSFDecoder.prototype.decodeCommand = function (data, offset, result) {
    var varinfo = {},
        curOffset = offset;

    this.decodeUVInt(data, curOffset, varinfo);
    var time = varinfo.value;
    curOffset += varinfo.length;
    
    this.decodeUVInt(data, curOffset, varinfo);
    var code = varinfo.value;
    curOffset += varinfo.length;
    
    if (code === screenSystems.CSFDecoder.CLEAR)
    {
        result.length = curOffset - offset;
        return { time: time, cmdType: code };
    }

    var imageNum;

    if (code === screenSystems.CSFDecoder.ADD_IMAGE)
    {
        // Image number is explicit
        this.decodeUVInt(data, curOffset, varinfo);
        imageNum = varinfo.value;
        curOffset += varinfo.length;
    }
    else if (code === screenSystems.CSFDecoder.ADD_NEXT_IMAGE)
    {
        // Image number is implicit
        if (this.lastImageNum >= 0)
            imageNum = this.lastImageNum + 1;
        else
            throw new Error('Add Next Image with no previous image number');
    }
    else
    {
        throw new Error('Invalid subtitle command code ' + code);
    }
    
    // Centre offset
    this.decodeSVInt(data, curOffset, varinfo);
    var centreOffset = varinfo.value;
    curOffset += varinfo.length;

    // Bottom offset
    this.decodeUVInt(data, curOffset, varinfo);
    var bottomOffset = varinfo.value;
    curOffset += varinfo.length;
    
    // Image dimensions (zero if no resizing)
    var width = 0, height = 0;
    
    if (this.header.imageResize)
    {
        this.decodeUVInt(data, curOffset, varinfo);
        width = varinfo.value;
        curOffset += varinfo.length;
        this.decodeUVInt(data, curOffset, varinfo);
        height = varinfo.value;
        curOffset += varinfo.length;
    }

    this.lastImageNum = imageNum;
    result.length = curOffset - offset;
    return { time: time, cmdType: screenSystems.CSFDecoder.ADD_IMAGE,
             imageNum: imageNum,
             centreOffset: centreOffset, bottomOffset: bottomOffset,
             width: width, height: height };
};






