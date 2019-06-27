import fse from 'fs-extra';
import cli from './cli';
import compressor from './compressor';
import {
  PATH_ORI_IMAGES, PATH_MIN_IMAGES,
} from './config';

async function run() {
  try {
    await fse.ensureDir(PATH_ORI_IMAGES);
    console.log('ensureDir', PATH_ORI_IMAGES);

    await fse.ensureDir(PATH_MIN_IMAGES);
    console.log('ensureDir', PATH_MIN_IMAGES);

    await fse.emptyDir(PATH_MIN_IMAGES);
    console.log('emptyDir', PATH_MIN_IMAGES);

    cli(compressor);
  } catch (error) {
    console.log(error);
  }
}

run();
