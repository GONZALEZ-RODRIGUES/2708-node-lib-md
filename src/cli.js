import chalk from 'chalk';
import getArq from './index.js';
import fs from 'fs';
import resolveList from './http-resolve.js';

const path = process.argv;

async function printList(resolve, result, identifier = '') {
    if (resolve) {
        console.log(chalk.yellow(`Resolved links list from ${identifier}`), 
        await resolveList(result));
    } else {
        console.log(chalk.yellow(`links list from ${identifier}`), 
        result);
    }
}

async function processText(args) {
    const path = args[2];
    const resolve = args[3] === '--resolve'

    try {
        fs.lstatSync(path);
    } catch (error) {
        if (error.code === 'ENOENT') {
            console.log(chalk.bgRedBright('File do not exist.'))
            return
        }
    }
    if (fs.lstatSync(path).isFile()) {
        const result = await getArq(path);
        printList(resolve, result)
    } else if (fs.lstatSync(path).isDirectory()) {
        console.log(chalk.bgMagentaBright(path))
        const files = await fs.promises.readdir(path);
        files.forEach(async (file) => {
            const list = await getArq(`${path}/${file}`)
            printList(resolve, list, file)
        });

    }
}

processText(path);


// gonzalez@Julios-MacBook-Air src % node cli.js ../arquivos/texto.md
// cd .. back to project path
// gonzalez@Julios-MacBook-Air 2708-node-lib-md % node src/cli.js ./arquivos/texto.md