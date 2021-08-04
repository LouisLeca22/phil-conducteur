const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const {check, validationResult} = require("express-validator")

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id}).populate("user", ["name", "avatar"]);

    if(!profile){
      return res.status(400).json({msg: "Il n'y a pas de profil pour cet utilisateur"});
    }

    res.json(profile)
  }catch(err){
    console.error(err.message);
    res.status(500).send("Erreur serveur")
  }
});

// @route   POST api/profile/
// @desc    Create or update a user profile
// @access  Private
router.post("/", [auth, [
  check('fields', "Les compétences sont obligatoires").not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }

   const {
     website,
     location,
     bio,
     period,
     fields,
     youtube,
     facebook,
     twitter,
     instagram,
     linkedin
   } = req.body;

   // Build profile object
   const profileFields = {};

   profileFields.user = req.user.id; 

   if(website) profileFields.website = website;
   if(location) profileFields.location = location;
   if(bio) profileFields.bio = bio;
   if(period) profileFields.period = period;
   
   if(fields){
     profileFields.fields = fields.split(",").map(field => field.trim())
   }

   // Build social object
   profileFields.social = {};
   if(youtube) profileFields.social.youtube = youtube;
   if(facebook) profileFields.social.facebook = facebook;
   if(linkedin) profileFields.social.linkedin = linkedin;
   if(instagram) profileFields.social.instagram = instagram;
   if(twitter) profileFields.social.twitter = twitter;

  try {
    let profile = await Profile.findOne({user: req.user.id});

    if(profile){
      // update
      profile = await Profile.findOneAndUpdate(
        {user: req.user.id}, 
        {$set: profileFields},
        {new: true}
        );
        
        return res.json(profile);
    }


    // Create
    profile = new Profile(profileFields);

    await profile.save();

    res.json(profile);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
})

// @route   GET api/profile/
// @desc    Get all profiles 
// @access  Public

router.get("/", async(req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ['name', "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur")
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public

router.get("/user/:user_id", async(req, res) => {
  try {
    const profile = await Profile.findOne({user: req.params.user_id}).populate("user", ['name', "avatar"]);

    if(!profile) return res.status(400).json({msg: "Profil non trouvé"})

    res.json(profile);

  } catch (err) {

    if(err.kind === "ObjectId"){
      return res.status(400).json({msg: "Profil non trouvé"})
    }
    console.error(err.message);
    res.status(500).send("Erreur serveur")
  }
});

// @route   DELETE api/profile/
// @desc    Delete profile, user, post
// @access  Private

router.delete("/", auth, async(req, res) => {
  try {
    // @todo remove user's posts
    // Remove profile
    await Profile.findOneAndRemove({user: req.user.id});
    // Remove user
    await User.findOneAndRemove({_id: req.user.id});


    res.json({msg: "Utilisateur supprimé"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur")
  }
});

// @route   PUT api/profile/book
// @desc    Add book
// @access  Private

router.put("/book", [auth, [
  check("title", "Ajouter un titre est obligatoire").not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {
    title,
    description
  } = req.body

  const newBook = {
    title: title,
    description: description
  }

  try {
    const profile = await Profile.findOne({user: req.user.id});

    profile.book.unshift(newBook);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
})


// @route   DELETE api/profile/book/:book_id
// @desc    Delete book
// @access  Private

router.delete("/book/:book_id", auth, async (req, res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id});

    // Get the remove index
    const removeIndex = profile.book.map(item => item.id).indexOf(req.params.book_id);

    profile.book.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  }catch(err){
    console.error(err.message);
    res.status(500).send("Erreur serveur")
  }
})

// @route   PUT api/profile/education
// @desc    Add education
// @access  Private

router.put("/education", [auth, [
  check("school", "Ajouter une école est obligatoire").not().isEmpty(),
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {
    school,
    description
  } = req.body

  const newEdu = {
    school: school,
    description: description
  }

  try {
    const profile = await Profile.findOne({user: req.user.id});

    profile.education.unshift(newEdu);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur serveur");
  }
})


// @route   DELETE api/profile/education/:book_id
// @desc    Delete education
// @access  Private

router.delete("/education/:edu_id", auth, async (req, res) => {
  try{
    const profile = await Profile.findOne({user: req.user.id});

    // Get the remove index
    const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);

  }catch(err){
    console.error(err.message);
    res.status(500).send("Erreur serveur")
  }
})




module.exports = router