/**
 * 'CSFSubtitler' objects handle the scheduling of subtitles for a VOD or live
 * video presentation. The scheduling information is contained in a Compact
 * Subtitle Format (CSF) file, downloaded from an HTTP server. The subtitles
 * themselves are in the form of images, downloaded as separate PNG files.
 *
 * The CSF file is downloaded once for VOD, but for live video, the file will
 * be updating regularly, so the download is repeated after a refresh interval
 * specified in the file header, this process continuing while the stream is
 * live.
 *
 * Subtitle images are downloaded when required, a few seconds in advance of
 * their on-air times. Images are passed to an application-supplied rendering
 * callback for display.
 *
 * The application must also supply a time source callback. For VOD, this simply
 * returns the current media position. For live, the value returned must be
 * derived from time references in the media stream. In both cases, these time
 * values will be on the same timescale as times in the CSF file and are used to
 * display and hide subtitle images at the correct times.
 *
 * Optionally, the subtitler can pass information and diagnostics to an
 * application-supplied logger callback.
 *
 * @author Roland Boorman
 * @version 1.0
 * @copyright Screen Systems 2013
 */

 

/* global console */ 
/* jshint globalstrict: true */
'use strict';
 
 
if (screenSystems === undefined) {
    /**
     * Namespace for all Screen Systems libraries.
     * @namespace
     */
    var screenSystems = {};
}


/**
 * Time source callback.
 *
 * @callback timeSourceCallback
 * @returns {number} current media time, in seconds
 */
 
/**
 * Renderer callback. In the case of a clear (<code>image</code> is null),
 * any further arguments are ignored. Images may be added cumulatively,
 * so when an image is displayed, any previously added images must still be
 * shown as well, until a clear occurs, when all images are removed from display.
 *
 * @callback rendererCallback
 * @param {Image} image - subtitle image to be displayed or null if display is
 * to be cleared
 * @param {number} imageWidth - required image width, in target frame pixels,
 * or zero if the intrinsic width of the image is to be used
 * @param {number} imageHeight - required image height, in target frame pixels,
 * or zero if the intrinsic height of the image is to be used
 * @param {number} centreOffset - X offset of the centre of the image from the
 * centre of the target frame, in target frame pixels (positive offset for
 * right of centre, negative offset for left of centre)
 * @param {number} bottomOffset - Y offset of the bottom of the image from the
 * bottom of the target frame, in target frame pixels (this value is always
 * specified as a non-negative distance)
 * @param {number} targetWidth - target frame width, in pixels
 * @param {number} targetHeight - target frame height, in pixels
 */
 
/**
 * Logger callback.
 *
 * @callback loggerCallback
 * @param {number} type - log message type
 * @param {string} message - text to be logged
 */
 
/**
 * Creates a new CSF subtitler.
 *
 * @constructor
 * @param {timeSourceCallback} timeSource - time source callback
 * @param {rendererCallback} renderer - image renderer callback
 * @param {loggerCallback} [logger] - logger callback
 */
screenSystems.CSFSubtitler = function (timeSource, renderer, logger) {
    this.timeSource = timeSource;
    this.renderer = renderer;
    this.logger = logger;
    this.imageCache = {};
    this.blockCache = {};
    this.onAirImageNums = [];

    this.lastOnairImageNum = 0;
    this.lastLoadedImageNum = 0;
    
    // Add the 'subtitleSource' property
    Object.defineProperty(this, 'subtitleSource', {
        set: function (source) { this.setSubtitleSource(source); },
        get: function () { return this.csfSource; }
    });
};

screenSystems.CSFSubtitler.iOS = 0;


/**
 * Logger message types.
 *
 * @enum {number}
 * @readonly
 */
screenSystems.CSFSubtitler.logType = {
    LOG_LOG: 1,
    LOG_INFO: 2,
    LOG_WARNING: 3,
    LOG_ERROR: 4,
    LOG_DEBUG: 5
};
    

/**
 * Sets the subtitle source.
 *
 * @private
 * @param {string} source - URL of subtitle CSF file or null to switch off
 * subtitles
 */
