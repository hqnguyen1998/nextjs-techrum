import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const CategorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title Required'],
    unique: [true, 'Title is already existed'],
  },
  slug: {
    type: String,
    slug: 'title',
  },
  subCategory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
    },
  ],
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Category ||
  mongoose.model('Category', CategorySchema);
