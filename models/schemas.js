const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photographerSchema = new Schema({
  uuid: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  collections: [{
      type: Schema.Types.ObjectId,
      ref: 'Collection' // array associates collections with photographers
  }],
  phone: { type: String, required: true },
  email: { type: String, required: true }
});

const userSchema = new Schema({
  uuid: { type: String, required: true },
  username: { type: String, required: true },
  hearts: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo' // array associates liked photos with users
  }]
});


const collectionSchema = new Schema({
  name: { type: String, required: true },
  public: { type: Boolean, default: true },
  photos: [{
      type: Schema.Types.ObjectId,
      ref: 'Photo' // array associates collections with photos
  }],
  password: { type: String, select: false } // password will not return in a query unless select: false is overriden
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
