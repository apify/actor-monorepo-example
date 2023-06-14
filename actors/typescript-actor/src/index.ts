import { Actor } from 'apify';

// @ts-ignore
import { print as javascriptPrint } from '@packages/javascript-utils'; 
import { print as typescriptPrint } from '@packages/typescript-utils';

await Actor.init();

javascriptPrint('Hello from a TypeScript actor!');

const actorInput = await Actor.getInput<{ message: string }>();
typescriptPrint(actorInput?.message || 'No message provided!');

await Actor.exit();
