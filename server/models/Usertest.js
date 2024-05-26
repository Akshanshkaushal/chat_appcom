import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UsertestSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UsertestSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.model('Usertest', UsertestSchema);
