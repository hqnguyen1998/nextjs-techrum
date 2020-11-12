import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ConfigSchema = new Schema({
  pageTitle: {
    type: String,
    trim: true,
    required: true,
    uppercase: true,
  },
  pageMeta: {
    type: String,
    trim: true,
  },
  facebook: {
    type: String,
    trim: true,
  },
  instagram: {
    type: String,
    trim: true,
  },
  github: {
    type: String,
    trim: true,
  },
  twitter: {
    type: String,
    trim: true,
  },
  youtube: {
    type: String,
    trim: true,
  },
});

export default mongoose.models.Config ||
  mongoose.model('Config', ConfigSchema, 'config');
