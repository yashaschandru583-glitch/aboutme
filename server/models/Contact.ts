import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean;
  ipAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const ContactSchema: Schema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email address'],
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Please provide a valid email address',
      ],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [150, 'Subject cannot exceed 150 characters'],
      default: 'General Inquiry',
    },
    message: {
      type: String,
      required: [true, 'Please enter a message'],
      trim: true,
      minlength: [10, 'Message must be at least 10 characters long'],
      maxlength: [3000, 'Message cannot exceed 3000 characters'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    ipAddress: {
      type: String,
      default: '127.0.0.1',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret: Record<string, unknown>) => {
        ret.id = ret._id ? String(ret._id) : ret.id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const Contact: Model<IContact> =
  (mongoose.models && mongoose.models.Contact)
    ? (mongoose.models.Contact as Model<IContact>)
    : mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;
