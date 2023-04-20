const chalk = require('chalk');
const { DateTime } = require('luxon');

// mod.cjs
// eslint-disable-next-line no-shadow
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

exports.handler = async function (event, context) {
    const eventBody = JSON.parse(event.body);
    const POKE_API = 'https://pokeapi.co/api/v2/pokedex/' + eventBody.region;

    const date = DateTime.now();
    const color = eventBody.region === 'kanto' ? chalk.blue : chalk.green;
    const timeColor = chalk.bgWhite;

    console.log(timeColor(`Fetched at: ${date}`));
    console.log(color(`\tAcessed Region: ${eventBody.region}`));

    // console.log(event);

    const response = await fetch(POKE_API);
    const data = await response.json();
    console.log(color(`\tTotal Entry Count: ${data.pokemon_entries.length}`));

    return {
        statusCode: 200,
        body: JSON.stringify({
            pokemon: data.pokemon_entries
        })
    }
}