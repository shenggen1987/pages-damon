var router = require('koa-router')();

router.get('/:id', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title',
    name: '231231',
    pageName: 'home',
    id: ctx.params.id,
    partialsName: 'detail_09'
  };
  
  await ctx.render('detail', {
    title: "Test Page",
    name: "World"
  });
});

module.exports = router;
