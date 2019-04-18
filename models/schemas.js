const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uid: { type: String, required: true },
  photographer: { type: Boolean, default: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
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
  photos: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo' // array associates collections with photos
  }],
  password: { type: String, select: false }, // password will not return in a query unless select: false is overriden
  photographer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const photoSchema = new Schema({
  highResURL: String,
  mediumResURL: String,
  lowResURL: { type: String, required: true },
  tags: [String],
  hearts: Number,
  downloads: Number
});

const Photographer = mongoose.model("Photographer", photographerSchema);
const User = mongoose.model("User", userSchema);
const Collection = mongoose.model("Collection", collectionSchema);
const Photo = mongoose.model("Photo", photoSchema);

module.exports = {
  Photographer, User, Collection, Photo
};
