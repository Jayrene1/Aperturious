const db = require("../models/schemas");

module.exports = {
  findAll: function(req, res) { 
    db.User
      .find(req.query)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) { //axios.get("/api/users/:id?populate=true")
    const populate = req.query.populate;
    let photoLimit = Number(req.query.photoLimit);
    if (populate === "true") {
      db.User
      .findById(req.params.id)
      .populate({
        path: "collections",
        populate: {
          path: "photos",
          options: { limit: photoLimit }
        }
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    } else {
    db.User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    }
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) { // axios.put("/api/users/:id?newCollection=true", collectionData)
    const newCollection = req.query.newCollection;
    const addFavorite = req.query.addFavorite;
    if (newCollection === "true") {
      db.Collection
        .create(req.body)
        .then(dbCollection => {
          db.User.findByIdAndUpdate(req.params.id, {$push: {collections: dbCollection._id}}, {new: true})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err));
    } else if (addFavorite === "true") {
      db.Photo.findByIdAndUpdate(req.body._id, {$inc: {favorites: 1}})
        .then(dbPhoto => {
          db.User.findByIdAndUpdate(req.params.id, {$push: {favorites: dbPhoto._id}}, {new: true})
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
    db.User
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUid: function(req, res) {
    db.User
      .findOne({ uid: req.params.uid })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
