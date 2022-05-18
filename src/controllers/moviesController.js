const db = require("../database/models/index.js");

const moviesController = {
  list: (req, res) => {
    db.Movie.findAll().then((movies) => {
      res.render("moviesList", { movies: movies });
    });
  },
  new: (req, res) => {
    db.Movie.findAll({
      order: [["release_date", "DESC"]],
    }).then((movies) => {
      res.render("newestMovies", { movies: movies });
    });
  },
  recomended: (req, res) => {
    db.Movie.findAll({
      where: {
        rating: {
          [db.Sequelize.Op.gte]: 8,
        },
      },
      order: [["rating", "DESC"]],
      limit: 5,
    }).then((movies) => {
      res.render("recommendedMovies", { movies: movies });
    });
  },
  detail: (req, res) => {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesDetail", { movie: movie });
    });
  },
};

module.exports = moviesController;
