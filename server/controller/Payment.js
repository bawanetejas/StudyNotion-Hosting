
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const paymentSuccessEmail = require('../mail/template/PaymentSuccessfull')
const mailSender= require("../utils/mailSender");
const courseEnrollmentEmail = require("../mail/template/courseEnrollmentEmail")
const CourseProgress = require("../models/CourseProgress")
const mongoose = require("mongoose");
const crypto = require("crypto")

//catpture payment and create razorpay order


exports.capturePayment = async(req,res)=>{
    const {courses} = req.body
    const userId = req.user.id

    if(courses.length === 0){
        return res.status(500).json({
            success:false,
            message:"Please provide course id"
        })
    }

    let totalAmount = 0;

    for(const course_id of courses){
        let course;
        try{
            course = await Course.findById(course_id)
            if(!course){
                return res.status(400).json({
                    success:false,
                    message:"course is not valid"
                })
            }

            const uid=new mongoose.Types.ObjectId(userId)
            if(course.studentsEnrolled.includes(uid)){
              return res.status(400).json({
                success:false,
                message:"Student already enrolled in the course"
              })
            }

            totalAmount +=course.price
        }catch(error){
            console.log("error in capture payment controller-->",error)
            return res.status(400).json({
                success:false,
                message:"error while capturing payment"
            })
        }
    }

    const currency ='INR'
    const options ={
        amount:totalAmount*100,
        currency,
        receipt:Math.random(Date.now()).toString()
        //receipt must be in the string form
    }

    try{
        const paymentResponse = await instance.orders.create(options);
        return res.status(200).json({
            success:true,
            data:paymentResponse
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({success:false, message:"Could not Initiate Order"});
    }
}


// verify payment

exports.verifySignature = async(req,res)=>{
     
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    const userId = req.user.id
    console.log("user id of user -->",userId)
    if( !razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature ||
        !courses || !userId){
            return res.status(400).json({
                success:false,
                message:"Payment Failed"
            })
        }
        
   
    let body = razorpay_order_id +"|"+ razorpay_payment_id
    
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
                              .update(body.toString())
                              .digest("hex");
                              
    if(expectedSignature === razorpay_signature){
        //enroll the student in the course
        console.log("hey i am here")
        await enrollStudents(courses,userId ,res)

        return res.status(200).json({
            success:true,
            message:"Payment Verified"
        })
    }

    return res.status(400).json({
        success:false,
        message:"Payment Failed"
    })
}

const enrollStudents = async(courses,userId ,res)=>{
    if(!courses||!userId){
       return res.status(400).json({
        success:false,
        message:"Please Provide User and Course Detail"
       });
    }

    for(const courseId of courses){
        try{
            //find the course and enrolled student in it
            const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},
                {$push:{studentsEnrolled:userId}},
                {new:true})

            if(!enrolledCourse){
                return res.status(400).json({
                    success:false,
                    message:"Not valid course"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseID:courseId,
                userId:userId,
                completeVideo:[],
            })

            //find the student and add the course in there list

            const enrolledStudent = await User.findByIdAndUpdate({_id:userId},
                                          {$push:{courses:courseId,
                                          courseProgress:courseProgress._id}},
                                          {new:true});


            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName , `${enrolledStudent.firstName}`)
            )

        }catch(error){
            console.log(error)
            return res.status(400).json({
                success:false,
                message:error.message
            })
        }

    }
}

// send payment successfull email

exports.sendPaymentSuccessEmail = async(req,res)=>{
    const {orderId,paymentId,amount} = req.body

    const userId = req.user.id

    if(!orderId || paymentId || !amount){
        return res.status(400).json({
            success:false,
            message:"Please Provide all the fields"
        });
    }

    try{
        //student ko dhundo
        const enrolledStudent = await User.findById(userId);

        await mailSender(
            enrolledStudent.email,
            `Payment Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`,
            amount/100,orderId,paymentId)

        )
    }catch(error){
        console.log("error in the sending email",error)
        return res.status(400).json({
            success:false,
            message:"Could not send email",
        })
    }
}

