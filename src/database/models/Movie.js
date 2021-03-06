module.exports = (sequelize, DataTypes) => {
  let alias = "Movie";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(500),
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
    },
    awards: {
      type: DataTypes.INTEGER(10),
    },
    release_date: {
      type: DataTypes.DATE,
    },
    length: {
      type: DataTypes.INTEGER(10),
    },
    genre_id: {
      type: DataTypes.INTEGER,
    },
  };
  let config = {
    tableName: "movies",
    timestamps: false,
  };

  const Movie = sequelize.define(alias, cols, config);

  Movie.associate = function (models) {
    Movie.belongsTo(models.Genre, {
      as: "genre",
      foreignKey: "genre_id",
    });
    Movie.belongsToMany(models.Actor, {
      as: "actors",
      through: "actor_movie",
      foreignKey: "actor_id",
      otherKey: "movie_id",
    });
  };

  return Movie;
};
