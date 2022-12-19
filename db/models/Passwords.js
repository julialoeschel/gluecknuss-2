import mongoose from "mongoose";

const { Schema } = mongoose;

const passwortSchema = new Schema({
  password: { type: String, required: true },
});

const Password =
  mongoose.models.Password || mongoose.model("Password", passwortSchema);

export default Password;
