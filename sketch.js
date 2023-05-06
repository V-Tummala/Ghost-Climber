var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload()
  {
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png");
    spookySound = loadSound("spooky.wav");
  }

function setup() 
  {
    createCanvas(600, 600);

    spookySound.loop();

    tower = createSprite(300,300);
    tower.addImage("tower",towerImg);
    tower.velocityY = 1;

    doorsGroup = new Group();
    climbersGroup = new Group();
    invisibleBlockGroup = new Group();
    
    ghost = createSprite(300,200,50,50);
    ghost.addImage("ghost",ghostImg);
    ghost.scale = 0.3;
    
  }

function draw() {
  background(0);

  if(gameState === "play")
    {
      if(tower.y > 400)
    {
      tower.y = 300
    }

  if(keyDown("LEFT_ARROW"))
    {
      ghost.x -= 2;
    }

  if(keyDown("RIGHT_ARROW"))
    {
      ghost.x += 2;
    }
  
  if(keyDown("SPACE"))
    {
      ghost.velocityY = -6;
    }
  ghost.velocityY += 0.8;

  if(climbersGroup.isTouching(ghost))
    {
      ghost.velocityY = 0;
    }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600)
    {
      ghost.destroy();
      gameState = "end";
    }
   
      spawnDoors();
      
      drawSprites();  
    }

  if(gameState === "end")
  {
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("Game Over", 230,250)
  }
  
 
} 

function spawnDoors() {
  //code to spawn the doors in the tower
  if(frameCount % 240 === 0)
  {
    door = createSprite(300,-30);
    door.addImage("door",doorImg);

    climber = createSprite(300,30);
    climber.addImage("climber",climberImg);
    
    invisibleBlock = createSprite(300,35);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.visible = true;

    
    door.x = Math.round(random(120,240));
    door.velocityY = 1; 
    
    ghost.depth = door.depth;
    ghost.depth++;
    
    climber.x = door.x;
    climber.velocityY = 1;

    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1; 
    
    //assign lifetime to the variables
    door.lifetime = 600;
    climber.lifetime = 600;
    invisibleBlock.lifetime = 600;
    
    invisibleBlock.debug =  true;
  

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  }
}