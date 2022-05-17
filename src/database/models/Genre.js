module.exports = (sequelize, DataTypes) => {
  let alias = "Genre";
  let cols = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    ranking: {
      type: DataTypes.INTEGER(10),
    },
    active: {
      type: DataTypes.TINYINTEGER(1),
    },
  };
  let config = {
    tableName: "genres",
    timestamps: false,
  };

  const Genre = sequelize.define(alias, cols, config);
  return Genre;
};