screenSystems.CSFSubtitler.prototype.setSubtitleSource = function (source) {
    this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
             'Subtitle source set to <' + source + '>');
             
    if (this.csfSource) {
        this.cancelCSFDownload();
        this.cancelScheduledCSFDownload();
        this.stopCueTimer();
        this.purgeImageCache();
        this.purgeBlockCache();
        this.renderer(null);
        this.onAirImageNums.length = 0;
    }

    this.csfSource = source;
    
    if (source)
        this.downloadCSF();
};


/**
 * Initiates download of the CSF file specified by 'csfSource'.
 * In live mode, the download will be repeated after an interval specified in
 * the CSF header, so we always have a recent version of the file.
 *
 * @private
 */
screenSystems.CSFSubtitler.prototype.downloadCSF = function () {
    var subtitler = this,
        xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE)
            subtitler.csfDownloadCompleted(xhr);
    };

    if (screenSystems.UseRand) {
        xhr.open('GET', this.csfSource + '?rand=' + Math.random());
    } else {
        xhr.open('GET', this.csfSource);
    }
    xhr.responseType = 'arraybuffer';
    this.csfRequest = xhr;
    xhr.send();
    this.csfRequest = xhr;
    this.log(screenSystems.CSFSubtitler.logType.LOG_LOG, 'CSF Download triggered');

};



/**
 * Initiates download an image file specified by 'url'.
 * completes by creating a 'DataURL' entry on the image.
 * and setting src to the 'DataURL' to decode height and width
 *
 * @private
 */
screenSystems.CSFSubtitler.prototype.loadImageFileAsURL = function(url, image){
    var xhr = new XMLHttpRequest();

    // carry image with it.
    image.orgurl = url;
    xhr.image = image;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE){
            var reader  = new FileReader();
            reader.onloadend = function () {
                image.DataURL = reader.result;
                // we need to decode now, as we need natural width and height
                image.src = image.DataURL;
            }
            reader.readAsDataURL(xhr.response);
	}
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
}



/**
 * Cancels the CSF download in progress, if any.
 *
 * @private
 */
screenSystems.CSFSubtitler.prototype.cancelCSFDownload = function () {
    if (this.csfRequest) {
        this.csfRequest.abort();
        this.csfRequest = null;
    }
};


/**
 * CSF MIME type.
 *
 * @private
 * @constant {string} CSF_MIME_TYPE
 */
screenSystems.CSFSubtitler.CSF_MIME_TYPE =
    'application/screen-compact-subtitle-format';

    
/**
 * Retry delay for failed CSF downloads, in milliseconds.
 *
 * @private
 * @constant {number} CSF_RETRY_DELAY
 */
screenSystems.CSFSubtitler.CSF_RETRY_DELAY = 3000;

    
/**
 * Handles CSF download completion.
 *
 * @private
 * @param {XMLHttpRequest} xhr - HTTP request object
 */
screenSystems.CSFSubtitler.prototype.csfDownloadCompleted = function (xhr) {
    var LOG = screenSystems.CSFSubtitler.logType.LOG_LOG,
        ERROR = screenSystems.CSFSubtitler.logType.LOG_ERROR;

    this.log(LOG, 'CSF Download COMPLETE');
    this.csfRequest = null;

    if (xhr.status !== 200) {
        this.log(ERROR,
                 'CSF download: unexpected HTTP status ' + xhr.status + ': ' +
                 xhr.statusText);
        this.scheduleCSFDownload(screenSystems.CSFSubtitler.CSF_RETRY_DELAY);
        return;
    }
    
    var contentType = xhr.getResponseHeader('Content-Type');
    
//    if (contentType !== screenSystems.CSFSubtitler.CSF_MIME_TYPE) {
//        this.log(ERROR, 'CSF download: wrong MIME type: ' + contentType);
//        return;
//    }
    
    var decoder;
    
    try {
        decoder = new screenSystems.CSFDecoder(xhr.response);
        this.log(LOG, 'CSF Decoder created (start:' + decoder.header.startTime + 'm interval:' + decoder.header.refreshInterval + 's numblocks:' + decoder.header.numBlocks + ')');
    }
    catch (err) {
        this.log(ERROR, 'CSF decode error: ' + err.message);
        this.scheduleCSFDownload(screenSystems.CSFSubtitler.CSF_RETRY_DELAY);
        return;
    }
   
    var imageTemplate = decoder.header.imageTemplate,
        leftBraceIndex = imageTemplate.lastIndexOf('{'),
        rightBraceIndex = imageTemplate.lastIndexOf('}');
        
    if (leftBraceIndex < 0  ||  rightBraceIndex < 0  ||
        (rightBraceIndex - leftBraceIndex) < 3  ||
        imageTemplate[leftBraceIndex + 1] !== '%'  ||
        imageTemplate[rightBraceIndex - 1] !== 'd') {
        this.log(ERROR, 'Invalid image template <' + imageTemplate + '>');
        this.scheduleCSFDownload(screenSystems.CSFSubtitler.CSF_RETRY_DELAY);
        return;
    }

    this.csfDecoder = decoder;
    this.csfHeader = decoder.header;
    this.imageTemplate = imageTemplate;
    this.templateLeftBraceIndex = leftBraceIndex;
    this.templateRightBraceIndex = rightBraceIndex;
    var imageNumberFormat = imageTemplate.slice(leftBraceIndex + 1,
                                                rightBraceIndex);
    this.imageNumFieldWidth = (imageNumberFormat.length > 2) ?
                              Number(imageNumberFormat.slice(1, -1)) : 0;
    this.purgeBlockCache();
    this.startCueTimer();

    // A live CSF file must be downloaded again after an interval specified in
    // its header (zero interval => VOD)
    if (this.csfHeader.refreshInterval > 0)
        this.scheduleCSFDownload(this.csfHeader.refreshInterval * 1000);
};


