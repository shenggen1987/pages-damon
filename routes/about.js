var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title',
    name: '231231',
    pageName: 'about'
  };
  
  await ctx.render('about', {
    title: "Test Page",
    name: "World"
  });
})
module.exports = router;
