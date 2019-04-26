const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminMozjpeg = require('imagemin-mozjpeg');

const imageminOptipng = require('imagemin-optipng');
const imageminPngquant = require('imagemin-pngquant');

const glob = require("glob")


glob("images/**/*.{jpg,png}", (er, files) => {
  files.forEach((path) => {
    const output = path.substring(0, path.lastIndexOf("/"));

    (async () => {
    	const files = await imagemin([path], `build/${output}`, {
    		plugins: [
    			imageminMozjpeg({
            quality: 85
          }),
    			imageminPngquant({
            quality: [0.85,1]
          })
    		]
    	});
    
    	console.log(files);
    })();
  })
});