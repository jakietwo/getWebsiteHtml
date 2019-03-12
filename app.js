var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var superagent = require('superagent')
var charset = require('superagent-charset')
charset(superagent)
var baseurl = 'https://www.csis.org'
var firstUrl = 'https://www.csis.org/search?search_api_views_fulltext=china&sort_by=search_api_relevance'
const cheerio = require('cheerio')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var demoRouter = require('./routes/demo')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/demo', demoRouter)
app.get('/index', function (req, res) {
  // 设置请求头
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  superagent.get(firstUrl).end((err, res) => {
    console.log('没错')
    if(err){
      console.log('抓取网站信息错误')
    }else{
      let $ = cheerio.load(res.text)
      let urlArr = $('.view--search-results ').find('.teaser')
      // .find('.teaser__title ').children('a').attr('href')
      // $(urlArr[2]).find('.teaser__title ').children('a').attr('href')
      for(let i =0,j = urlArr.length; i<j;i++){
        let url = $(urlArr[i]).find('.teaser__title ').children('a').attr('href')
        // 拼接url
        let newurl = baseurl + '' + url
        // 对每一个文章页面链接进行访问 保存文章数据
        console.log(newurl + ' ')
        superagent.get(newurl).end((err1,res1)=>{
          console.log('第二级')
          if(err1){
            console.log('第二级报错了')
          } else {
            let $$ = cheerio.load(res1)
            // todo 解析完数据 处理数据
            let articleWrapper = $('.layout-detail-page__main').children('article') 
            console.log('第一个article', articleWrapper)
          }
        })
      }
   
    }

  })

})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
