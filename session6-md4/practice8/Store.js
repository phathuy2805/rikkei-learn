import mongoose from 'mongoose';

const StoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    street: {
      type: String,
      required: true
    },
    district: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

const Store = mongoose.model('Store', StoreSchema);

export default Store;
