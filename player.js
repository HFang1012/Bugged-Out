class playerP{
  constructor(a,b,c,d,e,f){
    this.x = a;
    this.y = b;
    this.xvel = c;
    this.yvel = d;
    if(abs(this.xvel)<=0.5){
      this.xvel=(floor(random(0,2))*2-1)*random(3,4);
    }
    this.type = e;
    this.typey = f;
    this.roll = 0;
  }
  display(){
    this.x+=this.xvel*1.1;
    this.y+=this.yvel;
    this.yvel+=0.7;
    this.xvel/=1.01;
    this.roll+=abs(this.xvel/60);
    push();
    translate(this.x,this.y)
    scale(this.xvel/abs(this.xvel),1);
    rotate(this.roll)
    image(playerSprite[this.type%5][this.typey],0,0,30,30);
    pop();
  }
}
//Player Class
class player{   
  constructor(a,b,c,c2,d,e,f,g,h,i,j,k,l,m){
    //Effected variables
    this.xacc = a;
    this.drag = b;
    this.ogDrag=b;
   // this.specialDrag=0.9
    //Constant drag instead of dividing
    this.constdrag = c
    this.gravity = c2;
    this.jumpSt = d;
    this.jumps = 0;
    this.maxJumps = e;
    //Position
    this.px = f;
    this.py = g;
    //Checkpoint x and y positions
    this.checkx = f;
    this.checky = g;
    
    //True Starting position
    this.startx = f;
    this.starty = g;
    //Previous, nessasary for platform collision/slide
    this.prex = f
    this.prey = g
    //size
    this.psx = h;
    this.psy = i;
    //Velocity
    this.xvel = j;
    this.yvel = k;
    this.bvel = 0;
    //Key inputs
    this.keyIn = ischars(l);
    this.keyO = [];
    for(let i=0; i<this.keyIn.length; i++) this.keyO[this.keyO.length] = this.keyIn[i];
    this.jumpDown = false;
    //Optional for Player skinx Example
    this.coreTick = 0;
    this.outline = m;
    //Can Collide Or Not
    this.collide = true;
    this.rot = 0;
    this.corex = f;
    this.corey = g;
    this.corexv = 0;
    this.coreyv = 0;
    this.coreOut = false;
    this.corext = f;
    this.coreyt = g;
    this.coreLock = false;
    this.direction = 1;
    this.playerCol;
    this.roll = 0;
    this.roller = 0;
    this.rollerv = 0;
    this.showable = true;
    this.skinx = 2;
    this.skiny = 0;
    this.crouch = 0;
    this.crouchv = 0;
  }
  actions(){
    if(playerEdit == false){
      if(levelEdit==true){
        this.keyIn[4] = 80;
        this.keyIn[5] = 80;
        this.keyIn[6] = 80;
        this.keyIn[7] = 80;
      }else{
        for(let i=0; i<this.keyIn.length; i++) this.keyIn[i] = this.keyO[i];
      }
    //Previous must be set at top to insure it is the previous when used in collision
    this.prex = this.px;
    this.prey = this.py;
      if(!keyIsDown(16)){
    //Movement Inputs
    if(keyIsDown(this.keyIn[3])||keyIsDown(this.keyIn[7])){
      this.xvel+=this.xacc;
    }
    if(keyIsDown(this.keyIn[1])||keyIsDown(this.keyIn[5])){
      this.xvel-=this.xacc;
    }
    if((keyIsDown(this.keyIn[0])||keyIsDown(this.keyIn[4])||keyIsDown(32))&&(this.jumpDown||this.jumps==this.maxJumps)&&this.jumps>0){
       sounds[0].play(); 
       sounds[0].setVolume(random(0.05,0.1))
      sounds[0].rate(random(0.9,1.0));
      this.yvel=-this.jumpSt;
      this.jumpDown = false;
      this.jumps--;
      for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-10,10),this.py-12,this.px+cos(random(-180,0)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-180,0)*PI/180)*10,random(3,9));
           }
    }
    if(keyIsDown(this.keyIn[0])!=true&&keyIsDown(this.keyIn[4])!=true&&keyIsDown(32)!=true){
      this.jumpDown=true;
    }
        if(!levelEdit){
           
           }
      }
    if(keyIsDown(78)&&levelEdit){
      this.collide = false;
    }else{
      this.collide = true;
    }
    //Modify Cords
    this.xvel/=this.drag;
    this.bvel/=1.15;
    // if(this.bvel<=0.000000000001){
    //   this.bvel=0
    // }
    let direction = this.xvel/abs(this.xvel)
    if(abs(this.xvel)-abs(this.constdrag)<0){
      this.xvel=0
    }else{
      this.xvel-=direction*this.constdrag   
    }
    this.yvel+=this.gravity;
    
    //Add Cords
    this.px+=this.xvel;
    this.px+=this.bvel;
    this.py+=this.yvel;
    //This.collide checks if you can collide with objects, this prevents a few clips(unintentional phasing through blocks)
    this.drag = this.ogDrag;
    if(this.collide){
      this.player_move_and_slide();
    }
    
      this.death_collide();
    //Technically only used for one frame so it is reset after
    this.collide = true;
    
    //skinx, Core
    this.coreTick+=((this.xvel))*1.5;
    this.coreTick=this.coreTick%360;
    }else if(!keyIsDown(16)){
      
      if(keyIsDown(this.keyIn[3])){
      this.xvel+=this.xacc;
      }
      if(keyIsDown(this.keyIn[1])){
        this.xvel-=this.xacc;
      }
      if(keyIsDown(this.keyIn[0])){
      this.yvel-=this.xacc;
      }
      if(keyIsDown(this.keyIn[2])){
        this.yvel+=this.xacc;
      }
      this.xvel/=this.drag;
      this.yvel/=this.drag;
      let direction = this.xvel/abs(this.xvel)
      if(abs(this.xvel)-abs(this.constdrag)<0){
        this.xvel=0
      }else{
        this.xvel-=direction*this.constdrag   
      }
      direction = this.yvel/abs(this.yvel)
      if(abs(this.yvel)-abs(this.constdrag)<0){
        this.yvel=0
      }else{
        this.yvel-=direction*this.constdrag   
      }
      //Add Cords
    this.px+=this.xvel;
    this.px+=this.bvel;
    this.py+=this.yvel;
      
    }
    if(this.showable){
    push();
    noStroke();
  //  fill();
      fill(255)
   // rect(this.px,this.py,this.psx,this.psy,6);
    if(((this.xvel/abs(this.xvel)))!=0&&!isNaN(((this.xvel/abs(this.xvel))))){
      this.direction = this.xvel/abs(this.xvel);
    }
    translate(this.px,this.py+this.psy/2-15)
    this.roll+=abs(this.xvel)/20;
    if(this.xvel<=2){
      this.roll-=0.05;
       }
    this.roller+=abs(this.xvel)/20;
    translate(0,15);
    scale(1,-this.crouch+1)
    translate(0,-15);
    scale(this.direction-this.direction*max(this.yvel/50,-0.1),1+max(this.yvel/30,-0.1));
     // print(this.direction-this.direction*max(this.yv\el/50,-0.1),1+max(this.yvel/30,-0.1))
    translate(0,15);
    rotate(sin(PI/2+this.roll)/10);
    this.roller = this.roller%(2*PI);
    this.rollerv += 0.05;
    this.roller -= this.rollerv;
    this.roller = max(0,this.roller)
      if(this.roller<=0){
        this.rollerv = 0;
      }
    translate(0,-15-(1+sin(3*PI/2+this.roller))*10);
   //   print(this.skinx,this.skiny)
    image(playerSprite[this.skinx%5][this.skiny],0,0,30,30);
    pop();
    this.useChecks();
  }
    if(frameCount%6==0){
      let fast = random(2,3)
       bulletsP[bulletsP.length] = new bulletP(this.px,this.py,this.px-this.xvel,this.py-this.yvel,fast);
    }
   // playersP[playersP.length] = new playerP(this.px,this.py,this.direction*random(1,2),-random(1,2),this.skinx);
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].type == 12&&!blocks[i].broken){
        if(rectHit(this.px,this.py,blocks[i].bx,blocks[i].by,this.psx,this.psy,blocks[i].bsx,blocks[i].bsy)){
          blocks[i].broken = true;
           this.yvel=-this.jumpSt;
          this.jumps = 0;
          sounds[0].play(); 
       sounds[0].setVolume(random(0.05,0.1))
          sounds[0].rate(random(1.3,1.5));
      for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-10,10),this.py-12,this.px+cos(random(-180,0)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-180,0)*PI/180)*10,random(7,15));
      }
          for(var u = 0; u<20; u++){
        bulletsP[bulletsP.length] = new bulletP(blocks[i].bx,blocks[i].by,blocks[i].bx+cos(random(-360,0)*PI/180)*10,blocks[i].by+sin(random(-360,0)*PI/180)*10,random(1,16),floor(random(1,3)));
           }
        }
      }
      }
  }
  
  restarter(){
     this.checkx = this.startx;
      this.checky = this.starty;
      this.respawn();
      let build = "";
       for(let i=0; i<blocks.length; i++){  
         build+=buildChange(blocks[i].bx)+buildChange(blocks[i].by)+buildChange(blocks[i].bsx)+buildChange(blocks[i].bsy)+buildChange(blocks[i].type)+buildChange(blocks[i].rotation)+buildChange(blocks[i].delay)+buildChange(blocks[i].range)+"C";
        
       }
      levelCode=build;
      buildLevel();
  }
  //COLLIDE
  
  player_move_and_slide(){
    let launched=false
    //Interaction with blocks(array of class block)
    //A system taking the possible new x and y positions, but only choosing the closest one, or right one.
    //Left X
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].fullCollide == true){
        if(blocks[i].collideWith == true){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      
      if(
        ((this.prex+this.psx/2)<=(bl.bx-bl.bsx/2)&&
        (this.px+this.psx/2)>=(bl.bx-bl.bsx/2)||
        (this.prex+this.psx/2)<=(bl.prebx-bl.bsx/2)&&
        (this.px+this.psx/2)>=(bl.bx-bl.bsx/2))&&
        (this.prey+this.psy/2)>(bl.by-bl.bsy/2)&&
        (this.prey-this.psy/2)<(bl.by+bl.bsy/2)
        ){
         newy[newy.length] = this.py
         newx[newx.length] = bl.bx-bl.bsx/2-this.psx/2
        
          newyv[newyv.length] = this.yvel
         
         newxv[newxv.length] = 0
         newj[newj.length] = false
        if(bl.type==16 || (bl.type==19 && bl.range==5)){
         // frameRate(random(30,90))
        }  
        if(bl.type==17|| (bl.type==19 && bl.range==6)){
          //newxv[newxv.length-1]=-22
          this.bvel = -15;
          //console.log("worked")
          //this.drag=this.specialDrag
          // newyv[newyv.length]=-this.yvel*0.5
          for(var u = 0; u<10; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(90,270)*PI/180)*10-this.xvel*2,this.py+12+sin(random(90,270)*PI/180)*10,random(1,8),2);
           }
        }
        if(bl.type==18||(bl.type==19 && bl.range==7)){
          newyv[newyv.length-1]=-20
          launched=true
          for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(90,270)*PI/180)*10-this.xvel*2,this.py+12+sin(random(90,270)*PI/180)*10,random(1,7),7);
           }
        }
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      this.px = newx[short]
      this.py = newy[short]
      this.xvel = newxv[short]
      this.yvel = newyv[short]
      if(newj[short]){
        this.jumps = this.maxJumps
      }
    }
        }
      }
    }
    //Right X
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].fullCollide == true){
        if(blocks[i].collideWith == true){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      if(
        ((this.prex-this.psx/2)>=(bl.bx+bl.bsx/2)&&
        (this.px-this.psx/2)<=(bl.bx+bl.bsx/2)||
        (this.prex-this.psx/2)>=(bl.prebx+bl.bsx/2)&&
        (this.px-this.psx/2)<=(bl.bx+bl.bsx/2))&&
        (this.prey+this.psy/2)>(bl.by-bl.bsy/2)&&
        (this.prey-this.psy/2)<(bl.by+bl.bsy/2)
        ){
         newy[newy.length] = this.py
         newx[newx.length] = bl.bx+bl.bsx/2+this.psx/2
          newyv[newyv.length] = this.yvel
         newxv[newxv.length] = 0
         newj[newj.length] = false
        if(bl.type==16 || (bl.type==19 && bl.range==5)){
        //  frameRate(random(30,90))
        }  
        if(bl.type==17|| (bl.type==19 && bl.range==6)){
          this.bvel = 15;
          //this.drag=this.specialDrag
          // newyv[newyv.length]=-this.yvel*0.5
          for(var u = 0; u<10; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(-90,90)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-90,90)*PI/180)*10,random(1,8),2);
           }
        }
        if(bl.type==18||(bl.type==19 && bl.range==7)){
          newyv[newyv.length-1]=-20
          launched=true
          for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(-90,90)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-90,90)*PI/180)*10,random(1,7),7);
           }
        }
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      this.px = newx[short]
      this.py = newy[short]
      this.xvel = newxv[short]
      this.yvel = newyv[short]
      if(newj[short]){
        this.jumps = this.maxJumps
      }
    }
      }
    }
    }
    //Upper Y
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].collideWith == true&&!(blocks[i].type==2&&(keyIsDown(this.keyIn[2]||keyIsDown(this.keyIn[6]))))){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      if(
        ((this.prey+this.psy/2)<=(bl.by-bl.bsy/2)&&
        (this.py+this.psy/2)>=(bl.by-bl.bsy/2)||
        (this.prey+this.psy/2)<=(bl.preby-bl.bsy/2)&&
        (this.py+this.psy/2)>=(bl.by-bl.bsy/2))&&
        (this.px+this.psx/2)>(bl.bx-bl.bsx/2)&&
        (this.px-this.psx/2)<(bl.bx+bl.bsx/2)
        ){
         newx[newx.length] = this.px
         newy[newy.length] = bl.by-bl.bsy/2-this.psy/2
         newxv[newxv.length] = this.xvel
          newyv[newyv.length] = 0
        if(launched){
           newyv[newyv.length-1] = this.yvel;
           }
         newj[newj.length] = true
        blocks[i].broken = true;
        this.drag=this.ogDrag
        if(bl.type==16 || (bl.type==19 && bl.range==5)){
         this.drag = (this.ogDrag-1)/4+1;
        }   
        if(bl.type==17|| (bl.type==19 && bl.range==6)){
          // newxv[newxv.length-1]=-30
          newyv[newyv.length-1]=-10
          for(var u = 0; u<10; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(-180,0)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-180,0)*PI/180)*10,random(1,8),2);
           }
        }
        if(bl.type==18||(bl.type==19 && bl.range==7)){
          newyv[newyv.length-1]=-20
          launched=true
          for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(-180,0)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-180,0)*PI/180)*10,random(1,7),7);
           }
        }
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      if(newj[short]){
        this.jumps = this.maxJumps
      }
                      this.px = newx[short]
      this.py = newy[short]
        if(this.yvel>=5){
           for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(-180,0)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-180,0)*PI/180)*10,random(1,4));
           }
           }
        if(abs(this.xvel)>=2&&frameCount%floor(random(3,8))==0){
        for(var u = 0; u<1; u++){
          bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px-this.xvel,this.py-random(-2,3),random(1,5));
      }
      }
      this.xvel = newxv[short]
      this.yvel = newyv[short]
    }
    }
    }
    //Lower Y
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].fullCollide == true){
        if(blocks[i].collideWith == true){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      if(
        ((this.prey-this.psy/2)>=(bl.by+bl.bsy/2)&&
        (this.py-this.psy/2)<=(bl.by+bl.bsy/2)||
        (this.prey-this.psy/2)>=(bl.preby+bl.bsy/2)&&
        (this.py-this.psy/2)<=(bl.by+bl.bsy/2))&&
        (this.px+this.psx/2)>(bl.bx-bl.bsx/2)&&
        (this.px-this.psx/2)<(bl.bx+bl.bsx/2)
        ){
         newx[newx.length] = this.px
         newy[newy.length] = bl.by+bl.bsy/2+this.psy/2
         newxv[newxv.length] = this.xvel
          newyv[newyv.length] = 0
        if(launched){
           newyv[newyv.length-1] = this.yvel;
           }
         newj[newj.length] = false
        if(bl.type==16 || (bl.type==19 && bl.range==5)){
        //  frameRate(random(30,90))
        }  
        if(bl.type==17|| (bl.type==19 && bl.range==6)){
          newyv[newyv.length-1]=10
          // this.drag=this.specialDrag
          // newyv[newyv.length]=-this.yvel*0.5
          for(var u = 0; u<10; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(0,180)*PI/180)*10-this.xvel*2,this.py+12+sin(random(0,180)*PI/180)*10,random(1,8),2);
           }
          
        }
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      this.px = newx[short]
      this.py = newy[short]
      this.xvel = newxv[short]
      this.yvel = newyv[short]
      if(newj[short]){
        this.jumps = this.maxJumps
      }
    }
    }
    } 
    }
    //Set to shortest distance
  }  
  death_collide(){
    if(this.py-this.psy/2>height+5000){
     // this.respawn();
    }
    for(var i=0; i<blocks.length; i++){
      if(this.collide){
        if(blocks[i].type == 3 || blocks[i].type==10 || (blocks[i].type==19&&blocks[i].range==1)){
          for(let c = 0; c<blocks[i].bsx/30; c++){
            for(let u = 0; u<blocks[i].bsy/30; u++){
              //collision display
              /*
              push();
                rect(blocks[i].bx-blocks[i].bsx/2+15+c*30-7.5,blocks[i].by-blocks[i].bsy/2+15+u*30,15,20);
              pop();
              */
              if(blocks[i].type==10||(blocks[i].type==19&&blocks[i].range==1)){
      if(rectHit(this.px,this.py,blocks[i].bx,blocks[i].by,this.psx,this.psy,blocks[i].bsx+1,blocks[i].bsy+1)) {
                this.respawn();
        print(2)
              }
                 }
            //0 deg
            if(blocks[i].rotation%360==0){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30,blocks[i].by-blocks[i].bsy/2+15+u*30+7.5,30,30,24,13)){
                this.respawn();
              }
            }
            //90 deg
              if(blocks[i].rotation%360==90){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30-7.5,blocks[i].by-blocks[i].bsy/2+15+u*30,30,30,13,24)){
                this.respawn();
              }
            }
              //180 deg
              if(blocks[i].rotation%360==180){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30,blocks[i].by-blocks[i].bsy/2+15+u*30-7.5,30,30,24,13)){
                this.respawn();
              }
            }
              //270 deg
              if(blocks[i].rotation%360==270){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30+7.5,blocks[i].by-blocks[i].bsy/2+15+u*30,30,30,13,24)){
                this.respawn();
                }
              }
            }
          }
        }
      }
    }
    for(var i = 0; i<bullets.length; i++){
      if(dis(bullets[i].prox,bullets[i].proy,player1.px,player1.py)<=20){
        this.respawn();
      }
    }
  }
  respawn(){
    frameRate(60)
   shake=100;
    playersP[playersP.length] = new playerP(this.px,this.py,this.direction*random(3,7),-random(4,6),this.skinx,this.skiny);
    for(let i=0; i<40; i++){
    let angle = random(0,2*PI);
    let fast = random(5,10);
    bulletsP[bulletsP.length] = new bulletP(this.px,this.py,this.px+cos(angle)*50,this.py+sin(angle)*50,fast,floor(random(2,4)));
    }
     for(let i=0; i<10; i++){
    let angle = random(0,2*PI);
    let fast = random(0,5);
    bulletsP[bulletsP.length] = new bulletP(this.px,this.py,this.px+cos(angle)*50,this.py+sin(angle)*50,fast,floor(random(2,4)));
    }
    /*
    this.skinx = floor(random(0,15))
  this.skiny = floor(player1.skinx/5);
   this.skinx = floor(random(0,15))
   */
    // if(this.skinx==3){
    //    this.skinx = 8
    //   this.skiny = floor(player1.skinx/5);
    // }else{
    //   this.skinx = 3;
    //   this.skiny = floor(player1.skinx/5);
    // }
    if(playerEdit){
      this.collide = false
      
    }
    if(this.collide==true&&!playerEdit){
    this.xvel = 0
      this.yvel = 0
      this.px = this.checkx
      this.py = this.checky
      this.collide = false
    for(var c=0; c<20; c++){
          let angle = random(0,2*PI);
          let fast = random(3,6);
          
          bulletsP[bulletsP.length] = new bulletP(this.checkx,this.checky,this.checkx+cos(angle)*50,this.checky+sin(angle)*50,fast,floor(random(0,1)));
      
        }
      fps=2;
      this.corex = this.px;
      this.corey = this.py;
      this.corexv += (this.corext-this.corex)/1;
      this.coreyv += (this.coreyt-this.corey)/1;
      this.coreLock=true;
  }
    for(let i=0; i<blocks.length; i++){
      if(blocks[i].type==8||blocks[i].type>=12){
        //blocks[i].life=-2000;
    }
    }
  }
  useChecks(){
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].type==4){
      if(rectHit(this.px,this.py,blocks[i].bx,blocks[i].by,this.psx,this.psy,blocks[i].bsx,blocks[i].bsy)){
        if(this.checkx != blocks[i].bx||this.checky != blocks[i].by){
        for(var w=0; w<20; w++){
          let angle = random(0,2*PI);
          let fast = random(5,20);
          
        //  bulletsP[bulletsP.length] = new bulletP(blocks[i].bx,blocks[i].by,blocks[i].bx+cos(angle)*50,blocks[i].by+sin(angle)*50,fast);
        }
          
        }
        this.checkx = blocks[i].bx;
        this.checky = blocks[i].by;
      }
    }
      if(blocks[i].type==9){
        if(rectHit(this.px,this.py,blocks[i].bx,blocks[i].by,this.psx,this.psy,blocks[i].bsx,blocks[i].bsy)&&!blocks[i].dia){
          blocks[i].dia = true;
          dials[dials.length] = blocks[i].delay;
        }
      }
      if(blocks[i].type==7){
        if(dis(blocks[i].bx,blocks[i].by,this.px,this.py)<=40){
          this.changeLevel(blocks[i].delay);
        }
      }
      
    }
  }
  changeLevel(x){
    levelCode = levels[x];
    this.checkx = this.startx;
    this.checky = this.starty;
   // print(allSprites.length)
    this.respawn();
    selEdit = -1;
    blocks = [];
    currentLevel = x;
   // console.log(levelCode,blocks[i].range);
    buildLevel();
  }
}