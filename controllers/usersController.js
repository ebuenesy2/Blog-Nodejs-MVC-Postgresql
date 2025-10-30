
const dbModel = require('../model/db'); //! Model
const table = "auth"; //! Tablo Adı
var md5 = require('md5'); //! Md5
var jwt = require('jsonwebtoken'); //! Token

//! Tüm Veriler
exports.DataAll = async(req,res) => {

    try {
        
        const check = await dbModel.checkConnection();
        console.log('check:',check);
        
        const result = await dbModel.getAllDB("two-factor-manager", {}, { rowcount: 10, page: 1 });
        console.log("result:",result);

        return res.send({
            data:result?.data
        });

        

        //! Bilgiler
        var info= { page:1, rowcount: 10, orderBy:table+"."+"id", order:"desc" }; //! Bilgiler
        //var info= { page:1, rowcount: 10, orderBy:"survey_options"+"."+"id", order:"desc" }; //! Bilgiler

        //! Veri Tabanı
        const db = await dbModel.getAllDB(table,req.query,info); //! Model       

        //! Return
        res.status(200).send({
            title: "Tüm Veriler",
            table: table,
            status: db?.status == "success" ? 1 : 0,
            msg: db?.status == "success" ? 'Tüm Veriler Listelendi' : "Hata oluştu: "+db?.msg ,
            size:db?.size,
            DB:db
        });

        //! Console
        console.log('\u001b[' + 32 + 'm' +"[" + table +'] Tüm Veriler Listelendi' + '\u001b[0m');
        
    } catch (error) {

        //! Return
        res.send({
            title: "Tüm Veriler",
            table: table,
            status: 0,
            msg: 'Hata:'+error,
            size:0,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Tüm Veriler Bulunamadı Hatası:'+ error + '\u001b[0m');
        
    }

} //! Tüm Veriler Son

//! Veri Arama
exports.DataFindById = async(req,res) => {

    try {
        
        //! Tanım
        const search = Number(req.params.id); //! Aranan Veri
        const db = await dbModel.findById(table,search); //! Model
      
        //! Return
        res.status(200).send({
            title: "Veri Arama",
            table: table,
            status: db.result?.status == "success" ? 1 : 0,
            msg: db.result?.status == "success" ? 'Veri Bulundu' : "Hata oluştu: "+db.result?.msg ,
            DB:db.result?.rows.length > 0 ? db.result?.rows[0] : {} 
        });

        //! Console
        console.log('\u001b[' + 32 + 'm' +"[" + table +'] Veri Bulundu' + '\u001b[0m');
        
    } catch (error) {

        //! Return
        res.send({
            title: "Veri Arama",
            table: table,
            status: 0,
            msg: 'Hata:'+error,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Veri Bulunamadı Hatası:'+ error + '\u001b[0m');
        
    }

} //! Veri Arama Son

//! Veri Ekleme
exports.DataAdd = async(req,res) => {

    try {

        //! Tanım
        const postAll = req.body; //! Gelen Veriler
        var result ="";   //! Sonuç

        //! Arama
        const search = { email:  req.body.email }
        const dbFind = await dbModel.findByOther(table,search); //! Arama

        //! Veri Ekleme
        if(dbFind.result?.status == "success") { var result = { status :"error", rows: null, msg: "Email Kayıtlıdır", } }
        else {
            if(postAll?.password == postAll?.repassword) {  
                delete postAll?.repassword; postAll["password"] = md5(postAll?.password); var result = await dbModel.createDB(table,postAll);
            } 
            else { var result = { status :"error", rows: null, msg: "Şifreler Farklıdır", } }
        }

        //! Return
        res.status(200).send({
            title: "Veri Ekleme",
            table: table,
            status: result?.status == "success" ? 1 : 0,
            msg: result?.status == "success" ? 'Veri Ekleme Başarılı' : "Hata oluştu: "+result?.msg ,
            DB:result
        });

        //! Console
        console.log('\u001b[' + 32 + 'm' +"[" + table +'] Veri Ekleme Başarılı' + '\u001b[0m');
        
    } catch (error) {

        //! Return
        res.send({
            title: "Veri Ekleme",
            table: table,
            status: 0,
            msg: 'Hata:'+error,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Veri Ekleme Hatası:'+ error + '\u001b[0m');
        
    }

} //! Veri Ekleme Son

//! Veri Güncelleme
exports.DataEdit = async(req,res) => {

    try {
        
        //! Tanım
        const postAll = req.body; //! Gelen Veriler
        const result =  await dbModel.editDB(table,postAll); //! Model

        //! Return
        res.status(200).send({
            title: "Veri Güncelleme",
            table: table,
            status: result?.status == "success" ? 1 : 0,
            msg: result?.status == "success" ? 'Veri Güncelleme Başarılı' : "Hata Oluştu: "+result?.msg ,
            DB:result
        });

        //! Console
        console.log('\u001b[' + 32 + 'm' +"[" + table +'] Veri Güncelleme Başarılı' + '\u001b[0m');
        
    } catch (error) {

        //! Return
        res.send({
            title: "Veri Güncelleme",
            table: table,
            status: 0,
            msg: 'Hata:'+error,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Veri Güncelleme Hatası:'+ error + '\u001b[0m');
        
    }

} //! Veri Güncelleme Son

//! Veri Silme
exports.DataDelete = async(req,res) => {

    try { 

        //! Tanım
        const search = req.params.id; //! Aranan Veri
        const db = await dbModel.deleteDB(table,search); //! Model
        const dbFindBlogs = await dbModel.findByOther("blogs",{ "created_byid" : Number(search) }); //! Blog Verileri Çekiyor
        await dbModel.deleteDBbyOther("blogs",{ "created_byid" : Number(search) }); //! Blog Verileri Siliyor
        
        for (let index = 0; index < dbFindBlogs?.result?.rows.length; index++) {
            const findId = dbFindBlogs?.result?.rows[index]?.id;            
            await dbModel.deleteDBbyOther("comments",{ "blog_id" : findId }); //! Blog verisine ait olan yorumları siliyor            
        }

        //! Return
        res.status(200).send({
            title: "Veri Silme",
            table: table,
            status: db?.result.status == "success" ? 1 : 0,
            msg: db?.result.status == "success" ? 'Veri Silme Başarılı' :  db?.result.msg,
            DB:db
        });

        //! Console
        console.log('\u001b[' + 32 + 'm' +"[" + table +'] Veri Silme Başarılı' + '\u001b[0m');
        
    } catch (error) {

        //! Return
        res.send({
            title: "Veri Silme",
            table: table,
            status: 0,
            msg: 'Hata:'+error,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Veri Silme Hatası:'+ error + '\u001b[0m');
        
    }

} //! Veri Silme Son

//! Login
exports.DataLogin = async(req,res) => {

    try {

        //! Tanım
        const postAll = req.body; //! Gelen Veriler
        const secret = process.env.TokenSecret; //! Secret
        var token = ""; //! Token

        //! Arama
        const search = { email:  req.body.email, password: md5(postAll?.password) }
        const dbFind = await dbModel.findByOther(table,search); //! Arama

        //! Veri Kontrol
        if(dbFind.result?.status == "success") { 
            const data = { id:dbFind?.result?.rows[0]?.id, email:dbFind?.result?.rows[0]?.email };
            var token = jwt.sign(data, secret,{ expiresIn: '1h' }); //! Token Oluşturma
        }
        else { var token = ""; }


        //! Return
        res.status(200).send({
            title: "Login",
            table: table,
            status: dbFind?.result?.status == "success" ? 1 : 0,
            msg: dbFind?.result?.status == "success" ? 'Veri Bulundu' : "Hata: "+dbFind?.result.msg,
            token:token,
            DB: dbFind?.result?.status == "success" ? dbFind?.result?.rows[0] : {}
        });

        //! Console
        console.log('\u001b[' + 32 + 'm' +"[" + table +'] Login Oldu' + '\u001b[0m');
        
    } catch (error) {

        //! Return
        res.send({
            title: "Login",
            table: table,
            status: 0,
            msg: 'Hata:'+error,
            token:null,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Login Hatası:'+ error + '\u001b[0m');
        
    }
} //! Login Son