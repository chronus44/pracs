const Twitter = require('twitter')
const Sentiment = require('sentiment');
const express = require('express')
const twitterIndex = require('./index')

const app = express();

app.use(express.urlencoded({ extended: true }))

const hostname = '127.0.0.1';
const port = 3000;

var title = 'Twitter API';
var tweetText = "";
var queryText = '';
var textin = [];
var score = '';
var data = ``;
var result;

var client = new Twitter({
    consumer_key: 'Fc6yboZajg08igQHZ8AQ17XmW',
    consumer_secret: '1lhiqZAzFJzvDMKcolg7jlqW1bzsINcTvsUajFzKmH0gFc8Yj7',
    access_token_key: '920235132883046400-1Vdn1mN3nTnEK4Vj57uBO09bJIYuyXO',
    access_token_secret: 'DlqJAar97VZnbj3qYvpmURNdro4ppigj1BVZiV8S1ptHG'
  });


// This is the root or main homepage
  app.get('/', (req, res) => {


    res.writeHead(200,{'content-type': 'text/html'});
    res.write(twitterIndex.createPage(title,  queryText));
    res.end();
});

// This is the endpoint for the result after the user give an input as a Query
app.post('/result', (req, res) => {

  queryText = req.body.userQuery
  
  // this is the Twitter api for Standard Search
  client.get('search/tweets', {q: queryText, count: 20}, function(error, tweets, response) {
    tweets.statuses.forEach(function(tweet) {
      tweetText = tweet.text;
      var sentiment = new Sentiment();
      result = sentiment.analyze(tweetText);

      score += result.score

      if (result.score > 0){
        textin.push("<br> <br>The Score from the Analysis of the Words are: " + result.score + "<br>The Words Are: [" + result.words + "]<br><p style='color:green'>Tweet is: " + tweetText + "</p>");
      } if (result.score < 0) {
        textin.push("<br> <br>The Score from the Analysis of the Words are: " + result.score + "<br>The Words Are: [" + result.words + "]<br><p style='color:red'>Tweet is: " + tweetText + "</p>");
      } else {
        textin.push("<br> <br>The Score from the Analysis of the Words are: " + result.score + "<br>The Words Are: [" + result.words + "]<br><p style='color:blue'>Tweet is: " + tweetText + "</p>");
      }

      });
    console.dir(result);
    res.write(twitterIndex.createResultPage(queryText, textin));
    res.end()
  });
});

app.listen(port, function () {
  console.log(`Express app listening at http://${hostname}:${port}/`);
});

