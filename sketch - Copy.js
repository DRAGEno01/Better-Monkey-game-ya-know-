
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var backGround,invisibleGround, backGroundImage;
var score = 0;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  backGroundImage = loadImage("jungle.jpg");
}



function setup() {
  createCanvas(400,400);
    
  backGround = createSprite(400,100,900,10);
  backGround.addImage(backGroundImage);
  
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  invisibleGround = createSprite(400,350,900,10);
  invisibleGround.visible = false;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  
}


function draw() {
  background("white");
  
  backGround.velocityX=-4;
  
  if(backGround.x<0){
    backGround.x = backGround.width/2;
  }
  
  if(keyDown("space")&& monkey.y>=100){
    monkey.velocityY=-12;
  }
  monkey.velocityY=monkey.velocityY+0.8;
  monkey.collide(invisibleGround);
  
 if(foodGroup.isTouching(monkey)){
   foodGroup.destroyEach();
   score = score+2;
 }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale = 0.1
  }
  
  switch(score){
    case 10: monkey.scale = 0.12;
      break;
    case 20: monkey.scale = 0.14;
      break;
    case 30: monkey.scale = 0.16;
      break;
    case 40: monkey.scale = 0.18;
      break;
    default: break;     
  }
  
  

  
  
  drawSprites();
  food();
  obstacles();
  
    stroke("black");
  textSize(20);
  fill("black");
  text("score: "+score,100,70)  
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival time: "+ survivalTime, 100,50)
}

function food(){
  if(frameCount%80===0){
    var banana = createSprite(250,150,20,20);
    banana.velocityX=-6;
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.lifetime = 200;
    banana.y= Math.round(random(120,200));
    foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount%300===0){
    var obstacle = createSprite(600,340,10,40);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.09;
    obstacle.lifetime = 200;
    obstacle.velocityX=-7;
    obstacleGroup.add(obstacle);
  }
}



