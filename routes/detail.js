var router = require('koa-router')();
var data = require('../lib/data');

router.get('/:id', async function (ctx, next) {
	var arr = data.getData;
	var detail;
	arr.forEach(function(item){
		if(item.id === ~~ctx.params.id){
			detail = item;
		  var relatedItem = {};
		  detail.relatedList = [];
			detail.related.forEach(function(dd, index){
				var aa = getItem(arr, dd);
				relatedItem = {
					first: index % 3 === 0 ? 1 : 0 ,
					last: (index + 1) % 3 === 0 ? 1 : 0,
					title: aa.title,
					service: aa.service,
					id: aa.id
				}
				detail.relatedList.push(relatedItem);
			})
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

function getItem(items, id){
	var item;
	items.forEach(function(tmp){
		if(tmp.id === id){
			item = tmp;
		}
	});
	return item;
}