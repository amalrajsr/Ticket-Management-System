const asyncHandler = require("express-async-handler");


const notFound=asyncHandler(async(req,res)=>{

    res.json({
        success:false,
        message:'invalid api endpont'
    })
})

module.exports= notFound