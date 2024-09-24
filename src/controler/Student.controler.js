import {asyncHandel} from '../utils/asyncHandaler'
import {Student} from '../models/student.modle'

const studentRegister = asyncHandel(async(req , res)=>{

    const { address,mobileNumber } = req.body
    if ([ address,mobileNumber ].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required to Register the student");
    }
    // TODO get console.log(address)
    student.aggre([
        {
            $match:{
                
            }
        }
    ])
    const student = await Student.create({
        address: {
            street: address.street || "No street",       
            Village: address.Village || "No village",
            city: address.city || "No city",
            state: address.state|| "No state",
            postalCode: address.postalCode || "No postalCode"
        },  
        phoneNumber:mobileNumber,
    });

    res.status(200).json(
        200,
        {student},"Student Rigster successFull"
    )

})  

export{
    studentRegister
}