const User = require('./UserModel');
const Enterprise = require('./EnterpriseModel');
const Role = require('./RolModel');
const AppSession = require('./appSessionModel');
const Profile = require('./profileModel');
const Category = require('./categoryModel');
const Professor = require('./professorModel');
const Course = require('./courseModel');
const Level = require('./levelModel');
const Module = require('./moduleModel');
const Session = require('./sessionModel');
const Evaluation = require('./evaluationModel');
const Question = require('./questionModel');
const Option = require('./optionModel');
const QuestionType = require('./questionTypeModel');
const CourseStudent = require('./courseStudent');
const UserModuleProgress = require('./UserModuleProgress');
const UserSessionProgress = require('./UserSessionProgress');
const UserSessionProgress = require('./const/../UserSessionProgress');

UserSessionProgress.hasMany(User, { foreignKey: 'user_id' });


Module.hasMany(UserModuleProgress, { foreignKey: 'module_id' ,  as: 'usermoduleprogress'});
UserModuleProgress.belongsTo(Module, { foreignKey: 'module_id' });

//User con SessionPregress

User.hasMany(UserSessionProgress, { foreignKey: 'user_id' });
UserSessionProgress.belongsTo(User, { foreignKey: 'user_id' });

Session.hasMany(UserSessionProgress, { foreignKey: 'session_id' ,  as: 'usersessionprogress'});
UserSessionProgress.belongsTo(Session, { foreignKey: 'session_id' });

//Relacion entre evaluation y curso.
Course.belongsTo(Evaluation, { foreignKey: 'evaluation_id' });
Evaluation.hasOne(Course, { foreignKey: 'evaluation_id' });

// Relación entre CourseStudent y User
CourseStudent.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(CourseStudent, { foreignKey: 'user_id' });

// Relación entre CourseStudent y Course
CourseStudent.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasMany(CourseStudent, { foreignKey: 'course_id' });

// Relación entre Evaluation y Question
Evaluation.hasMany(Question, {
    foreignKey: 'evaluation_id',
    as: 'questions'
});
Question.belongsTo(Evaluation, {
    foreignKey: 'evaluation_id',
    as: 'evaluation'
});

// Relación entre Question y Option
Question.hasMany(Option, {
    foreignKey: 'question_id',
    as: 'options'
});
Option.belongsTo(Question, {
    foreignKey: 'question_id',
    as: 'question'
});

// Relación entre Question y QuestionType
Question.belongsTo(QuestionType, {
    foreignKey: 'type_id',
    as: 'questionType'
});
QuestionType.hasMany(Question, {
    foreignKey: 'type_id',
    as: 'questions'
});

// Un usuario pertenece a una empresa
User.belongsTo(Enterprise, {
    foreignKey: 'enterprise_id',
    as: 'enterprise'
});

// Una empresa puede tener muchos usuarios
Enterprise.hasMany(User, {
    foreignKey: 'enterprise_id',
    as: 'enterpriseUsers'
});



// Una sesión de aplicación pertenece a un usuario
AppSession.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'userSession'
});

// Un usuario pertenece a un rol
User.belongsTo(Role, {
    foreignKey: 'role_id',
    as: 'role'
});

// Un rol puede tener muchos usuarios
Role.hasMany(User, {
    foreignKey: 'role_id',
    as: 'roleUsers'
});

// Un perfil pertenece a un usuario
Profile.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'profileUser'
});


// Un usuario puede tener varias sesiones de aplicación
User.hasMany(AppSession, {
    foreignKey: 'user_id',
    as: 'appSessions'
});

// Un usuario tiene un perfil
User.hasOne(Profile, {
    foreignKey: 'user_id',
    as: 'userProfile'
});

// Un curso pertenece a una categoría
Course.belongsTo(Category, {
    foreignKey: 'category_id',
    as: 'courseCategory'
});

// Un curso pertenece a un profesor
Course.belongsTo(Professor, {
    foreignKey: 'professor_id',
    as: 'courseProfessor'
});

// Una categoría puede tener muchos cursos
Category.hasMany(Course, {
    foreignKey: 'category_id',
    as: 'categoryCourses'
});

// Un profesor puede tener muchos cursos
Professor.hasMany(Course, {
    foreignKey: 'professor_id',
    as: 'professorCourses'
});

// Establecer la relación entre Professor y Level
Professor.belongsTo(Level, { foreignKey: 'level_id', as: 'professorLevel' });
Level.hasMany(Professor, { foreignKey: 'level_id', as: 'levelProfessors' });

// Un módulo pertenece a un curso
Module.belongsTo(Course, { foreignKey: 'course_id', as: 'moduleCourse' });
Course.hasMany(Module, { foreignKey: 'course_id', as: 'courseModules' });

// Un módulo tiene una evaluación
Module.belongsTo(Evaluation, { foreignKey: 'evaluation_id', as: 'moduleEvaluation' });
Evaluation.hasMany(Module, { foreignKey: 'evaluation_id', as: 'evaluationModules' });

// Una sesión pertenece a un módulo
Session.belongsTo(Module, { foreignKey: 'module_id', as: 'sessionModule' });
Module.hasMany(Session, { foreignKey: 'module_id', as: 'moduleSessions' });

Evaluation.hasMany(Question, { foreignKey: 'evaluation_id' });
Question.belongsTo(Evaluation, { foreignKey: 'evaluation_id' });

Question.hasMany(Option, { foreignKey: 'question_id' });
Option.belongsTo(Question, { foreignKey: 'question_id' });
