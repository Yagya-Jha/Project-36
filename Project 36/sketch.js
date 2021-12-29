var dog, hdog, database, foodS, foodStock;
var dogS;
var button;
var Happy;
var milkimg;
var milkS;
var d,hours;
var seconds,s;
var h;
var m;
var secs_before_hungry;
function preload()
{
  hdog = loadImage("images/dogImg1.png");
  dog = loadImage("images/dogImg.png");
  milkimg = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500, 500);
  database=firebase.database();
  button = new Food();
  foodStock.on("value",readStock);
  dogS = createSprite(250,150);
  dogS.addImage("img",dog);
  dogS.scale = 0.15;
  Happy = database.ref('seconds');
  Happy.on("value", get_is_happy);
  milkS = createSprite(-10,180,20,10);
  milkS.addImage("image",milkimg);
  milkS.scale = 0.05;
  d= new Date();
  hours = database.ref('hours');
  hours.on("value", readHours);
  seconds = -1;
  s = database.ref('seconds');
  s.on("value", readSeconds);
  m = "am";
  h = hours;
  // 10800 seconds = 3 hours
  secs_before_hungry = 10800;
}

function set_time_to_get_hungry_in_secs(secs){
  secs_before_hungry = secs;
}

function draw() {  
  background(46, 139, 87);
  button.display();

  if(Happy===false){
    dogS.addImage("img",dog);
  }
  else{
    dogS.addImage("img",hdog);
    glide(milkS);
  }
  if(World.frameCount%30===0){
    s = s+1;
    seconds = s;
    setSeconds(seconds);
    console.log(s);
  }
  if(seconds>secs_before_hungry){
    Happy = false;
    milkS.x = -10;
  }
  drawSprites();
  fill(255);
  textSize(18);
  if(button.button1){
  text("x "+ foodS,250,255);
  if(m==="am"){
    text(button.name+" was last fed at " + hours + " am",150,350);
    }else{
    if(m==="pm"){
    text(button.name+" was last fed at " + hours + " pm",150,350);
  }}
}
}

function readStock(data){
  foodS = data.val();
}

function glide(obj){
  if(obj.x<=200){
  obj.x = obj.x+10;
  }
}

function readHours(data){
  hours = data.val();
}

function setHours(x){
  database.ref('/').update({hours:x});
}

function set_is_happy(x){
  database.ref('/').update({happy:x});
}

function get_is_happy(data){
  Happy = data.val();
}

function readSeconds(data){
  s = data.val();
}

function setSeconds(x){
  database.ref('/').update({seconds:x});
}

function ampm(){
    if(h>12){
      h = h%12
      m ="pm";
    }
  else{
      m = "am";
  }
}