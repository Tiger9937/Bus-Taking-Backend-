
function stringTojson(req) {
    if (!req) {
        console.log("string is not valid")
    }
    try {
        return JSON.parse(req.body[Object.keys(req.body)[0]])
        // return JSON.parse(req.body.information) 
    } catch (error) {
        return error
    }
}

export {stringTojson}