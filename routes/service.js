var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title',
    name: '231231',
    pageName: 'service'
  };
  
  await ctx.render('service', {
    title: "Test Page",
    name: "World"
  });
})
module.exports = router;
