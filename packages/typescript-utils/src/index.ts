import log from '@apify/log';

export function print(message: string) {
    log.info(`TypeScript utils say: ${message}`);
}
