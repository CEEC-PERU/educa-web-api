const User = require('./UserModel');
const Enterprise = require('./EnterpriseModel');
const Role = require('./RolModel');

// Un usuario pertenece a una empresa
User.belongsTo(Enterprise, {
    foreignKey: 'enterprise_id',
    as: 'enterprise'
});

// Una empresa puede tener muchos usuarios
Enterprise.hasMany(User, {
    foreignKey: 'enterprise_id',
    as: 'users'
});

// Un usuario pertenece a un rol
User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
});

// Un rol puede tener muchos usuarios
Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'users'
});
