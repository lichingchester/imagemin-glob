import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminPngquant from 'imagemin-pngquant';

import glob from 'glob';

async function compile(path, build, quality, type, output) {
  let plugin = [];
  if (type === 'lossy') {
    plugin = [
      imageminMozjpeg({
        quality: quality * 100,
      }),
      imageminPngquant({
        quality: [quality, 1],
      }),
    ];
  } else {
    plugin = [
      imageminJpegtran({
        quality: quality * 100,
      }),
      imageminOptipng({
        quality: [quality, 1],
      }),
    ];
  }

  const files = await imagemin([path], `${build}/${output}`, {
    plugins: plugin,
  });

  console.log(files);
}

export default function compress({
  path,
  build,
  quality,
  type,
}) {
  glob(`${path}/**/*.{jpg,png}`, (er, files) => {
    files.forEach((file) => {
      const output = file.substring(0, file.lastIndexOf('images/'));
      compile(path, build, quality, type, output);
    });
  });
}
