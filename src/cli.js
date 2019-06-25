import inquirer from 'inquirer';
import { isExists } from './fse';
import { DEFAULT_QUALITY } from './config';

const questions = [
  {
    type: 'input',
    name: 'path',
    message: 'Enter the path of the original images directory: ',
    default: './images',
    validate: (value) => {
      if (!isExists(value)) {
        return 'Directory not exists! ';
      }

      return true;
    },
  },
  {
    type: 'number',
    name: 'quality',
    message: 'Enter the quality (0.1 - 1): ',
    default: DEFAULT_QUALITY,
    validate: (value) => {
      if (Number.isNaN(parseFloat(value)) && !Number.isFinite(value)) {
        return 'Invalid numeric!';
      }

      if (parseFloat(value) <= 0.1) {
        return 'Large than 0.1 plz';
      }

      return true;
    },
  },
];

export default function cli() {
  inquirer.prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers, null, '  '));
  });
}
