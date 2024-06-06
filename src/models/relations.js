const User = require('./UserModel');
const Enterprise = require('./EnterpriseModel');
const Role = require('./RolModel');
const AppSession = require('./appSessionModel');
const Profile = require('./profileModel');
const DocumentType = require('./documentTypeModel');
const Category = require('./categoryModel');
const Professor = require('./professorModel');
const Course = require('./courseModel');

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

// Un perfil tiene un tipo de documento
DocumentType.hasOne(Profile, {
    foreignKey: 'document_id'
})

// Una sesión de aplicación pertenece a un usuario
AppSession.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'usersession',
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

// Un perfil pertenece a un usuario
Profile.belongsTo(User, {
    foreignKey: 'user_id',
});

// Un perfil pertenece a un tipo de documento
Profile.belongsTo(DocumentType, {
    foreignKey: 'document_id'
});

// Una empresa puede tener muchos usuarios
Enterprise.hasMany(User, {
    foreignKey: 'enterprise_id',
    as: 'users',
});

// Un usuario pertenece a una empresa
User.belongsTo(Enterprise, {
    foreignKey: 'enterprise_id',
    as: 'enterprise',
});

// Un usuario pertenece a un rol
User.belongsTo(Role, {
    foreignKey: 'role_id',
});

// Un usuario puede tener varias sesiones de aplicación
User.hasMany(AppSession, {
    foreignKey: 'user_id',
    as: 'appsessions',
});

// Un usuario tiene un perfil
User.hasOne(Profile, {
    foreignKey: 'user_id',
});

// Un curso pertenece a una categoría
Course.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'category'
});

// Un curso pertenece a un profesor
Course.belongsTo(Professor, {
    foreignKey: 'professor_id',
    as: 'professor'
});

// Una categoría puede tener muchos cursos
Category.hasMany(Course, {
    foreignKey: 'category_id',
    as: 'courses'
});

// Un profesor puede tener muchos cursos
Professor.hasMany(Course, {
    foreignKey: 'professor_id',
    as: 'courses'
});