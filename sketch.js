var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var ground,invisibleGround;
var survivalTime;

function preload(){
  
  monkey_Image = loadImage("sprite_0.png");
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  monkey = createSprite(80,315,20,20);   
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  ground.x=-4;
  
  invisibleGround = createSprite(200,355,400,10);
  invisibleGround.visible = false;
  
  survivalTime=0;
  
  bananaGroup = createGroup();
  
  obstaclesGroup = createGroup();
  
}


function draw() {
  
  background("green");
  
  if (gameState===PLAY){
  
  if(keyDown("space")&& monkey.y >= 160){
    monkey.velocityY=-12;
     }
  
 
  
  monkey.velocityY = monkey.velocityY + 0.8
  
  monkey.collide(invisibleGround);
  
  spawnBanana();
  
    stroke("black");
  textSize(10);
  fill("black");
  survivalTime = survivalTime + Math.round(frameCount/60);
  text("Survival Time: "+ survivalTime, 200,50);
  
  spawnObstacles();
  
   
  
  if(obstaclesGroup.isTouching(monkey)){
    monkey.velocityX=0;
    monkey.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    ground.velocityX=0;
    text("GameOver",200,200);
  }
  
  
  
  
   if (ground.x < 0){
    ground.x = ground.width/2;
  }

  drawSprites();
   
  }
    
}

function spawnBanana(){
  
  if (frameCount % 80 === 0) {
    
  var banana = createSprite (600,20,20,20);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -3;
    banana.lifetime=300;
    
    bananaGroup.add(banana);
    
  }

}

function spawnObstacles(){
  
  if (frameCount % 60 === 0){
  var obstacle = createSprite(400,325,20,20);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.1;
  obstacle.velocityX = -(6 + survivalTime/100);  
  obstacle.lifetime = 300; 
    
  obstaclesGroup.add(obstacle);
    
  }
  
}






