import { Schema, model, models } from "mongoose";

const PromptSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  userImg: {
    type: String,
    required: [true, "Image is required"],
  },
  userName: {
    type: String,
    required: [true, "UserName is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
