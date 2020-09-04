const {Router} = require('express');
const fs = require('fs');
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

  console.log(req.body)

  
  
  conf.apiClient.post("statuses/update", {
    status: req.body.mensaje
  }, function(error, tweet, response) {
    if (error) {
      console.log(error)
    } else {
      console.log('post completo')
    }
  })

});

router.post("/postTweetsMedia", (req, res) => {

  console.log(req.body.foto)

  // var b64content = fs.readFileSync('Server/TwitRutas/acuarela.jpg', { encoding: 'base64' })
  // console.log('ACUARELAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
  // console.log(b64content)
  
  conf.apiClient.post('media/upload', { media_data: req.body.foto }, function (err, data, response) {
    // now we can assign alt text to the media, for use by screen readers and
    // other text-based presentations and interpreters
    var mediaIdStr = data.media_id_string
    var altText = "Small flowers in a planter on a sunny balcony, blossoming."
    var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }
  
    conf.apiClient.post('media/metadata/create', meta_params, function (err, data, response) {
      if (!err) {
        // now we can reference the media and post a tweet (media will attach to the tweet)
        var params = { status: req.body.mensajeImagen, media_ids: [mediaIdStr] }
  
        conf.apiClient.post('statuses/update', params, function (err, data, response) {
          console.log('post con imagen completo')
          // console.log(req.body.mensaje)
        })
      }
    })
  })

});





module.exports = router;

