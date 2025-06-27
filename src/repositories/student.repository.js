import Student from "../models/student.js";

export const createStud = async (body) => {
  try {
    const data = await Student.create(body);
    return data;
  } catch (error) {
    return error;
  }
};

export const listStud = async () => {
  try {
    const data = await Student.find({ delete: false });
    
    return data;
  } catch (error) {
    return error;
  }
};
