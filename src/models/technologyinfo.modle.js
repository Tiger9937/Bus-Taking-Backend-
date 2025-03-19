
import mongoose from 'mongoose';

const tech = new mongoose.Schema({
      name:{
        type: String,
        required: true,
      },
      Image:{
        type: String,
        required: true,
      },
      Domen_name: {
        type: String,
        required: true,
      },

})

const technology = mongoose.model('technology', tech)
export {technology}

