import mongoose, { mongo } from 'mongoose';
import slug from 'mongoose-slug-updater';
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Title post required'],
  },
  content: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  posted_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
