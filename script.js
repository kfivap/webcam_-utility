'use strict';


var constraints = { audio: false, video: { width: 1920, height: 1080 } };

navigator.mediaDevices.getUserMedia(constraints)
.then(function(mediaStream) {
  var video = document.querySelector('video');
  video.srcObject = mediaStream;
  video.onloadedmetadata = function(e) {
    video.play();
  

    //document.querySelector('div').style.height('200px')
  };
})
.catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

let size=[360,480,720,1080]
for (let i of size){
  document.getElementById(`w${i}`).addEventListener('click', function(){

  document.getElementById('video').style.height=(`${i}px`)
  document.querySelector('canvas').style.height=(`${i}px`)
})


}



var video=document.querySelector('video');
var canvas=document.querySelector('canvas');
var context=canvas.getContext('2d');
var w,h,ratio;

//add loadedmetadata which will helps to identify video attributes

video.addEventListener('loadedmetadata', function() {
  ratio = video.videoWidth/video.videoHeight;
  w = video.videoWidth-100;
  h = parseInt(w/ratio,10);
  canvas.width = w;
  canvas.height = h;
},false);



let snap_ispressed=false
let snap_button=document.getElementById('snap')
snap_button.addEventListener('click', function() {
  if(snap_ispressed==false){
    setTimeout(function(){
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


document.getElementById('download_btn').addEventListener('click',function(){
var download = document.getElementById("download");
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
