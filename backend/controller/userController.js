const ErrorHandler=require("../utils/errorhandler")
const catchAsyncError=require("../middleware/catchAsyncError");
const User=require("../models/userModel");
const crypto = require("crypto");
const sendToken=require("../utils/jwtToken");
const sendEmail=require("../utils/sendEmail");
const cloudinary=require("cloudinary")

//register
exports.registerUser=catchAsyncError(async(req,res,next) =>{
    const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width:150,
        crop:'scale',
    });
    const { name , email , password }=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        },
    });
    sendToken(user,201,res);
});
//login
exports.loginUser=catchAsyncError(async (req,res,next)=>{
    const {email,password}=req.body;

    if(!email||!password){
        return  next(new ErrorHandler("Please Enter Your Email and Password",400));
    }

    const user=await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invalid Email and Password",401));
    }
    const isPasswordMatched=await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    sendToken(user,200,res);
});
//logout
exports.logout=catchAsyncError(async(req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true

    })
    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
});
//forgetPassword 
exports.forgetPassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findOne({email:req.body.email});
    if(!user){
        return next(new ErrorHandler("User Not Found",404));
    }
    //Get ResetPassword token
    const resetToken=user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl=`${req.protocol}://${req.get(
        "host"
        )}/password/reset/${resetToken}`;

    const message=`Your Password Reset Token is:-\n\n${resetPasswordUrl} \n\n If you have not requested this email
    then, please ignore it `
    try{
        await sendEmail({
            email:user.email,
            subject:"Ecommerce Password Recovery",
            message
        })
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.email} successfully`
        });

    }
    catch(error){
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new ErrorHandler(error.message,500))
    }
});
//resetPassword
exports.resetPassword=catchAsyncError(async(req,res,next)=>{
    //creating Token Hash
    const resetPasswordToken=crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user=await User.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()},
    })
    if(!user){
        return next(new ErrorHandler("Reset Password is invalid or has been expire",400));
    }
    if(req.body.password!==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not password",400));
    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save();

    sendToken(user,200,res);

});
//Get User Details
exports.getUserDetails=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id);
    res.status(200).json({
        success:true,
        user
    });
});
//Update user Password
exports.updatePassword=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.user.id).select("+password");

    const isPasswordMatched=await user.comparePassword(req.body.oldPassword);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Passowrd is Incorrect",400));
    }
    if(req.body.newPassword !==req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));
    }
    user.password=req.body.newPassword;

    await user.save();

    sendToken(user,200,res);

    res.status(200).json({
        success:true,
        user
    });
});
//update user profile
exports.updateProfile=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email
    };
    if(req.body.avatar!==""){
        const user=await User.findById(req.user.id);
        const ImageId=user.avatar.public_id;

        await cloudinary.v2.uploader.destroy(ImageId);

        const myCloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatars",
            width:150,
            crop:'scale'
        });
        newUserData.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
    };

    const user =await User.findByIdAndUpdate(req.user.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
    })
});
// Get all user(admin) 
exports.getAllUser=catchAsyncError(async (req,res,next)=>{
    const users=await User.find();
    res.status(200).json({
        success:true,
        users     
    });
});
//Get single user (admin)

exports.getSingleUser=catchAsyncError(async (req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User Does Not Exist With Id:${req.params.id}`,400))
    };

    res.status(200).json({
        success:true,
        user    
    });
});

//update user Role(admin)
exports.updateUserRole=catchAsyncError(async(req,res,next)=>{
    const newUserData={
        name:req.body.name,
        email:req.body.email,
        role:req.body.role
    };
    let user=User.findById(req.params.id)

    if(!user){
        return next(new ErrorHandler(`User Does Not Exist With Id:${req.params.id}`,400))
    };
     user=await User.findByIdAndUpdate(req.params.id,newUserData,{
        new:true,
        runValidators:true,
        useFindAndModify:false
    });
    res.status(200).json({
        success:true,
       
    })

});
//Delete User (admin)
exports.deleteUser=catchAsyncError(async(req,res,next)=>{
    const user=await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler(`User Does Not Exist With Id:${req.params.id}`,400))
    }
    const ImageId=user.avatar.public_id;

    await cloudinary.v2.uploader.destroy(ImageId);
    await user.remove();
    res.status(200).json({
        success:true,
        message:"User Deleted Successfully"
       
    })

});