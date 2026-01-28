
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";

const generateToken = (userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '7d'})
    return token;
}

// This is controller for User Registration
// POST: /api/users/register

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // check if required fields satisfied
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill required fields"})
        }
        // check if the user exists already in Database
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({message: "User already exists"})
        }

        // create new user
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({
            name, email, password: hashedPassword
        })

        // return message success
        const token = generateToken(newUser._id)
        newUser.password = undefined;

        return res.status(201).json({message: "User created successfully", token, user: newUser})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

    // This is controller for User Login
    // POST: /api/users/Login

    export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    user.password = undefined;

    return res.status(200).json({
      message: "Successfully Logged In",
      token,
      user,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
    // controller for getting user by there Id
    // GET: /api/users/data
    export const getUserById = async (req, res) => {
    try {
        const userId = req.userId;

        // check if the user exists
        
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: 'No User found'})
        }
        //return user
        user.password = undefined;
            return res.status(200).json({user})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}

// controller for getting user resumes
// GET: /api/users/resumes

export const getUserResumes = async (req, res) => {
    try {
        const userId = req.userId

        // return users resumes
        const resumes = await Resume.find({userId})
        return res.status(200).json({resumes})

    } catch (error) {
        return res.status(400).json({message: error.message})
    }
}