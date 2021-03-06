const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const {check, validationResult} = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @route   GET api/auth
// @desc    Get authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route   POST api/auth
// @desc    Authenticate user & get token
// @access  Public
router.post('/', [
  check('email', "Renseignez un e-mail valide").isEmail(),
  check("password", "Renseignez votre mot de passe").exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

  const {email, password} = req.body

  try {
  
  // See if user exists
  let user = await User.findOne({email: email})

  if(!user){
    return res.status(400).json({errors: [{msg: "Informations d'identification non valides"}]});
  }

  //Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch){
    return res.status(400).json({errors: [{msg: "Informations d'identification non valides"}]});
  }


  // Return jsonwebtoken
  const payload = {
    user:{
      id: user.id
    }
  }

  jwt.sign(payload, config.get("jwtSecret"), {expiresIn: 360000}, (err, token) => {
    if(err) throw err;
    res.json({token});
  })


  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error")
  }

 
});


module.exports = router