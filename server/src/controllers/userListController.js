const User = require("../models/userModel")

const usersListController = async (req, res)=>{

    try {
        const users = await User.find({}, "email username img");
        return res.status(200).json({success: "Listed all users", users})
        
    } catch (error) {
        console.log(error);
        return res.status(500),json({error: "internal server error"})
    }
    
}

module.exports={usersListController}