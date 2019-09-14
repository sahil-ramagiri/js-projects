
var images = [];
var frame = 0;
var hover = false;
var hoverid;
var imagesrc =[];
var canvas;
var ctx;
var mouseX,mouseY;
function preloader()
  {
    for(var i=180;i<210;i++){
      imagesrc[i-180] = new Image();

      imagesrc[i-180].src="./Photo0"+i+".jpg";

      if(i==209)
      imagesrc[i-180].onload = function setup(){
         canvas = document.getElementById('canvas');
         canvas.addEventListener('mousemove', logKey);
         ctx= canvas.getContext('2d');
      populate(15);
      draw();
      };

    }

  }
  preloader();


function draw(){
  cClear();
  border();
  collide();
  if(!hover){
  update();
  imupdate();
  show();
}else{
  Show();
}
  checkhover();

  frame++;
   window.requestAnimationFrame(draw);
}
function cClear(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function imdraw(n,xpos,ypos,rad){
  ctx.save();
  ctx.beginPath();
  ctx.arc(xpos,ypos, rad, 0, Math.PI * 2, true);
  ctx.clip();
  ctx.drawImage(imagesrc[n], xpos-rad, ypos-rad,rad*2,rad*2);
  ctx.restore();
}
//draw();
function populate(n){
  for(var i=0;i<n;i++){
    var obj ={};
    console.log("populate");
    var pos = getPos();
    obj.x = pos.x;
    obj.y = pos.y;
    obj.s = pos.s;
    obj.id = randomInt(0,imagesrc.length);
    obj.xvel = randomInt(-3,5);
    obj.yvel = randomInt(-3,5);
    obj.span = randomInt(450,950);
    images.push(obj);

}
  console.log(images);
}
function getPos(){
  var flag;
  var S = randomInt(30,75);
  var X = randomInt(S,canvas.width-S);
  var Y = randomInt(S,canvas.height-S);
  while(true){
    flag=true ;

    S = randomInt(30,75);
    X = randomInt(S,canvas.width-S);
    Y = randomInt(S,canvas.height-S);
  for(var j=0;j<images.length;j++){
    var xp = images[j].x;
    var yp = images[j].y;
    var sp = images[j].s;
    var exp = ((X-xp)*(X-xp)) + ((Y-yp)*(Y-yp)) - ((S+sp)*(S+sp));
    if(exp<0)
    {flag=false ; break ;}
  }
  if(flag){
    return {x:X,y:Y,s:S};

  }

}
}
function update(){
  for(var i=0;i<images.length;i++){
    var im = images[i];
    im.x+=im.xvel;
    im.y+=im.yvel;
}
}
function imupdate(){
  for(var i=0;i<images.length;i++){
    var im = images[i];
    if(frame>im.span){
      im.id = randomInt(0,imagesrc.length);
      im.span = randomInt(450,950)+ frame;
    }
  }
}
function Show(){
  for(var i=0;i<images.length;i++){
    var im = images[i];
    imdraw(im.id,im.x,im.y,im.s);
  }
  var im = images[hoverid];
  imdraw(im.id,im.x,im.y,im.s*1.5);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "#F30DFF";
  ctx.beginPath();
  ctx.arc(im.x,im.y,im.s*1.5, 0, 2 * Math.PI);
  ctx.stroke();

}
function show(){
  for(var i=0;i<images.length;i++){
    var im = images[i];
    imdraw(im.id,im.x,im.y,im.s);
  }
}
function border(){
  for(var i=0;i<images.length;i++){
    var im = images[i];
      if(im.x+im.s>canvas.width){
        im.xvel*=-1;
        im.x=canvas.width-im.s;
      }
      if(im.x-im.s<0){
        im.xvel*=-1;
        im.x=im.s;
      }
      if(im.y+im.s>canvas.height){
        im.yvel*=-1;
        im.y=canvas.height-im.s;
      }
      if(im.y-im.s<0){
        im.yvel*=-1;
        im.y=im.s;
      }
  }
}
function checkhover(){
    var X = mouseX;
    var Y = mouseY;
    hover= false;
  for(var i=0;i<images.length;i++){
    var im = images[i];
    var xp= im.x;
    var yp= im.y;
    var sp= im.s;
    var exp = ((X-xp)*(X-xp)) + ((Y-yp)*(Y-yp)) - (sp*sp);

    if(exp<0){
      hover = true;
      hoverid = i;
    }
  }
}


function logKey(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}
function collide(){
  for(var i=0;i<images.length;i++){
    var im = images[i];
    var xp= im.x;
    var yp= im.y;
    var sp= im.s;
    for(var j=i;j<images.length;j++){
      if(i==j)
        continue;
    var other = images[j];
    var X = other.x;
    var Y = other.y;
    var S = other.s;
    var exp = ((X-xp)*(X-xp)) + ((Y-yp)*(Y-yp)) - ((S+sp)*(S+sp));
    if(exp<0)
      {

        var tx=other.xvel,ty=other.yvel;
        other.xvel= im.xvel;
        im.xvel= tx;
        other.yvel= im.yvel;
        im.yvel= ty;

        other.x+=2*other.xvel;
        other.y+=2*other.yvel;
        im.x+=2*im.xvel;
        im.y+=2*im.yvel;


        // other.xvel=0;
        // other.yvel=0;
      }
  }
}
}
// class Ball {
//
//   float x, y;
//   float diameter;
//   float vx = 0;
//   float vy = 0;
//   int id;
//   Ball[] others;
//
//   Ball(float xin, float yin, float din, int idin, Ball[] oin) {
//     x = xin;
//     y = yin;
//     diameter = din;
//     id = idin;
//     others = oin;
//   }
//
//   void collide() {
//     for (int i = id + 1; i < numBalls; i++) {
//       float dx = others[i].x - x;
//       float dy = others[i].y - y;
//       float distance = sqrt(dx*dx + dy*dy);
//       float minDist = others[i].diameter/2 + diameter/2;
//       if (distance < minDist) {
//         float angle = atan2(dy, dx);
//         float targetX = x + cos(angle) * minDist;
//         float targetY = y + sin(angle) * minDist;
//         float ax = (targetX - others[i].x) * spring;
//         float ay = (targetY - others[i].y) * spring;
//         vx -= ax;
//         vy -= ay;
//         others[i].vx += ax;
//         others[i].vy += ay;
//       }
//     }
//   }
//
//   void move() {
//     vy += gravity;
//     x += vx;
//     y += vy;
//     if (x + diameter/2 > width) {
//       x = width - diameter/2;
//       vx *= friction;
//     }
//     else if (x - diameter/2 < 0) {
//       x = diameter/2;
//       vx *= friction;
//     }
//     if (y + diameter/2 > height) {
//       y = height - diameter/2;
//       vy *= friction;
//     }
//     else if (y - diameter/2 < 0) {
//       y = diameter/2;
//       vy *= friction;
//     }
//   }
//
//   void display() {
//     ellipse(x, y, diameter, diameter);
//   }
// }



//
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
