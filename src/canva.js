const fs = require('fs');
const async = require('async');
const STORAGE_PATH = './img/deputies';

function cut(fileName, ext) {
  console.log(`>> ${fileName}.${ext}`);
  var out = fs.createWriteStream(`${STORAGE_PATH}/canvas/${fileName}.${ext}`);
  var width = 250, height = 250; // 1,9
  var Canvas = require('canvas')
    , Image = Canvas.Image
    , canvas = new Canvas(width, height)
    , ctx = canvas.getContext('2d');

  ctx.fillStyle = "#f50057";
  ctx.fillRect(0, 0, width, height);

  fs.readFile(`${STORAGE_PATH}/cc/${fileName}.${ext}`, function(err, squid){
    if (err) throw err;
    img = new Image;
    img.src = squid;
    ctx.drawImage(img, width/2 - img.width/2, height/2 - img.height/2, img.width, img.height);

    var stream = canvas.pngStream();

    stream.on('data', function(chunk){
      out.write(chunk);
    });

    stream.on('end', function(){
      console.log('The PNG stream ended');
    });

    out.on('finish', function(){
      console.log('The PNG file was created.');
    });

  });

}

function cutout(image, next) {
  let input = /([\w-\.]+).(jpg|png)/g.exec(image);

  if(input) {
    cut(input[1], input[2]);
  } else {
    console.log(`- ${image}`)
  }

  next();
}

// Convert all images to valid PNG format
fs.readdir(`${STORAGE_PATH}/cc`, (err, files) => {
 async.mapSeries(files, cutout, (err, result) => {
   // console.log(result);
 });
})

// cutout('./img/deputies/abdies-pineda-morin.jpg', () => {})
