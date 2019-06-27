import inquirer from 'inquirer';
import fse from 'fs-extra';
import glob from 'glob';
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

// logging function
function log(status) {
  console.log(`----- ${status} -----`);
}

async function cli() {
  log('start question');

  try {
    return await inquirer.prompt(questions);
  } catch (error) {
    console.log('TCL: cli -> error', error);
  }

  log('end question');

  return false;
}

async function ensureSourceFolder() {
  await fse.ensureDir(SOURCE_PATH);
  log('ensure SOURCE_PATH', SOURCE_PATH);
}

async function ensureBuildFolder() {
  await fse.ensureDir(BUILD_PATH);
  log('ensure BUILD_PATH', BUILD_PATH);
}

async function emptyBuildFolder() {
  await fse.ensureDir(BUILD_PATH);
  log('empty BUILD_PATH', BUILD_PATH);
}

function getSources({ path }) {
  let images = [];
  glob(`${path}/**/*.{jpg,png}`, (er, files) => {
    images = files;
  });
  console.log('TCL: getSources -> images', images);
}

// async function compress({
//   path = SOURCE_PATH,
//   quality = QUALITY,
//   type = PLUGIN,
// }) {

// }


/**
 * Main
 * ------------
 * control the main program process
 */
async function main() {
  log('code start');

  // ask question
  const result = await cli();
  console.log('TCL: main -> result', result);

  // create source, build folder, and empty build folder
  await ensureSourceFolder();
  await ensureBuildFolder();
  await emptyBuildFolder();
  log('environment ready');

  const bar = new Progress();
  bar.start();

  // read sources
  const images = getSources(result);

  // run compressor
  // await compress(result);
  // log('compressed');

  // end, and open build folder
  log('code end');
}

main();
