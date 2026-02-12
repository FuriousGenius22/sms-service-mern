import mongoose, { Schema, Model } from 'mongoose';

export interface IActiveSession {
  _id: string;
  userId: mongoose.Types.ObjectId;
  token: string;
  browserId: string;
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  lastActiveAt: Date;
  expiresAt: Date;
}

const activeSessionSchema = new Schema<IActiveSession>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  browserId: {
    type: String,
    default: '',
    index: true,
  },
  ipAddress: {
    type: String,
    default: '',
  },
  userAgent: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastActiveAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 }, // TTL index — auto-deleted when expired
  },
});

const ActiveSession: Model<IActiveSession> = mongoose.model<IActiveSession>(
  'ActiveSession',
  activeSessionSchema,
  'activesessions'
);

export default ActiveSession;
