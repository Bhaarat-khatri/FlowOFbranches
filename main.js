var express = require('express')
var app = express()
var client = require('redis').createClient()
 
var limiter = require('express-limiter')(app, client)
 
/**
 * you may also pass it an Express 4.0 `Router`
 *
 * router = express.Router()
 * limiter = require('express-limiter')(router, client)
 */
 
limiter({
  path: '/api/action',
  method: 'get',
  lookup: ['connection.remoteAddress'],
  // 150 requests per hour
  total: 250,
  expire: 1000,
  onRateLimited: function (req, res, next) {
    var x = { message: 'Rate limit exceeded', status: 429 };
    next(x.message)
    // res.status(429).send(x.message)
  }
})

app.get('/api/action', function (req, res) {
    res.send(200, 'ok')
  })

app.listen(3000,()=>{
    console.log("server is started");
})