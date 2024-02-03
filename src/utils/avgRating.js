 function GetAvgRating(ratingArr){
    if(ratingArr?.length === 0) return 0

   
    const totalReviewCount = ratingArr?.reduce((acc , curr)=>acc + curr?.rating,0)

    // console.log("gpat u man -->",totalReviewCount)
    const multiplier = Math.pow(10,1)
    const avgRatingCount =
     Math.round((totalReviewCount /ratingArr?.length)*multiplier/multiplier)
    // console.log("avg rating -->",avgRatingCount)
     return avgRatingCount
}

export default GetAvgRating