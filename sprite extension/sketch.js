// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

console.log('sketch blah');


var s = function(sketch) {

 let c;
let a = [];
 sketch.preload= function(){
    for(var i = 1;i<13;i++){
        let b = chrome.extension.getURL("stickman/Layer " + i +".png");
    a.push(sketch.loadImage(b));
        
    }
 }
    
    
  sketch.setup = function() {
    //document.body.style['userSelect'] = 'none';
    //let h = document.body.clientHeight;
     c = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    c.position(0, 0);
    
    sketch.clear();
  }

  sketch.draw = function() {
//      c.position(0, 0);
      sketch.frameRate(12);
    sketch.clear();
    c.drawingContext.clearRect(0,0,sketch.width,sketch.height);
    sketch.image(a[sketch.frameCount%12], (sketch.frameCount*6)% sketch.width,sketch.height - 100 );
    
  }
};

var myp5 = new p5(s);
