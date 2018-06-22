const fs = require('fs')
  , out = fs.createWriteStream('./img/abdies-pineda-morin_canva.png');

// 450/236 = 1.9
// 500/261 = 1.91
// 600/315 = 1.9
const width = 250, height = 250; // 1,9
var Canvas = require('canvas')
  , Image = Canvas.Image
  , canvas = new Canvas(width, height)
  , ctx = canvas.getContext('2d');

const styles = {
  h1: {
    lineWidth: 1,
    strokeStyle: 'white',
    fillStyle: 'white',
    font: '18px Impact'
  },
  h2: {
    lineWidth: 1,
    strokeStyle: '#F8BBD0',
    fillStyle: '#F8BBD0',
    font: '12px Impact'
  }
}

function write(displayName, ctx, style, x, y) {
  ctx.lineWidth = style.lineWidth;
  ctx.strokeStyle = style.strokeStyle;
  ctx.font = style.font;
  ctx.fillStyle = style.fillStyle;

  var m = ctx.measureText(displayName);

  ctx.strokeText(displayName, x - m.width/2, y);
  ctx.fillText(displayName, x - m.width/2, y);
}

ctx.fillStyle = "#f50057";
ctx.fillRect(0, 0, width, height);

// write('Abdies Pineda Morin', ctx, styles.h1, width/2, height - 20);
// write('San Luis Potosi, Distrito 3', ctx, styles.h2, width/2, height - 5);

fs.readFile('./img/abdies-pineda-morin_cc.jpg', function(err, squid){
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
