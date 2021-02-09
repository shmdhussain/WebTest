(function(){
    var hopeMarsProbeContEl = document.querySelector('#sna_mars_probe_ch');;
    // console.log(curScriptElement);
    // debugger;
    if(document.readyState == 'interactive' || document.readyState == 'complete'){
        hopeMarsProbeInit();
    }else{
        document.addEventListener('readystatechange', function(e) {
            if(document.readyState == 'interactive'){
                hopeMarsProbeInit();
            }
        });
    }

    function hopeMarsProbeInit() {
        var cusHTMLId = 'sna_mars_probe_ch';
        var timeRemainingSpeedBasedMethod = false;
        var lastAnimationFrameScheduledId;
       

        var addComas = function(num){
            var further = 0;
            num = (num + "").split("").reverse();


            num.map(function(e, index){
                if ((index + 1) % 3 == 0 && index !== num.length - further - 1) {
                    num.splice(index + (further++) + 1, 0, ",");
                }
            });


            num = num.reverse().join("");
            return num;
        }

        var hopeMarsProbeData = {
            speed: 0,
            distanceCovered: 0,
            distanceRemaining: 0,
            totalDistance: 480492400.207269,
            timeStampToReachMarsOrbit: NaN
        }


        var supportsJSON = (function() {
            if (typeof XMLHttpRequest == 'undefined') {
                return false;
            }
            var xhr = new XMLHttpRequest();
            xhr.open('get', '/', true);
            try {
                // some browsers throw when setting `responseType` to an unsupported value
                xhr.responseType = 'json';
            } catch(error) {
                return false;
            }
            return 'response' in xhr && xhr.responseType == 'json';
        }());
        var getJSON = function(url, successHandler, errorHandler) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);

            if(supportsJSON){
                xhr.responseType = 'json';
            }

            xhr.onload = function() {
                var status = xhr.status;
                if (status == 200) {
                    if(supportsJSON){
                        successHandler && successHandler(xhr.response);
                    }else{
                        successHandler && successHandler(JSON.parse(xhr.responseText));
                    }
                } else {
                    errorHandler && errorHandler(status);
                }
            };


            xhr.send();
        };
        

        
        function initAppWithData(response) {


            try {
                response = response.map(function(data){
                    data.speed = Number(data.speed);
                    data.distance_left = Number(data.distance_left);
                    data.distance_travelled = Number(data.distance_travelled);
                    return data;
                });
                hopeMarsProbeContEl.classList.remove('hide')

            } catch (e) {
                return;
            }

            var timeDiffBetweenCurrentAndEstimated = response[1].time - response[0].time;

            hopeMarsProbeData.estimatedTemp = 0;
            hopeMarsProbeData.estimatedDistanceCovered = (response[1].distance_travelled - response[0].distance_travelled) / timeDiffBetweenCurrentAndEstimated;
            hopeMarsProbeData.estimatedSpeed = (response[1].speed - response[0].speed) / timeDiffBetweenCurrentAndEstimated;

            hopeMarsProbeData.lastObservedTemp = 7.33;
            hopeMarsProbeData.lastObservedDistanceCovered = response[0].distance_travelled;
            hopeMarsProbeData.lastObservedSpeed = response[0].speed;

            hopeMarsProbeData.lastObservedTime = response[0].time;
        }
        var uiStateData;
        // var j = 0; //to be commented
        function updateData() {


            var currentTimeStamp = (new Date()).getTime() // 
            // var currentTimeStamp = 1612749300 * 1000 + j // TO BE commented 
            // var currentTimeStamp = 1612749420 * 1000 + j // TO BE commented 
            var d = hopeMarsProbeData;
            var temperature = 7.33;
            var covered     = Math.min(Math.floor(hopeMarsProbeData.totalDistance), Math.floor(d.lastObservedDistanceCovered + (d.estimatedDistanceCovered * (currentTimeStamp - d.lastObservedTime))));
            var remaining   = Math.max(0, Math.floor(hopeMarsProbeData.totalDistance - covered));
            var speed       = Math.floor(d.lastObservedSpeed + (d.estimatedSpeed) * (currentTimeStamp - d.lastObservedTime));

            

            var remainingDays;
            var remainingHours;
            var remainingMinutes;
            var remainingSeconds;

            /*START: method 1*/
            if(timeRemainingSpeedBasedMethod){
                var unCalcKms = remaining;
                for (var i = 0; i < 3; i++) {



                    if (i==0) {
                        remainingHours = parseInt(unCalcKms/speed);
                        remainingDays  = parseInt(remainingHours/24);
                        remainingHours = remainingHours - (remainingDays * 24);
                        unCalcKms = (unCalcKms%speed);
                    }
                    if (i==1) {
                        remainingMinutes = parseInt(unCalcKms/(speed/60));
                        unCalcKms = (unCalcKms%(speed/60))
                    }
                    if (i==2) {
                        remainingSeconds = parseInt(unCalcKms/(speed/60/60));
                        unCalcKms = (unCalcKms%(speed/60/60))
                    }
                }
            /*END: method 1*/

            } else{
                /*START: Method 2*/
                var timestampToReachMarsOrbit = hopeMarsProbeData.timeStampToReachMarsOrbit; //1612835880000- Feb 9, 2021 01:58AM 2021-02-09T01:58:00+0000
                if(isNaN(timestampToReachMarsOrbit)){

                }
                else if(currentTimeStamp >= timestampToReachMarsOrbit){
                    remainingDays  = 0;
                    remainingHours = 0;
                    remainingMinutes = 0;
                    remainingSeconds = 0;

                }else{

                    var diffInSecondsToReachMarsOrbit        = (timestampToReachMarsOrbit - currentTimeStamp)/1000;
                    var remaingDiffInSecondsToReachMarsOrbit = diffInSecondsToReachMarsOrbit;


                    remainingDays  = parseInt((((remaingDiffInSecondsToReachMarsOrbit)/60)/60)/24);
                    remaingDiffInSecondsToReachMarsOrbit = remaingDiffInSecondsToReachMarsOrbit - (remainingDays * 24 * 60 * 60)

                    remainingHours = parseInt(((remaingDiffInSecondsToReachMarsOrbit)/60)/60);
                    remaingDiffInSecondsToReachMarsOrbit = remaingDiffInSecondsToReachMarsOrbit - (remainingHours * 60 * 60)

                    remainingMinutes = parseInt((remaingDiffInSecondsToReachMarsOrbit)/60);
                    remaingDiffInSecondsToReachMarsOrbit = remaingDiffInSecondsToReachMarsOrbit - (remainingMinutes * 60)

                    remainingSeconds = parseInt(remaingDiffInSecondsToReachMarsOrbit);

                }
                /*END: Method 2*/

            }

            uiStateData = {
                temperature : temperature,
                coveredDistance : covered,
                remainingDistance : remaining,
                speed : speed,

                remainingDays: remainingDays,
                remainingHours : remainingHours,
                remainingMinutes : remainingMinutes,
                remainingSeconds : remainingSeconds
            }
            console.log("***********************************");
            console.log("rem days", remainingDays);
            console.log("rem hour", remainingHours);
            console.log("rem mins", remainingMinutes);
            console.log("rem secs", remainingSeconds);
            console.log("***********************************");


            requestAnimationFrame(function(){
                updateUI(uiStateData);
            })
            setTimeout(function() {
                // j = j +500;//to be commented
                updateData();
            }, 500);
        }

        function updateUI(state) {
            var remainingTimeInfoBoxEl = hopeMarsProbeContEl.querySelector('.remaining_time');

            var updateUIForCoveredDistance = function () {
                var distanceCoveredInfoBoxEl = hopeMarsProbeContEl.querySelector('.covered_distance');
                distanceCoveredInfoBoxEl.querySelector('.mars_probe_ch_info_box_stats_val').textContent=addComas(state.coveredDistance);
            }

            

            var updateSpeed = function () {
                var speedEl = hopeMarsProbeContEl.querySelector('.speed');
                speedEl.querySelector('.mars_probe_ch_info_box_stats_val').textContent=addComas(state.speed);
            }

            var updateUIForRemainingDistance = function () {
                var distanceRemainingInfoBoxEl = hopeMarsProbeContEl.querySelector('.remaining_distance');
                distanceRemainingInfoBoxEl.querySelector('.mars_probe_ch_info_box_stats_val').textContent=addComas(state.remainingDistance);
            }

            var updateUIForRemainingTime = function () {
                var timeRemainingInfoBoxEl = hopeMarsProbeContEl.querySelector('.remaining_time');
                var timeRemainingInfoBoxStatsValueEl = timeRemainingInfoBoxEl.querySelector('.mars_probe_ch_info_box_stats_val');



                var timeRemainingInDaysInfoBoxEl  = timeRemainingInfoBoxStatsValueEl.querySelector('.remaining_days');
                var timeRemainingInDaysInfoBoxElText = state.remainingDays + " يوم و ";
                timeRemainingInDaysInfoBoxEl.textContent = timeRemainingInDaysInfoBoxElText;

                var timeRemainingInHoursInfoBoxEl = timeRemainingInfoBoxStatsValueEl.querySelector('.remaining_hours');
                var timeRemainingInHoursInfoBoxElText = state.remainingHours + " ساعة ";
                timeRemainingInHoursInfoBoxEl.textContent = timeRemainingInHoursInfoBoxElText;

                var timeRemainingInMinsInfoBoxEl  = timeRemainingInfoBoxStatsValueEl.querySelector('.remaining_mins');
                var timeRemainingInMinsInfoBoxElText = state.remainingMinutes + " دقيقة ";
                timeRemainingInMinsInfoBoxEl.textContent = timeRemainingInMinsInfoBoxElText;

                var timeRemainingInSecsInfoBoxEl  = timeRemainingInfoBoxStatsValueEl.querySelector('.remaining_secs');
                var timeRemainingInSecsInfoBoxElText  = state.remainingSeconds + " ثانية "
                timeRemainingInSecsInfoBoxEl.textContent = timeRemainingInSecsInfoBoxElText;

                timeRemainingInDaysInfoBoxEl.classList.add("hide");
                timeRemainingInHoursInfoBoxEl.classList.add("hide");
                timeRemainingInMinsInfoBoxEl.classList.add("hide");
                timeRemainingInSecsInfoBoxEl.classList.add("hide");

                if(state.remainingDays){
                    timeRemainingInDaysInfoBoxEl.classList.remove("hide");
                    timeRemainingInHoursInfoBoxEl.classList.remove("hide");
                } else if(state.remainingHours){
                    timeRemainingInHoursInfoBoxEl.classList.remove("hide");
                } else if(typeof state.remainingDays != "undefined"){
                    timeRemainingInMinsInfoBoxEl.classList.remove("hide");
                    // timeRemainingInSecsInfoBoxEl.classList.remove("hide");// to be commented
                }
                // distanceRemainingInfoBoxEl.querySelector('.mars_probe_ch_info_box_stats_val').textContent=addComas(state.remainingDistance);

            }

            updateUIForCoveredDistance();
            updateSpeed();
            updateUIForRemainingDistance();
            updateUIForRemainingTime();

            



        }


        getJSON('https://admin.emiratesmarsmission.ae/probe-info', function(response) {
            // console.log('Your public IP address is: ' , response);
            initAppWithData(response);
            updateData();
        }, function(status) {
            hopeMarsProbeContEl.classList.add("hide");
            console.log('error in getting the distance and speed');
        });

        getJSON('https://admin.emiratesmarsmission.ae/site-data', function(response) {
            // console.log('Your public IP address is: ' , response);
            console.log("ggg");
            console.log(response);
            if(response && typeof response[0] != "undefined" && response[0] && typeof response[0]["value"] != "undefined" && response[0]["value"]){
                hopeMarsProbeData.timeStampToReachMarsOrbit = new Date(response[0]["value"].split(" ").join("T") + "Z");
                hopeMarsProbeContEl.querySelector('.mars_probe_ch_info_box.remaining_time').classList.remove("hide")
                window.cancelAnimationFrame(lastAnimationFrameScheduledId);
            }
        }, function(status) {
            hopeMarsProbeContEl.querySelector('.mars_probe_ch_info_box.remaining_time').classList.add("hide")
            console.log('error in getting the countdown time');
        });

    }

})();

