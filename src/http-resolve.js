import chalk from "chalk";
import { stat } from "fs";

function extractLinks(array) {
    return array.map( object => Object.values(object).join());
}

async function checkStatus (listURLs) {
    const arrStatus = await Promise
    .all(
        listURLs.map(async (url) => {
            try {
                const response = await fetch(url)
                return response.status

            } catch (error) {
                return handleError(error)
            }
        })
    )
    return arrStatus;
}

function handleError (error) {
    if (error.cause.code === 'ENOTFOUND') {
        return 'link does not exist'
    } else {
        return 'Something wrong, sorry!'
    }
}

export default async function resolveList(linksList) {
    const links = extractLinks(linksList);
    const status = await checkStatus(links);
    return linksList.map((obj, index) => ({
        ...obj,
        status: status[index]
    }))
}

