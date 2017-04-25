var router = require('koa-router')();
var data = require('../lib/data');

router.get('/:id', async function (ctx, next) {
	var arr = data.getData;
	var detail;
	arr.forEach(function(item){
		if(item.id === ~~ctx.params.id){
			detail = item;
			detail.images.splice(0,1);
		}
	});
  ctx.state = {
    title: 'koa2 title',
    name: '231231',
    pageName: 'home',
    id: ctx.params.id,
    partialsName: 'detail_09',
    detail: detail
  };
  
  await ctx.render('detail', {
    title: "Test Page",
    name: "World"
  });
});

module.exports = router;