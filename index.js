const express = require("express");
const fetch = require('node-fetch');
let show=0;
let list=[];
let app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}));


//========================Routes==========================//

app.post('/table',async (req, res) => {

	let itemsRequested = req.body.itemsRequested;
	if(itemsRequested>0){
		console.log(`Request for ${itemsRequested} items`);
	
		await getData(itemsRequested);
		show=1;
		res.redirect('/');
	} else {
		show=0;
		res.redirect('/');
	}
	
	
});

app.post('/reset', async (req, res) => {
	list = [];
	show=0;
	res.redirect('/');

})




app.get('/', (req, res) => res.render('index.ejs',{list: list, show: show}));

const getData = async (itemsRequested) => {

	let tttdata = await fetch("https://terriblytinytales.com/test.txt");
	let tttdatatext = await tttdata.text();

	/*
	let regex = /[.,?]/g;
	tttdatatext = tttdatatext.replace(regex, '');
	console.log(tttdatatext);
	tttdatatext = tttdatatext.replace(/(\n)|(\r)|(\t)/,' ');
	regex = /( +)/g;

	tttdatatext = tttdatatext.replace(regex,' ');
	console.log(tttdatatext);
	
	let spl = tttdatatext.split(" ");

	*/
	/*
	for (var i =spl.length - 1; i >= 0; i--) {
		console.log(spl[i]);
	}
	

	*/
	spl = tttdatatext.match(/\w+/g);
	
	let wordList = {}

	spl.forEach( (word) => {
		wordList.hasOwnProperty(word) ? wordList[word] += 1 : wordList[word] = 1;
	});


	let sorted = [];
	for (let word in wordList) {
		sorted.push([word, wordList[word]]);
	}

	sorted.sort(function(a, b) {
	    return b[1] - a[1];
	});

	if (itemsRequested > sorted.length)
		itemsRequested = sorted.length;

	
	list = sorted.slice(0, itemsRequested);

	show=1;
	

}

let port = server.listen(process.env.PORT || 3000);
app.listen(port, () => console.log(`Listening on port ${port}`));






