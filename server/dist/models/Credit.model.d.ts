import mongoose, { Model } from 'mongoose';
export interface ICredit {
    _id: string;
    userId: mongoose.Types.ObjectId;
    balance: number;
    updatedAt: Date;
    createdAt: Date;
}
declare const Credit: Model<ICredit>;
export default Credit;
//# sourceMappingURL=Credit.model.d.ts.map