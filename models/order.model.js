const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model');

const ORDER_STATUSES = ['pending', 'diproses', 'dikirim', 'selesai', 'dibatalkan'];

const Order = sequelize.define(
  'Order',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    buyerName: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
    totalAmount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  { tableName: 'orders', timestamps: true }
);

User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

module.exports = Object.assign(Order, { ORDER_STATUSES });
