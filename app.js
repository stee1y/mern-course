
const express = require('express')
const path = require('path')
const config = require('config')
const mongoose = require('mongoose')


const app = express()

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.route'))
app.use('/api/link', require('./routes/link.route'))
app.use('/t/', require('./routes/redirect.route'))

if (process.env.NOE_ENV === 'prouction') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')))
  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = config.get("port") || 5000

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})

    app.listen(PORT, () => console.log(`App start, port: ${PORT}`))

  } catch(e) {
    console.log('Server error', e.message)
    process.exit(1)
  }
}

start()





