var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg , zombie1Img;

var heart1, heart2, heart3;
var heart1Img, heart2Img, heart3Img;

var zombieGroup;



function preload(){
  
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")

  shooterImg = loadAnimation("assets/stand1.png")
  shooter_shooting = loadAnimation("assets/swing.png","assets/swing1.png")

  zombieImg = loadImage("assets/zombie.png")
  zombie1Img = loadImage("assets/zombie1.png")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite( 400, displayHeight-300, 50, 50);
 player.addAnimation("shooting",shooterImg)
   player.scale = 3;
   player.debug = true
   player.setCollider("rectangle",0,0,50,50)


   //creating sprites to depict lives remaining
   heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
    heart2.visible = false
    heart2.addImage("heart2",heart2Img)
    heart2.scale = 0.4

    heart3 = createSprite(displayWidth-150,40,20,20)
    heart3.addImage("heart3",heart3Img)
    heart3.scale = 0.4
   

    //creating group for zombies    
    zombieGroup = new Group();
}

function draw() {
  background(0); 
text(mouseX + " , " + mouseY , 50 ,50)
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  console.log("changeAnimation");
  player.addAnimation("shooting",shooter_shooting);
  player.scale = 3;
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addAnimation("shooting",shooterImg);
  player.scale = 3; 
}


//destroy zombie when player touches it
if(zombieGroup.isTouching(player)){
 

 for(var i=0;i<zombieGroup.length;i++){     
      
  if(zombieGroup[i].isTouching(player)){
       zombieGroup[i].destroy()
       } 
 }
}

//calling the function to spawn zombies
enemy();

drawSprites();
}



//creating function to spawn zombies
function enemy(){
  if(frameCount%60===0){

    //giving random x and y positions for zombie to appear
    zombie = createSprite(random(1400,1500),random(150,800),40,40)
    var ran = Math.round(random(1,2));
    switch(ran) 
    {
      case 1: zombie.addImage(zombieImg);
              break;

      case 2:  zombie.addImage(zombie1Img);
      console.log(ran)
               break;
      default: break;
    }
    //zombie.addImage(zombieImg)
    zombie.scale = 0.15
    zombie.velocityX = -3
    zombie.debug= true
    zombie.setCollider("rectangle",0,0,400,400)
   
    zombie.lifetime = 400
   zombieGroup.add(zombie)
  }

}
