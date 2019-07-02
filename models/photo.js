'use strict';
module.exports = (sequelize, DataTypes) => {
  const photo = sequelize.define('photo', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    postedOn: DataTypes.DATE,
    hairCut_Id: DataTypes.INTEGER
  }, {});
  photo.associate = function(models) {
    // associations can be defined here
    models.photo.belongsTo(models.hairCut);
  };
  return photo;
};