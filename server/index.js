const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000

const pathJoin = require('path').join

app.get('/', (req, res) => {
  res.sendFile(pathJoin(__dirname, '../index.html'))
})

io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg)
  })

  socket.on('getArquivo', msg => {
    const fs = require('fs')

    const txt = fs.readFileSync(pathJoin(__dirname, '../', msg), 'utf8')
    io.emit('showArquivo', txt)
  })
})

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`)
})
