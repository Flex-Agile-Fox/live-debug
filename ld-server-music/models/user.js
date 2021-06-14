"use strict";

const bcryptjs = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	const { Model } = sequelize.Sequelize;
	class User extends Model {}

	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isEmail: {
						msg: "Invalid email format",
					},
					notNull: {
						msg: "Email cannot be empty",
					},
					notEmpty: {
						msg: "Email cannot be empty",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notNull: {
						msg: "Password cannot be empty",
					},
					notEmpty: {
						msg: "Password cannot be empty",
					},
				},
			},
		},
		{
			sequelize,
			hooks: {
				beforeCreate(user) {
					user.password = bcryptjs.hashSync(String(user.password), 10);
				},
			},
		}
	);

	User.associate = function (models) {
		User.hasMany(models.Song);
	};
	return User;
};
