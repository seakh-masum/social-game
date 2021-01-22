// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCAq1DawgfbV4Hniwo43Wd93BfhEByRCqo',
    authDomain: 'socail-game.firebaseapp.com',
    projectId: 'socail-game',
    storageBucket: 'socail-game.appspot.com',
    messagingSenderId: '547107535416',
    appId: '1:547107535416:web:5dd315e5a400f7698cc4cd',
    measurementId: 'G-MSTYNGMTX4',
  },
  // secretbaseurl: 'https://socialgames-sksayon.herokuapp.com/api/',
  secretbaseurl: 'http://localhost:3000/api/',
  hostingurl: 'https://socail-game.web.app/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
