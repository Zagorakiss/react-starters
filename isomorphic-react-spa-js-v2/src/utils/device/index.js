import parser from 'ua-parser-js';

function parseUserAgent() {
    return parser();
}

export const deviceUtils = {
    parseUserAgent
};