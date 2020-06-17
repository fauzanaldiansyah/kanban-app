'use strict';
const bcrypt = require('bcrypt')
const salt = bcrypt.genSaltSync(10)

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: {
    type: DataTypes.STRING,
    allowNull: false,
    isEmail: true, 
    validate: {
      notNull:{
        msg: 'Fill the field'
      },
      notEmpty: {
        msg: 'Fill the field'
      },
      len: {
        args: [6,10],
        msg: "Password between 6-10 character"
      }
    }
  },
  organization: { 
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user, options) => {
      user.password = bcrypt.hashSync(user.password, salt)
    },
  }
})

User.addHook('beforeCreate', (user,options) => {
  if(user.organization === ''){
    user.organization = 'Hacktiv8'
  }
})

  User.associate = function(models) {
    User.hasMany(models.Task, { foreignKey: "UserId", targetKey: "id"})
  };
  return User;
};