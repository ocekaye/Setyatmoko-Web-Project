var express = require('express');
var router = express.Router();
var ApiContent = require('../API/content');
var ApiCategory = require('../API/category');
router.get('/', function(req, res, next) {
   res.redirect(BaseUrl);
});

router.get('/:uri', function(req, res, next) {

	var info;
	function callback(error, response, body) {
  		if (!error && response.statusCode == 200) {
		    info = JSON.parse(body);
		    var idsCtg = [];
		    for (var i = 0; i < info.categorys.length; i++) {
		    	idsCtg.push(info.categorys[i].id);
		    }
			ApiCategory.findContentByCategory(BaseApiUrl, idsCtg, callbackCategory);
		 } else{
		 	res.render('error',{message: 'Not Found'});
		 }
	};

	function callbackCategory(error, response, body){
		if (!error && response.statusCode == 200) {
			var ctg = JSON.parse(body);
			console.log(ctg);
			 res.render('content', {title: 'Setyatmoko', res: info, categorys: ctg, url: BaseUrl+'content/', baseUrl: BaseUrl});
		} else{
			var ctg = [];
			res.render('content', {title: 'Setyatmoko', res: info, categorys: ctg, url: BaseUrl+'content/', baseUrl: BaseUrl});
		}
	};
	ApiContent.getContentByUri(BaseApiUrl, req.params.uri,  callback);
 
});

module.exports = router;