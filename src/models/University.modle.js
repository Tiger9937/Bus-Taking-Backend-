

import mongoose from 'mongoose';

const Universityschema = new mongoose.schema({
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
const University = mongoose.model('University', Universityschema)
export default University;