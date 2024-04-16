

import mongoose from "mongoose";

// Creating schema
const userSchema =  mongoose.Schema(
    // Adding the fielleds and their type
    {
      name: { type: String, required: true },
      mobile_number: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      email: String,
      profession: String,
      interviewStatus:{  type:Array,
                        default:[]
                    },
      

   
    },
    // Adding time stramps which used save datas timings entered in DB
    {
      timestamps: true,
    }
  );

// Exporting schema
const User = mongoose.model("User", userSchema);
export default User;