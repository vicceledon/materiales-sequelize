const db = require("../database/models/index.js");

const { validationResult } = require("express-validator");

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
    db.Genre.findAll().then((allGenres) => {
      res.render("moviesAdd", { allGenres: allGenres });
    });
  },
  create: (req, res) => {
    let errors = validationResult(req);
    console.log(req, errors);
    db.Movie.create({
      title: req.body.title,
      rating: req.body.rating,
      awards: req.body.awards,
      release_date: req.body.release_date,
      length: req.body.length,
      genre_id: req.body.genre_id,
    }).then(() => {
      res.redirect("/movies");
    });
  },
  edit: (req, res) => {
    // db.Genre.findAll().then((allGenres) => {
    //   res.render("moviesAdd", { allGenres: allGenres });
    // });

    // db.Movie.findByPk(req.params.id).then((movie) => {
    //   res.render("moviesEdit", { Movie: movie });
    // });
    let allGenres = db.Genre.findAll();
    let movie = db.Movie.findByPk(req.params.id, {
      include: ["genre"],
    });
    Promise.all([movie, allGenres])
      .then(([movie, allGenres]) => {
        res.render("moviesEdit", { Movie: movie, allGenres: allGenres });
        //  res.send(allGenres);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  update: (req, res) => {
    let errors = validationResult(req);
    console.log(errors);
    db.Movie.update(
      {
        title: req.body.title,
        rating: req.body.rating,
        awards: req.body.awards,
        release_date: req.body.release_date,
        length: req.body.length,
        genre_id: req.body.genre_id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    ).then(() => {
      console.log("pase por update");
      res.redirect("/movies");
    });
  },
  delete: (req, res) => {
    db.Movie.findByPk(req.params.id).then((movie) => {
      res.render("moviesDelete", { Movie: movie });
    });
  },
  erase: (req, res) => {
    db.Movie.destroy({
      where: { id: req.params.id },
    }).then(() => res.redirect("/movies"));
  },
};

module.exports = moviesController;
