import * as functions from 'firebase-functions';
import 'reflect-metadata';
const universal = require(`${process.cwd()}/dist/social-game/server/main`).app();
export const ssr = functions.https.onRequest(universal);
