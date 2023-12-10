const mongoose = require("mongoose");
const { setFlagsFromString } = require("v8");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    role: { type: String, require: true, default: "user" },
    addresses: { type: String },
    mobile: { type: Number, require: true },
    department: {
      id: {
        type: mongoose.Types.ObjectId,
        ref:'User'
      },
      name: {
        type: String,
      },

    },
  },
  { timestamps: true }
);

// to chnage _id to id for frontend
const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.User = mongoose.model("User", userSchema);
