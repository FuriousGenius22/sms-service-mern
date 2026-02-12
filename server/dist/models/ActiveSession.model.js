import mongoose, { Schema } from 'mongoose';
const activeSessionSchema = new Schema({
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
const ActiveSession = mongoose.model('ActiveSession', activeSessionSchema, 'activesessions');
export default ActiveSession;
//# sourceMappingURL=ActiveSession.model.js.map