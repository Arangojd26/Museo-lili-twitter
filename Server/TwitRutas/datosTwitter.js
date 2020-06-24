const {Router} = require('express');
const router = Router();
const conf = require('./config');


router.get("/", (req, res) => {
  
  res.send('Woohoo, our homepage works!');
 
});

router.get("/tweetsTest", (req, res) => {
  var json1 = {}; //variable para almacenar cada registro que se lea, en formato json
	var arreglo=[]; 
  var ts = [];
  const params = {
    q: '#testUAO',
    count: 3
  };
  conf.apiClient.get('search/tweets', params, function(error, tweets, response) {
    if (error) {
      res.send("Error en la ejecución");
      throw error;

    } else {

      tweets.statuses.forEach(function(tweet) {
        console.log("tweet: " + tweet.text);
        ts = [tweets];

      });
      console.log("tamaño: " + ts.length);
      res.send(ts);

    }
  });
});

router.get("/tweets", (req, res) => {
  
  var json1 = {}; 
	var arreglo=[]; 

  const params = {
    q: '#testUAO',
    count: 3
  };
  conf.apiClient.get('search/tweets', params, function(error, tweets, response) {
    if (error) {
      res.send("Error en la ejecución");
      throw error;

    } else { 

      tweets.statuses.forEach(function(tweet) {
        
        json1={"text":tweet.text, "user":tweet.user.name, "screen_name":tweet.user.screen_name};
        console.log(json1);
        arreglo.push(json1); //se añade el json al arreglo
        

      });
      
      res.json(arreglo);//se retorna el arreglo

    }
  });
});

router.post("/postTweets", (req, res) => {

  conf.apiClient.post("statuses/update", {
    status: "I post from codeanywhere!"
  }, function(error, tweet, response) {
    if (error) {
      console.log(error)
    } else {
      console.log(tweet)
    }
  })

});





module.exports = router;

