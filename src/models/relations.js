// Importación de modelos
const User = require('./UserModel');
const Enterprise = require('./EnterpriseModel');
const Role = require('./RolModel');
const AppSession = require('./appSessionModel');
const Profile = require('./ProfileModel');
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

// Relación entre User y Profile
User.hasOne(Profile, { foreignKey: 'user_id', as: 'userProfile' });
Profile.belongsTo(User, { foreignKey: 'user_id', as: 'userProfile' });

// Relación entre User y Enterprise
User.belongsTo(Enterprise, { foreignKey: 'enterprise_id', as: 'enterprise' });
Enterprise.hasMany(User, { foreignKey: 'enterprise_id', as: 'enterpriseUsers' });

// Relación entre User y Role
User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'roleUsers' });

// Relación entre User y AppSession
User.hasMany(AppSession, { foreignKey: 'user_id', as: 'appSessions' });
AppSession.belongsTo(User, { foreignKey: 'user_id', as: 'userSession' });

// Relación entre CourseStudent y User
CourseStudent.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(CourseStudent, { foreignKey: 'user_id' });

// Relación entre CourseStudent y Course
CourseStudent.belongsTo(Course, { foreignKey: 'course_id' });
Course.hasMany(CourseStudent, { foreignKey: 'course_id' });

// Relación entre Evaluation y Question
Evaluation.hasMany(Question, { foreignKey: 'evaluation_id', as: 'questions' });
Question.belongsTo(Evaluation, { foreignKey: 'evaluation_id', as: 'evaluation' });

// Relación entre Question y Option
Question.hasMany(Option, { foreignKey: 'question_id', as: 'options' });
Option.belongsTo(Question, { foreignKey: 'question_id', as: 'question' });

// Relación entre Question y QuestionType
Question.belongsTo(QuestionType, { foreignKey: 'type_id', as: 'questionType' });
QuestionType.hasMany(Question, { foreignKey: 'type_id', as: 'questions' });

// Relación entre Course y Category
Course.belongsTo(Category, { foreignKey: 'category_id', as: 'courseCategory' });
Category.hasMany(Course, { foreignKey: 'category_id', as: 'categoryCourses' });

// Relación entre Course y Professor
Course.belongsTo(Professor, { foreignKey: 'professor_id', as: 'courseProfessor' });
Professor.hasMany(Course, { foreignKey: 'professor_id', as: 'professorCourses' });

// Relación entre Professor y Level
Professor.belongsTo(Level, { foreignKey: 'level_id', as: 'professorLevel' });
Level.hasMany(Professor, { foreignKey: 'level_id', as: 'levelProfessors' });

// Relación entre Course y Module
Course.hasMany(Module, { foreignKey: 'course_id', as: 'courseModules' });
Module.belongsTo(Course, { foreignKey: 'course_id', as: 'moduleCourse' });

// Relación entre Module y Session
Module.hasMany(Session, { foreignKey: 'module_id', as: 'moduleSessions' });
Session.belongsTo(Module, { foreignKey: 'module_id', as: 'sessionModule' });

// Relación entre Module y Evaluation
Module.belongsTo(Evaluation, { foreignKey: 'evaluation_id', as: 'moduleEvaluation' });
Evaluation.hasMany(Module, { foreignKey: 'evaluation_id', as: 'evaluationModules' });

// Relación entre Evaluation y Question
Evaluation.hasMany(Question, { foreignKey: 'evaluation_id' });
Question.belongsTo(Evaluation, { foreignKey: 'evaluation_id' });

// Relación entre Question y Option
Question.hasMany(Option, { foreignKey: 'question_id' });
Option.belongsTo(Question, { foreignKey: 'question_id' });
