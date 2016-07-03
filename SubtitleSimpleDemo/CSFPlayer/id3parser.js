/**
 * ID3 parsing code
 * @author Simon Hailes & Roland Boorman
 * @version 1.0
 * @copyright Screen Systems 2015
 */

 /* jshint globalstrict: true */
 /* global screenSystems */

if (screenSystems === undefined) {
    /**
     * Namespace for all Screen Systems libraries.
     * @namespace
     */
    var screenSystems = {};
}


 'use strict';
 


screenSystems.Utf8ArrayToStr = function(array, posn) {
    var out, i, len, c;
    var char2, char3;

    out = "";
    i = posn;
    while(array[i] != 0) {
    c = array[i++];
    switch(c >> 4)
    { 
      case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12: case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(((c & 0x0F) << 12) |
                       ((char2 & 0x3F) << 6) |
                       ((char3 & 0x3F) << 0));
        break;
    }
    }

    return out;
}

//////////////////////////////////////////////////
// process the ppaft of an ArrayBuffer from dataposn.
// key is the 4 byte key as a string from the ID3
// tagsize is the length of this data
// tagflags are the flags for this tag
screenSystems.ProcessID3Tag = function( ID3Data, dataposn, key, tagsize, tagflags, adv )
{
  if (key == "PRIV") {
    // PRIV contains an owner string, nul terminated
    var owner = new String;
    while ((ID3Data[dataposn] != 0) && (tagsize > 0))
    {
      owner += String.fromCharCode(ID3Data[dataposn++]);	
      tagsize--;
    }
    if (tagsize > 0) {
      dataposn++;	
      tagsize--;
    }	

    // now for our private data
    // if this is ours, then extract the 4 byte time (ms since midnight UTC)
    if (owner == "tv.screensystems.utc-ms") {
      if (tagsize >= 4) {
        // 1ms ticks since midnight	
        var time_ms = ID3Data[dataposn++];
        time_ms = time_ms << 8;
        time_ms += ID3Data[dataposn++];
        time_ms = time_ms << 8;
        time_ms += ID3Data[dataposn++];
        time_ms = time_ms << 8;
        time_ms += ID3Data[dataposn++];

        // time_ms is the time in the packet.
        // this is the time on the sender when the packet was sent
        // 
        // adv (s) is the PTS of this packet relative to the player position.
        // so subtract from the time_ms to get the offset from player posn.
        time_ms = time_ms - adv*1000.0;

        //screenSystems.SetCurrentPlayerTime( time_ms );
      }	
    }
	return;
  }

  if ((key == "TEXT") || (key == "TIT3")) {
    // TEXT an encoding byte, and a string nul terminated
    var encoding;
    var text = new String;
    encoding = ID3Data[dataposn];
    dataposn++;
    tagsize--;

    text = screenSystems.Utf8ArrayToStr(ID3Data, dataposn);

    // move to nul
    while ((ID3Data[dataposn] != 0) && (tagsize > 0))
    {
      dataposn++;
      tagsize--;
    }

    if (tagsize > 0) {
      dataposn++;	
      tagsize--;
    }	
    
    screenSystems.processTEXT( text, adv );
	return;
  }

  if (key == "TALB") {
    // TALB an encoding byte, and a string nul terminated
    var encoding;
    var text = new String;
    encoding = ID3Data[dataposn];
    dataposn++;
    tagsize--;

    while ((ID3Data[dataposn] != 0) && (tagsize > 0))
    {
      text += String.fromCharCode(ID3Data[dataposn++]);	
      tagsize--;
    }
    if (tagsize > 0) {
      dataposn++;	
      tagsize--;
    }	
    
    screenSystems.processCSFTime( text, adv );
	return;
  }

  // we did not recognise the key
  if (key == "TALB") {
  }


}



//////////////////////////////////////////////////
// processes an ArrayBuffer of the raw ID3 data packet, header onwards
screenSystems.process_ID3 = function(ID3Raw, adv)
{
	// create a uint8 view of our buffer
	var ID3Data = new Uint8Array( ID3Raw );

	// if it starts with ID3, check the rest for ID3V2
	if ((ID3Data[0] != 0x49) || 
	    (ID3Data[1] != 0x44) ||
	    (ID3Data[2] != 0x33))
	    return;

	var versionMajor = ID3Data[3];
	var versionMinor = ID3Data[4];
	var flags = ID3Data[5];
	var size = ID3Data[6] & 0x7f;
	size = size << 7;
	size += ID3Data[7] & 0x7f;
	size = size << 7;
	size += ID3Data[8] & 0x7f;
	size = size << 7;
	size += ID3Data[9] & 0x7f;
		
//	console.log( "ID3Data ver: " +  
//			versionMajor + "." + 
//			versionMinor + 
//			" flags:" + flags +
//			" size:" + size
//		);
		
	var dataposn = 10;
	var datalen = size;

	// if extended header
	if (flags & 0x40) {
		var extsize = ID3Data[10] & 0x7f;
		extsize = extsize << 7;
		extsize += ID3Data[11] & 0x7f;
		extsize = extsize << 7;
		extsize += ID3Data[12] & 0x7f;
		extsize = extsize << 7;
		extsize += ID3Data[13] & 0x7f;
		
		dataposn += extsize;
		datalen -= extsize;
	}

	// if footer present
	if (flags & 0x10) {
	}

	// ok, now the first frame should be at dataposn,
	// len of all tags should be datalen
	
	// for each tag
	while ((ID3Data[dataposn] != 0) && (datalen > 0))
	{
		var key;
		key =  String.fromCharCode(ID3Data[dataposn++]);
		key += String.fromCharCode(ID3Data[dataposn++]);
		key += String.fromCharCode(ID3Data[dataposn++]);
		key += String.fromCharCode(ID3Data[dataposn++]);
		datalen -= 4;

		var tagsize = ID3Data[dataposn++] & 0x7f;
		tagsize = tagsize << 7;
		tagsize += ID3Data[dataposn++] & 0x7f;
		tagsize = tagsize << 7;
		tagsize += ID3Data[dataposn++] & 0x7f;
		tagsize = tagsize << 7;
		tagsize += ID3Data[dataposn++] & 0x7f;
		datalen -= 4;
		
		var tagflags = ID3Data[dataposn++] << 8;
		tagflags += ID3Data[dataposn++];
		datalen -= 2;

//		console.log( "ID3Tag: " + key + " size:" + tagsize + " flags:" + tagflags );
		
		if (datalen >= tagsize)
		{
			// process an individual tag
			screenSystems.ProcessID3Tag( ID3Data, dataposn, key, tagsize, tagflags, adv );
		}
		else
			console.log( "ID3tag - not enough data Remains:" + datalen);

		dataposn += tagsize;
		datalen -= tagsize;
	}
}
