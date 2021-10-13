const Menu = require('../models/Menu');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
class AdminController {
    
    createProduct(req, res, next) {
        res.render('admin/create-products')
    }

    //[GET] /products/:id/edit
    editProduct(req, res, next) {
        Menu.findById(req.params.id).lean()
            .then(product => res.render('admin/edit-products', {product}))
            .catch(next)
    }

    //[GET] /admin/stored/products
     storedProducts(req, res, next){
        Promise.all([Menu.find({}).lean(), Menu.countDocumentsDeleted()])
            .then(([products, deletedCount]) => res.render('admin/stored-products', {deletedCount, products}))
            .catch(next);
       }

    //[GET] /admin/trash/products
    trashProducts(req, res, next){
        Menu.findDeleted({}).lean()
            .then(products => res.render('admin/trash-products', {products}))
            .catch(next);
    }

    //[GET] /register
    register(req, res, next) {
        res.render('user/register')
    }
    //[GET] /login
    login(req, res, next) {
        res.render('user/login')
    }



     //[POST] /login
    log(req, res, next) {
        User.findOne({username:req.body.username, password:req.body.password})
        .then(user=>{
            if(user){
                var token = jwt.sign({ _id: user._id }, 'shhh');
                res.cookie('UserToken', token)
                res.redirect('/')
            }
            else{
                res.json("Đăng nhập không thành công")
            }
        })
        .catch(err=>{message:"lỗi server"})
    }

    check(req, res, next){
        try{
            var token=req.cookies.UserToken;
            var idUser=jwt.verify(token, 'shhh')
            if(idUser){
                User.findOne({_id: idUser})
                .then(user=>{
                    if(user.role=="admin")
                        next()
                    else
                        res.redirect('/products')
                })
                .catch(err=>{message:"Lỗi"})
            }
        }catch(err){
            return res.redirect("/login")
        }
    }

    logout(req, res, next){
        res.clearCookie('UserToken',req.cookies.UserToken);
        res.redirect('/login');
    }

}

module.exports = new AdminController();
