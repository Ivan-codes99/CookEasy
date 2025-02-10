var https = require('follow-redirects').https;
var fs = require('fs');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;// this isn't working for some reason

console.log(`API key: ${OPENAI_API_KEY}`);
const options = {
    method: 'POST',
    host: 'api.openai.com',
    path: '/v1/chat/completions',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}` //
    },
    maxRedirects: 20
  };

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData = JSON.stringify({
  "model": "gpt-4o-mini",
  "messages": [
    {
      "role": "user",
      "content": "Say this is a test!"
    }
  ],
  "temperature": 0.7
});

req.write(postData);

req.end();