import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title Required'],
    unique: [true, 'Title is already existed'],
  },
  subCategory: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Category ||
  mongoose.model('Category', CategorySchema);