/**
 * Image lead time. We aim to download subtitle images this number of seconds
 * before they are due on air.
 *
 * @private
 * @constant {number} IMAGE_LEAD_TIME   
 */
screenSystems.CSFSubtitler.IMAGE_LEAD_TIME = 10;


/**
 * Cue timer handler. This is called periodically while there is a current
 * subtitle source.
 *
 * @private
 * @param {CSFSubtitler} subtitler - subtitler which should handle the tick
 */
screenSystems.CSFSubtitler.cueTimerHandler = function (subtitler) {
    subtitler.cueTimerTicked();
};


/**
 * Handles cue timer events.
 *
 * @private
 */
screenSystems.CSFSubtitler.prototype.cueTimerTicked = function () {
    var currentTime = this.timeSource(),
        currentBlockNum = Math.floor(currentTime / 60),
        csfBlockNum = currentBlockNum - this.csfHeader.startTime,
        numBlocks = this.csfHeader.numBlocks;


    // it time not valid, the clear it down now.        
    if (currentTime == 0) {
	if (this.onAirImageNums.length) {
            this.renderer(null);        // clear overlay
            this.onAirImageNums.length = 0;
            this.log(screenSystems.CSFSubtitler.logType.LOG_LOG, 'currentTime=0 Clear all');
        }
        return;
    }
       

    if (csfBlockNum < 0)
        csfBlockNum += (60 * 24);
        
    if (csfBlockNum >= numBlocks) {
        this.purgeImageCache();
        this.purgeBlockCache();
        if (this.onAirImageNums.length) {
            this.renderer(null);        // clear overlay
            this.onAirImageNums.length = 0;
            this.log(screenSystems.CSFSubtitler.logType.LOG_LOG, 'Clear - past end of CSF');
        }
        return;
    }
        
    // Scan the current block to find images which should currently be on air
    // and those which will be on air soon
    var relCurrentTime = currentTime - (currentBlockNum * 60),
        onAirCommands = [];
    this.scanBlock(csfBlockNum, relCurrentTime, onAirCommands);
    
    // If near the end of the minute, we need to scan the next block as well
    // (if present)
    if ((relCurrentTime + screenSystems.CSFSubtitler.IMAGE_LEAD_TIME) > 60  &&
        (csfBlockNum + 1) < numBlocks) {
            this.scanBlock(csfBlockNum + 1, relCurrentTime - 60);
    }
    
    // If the application currently has any images on air which are not in
    // 'onAirCommands', we need to clear its overlay first
    if (this.onAirImageNums.some(function (imageNum) {
            return onAirCommands.every(function (command) {
                if (command.imageNum !== imageNum) {
                    this.log(screenSystems.CSFSubtitler.logType.LOG_LOG, 'Replace ' + imageNum);
                    return true;
                }
                return false;
            }, this);
        }, this)) {
        this.renderer(null);        // clear overlay
        if (onAirCommands.length === 0) {
            this.log(screenSystems.CSFSubtitler.logType.LOG_LOG, 'Offair ' + this.onAirImageNums[0]);
        } else {
            this.log(screenSystems.CSFSubtitler.logType.LOG_LOG, 'Clear to replace ' + this.onAirImageNums[0] + ' with ' + onAirCommands[0].imageNum);
        }
        this.onAirImageNums.length = 0;
    }
    
    // Now issue on-air commands for any images in 'onAirCommands' which are
    // not already on air
    var imageNum, image;
    var onairimagecount = 0;
    onAirCommands.forEach(function (command) {
        imageNum = command.imageNum;

        if (this.onAirImageNums.indexOf(imageNum) < 0) {
            // Image is not on air yet, so get it from the cache and, if it has
            // finished downloading, pass it to the application for rendering.
            // If it was not in the cache, 'getImage' will add it and initiate
            // downloading
            image = this.getImage(imageNum);
            
            if (image.complete) {
                this.renderer(image, command.width, command.height,
                              command.centreOffset, command.bottomOffset,
                              this.csfHeader.targetWidth,
                              this.csfHeader.targetHeight);
                this.onAirImageNums.push(imageNum);
                if (this.lastOnairImageNum + 1 != imageNum) {
                  this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                         'Image ' + imageNum + ' on air - NOT ' + this.lastOnairImageNum + "+1 (did we seek?)");
                } else {
                  this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                         'Image ' + imageNum + ' on air');
                }
                this.lastOnairImageNum = imageNum;
            }
            else  {
              this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                         'Image ' + imageNum + ' wanted on air, but not completely downloaded yet');
            }
            onairimagecount++;
        }
        if (onairimagecount > 1){
          this.log(screenSystems.CSFSubtitler.logType.LOG_ERROR,
                         'More than one onair image (' + onairimagecount + ')');
        }

    }, this);
    
    this.purgeImageCache(csfBlockNum);
    this.purgeBlockCache(csfBlockNum);
};


