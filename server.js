const express = require('express');
const pSettle = require('p-settle');
const scraping = require("./scrape-google.js");

const googleSearchKey = "AIzaSyDzTKw3wwCNfQ3SEW8kZ4pZs1HpsP9pvY4";
const cx = '016399818386954630313:gca6zypmkfg';

const app = express();
const port = 9292;

app.listen(port, () => console.log(`Listening on port ${port}`));


//API TEST
app.get('/api/test', (req, res) => {
	test(req,res);
});

//API SEARCH
app.get('/api/search', (req, res) => {
	search(req,res);
});

async function test(req,res){

	console.log("TEST FUNCTION");
	console.log(req.query);
	res.send({result:"testresult"})
}

async function search(req,res){

    
	console.log("SEARCH FUNCTION");
	console.log(req.query);

	var url = "https://www.google.fr/search?q="+req.query.query+"&ie=UTF-8";

	const result = await scraping.search(url);
	pSettle(result).then(result => {
		console.log(result);
	})
	res.send('michelin done');
}