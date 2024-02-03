const express = require("express")
const router = express.Router()
// importing the controller

//course controller

const {
    createCourse,
    showAllCourses,
    getCourseDetail,
    editCourse,
    getFullCourseDetail,
    getInstructorCourse,
    deleteCourse
        } = require("../controller/Course")

// category controller

const{
    createCategory,
    showAllcategories,
    categoryPageDetails
    } = require("../controller/Category");

 // section controller
 
 const {
    createSection,
    updateSection,
    deleteSection
        } = require("../controller/Section");


// subsection controller

const {
    createSubSection,
    deleteSubSection,
    updateSubSection,
} = require("../controller/SubSection");

//rating controller 
const {
    createRating,
    getAverageRating,
    getAllRating,
} = require("../controller/RatingAndReviews");


// importing middleware

const {
    auth,
    isInstructor,
    isAdmin,
    isStudent
} = require("../middleware/Auth")


//course progress controller

const {lectureCompletion} = require("../controller/courseProgres")
/////////////////////////////////////                    /////////////////////////////
//                            COURSE ONLY CREATED BY INSTRUCTOR
/////////////////////////////////////                    /////////////////////////////



router.post("/createCourse", auth, isInstructor, createCourse)

router.put("/editCourse", auth, isInstructor, editCourse)

router.post("/getFullCourseDetails", auth, getFullCourseDetail)

router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourse)

router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.put("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.put("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
// Get Details for a Specific Courses
router.get("/getCourseDetails", getCourseDetail)

router.post("/lectureCompletion", auth, isStudent, lectureCompletion);
/////////////////////////////////////                    /////////////////////////////
//                            CATEGORY ONLY CREATED BY ADMIN
/////////////////////////////////////                    /////////////////////////////


router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllcategories)
router.post("/getCategoryPageDetails", categoryPageDetails)



/////////////////////////////////////                    /////////////////////////////
//                                    RATING AND REVIEW
/////////////////////////////////////                    /////////////////////////////


router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)


module.exports = router;