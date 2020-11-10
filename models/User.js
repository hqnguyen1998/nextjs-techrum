import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Username required'],
    unique: [true, 'Username is already existed'],
  },
  email: {
    type: String,
    trim: true,
    required: [true, 'Email Adresss required'],
    unique: [true, 'Email Adresss is already existed'],
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Password required'],
  },
  accountType: {
    type: String,
    default: 'user',
  },
  dob: {
    type: String,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  ],
  joined_date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
