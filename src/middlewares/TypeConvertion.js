
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

function StringToarray(string) {
    
    if (!string) {
        console.log("string is not valid")
    }

    try {

        let slice = string.slice(1,-1)
        let newarray = slice.split(',')
        return newarray        

    } catch (error) {
        return error
    }
}

export {stringTojson , StringToarray}