/**
 * INITIAL SETTINGS
 */
var video = document.querySelector("#videoElement");
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var localstream;
document.getElementById("snap").addEventListener("click", function () {
    context.drawImage(video, 0, 0, 640, 480);
});



document.getElementById("getImage").addEventListener("click", () => {
    var base64image = document.getElementById("canvas");
    var dataURL = base64image.toDataURL('image/jpeg', 1.0);
    console.log(dataURL);
})

let  myPreferredCameraDeviceId = "xDBy1WJccJfWaQKAahiYXWU1Ij5prw3PD+PyEUxdJMw="
let  myExactCameraOrBustDeviceId = "xDBy1WJccJfWaQKAahiYXWU1Ij5prw3PD+PyEUxdJMw="
if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
            video: { deviceId: myPreferredCameraDeviceId }
            //video: { deviceId: { exact: myExactCameraOrBustDeviceId } }
        })
        .then(function (stream) {
            localstream = stream;
            video.srcObject = stream;
            let mm  = stream.getVideoTracks();
            console.log(mm);
            // const track = stream.getVideoTracks()[0];
            // imageCapture = new ImageCapture(track);
            // let rr = imageCapture.getPhotoCapabilities();
            // console.log(rr);
        })
        .catch(function (error) {
            console.log("Something went wrong!");
            console.log(error);
        });
} else {
    console.log("BAG");
}


document.getElementById("stopCamera").addEventListener("click", function(){
    console.log("localstream : ", localstream);
    console.log("localstream.id : ", localstream.id);
    console.log("localstream.getTracks : ", localstream.getTracks());
    console.log("localstream.getVideoTracks : ", localstream.getVideoTracks());
    console.log("localstream.getVideoTracks [0] : ", localstream.getVideoTracks()[0]);
    //var track = MediaStream.getTrackById(id);
    //localstream.pause();
    //localstream.src = "";
    localstream.getTracks()[0].stop();
    console.log("Vid off");
})



/**
 * LISTENERS
 */

video.addEventListener('ended', (event) => {
    console.log('Video LISTENER - radi samo na FF i to kada se iskljuci');
});

navigator.mediaDevices.ondevicechange = function (event) {
    console.log("PROMENIO - na FF samo radi kada se iskljuci, CHROME RADI KAKO TREBA");
}
navigator.mediaDevices.addEventListener('devicechange', (event) => {
    console.log("REGISTER CHANGE - na FF radi samo kada se iskljuci, CHROME RADI KAKO TREBA");
    console.log(event);
});





/**
 * INTERVAL
 */
setInterval(() => {
    
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {

            devices.filter(list => {
                return list.kind === 'videoinput';
            }).forEach(function (device) {
                console.log(device);
                console.log(device.kind + ": " + device.label + " id = " + device.deviceId);
            });

        })
        .catch(function (err) {
            console.log(err.name + ": " + err.message);
        });
    console.log("------ : --------");
}, 10000);


/**
 * ADD MORE
 */
function detectWebcam(callback) {
    let md = navigator.mediaDevices;
    if (!md || !md.enumerateDevices) return callback(false);
    md.enumerateDevices().then(devices => {
        callback(devices.some(device => 'videoinput' === device.kind));
    })
}

detectWebcam(function (hasWebcam) {
    console.log('Webcam: ' + (hasWebcam ? 'yes' : 'no'));
})
