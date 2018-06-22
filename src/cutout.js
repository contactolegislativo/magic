const fs = require('fs');
const async = require('async');
const STORAGE_PATH = './img/deputies';

const sharp = require('sharp');
// Background to be
const bg = '#f50057';

function mask(bg, dimension) {
  return new Buffer(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${dimension}" height="${dimension}" viewBox="0 0 100 100">
        <path d="M0,50v50h50C22.4,100,0,77.6,0,50z" fill="${bg}" opacity="1"/>
        <path d="M50,0H0v50C0,22.4,22.4,0,50,0z" fill="${bg}" opacity="1"/>
        <path d="M50,100h50V50C100,77.6,77.6,100,50,100z" fill="${bg}" opacity="1"/>
        <path d="M50,0c27.6,0,50,22.4,50,50V0H50z" fill="${bg}" opacity="1"/>
    </svg>`);
}

function cut(fileName, ext) {
  let cropImage = sharp(`${STORAGE_PATH}/${fileName}.${ext}`);

  cropImage.metadata().then(info => {
    console.log(`>> ${fileName}.${ext} w${info.width}xh${info.height}`);
    let circle = mask(bg, 210);

    cropImage
        .resize(210)
        .crop(sharp.gravity.north)
        .extract({ left: 0, top: 0, width: 210, height: 210 });

    // Image cropped 210x210
    cropImage
        .png()
        .toFile(`${STORAGE_PATH}/ar/${fileName}.png`, (err, info) => {
          if(err) console.log(err);
          // console.log(info);
        });

    // Image cropped and rounded
    cropImage
      .overlayWith(circle, { cutover: true})
      .png()
      .toFile(`${STORAGE_PATH}/cc/${fileName}.png`, (err, info) => {
        if(err) console.log(err);
        // console.log(info);
      });

  });

}

function cutout(image, next) {
  let input = /([\w-\.]+).(jpg)/g.exec(image);

  if(input) {
    try {
      cut(input[1], input[2]);
    } catch(err) {
      console.log(`>>>>>> ${image}`)
    }
  } else {
    console.log(`- ${image}`)
  }

  next();
}

// Convert all images to valid PNG format
fs.readdir(STORAGE_PATH, (err, files) => {
 async.mapSeries(files, cutout, (err, result) => {
   // console.log(result);
 });
})

// cutout('./img/deputies/abdies-pineda-morin.jpg', () => {})
