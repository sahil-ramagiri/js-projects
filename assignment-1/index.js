/*
  Homework assignment #1
*/


// import all dependencies
var i = 0;
const http = require('http');
const https = require('https');
const url  = require('url' );
const { StringDecoder } = require('string_decoder');
const fs = require('fs');
const config = require('./config');

// create a http server and start it
http.createServer((req , res) => {
  unifiedServer(req ,res);
})
.listen(config.httpPort, () => console.log("http Server listening on port " + config.httpPort));


let httpsServerOptions = {
  'key': fs.readFileSync('./https/key.pem'),
  'cert': fs.readFileSync('./https/cert.pem')
};

// create a https server and start it
https.createServer(httpsServerOptions,(req,res) =>{
  unifiedServer(req,res);
})
.listen(config.httpsPort,()=>{
 console.log("https Server listening on port "+config.httpsPort);
});


//create a unifiedServer
const unifiedServer = (req ,res) => {

  // get headers and method from request object
  let { headers , method } = req ;

  //parse the url from request object
  let parsedUrl = url.parse(req.url , true);

  //get query and pathname from parsedUrl
  let { pathname , query } = parsedUrl;

  //trim the pathname using regex
  let trimmedPath = pathname.replace(/^\/+|\/+$/g, '');

  if(trimmedPath == 'recieve'){
    if(query.end == 'true'){
      recieve(req , res,true);
    }
     else{
       recieve(req , res);
     }
  }

};
function recieve(request, respond,end) {
  // The image data will be store here
  var body = '';
  // Target file path
  var filePath = './folder/'+i+'.png';
  i++;
  //

  request.on('data', function(data) {
    body += data;
  });

  // When whole image uploaded complete.
  request.on('end', function (){
    // Get rid of the image header as we only need the data parts after it.
    var data = body.replace(/^data:image\/\w+;base64,/, "");
    // Create a buffer and set its encoding to base64
    var buf = new Buffer(data, 'base64');
    // Write

    fs.writeFile(filePath, buf, function(err){
      if (err) throw err
      // Respond to client that the canvas image is saved.

      respond.end();
    });
  });
}
