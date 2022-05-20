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
  add: (req, res) => {
    res.render("moviesAdd");
  },
  create: (req, res) => {
    db.Movie.create({
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
    }).then(() => {
      res.redirect("/movies");
    });
  },
  edit: (req, res) => {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesEdit", { Movie: movie });
    });
  },
  update: (req, res) => {
    db.Movie.update(
      {
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() => {
      res.redirect("/movies");
    });
  },
  delete: (req, res) => {
    db.Movie.destroy({
      where: { id: req.params.id },
    }).then(() => res.redirect("/movies"));
  },
};

module.exports = moviesController;
