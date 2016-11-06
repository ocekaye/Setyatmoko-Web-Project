var express = require('express');
var router = express.Router();
var ApiContent = require('../API/content');
var ApiCategory = require('../API/category');

/* GET home page. */
router.get('/', function(req, res, next) {
	var page = req.query.page;
	var count = 0;
	var take = 5;
	var viewPage = 10;
	var totalPage;
	var startPage, endPage;
	var pagination = {};
	function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
	if(!page) {
		page = 0;
		console.log("not page");
	}
	else if (!isNumber(page)) {
		page = 0;
		console.log("page not number");
	} else{
		page --;
	}
	console.log("page: "+page);
	var datas = {};

	function callback(error, response, body) {
  		if (!error && response.statusCode == 200) {
  			var d = JSON.parse(body);
  			datas.new = d.data;
			count = d.count;
			page++;
			// count = 200;
			// page = 7;
			totalPage = Math.ceil(count / take);

			console.log("total page: "+totalPage);
			var paginationData = [];
			if (totalPage <= viewPage){
				startPage = 1;
				endPage = totalPage;
			}else{
				if(page <= (viewPage/2)){
					startPage = 1;
					endPage = viewPage;
				} else if((page) > (totalPage-(viewPage/2))){
					startPage = totalPage - viewPage + 1;
					endPage = totalPage;
				} else{
					startPage = page - (viewPage/2);
					endPage = page + (viewPage/2) - 1;
				}
			}
			paginationData.push({url:BaseUrl+'?page='+(page-1), text:'prev'});
			for (var i = startPage; i <= endPage; i++){
				var url = "#";
				if(i == page){
					url="#"
				}
				else {
					url = BaseUrl+'?page='+i;
				}
				paginationData.push({url:url, text:i});
			}
			paginationData.push({url:BaseUrl+'?page='+(page+1), text:'next'});
			pagination.data = paginationData;
			pagination.page = page;
			datas.pagination = pagination;
			ApiCategory.getCategory(BaseApiUrl, callbackCtg);
		 } else {
		 	res.render('error', {message:'Not Found!'});
		}
	}

	function callbackCtg(error, response, body) {
		if (!error && response.statusCode == 200) {
			datas.categorys = JSON.parse(body);
			res.render('index', {title: 'Setyatmoko', res: datas, url: BaseUrl+'content/', baseUrl: BaseUrl});
		} else {
			res.render('error', {message:'Not Found!'});
		}
	}
	ApiContent.showContent(BaseApiUrl, page*take, take, callback);
  	
});

module.exports = router;
