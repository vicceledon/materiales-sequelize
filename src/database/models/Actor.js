module.exports = (sequelize, DataTypes) => {
  let alias = "Actor";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(100),
    },
    last_name: {
      type: DataTypes.STRING(100),
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
    },
    favorite_movie_id: {
      type: DataTypes.INTEGER(10),
    },
  };
  let config = {
    tableName: "actors",
    timestamps: false,
  };

  const Actor = sequelize.define(alias, cols, config);

  Actor.associate = function (models) {
    Actor.belongsToMany(models.Movie, {
      as: "movies",
      through: "actor_movie",
      foreignKey: "actor_id",
      otherKey: "movie_id",
    });
  };
  return Actor;
};
