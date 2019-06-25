import fs from 'fs';
import inquirer from 'inquirer';
// import chalkPipe from 'chalk-pipe';

// import imagemin from 'imagemin';
// import imageminJpegtran from 'imagemin-jpegtran';
// import imageminMozjpeg from 'imagemin-mozjpeg';

// import imageminOptipng from 'imagemin-optipng';
// import imageminPngquant from 'imagemin-pngquant';

// import glob from 'glob';


import { PATH_ORI_IMAGES, PATH_MIN_IMAGES, DEFAULT_QUALITY } from 'config';


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


// create ori-images and min-images folder
if (fs.existsSync(PATH_ORI_IMAGES)) {
  console.log(PATH_ORI_IMAGES);
  // return mkdirSync;
}


// const questions = [
//   {
//     type: 'input',
//     name: 'src_path',
//     message: 'What is the original images directory?',
//     default: './images',
//     validate: (value) => {
//       if (fs.existsSync(value)) {
//         return value;
//       }
//       return 'directory not exists! ';
//     },
//   },
// ];

// inquirer.prompt(questions).then((answers) => {
//   console.log(JSON.stringify(answers, null, '  '));
// });
