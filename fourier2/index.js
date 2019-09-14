
function setup(){
  createCanvas(1000,500);
  background(0);
  stroke(255);
  // var dub = [];
  //
  // for(var i=0;i<100;i++){
  //   dub.push(0);
  // }
  // for(var i=0;i<100;i++){
  //   dub.push(100);
  // }
  // for(var i=0;i<100;i++){
  //   dub.push(0);
  // }
  // for(var i=0;i<100;i++){
  //   dub.push(100);
  // }
  //
  // circles = dft(dub);
  // console.log(circles);

  for(var v=0;v<1;v+=0.05)
  {var sumx=0;
  var sumy=0;
    for(var i=0;i<circles.length;i++){
    sumy+= circles[i].rad*sin(circles[i].freq*2*Math.PI*v + circles[i].phase);
    sumx+= circles[i].rad*cos(circles[i].freq*2*Math.PI*v + circles[i].phase);
  }
console.log(sumx,sumy);}

}
var speedV = 300;
var mode = 0;
var sketch = [];
var circles = [];
var points = [];
var ti = 0;
var dtime;
function draw(){
if(mode==0){
    if(mouseIsPressed){
      point(mouseX,mouseY);
      sketch.push({x:mouseX-width/2,y:mouseY-height/2});
    }
}
else{
  dtime = 1/(circles.length);
  ti+=dtime;
  // console.log(ti);
  if(ti>1){
    ti=0;
    points = [];
    console.log("clear ponts");
  }
  background(0);
  noFill();
  var prevX,prevY;
  prevX = width/2;
  prevY = height/2;
  for(var j=0;j<circles.length; j++){
    if(j==0){
      stroke(255);
      strokeWeight(1);
      circle(width/2,height/2,(circles[j].rad*2));
      prevX = width/2;
      prevY = height/2;
    }else{
      var x = prevX +circles[j-1].rad*cos(circles[j-1].freq*2*Math.PI*ti + circles[j-1].phase);
      var y = prevY +circles[j-1].rad*sin(circles[j-1].freq*2*Math.PI*ti + circles[j-1].phase);
      stroke(255);
      strokeWeight(1);
      circle(x,y,(circles[j].rad*2));
      prevX = x;
      prevY = y;
    }
    if(j == circles.length-1){
      var x = prevX +circles[j].rad*cos(circles[j].freq*2*Math.PI*ti + circles[j].phase);
      var y = prevY +circles[j].rad*sin(circles[j].freq*2*Math.PI*ti + circles[j].phase);
      points.push({x:x,y:y});
    }
}
beginShape();
noFill();
strokeWeight(2);
stroke(255,200,0);
for(var i=0;i<points.length;i++){

  var po = points[i];
  // vertex((400*i/circles.length)+width/2,po.x - 250);
  vertex(po.x,po.y);
  // vertex(po.x,height/2);
}
endShape();
// stroke(0,2,255);
// noFill();
//  beginShape();
// for(var i=0;i<100;i++){
//   vertex(i+width/2,height/2);
// }
// for(var i=0;i<100;i++){
//   vertex(100+i+width/2,100+height/2);
// }
// for(var i=0;i<100;i++){
//   vertex(i+200+width/2,height/2);
// }
// for(var i=0;i<100;i++){
//   vertex(i+300+width/2,100+height/2);
// }
// endShape();

// if (frameCount % speedV == 0){
//   // console.log(points);
//   points = [];
//   }
}
}
function mouseReleased(){
  mode = 1;
  circles = dft2d(sketch);
  console.log(circles);

}

function dft(f){
  var fourier = [];
  for (var k = 0; k < f.length; k++){
  var x=0;
  var y=0;
  for(var t=0;t<f.length;t++){
    var angle = 2*Math.PI*t*k/f.length;
    x+= (cos(angle)*f[t]);
    y+= (-sin(angle)*f[t]);
  }
  x= x/f.length;
  y= y/f.length;
  if(x<1e-10 && x >-(1e-10))
  {x=0;}
  if(y<1e-10 && y >-(1e-10))
  {y=0;}
  fourier.push({freq:k,rad:sqrt(x*x + y*y),phase:atan2(y,x)});
  }
  return fourier;
}
function dft2d(f){
  var fourier = [];
  for (var k = 0; k < f.length; k++){
  var x=0;
  var y=0;
  for(var t=0;t<f.length;t++){
    var angle = 2*Math.PI*t*k/f.length;
    x+= (cos(angle)*f[t].x)+(sin(angle)*f[t].y);
    y+= (-sin(angle)*f[t].x)+(cos(angle)*f[t].y);
  }
  x= x/f.length;
  y= y/f.length;
  if(x<1e-10 && x >-(1e-10))
  {x=0;}
  if(y<1e-10 && y >-(1e-10))
  {y=0;}
  fourier.push({freq:k,rad:sqrt(x*x + y*y),phase:atan2(y,x)});
  }
  return fourier;
}
