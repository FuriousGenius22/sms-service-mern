import mongoose, { Schema } from 'mongoose';
const creditSchema = new Schema({
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
const Credit = mongoose.model('Credit', creditSchema, 'credits');
export default Credit;
//# sourceMappingURL=Credit.model.js.map