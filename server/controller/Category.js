
const Category = require("../models/Category");
const Course = require("../models/Course");

const getRandomInt=(max)=>{
    return Math.floor(Math.random()*max);
}

exports.createCategory =async(req,res)=>{
    try{
        const {name ,description} = req.body;

        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.status(500).json({
                success:false,
                message:"category already exist"
            })
        }

        const categoryDetails = await Category.create({name:name,
                                                      description:description });

        console.log("category Details ->",categoryDetails)
        
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully",
        })

    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


// get all category

exports.showAllcategories = async(req,res) =>{

    try{

        const allCategory = await Category.find({});

        return res.status(200).json({
            success:true,
            message:"All category returned successfully",
            allCategory,
            
        })
    }catch(error){

        return res.status(500).json({
            success:false,
            message:error.message,
        });
    }
}

// get category page detail

exports.categoryPageDetails = async (req,res)=>{
    try{
        //get categoryId
        const {categoryId} = req.body;
        // get courses for specific categ ory
        const selectedCategory = await Category.findById({_id:categoryId})
                                               .populate({
                                                path:"course",
                                                match:{status:'Published'},
                                                populate:{
                                                    path:'instructor'
                                                },
                                             
                                               })
                                               .exec();

        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"No course found for the selected category"
            })
        }
        // get courses for different category
        
        // const categoriesExceptSelected = await Category.find({ _id : { $ne:categoryId }})
        const allCategories = await Category.find({}).populate({
            path:"course",
            match:{status:"Published"},
            populate:{
                path:"instructor"
            },
            
        });

        
        const categoriesExceptSelected = allCategories.filter((category)=> category._id !== categoryId)
            
        // console.log("all categoru res --->",categoriesExceptSelected)

        let differentCategory = await Category.findOne(categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]._id)
                                  .populate({
                                    path:"course",
                                    match:{status:"Published"},
                                    
                                  }).exec();
        // get top 10 best selling courses                          
        // const bestSellingCourses = await Course.find({})
        //                                        .sort({studentsEnrolled:"desc"})
        //                                        .limit(10);
        //return response

        // getting all courses in array using flat Map
        const allCourses = allCategories.flatMap((category)=>category.course)
        //getting top corses who sold most in descending order for all category

        const bestSellingCourses = allCourses.sort((a,b)=> b.sold - a.sold).slice(0,10)
        return res.status(200).json({
        success:true,
        message:"All details are fetched successfully",
        data:{

            selectedCategory,
            differentCategory,
            bestSellingCourses

        }
       })

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}