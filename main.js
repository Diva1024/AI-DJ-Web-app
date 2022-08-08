var song="";
var leftwristX=0;
var leftwristY=0;
var rightwristY=0;
var rightwristX=0;
var score_leftwrist=0;
var score_rightwrist=0;
function preload(){
song=loadSound("WDTA.mp3");
}
function setup(){
canvas=createCanvas(500,500);
canvas.position(530,200);
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video,modelloaded);
poseNet.on("pose",gotPoses);
}
function draw(){
image(video,0,0,500,500);
fill("#4247db");
stroke("#05050a");
if(score_rightwrist>0.2)
{
circle(rightwristX,rightwristY,20);
if(rightwristY>0&&rightwristY<=100){
    document.getElementById("speed").innerHTML="Speed = 0.5x";
    song.rate(0.5);
}
 else if(rightwristY>100&&rightwristY<=200){

document.getElementById("speed").innerHTML="Speed = 1x";
song.rate(1);


 }
 else if(rightwristY>200&&rightwristY<=300){

    document.getElementById("speed").innerHTML="Speed = 1.5x";
    song.rate(1.5);
    
    
 }
 else if(rightwristY>300&&rightwristY<=400){

    document.getElementById("speed").innerHTML="Speed = 2x";
    song.rate(2);
    
    
     }
     else if(rightwristY>400&&rightwristY<=500){

        document.getElementById("speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
        
        
         }
        }



if(score_leftwrist>0.2){
    circle(leftwristX,leftwristY,20);
    numberleftwrist_y=Number(leftwristY);
    remove_decimals=floor(numberleftwrist_y);
    volume=remove_decimals/500;
    document.getElementById("volume").innerHTML="volume = "+ volume;
    song.setVolume(volume);
}


}
function play(){
    song.play();
    song.setVolume(0.1);
    song.rate(1);

}
function stop(){
    song.stop();
}
function modelloaded(){
    console.log("poseNet is initialized" );

}
function gotPoses(results){
if (results.length>0){
    console.log(results);
    score_rightwrist=results[0].pose.keypoints[10].score;
    score_leftwrist=results[0].pose.keypoints[9].score;
    console.log("score_rightwrist= " + score_rightwrist +"score_leftwrist = "  +score_leftwrist);


    leftwristX=results[0].pose.leftWrist.x;
    leftwristY=results[0].pose.leftWrist.y;
    console.log("leftwrist x = "+ leftwristX + "leftwrist y = "+ leftwristY);


    rightwristX=results[0].pose.rightWrist.x;
    rightwristY=results[0].pose.rightWrist.y;
    console.log("rightwrist x = "+ rightwristX + "rightwrist y = "+ rightwristY);
}
}