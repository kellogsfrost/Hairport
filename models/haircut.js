'use strict';
module.exports = (sequelize, DataTypes) => {
  const hairCut = sequelize.define('hairCut', {
    cutLength: DataTypes.STRING,
    user_Id: DataTypes.INTEGER
  }, {});
  hairCut.associate = function(models) {
    // associations can be defined here
    models.hairCut.belongsTo(models.user);
    models.hairCut.hasMany(models.photo);
  };
  return hairCut;
};