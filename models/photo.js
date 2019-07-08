'use strict';
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    postedOn: DataTypes.DATE,
    user_Id: DataTypes.INTEGER,
    url: DataTypes.INTEGER
  }, {});
  photo.associate = function(models) {
    // associations can be defined here
  };
  return photo;
};