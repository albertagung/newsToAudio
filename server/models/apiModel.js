const axios = require('axios');
const newApiEndpoint = 'http://www.sfexaminer.com/wp-json/wp/v2/posts';
const pocketApiEndpoint = 'https://getpocket.com/v3/add';

class ThirdPartyApi {
	static getNews(page) {
		return new Promise((resolve, reject) => {
			axios.get(`${newApiEndpoint}?_embed&page=${page}`)
			.then(({ data })=> {
				console.log(data);
				resolve(data);
			})
			.catch((err)=> {
				reject(err.message);
			})
		});
	}

	static savePocket(articleUrl) {
		return new Promise((resolve, reject) => {

			axios.post(pocketApiEndpoint,{
				url: articleUrl,
				consumer_key: process.env.POCKET_CONSUMER_KEY,
				access_token: process.env.POCKET_ACCESS_TOKEN
			})
			.then(({ data })=> {
				resolve(data);
			})
			.catch((err)=> {
				reject(err.message);
			})
		});
	}
}

module.exports = ThirdPartyApi;