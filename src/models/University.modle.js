

import mongoose from 'mongoose';

const Universityschema = new mongoose.Schema({
      name:{
        type: String,
        required: true,
      },
      Image:{
        type: String,
      },
      url: {
        type: String,
      },

})
const University = mongoose.model('Universities', Universityschema)
export {University}

