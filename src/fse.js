import fse from 'fs-extra';
import {
  DEBUG, PATH_ORI_IMAGES, PATH_MIN_IMAGES,
} from './config';

export async function isExists(path) {
  const exists = await fse.pathExists(path);
  return exists;
}

export async function ensureOriginal() {
  try {
    await fse.ensureDir(PATH_ORI_IMAGES);
  } catch (error) {
    console.log('Error in ensureOriginal()', error);
  }
}

export async function ensureMinimize() {
  try {
    await fse.ensureDir(PATH_MIN_IMAGES);
  } catch (error) {
    console.log('Error in ensureOriginal()', error);
  }
}

export default function initial() {
  ensureOriginal();
  ensureMinimize();
}
