const express = require('express')
const morgan = require('morgan')
const figlet = require('figlet')
const randomColor = require('randomcolor')

const Port = process.env.PORT ?? 3000
const app = express()

app.use(morgan('tiny'))

app.get('/', (req, res, next) => {
  const text = req.query.text ?? "Hello Kubernetes!"
  const backgroundColor = randomColor({ luminosity: 'dark' })
  const TextColor = randomColor({ luminosity: 'bright' })
  
  figlet.fonts((err, fontsList) => {
    if (err) {
      next(err)
    } else {
      figlet.text(text, {
        font: fontsList[Math.round(fontsList.length * Math.random()) - 1],
      }, (err, result) => {
        if (err) {
          next(err)
        } else {
          res.send(`<pre style="padding:5rem;background-color:${backgroundColor};color:${TextColor};">${result}</pre><p>text=${text}</p>`)
        }
      })
    }
  })
})

app.listen(Port, () => {
  console.log(`our beautiful app is listening on port ${Port}`)
})