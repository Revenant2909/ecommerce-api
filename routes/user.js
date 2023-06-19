const User = require("../models/User");

const router = require("express").Router();

//GET BY ID
router.get("/find/:id", async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user); 
    } catch (err) {
        res.status(500).json(err);
    }
} )
// GET ALL USERS
router.get("/", async(req,res)=>{
    const query = req.query.new
    try {
        const users = query 
        ? await User.find().sort({_id:-1}).limit(10)
        : await User.find();
        res.status(200).json(users); 
    } catch (err) {
        res.status(500).json(err);
    }
} )


//UPDATE USER
router.put("/:id",async (req,res)=>{
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
            $set: req.body,
            },
            {new:true}
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//CREATE NEW USER
router.post("/",async (req,res)=>{
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone
    })
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE

router.delete("/:id", async(req,res)=>{
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted!"); 
    } catch (err) {
        res.status(500).json(err);
    }
} )




module.exports = router;