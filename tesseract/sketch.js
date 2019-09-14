function makePoints(){
    var a = [];
    
   for(var i = 0;i<16;i++ ){
       var j = ( i >>> 0).toString(2);     
           j = "0".repeat(4 - j.length) + j;
       var k = {x:j.charAt(0),
                y:j.charAt(1),
                z:j.charAt(2),
                w:j.charAt(3)      
               };
    a.push(k);
   
    }
    return a;
}

function giveLines(){
    var p = []; 
    
    for(var x = 0; x < 16 ; x++){
        for(var y = 0 ; y < 16 ; y++){      
        var  a = ( (~x ^ y) >>> 0).toString(2);      
        a = a.substring(a.length - 4 ,a.length);
            var  b =parseInt(a,2);
            if(b == 7 || b == 11 || b == 13 || b == 14 )
                p.push({a:x,b:y});
           
    }
    }
    //console.log(p);
    return p;
}

var points ,projected;
var lines ;
var Scale = 100;
var RXY,RXW;
var angle = 0;
function setup(){
    createCanvas(500,500,WEBGL);
    background(0);
    stroke(255);
    strokeWeight(3);
     points  = makePoints();
     lines = giveLines();
    projected = points;
    show();
    
}
function project(){
    for(var i =0;i<points.length;i++){
        var point = points[i];
        var projectedp = projected[i];
        var m = [[point.x ],[point.y],[point.z]];
    var n =  matMul(m,RXW);
        n =  matMul(n,RXY);
        projectedp.x = n[0][0];
        projectedp.y = n[1][0];
        projectedp.z = n[2][0];
        projectedp.w = n[3][0];
        
    }
    
}

function update(){
    var ct = cos(angle);
    var st = sin(angle);
     RXY = [[ct,st,0,0],
            [-st,ct,0,0],
            [0,0,1,0],
           [0,0,0,1]];
    RXW = [[ct,0,0,st],
          [0,1,0,0],
          [0,0,1,0],
          [-st,0,0,ct]];   
}
function show(){
    background(0);
    for(var point of projected){
        push();
        translate(point.x *Scale,point.y*Scale,point.z*Scale);
        sphere(5);
        pop();
    }
    
    for(var line of lines){
        var a =points[line.a];
        var b =points[line.b];
    beginShape(LINES);
        vertex(a.x*Scale,a.y*Scale,a.z*Scale);
        vertex(b.x*Scale,b.y*Scale,b.z*Scale);
    endShape();
    }
}


function draw(){
    angle+=0.001;
//    rotateX(angle);
//    rotateY(angle);
    update();
    project();
    show();
    
}
