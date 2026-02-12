import mongoose, { Model } from 'mongoose';
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
declare const ActiveSession: Model<IActiveSession>;
export default ActiveSession;
//# sourceMappingURL=ActiveSession.model.d.ts.map