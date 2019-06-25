import cli from './cli';
import initial from './fse';
import compressor from './compressor';


// create the required folders
initial();

// get the params from user
cli(compressor);
