
function setup(){
  createCanvas(1000,500);
  background(0);
  stroke(255);
  // for(var i =0;i<10;i++){
  //  circles.push({freq:2*i+1,rad:(100*4)/((2*i+1)*Math.PI),phase:0});
  // }
  var dub = [];
  noFill();
//  beginShape();
  for(var i=0;i<100;i++){
    dub.push({x:2*Math.PI*i,y:i<100*sin(2*Math.PI*i/100)});
    //vertex(dub[dub.length-1].x+width/2,dub[dub.length-1].y+height/2)
  }
  //endShape();

  for(var i =0;i<50;i++){
    var obj = dft(dub,i)
   circles.push({freq:i,rad:obj.rad,phase:obj.phase});
  }
  console.log(circles);

//   for(var v=0;v<1;v+=0.05)
//   {var sumx=0;
//   var sumy=0;
//     for(var i=0;i<circles.length;i++){
//     sumy+= circles[i].rad*sin(circles[i].freq*2*Math.PI*v + circles[i].phase);
//     sumx+= circles[i].rad*cos(circles[i].freq*2*Math.PI*v + circles[i].phase);
//   }
// console.log(sumx,sumy);}

}
var speedV = 300;
var mode = 1;
var sketch = [];
var circles = [];
var points = [];
var t = 0;
function draw(){
if(mode==0){
    if(mouseIsPressed){
      point(mouseX,mouseY);
      sketch.push({x:mouseX-width/2,y:mouseY-height/2});
    }
}
else{
  t = frameCount % speedV;
  t/=speedV;
  background(0);
  noFill();
  var prevX,prevY;
  for(var j=0;j<circles.length; j++){
    if(j==0){
      stroke(255);
      strokeWeight(1);
      circle(width/2,height/2,(circles[j].rad*2));
      prevX = width/2;
      prevY = height/2;
    }else{
      var x = prevX +circles[j-1].rad*cos(circles[j-1].freq*2*Math.PI*t + circles[j-1].phase);
      var y = prevY +circles[j-1].rad*sin(circles[j-1].freq*2*Math.PI*t + circles[j-1].phase);
      stroke(255);
      strokeWeight(1);
      circle(x,y,(circles[j].rad*2));
      prevX = x;
      prevY = y;
    }
    if(j == circles.length-1){
      var x = prevX +circles[j].rad*cos(circles[j].freq*2*Math.PI*t + circles[j].phase);
      var y = prevY +circles[j].rad*sin(circles[j].freq*2*Math.PI*t + circles[j].phase);
      points.push({x:x,y:y});
    }
}
beginShape();
for(var i=0;i<points.length;i++){
  noFill();
  strokeWeight(2);
  stroke(255,200,0);
  var po = points[i];
  // vertex(500+ i,po.y);
  vertex(po.x,po.y)
  // vertex(po.x,height/2);
}

endShape();
noFill();
 beginShape();
for(var i=0;i<100;i++){
  vertex(2*Math.PI*i+width/2,(sin(2*Math.PI*i/100)*100)+height/2);
}
endShape();

if (frameCount % speedV == 0){
  // console.log(points);
  points = [];
  }
}
}
function mouseReleased(){
  mode = 1;
  for(var i=0;i<sketch.length ;i++){
    var obj = ft(sketch,i);
    circles.push({freq:i,rad:obj.rad,phase:obj.phase});
  }
  console.log(circles);
  // var test = [];
  // for(var i=0;i<sketch.length ;i++){
  //   var obj = dft(sketch,i);
  //   test.push({freq:i,rad:obj.rad,phase:obj.phase});
  // }
  // console.log(test,"dft");
}

function ft(f,n){
  var dt =0.001;
  var x=0;
  var y=0;
  for(var j=0;j<1;j+=dt){
    var index = Math.floor(j*f.length);
    var ip = j*f.length -index;
    if(f[index+1]){
    var dx = ((1-ip)*f[index].x) +(ip*f[index+1].x);
    var dy = ((1-ip)*f[index].y) +(ip*f[index+1].y);}
    else{
      var dx = f[index].x;
      var dy = f[index].y;
    }
      // x+= cos(n*2*Math.PI*j)*dt*f[index].x;
      // y+= -sin(n*2*Math.PI*j)*dt*f[index].y;
      x+= (cos(n*2*Math.PI*j)*dt*dx)+(sin(n*2*Math.PI*j)*dt*dy);
      y+= (-sin(n*2*Math.PI*j)*dt*dx)+(cos(n*2*Math.PI*j)*dt*dy);

  }
  if(x<1e-10)
  {x=0;}
  if(y<1e-10)
  {y=0;}
  return {rad:sqrt(x*x + y*y),phase:atan2(y,x)};
}
function dft(f,n){
  var x=0;
  var y=0;
  for(var t=0;t<f.length;t++){
    var angle = 2*Math.PI*t*n/f.length;
    x+= (cos(angle)*f[t].x)+(sin(angle)*f[t].y);
    y+= (-sin(angle)*f[t].x)+(cos(angle)*f[t].y);
  }
  x= x/f.length;
  y= y/f.length;
  if(x<1e-10)
  {x=0;}
  if(y<1e-10)
  {y=0;}
  return {rad:sqrt(x*x + y*y),phase:atan2(y,x)};
}
