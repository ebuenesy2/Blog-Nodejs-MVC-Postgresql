const express = require("express"); //! Express
const router = express.Router(); //! Sayfalandırma
const usersController = require("../controllers/usersController.js"); //! Controller - users
const blogsController = require("../controllers/blogsController.js"); //! Controller - blogs
const commentsController = require("../controllers/commentsController.js"); //! Controller - comments

//! Users
router.get('/api/users/all', usersController.DataAll); //! Tüm Veriler
router.get('/api/users/find/:id', usersController.DataFindById); //! Veri Arama
router.post('/api/users/add', usersController.DataAdd); //! Veri Ekleme
router.post('/api/users/edit', usersController.DataEdit); //! Veri Güncelleme
router.get('/api/users/delete/:id', usersController.DataDelete); //! Veri Silme
router.post('/api/users/login', usersController.DataLogin); //! Login

//! Blogs
router.get('/api/blogs/all', blogsController.DataAll); //! Tüm Veriler
router.get('/api/blogs/find/:id', blogsController.DataFindById); //! Veri Arama
router.get('/api/blogs/find_user/:id', blogsController.DataPostFindByUser); //! Veri Arama - Kullanıcı
router.post('/api/blogs/find_category', blogsController.DataPostFindByCategory); //! Veri Arama - Kategori
router.post('/api/blogs/add', blogsController.DataAdd); //! Veri Ekleme
router.post('/api/blogs/add/token', blogsController.DataAddToken); //! Veri Ekleme - Token
router.post('/api/blogs/edit', blogsController.DataEdit); //! Veri Güncelleme
router.get('/api/blogs/delete/:id', blogsController.DataDelete); //! Veri Silme

//! Commet
router.get('/api/comments/all', commentsController.DataAll); //! Tüm Veriler
router.get('/api/comments/find/:id', commentsController.DataFindById); //! Veri Arama
router.get('/api/comments/find_user/:id', commentsController.DataPostFindByUser); //! Veri Arama - Kullanıcı
router.post('/api/comments/add', commentsController.DataAdd); //! Veri Ekleme
router.post('/api/comments/add/token', commentsController.DataAddToken); //! Veri Ekleme - Token
router.post('/api/comments/edit', commentsController.DataEdit); //! Veri Güncelleme
router.get('/api/comments/delete/:id', commentsController.DataDelete); //! Veri Silme

module.exports = router;