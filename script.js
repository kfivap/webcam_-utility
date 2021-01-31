'use strict';
let preview = document.getElementById("video");
let recording = document.getElementById("recording");
let startButton = document.getElementById("startButton");
let stopButton = document.getElementById("stopButton");
let downloadButton = document.getElementById("downloadButton");

let recording_div = document.getElementById('recording_div')


let video_resolution={ width: 1280, height: 720 }
let constraints = { audio: false, video: video_resolution};
function start_preview(){
    recording_div.style.display=('none')
  preview.style.display=('block')
navigator.mediaDevices.getUserMedia(constraints)
.then(function(stream) {
  var video = document.querySelector('video');
  video.srcObject = stream;
  console.log(stream)
  video.onloadedmetadata = function(e) {
    video.play();
    canvas.style.display=('none')
     video.style.display=('block')
    snap_button.innerHTML='Snap Photo'

  startButton.disabled=false
  stopButton.disabled=false
  snap_button.disabled=false
  downloadButton.disabled=false



  document.getElementById('download').style.cssText=(' ')

    //document.querySelector('div').style.height('200px')
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.
}

start_preview()

function stop_preview() {
  try{
  video.srcObject.getTracks().forEach(track => track.stop());



  }
  catch (e){
    console.log(e)
  }
}


let size=[[640, 360],[854, 480],[1280, 720],[1920,1080]]
for (let i of size){
  document.getElementById(`w${i[1]}`).addEventListener('click', function(){
    stop_preview()
    video_resolution={ width: i[0], height: i[1] }
    constraints = { audio: false, video: video_resolution }
    start_preview()

    ;

  //document.getElementById('video').style.height=(`${i}px`)
  //document.querySelector('canvas').style.height=(`${i}px`)
})


}



var video=document.querySelector('video');
var canvas=document.querySelector('canvas');
var context=canvas.getContext('2d');
var w,h,ratio;

//add loadedmetadata which will helps to identify video attributes

video.addEventListener('loadedmetadata', function() {

  w = video.videoWidth;
  h = video.videoHeight;
  console.log(w, h)
  canvas.width = w;
  canvas.height = h;
},false);



let snap_ispressed=false
let snap_timeout

let snap_button=document.getElementById('snap')
snap_button.addEventListener('click', function() {
  if(snap_ispressed==false){
    snap_timeout = setTimeout(function(){
          snap_ispressed=true
  context.fillRect(0,0,w,h);
  context.drawImage(video,0,0,w,h);
canvas.style.display=('block')
video.style.display=('none')
snap_button.innerHTML='Resnap'
document.getElementById('download_btn').style.display=('inline-block')
}, timer.value*1000)

}
  else{
      snap_ispressed=false
      canvas.style.display=('none')
  video.style.display=('block')
  snap_button.innerHTML='Snap Photo'
  }

})
var download

document.getElementById('download_btn').addEventListener('click',function(){
download = document.getElementById("download");
var image = document.getElementById("myCanvas").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
download.setAttribute("href", image);
//download.setAttribute("download","archive.png");
})


document.getElementById('fullscreen').addEventListener('click',function(){
video.requestFullscreen()})


let timer=document.getElementById('timer')
timer.addEventListener('input',function(){
console.log(timer.value)
document.getElementById('delay').innerHTML=timer.value
})



//////

document.querySelector('.dropbtn').addEventListener('click',function () {
  document.getElementById("myDropdown").classList.toggle("show");
})

// Close the dropdown menu if the user clicks outside of it
document.addEventListener('click', function(){
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
})


////////////




//startButton.disabled=true


 function startRecording(stream) {
  let recorder = new MediaRecorder(stream);
  let data = [];
  startButton.disabled=true
  recorder.ondataavailable = event => data.push(event.data);
  recorder.start();
  
 
  let stopped = new Promise((resolve, reject) => {
    recorder.onstop = resolve;
    recorder.onerror = event => reject(event.name);
  });


 
  return Promise.all([
    stopped,
   
  ])
  .then(() => data);
}
 function stop(stream) {
  stream.getTracks().forEach(track => track.stop());
}
 startButton.addEventListener("click", function() {
  canvas.style.display=('none')
  video.style.display=('block')
  snap_button.innerHTML='Snap Photo'
  recording_div.style.display=('none')
  preview.style.display=('block')
  


  clearTimeout(snap_timeout)
//stop_preview()
  if(video.srcObject){ stop_preview()}
    

  navigator.mediaDevices.getUserMedia({
    video: video_resolution,
    audio: true 
  }).then(stream => {
    console.log(stream)
    preview.srcObject = stream;
    downloadButton.href = stream;
    preview.captureStream = preview.captureStream || preview.mozCaptureStream;
    return new Promise(resolve => preview.onplaying = resolve);
  }).then(() => startRecording(preview.captureStream()))
  .then (recordedChunks => {
    let recordedBlob = new Blob(recordedChunks, { type: "video/mp4" });
    console.log(recordedBlob)
    recording.src = URL.createObjectURL(recordedBlob);
    downloadButton.href = recording.src;
    downloadButton.download = "RecordedVideo.mp4";
    
    
  })
  ;
}, false); 



stopButton.addEventListener("click", function() {
  stop(preview.srcObject);
  recording_div.style.display=('block')
  preview.style.display=('none')
  startButton.disabled=false
}, false);





let Start_previev_btn = document.getElementById('Start_previev_btn')
Start_previev_btn.addEventListener('click', function(){
  stop_preview()
  start_preview()
})




startButton.disabled=true
stopButton.disabled=true
snap_button.disabled=true
downloadButton.disabled=true

document.getElementById('download').style.cssText=('pointer-events: none;')
//document.getElementById('download').style.cssText=('')

recording_div.style.display=('none')