/**
 * Scans the specified one minute command block. 'Add Image' commands for those
 * images which the scan determines should be on air at the specified current
 * time are added to the supplied array. Images which will be on air within the
 * next IMAGE_LEAD_TIME seconds are cached if not already in the image cache.
 *
 * @private
 * @param {number} blockNum - the number of the block, where block zero is the
 * first block in the CSF file
 * @param {number} relCurrentTime - current media time, in seconds relative to
 * the start of the specified block
 * @param {CSFCommand[]) [onAirCommands] - optional list of commands for images
 * which should be on air (may be omitted if the current time is before the
 * start of the block, in which case no commands would be returned)
 */
screenSystems.CSFSubtitler.prototype.scanBlock =
    function (blockNum, relCurrentTime, onAirCommands) {
    var relMaxTime = relCurrentTime + screenSystems.CSFSubtitler.IMAGE_LEAD_TIME,
        commands = this.getCommandsForBlock(blockNum),
        numCommands = commands.length,
        command, time, onAir = [], i,
        ADD_IMAGE = screenSystems.CSFDecoder.ADD_IMAGE;
    
    for (i = 0; i < numCommands; i++) {
        command = commands[i];
        time = command.time / 100;
        
        if (time <= relCurrentTime) {
            if (command.cmdType === ADD_IMAGE)
                onAir.push(command);
            else
                onAir.length = 0;
        }
        else if (time < relMaxTime) {
            // Ensure images needed soon are in the cache
            if (command.cmdType === ADD_IMAGE) {
                this.getImage(command.imageNum);
                //this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                //         'image ' + command.imageNum + ' needed in next ' + screenSystems.CSFSubtitler.IMAGE_LEAD_TIME + 's');
            }
        }
        else {
            break;
        }
    }
    
    for (i = 0; i < onAir.length; i++)
        onAirCommands.push(onAir[i]);
};


/**
 * Gets the decoded subtitle commands for a specified one minute block.
 * The commands are retrieved from the block cache, with the required block
 * being decoded and cached if not already in the cache.
 *
 * @private
 * @param {number} blockNum - the number of the block, where block zero is the
 * first block in the CSF file
 * @returns {CSFCommand[]} a list containing the subtitle commands in time order
 * @throws {RangeError} if the block number is not in the range
 * [0, csfHeader.numBlocks)
 * @throws {Error} if a command cannot be decoded
 */
