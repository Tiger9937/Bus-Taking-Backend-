class ApiWarning extends Error {
    constructor(
        statusCode,
        message = "Something might not be right",
        warnings = [],
        stack = "",
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = null; 
        this.success = true; 
        this.warnings = warnings;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiWarning };
