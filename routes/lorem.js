var url     = require('url'),
    request = require('request'),
    cheerio = require('cheerio');

var host = 'http://espn.go.com/nba/';

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

  var url_parts = url.parse(req.url, true);
  var query = url_parts.query.query;

  if (query && query.length > 0) {
    host = query;
  }

  function callback(error, response, body) {

    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(body);

      for (var i = 0, len = tags.length; i < len; i++) {
        obj[tags[i]] = getElements(tags[i], $);
      }

      res.send(obj);
    }
  }

  request(host, callback);

};