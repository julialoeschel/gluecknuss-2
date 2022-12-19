import mongoose from "mongoose";

const { Schema } = mongoose;

const verdictSchema = new Schema({
  verdict: { type: String, required: true },
  tags: [{ type: String, required: true }],
});

const Verdict =
  mongoose.models.Verdict || mongoose.model("Verdict", verdictSchema);

export default Verdict;