screenSystems.CSFSubtitler.prototype.getCommandsForBlock = function (blockNum) {
    var commands = this.blockCache[blockNum];
    
    if (!commands) {
        // This block is not currently cached, so must be decoded and cached
        commands = this.csfDecoder.getCommandsForBlock(blockNum);
        this.blockCache[blockNum] = commands;
    }
    
    return commands;
};


/**
 * Purge the block cache by removing any blocks other than the specified block
 * and the following block. If no block is specified, all blocks are removed.
 *
 * @private
 * @param {number} [csfBlockNum] - number of first block to be retained, if any
 */
screenSystems.CSFSubtitler.prototype.purgeBlockCache = function (csfBlockNum) {
    var keys = Object.keys(this.blockCache),
        blockNum;
    
    keys.forEach(function (key) {
        // Consider only numeric keys
        if (isFinite(key)) {
            blockNum = Number(key);
            
            if (csfBlockNum === undefined  ||
                (blockNum !== csfBlockNum  &&
                blockNum !== (csfBlockNum + 1))) {
                delete this.blockCache[key];
                this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                         'Block ' + blockNum + ' purged');
            }
        }
    }, this);
};


/**
 * Gets a subtitle image. The image is retrieved from the image cache and is
 * downloaded and cached if not already in the cache.
 *
 * @private
 * @param {number} imageNum - image number
 * @returns {Image} the subtitle image
 */
screenSystems.CSFSubtitler.prototype.getImage = function (imageNum) {
    var image = this.imageCache[imageNum];
    
    if (!image) {
        // This image is not currently cached, so must be downloaded and cached
        image = new Image();
        var src = this.makeImageURL(imageNum);
	//image.src = src;
        
	if (1){ //screenSystems.CSFSubtitler.iOS == 1) {
		this.loadImageFileAsURL(src, image);
	}
	if (this.lastLoadedImageNum + 1 != imageNum) {
          this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                 'Downloading image ' + imageNum + " NOT " + this.lastLoadedImageNum + "+1 (did we seek?)");
	} else {
          this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                 'Downloading image ' + imageNum);
	}
        this.imageCache[imageNum] = image;
        this.lastLoadedImageNum = imageNum;
    }
    
    return image;
};


/**
 * Purge the image cache by removing any images other than those referenced by
 * the specifed block and the following block. If no block is specified, all
 * images are removed.
 *
 * @private
 * @param {number} [csfBlockNum] - number of first block whose images are to be
 * retained, if any
 */
screenSystems.CSFSubtitler.prototype.purgeImageCache = function (csfBlockNum) {
    var endBlockNum,
        blockNum,
        commands,
        command,
        imageNums,
        i;
    
    if (csfBlockNum !== undefined) {
        imageNums = [];
        endBlockNum = csfBlockNum + 2;

        if (endBlockNum > this.csfHeader.numBlocks)
            --endBlockNum;
            
        for (blockNum = csfBlockNum; blockNum < endBlockNum; blockNum++) {
            commands = this.getCommandsForBlock(blockNum);
            
            for (i = 0; i < commands.length; i++) {
                command = commands[i];
                
                if (command.cmdType === screenSystems.CSFDecoder.ADD_IMAGE)
                    imageNums.push(command.imageNum);
            }
        }
    }

    var keys = Object.keys(this.imageCache),
        imageNum;
    
    var purgetext = '';
    keys.forEach(function (key) {
        // Consider only numeric keys
        if (isFinite(key)) {
            imageNum = Number(key);
            
            if (csfBlockNum === undefined  ||
                imageNums.indexOf(imageNum) < 0) {
                var im = this.imageCache[key];
                if (im.DataURL)
	                delete im.DataURL;

                delete this.imageCache[key];
                purgetext = purgetext + ' ' + imageNum; 
            }
        }
    }, this);

    if (purgetext != '') {
        this.log(screenSystems.CSFSubtitler.logType.LOG_LOG,
                         'Purged images: ' + purgetext);
    }

};


/**
 * Makes an image URL by substituting the variable (brace-enclosed) part of the
 * image template with the image number, then combining this with the CSF source
 * URL.
 *
 * @private
 * @param {number} imageNum - image number
 */
