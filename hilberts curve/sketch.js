
var Nn =32;

var prev =[0,0];
var curr;
var i = 0;
var speed = 35;
//let capturer ;

//var canva;
var a= 0.05;
var pcanvas;

function setup() {
    pcanvas = createCanvas(600,600);
   // canva = pcanvas.canvas;
    background(2);
    // frameRate(FPS);
//    capturer =   new CCapture( {
//    format : 'webm',
//         name: 'save'
//
//});
//
//    capturer.start();
//
}

//function rec(){
//
//     capturer.capture(canva);
//}
function send(){
  var img = pcanvas.canvas.toDataURL();
  var http = new XMLHttpRequest();
var url = 'http://localhost:3000/recieve?end=true';
http.open('POST', url, true);
http.send(img);
}
function draw() {
     curr = hindex2xy(i,Nn);
//    var p = abs(map(noise(curr[0]*a,curr[1]*a),0,1,0,150));
     var p = abs(map(noise(curr[0]*a,curr[1]*a),0,1,-360,360));
    colorMode(HSB);
    stroke(p,60,100);
    strokeWeight(4);
    frameRate(120);
//rec();
        point(curr[0],curr[1]);
       strokeWeight(2);

    if(i!=0)
        line(prev[0],prev[1],curr[0],curr[1]);

        prev =curr;

    i++;

//    if(i>Nn*Nn){
//    prev = [0,0];
//        Nn=Nn*2;
//        i=0;
//        background(250);
//       speed= speed*2;
//
  //  }


//if(i>Nn*Nn-1){
//    noLoop();
//    capturer.stop();
//    //capturer.save();
//    saveCanvas('myCanvas', 'jpg');
//}
  send();
   noLoop();
if(i>Nn*Nn-1){
   noLoop();

}



}
function last2bits(x){
    return (x & 3);
}

function hindex2xy(hindex,N){
    var positions =[
        [0,0],[0,1],[1,1],[1,0]
    ];
    var tmp = positions[last2bits(hindex)];
    hindex = (hindex >>> 2);

    var x = tmp[0];
    var y = tmp[1];

    for(var n=4; n<= N; n*= 2){
        var n2 =n/2;

         switch(last2bits(hindex)){

             case 0:
                 tmp = x, x=y , y =tmp;
                 break;


             case 1:
                 x=x;
                 y= y+ n2;
                 break;

             case 2:
                 x= x+n2;
                 y= y+n2;
                 break;

             case 3:
                tmp =y;
                 y= (n2-1)-x;
                 x= (n2-1)-tmp;
                 x= x+ n2;
                 break;
         }

        hindex = (hindex >>> 2);

    }
    x = map(x , 0 , Nn-1, 12, width-12);
    y = map(y , 0 , Nn-1,  12, height -12);
    return [x,y];
}
