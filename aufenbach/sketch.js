//change these parameters for accuracy 

var particleCount = 40;
var iterations = 30;



class Particle {
	constructor() {
	 this.W1 = tf.randomNormal([1,30]);
     this.B1 = tf.randomNormal([30]);
     this.W2 = tf.randomNormal([30,1]);
     this.B2 = tf.randomNormal([1]);
        
     this.bestW1 = this.W1;
     this.bestB1 = this.B1;
     this.bestW2 = this.W2;
     this.bestB2 = this.B2;
        
     this.velW1 = tf.zeros([1,30]);
     this.velB1 = tf.zeros([30]);
     this.velW2 = tf.zeros([30,1]);
     this.velB2 = tf.zeros([1]);
        
     this.cost = tf.scalar(10000);    
	}
}

function global(){
     this.W1 = tf.randomNormal([1,30]);
     this.B1 = tf.randomNormal([30]);
     this.W2 = tf.randomNormal([30,1]);
     this.B2 = tf.randomNormal([1]);
    
    this.cost = tf.scalar(10000); 
}

let labelX ;
let labelY ;

let model;
let particles = []; 

let c1,c2,u ;

function randomLabel(){
    labelX = tf.randomNormal([350,1]).mul(tf.scalar(10)).abs();
    let temp1 = labelX.log();
   let temp =  tf.scalar(-2).mul(temp1);
   labelY = temp.add(tf.fill([350,1],10)) ;
    
}

function getPrediction(c,a){
    
    model.layers[0].setWeights([c.W1,c.B1]);
    model.layers[1].setWeights([c.W2,c.B2]);
    
    return model.predict(a);
}

function globalPrediction(a){
    
    model.layers[0].setWeights([g.W1,g.B1]);
    model.layers[1].setWeights([g.W2,g.B2]);
    
    return model.predict(a);
}

function getCost(c){
    
    var cost;
    
    cost = tf.losses.meanSquaredError(labelX,getPrediction(c,labelY));
        return cost;
   
    
}

function update(c){
    
    c.velW1 = c.velW1.mul(u);
    c.velW1 = c.velW1.add(tf.randomNormal([1,30]).mul(c.bestW1.sub(c.W1)).mul(c1)); 
    c.velW1 = c.velW1.add(tf.randomNormal([1,30]).mul(c2).mul(g.W1.sub(c.W1)));
     
    c.velB1 = c.velB1.mul(u);
    c.velB1 = c.velB1.add(tf.randomNormal([30]).mul(c.bestB1.sub(c.B1)).mul(c1)); 
    c.velB1 = c.velB1.add(tf.randomNormal([30]).mul(c2).mul(g.B1.sub(c.B1)));
    
    c.velW2 = c.velW2.mul(u);
    c.velW2 = c.velW2.add(tf.randomNormal([30,1]).mul(c.bestW2.sub(c.W2)).mul(c1)); 
    c.velW2 = c.velW2.add(tf.randomNormal([30,1]).mul(c2).mul(g.W2.sub(c.W2)));

    c.velB2 = c.velB2.mul(u);
    c.velB2 = c.velB2.add(tf.randomNormal([1]).mul(c.bestB2.sub(c.B2)).mul(c1)); 
    c.velB2 = c.velB2.add(tf.randomNormal([1]).mul(c2).mul(g.B2.sub(c.B2)));
    
    
    c.W1 = c.W1.add(c.velW1);
    c.W2 = c.W2.add(c.velW2);
    c.B1 = c.B1.add(c.velB1);
    c.B2 = c.B2.add(c.velB2);
        

}

function evaluate(c){
    
    
    
    if(getCost(c).dataSync()[0] < c.cost.dataSync()[0]){
        
     c.bestW1 = c.W1;
     c.bestB1 = c.B1;
     c.bestW2 = c.W2;
     c.bestB2 = c.B2;
        
        c.cost = getCost(c);
    }
    
    if(c.cost.dataSync()[0] < g.cost.dataSync()[0]){
     g.W1 = c.bestW1;
     g.B1 = c.bestB1;
     g.W2 = c.bestW2;
     g.B2 = c.bestB2;
        
        g.cost = c.cost;
    }
    
}
let g;
function setup(){
    createCanvas(500,500);
   
    background(156);
   g = new global(); 

    randomLabel();
    
    //hyperparameters for PSO
    
    u = tf.scalar(0.9);
    c1 = tf.scalar(0.1);
    c2 = tf.scalar(0.1);
    
    
    model = tf.sequential();
     console.log("working...")
     
     let hidden1 = tf.layers.dense({
         units:30,
         activation:'sigmoid',
         inputDim:1
     });  
    let output = tf.layers.dense({
         units:1    ,
        activation: 'relu'
     });   
     
     model.add(hidden1);
     model.add(output);

   
    
    model.compile({
         optimizer:"adam",
         loss:'meanSquaredError'
         
     });



    
    
    for(var i = 0;i < particleCount;i++){
             
        var p = new Particle;
                
        particles.push(p);
    }
     
    
}

function draw(){
    
    
    for(var i = 0;i < particles.length;i++){
             
        p = particles[i];

        update(p);
        evaluate(p);
    }
    
    
      

    tf.tidy(()=>{  
    console.log(g.cost.dataSync()[0]);
    background(51);
    grapher(); 
    });
        
    
    if(frameCount == iterations){    
            grapher();          
            noLoop();
        }
        
}
    let xs = [];
    let ys = [];

    let x1 ;
    let y1 = [];

function grapher(){
    for(var i =0.1 ; i<10 ; i+=0.5){
        xs.push(i);
        ys.push(-2*log(i) + 10);
        
        
    }
    y1 = tf.tensor2d([ys]).reshape([20,1]);
    
    x1 = globalPrediction(y1);
    
    const values = x1.dataSync();
const arr = Array.from(values);

    translate(width/2,100);
    noFill();
    stroke(255,120,50);
    strokeWeight(2);
    beginShape();
    for(var i =0 ; i<xs.length; i++){
        vertex(xs[i]*12,height-ys[i]*40);
        
    }
    endShape();
    
    stroke(20,120,250);
    beginShape();
    for(var i =0 ; i<xs.length; i++){
        vertex(arr[i]*12,height-ys[i]*40);
        
    }
    endShape();
    xs = [];
    ys = [];
    y1 = [];
}


//normalization of data can be employed 

//mean = train_data.mean(axis=0)
//std = train_data.std(axis=0)
//train_data = (train_data - mean) / std
//test_data = (test_data - mean) / std