screenSystems.CSFSubtitler.prototype.makeImageURL = function (imageNum) {
    var template = this.imageTemplate,
        relURL = template.slice(0, this.templateLeftBraceIndex) +
                 this.formatImageNumber(imageNum) +
                 template.slice(this.templateRightBraceIndex + 1);
    return this.makeURL(this.csfSource, relURL);
};


/**
 * Formats an image number according to the variable (brace-enclosed) part of
 * the image URL template.
 *
 * @private
 * @param {number} imageNum - image number
 * @returns {string} formatted image number
 */
screenSystems.CSFSubtitler.prototype.formatImageNumber = function (imageNum) {
    var digits = imageNum.toString();

    while (digits.length < this.imageNumFieldWidth)
        digits = '0' + digits;
        
    return digits;
};


/**
 * Makes an absolute URL by combining a base URL and a relative URL.
 *
 * @param {string} baseURL - base URL
 * @param {string} relURL - relative URL
 * @returns {string} combined absolute URL
 */
screenSystems.CSFSubtitler.prototype.makeURL = function(baseURL, relURL) {
    var tailPos = baseURL.lastIndexOf('/');
    return baseURL.slice(0, tailPos + 1) + relURL;
};


/**
 * Subtitle timer period, in milliseconds. Most of the subtitler's work is done
 * in the timer callback and the timer period therefore determines the basic
 * timing resolution of the subtitler.
 *
 * @private
 * @constant {number} TIMER_PERIOD
 */
 screenSystems.CSFSubtitler.TIMER_PERIOD = 100;
 
 
/**
 * Starts the subtitle cue timer. It remains active while there is a current
 * subtitle source. On each tick, the subtitler's internal state is updated
 * and subtitle images put on or off air as required by the CSF timing.
 *
 * @private
 */
screenSystems.CSFSubtitler.prototype.startCueTimer = function () {
    if (this.cueTimerID === undefined)
        this.cueTimerID = setInterval(screenSystems.CSFSubtitler.cueTimerHandler,
                                     screenSystems.CSFSubtitler.TIMER_PERIOD,
                                     this);
};


/**
 * Stops the subtitle cue timer. It remains inactive while there is no current
 * subtitle source.
 *
 * @private
 */
screenSystems.CSFSubtitler.prototype.stopCueTimer = function () {
    if (this.cueTimerID !== undefined) {
        clearInterval(this.cueTimerID);
        delete this.cueTimerID;
    }
};


/**
 * Schedules a CSF download to be performed after a specified delay.
 * If a download has already been scheduled, it is cancelled first.
 *
 * @private
 * @param {number} delay - time delay in milliseconds
 *
 */
screenSystems.CSFSubtitler.prototype.scheduleCSFDownload = function (delay) {
    this.cancelScheduledCSFDownload();
    var subtitler1 = this;
    this.csfTimerID = setTimeout(function () { 
        delete subtitler1.csfTimerID;
        subtitler1.downloadCSF();
		}, 
        delay);
};


/**
 * Cancel the currently scheduled CSF download, if any.
 *
 * @private
 */
screenSystems.CSFSubtitler.prototype.cancelScheduledCSFDownload = function () {
    if (this.csfTimerID !== undefined) {
        this.log(screenSystems.CSFSubtitler.logType.LOG_LOG, 'CSF Download CANCELLED');
        clearTimeout(this.csfTimerID);
        delete this.csfTimerID;
    }
};


/**
 * Logs a message to the browser console and to the application's logger
 * callback (if set)
 *
 * @private
 * @param {number} type - logger message type
 * @param {string} message - text to be logged
 */
screenSystems.CSFSubtitler.prototype.log = function (type, message) {
    if (this.logger) {
        (this.logger)(type, message);
    } else {

    
    switch (type) {
    case screenSystems.CSFSubtitler.logType.LOG_LOG:
        console.log(message);
        break;

    case screenSystems.CSFSubtitler.logType.LOG_INFO:
        console.info(message);
        break;

    case screenSystems.CSFSubtitler.logType.LOG_WARNING:
        console.warning(message);
        break;

    case screenSystems.CSFSubtitler.logType.LOG_ERROR:
        console.error(message);
        break;

    case screenSystems.CSFSubtitler.logType.LOG_DEBUG:
        console.debug(message);
        break;

    default:
        console.log(message);
    }

    }
    
};
