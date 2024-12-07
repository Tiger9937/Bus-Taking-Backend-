import mongoose from 'mongoose'

const busSchema = new mongoose.Schema({
    BusName:{
        type: String,
        required: true,
    },
    busNumber: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
});

export  const  bus = mongoose.model("Bus" , busSchema)
