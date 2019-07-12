'use strict';
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    postedOn: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    image: DataTypes.STRING,
    publicId: DataTypes.STRING
  }, {});
  photo.associate = function(models) {
    // associations can be defined here
    models.photo.belongsTo(models.user);
  };
  return photo;
};