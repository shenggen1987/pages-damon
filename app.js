const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const co = require('co');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const index = require('./routes/index');
const about = require('./routes/about');
const service = require('./routes/service');
const contact = require('./routes/contact');
const detail = require('./routes/detail');

const users = require('./routes/users');

// middlewares
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));
app.use(require('koa-static')(__dirname + '/public'));

const hbs = require('koa-hbs');
app.use(hbs.middleware({
  viewPath: __dirname + '/views',
  partialsPath: __dirname + '/views/partials',
  defaultLayout: 'main',
  extname: '.html',
  disableCache: process.env.NODE_ENV === 'development'
}));
hbs.registerHelper('link', function(text, url) {
  text = hbs.Utils.escapeExpression(text);
  url  = hbs.Utils.escapeExpression(url);

  var result = '<a href="' + url + '">' + text + '</a>';

  return new hbs.SafeString(result);
});
hbs.registerHelper('compare', function(left, operator, right, options) {
   if (arguments.length < 3) {
     throw new Error('Handlerbars Helper "compare" needs 2 parameters');
   }
   var operators = {
     '==':     function(l, r) {return l == r; },
     '===':    function(l, r) {return l === r; },
     '!=':     function(l, r) {return l != r; },
     '!==':    function(l, r) {return l !== r; },
     '<':      function(l, r) {return l < r; },
     '>':      function(l, r) {return l > r; },
     '<=':     function(l, r) {return l <= r; },
     '>=':     function(l, r) {return l >= r; },
     'typeof': function(l, r) {return typeof l == r; }
   };

   if (!operators[operator]) {
     throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
   }

   var result = operators[operator](left, right);

   if (result) {
     return options.fn(this);
   } else {
     return options.inverse(this);
   }
});
// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/about', about.routes(), index.allowedMethods());
router.use('/service', service.routes(), index.allowedMethods());
router.use('/contact', contact.routes(), index.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/detail', detail.routes(), detail.allowedMethods());
app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx);
});


module.exports = app;