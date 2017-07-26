import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './post.seed';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;

const PostSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  }
});

PostSchema.plugin(mongoosePaginate);

export default createSeedModel('Post', PostSchema, seed);