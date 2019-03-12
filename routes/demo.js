var express = require('express');
var router = express.Router();
var superagent = require('superagent')

const fs =  require('fs')

/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.writeFile('./demo.txt', "hello\r\nWorld", {'flag': 'a'}, function(err){
        if(err){
            console.log('写入错误')
        }
        // 写入成功后测试
        fs.readFile('./demo.txt', 'utf-8', function(err,data){
            if(err){
                console.log('读取错误',err)
            }else{
                console.log(data)
            }
        })
    })
});
module.exports = router;