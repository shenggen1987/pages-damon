var router = require('koa-router')();
var data = require('../lib/data');

router.get('/:id', async function (ctx, next) {
	var arr = data.getData;
	var detail;
	arr.forEach(function(item){
		if(item.id === ~~ctx.params.id){
			detail = item;
		  var relatedItem = {};
		  var num = getArrStr.getConfig(9, 30);
		  var numList = [];
		  if(num){
		  	numList = num.split(',');
		  }
		  if(numList.length === 9){
		  	detail.related = getArrStr.getConfig(9, 30).split(',');
		  }
		  detail.relatedList = [];
			detail.related.forEach(function(dd, index){
				var aa = getItem(arr, dd);
				relatedItem = {
					first: index % 3 === 0 ? 1 : 0 ,
					last: (index + 1) % 3 === 0 ? 1 : 0,
					title: aa.title || '',
					service: aa.service || '',
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
		if(tmp.id == id){
			item = tmp;
		}
	});
	return item;
}

var getArrStr = {

        dataArr: [],

        getConfig: function (dataNum, maxNum) {

            getArrStr.dataArr = [];

            if (dataNum > maxNum || dataNum <= 0) {

                return "输入的数据有误！";

            } else {

                getArrStr.setConfig(dataNum, maxNum);

                return getArrStr.dataArr.toString();

            }

        },

        setConfig: function (dataNum, maxNum) { //生成数组单个数据

            var data = parseInt(Math.random() * maxNum);
            if(data === 0){
            	data = 1;
            }

            if (getArrStr.dataArr.length < 0) {

                getArrStr.dataArr.push(data);

                getArrStr.setConfig(dataNum, maxNum);

            } else {

                if (getArrStr.dataArr.length >= dataNum) {

                    return false;

                } else {

                    var hasThis = getArrStr.checkConfig(data, getArrStr.dataArr);

                    if (hasThis != "-1") {

                        getArrStr.setConfig(dataNum, maxNum);

                    } else {

                        getArrStr.dataArr.push(data);

                        getArrStr.setConfig(dataNum, maxNum);

                    }

                }

            }

        },

        checkConfig: function (needle, arr) {//检查生成的数据是否重复,重复返回下标，不重复返回-1；

            var type = typeof needle;

            if (type == 'string' || type == 'number') {

                for (var i in arr) {

                    if (arr[i] == needle) {

                        return i;

                    }

                }

            }

            return "-1";

        }

    };

  
