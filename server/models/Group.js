import mongoose from 'mongoose';

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usertest' }],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Usertest', required: false },
});

export default mongoose.model('Group', GroupSchema);
