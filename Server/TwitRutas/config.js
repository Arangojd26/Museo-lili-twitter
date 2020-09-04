const Twitter = require('twit');

//const port = proccess.env.PORT || 3000;
var apiClient = new Twitter({
  consumer_key:         'u2i9Oc0exK6jKh3ufXxLp8QiA',
  consumer_secret:      'hwthHpieyNLGAs5nAsyFIdM8S3Atm331DEaVPsaMUTZkwEcPYa',
  access_token:         '1125751817227440128-ISkIZ6dHIdhnjPcLiTxSiADPfAw4Dl',
  access_token_secret:  '4yDW3Qe2LGja3szocuCgVlgothTCv2PbSgqcTTX8FFg9Q',
});



module.exports = {
  apiClient
}