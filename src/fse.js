import fse from 'fs-extra';
import {
  PATH_ORI_IMAGES, PATH_MIN_IMAGES,
} from './config';

export function emptyDirectory(path) {
  try {
    return fse.emptyDir(path);
    console.log('emptyDirectory', path);
  } catch (error) {
    console.log('Error in emptyDirectory()', error);
  }
}

export async function isExists(path) {
  const exists = await fse.pathExists(path);
  return exists;
}

export function ensureOriginal() {
  // try {
  return fse.ensureDir(PATH_ORI_IMAGES);
  // console.log('ensureOriginal');
  // } catch (error) {
  // console.log('Error in ensureOriginal()', error);
  // }
}

export function ensureMinimize() {
  try {
    return fse.ensureDir(PATH_MIN_IMAGES);
    console.log('ensureMinimize');
  } catch (error) {
    console.log('Error in ensureOriginal()', error);
  }
}

export default async function initial() {
  await ensureOriginal();
  await ensureMinimize();

  // remove directory
  await emptyDirectory('./build');

  console.log('end initial');
}
