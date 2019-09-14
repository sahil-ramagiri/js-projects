
var submit,clear,Load,rad;
let jsonUpload = document.getElementById('json-upload');
let weightsUpload1 = document.getElementById('weights-upload1');
//let weightsUpload2 = document.getElementById('weights-upload2');
let xr = 0,yr = 0;


let loadedModel ; 

function setup(){
    createCanvas(280,280); 
    console.log("test");
    background(0);

    submit = createButton("submit");
    clear  = createButton("clear");
    
    Load = createButton("load");
    rad = createSlider(0,280,100);
    
  
}


function draw(){
    
    submit.mousePressed(make);
    
    clear.mousePressed(blank);
    
//    Load.mousePressed(async ()=>{ loadedModel = await tf.loadModel(
//     tf.io.browserFiles([jsonUpload.files[0], weightsUpload1.files[0]));
//                                console.log(loadedModel);});
   
   Load.mousePressed(load);
     stroke(255);
    strokeWeight(19);
    noFill();
    //fill(255);
    if(mouseIsPressed){
        xr= mouseX;
        yr = mouseY;
        
    ellipse(xr,yr,rad.value(),rad.value());
    }
    
    
}

function keyPressed(){
    if(key == 's')
        make();
}
 
async function load(){ 
    try{
    loadedModel = await tf.loadModel("model.json");
    console.log('done');
        //loadedModel.summary();
//        let za = loadedModel.layers[24].getWeights()[0];
//        za.print();
    }
    catch{
        console.log("error");
}
}


function make(){
       
    var k = [];
    var img = get();
    var Nimg = createImage(28,28) ;
    //img.filter(BLUR, 2);
    img.resize(28,28);
    image(img,0,0,width,height)
  img.loadPixels();
  
for(var i = 0; i < 784; i++) {
    
      k.push(img.pixels[i*4]/255); 
    }
  

  
  
    tf.tidy( ()=>{
        
        
        
       let xval = tf.tensor(k, [1,28,28,1])

        //console.log(xval.dataSync());
    let results = loadedModel.predict(xval);
        //results = results.mul(tf.scalar(400));
        var zx =results.dataSync();
        //console.log(results.dataSync());

        
        
//        let newModel = tf.model({inputs: loadedModel.inputs, outputs: loadedModel.layers[23].output});
//        let output = tf.layers.conv2d({
//         kernelSize: 3,
//            filters: 1,
//            padding: 'same',
//        activation: 'sigmoid'
//     });   
     
//     newModel.add(output);
//        newModel.compile();
//    let results1 = newModel.predict(xval);
//        let za = loadedModel.layers[24].getWeights()[0];
//        console.log(za);
        //let za = tf.randomUniform([3,3,32,1],-500,500);
//        results1 = tf.conv2dTranspose(results1,za,[1,28,28,1],[1,1],'same');
       // results1 = results1.mul(tf.scalar(-1));
      
//       results1= results1.sigmoid();
//        var zx =results1.dataSync();
//        console.log(zx);
        
        
        var Nimg = createImage(28,28) ;
      Nimg.loadPixels(); 
   for(var i = 0; i < 784; i++) {
    Nimg.pixels[i*4]=zx[i]*255;
    Nimg.pixels[i*4 + 1]=zx[i]*255;
    Nimg.pixels[i*4 + 2]=zx[i]*255;
    Nimg.pixels[i*4 + 3]=255;
    }
   Nimg.updatePixels();
        
        
        dr(Nimg);
    });
   
        
}
function dr(a){
    console.log(a);
    image(a,0,0,width,height);
    
}
function blank(){
    background(0);
    
    
    
    
}




  