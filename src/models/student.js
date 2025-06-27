import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobileNo: {
      type: String,
    },
    delete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

export default Student;
