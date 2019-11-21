const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var engine = require("./math.js")

const app = express()

app.use(express.static(path.join(__dirname, 'public'))).set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => {
        res.sendFile("form.html", {
            root: __dirname + "/public"
        })
})
app.get('/result', engine.getParams)
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))