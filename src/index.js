import inquirer from 'inquirer';
import fse from 'fs-extra';
import glob from 'glob-promise';
import _cliProgress from 'cli-progress';
import imagemin from 'imagemin';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminOptipng from 'imagemin-optipng';
import imageminPngquant from 'imagemin-pngquant';
import {
  SOURCE_PATH, BUILD_PATH, QUALITY, PLUGIN,
} from './config';
import Progress from './Progress';
import questions from './questions';

const bar = new Progress();

// logging function
function log(status) {
  console.log(`----- ${status} -----`);
}

async function cli() {
  // log('start question');

  try {
    return await inquirer.prompt(questions);
  } catch (error) {
    console.log('TCL: cli -> error', error);
  }

  // log('end question');

  return false;
}

async function ensureSourceFolder() {
  try {
    await fse.ensureDir(SOURCE_PATH);
    // log('ensure SOURCE_PATH', SOURCE_PATH);
  } catch (error) {
    console.log('TCL: ensureSourceFolder -> error', error);
  }
}

async function ensureBuildFolder() {
  try {
    await fse.ensureDir(BUILD_PATH);
    // log('ensure BUILD_PATH', BUILD_PATH);
  } catch (error) {
    console.log('TCL: ensureBuildFolder -> error', error);
  }
}

async function emptyBuildFolder() {
  try {
    await fse.ensureDir(BUILD_PATH);
    // log('empty BUILD_PATH', BUILD_PATH);
  } catch (error) {
    console.log('TCL: emptyBuildFolder -> error', error);
  }
}

async function getSources({ path }) {
  try {
    return await glob(`${path}/**/*.{jpg,png}`);
  } catch (error) {
    console.log('TCL: getSources -> error', error);
  }

  return false;
}

function getOutputPath(source, image) {
  const build = image.replace(`${source}/`, '');
  return build.substring(0, build.lastIndexOf('/'));
}

function getJpegOptions(quality) {
  return {
    quality: parseFloat(quality) * 100,
  };
}

function getPngOptions(quality) {
  return {
    quality: [parseFloat(quality), 1],
  };
}

async function lossyCompress(type, quality, image, output) {
  await imagemin([image], `${BUILD_PATH}/${output}`, {
    plugins: [
      imageminMozjpeg(getJpegOptions(quality)),
      imageminPngquant(getPngOptions(quality)),
    ],
  });

  bar.update();
}

async function losslessCompress(type, quality, image, output) {
  await imagemin([image], `${BUILD_PATH}/${output}`, {
    plugins: [
      imageminJpegtran(getJpegOptions(quality)),
      imageminOptipng(getPngOptions(quality)),
    ],
  });

  bar.update();
}

async function compress(
  images,
  {
    path = SOURCE_PATH,
    quality = QUALITY,
    type = PLUGIN,
  },
) {
  const compressors = [];

  images.forEach((image) => {
    const output = getOutputPath(path, image);

    if (type === 'lossy') {
      compressors.push(lossyCompress(type, quality, image, output));
    } else {
      compressors.push(losslessCompress(type, quality, image, output));
    }
  });

  try {
    await Promise.all(compressors);
  } catch (error) {
    console.log('TCL: compress -> error', error);
  }
}


/**
 * Main
 * ------------
 * control the main program process
 */
async function main() {
  // log('code start');

  // ask question
  const result = await cli();
  // console.log('TCL: main -> result', result);

  // create source, build folder, and empty build folder
  await ensureSourceFolder();
  await ensureBuildFolder();
  await emptyBuildFolder();
  // log('environment ready');

  // read sources
  const images = await getSources(result);
  bar.setWidth(images.length);
  // console.log('TCL: getSources -> images', images);

  // run compressor
  // log('compress start');
  bar.start();

  await compress(images, result);
  // log('compress end');

  bar.stop();

  // end, and open build folder
  // log('code end');
}

main();
