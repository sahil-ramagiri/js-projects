var a = [];
let c;
function preload(){
    for(var i = 1;i<13;i++){
    a.push(loadImage("stickman/Layer " + i +".png"));
    }
}

function setup(){
    let h = document.body.clientHeight;
     c =createCanvas(windowWidth, h);
    c.position(0,0);
    clear();
    
}

function draw(){
    frameRate(12);
    clear();
    c.drawingContext.clearRect(0,0,width,height);
    image(a[frameCount%12], (frameCount*6)% width,height - 100 );
    
   
   // resizeCanvas(windowWidth, windowHeight);
}