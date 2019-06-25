import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-mozjpeg';

import imageminOptipng from 'imagemin-optipng';
import imageminPngquant from 'imagemin-pngquant';

import glob from 'glob';

// glob("images/**/*.{jpg,png}", (er, files) => {
//   files.forEach((path) => {
//     const output = path.substring(0, path.lastIndexOf("/"));

//     (async () => {
//     	const files = await imagemin([path], `build/${output}`, {
//     		plugins: [
//     			imageminMozjpeg({
//             quality: 85
//           }),
//     			imageminPngquant({
//             quality: [0.85,1]
//           })
//     		]
//     	});

//     	console.log(files);
//     })();
//   })
// });


export default function compress({
  path,
  build,
  quality,
  type,
}) {
  glob('images/**/*.{jpg,png}', (er, files) => {
    // files.forEach((path) => {
    //   const output = path.substring(0, path.lastIndexOf('/'));
    //   console.log(output);
    // })();
    console.log(files);
  });


  // console.log(settings);
}
