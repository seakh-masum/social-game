import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import 'localstorage-polyfill';
import { enableProdMode } from '@angular/core';
import { environment } from 'src/environments/environment';
const domino = require('domino');
const fs = require('fs');
const xml2js = require('xml2js');
const axios = require('axios');
const template = fs
  .readFileSync('dist/social-game/browser/index.html')
  .toString();
const win = domino.createWindow(template);

global['window'] = win;
global['localStorage'] = localStorage;
global['document'] = win.document;
global['Document'] = win.document;
global['DOMTokenList'] = win.DOMTokenList;
global['Node'] = win.Node;
global['Text'] = win.Text;
global['HTMLElement'] = win.HTMLElement;
global['navigator'] = win.navigator;
global['MutationObserver'] = getMockMutationObserver();

function getMockMutationObserver() {
  return class {
    observe(node: any, options: any) {}

    disconnect() {}

    takeRecords() {
      return [];
    }
  };
}
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// The Express app is exported so that it can be used by serverless Functions.
export function app(): express.Express {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/social-game/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html'))
    ? 'index.original.html'
    : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    'html',
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    '*.*',
    express.static(distFolder, {
      maxAge: '1y',
    })
  );
  // Create Sitemap
  server.post('/createxmlsitemap/', async function (req: any, res: any) {
    var reqdata = req.body.xml;
    var file_name = req.body.file_name;

    var dir = `${process.cwd()}/dist/social-game/browser/sitemap/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    var filenm = `${process.cwd()}/dist/social-game/browser/` + file_name;
    var filenm2 =
      `${process.cwd()}/dist/social-game/browser/sitemap/` + file_name;

    var builder = new xml2js.Builder();
    var xml = builder.buildObject(reqdata);
    fs.writeFileSync(filenm, xml, function (err: any) {
      if (err) throw err;
      console.log("It's saved!");
    });
    fs.writeFileSync(filenm2, xml, function (err: any) {
      if (err) throw err;
      console.log("It's saved!");
    });
    var result = {
      Status: true,
      Path: filenm,
      Path2: filenm2,
      Message: 'Sitemap created successfully.',
    };
    return res.json(result);
  });
  // Get Sitemap
  server.get('/get-sitemap/', (req, res) => {
    var result: any = {
      Status: false,
      fileContent: {},
      Message: '',
      'fileContent-sub': {},
    };
    var filenm = `${process.cwd()}/dist/social-game/browser/sitemap.xml`;
    if (fs.existsSync(filenm)) {
      result['fileContentxml'] = fs.readFileSync(filenm, 'utf8');

      xml2js.parseString(
        fs.readFileSync(filenm, 'utf8'),
        { explicitArray: false },
        (err: any, resdata: any) => {
          if (err) {
            result['Status'] = false;
          } else {
            result['fileContent'] = resdata;
            result['Status'] = true;
          }
        }
      );

      var subFilenm = `${process.cwd()}/dist/social-game/browser/sitemap-sub.xml`;
      if (fs.existsSync(subFilenm)) {
        xml2js.parseString(
          fs.readFileSync(subFilenm, 'utf8'),
          { explicitArray: false },
          (err: any, resdata2: any) => {
            if (err) {
              result['StatusSub'] = false;
            } else {
              result['fileContent-sub'] = resdata2;
              result['StatusSub'] = true;
            }
          }
        );
      }
    } else {
      result['Status'] = false;
    }
    return res.json(result);
  });
  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run(): void {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
