import mongoose from 'mongoose';
import slug from 'mongoose-slug-updater';
const Schema = mongoose.Schema;

mongoose.plugin(slug);

const CommentSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
  body: {
    type: String,
  },
  posted_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Comment ||
  mongoose.model('Comment', CommentSchema);
