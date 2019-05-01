const db = require("../models/schemas");

module.exports = {
  findAll: function(req, res) {
    let limit = Number(req.query.limit);
    let offset = Number(req.query.offset);
    if (req.query.previews === "true") {
      db.Collection
      .find({}, {photos: {$slice: 3}})
      .skip(offset)
      .limit(limit)
      .populate("photos")
      .populate("photographer", "username photoURL")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    } else {
    db.Collection
      .find()
      .skip(offset)
      .limit(limit)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }
  },
  findById: function(req, res) { //axios.get("/api/collections/:id?populate=true")
    const populate = req.query.populate;
    let limit = Number(req.query.limit);
    limit = limit - (limit * 2);
    if (populate === "true") {
      db.Collection
      .findById(req.params.id, {photos: {$slice: limit}})
      .populate("photos")
      .populate("photographer", "username photoURL")
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    } else {
    db.Collection
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }
  },
  create: function(req, res) {
    db.Collection
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) { // axios.put("/api/collections/:id?newPhoto=true", photoData)
    const newPhoto = req.query.newPhoto;
    if (newPhoto === "true") {
      db.Photo
        .create(req.body)
        .then(dbPhoto => {
          db.Collection.findByIdAndUpdate(req.params.id, {$push: {photos: dbPhoto._id}}, {new: true})
            .populate("photos")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err));
      } else {
    db.User
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
      }
  },
  remove: function(req, res) {
    db.Collection
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
