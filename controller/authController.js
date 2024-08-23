import userModel from "../model/userModel.js";
import { hashPassword , comparePassword } from "../helper/authHelper.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, address , answer } = req.body;
      //validations
      if (!name) {
        return res.send({ error: "Name is Required" });
      }
      if (!email) {
        return res.send({ error: "Email is Required" });
      }
      if (!password) {
        return res.send({ error: "Password is Required" });
      }
      if (!phone) {
        return res.send({ error: "Phone no is Required" });
      }
      if (!address) {
        return res.send({ error: "Address is Required" });
      }
      if (!answer) {
        return res.send({ message: "Answer is Required" });
      }
      //check user
      const exisitingUser = await userModel.findOne({ email });
      //exisiting user
      if (exisitingUser) {
        return res.status(200).send({
          success: true,
          message: "Already Register please login",
        });
      }
      //register user
      const hashedPassword = await hashPassword(password);
      //save
      const user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        answer,
      }).save();
  
      res.status(201).send({
        success: true,
        message: "User Register Successfully",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in Registeration",
        error,
      });
    }
  };
  //login
  export const loginController = async (req, res) => {
    try {
      const { email, password } = req.body;
      //validation
      if (!email || !password) {
        return res.status(404).send({
          success: false,
          message: "Invalid email or password",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Email is not registered",
        });
      }
      const match = await comparePassword(password, user.password);
      if (!match) {
        return res.status(200).send({
          success: false,
          message: "Invalid Password",
        });
      }
      //token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
      });
      res.status(200).send({
        success: true,
        message: "logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          adddress: user.address,
          role: user.role,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error in login",
        error,
      });
    }
  };
  //forgot password 
  export const forgotPasswordController = async (req, res) => {
    try {
      const { email, answer, newPassword } = req.body;
      if (!email) {
        res.status(400).send({ message: "Emai is required" });
      }
      if (!answer) {
        res.status(400).send({ message: "answer is required" });
      }
      if (!newPassword) {
        res.status(400).send({ message: "New Password is required" });
      }
      //check
      const user = await userModel.findOne({ email, answer });
      //validation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Wrong Email Or Answer",
        });
      }
      const hashed = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(user._id, { password: hashed });
      res.status(200).send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Something went wrong",
        error,
      });
    }
  };
   //test
  export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
};
export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    if (user) {
      res.status(200).send({
        success: true,
        message: 'User found successfully',
        user,
      });
    } else {
      res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching user details',
      error,
    });
  }
};
export const getUser = async (req , res) => {
  try {
    const users = await userModel.find({});
    if(users){
      res.status(200).send({
        success: true,
        message:'User Information retrieved successfully',
        users,
      });
    }
    else{
      res.status(404).send({
        success: false,
        message:'No user found',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: 'Error fetching users',
      error,
    });
  }
};