//only work for single order purchase

// exports.capturePayment=async(req ,res)=>{
//     const courseId = req.body;
//     const userId = req.user.id;

//     if(!courseId){
//         return res.status(400).json({
//             success:false,
//             message:"Plaease provide valid course Id"
//         })
//     }

//     let course;
//     try{
//         course = await Course.findById(courseId);

//         if(!course){
//             return res.status(400).json({
//                 success:false,
//                 message:"Could not found the course"
//             })
//         }

//         // find user already pay for the cours

//         const uid = new mongoose.Types.ObjectId(userId)
        
//         if(course.studentsEnrolled.includes(uid)){
//             return res.status(200).json({
//                 success:false,
//                 message:"Student already enrolled",
//             })
//         }


//     }catch(error){
//         console.error(error);
//         return res.status(500).json({
//             success:false,
//             message:error.message,
//         });
//     }

//     // creating order

//     const amount = course.price;
//     const currency = "INR";

//     const options ={
//         amount:amount*100,
//         currency,
//         receipt:Math.random(Date.now()).toString(),
//         // next call is done by razorpay so need to add notes for userid and courseId  to fetch the data

//         notes:{
//             courseId,
//             userId,
//         }
//     }

//     try{

//         // initiate the payment using razorpay
//         const paymentResponse = await instance.orders.create(options);
//         console.log(paymentResponse);

//         // return response
//         return res.status(200).json({
//             success:true,
//             courseName:course.courseName,
//             courseDescription:course.courseDescription,
//             thumbnail: course.thumbnail,
//             orderId: paymentResponse.id,
//             currency:paymentResponse.currency,
//             amount:paymentResponse.amount,
//         });

//     }catch(error){

//         console.log(error);
//         res.json({
//             success:false,
//             message:"Could not initiate order",
//         });
//     }

// }

// // verify the signature of razorpay and server

// exports.verifySignature = async (req, res)=>{

//     // signature we gave in backend 

//     const webhooksecret ="1234568";

//     // razorpay signature  which is in encrypted 
//     const signature  = req.header["x-razorpay-signature"];

//     //converting server signature equivalent to the razorpay signature
//     const shasum = crypto.createHmac("sha256",webhooksecret);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");

//     if(signature === digest){
//         console.log("payment is authorised");

//         const{courseId,userId} = req.body.payload.payment.entity.notes;

//         try{
//             // find the course and enrolled the student in it

//             const enrolledCourse = await Course.findByIdAndUpdate(
//                                                               courseId,
//                                                               {
//                                                                 $push:{studentsEnrolled:userId}

//                                                                },
//                                                                {new:true},
                                                              
//                                                            );
//             console.log("enrolledCourse",enrolledCourse);
//             if(!enrolledCourse){
//                 return res.status(400).json({
//                     success:false,
//                     message:"course not found"
//                 });
//             }                                             

//             // adding the course in the students account
           
//             const enrolledStudent = await User.findByIdAndUpdate(
//                                                          userId,
//                                                          {$push:{courses:courseId}},
//                                                          {new:true},
//             );
//             console.log("enrolledStudent",enrolledStudent);

//             // registration mail to student

//             const emailResponse = await mailSender(
//                 enrolledStudent.email,
//                 "Congratulation",
//                 courseEnrollmentEmail(enrolledStudent.email,enrolledStudent.firstName)
//             );

//             console.log(emailResponse);

//             return res.status(200).json({
//                 success:false,
//                 message:"Signature verified and course Added",
//             })

//     }catch(error){
//         console.log(error);
//             return res.status(500).json({
//                 success:false,
//                 message:error.message,
//             });
//         }
//     }
//     else {
//         return res.status(400).json({
//             success:false,
//             message:'Invalid request',
//         });
//     }
// }