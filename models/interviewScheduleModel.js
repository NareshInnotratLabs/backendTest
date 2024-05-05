import mongoose from "mongoose";

// Creating schema
const interviewSheduleSchema =  mongoose.Schema(
    // Adding the fielleds and their type
    {
      userID : { type: String },
      interviewID: { type: String },
      jobID: { type: String },
      date: { type: String },
      time: { type: String },
      title:{type:String},
      participant:{type:String},
      mobile_number:{type:String},
      token:{type:String},
      result: { type: String },
      status: { type: String }
    },
    // Adding time stramps which used save datas timings entered in DB
    {
      timestamps: true,
    }
  );

// Exporting schema
const Interview = mongoose.model("Interview", interviewSheduleSchema);
export default Interview;