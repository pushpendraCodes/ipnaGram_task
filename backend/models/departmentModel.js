const mongoose = require("mongoose");

const { Schema } = mongoose;

const departmentSchema = new Schema(
  {
    name: { type: String,unique:true },
    createdBy: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

const virtual = departmentSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
departmentSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.department = mongoose.model("department", departmentSchema);
