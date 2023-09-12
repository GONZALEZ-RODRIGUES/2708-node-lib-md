import chalk from 'chalk';
import getArq from './index.js';

const path = process.argv;

async function processText(path) {
    const result = await getArq(path[2]);
    console.log(chalk.bgGreenBright('Links list'), result);
}

processText(path);


// gonzalez@Julios-MacBook-Air src % node cli.js ../arquivos/texto.md
// cd .. back to project path
// gonzalez@Julios-MacBook-Air 2708-node-lib-md % node src/cli.js ./arquivos/texto.md