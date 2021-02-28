const axios = require("axios");
const fs = require('fs');
const xml2js = require('xml2js');

axios.get("https://social-games-sksayon.herokuapp.com/api/all-sitemap-links").then((response) => {
  if (response.status === 200) {
    // console.log(response.data["Data"]);
    let urlArray = [];
    urlArray.push({
      loc: "https://socail-game.web.app/secret-message/create",
      changefreq: "yearly",
      priority: 1,
    });
    response.data["Data"].forEach((element) => {
      urlArray.push({
        loc: 'https://socail-game.web.app/'+element.url,
        changefreq: "monthly",
        priority: 0.8,
      });
    });
    let sitemapXML = {
      xml: {
        urlset: {
          $: { xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9" },
          url: urlArray,
        },
      },
      file_name: "sitemap.xml",
    };
    var dir = `${process.cwd()}/dist/social-game/browser/sitemap/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    var filenm = `${process.cwd()}/dist/social-game/browser/` + sitemapXML.file_name;
    var filenm2 =
      `${process.cwd()}/dist/social-game/browser/sitemap/` + sitemapXML.file_name;

    var builder = new xml2js.Builder();
    var xml = builder.buildObject(sitemapXML.xml);
    fs.writeFileSync(filenm, xml, function (err) {
      if (err) throw err;
      console.log("It's saved!");
    });
    fs.writeFileSync(filenm2, xml, function (err) {
      if (err) throw err;
      console.log("It's saved!");
    });
  }
});
