var request = require('request'),
cheerio = require('cheerio');

var options = {
  url: 'http://espn.go.com/nba/'
};

var obj = {},
    tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'p', 'li'];

function getElements(el, $) {
  var arr = [];
  $(el).each(function(i, el) {
    if (this.length > 0) {
      arr.push($(this).text());
    }
  });
  return arr;
}

exports.index = function(req, res){

  function callback(error, response, body) {

    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(body);

      for (var i = 0, len = tags.length; i < len; i++) {
        obj[tags[i]] = getElements(tags[i], $);
      }

      res.send(obj);
    }
  }

  request(options, callback);

};