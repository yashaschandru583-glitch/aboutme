import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  longDescription?: string;
  category: 'Full Stack' | 'Frontend' | 'Backend' | 'AI & Cloud';
  image: string;
  techStack: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  stars: number;
  highlights: string[];
  createdAt: Date;
  updatedAt: Date;
}

export const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project short description is required'],
      trim: true,
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    longDescription: {
      type: String,
      trim: true,
      default: '',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: {
        values: ['Full Stack', 'Frontend', 'Backend', 'AI & Cloud'],
        message: '{VALUE} is not a supported project category',
      },
      default: 'Full Stack',
    },
    image: {
      type: String,
      required: [true, 'Project thumbnail image URL is required'],
      trim: true,
    },
    techStack: {
      type: [String],
      required: [true, 'At least one tech stack tag is required'],
      validate: {
        validator: (v: string[]) => Array.isArray(v) && v.length > 0,
        message: 'A project must have at least one tech stack badge',
      },
    },
    liveUrl: {
      type: String,
      trim: true,
      default: '#',
    },
    githubUrl: {
      type: String,
      trim: true,
      default: '#',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    stars: {
      type: Number,
      default: 0,
      min: [0, 'Stars cannot be negative'],
    },
    highlights: {
      type: [String],
      default: [],
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

// Prevent mongoose model overwrite error during dev restarts
export const Project: Model<IProject> =
  (mongoose.models && mongoose.models.Project)
    ? (mongoose.models.Project as Model<IProject>)
    : mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
