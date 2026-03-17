//To-Do Finsih level code editing system
//To-Do
//Beyond Classes
var tester;
var playerSprite = [];
var sound;
let pixelFont;
var letter;
var letters = [];
function preload(){
  userStartAudio()
  sounds[0] = loadSound('Sound_FX/jump.wav');
  sheet = loadImage('game_assets/tiles1.png');
  pSheet = loadImage('game_assets/player1.png');
  letter = loadImage('game_assets/PatchNotesJamLetters.png');
  sound = loadSound('Patch Notes.mp3')// Make sure the path is correct
 // let url = 'https://drive.google.com/uc?id=17sSGoMwskMvRzk9sj1FiRv6qAx_4-7Uj&export=download';
 //tester = loadSound(url);
  //Musical+testtt2.wav
  //Game_Music2.wav
 // tester = loadSound('game_assets/Game_Music2.wav');
  
}

//Void Setup
function setup() {
  
  let canvas = createCanvas(1000,600)
  canvas.position(width/4,height/4)
  frameRate(60)
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  noSmooth();
  
  textFont('Pixelify Sans')
  
  anchor = createVector(null,null);
  ansize = createVector(0,0);
  cam = createVector(500,300);
  trucam = createVector(500,300);
  camv = createVector(0,0);
  mouser = createVector(0,0);
  mouserH = createVector(0,0);
  drift = createVector(0,0);
  buildLevel();
  
  let sizer = createVector(70,14);
  for(let i=0; i<sizer.x; i++){
    tileSprite[i]=[];
    for(let c=0; c<sizer.y; c++){
      tileSprite[i][c] = sheet.get(i*sheet.width/sizer.x,c*sheet.height/sizer.y,sheet.width/sizer.x,sheet.height/sizer.y);
    }
  }
  for(let i=0; i<sizer.x/2; i++){
    tileFull[i]=[];
    for(let c=0; c<sizer.y/2; c++){
      tileFull[i][c] = sheet.get(i*sheet.width/sizer.x*2,c*sheet.height/sizer.y*2,sheet.width/sizer.x*2,sheet.height/sizer.y*2);
    }
  }
  //sizer = undefined;
  sizer = createVector(5,5);
  for(let i=0; i<sizer.x; i++){
    playerSprite[i]=[];
    for(let c=0; c<sizer.y; c++){
      playerSprite[i][c] = pSheet.get(i*pSheet.width/sizer.x,c*pSheet.height/sizer.y,pSheet.width/sizer.x,pSheet.height/sizer.y);
    }
  }
  sizer = createVector(4,4);
  for(let i=0; i<sizer.x; i++){
    letters[i]=[];
    for(let c=0; c<sizer.y; c++){
      letters[i][c] = letter.get(i*letter.width/sizer.x,c*letter.height/sizer.y,letter.width/sizer.x,letter.height/sizer.y);
    }
  }
 // world.gravity.y = 30;
  
//  player1.makeSprite();
 //tester.loop();
  player1.skinx = 3;
 // player1.skinx = floor(random(0,5))
 // player1.skiny = floor(random(0,1))
  sound.loop();
  sound.setVolume(1)
  sounds[0].setVolume(0.1)
}
//Global Variables
if("variables"=="variables"){
var cameray = 0;
var camerax = 0;
var width = 1000;
var height = 600;
  var buttonS1 = 0;
var buttonS2 = 0;
var buttonS3 = 0;
//xaccel, drag, constantDrag, gravity, jumpStrength, MaxJumps, Xpos, Ypos, sizex, sizey, xvel(0), yvel(0), KeyMap, outline color
  //              xaccel -v codrag-v jump-v
var player1 = new player(4.35,1.3,2,0.5,10,1,500,260,19,24,0,0,["up","left","down","right","w","a","s","d"],"rgb(149,255,241)"); //    drag-^ grav -^.maxj-^

/*
//without presets
var player1 = new player(2.2,1.06,1.4,0.8,18,2,200,- 50,25,25,0,0,["w","a","s","d"],"rgb(149,255,241)");
var player2 = new player(2.2,1.06,1.4,0.8,18,2,width-200,-50,25,25,0,0,["up","left","down","right"],"rgb(251,253,169)");
  var player3 = new player(2.2,1.06,1.4,0.8,18,2,width/2,-50,25,25,0,0,["i","j","k","l"],"rgb(129,253,129)");
*/
//Xpos,Ypos,width,height
var blocks = [];
  //block particle
var blockP = [];
//turrent shoots
var bullets = [];
//bullet trail/particle
var bulletsP = [];
//If you are allowed to edit the level
var levelEdit =false;

//LevelEdit Modes
var editMode = "place";
var placeT = 1;
var particles = [];
var anchor;
var ansize;
var placing = false;
var cam;
var trucam;
var camv;
var mouser;
var playerEdit = false;
var selEdit = -1;
var nextRot = 0;
var nextRange = 5;
var nextDelay = 0;
var gate = false;
var lock = -1;
var zoom = 180;
var shake = 0;
var levelCode = levels[0];
var currentLevel = 0;
var fade = 7;
var screen = 2;
var titleFont;
var skipS = 1;
var skipSV = 0;
var bar = false;
var barS = 1;
var barSV = 0;
var bS = [1,1];
var bSV = [0,0];
var copyBlock;
var copied = false;
//sounds
var sounds = [];
var tileSprite = [];
var tileFull = [];
var sheet;
var pSheet
var fps = 60;
var boxes = [];
var mouserH;
var preFrame = [false];
var playersP = [];
var camP = false;
var drift;
var aver = 0;
var imageSize = 15.5;
var dials = [];
var cur = "";
var dt = 0;
var dst = 1;
  var idle = 0;
  var prmx = 0;
  var prmy = 0;
var cred = 0;
}

