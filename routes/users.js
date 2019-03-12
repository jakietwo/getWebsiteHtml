var express = require('express');
var router = express.Router();
var superagent = require('superagent')
var charset = require('superagent-charset')
const cheerio = require('cheerio')
const fs =  require('fs')
var baseurl = 'https://www.csis.org/analysis/evening-budget-kremlin-playbook-2-live-aid-and-more'
/* GET users listing. */
router.get('/', function(req, res, next) {
  // 设置请求头
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  superagent.get(baseurl).end((err, res) => {
    if(err){
        console.log('抓取网站信息错误')
      }else{
        let $ = cheerio.load(res.text)
        let page = $('.layout-detail-page__main').find('article')
        console.log('page', page)
      }
  })
});

module.exports = router;
