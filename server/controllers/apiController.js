const apiModel = require('../models/apiModel');

function getNews(req, res) {
	apiModel.getNews(req.body.page)
		.then((news) => {
			res.status(200).send(news);
		}).catch(err => {
			res.status(500).send({message: err});
		})	
} 

function savePocket(req, res) {
	apiModel.savePocket(req.body.url)
		.then((data) => {
			res.status(200).send(data);
		}).catch(err => {
			res.status(500).send({message: err});
		})
}

module.exports = {
	getNews,
	savePocket
}