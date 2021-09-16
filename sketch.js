var score =0;
var gun,blueBubble,redBubble, bullet, backBoard;
var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var redBubbleGroup, redBubbleGroup, bulletGroup;

var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("gun1.png")
  blastImg = loadImage("blast.png")
  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("waterBubble.png")
  redBubbleImg = loadImage("redbubble.png")
  backBoardImg= loadImage("back.jpg")
}

function setup() {
  createCanvas(800, 800);

  backBoard= createSprite(50, width/2, 100,height);
  backBoard.addImage(backBoardImg)
  
  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.2
  
  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading = createElement("h1");
  scoreboard = createElement("h1");
}

function draw() {
  background("#BDA297");

  //display Score and number of lifes
  heading.html("Life:"+ life);
  heading.style('color:red');
  heading.position(200,100);

  scoreboard.html("Score:"+ score);
  scoreboard.style('color:red');
  scoreboard.position(width-200,20);

  if(gameState===1){
    gun.y=mouseY  
  
  if(frameCount % 80 === 0){
    drawblueBubble();
  }  
  
  if(frameCount % 100 === 0){
    drawredBubble();
  }

  if(keyDown('space')){
    shootBullet();
  }  

  if(blueBubbleGroup.collide(bulletGroup)){
    handleBubbleCollision(blueBubbleGroup);
  }
  
  if(redBubbleGroup.collide(bulletGroup)){
    handleBubbleCollision(redBubbleGroup);
  }
  
  if(blueBubbleGroup.collide(backBoard)){
    handleGameover(blueBubbleGroup);
  }

  if(redBubbleGroup.collide(backBoard)){
    handleGameover(redBubbleGroup);
  }

    drawSprites();
  }
     
}

function drawblueBubble(){
  blueBubble = createSprite(400,random(20,700),50,50);
  blueBubble.velocityX = -8;
  blueBubble.addImage('bubble',blueBubbleImg);
  blueBubble.scale = 0.2;
  blueBubble.lifetime = 400;
  blueBubbleGroup.add(blueBubble);
}

function drawredBubble(){
  redBubble = createSprite(400,random(20,700),50,50);
  redBubble.velocityX = -5;
  redBubble.addImage('bubble',redBubbleImg);
  redBubble.scale = 0.2;
  redBubble.lifetime = 400;
  redBubbleGroup.add(redBubble);
}

function shootBullet(){
  var bullet = createSprite(300,width/2,200,100);
  bullet.y = gun.y - 30;
  bullet.velocityX = 2;
  bullet.addImage('bullet',bulletImg);
  bullet.scale = 0.3;
  bulletGroup.add(bullet);
}

function handleBubbleCollision(bubbleGroup){
  if(life > 0){
    score = score + 1;
  }

  blast = createSprite(bullet.x + 60,bullet.y,50,50);
  blast.addImage('blast',blastImg);
  blast.scale = 0.3;
  blast.life = 20;

  bulletGroup.destroyEach();
  bubbleGroup.destroyEach();
}

function handleGameover(bubbleGroup){
  life = life - 1;
  bubbleGroup.destroyEach();

  if(life === 0){
    gameState = 2;
  

  swal({
    title: 'Game Over',
    text: 'Oops you lost the game....!!!',
    text: 'Your Score is'+ score,
    imageURL:
    "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: '100x100',
    confirmButtonText: 'Thanks For Playing',
  });
 }
}