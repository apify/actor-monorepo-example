import { Actor } from 'apify';

import { print } from '@packages/javascript-utils';

await Actor.init();

print('Hello from a JavaScript actor!');

const actorInput = await Actor.getInput();
print(actorInput?.message || 'No message provided!');

await Actor.exit();
