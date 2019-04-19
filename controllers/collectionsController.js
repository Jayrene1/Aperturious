const db = require("../models/schemas");

module.exports = {
  findAll: function(req, res) {
    db.Collection
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) { //axios.get("/api/collections/:id?populate=true")
    const populate = req.query.populate;
    if (populate === "true") {
      db.Collection
      .findById(req.params.id)
      .populate("photos")
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
