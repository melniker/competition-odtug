const
  express = require('express'),
  proxy = require('http-proxy-middleware');

var app = express();

app.get('/', function(req, res, next){
  res.redirect('/pls/apex/f?p=16557:1');
});

app.use(['/i', '/pls'], proxy(
  {
    target: 'https://apex.oracle.com',
    changeOrigin: true,
    onProxyReq: function(proxyReq, req, res) {
      if(req.connection.encrypted && req.headers.origin) {
        proxyReq.setHeader('origin', req.headers.origin.replace(/^https:/,'http:'));
      }
    }
  }
));

app.listen(process.env.PORT || 3000);
