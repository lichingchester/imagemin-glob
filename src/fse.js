import fse from 'fs-extra';

export default async function isExists(path) {
  const exists = await fse.pathExists(path);
  return exists;
}
