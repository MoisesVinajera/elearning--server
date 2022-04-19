import moongose from 'mongoose';

const { ObjectId } = moongose.Schema;

const completedSchema = new moongose.Schema(
  {
    user: {
      type: ObjectId,
      ref: 'User',
    },
    course: {
      type: ObjectId,
      ref: 'Course',
    },
    lessons: [],
  },
  { timestamps: true }
);

export default moongose.model('Completed', completedSchema);
