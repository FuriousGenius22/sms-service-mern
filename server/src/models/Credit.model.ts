import mongoose, { Schema, Model } from 'mongoose';

export interface ICredit {
  _id: string;
  userId: mongoose.Types.ObjectId;
  balance: number;
  updatedAt: Date;
  createdAt: Date;
}

const creditSchema = new Schema<ICredit>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
    index: true,
  },
  balance: {
    type: Number,
    default: 0,
    min: [0, 'Credit balance cannot be negative'],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Credit: Model<ICredit> = mongoose.model<ICredit>('Credit', creditSchema, 'credits');

export default Credit;
