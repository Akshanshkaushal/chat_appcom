import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  content: { type: String, required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'Usertest', required: true },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'Usertest' },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Message', MessageSchema);
