var router = require('koa-router')();
var data = require('../lib/data');
router.get('/', async function (ctx, next) {
	var list = data.getData;
	list.forEach(function(item){
		if(item.id < 10){
			item.indexNo = '0' + item.id;
		}else{
			item.indexNo = '' + item.id;
		}
	})
  ctx.state = {
    title: 'koa2 title',
    name: '231231',
    pageName: 'cases',
    list: list
  };

  await ctx.render('cases', {
    title: "Test Page",
    name: "World"
  });
})
module.exports = router;
