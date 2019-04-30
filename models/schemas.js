const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: { type: String, required: true },
  photographer: { type: Boolean, default: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
  photoURL: String,
  thumbnailURL: String,
  firstName: String,
  lastName: String,
  phone: String,
  collections: [{
    type: Schema.Types.ObjectId,
    ref: 'Collection' // array associates collections with photographers
  }],
  hearts: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo' // array associates liked photos with users
  }]
});

const collectionSchema = new Schema({
  name: { type: String, required: true },
  private: { type: Boolean, default: false },
  watermarked: { type: Boolean, default: false },
  photos: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo' // array associates collections with photos
  }],
  password: { type: String, select: false }, // password will not return in a query unless select: false is overriden
  photographer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
},
{
  timestamps: true
});

const photoSchema = new Schema({
  name: { type: String, required: true },
  highResURL: { type: String, required: true },
  thumbnailURL: String,
  photographer: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  tags: [String],
  hearts: Number,
  downloads: Number
});

const User = mongoose.model("User", userSchema);
const Collection = mongoose.model("Collection", collectionSchema);
const Photo = mongoose.model("Photo", photoSchema);

module.exports = {
  User, Collection, Photo
};
