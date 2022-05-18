const db = require("../database/models/index.js");

const actorsController = {
  list: (req, res) => {
    db.Actor.findAll({
      order: [["last_name", "ASC"]],
    }).then((actors) => {
      res.render("actorsList", { actors: actors });
    });
  },
  detail: (req, res) => {
    db.Actor.findByPk(req.params.id).then((actor) => {
      res.render("actorsDetail", { actor: actor });
    });
  },
};

module.exports = actorsController;
