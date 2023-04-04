import { Actor } from 'apify';
import utils from '../shared/utils.js';

await Actor.init()

const { message } = await Actor.getInput();

utils.print('Actor 1', message);

await Actor.exit();
