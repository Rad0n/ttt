const express = require("express");
const fetch = require('node-fetch');
let show=0;		//used to hide/show table header
let list=[];	//will contain the array of (words, frequencies)
let app = express();

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}));


//========================Routes==========================//

app.post('/table',async (req, res) => {

	//called when Submit button is pressed. Checks for valid input.

	let itemsRequested = req.body.itemsRequested;
	if(itemsRequested>0){
		console.log(`Request for ${itemsRequested} items`);
	
		await getData(itemsRequested);
		show=1;
		res.redirect('/');
	} else {
		show=0;
		list=[];
		res.redirect('/');
	}
	
	
});

app.post('/reset', async (req, res) => {

	//called wehn Reset is pressed. Clears 'list'

	list = [];
	show=0;
	res.redirect('/');

})


const getData = async (itemsRequested) => {

	//function to get data and make a list of words in ascending order

	//fetch data from the link
	let tttdata = await fetch("https://terriblytinytales.com/test.txt");
	//convert it to text
	let tttdatatext = await tttdata.text();


	//matches words
	let matchedWords = tttdatatext.match(/\w+/g);
	
	let wordList = {}

	matchedWords.forEach( (word) => {
		wordList.hasOwnProperty(word) ? wordList[word] += 1 : wordList[word] = 1;
	});


	//making array from the object wordList and sorting
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


app.get('/', (req, res) => res.render('index.ejs',{list: list, show: show}));

let port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));






