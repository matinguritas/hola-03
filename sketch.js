
var trex ,trex_running;
var suelo ,sueloImagen , invisbleSuelo;
var nube ,nubeimag; 
var obstaculo ,obstaculo1 ,obstaculo2 ,obstaculo3;
var obstaculo4 ,obstaculo5 ,obstaculo6;
var rand;
var score;
var play = 1;
var end = 0;
var gamestate = play;
var gruponubes, grupocactus;
var gameover, gameoverimag;
var restar, restarimg;
var trex_colicion
var jumpsound, diedsound, checpointsound; 

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
//nube
nubeimag = loadImage("cloud.png");
//imagen
  sueloImagen = loadImage("ground2.png");

  //obstaculos
obstaculo1 =loadImage("obstacle1.png");
obstaculo2 =loadImage("obstacle2.png");
obstaculo3 =loadImage("obstacle3.png");
obstaculo4 =loadImage("obstacle4.png");
obstaculo5 =loadImage("obstacle5.png");
obstaculo6 =loadImage("obstacle6.png");
//gameover and restar
gameoverimag =loadImage("gameOver.png");
restarimg =loadImage("restart.png");
trex_colicion =loadImage("trex_collided.png")
//sonido
jumpsound = loadSound("jump.mp3");
diedsound = loadSound("die.mp3");
checpointsound = loadSound("checkPoint.mp3")

}

function setup(){
createCanvas(windowWidth, windowHeight);

  
//grupos
  grupocactus = new Group();
  gruponubes = new Group();
//gameover
  gameover = createSprite(300, 100);
 gameover.addImage(gameoverimag)
 gameover.scale = 0.5;
 gameover.visible = false
//restar
 restar = createSprite(300, 150)
 restar.addImage(restarimg)
 restar.scale = 0.5;
restar.visible = false

nube = Math.round(Math.random(1, 100))

console.log(nube);
  
  //crear sprite de Trex
 trex = createSprite(50, height-70, 20, 50);
 trex.scale = 0.7;
//debug
 trex.debug = true
 trex.setCollider("circle", 0, 0, 30)
//suelo
 suelo = createSprite(width/2, height-10, width, 125);
 suelo.addImage("ground", sueloImagen);
 console.log("velocidad del suelo" + suelo.x)
 invisbleSuelo = createSprite(width/2, height+50, width, 125);
 invisbleSuelo.visible = false;

//animacion

 trex.addAnimation("running", trex_running);
 trex.addAnimation("collided", trex_colicion);
 score = 0;
}

function draw(){
  background("white")
//gamestate
if(gamestate == play){
  score = score + Math.round(getFrameRate()/60);
 
  //extreas
 spawnnube();
 spawnobstaculos();
//velocidad suelo
suelo.velocityX = -3;

if(suelo.x < 0){
  suelo.x = suelo.width/2;
  }
//salto rex
if(keyDown("space")&& trex.y >= 112){
  trex.velocityY = -8;
  jumpsound.play()
  //sonido chekpoint
  if(score > 0 && score % 1000 == 0){
checpointsound.play()
//velocidad suelo
suelo.velocityX = -(4 + 3 * score/100);

  }
 }
 //grupo muerte
 if(grupocactus.isTouching(trex)){
  gamestate = end;
diedsound.play();
}
if (score > 0 && score % 3000 == 0){
  background("blue");
}

}else if(gamestate == end){
  //restar
restar.visible = true;
//gameover
  gameover.visible = true;
  //suelo
suelo.velocityX = 0
grupocactus.setVelocityXEach(0);
gruponubes.setVelocityXEach(0);
//muerte
trex.changeAnimation("collided", trex_colicion);
//vida
grupocactus.setLifetimeEach(-9);
gruponubes.setLifetimeEach(-9);

if(mousePressedOver(restar)){
console.log("reiniciar el juego");
reset()
}
}

//puntuacion
  text("puntuacion" + score, 500, 50);
  

 

trex.velocityY = trex.velocityY + 0.6;
trex.collide(invisbleSuelo);


drawSprites();
}
function spawnnube(){

  //nubes spawn
  if(frameCount % 60 == 0){
    nube = createSprite(600, 100, 10, 40);
    nube.velocityX = -3;
    nube.addImage(nubeimag);
    drawSprites;
    nube.y = Math.round(random(10, 100));
    console.log("profundidad del trex" + trex.depth);
    console.log("profundidad de las nubes" + nube.depth);
    nube.depth = trex.depth;
    trex.depth = trex.depth +1;

    nube.lifeTime = 300;
    //grupo
    gruponubes.add(nube);
  }

}
function spawnobstaculos(){
  if(frameCount % 88 == 0){

    //spawn obstaculos
 obstaculo = createSprite(600, height-25, 10, 30);
 obstaculo.velocityX = -3;
 rand = Math.round(random(1, 6));
 obstaculo.scale = 0.5;
 obstaculo.lifeTime = 300;
 //grupo cactus
 grupocactus.add(obstaculo);
 //velocidad extra
obstaculo.velocityX = -(3 + score/100);


 switch(rand){

  //imagenes obstaculos
  case 1:
obstaculo.addImage(obstaculo1);
break;

case 2:
obstaculo.addImage(obstaculo2);
break;

case 3:
obstaculo.addImage(obstaculo3);
break;

case 4:
obstaculo.addImage(obstaculo4);
break;

case 5:
obstaculo.addImage(obstaculo5);
break;

case 6:
obstaculo.addImage(obstaculo6);
break;
default: break;
}
  }
}
function reset(){
gamestate = play;
gameover.visible = false;
restar.visible = false;
grupocactus.destroyEach()
gruponubes.destroyEach()
trex.changeAnimation("running", trex_running);
score = 0;
}