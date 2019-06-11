const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../../Schemas/User');
const auth = require('../../middleware/auth');

//routes for our application
router.post('/', (req, res) => {
    const { email, password } = req.body;

    if(!email | !password ) {
        return res.status(400).json({msg: 'Please send correct info'});
    }

    User.findOne({ email })
    .then(user => {
       if(!user){ 
        return res.status(400).json({ msg: 'User Does not exist!'});
       }

       //Validating, authentication
       bcrypt.compare(password, user.password)
       .then( isMatch => {
           if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

           jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if(err) throw err;    
                 res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                });
            });

       });
    });
});

router.get('/user', auth, (req ,res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
})

//function(req, res) == (req, res) => ~~ arrow syntax
module.exports = router;
