const db = require("../database/models/index.js");

const genresController = {
  list: (req, res) => {
    db.Genre.findAll().then((genres) => {
      res.render("genresList", { genres: genres });
    });
  },
  detail: (req, res) => {
    db.Genre.findByPk(req.params.id).then((genre) => {
      res.render("genresDetail", { genre: genre });
    });
  },
};

module.exports = genresController;
