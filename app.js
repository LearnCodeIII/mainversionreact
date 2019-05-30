var express = require('express')
var app = express()
var apiRouter = require('./src/routes/api')

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-control-Allow-Headers', 'xCors')
  res.header(
    'Access-Control-Allow-Methods',
    'GET,POST,DELETE,PUT,OPTIONS,HEAD,FETCH'
  )
  next()
})
app.use('/api', apiRouter) //須放在('/',)設定的前面!否則POST方法會出錯

app.get('/123', function(req, res) {
  res.send('node啟動成功')
})
// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
// })
app.listen(3001, (req, res) => {
  console.log('node server: 3001 port successed!')
})

module.exports = app
