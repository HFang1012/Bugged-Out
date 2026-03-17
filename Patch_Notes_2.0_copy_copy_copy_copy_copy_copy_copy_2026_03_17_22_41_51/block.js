//Block Class
class block{
  constructor(a,b,c,d,e,f,g,h){
    //position
    this.bx = a;
    this.by = b;
    this.prebx = a;
    this.preby = b;
    //size, width, heights7
    //generally in this project's scale, use 30x30 to corollate with player, but also an integer scale of 30x30, just keep the grid consistant
    this.bsx = c;
    this.bsy = d;
    //for jiggle and shake;
    this.showc = 1;
    this.showcv = 0;
    //new 
    this.nx = 1;
    this.ny = 1;
    this.sides = [0,0,0,0];
    //Pass through types
    this.type = e
    //
    this.collideWith = false;
    if(this.type == 1||this.type == 2||this.type == 6||this.type == 10 || this.type==14 || this.type==15 || this.type==16 || this.type==17 || this.type==18 || (this.type==19 && h!=2)){
      this.collideWith = true;
    }
    this.fullCollide = false;
    //to prevent 2 but to keep 6, "phaseable", "turret"
    //It also keeps more avalibility in block class not player class
    if(this.type == 1||this.type == 6||this.type == 10 || this.type==14 || this.type==15 || this.type==16 || this.type==17 || this.type==18||(this.type==19 && h!=2)){
      this.fullCollide = true;
    }
    //If there is a check, "type 4"
    //for an animation
    this.checkSize = 25;
    this.checkVel = 0;
    this.rotation = int(f);
    if(this.rotation>=360){
      this.rotation = this.rotation%90;
    }
    //for the turret
    this.reload = g;
    this.delay = g;
    this.range = h;
    if(this.range == 0&&this.type == 6){
      this.range = 1;
    }
    //for the moving platforms
    this.order=g
    this.speed=g
    this.code=h
    
    this.life = 60;
    if(this.type ==12){
      this.life = 0;
    }
    this.broken = false;
    this.tx = this.bx;
    this.ty = this.by;
    this.moveBlocks = false;
    this.moveLock = 0;
    this.dia = false;
    this.hopy = 0;
    this.hopv = 0;
    this.hopr = 0;
    this.hopo = false;
    this.porx = [];
    this.pory = [];
    this.por = [];
  }
  actions(){
    this.prebx = this.bx;
    this.preby = this.by;
    angleMode(RADIANS);
    //Main display
    strokeWeight(5);
    stroke("#66796B");
    noFill()
    //All instances of "can be on a grid" will be as a block class type, we are at, "4"
    //TYPE ONE BLOCK, NORMALLLL
    this.showc+=this.showcv;
    this.showcv+=(1-this.showc)/5;
    this.showcv/=1.4;
    push();
      translate(this.bx,this.by);
      scale(this.showc,this.showc);
      translate(-this.bx,-this.by);
    if(this.type == 1&&this.moveBlocks==false){
       if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3]);
       }
    }
    //type 2 block PASSAGE, PHASEABLE
    if(this.type == 2){
      this.form2(this.bx,this.by-this.bsy/2+15,this.bsx,30,this.sides[0],this.sides[1],this.sides[2],this.sides[3]);
      if(this.bsy>30){
        this.by = this.by-this.bsy/2+15;
        this.bsy = 30;
      }
    }
    //Type 3 block, SPIKE
    if(this.type == 3){
      for(let i=0; i<this.bsx/30; i++){
        for(let c=0; c<this.bsy/30; c++){
          
          this.spike(this.bx-this.bsx/2+15+i*30,this.by-this.bsy/2+15+c*30,this.rotation);
        }
      }
    }
    //Type 4 block, Checkpoint
    if(this.type == 4){
      //this.check(this.bx,this.by,this.checkSize);
      if(levelEdit){
      push();
      stroke(0,255,0,100)
      fill(0,255,0,50);
      rect(this.bx,this.by,this.bsx,this.bsy,5);
      noStroke();
      textSize(30);
      fill(0,255,0,150)
      text("C",this.bx,this.by+15/2)
      pop();
      }
      this.checkSize-=this.checkVel;
      if(this.bx==player1.checkx&&this.by==player1.checky){
        this.checkVel = (this.checkSize-50)/4;
      }else{
        this.checkVel = (this.checkSize-25)/4;
      }
    }
    
    
    //RED - Display has an extra double width on left side
    if(this.type == 6){
    //   if(this.range == 0){
    //   this.range = 1;
    // }
    //   this.reload+=0.1;
    //   if(this.reload>=this.range){
    //     this.reload=0;
    //     this.showcv+=0.05;
    //   }
    //   for(let i=0; i<this.bsx/30; i++){
    //     for(let c=0; c<this.bsy/30; c++){
    //       this.turret(this.bx-this.bsx/2+15+i*30,this.by-this.bsy/2+15+c*30,this.reload/this.range*3);
    //     }
    //   }
      push()
      rectMode(CENTER)
      fill("red")
      noStroke()
      translate(-this.bsx/2,0);
      this.bsx*=2;
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],2);
      this.bsx/=2;
      pop()
    }
    if(this.type == 7){
      this.portal(this.bx,this.by);
      this.bsx = 30;
      this.bsy = 30;
    }
    if(this.type == 8){
      this.sign(this.bx,this.by);
      this.bsx = 30;
      this.bsy = 30;
    }
    if(this.type == 9){
      if(levelEdit){
      push();
      stroke(0,255,255,100)
      fill(0,255,255,50);
      rect(this.bx,this.by,this.bsx,this.bsy,5);
      noStroke();
      textSize(30);
      fill(0,255,255,150)
      text("D",this.bx,this.by+15/2)
      pop();
      }
    }
    //PINK - KILLS YOU 10
    if(this.type == 10){
//       this.reload+=0.1;
//       if(this.reload>=this.range+10){
//         this.reload=0;
//         this.showcv+=0.035;
//       }
//       for(let i=0; i<this.bsx/30; i++){
//         for(let c=0; c<this.bsy/30; c++){
          
//           this.laser(this.bx-this.bsx/2+15+i*30,this.by-this.bsy/2+15+c*30,this.reload/this.range*3);
        
//         }
//       }
      push()
      rectMode(CENTER)
      fill("pink")
      noStroke()
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],8);
      pop()
    }
   // print(this.bx,this.by,player1.py,player1.px,this.bsx,this.bsy,player1.psx,player1.psy)
     if(levelEdit&&this.type == 11){
      noStroke();
      fill(255,50);
      rect(this.bx,this.by,this.bsx,this.bsy);
      }
    if((this.type == 11)&&(!keyIsDown(66)||!levelEdit)&&!camP){
    //  print(this.bx,this.by,player1.py,player1.px,this.bsx,this.bsy,player1.psx,player1.psy)
      if(rectHit(this.bx,this.by,player1.px,player1.py,this.bsx,this.bsy,player1.psx,player1.psy)){
      //cam = createVector(this.bx,this.by);
        let speeder = 7.5;
         cam.add(-(cam.x-(this.bx))/speeder,-(cam.y-(this.by))/speeder);
        zoom -=(zoom-(min(100*1000/(this.bsx+70),100*600/(this.bsy+70))))/5;
      }
      
    }
    if(this.type==12){
      this.bsx = 30;
      this.bsy = 30;
      this.life--;
      if(!this.broken){
        this.life = max(0,this.life);
      }
      if(this.life<=-200){
        this.broken = false;
        this.life = sqrt(30);
        this.showcv+=0.5;
      }
      this.plot1(this.bx,this.by);
    }
    
    //WHITE - Fully Clip THROUGH
    if(this.type==13){
      push()
      rectMode(CENTER)
      fill("white")
      noStroke()
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],9);
      pop()
    }
    
    //BLUE - Display above hitbox
    if(this.type==14){
      push()
      rectMode(CENTER)
      fill("blue")
      noStroke()
      translate(0,-this.bsy)
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],3);
      pop()
    }
    
    //YELLOW - DOUBLE DISPLAY SIZE
    if(this.type==15){
      push()
      rectMode(CENTER)
      fill("yellow")
      noStroke()
      this.bsx = this.bsx*2;
      this.bsy = this.bsy*2;
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],4);
      this.bsx = this.bsx/2;
      this.bsy = this.bsy/2;
      pop()
    }
    
    //GREEN - RANDOM FRAMERATE
    if(this.type==16){
      push()
      rectMode(CENTER)
      fill("lightgreen")
      noStroke()
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],5);
      pop()
    }
    
    //ORANGE - BOUNCE BACK
    if(this.type==17){
      push()
      rectMode(CENTER)
      fill("orange")
      noStroke()
     this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],1);
      pop()
    }
    
    //PURPLE - STRAIGHT UP
    if(this.type==18){
      push()
      rectMode(CENTER)
      fill("purple")
      noStroke()
        this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],6);
      pop()
    }
    
    //CYAN - ANYTHING
    if(this.type==19){
      //Range==1: nothing happens
      push()
      rectMode(CENTER)
      fill("cyan")
      noStroke()
      
      if(this.range==3){
        push()
        translate(0,-this.bsy)
     this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],this.type-12);
        pop()
      }else if(this.range==4){
        this.bsx = this.bsx*2;  
        this.bsy = this.bsy*2;
        this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],this.type-12);
        this.bsx = this.bsx/2;       
        this.bsy = this.bsy/2;
      }else if(this.range==8){
               push()
            translate(-this.bsx/2,0);
      this.bsx*=2;
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],this.type-12);
      this.bsx/=2;
      pop()
       }else{
       // rect(this.bx,this.by,this.bsx,this.bsy,5)
        this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3],this.type-12);
      }
      pop()
    }
    
    
    pop();
    if(this.moveBlocks){
      this.bx = boxes[this.moveLock].x;
      this.by = boxes[this.moveLock].y;
      this.bsx = boxes[this.moveLock].width-1;
      this.bsy = boxes[this.moveLock].height-1;
      if(boxes[this.moveLock].rotation>=PI/4&&boxes[this.moveLock].rotation<=3*PI/4||boxes[this.moveLock].rotation<=-PI/4&&boxes[this.moveLock].rotation>=-3*PI/4){
      this.bsx = boxes[this.moveLock].height-1;
      this.bsy = boxes[this.moveLock].width-1;  
      }
    }
    this.rotation=this.rotation%360;
  }
  textDisplay(ind){
    noStroke();
    fill(0)
    textSize(20)
    text(ind,this.bx,this.by+7.5);
  }
  compareTo(other){
    if(this.type==7){
       return -1;
    }
     if(other.type==11){
       return 1;
    }
    return other.type-this.type-1;
  }
  form1(x,y,sx,sy,a,b,c,d,e){
    e = (e==null) ? 0 : e*6;
    imageMode(CORNER)
    for(let i=0; i<sx/30; i++){
      for(let c=0; c<sy/30; c++){
        let plot = createVector(x-sx/2+i*30,y-sy/2+c*30);
      if(i!=0&&i!=(sx/30-1)&&c!=0&&c!=(sy/30-1)){
        if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx*4,this.bsy*4)){
          image(tileFull[1][1],plot.x,plot.y,30-15+imageSize,30-15+imageSize)
        }
      }else{
        if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx*4,this.bsy*4)){
        let seter = [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ];
        let seter2 = [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ];
        let ava = [[0,0],
                   [0,0],]
        for(let i=0; i<3; i++){
          for(let c= 0; c<3; c++){
            seter[i][c]=(blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15+c*30,plot.y-15+i*30,hold.bsx,hold.bsy,20,20)&&(((hold.type==this.type&&(this.type!=19||hold.range==this.range))||hold.type==2||hold.type==3)&&hold.life>0))>=0)+0;
            seter2[i][c]=(blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15+c*30,plot.y-15+i*30,hold.bsx,hold.bsy,20,20)&&((hold.type==this.type&&(this.type!=19||hold.range==this.range))&&hold.life>0))>=0)+0;
            
          }
        }
        let finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+45,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==0);
        if(finder>=0){
            ava[1][1] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+45,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==90);
        if(finder>=0){
          ava[1][1] = 1;
          ava[0][1] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+45,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==180);
        if(finder>=0){
            ava[0][1] = 1;
        }
        //top zone
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+15,plot.y-15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==0);
        if(finder>=0){
            ava[0][0] = 1;
            ava[0][1] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+15,plot.y-15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==90);
        if(finder>=0){
          ava[0][0] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+15,plot.y-15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==270);
        if(finder>=0){
            ava[0][1] = 1;
        }
        //left zone
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==0);
        if(finder>=0){
            ava[1][0] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==270);
        if(finder>=0){
          ava[0][0] = 1;
          ava[1][0] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==180);
        if(finder>=0){
          ava[0][0] = 1;
        }
        //bottom zone
        /////////////////
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+15,plot.y+45,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==180);
        if(finder>=0){
            ava[1][0] = 1;
            ava[1][1] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+15,plot.y+45,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==90);
        if(finder>=0){
          ava[1][0] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+15,plot.y+45,hold.bsx,hold.bsy,20,20)&&hold.type==3&&hold.rotation==270);
        if(finder>=0){
            ava[1][1] = 1;
        }
        //Phasable sider types
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x+45,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==2);
        if(finder>=0){
            ava[0][1] = 1;
        }
        finder = blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15,plot.y+15,hold.bsx,hold.bsy,20,20)&&hold.type==2);
        if(finder>=0){
            ava[0][0] = 1;
        }
        this.form3(plot.x,plot.y,seter,seter2,ava,e);
      } 
      }
      }
  }
    imageMode(CENTER)
  }
  form3(x,y,seter,seter2,ava,e){
    e = (e==null) ? 0 : e;
    //map set
    //arrays2DEqual,arrays2DGet2
    let setes = [
      [createVector(0,0),createVector(0,0)],
      [createVector(0,0),createVector(0,0)]
    ];
    //Blanks
    if(0==0){
    //top_left
    if("top_left"=="top_left"){
      let plot2 = arrays2DGet2(seter,0,0);
      let plot3 = arrays2DGet2(seter2,0,0);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(3,3);

      plot1 = [
        [0,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(4,0);
      
      plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(0,0);

      plot1 = [
        [1,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(4,0);

      plot1 = [
        [0,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(2,0);

      plot1 = [
        [1,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(0,0);

      plot1 = [
        [1,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(2,0);

      plot1 = [
        [0,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][0]||arrays2DEqual(plot3,plot1)) setes[0][0] = createVector(1,3);
    }
    ///////////////////\/\/\//\/\/\/\/\/\/\/
    //top right
    if("top_right"=="top_right"){
      let plot2 = arrays2DGet2(seter,0,1);
      let plot3 = arrays2DGet2(seter2,0,1);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(3,2);
      
      plot1 = [
        [0,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(5,0);

      plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(1,0);

      plot1 = [
        [0,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(5,0);

      plot1 = [
        [1,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(3,0);

      plot1 = [
        [0,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(1,0);

      plot1 = [
        [1,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(3,0);

      plot1 = [
        [1,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[0][1]||arrays2DEqual(plot3,plot1)) setes[1][0] = createVector(0,3);
    }
    //bottom right
    if("bottom_right"=="bottom_right"){
      let plot2 = arrays2DGet2(seter,1,1);
      let plot3 = arrays2DGet2(seter2,1,1);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(3,3);

      plot1 = [
        [1,0],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(5,1);
      
      plot1 = [
        [1,1],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(1,1);

      plot1 = [
        [1,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(5,1);

      plot1 = [
        [1,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(3,1);

      plot1 = [
        [1,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(1,1);

      plot1 = [
        [1,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(3,1);

      plot1 = [
        [1,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][1]||arrays2DEqual(plot3,plot1)) setes[1][1] = createVector(0,2);
    }
    //bottom left
    if("bottom_left"=="bottom_left"){
      let plot2 = arrays2DGet2(seter,1,0);
      let plot3 = arrays2DGet2(seter2,1,0);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(2,3);

      plot1 = [
        [0,1],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(4,1);
      
      plot1 = [
        [1,1],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(0,1);

      plot1 = [
        [0,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(4,1);

      plot1 = [
        [0,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(2,1);

      plot1 = [
        [1,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(0,1);

      plot1 = [
        [0,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(2,1);

      plot1 = [
        [1,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)&&ava[1][0]||arrays2DEqual(plot3,plot1)) setes[0][1] = createVector(1,2);
    }
    }
    
    let sizer = imageSize;
    image(tileSprite[setes[0][0].x+e][setes[0][0].y],x,y,sizer,sizer);
    image(tileSprite[setes[0][1].x+e][setes[0][1].y],x,y+15,sizer,sizer);
    image(tileSprite[setes[1][0].x+e][setes[1][0].y],x+15,y,sizer,sizer);
    image(tileSprite[setes[1][1].x+e][setes[1][1].y],x+15,y+15,sizer,sizer);
    /*
     let plot2 = arrays2DGet2(seter2,0,1);
      let plot1 = [
        [1,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)){
        image(tileSprite[7+e][0],x+30,y-15,15.1,15.1);
      }
      plot2 = arrays2DGet2(seter2,0,0);
      plot1 = [
        [0,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)){
        image(tileSprite[6+e][0],x-15,y-15,15.1,15.1);
      }
      plot2 = arrays2DGet2(seter2,1,0);
      plot1 = [
        [1,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)){
        image(tileSprite[6+e][1],x-15,y+30,15.1,15.1);
      }
    plot2 = arrays2DGet2(seter2,1,0);
      plot1 = [
        [1,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)){
        image(tileSprite[7+e][1],x,y+30,15.1,15.1);
      }
    */
  }
  form2(x,y,sx,sy,a,b,c,d){
    imageMode(CORNER)
     for(let i=0; i<sx/30; i++){
      for(let c=0; c<sy/30; c++){
        let plot = createVector(x-sx/2+i*30,y-sy/2+c*30);
    let seter = [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ];
        for(let i=1; i<2; i++){ 
          for(let c= 0; c<3; c++){
            seter[i][c]=(blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15+c*30,plot.y-15+i*30,hold.bsx,hold.bsy,20,20)&&(hold.type==1||hold.type==2))>=0)+0;
          }
        }
        
        this.form4(plot.x,plot.y,seter);
      }
    imageMode(CENTER)
  }
  }
  form4(x,y,seter){
      imageMode(CORNER)
    //map set
    //arrays2DEqual,arrays2DGet2
    let setes = [
      [createVector(6,4),createVector(6,4)],
      [createVector(6,4),createVector(6,4)]
    ];
    //Blanks
    if(0==0){
    //left
    if("top_left"=="top_left"){
      let plot2 = arrays2DGet2(seter,0,0);
      let plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(5,2);
      
      plot1 = [
        [0,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(4,2);
    }
      
    if("top_right"=="top_right"){
      let plot2 = arrays2DGet2(seter,0,1);
      let plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(5,2);
      
      plot1 = [
        [0,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(4,3);
    }
    }
    /*
    if(seter[0].reduce(getSum)+seter[1].reduce(getSum)+seter[2].reduce(getSum)==9){
       setes = [
      [createVector(2,2),createVector(2,2)],
      [createVector(2,2),createVector(2,2)]
    ];
    }
    */
    image(tileSprite[setes[0][0].x][setes[0][0].y],x,y,imageSize,imageSize);
    image(tileSprite[setes[0][1].x][setes[0][1].y],x,y+15,imageSize,imageSize);
    image(tileSprite[setes[1][0].x][setes[1][0].y],x+15,y,imageSize,imageSize);
    image(tileSprite[setes[1][1].x][setes[1][1].y],x+15,y+15,imageSize,imageSize);
  }
spike(x,y,r){
   if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
  push();
  translate(x,y);
  rotate(r*PI/180);
  imageMode(CORNER);
     let sizer = imageSize;
  image(tileSprite[0][4],-15,-15,sizer,sizer);
  image(tileSprite[0][5],-15,0,sizer,sizer);
  image(tileSprite[1][4],0,-15,sizer,sizer);
  image(tileSprite[1][5],0,0,sizer,sizer);
  pop();
   }
}
  check(x,y,z){
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
  push();
      stroke("#B8DED0")
  translate(x,y);
    rotate(this.rotation*PI/180);
  strokeWeight(5);
  rect(0,-5,10,40,5,5,1,1);
  ellipse(0,-20,z,z);
  line(5,-5,15,15);
  line(-5,-5,-15,15);
  translate(0,-20);
  if(this.bx==player1.checkx&&this.by==player1.checky){
    rotate(frameCount*PI/180*5);
    rect(0,0,z-20,z-20,5);
  }
  pop();
    }
  }
  turret(x,y,z){
    if(this.reload==0){
      bullets[bullets.length] = new bullet(x+cos(this.rotation*PI/180+PI/2)*15,y+sin(this.rotation*PI/180+PI/2)*15,x+cos(this.rotation*PI/180+PI/2)*50,y+sin(this.rotation*PI/180+PI/2)*50,10);
    }
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
    push();
    translate(x,y);
      rotate(this.rotation*PI/180)
    let framer = 3-(floor(frameCount/10)%4);
    image(tileFull[1][4],0,22-z/2,30-15+imageSize+z*2,30-15+imageSize-z*3);
    image(tileFull[framer][3],0,0,30-15+imageSize,30-15+imageSize);
    pop();
    }
  }
  portal(x,y){
    /*
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
      this.hopy += this.hopv;
      this.hopv+=1;
    if(dist(player1.px,player1.py,this.bx,this.by)<=160){
      if(!this.hopo&&this.hopv>=0){
         this.hopv = -5;
          this.hopo = true;
        for(let i=0; i<30; i++){
        bulletsP[bulletsP.length] = new bulletP(this.bx,this.by,this.bx+sin(random(0,360))*30,this.by+cos(random(0,360))*30,random(0,5),5);
        }
        }
      }
    }else{
      this.hopo = false;
    }
      if(this.hopy<0){
        this.hopr+=abs(this.hopv/40);
      }else{
        this.hopr = 0;
      }
      this.hopy=min(0,this.hopy);
      */
    for(let i=0; i<11; i++){
      push();
      translate(x,y);
      rotate(frameCount/20+i*5);
      translate(cos(frameCount/10+i*3)*(20-i),sin(frameCount/10+i*3)*(10-i));
      rotate(frameCount/20);
      image(tileSprite[2+i][4],random(-2,2),random(-2,2),15,15);
      pop();
    }
    }
  
  sign(x,y){
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
    push();
    translate(x,y);
    stroke(0,-100+80/dis(player1.px,player1.py,this.bx,this.by)*355);
    fill(255,-100+80/dis(player1.px,player1.py,this.bx,this.by)*355);
    textSize(20)
    let holder = str(this.delay);
    holder = holder.replace(/\\n/g, '\n');
      noStroke()
    text(holder,0,60-this.range*20);
    rotate(this.rotation*PI/180)
    noFill();
    stroke("#B8DED0");
    strokeWeight(5)
    imageMode(CORNER)
    image(tileSprite[2][4],-15,-15,imageSize,imageSize)
    image(tileSprite[3][4],0,-15,imageSize,imageSize)
    image(tileSprite[2][5],-15,0,imageSize,imageSize)
    image(tileSprite[3][5],0,0,imageSize,imageSize)
    pop();
    }
}
  laser(x,y,z){
      if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
    push();
    translate(x,y);
    rotate(this.rotation*PI/180)
    let framer = floor(frameCount/10)%4;
    image(tileFull[framer][3],0,0,30-15+imageSize,30-15+imageSize);
    image(tileFull[0][4],0,30,30-15+imageSize,30-15+imageSize);
    pop();
      }
    let sight = [];
    for(var i=0; i<blocks.length; i++){
        if(rectHit(blocks[i].bx,blocks[i].by,x+cos(-this.rotation*PI/180)*300,y+sin(-this.rotation*PI/180))*300,blocks[i].bsx,blocks[i].bsy,30+cos(-this.rotation*PI/180)*600,30+sin(-this.rotation*PI/180)*600){
           sight[sight.length] = blocks[i];
        }
    }
    let lax = x;
    let lay = y;
      for(var c =0; c<50; c++){
        lax+=sin(this.rotation*PI/180)*30;
        lay+=cos(this.rotation*PI/180)*30;
    for(var i=0; i<sight.length; i++){
      if(sight[i].fullCollide){
        if(rectHit(sight[i].bx,sight[i].by,lax,lay,sight[i].bsx,sight[i].bsy,20,20)){
          i=sight.length;
          c=50;
          lax-=sin(this.rotation*PI/180)*15;
          lay-=cos(this.rotation*PI/180)*15;
        }
      }
    }
      }
      this.tx+=(lax-this.tx)/1;
      this.ty+=(lay-this.ty)/1;
      if(this.reload>=0&&this.reload<=10){
      push();    
      x+=sin(this.rotation*PI/180)*30;
      y+=cos(this.rotation*PI/180)*30;
      strokeWeight(5)
      stroke("#DEC6B8");
      line(x,y,this.tx,this.ty);
      stroke("#DEC6B86D");
      strokeWeight(10)
      line(x,y,this.tx,this.ty);
      strokeWeight(15)
      line(x,y,this.tx,this.ty);
      pop();
      push();
      noStroke();
      fill(255,50);
      ellipse(x,y,10,10)
      ellipse(x,y,20,20)
      ellipse(x,y,25,25)
      ellipse(this.tx,this.ty,15,15)
      ellipse(this.tx,this.ty,25,25)

      pop();
        
      if(frameCount%10==0){
      bulletsP[bulletsP.length] = new bulletP(x,y,x+sin(this.rotation*PI/180+random(-0.2,0.2))*30,y+cos(this.rotation*PI/180+random(-0.2,0.2))*30,random(5,10));
        bulletsP[bulletsP.length] = new bulletP(lax,lay,lax-sin(this.rotation*PI/180+random(-0.2,0.2))*30,lay-cos(this.rotation*PI/180+random(-0.2,0.2))*30,random(5,10));
      }
      if(frameCount%4==0){
      bulletsP[bulletsP.length] = new bulletP(lax,lay,lax-sin(this.rotation*PI/180+random(-1.5,1.5))*30,lay-cos(this.rotation*PI/180+random(-1.5,1.5))*30,random(2,5));
      }
      if(this.rotation%180==90){
      if(rectHit((x+lax)/2,(y+lay)/2,player1.px,player1.py,abs(x-lax),10,30,30)&&player1.collide == true){
        player1.respawn();
      }
        fill(255,0,0)
        //rect((x+lax)/2,(x+lay)/2);
      }else{
        if(rectHit((x+lax)/2,(y+lay)/2,player1.px,player1.py,10,abs(y-lay),30,30)&&player1.collide == true){
        player1.respawn();
      }
      }
      }
      if(this.reload==0){
        for(var i=0; i<20; i++){
        bulletsP[bulletsP.length] = new bulletP(x,y,x+sin(this.rotation*PI/180+random(-0.1,0.1))*30,y+cos(this.rotation*PI/180+random(-0.1,0.1))*30,random(5,15));
        }
        this.tx = x;
        this.ty = y;
      }
}
  plot1(x,y){
    push();
    translate(x,y);
    rotate(sin(frameCount/20)/6);
    image(tileFull[5][0],0,0,30-15+imageSize,30-15+imageSize);
    if(!this.broken){
      let scaler = 1;
      scale(scaler,scaler);
      image(tileFull[0][5],0,0,30-15+imageSize,30-15+imageSize);
    }
    pop();
  }
}
class bpart{
   constructor(a,b,c,d,e,f){
    this.sx = a;
    this.sy = b;
    this.sxv = c;
    this.syv = d;
    this.bsx = e;
     this.bsy = f;
    this.life = 60;
     this.ang = 0;
  }
  work(){
    push();
    noFill();
    this.life-=0.3;
    stroke("#66796B");
    translate(this.sx,this.sy);
    this.sx+=this.sxv;
    this.sy+=this.syv;
    this.syv+=1;
    this.sxv/=1.01
    this.ang+=this.sxv;
    rotate(this.ang*PI/180);
    rect(0,0,this.bsx,this.bsy,5);
    pop();
  }
}
