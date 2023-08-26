const mongoose=require("mongoose");
const mailSender=require("../utils/mailSender");

const otpSchema=new mongoose.Schema({
    
      email:{
        type:String,
        required:true,
    },
 
     otp:{
       type:Number,
        required:true
    },

    createdAt:{
        type:Number,
        default:Date.now(),
        expires:5*60,
    },
   
  
});

async function sendVerificationEmail(email,otp){
    try{
        const response=await mailSender(email,"Verification email",otp);
        console.log("Email sent succesfully",response);
    }
    catch(error){
              console.log("Error occured ",error);
              throw error;
    }
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports=mongoose.model("OTP",otpSchema);