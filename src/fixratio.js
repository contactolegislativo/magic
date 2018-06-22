const sharp = require('sharp');
// Background to be
const bg = '#f50057';
const circle = new Buffer(
  `<svg xmlns="http://www.w3.org/2000/svg" width="210" height="210" viewBox="0 0 100 100">
      <path d="M0,50v50h50C22.4,100,0,77.6,0,50z" fill="${bg}" opacity="1"/>
      <path d="M50,0H0v50C0,22.4,22.4,0,50,0z" fill="${bg}" opacity="1"/>
      <path d="M50,100h50V50C100,77.6,77.6,100,50,100z" fill="${bg}" opacity="1"/>
      <path d="M50,0c27.6,0,50,22.4,50,50V0H50z" fill="${bg}" opacity="1"/>
  </svg>`);

let input = './img/pri';
let ext = 'png';
let width = 210, height = 210;

let cropImage =
  sharp(`${input}.${ext}`)
    .resize(width, height)
    .crop(sharp.gravity.north)
    .extract({ left: 0, top: 0, width: width, height: height });

// Image cropped 210x210
cropImage
    .toFile(`${input}_ar.jpg`, (err, info) => {
      if(err) console.log(err);
      console.log(info);
    });

// Image cropped and rounded
cropImage
  .overlayWith(circle, { cutover: true})
  .toFile(`${input}_cc.jpg`, (err, info) => {
    if(err) console.log(err);
    console.log(info);
  });
