const dayjs = require('dayjs'); //! Zaman

//! Mysql
const knex = require('knex')({
    client: process.env.DB_CONNECTION,
    connection: {
        host : process.env.DB_HOST,
        port : process.env.DB_PORT,
        user : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
    }
});
//! Mysql SON

//! Tüm Veriler
exports.getAllDB = async(table,query,info) => {

    // return { function:"getAllDB", table:table, query:query, info:info  }

    try {

        //! Tanım
        var page = Number(query.page) || info?.page || 1; //! Sayfa Numarası
        var rowcount  = Number(query.rowcount) || info?.rowcount || null; //! Sayfada Gösterecek Veri Sayısı
        var orderByResult  = query.order || info?.orderBy || table+".id"; //! Sıralanacak Sutun
        var orderResult  = query.order || info?.order || "desc"; //! Sıralama [asc = Küçükten -> Büyüğe] [ desc = Büyükten -> Küçüğe ]
 
        //! Sayfada veri gösterme sayısı hesaplama
        var page = page - 1; //! Sayfa Numarası
        if(page <= 0) { page = 0; }
 
        //! Veriler
        const model = () => knex(table);
        var totalCount = await model().clone().count('* as count').then( function(count) { return count[0]['count']; } ); //! Tüm Veri Sayısı
        var data = () => model().clone().limit(rowcount).offset(page*rowcount).orderBy(orderByResult,orderResult); //! Limit ve Sıralama
        var data = await data().clone()
                                .then( function(rows) { return { status :rows.length >= 1 ? "success" : "error" , rows: rows, msg: rows.length >= 1 ? null : "Veri Bulunamadı" , }; } )
                                .catch(function (err) { return { status :"error", rows: [], msg: err,} }); //! Veriler
 
        //! Sayfalandırma
        var dataLength = data?.rows.length; //! Veri Sayısı
        var pageTop = Math.ceil(totalCount/rowcount); //! Toplam Sayfa
 
        //! Return
        return { table:table, status :data?.status, size:dataLength, sizeTop: totalCount, pageNow:page+1, pageTop:pageTop, data: data, msg: null, }
         
    } catch (error) {
        return  { table:table, status :"error", size: 0, sizeTop: 0, pageNow:0, pageTop:0, data: [], msg: error, }
    }
   
} //! Tüm Veriler Son

//! Arama - Id
exports.findById = async(table,search) => {

    //return { function:"findById", table:table, search:search }

    try {
            
        //! Veri Arama
        const result = await knex(table).where({ id: search})
        .then( function(rows) { return { status : rows.length >= 1 ? "success" : "error" , size: rows.length, rows: rows, msg: rows.length >= 1 ? null : "Veri Bulunamadı" , }; } )
        .catch(function (err) { return { status :"error", size:0, rows: null, msg: err,} });

        return { table:table, result : result, msg: result?.msg,  }
        
   } catch (error) { return  { table:table, status :"error", msg: error, } }


} //! Arama - Id Son

//! Arama - Kullanıcı
exports.filterByUser = async(table,search) => {

    //return { table:table, search:search  }

    try {

        //! Veri Arama
        const result = await knex(table).where({ created_byid: search})
        .then( function(rows) { return { status : rows.length >= 1 ? "success" : "error" , size: rows.length, rows: rows, msg: rows.length >= 1 ? null : "Veri Bulunamadı" , }; } )
        .catch(function (err) { return { status :"error", size:0, rows: [], msg: err,} });

        return { table:table, result : result, msg: result?.msg,  }
        
   } catch (error) { return  { table:table, status :"error", msg: error, } }

} //! Arama - Kullanıcı Son

//! Arama - Farklı
exports.findByOther = async(table,search) => {

    //return { table:table, search:search  }

    try {

        //! Veri Arama
        const result = await knex(table).where(search)
        .then( function(rows) { return { status : rows.length >= 1 ? "success" : "error" , size: rows.length, rows: rows, msg: rows.length >= 1 ? null : "Veri Bulunamadı" , }; } )
        .catch(function (err) { return { status :"error", size:0, rows: [], msg: err,} });

        return { table:table, result : result, msg: result?.msg,  }
        
   } catch (error) { return  { table:table, status :"error", msg: error, } }

} //! Arama - Farklı Son

//! Veri Ekleme
exports.createDB = async(table,data) => {

    //return { function:"createDB", table:table, data:data }

    try {
        
        //! Veri Ekleme
        const result = await knex(table).insert(data)
        .then( function(rows) { return { status :"success", rows: rows[0], msg: null, }; } )
        .catch(function (err) { return { status :"error", rows: null, msg: err,} });

        return { table:table, status : result?.status, id:result?.rows,  msg: result?.msg,  }
        
    } catch (error) {
        return  { table:table, status :"error", id:null, msg: error, }
    }

} //! Veri Ekleme Son

//! Veri Güncelleme
exports.editDB = async(table,data) => {

    //return { function:"editDB", table:table, data:data }

    try {
        
        //! Güncellenecek Veriler
        var updatedArray = {};

        // Referans Veriler Güncelleme Yapıyor
        Object.keys(data).forEach(key => {					
            if(key!="id"  ) { updatedArray[key] = data[key]; }  //! Ekleme Yapılacaklar
        });

        //! Diğer Güncellenecekler
        updatedArray["isupdated"] = 1;
        updatedArray["updated_at"] = new Date();

        //! Veri Güncelleme
        const model = () => knex(table).where({ id: data?.id });
        const result_find = await model().clone()
                                .then( function(rows) { return { status :rows ==  0 ? "error" : "success" , rows: rows, msg: rows ==  0 ? "Veri Bulunamadı" : null , }; } )
                                .catch(function (err) { return { status :"error", rows: null, msg: err,} });

        const result_edit = await model().clone().update(updatedArray)
                                .then( function(rows) { return { status :rows ==  0 ? "error" : "success" , rows: rows, msg: null, }; } )
                                .catch(function (err) { return { status :"error", rows: null, msg: err,} });

        const result = result_find?.status== "success" ? result_edit :  result_find ;

        return { table:table, status : result?.status, msg: result?.msg,  }
        
    } catch (error) {
        return  { table:table, status :"error", msg: error, }
    }
   
} //! Veri Güncelleme Son

//! Veri Silme
exports.deleteDB = async(table,search) => {

    //return { function:"deleteDB", table:table, search:search }

    try {

        //! Veri Silme
        const result = await knex(table).where({ id: search}).delete()
        .then( function(rows) { return { status : rows == 0 ? "error" : "success" , rows: rows, msg: rows == 0 ? "Veri Bulunamadı" : null, }; } )
        .catch(function (err) { return { status :"error", rows: null, msg: err,} });

        return { table:table, result : result, msg: result?.msg,  }
        
    } catch (error) {
        return  { table:table, status :"error", msg: error, }
    }

   
} //! Veri Silme Son

//! Veri Silme - Farklı
exports.deleteDBbyOther = async(table,search) => {

    //return { function:"deleteDBbyOther", table:table, search:search }

    try {

        //! Veri Silme
        const result = await knex(table).where(search).delete()
        .then( function(rows) { return { status : rows == 0 ? "error" : "success" , rows: rows, msg: rows == 0 ? "Veri Bulunamadı" : null, }; } )
        .catch(function (err) { return { status :"error", rows: null, msg: err,} });

        return { table:table, result : result, msg: result?.msg,  }
        
    } catch (error) {
        return  { table:table, status :"error", msg: error, }
    }

   
} //! Veri Silme - Farklı Son