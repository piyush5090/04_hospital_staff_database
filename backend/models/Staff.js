const mongoose = require("mongoose");

function generateStaffId() {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  staffId: String,
  DOB: Date,
  photo: { type: String },
  role: {
    type: String,
    enum: [
      'Doctor', 'Nurse', 'Receptionist', 'Pharmacist', 'Technician',
      'Lab Assistant', 'Admin', 'Housekeeping', 'Driver', 'Security',
      'Physiotherapist', 'Dietitian', 'HR', 'IT Support', 'Maintenance'
    ],
    required: true
  },
  department: String,
  specialization: String,
  shift: String,
  dateJoined: { type: Date, default: Date.now },
  status: { type: String, enum: ['Active', 'On Leave', 'Resigned'], default: "Active" },
  salary: { type: Number, default: 0 },
});

staffSchema.pre('save', async function (next) {
  if (!this.staffId) {
    let newId;
    let exists = true;

    while (exists) {
      newId = generateStaffId();
      const existing = await mongoose.models.staff.findOne({ staffId: newId });
      if (!existing) {
        exists = false;
      }
    }

    this.staffId = newId;
  }

  next();
});

module.exports = mongoose.model('staff', staffSchema);
