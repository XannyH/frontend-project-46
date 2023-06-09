import genDiff from '../src/index.js';

import { Command } from 'commander';
const program = new Command();

program
.version('0.0.1')
.description('Compares two configuration files and shows a difference.')
.argument('<filepath1>')
.argument('<filepath2>')
.option('-f, --format <type>', 'output format')
.action((filepath1, filepath2) => {
    console.log(genDiff(filepath1, filepath2));
 });

program.parse();
