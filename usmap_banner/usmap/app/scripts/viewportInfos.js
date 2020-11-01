/*START:  Legacy one Get the type of current device pased on viewport, gives it mobile, tablet or desktop */
function getDeviceType() {
    var isMobile = Modernizr.mq('only screen and (max-width: 47.9375em)')
    var isTablet = Modernizr.mq('only screen and (min-width: 48em) and (max-width: 79.9376em)')
    //var isDeskTop = Modernizr.mq('only screen and (min-width: 79.9377em) and (max-width: 99999999em)')

    if (isMobile) {
        deviceType = 'MOBILE';
        return "MOBILE";
    } else if (isTablet) {
        deviceType = 'TABLET';
        return "TABLET";
    } else {
        deviceType = 'DESKTOP';
        return "DESKTOP";
    }

}
/*END:  Legacy one Get the type of current device pased on viewport, gives it mobile, tablet or desktop */


/*START:  Get the type of current device pased on viewport , this fn is added after addition of the medium laptop type which is of 820-1279px*/

function getDeviceTypeV1() {
    var isMobile      = Modernizr.mq('only screen and (max-width: 767px)')
    var isSmallTablet = Modernizr.mq('only screen and (min-width: 768px) and (max-width: 819px)')
    var isLargeTablet = Modernizr.mq('only screen and (min-width: 820px) and (max-width: 1279px)')
    //var isDeskTop = Modernizr.mq('only screen and (min-width: 79.9377em) and (max-width: 99999999em)')

    if (isMobile) {
        deviceTypeV1 = 'MOBILE';
        return "MOBILE";
    } else if (isSmallTablet) {
        deviceTypeV1 = 'SMALL_TABLET';
        return "SMALL_TABLET";
    } else if (isLargeTablet) {
        deviceTypeV1 = 'LARGE_TABLET';
        return "LARGE_TABLET";
    } else {
        deviceTypeV1 = 'DESKTOP';
        return "DESKTOP";
    }

}
/*END: Get the type of current device pased on viewport , this fn is added after addition of the medium laptop type which is of 820-1279px*/


/*START: Get Using the WURFL, a js or service which gives u info abt the current user device*/
function getDevice() {
    if (typeof WURFL == "undefined") {
        return getDeviceType();
    } else if (WURFL.form_factor == "Smartphone" || WURFL.form_factor == "Other Mobile" || WURFL.form_factor == "Feature Phone") {
        return "MOBILE";
    } else if (WURFL.form_factor == "Tablet") {
        return "TABLET";
    } else {
        return getDeviceType();
    }
}
/*END: Get Using the WURFL, a js or service which gives u info abt the current user device*/


/*START: Get Using the WURFL, a js or service which gives u info abt the current user device, 
         diff b/w old one is it gives desktop as desktop*/
function getDeviceV1() {
    if (typeof WURFL == "undefined") {
        return getDeviceType();
    } else if (WURFL.form_factor == "Smartphone" || WURFL.form_factor == "Other Mobile" || WURFL.form_factor == "Feature Phone") {
        return "MOBILE";
    } else if (WURFL.form_factor == "Tablet") {
        return "TABLET";
    } else if (WURFL.form_factor == "Desktop") {
        return "DESKTOP";
    } else {
        return "getDeviceType()";
    }
}
/*END: Get Using the WURFL, a js or service which gives u info abt the current user device, 
       diff b/w old one is it gives desktop as desktop*/

       
/*START: Get Init Data and set global parameters based on it*/

/*START: Get the initial orientation*/
window.windowInnerWidth = window.innerWidth;
window.windowInnerHeight = window.innerHeight;
window.windowOrientation = $(window).width() > $(window).height() ? 'landscape' : 'portrait';
$("html").addClass("sna_orientation_" + window.windowOrientation);
/*END: Get the initial orientation*/


window.snaDeviceType = getDeviceType();
window.snaDeviceTypeV1 = getDeviceTypeV1();
window.snaDevice = getDevice();


$(window).on('resize', function(event) {
    var newHeight = window.innerHeight,
        newWidth = window.innerWidth,
        newOrientation;

    newOrientation = newWidth > newHeight ? 'landscape' : 'portrait';
    if (newOrientation != window.windowOrientation) {
        var portraitLandscapeOrientationChangeEv = $.Event("portrait-landscape-orientation-change-event");
        $("html").removeClass("sna_orientation_landscape sna_orientation_portrait").addClass("sna_orientation_" + newOrientation);
        $(window).trigger(portraitLandscapeOrientationChangeEv);
    }

    
    window.windowOrientation = newWidth > newHeight ? 'landscape' : 'portrait';

    //    window.console.log("orientation detected is : " + windowOrientation);
    if (newHeight != window.windowInnerHeight || newWidth != window.windowInnerWidth) {
        window.windowInnerHeight = newHeight;
        window.windowInnerWidth = newWidth;
        event = $.Event("sna-orientation-change");
        window.event.orientation = windowOrientation;
        $(window).trigger(event);

        /*START: Trigger the Event BAsed on the new device type change*/
        var newDeviceType = getDeviceType();
        if (window.snaDeviceType != newDeviceType) {
            window.snaDeviceType = newDeviceType;
            var deviceTypeEvent;
            if (newDeviceType == 'DESKTOP') {
                deviceTypeEvent = $.Event("sna-desktop-layout-in");
            } else if (newDeviceType == 'TABLET') {
                deviceTypeEvent = $.Event("sna-tablet-layout-in");
            } else if (newDeviceType == 'MOBILE') {
                deviceTypeEvent = $.Event("sna-mobile-layout-in");
            }
            $(window).trigger(deviceTypeEvent);
            
        }
        /*END: Trigger the Event BAsed on the new device type change*/

        /*START: Trigger the Event BAsed on the new device type change
                this includes small and large laptops*/
        var newDeviceType1 = getDeviceTypeV1();
        if (window.snaDeviceTypeV1 != newDeviceType1) {
            window.snaDeviceTypeV1 = newDeviceType1;
            var deviceTypeEventV1;
            if (newDeviceType1 == 'DESKTOP') {
                deviceTypeEventV1 = $.Event("sna-desktop-layout-in-v1");
            } else if (newDeviceType1 == 'SMALL_TABLET') {
                deviceTypeEventV1 = $.Event("sna-small-tablet-layout-in-v1");
            } else if (newDeviceType1 == 'LARGE_TABLET') {
                deviceTypeEventV1 = $.Event("sna-large-tablet-layout-in-v1");
            } else if (newDeviceType1 == 'MOBILE') {
                deviceTypeEventV1 = $.Event("sna-mobile-layout-in-v1");
            }
            $(window).trigger(deviceTypeEventV1);
            
        }
        /*END: Trigger the Event BAsed on the new device type change
                this includes small and large laptops*/
    }

});
/*END: observe the event when the orientation or window viewport changes*/

