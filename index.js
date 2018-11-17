const express = require('express')
const app = express()


const words = require('./data/words');
console.log('Number of words: ' + words.length);

app.get('/', (req, res) => {
	console.log('Call to /');
	res.send('Hello World!')
});

app.get('/api/hello', (req, res) => {
	console.log('Call to /api/hello');
	res.send({
		payload: '123'
	});
});

app.get('/api/words', (req, res) => {
	console.log('Call to /api/words');
	res.send({ payload: words });
});

app.get('/api/words/test/a', (req, res) => {
	console.log('Call to /api/words/a');
	const filteredWords = words.filter(word => word.word[0] === 'a');
	console.log(filteredWords);
	console.log('Returned ' + filteredWords.length + ' words');
	res.send({ payload: filteredWords });
});

app.get('/api/words/test/b', (req, res) => {
	console.log('Call to /api/words/a');
	const filteredWords = words.filter(word => word.word[0] === 'b');
	console.log(filteredWords)
	console.log('Returned ' + filteredWords.length + ' words');
	res.send({ payload: filteredWords });
});

app.get('/api/words/lookup/:char', function(req, res) {
	console.log('Call to /api/words/lookup/:char');
	console.log(req.params);
	const filteredWords = words.filter(word => word.word[0] === req.params.char[0]);
	console.log(filteredWords)
	console.log('Returned ' + filteredWords.length + ' words');
	res.send({ payload: filteredWords });
});

app.get('/api/words/lookup/string/:chars', function(req, res) {
	console.log('Call to /api/words/lookup/string/:chars');
	console.log(req.params);
	const filteredWords = words.filter(word => word.word.startsWith(req.params.chars));
	console.log(filteredWords)
	console.log('Returned ' + filteredWords.length + ' words');
	res.send({ payload: filteredWords });
});


app.listen(5000, () => console.log('Example app listening on port 5000!'))
