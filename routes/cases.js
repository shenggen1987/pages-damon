var router = require('koa-router')();
var data = require('../lib/data');
router.get('/', async function (ctx, next) {
	var list = data.getData;
  var category = ctx.query.category;
  console.log(ctx.query.category);
	list.forEach(function(item){
		if(item.id < 10){
			item.indexNo = '0' + item.id;
		}else{
			item.indexNo = '' + item.id;
		}
    if(!item.category){
      item.category = 1;
    }
	})
  if(category){
    list = list.filter(function(item){
      return item.category == category;
    });
  }
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
