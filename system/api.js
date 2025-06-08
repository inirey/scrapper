__path = process.cwd()
//var favicon = require('serve-favicon');
var express = require('express');
var db = require(__path + '/main/db');
try {
var zahirr = db.get("zahirr");
} catch (e) {
	console.log('')  
}

var creator = "Rey"
var { color, bgcolor } = require(__path + '/opoya/color.js');
var { fetchJson } = require(__path + '/opoya/fetcher.js');
var options = require(__path + '/opoya/options.js');


/* 
  FEATURE
*/
var { pornhubDetailScraper } = require('../feature/phub.js');
var { facebook } = require('../feature/facebook.js');
var { twitter } = require('../feature/twitter.js');
var { TiktokDownloader } = require('../feature/tiktok.js');
// Tambahin sendiri variabel nya


var cookie = process.env.COOCKIE

loghandler = {
    notusername: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter username'
        },
    noturl: {
        status: false,
        creator: `${creator}`,
        code: 406,
        message: 'masukkan parameter url'
        },
    error: {
        status: false,
        creator: `${creator}`,
        message: 'internal server error'
    }
}

router.get('/dl/facebook', async (req, res, next) => {

  const url = req.query.url;
  //const apikey = req.query.apikey;
  if(!url) return res.json(loghandler.noturl)
       facebook(url)
       .then((result) => {
            res.json({
        status: true,
        code: 200,
        result
      })
    })
    .catch((error) => {
      res.json(error)
    });

router.get('/pornhub', async (req, res) => {
  const query = req.query.query || req.query.q;
  //const apikey = req.query.apikey;

  if (!query) {
    return res.status(400).json({
      status: false,
      message: 'Query parameter "query" is required.'
    });
  }

  try {
    const data = await pornhubDetailScraper(query);
    res.json({
      status: true,
      query,
      result: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      creator: '@Rey',
      message: 'Scraping failed or site may be blocked.',
    });
  }
});
	
router.get('/dl/tiktok', async (req, res, next) => {
    //var Apikey = req.query.apikey,
        url = req.query.url

	//if(!Apikey) return res.json(loghandler.notparam)
	//if(listkey.includes(Apikey)){
     if (!url) return res.json(loghandler.noturl)
     TiktokDownloader(`${url}`)
        .then(data => {
        var result = data.result;
             res.json({
               status: true,
               code: 200,
               creator: `${creator}`,
               result
             })
         })
         .catch((error) => {
            res.json(error);     
          });


module.exports = router
