import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './user.seed';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

UserSchema.plugin(mongoosePaginate);

export default createSeedModel('User', UserSchema, seed);