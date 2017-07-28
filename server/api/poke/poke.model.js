import mongoose from 'mongoose';
import {createSeedModel} from 'mongoose-plugin-seed';
import seed from './poke.seed';
import mongoosePaginate from 'mongoose-paginate';

const {Schema} = mongoose;

const PokeSchema = new Schema({
  userSent: {
    type: String,
    required: true
  },
  userReceived: {
    type: String,
    required: true
  },
  lastPokeTime: {
    type: Date,
    required: true
  },
  numberOfPokes: {
    type: Number,
    default: 0
  }
});

PokeSchema.plugin(mongoosePaginate);

export default createSeedModel('Poke', PokeSchema, seed);