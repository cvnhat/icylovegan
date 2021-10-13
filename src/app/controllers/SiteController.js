const home=require('../pages/home.json')
const Menu=require("../models/Menu")
const Customer=require("../models/Customer")

class SiteController {
    home(req, res, next) {
        Promise.all([Menu.find({}).lean(), home, Customer.find().limit(5).lean()])
            .then(([menu, home, customer]) => res.render('home', {menu, home, customer}))
            .catch(next);
    }
    blog(req, res, next) {
        res.render('blog')
    }
    blogSingle(req, res, next) {
        res.render('blog-single')
    }
    menu(req, res, next) {
        res.render('menu')
    }  
    reservation(req, res, next) {
        res.render('reservation')
    }
    
    
}

module.exports = new SiteController();
