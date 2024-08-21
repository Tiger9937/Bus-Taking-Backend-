import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        // improve this file name function
      cb(null, file.originalname)
    }
  })
export const upload = multer({storage})