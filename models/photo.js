'use strict';
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    postedOn: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    url: DataTypes.TEXT,
    publicId: DataTypes.TEXT
  }, {});
  photo.associate = function(models) {
    // associations can be defined here
  };
  return photo;
};