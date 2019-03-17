var express = require('express');
var router = express.Router();
var superagent = require('superagent')
var charset = require('superagent-charset')
const cheerio = require('cheerio')
const fs =  require('fs')
var baseurl = 'https://www.csis.org/people/andy-lim'
var textString = ''
var $
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
        $ = cheerio.load(res.text)
        let page = $('.layout-focus-page__main')
        // console.log($(page).children().length)
        // console.log($(page[0]).children().first().text())
        reaveseChild(page[0])
        console.log('string', textString)
        fs.writeFile('./AndyLim.txt', textString, {'flag': 'a'}, function(err){
        if(err){
            console.log('写入错误')
        }
        // 写入成功后测试
        // fs.readFile('./demo.txt', 'utf-8', function(err,data){
        //     if(err){
        //         console.log('读取错误',err)
        //     }else{
        //         console.log(data)
        //     }
        // })
      })
    }
  })
});
module.exports = router;
function reaveseChild(parent){
  let childrens = $(parent).children()
  console.log(childrens.length)
  for(let i = 0, j = (childrens).length; i<j; i++){
    console.log(i)
    if($(childrens[i]).children().length) {
       reaveseChild($(childrens[i]))
      // console.log('执行1次')
      // console.log($(parent[i]).text() + '/br')
    } else {
      console.log('不执行递归')
      textString = textString + '' + $(childrens[i]).text()+ '\r\n'
    }
  }
}