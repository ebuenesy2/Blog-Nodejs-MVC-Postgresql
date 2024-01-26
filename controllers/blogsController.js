
const dbModel = require('../model/db'); //! Model
const table = "blogs"; //! Tablo Adı
var jwt = require('jsonwebtoken'); //! Token

//! Tüm Veriler
exports.DataAll = async(req,res) => {

    try {
        
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
        const dbFindComment = await dbModel.findByOther("comments",{"blog_id":search}); //! Model

        //! Return
        res.status(200).send({
            title: "Veri Arama",
            table: table,
            status: db.result?.status == "success" ? 1 : 0,
            msg: db.result?.status == "success" ? 'Veri Bulundu' : "Hata oluştu: "+db.result?.msg ,
            DB:db.result?.rows.length > 0 ? db.result?.rows[0] : {},
            commentsSize: dbFindComment?.result?.size,
            comments: dbFindComment?.result?.rows
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
            DB: {},
            commentsSize:0,
            comments: []
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Veri Bulunamadı Hatası:'+ error + '\u001b[0m');
        
    }

} //! Veri Arama Son

//! Veri Arama - Kullanıcı
exports.DataPostFindByUser = async(req,res) => {

    try {
        
        //! Tanım
        const search = Number(req.params.id);
        const db = await dbModel.filterByUser(table,search); //! Model

        //! Return
        res.status(200).send({
            title: "Veri Arama",
            table: table,
            status: db.result?.status == "success" ? 1 : 0,
            msg: db.result?.status == "success" ? 'Veri Bulundu' : "Hata oluştu: "+db.result?.msg ,
            size:db?.result?.size,
            DB:db.result?.rows.length > 0 ? db.result?.rows : [],
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
            size: 0,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Veri Bulunamadı Hatası:'+ error + '\u001b[0m');
        
    }

} //! Veri Arama - Kullanıcı Son

//! Veri Arama - Kategori
exports.DataPostFindByCategory = async(req,res) => {

    try {

        //! Arama
        const search = { category:  req.body?.category }
        const db = await dbModel.findByOther(table,search); //! Arama


        //! Return
        res.status(200).send({
            title: "Veri Arama",
            table: table,
            status: db.result?.status == "success" ? 1 : 0,
            msg: db.result?.status == "success" ? 'Veri Bulundu' : "Hata oluştu: "+db.result?.msg ,
            size:db?.result?.size,
            DB:db.result?.rows.length > 0 ? db.result?.rows : [],
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
            size: 0,
            DB:[]
        });

        //! Console
        console.log('\u001b[' + 31 + 'm' +"[" + table +'] Veri Bulunamadı Hatası:'+ error + '\u001b[0m');
        
    }

} //! Veri Arama - Kategori Son

//! Veri Ekleme
exports.DataAdd = async(req,res) => {

    try {
        
        //! Tanım
        const postAll = req.body; //! Gelen Veriler
        const result = await dbModel.createDB(table,postAll); //! Model

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

//! Veri Ekleme - Token
exports.DataAddToken = async(req,res) => {

    try {
        
        //! Tanım
        const postAll = req.body; //! Gelen Veriler
        const token = postAll["token"]; //! Token
        var decoded = jwt.verify(token, process.env.TokenSecret); //! Token Çözme
        
        // Verileri Güncelleme
        delete postAll?.token;
        postAll["created_byid"] = decoded?.id;
        
        const result = await dbModel.createDB(table,postAll); //! Veri Tabanı İşlemi

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

} //! Veri Ekleme - Token Son

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
        const dbDeleteComments = await dbModel.deleteDBbyOther("comments",{ "blog_id" : search }); //! Altındaki Verileri Siliyor
        
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