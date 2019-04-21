var express = require('express');
var router = express.Router();
var superagent = require('superagent')

const fs = require('fs')
const path = require('path')
const filePath = path.resolve('./../firstdemo/焦点')
let content = ''
/* GET users listing. */
router.get('/', function (req, res, next) {
    fileDisplay(filePath)
    // fs.writeFile('./demo.txt', "hello\r\nWorld", {'flag': 'a'}, function(err){
    //     if(err){
    //         console.log('写入错误')
    //     }
    //     // 写入成功后测试
    //     fs.readFile('./demo.txt', 'utf-8', function(err,data){
    //         if(err){
    //             console.log('读取错误',err)
    //         }else{
    //             console.log(data)
    //         }
    //     })
    // })

});
function fileDisplay(filePath) {
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.log(err)
        } else {
            files.forEach(filename => {
                let filedir = path.join(filePath, filename)
                fs.stat(filedir, function (err, stats) {
                    if (err) {
                        console.log('读取失败')
                    } else {
                        content = content + fs.readFileSync(filedir, 'utf-8')
                    }
                })
            })
            console.log('还没写进去？', content)
            setTimeout(()=> {
                fs.writeFile('./demo1.txt', content, { 'flag': 'a' }, function (err) {
                    if (err) {
                        console.log('写入错误')
                    }else{
                        console.log('写入成功')
                    }
                    // 写入成功后测试
                    // fs.readFile('./demo.txt', 'utf-8', function (err, data) {
                    //     if (err) {
                    //         console.log('读取错误', err)
                    //     } else {
                    //         console.log(data)
                    //     }
                    // })
                })
        
            },10000)
            // 最后将content 写入
          
        }
    })
}
module.exports = router;