const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const Crypto = require('crypto');
var app = express();
var port = process.env.PORT || 1997
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('<h1>Welcome to my API</h1>')
})

app.get('/testencrypt', (req, res) => {
    // 'sha256'
    // 64 karakter
    // '123abc' kunci kata yang akan dicrypto
    var hashPassword = Crypto.createHmac('md5', 'abc123')
    // 32 karakter
        .update(req.query.password).digest('hex');
    console.log(hashPassword);
    res.send(`Password anda di encrypt menjadi ${hashPassword}`)
})

const {
    authRouter 
} = require('./routers')

app.use('/auth', authRouter)

app.listen(port, () => console.log('API jalan di port ' + port))