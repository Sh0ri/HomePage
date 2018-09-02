let cheerio = require('cheerio');
let request = require('request');

var results = [];

function test(response)
{
	console.log("HALED");
	console.log(response);
}

function search(url)
{
	return new Promise((resolve, reject) => {
		
		console.log(url);

		request(url, function(error, response, html){
			if(!error){
				var $ = cheerio.load(html);
				
				$('#rso > div:nth-child(5) > div > div:nth-child(1) > div > div').each(function (i, element) {
					console.log(element)
				});
				resolve(results);
			}
			else
			{
				reject("error");
			}
		})
	});
}

module.exports = {
	search : search,
};