//Void Draw
function draw() {
  // print(frameRate())
  idle++;
 // print(idle)
  if(prmx!=mouseX||prmy!=mouseY){
     idle = 0;
     }
  prmx = mouseX;
  prmy = mouseY;
 // print(dt)
  if(dials.length>0&&frameCount%1==0){
  if(dt<dials[0].length&&dt>=0&&dst==-1){
     cur = cur.slice(0, -1);
    if(cur==""&&dt>=5){
        dt=5;
    }
  }
  }
  if(dials.length>0&&frameCount%((dials.length>=2) ? 2 : 4)==0){
    if(dt<dials[0].length&&dt>=0&&dst==1){
  cur+=dials[0][dt];
  }
    dt+=dst;
    
    if(dt>=dials[0].length*1.2+5){
       dst = -1;
    }
    if(dt<0){
       dst=1;
      dials.splice(0,1);
     }
}
 // console.log(blocks[0].collideWith,blocks[0].fullCollide);
   // aver+=frameRate()*1;
  shake/=1.5;
  if(keyIsDown(187)){
    player1.px=500;
    player1.py=300;
    player1.prex=500;
    player1.prey=300;
  }
 // noCursor();
  push();
  pop()
   background(60,120,116,200);
  background(255,50);
  resetMatrix();
 // screenZero();
 if(screen == 1){
   offUpV-=15;
   let speeder = 7.5;
   if(blocks.findIndex(hold => rectHit(hold.bx,hold.by,player1.px,player1.py,hold.bsx,hold.bsy,player1.psx,player1.psy)&&hold.type==11)==-1||keyIsDown(66)||camP){
  cam.add(-(cam.x-(player1.px))/speeder,-(cam.y-(player1.py))/speeder);
 }
  trucam = createVector(500-cam.x,300-cam.y);
  mouser=createVector((mouseX-500)/(zoom/100)-trucam.x+500,(mouseY-300)/(zoom/100)-trucam.y+300);
   if(abs(player1.xvel)+abs(player1.yvel)<=1&&!levelEdit){
     drift.x-=(noise((frameCount-1)/400,5)-0.5)*40;
     drift.y-=(noise((frameCount-1)/400,6)-0.5)*40;
     
     drift.x+=(noise(frameCount/400,5)-0.5)*40;
     drift.y+=(noise(frameCount/400,6)-0.5)*40;
   }else{
     drift.x/=1.1;
     drift.y/=1.1;
   }
   translate(drift.x,drift.y)
   translate(random(-shake,shake),random(-shake,shake))
  translate(500,300);
  scale(zoom/100,zoom/100);
  translate(-500,-300);
  translate(trucam);
  strokeWeight(5);
  stroke(255);
  noFill();
  trueStart(255);
  bulletShow();
  for(let i=0; i<boxes.length; i++){
    push();
      translate(boxes[i].x,boxes[i].y);
    noFill();
    stroke("#EFDFCC");
    rotate(boxes[i].rotation);
    rect(0,0,boxes[i].width,boxes[i].height,5);
    pop();
  }
  particlesDisplay();
  tiles2();
  unload();
   tiles();
   players();
   levelEditor();
   for(let i=playersP.length-1; i>=0; i--){
     playersP[i].display();
    if(!rectHit(-trucam.x+500,-trucam.y+300,playersP[i].x,playersP[i].y,1000*100/zoom,600*100/zoom,60,60)){
      playersP.splice(i,1);
    }
   }
  if(levelEdit){
  if(keyIsDown(65)){
    zoom/=1.03;
  }
  if(keyIsDown(68)){
    zoom*=1.03;
  }
  if(keyIsDown(83)){
    zoom=100;
  }
  }
   
  }
  if(screen==2){
  screenZero();
  }
  resetMatrix();
  translate(500,300);
  scale(zoom/100,zoom/100);
  translate(-500,-300);
  translate(trucam);
  mouser=createVector((mouseX-500)/(zoom/100)-trucam.x+500,(mouseY-300)/(zoom/100)-trucam.y+300);
  mouseSkin();
  resetMatrix();
  stroke(255);
  noFill();
  if(levelEdit){
    translate(60,60);
    rotate(sin(frameCount/20)/10);
    fill(255,40);
    rect(0,0,70,70,20+sin(frameCount/100)*10);
    noFill();
    rotate(-sin(frameCount/20)/5);
    if(placeT==1){
      rect(0,0,30,30,5);
    }
    if(placeT==2){
      rect(0,0,30,15,5);
    }
    if(placeT==3){
      thinSpike(0,0,255);
    }
    if(placeT==4){
      thinCheck(0,10,30,255);
    }
    if(placeT==6){
      thinTurret(0,0,0,255);
    }
    if(placeT==7){
      thinPortal(0,0,255);
    }
    if(placeT==8){
      thinSign(0,0,255);
    }
    if(placeT==9){
      rect(random(-2,2),random(-2,2),30,30,5);
    }
    if(placeT==10){
      thinLaser(0,0,5,255);
    }
    if(placeT==11){
      thinCam(0,0,255);
    }
  }

 sound.setVolume(0.4);
  if(currentLevel==9){
    screen = 3;
    //levelEdit = false;
  }
  if(screen == 3){
    cred-=0.9;
    translate(0,cred);
    background(60,120,116,200);
    background(255,50);
     fill(255);
  noStroke();
  textSize(80);
     toxt(["T","h","a","n","k","s"," ","F","o","r"," ","P","l","a","y","i","n","g","!","!","!"],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],500,260);
     push();
  fill(255);
  noStroke();
  textSize(40);
    angleMode(DEGREES)
    toxt(["A Game Made By: ","E","m","p","t","y"," ","C","o","n","s","o","l","e"],[false,true,true,true,true,true,true,true,true,true,true,true,true,true],500,360);
     toxt(["Level Designers:"],[false,true,true,true,true,true,true,true,true,true,true,true,true,true],500,440);
    toxt(["S","h","y","G","u","y"],[true,true,true,true,true,true,true,true,true,true,true,true,true],500,490);
      toxt(["H","F","_","a","n","g"],[true,true,true,true,true,true,true,true,true,true,true,true,true],500,540);
     toxt(["Programmers:"],[false,true,true,true,true,true,true,true,true,true,true,true,true,true],500,600);
     toxt(["S","h","y","G","u","y"],[true,true,true,true,true,true,true,true,true,true,true,true,true],500,700);
      toxt(["H","F","_","a","n","g"],[true,true,true,true,true,true,true,true,true,true,true,true,true],500,650);
     toxt(["2D Art By:"],[false,true,true,true,true,true,true,true,true,true,true,true,true,true],500,760);
     toxt(["H","F","_","a","n","g"],[true,true,true,true,true,true,true,true,true,true,true,true,true],500,810);
     toxt(["Music By:"],[false,true,true,true,true,true,true,true,true,true,true,true,true,true],500,870);
    toxt(["S","h","y","G","u","y"],[true,true,true,true,true,true,true,true,true,true,true,true,true],500,970);
    toxt(["T","o","o","f","f","u"],[true,true,true,true,true,true,true,true,true,true,true,true,true],500,920);
     textSize(80);
    toxt(["H","o","p","e"," ","Y","o","u"," ","H","a","d"," ","F","u","n","!"],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,true],500,1100);
   // toxt(["Level Designer: ","s","h","y","g","u","y","g","a","m","e","d","e","v"],[false,true,true,true,true,true,true,true,true,true,true,true,true,true],500,420);
    pop();
    if(cred<=-1100){
      screen=2;
      currentLevel=0;
      cred = 0;
      player1.changeLevel(0);
    }
  }
  resetMatrix();
  push();
  textSize(50);
  strokeWeight(2)
  fill(255);
  textAlign(CENTER,CENTER);
  text(cur,500,100);
  pop();
}
//P1 and P2 Players
function players(){
  player1.actions();
}
