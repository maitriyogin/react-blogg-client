// this is run by heroku and serves the built artifacts in the dist directory
var express = require('express');
var path = require('path');
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;
var publicPath = path.resolve(__dirname, 'dist');

app.use(express.static(publicPath));

// And run the server
app.listen(port, function () {
  console.log('Server running on port ' + port);
});




