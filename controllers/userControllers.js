import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const register = async (req, res) => {
    // Spliting data from req.bady to multiple varibles
    const { name, mobile_number, password } = req.body;
    console.log(name, mobile_number, password )

    //  Chicking the user already exists or not
    const userFind = await User.findOne({ mobile_number: mobile_number});
    if (userFind) {
        res.status(400).send({message: "This User already exists", success: false});
    } else {
    
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)
    
        //   Creating user
        const userRegister = await User.create({
            name: name,
            mobile_number:  mobile_number,
            password: hashPassword,
            profession: "common"
        });

        res.status(200).send({ success: true, message: "successfully registered 😊"})
    }
};


export const login = async (req, res) => {
    // Spliting data from req.bady to multiple varibles
    const { mobile_number, password } = req.body;
    const userFind = await User.findOne({ mobile_number:mobile_number });

    console.log(userFind)
    if (userFind) {
      const checkPassword = await bcrypt.compare(password, userFind.password)
    
    if(checkPassword){
        const token = await jwt.sign({id:userFind._id}, "students")
        res.status(200).send({token:token, success:true, mobile_number:userFind.mobile_number, message: "Login successful!", profession: userFind.profession})
    }else{
        res.status(400).send("Invalid Password")
    }
    } else {
      res.status(400).send("Invalid Mobile_number ");
    }
  };

export const profile_update = async (req, res) => {
    const { mobile_number, profession, email, dateOfBirth, alterPhoneNumber, qualification, department, resume } = req.body;

    const userFind = await User.findOne({ mobile_number:mobile_number });

    if (userFind) {
        const profileUpdated = await User.updateOne(
            { mobile_number: mobile_number },
            {
                profession,  email, dateOfBirth, alterPhoneNumber, qualification, department, resume
            }
          );
          if (profileUpdated ) {
            res.status(201).json({
                message: "Your Profile Updated Successfully"
            });
          } else {
            // if movie is not updated saying movie is not created
            res.status(400);
            throw new Error("failed to update your profile");
          }
    } else {
         // if movie is not updated saying movie is not created
         res.status(400);
         throw new Error("failed to find your profile");
    }
}

