var b = new button(500,465,250,100,1,0.2,1.2,1.3);
var sett = new button(500,535,377,90,1,0.2,1.2,1.4);
var startS = 1;
var startSV = 0;
var startS2 = 1;
var startSV2 = 0;
var offUp = 0;
var offUpV = 0;
function screenZero(){
  background(60,120,116,200);
  background(255,40);
 // buttonS1 = buttonS1%2;
  if(buttonS1<0){
    buttonS1=1;
  }
     angleMode(DEGREES)
    fill(255);
    stroke(255)
    strokeWeight(5);
    textSize(110)
    textFont('Pixelify Sans');
    let words = [5,1,6];
    for(let i=0; i<words.length; i++){
      push();
      translate(500-words.length*60+60+120*i,250);
      rotate(sin(frameCount*3+i*20)*10)
      image(letters[words[i]%4][floor(words[i]/4)],0,0,120,120);
      //text(words[i],0,0);
      pop();
    }
  push();
  textSize(60);
  translate(500,177);
  rotate(sin(frameCount*2)*5);
   strokeWeight(5);
 // text(". . .",0,0);
  pop();
  words = [7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7];
    for(let i=0; i<words.length; i++){
      push();
      translate(500-words.length*30+30+60*i+random(-3,3),190+random(-3,3));
      rotate(-sin(frameCount*3+i*20)*3+i*50)
    // image(letters[words[i]%4][floor(words[i]/4)],0,0,120,120);
      pop();
    }
  words = [0,1,2,2,3,4];
    for(let i=0; i<words.length; i++){
      push();
      translate(500-words.length*60+60+120*i,110);
      rotate(-sin(frameCount*3+i*20)*10)
     image(letters[words[i]%4][floor(words[i]/4)],0,0,120,120);
      pop();
    }
  push();
  fill(255);
  noStroke();
  textSize(40);
  toxt(["By: ","E","m","p","t","y"," ","C","o","n","s","o","l","e"],[false,true,true,true,true,true,true,true,true,true,true,true,true,true],500,360);
  pop();
  //x,y,sx,sy,scale,scalev,dragv,drag
  b.work();
  push();
  textSize(90);
  noFill();
  strokeWeight(6.5);
  stroke("#222034");
  strokeWeight(10);
  translate(b.x,b.y);
  scale(b.size,b.size);
  rect(0,0,b.sizeX,b.sizeY);
  textAlign(CENTER,CENTER);
  strokeWeight(3);
  fill("#222034");
  text("PLAY",0,2.5);
  pop();
   if(b.clicked){
    screen = 1; 
    // print(2)
   }
}

function toxt(words,color,x,y){
  let s = 0;
  let full = 0;
  for(let w = 0; w<words.length; w++){
    full+=textWidth(words[w]);
  }
  for(let w = 0; w<words.length; w++){
    if(color[w]){
      text(words[w],x-full/2+s+textWidth(words[w])/2,y+sin(w*20+frameCount*5)*5);
    }else{
      text(words[w],x-full/2+s+textWidth(words[w])/2,y);
    }
    s+=textWidth(words[w]);
  }
}