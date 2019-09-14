var images = [];
var numPics = 12;
function initialize(){
    var root = document.getElementById('root');
    var shadow = root.attachShadow({mode: 'open'});
    var list = document.createElement('ul');
    list.setAttribute('id','container');
    for(var i=0; i<numPics; i++){
      var img = document.createElement('img');
      img.setAttribute('class','im'+i );
      img.setAttribute('src','./Photo0180.jpg');
      list.appendChild(img);
    }
    var defaultStyle = document.createElement('style');
    defaultStyle.textContent = `
    #container{
      postion:absolute;
      width:100vw;
      height:100vh;
      list-style:none;
    }
    img{
      border-radius: 50%;
      position: absolute;
      border:2px solid #800080;
    }
    `;
    var style = document.createElement('style');
    style.type = 'text/css';
    var buffer = '';
    for(var i=0;i<numPics;i++){
    var size =randomInt(25,75);
    var top = randomInt(25,500);
    var left = randomInt(25,700);
    // getOne();
    images.push({
      size:size,
      top:top,
      left:left
    });
    buffer += `img.im${i}{
      width: ${size}px;
      height: ${size}px;
      top:${top}px;
      left:${left}px;
    }
    img.im${i}:hover{
    transform:scale(1.4,1.4);
    }
    `;
    };
    style.textContent = buffer;
    shadow.appendChild(list);
    shadow.appendChild(style);
    shadow.appendChild(defaultStyle);
}

initialize();
function setup(){
  var pcanvas = createCanvas(500,500);
  background(0);
  var canva = pcanvas.canvas;
  var ctx = canva.getContext('2d');
  ctx.clearRect(0, 0, canva.width, canva.height);
}
// document.getElementById('root').shadowRoot.appendChild(style)
// var Vdom = document.getElementById('root').cloneNode(true);
// Vdom.style.position = 'relative';
// Vdom.style.top = '0';
// Vdom.style.left = '0';
// Vdom.style.width = '100vw';
// Vdom.style.height = '100vh';
// // var Vdom = document.createElement('div');
// for(var i=0; i<10; i++){
//   var img = document.createElement('img');
//   img.setAttribute('src','./rupes.jpeg');
//   img.style.width = '25px';
//   img.style.height = '25px';
//   img.style.borderRadius = '50%';
//   img.style.postion = 'absolute';
//   img.style.transform = 'translate('+randomInt(25,550)+'px,'+randomInt(25,550)+'px)';
//   images.push(img);
//   Vdom.appendChild(img);
// }
//
//  document.body.replaceChild(Vdom, root);
// console.log(document.body);
// var c = 25;
// // setInterval(render, 1000);
//
//
// function render(){
// for(var i=0; i<10; i++){
//   var img = images[i];
//   img.style.transform = 'translate('+randomInt(0,5)+'px,'+randomInt(0,5)+'px)';
// }
// window.requestAnimationFrame(render);
// }

//render();
// document.body.appendChild(Vdom);

function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
