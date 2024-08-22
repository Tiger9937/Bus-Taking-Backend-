
// const asyncHandel = (fn)=>{
//     async (req , res , next)=>{
//         try {
//            return await fn(req , res , next)
//         } catch (error) {
//             res.status(error.code || 500).json({
//                 success : false,
//                 message : error.message
//             })
//         }
//     }
// }


const asyncHandel = (fn)=>{
    return (req , res , next)=>{
        Promise.resolve(fn(req , res , next)).catch((err)=> next(err))
    }
}

export{asyncHandel}