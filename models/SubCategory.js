import mongoose, { mongo } from 'mongoose';
import slug from 'mongoose-slug-updater';
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const SubCategorySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
  },
  slug: {
    type: String,
    slug: 'title',
  },
  image: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.SubCategory ||
  mongoose.model('SubCategory', SubCategorySchema);
