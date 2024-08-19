class ApiError extends Error{
    constructor(
        StatusCode ,
        errors = [],
        stack = "",
        mesage = "somthing went worng"
    ){
        super(mesage)
        this.StatusCode = StatusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors 
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this , this.constructor)
        }
    }
}
export{ApiError}