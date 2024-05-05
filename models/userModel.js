import mongoose from "mongoose";

// Creating schema
const userSchema = new mongoose.Schema(
  // Adding the fielleds and their type
  {
 
    name: { type: String, required: true },
    mobile_number: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profession: { type: String },
    dateOfBirth: { type: String },
    alterPhoneNumber: { type: Number },
    qualification: { type: String },
    department: { type: String },
    interviewStatus: { type: Array, default: [] },
    email:{ type:String},
    
  },
  // Adding time stramps which used save datas timings entered in DB
  {
    timestamps: true,
  }
);

// Exporting schema
const User = mongoose.model("User", userSchema);
export default User;
