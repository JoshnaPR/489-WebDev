var express = require('express');
var router = express.Router();

const User = require("../models/User");

//find user
getUser: async (req, res) => {

    //probably find my by PK (which is recieved when user selects option from homepage)

    // const courses = await Course.findAll();
    // if(req.query.msg){
    //   res.locals.msg = req.query.msg
    //   res.locals.courseid = req.query.courseid
    // }
    // res.render('restaurantHome', { restaurant })
    const result = await User.findAll()
    if (result.length) {
        const data = result.map(element => {
            return {
                user_id: element.user_id,
                name: element.name,
                email: element.email
            }
        })
    }
}

module.exports = router;