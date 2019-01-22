const Crypto = require('crypto');
const conn = require('../database')
var transporter = require('../helpers/pengirimemail')

module.exports = {
    register: (req, res) => {
        var { username, password, email, phone } = req.body;
        var sql = `select username from user where username='${username}'`;
        conn.query(sql, (err, result) => {
            // if (err) throw err;
            // bisa juga kaya gini
            if (err) {
                res.send({ status: "error", message: "System error!" })
                res.end();
                // untuk mengakhiri respon
            }
            // res.send(result)
            if (result.length > 0) {
                res.send({ status: 'error', message: "Username has been taken!"})
            } else {
                var hashPassword = Crypto.createHmac('sha256', 'abc123')
                .update(password).digest('hex');
                var dataUser = {
                    username,
                    password: hashPassword,
                    email,
                    phone,
                    role: 'user',
                    status: 'unverified',
                    lastlogin: new Date()
                }
                sql = `insert into user `
                conn.query(sql, dataUser, (err1, result1) => {
                    if (err1) {
                        res.send({ status: "error", message: "System error!" })
                        res.end();
                    }
                    var mailOptions = {
                        from: "Penguasa Popok Semesta <budiyahed@gmail.com",
                        to: email,
                        subject: "Verivikasi email untuk menjadi kandidat penguasa popok semesta",
                        html: `Click link ini untuk verifikasi : ${linkverifikasi}`
                    }
                    transporter.sendMail(mailOptions, (err, res1) => {
                        if (err) {
                            console.log(err)
                            res.send({ status : 'error' })
                        } else {
                            // console.log('success')
                            console.log(res1)
                            res.send({ status: "success" })
                        }
                    })

                })
            }
        })
    },
    login: (req, res) => {

    }
}