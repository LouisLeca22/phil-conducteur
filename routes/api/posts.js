const express = require("express");
const router = express.Router();
const {check, validationResult} = require("express-validator");
const auth = require("../../middleware/auth")
const User = require("../../models/User")
const Profile = require("../../models/Profile")
const Post = require("../../models/Post");

// @route   POST api/posts
// @desc    Create a post
// @access  private
router.post('/', [auth, [
  check('text', 'Le texte est obligatoire').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const user = await User.findById(req.user.id).select("-password");

    const newPost = new Post({
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    });

    const post = await newPost.save();

    res.json(post);
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }

});


// @route   GET api/posts
// @desc    Get all psots
// @access  private

router.get("/", auth, async (req, res) => {
  try{
    const posts = await Post.find().sort({date: -1});
    res.json(posts); 
  }catch(err){
    console.log(err.message);
    res.status(500).json("Erreur serveur");
  }
});


// @route   GET api/posts/:id
// @desc    Get post by id
// @access  private

router.get("/:id", auth, async (req, res) => {
  try{
    const post = await Post.findById(req.params.id);

    if(!post) {return res.status(404).json({msg: "Post non trouvé"});}


    res.json(post); 
  }catch(err){
    console.log(err.message);
    
    if(err.kind === "ObjectId") {return res.status(404).json({msg: "Post non trouvé"});}
    res.status(500).json("Erreur serveur");
  }
});

// @route   DELETE api/posts/:id
// @desc    Remove post
// @access  private

router.delete("/:id", auth, async (req, res) => {
  try{
     const post = await Post.findById(req.params.id);

     if(!post) {return res.status(404).json({msg: "Post non trouvé"});}

     // Check user
     if(post.user.toString() !== req.user.id){
      return res.status(401).json({msg: "Non autorisé"});
     }

     await post.remove();

     res.json({msg: "Post supprimé"})
    if(!post) {return res.status(404).json({msg: "Post non trouvé"});}


    res.json(post); 
  }catch(err){
    console.log(err.message);
    
    if(err.kind === "ObjectId") {return res.status(404).json({msg: "Post non trouvé"});}
    res.status(500).json("Erreur serveur");
  }
});


// @route   PUT api/posts/like/:id
// @desc    Like a post
// @access  private

router.put("/like/:id", auth, async (req, res) => {
  try {
    
    const post = await Post.findById(req.params.id);

    // Check if post has already been liked
    if(post.likes.filter(like => like.user.toString() == req.user.id ).length > 0){
      return res.status(400).json({msg: "Le post a déjà été liké"});
    }

    post.likes.unshift({user: req.user.id});

    await post.save()

    res.json(post.likes)

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur");
  }
})

// @route   PUT api/posts/unlike/:id
// @desc    Like a post
// @access  private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    
    const post = await Post.findById(req.params.id);

    // Check if post has already been liked
    if(post.likes.filter(like => like.user.toString() == req.user.id ).length === 0){
      return res.status(400).json({msg: "Le post n'a pas encore été liké"});
    }

    // Remove like
    const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);


    await post.save()

    res.json(post.likes)

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur serveur");
  }
})


// @route   POST api/posts/comment/:id
// @desc    Add a comment
// @access  private
router.post('/comment/:id', [auth, [
  check('text', 'Le texte est obligatoire').not().isEmpty()
]], async (req, res) => {

  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  try {
    const user = await User.findById(req.user.id).select("-password");
    const post = await Post.findById(req.params.id);

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id
    };

    post.comments.unshift(newComment);
    await post.save();

    res.json(post.comments);
  
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }

});

// @route   DELETE api/posts/comment/:post_id/:comment_id
// @desc    delete comment
// @access  private

router.delete("/comment/:post_id/:comment_id", auth, async(req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);

    // Pull out comment
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);

    // Make sure comment exists
    if (!comment){
      return res.status(404).json({msg: "Le commentaire n'existe pas"})
    }

    // Check user
    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({msg: "Non autorisé"});
    }

    // Remove post
    const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id)

    post.comments.splice(removeIndex, 1);
    
    await post.save();

    res.json(post.comments)

  } catch (err) {
    console.error(err.message);
    res.status(500).json("Erreur Serveur");
  }
})


module.exports = router