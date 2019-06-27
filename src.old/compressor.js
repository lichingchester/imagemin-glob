import glob from 'glob';
import _cliProgress from 'cli-progress';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminPngquant from 'imagemin-pngquant';

import { PATH_MIN_IMAGES } from './config';

export default function compress({
  path,
  quality,
  type,
}) {
  const progress = new _cliProgress.Bar({
    stopOnComplete: true,
  }, _cliProgress.Presets.shades_classic);

  glob(`${path}/**/*.{jpg,png}`, (er, files) => {
    progress.start(files.length, 0);

    files.forEach((filePath) => {
      const buildPath = filePath.replace(`${path}/`, '');
      const output = buildPath.substring(0, buildPath.lastIndexOf('/'));

      (async () => {
        if (type === 'lossy') {
          await imagemin([filePath], `${PATH_MIN_IMAGES}/${output}`, {
            plugins: [
              imageminMozjpeg({
                quality: parseFloat(quality) * 100,
              }),
              imageminPngquant({
                quality: [parseFloat(quality), 1],
              }),
            ],
          });
        } else {
          await imagemin([filePath], `${PATH_MIN_IMAGES}/${output}`, {
            plugins: [
              imageminJpegtran({
                quality: parseFloat(quality) * 100,
              }),
              imageminOptipng({
                quality: [parseFloat(quality), 1],
              }),
            ],
          });
        }

        progress.increment();
      })();
    });
  });
}
