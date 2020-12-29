const express = require('express')
const app = express()

app.get('/api/info', (req, res) => {
  res.json({
    name: 'xiaohong',
    age: 5,
  })
})

app.listen(9092, () => {
  console.log('服务启动')
})
