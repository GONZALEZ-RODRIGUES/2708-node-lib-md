import fs from 'fs';
import chalk from "chalk";
// import { error } from 'console';

// function getArq(filePath) {
//     const encoding = "utf-8";
//     fs.promises.readFile(filePath, encoding)
//         .then((text) => console.log(chalk.bgBlueBright(text)))
//         .catch((error) => throwError(error))
// }

const textTest = "A interface File provê informações sobre arquivos e permite ao JavaScript  a acessar seu conteúdo. São geralmente recuperados a partir de um objeto [FileList](https://developer.mozilla.org/pt-BR/docs/Web/API/FileList) que é retornado como resultado da seleção, pelo usuário, de arquivos através do elemento [<input>](https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/Input), a partir do objeto [DataTransfer](https://developer.mozilla.org/pt-BR/docs/Web/API/DataTransfer) utilizado em operações de arrastar e soltar, ou a partir da API `mozGetAsFile()` em um [HTMLCanvasElement](https://developer.mozilla.org/pt-BR/docs/Web/API/HTMLCanvasElement). Em Gecko, códigos com privilégiios podem criar objetos File representando qualquer arquivo local sem a intereção do usuário (veja [Implementation notes](https://developer.mozilla.org/pt-BR/docs/Web/API/File#implementation_notes) para mais informações.). [Teste de retorno 400](https://httpstat.us/404). [gatinho salsicha](http://gatinhosalsicha.com.br/"

function throwError(error) {
    throw new Error(chalk.red(error.code, "there isn't this file"));
}

// fetch("https://api.github.com/users/GONZALEZ-RODRIGUES")
//     .then(response => response.json())
//     .then(json => console.log(json))
//     .catch(err => console.log(chalk.bgBlueBright('Request Failed'), err));

//async and await
async function getArq(filePath) {
    try {
        const encoding = 'utf-8';
        const text = await fs.promises.readFile(filePath, encoding);
        return getLinks(text);
    } catch (error) { //optional
        throwError(error)
    } finally { //optional
        console.log(chalk.bgYellowBright('Operation finished'))
    }
}



function getLinks(text) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
    const occurs = [...text.matchAll(regex)];
    const result = occurs.map( occur => ({
        [occur[1]]: occur[2] 
    }))
    return result;
}
//getArq('./arquivos/texto.md')
//getArq('./arquivos/texsdo.md')
// regular expression  \[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)

export default getArq;