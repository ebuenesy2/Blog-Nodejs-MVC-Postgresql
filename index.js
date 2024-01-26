/**
* Kodlayan: Ebu Enes Yıldırım
* Gmail: ebuenesy2@gmail.com
* Tarih: xx
* Tel: xxx
*/

const express = require("express"); //! Express
const app = express(); //Express
const cors = require("cors"); //! Localda çalıştırmak için
const dotenv = require("dotenv").config(); //! Env

app.use(express.json()); //! Post bilgilerini almak için.
app.use(cors()); //! Localda çalışması için kullan
app.use('/', require('./routes/index')); //! Sayfa Yönlendirme İşlemi Yapıyor

//! Hata
app.use(function(req, res, next) { res.send({ title:"404" }); }); //! 404 - Sayfa Bulunamadı

//************************************* Server  **************************************************** */
//! Port Dinleniyor
const PORT = process.env.PORT || 3002;
app.listen(PORT, function (err, address) {
  if (err) { console.log('\u001b[' + 32 + 'm' + 'Bağlantı hatası: ' + err + '\u001b[0m') }
  else { console.log('\u001b[' + 32 + 'm' + 'Bağlantı sağlandı : ' + PORT + '\u001b[0m') }
})