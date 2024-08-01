// Importación de modelos
const User = require('./UserModel');
const Enterprise = require('./EnterpriseModel');
const Role = require('./RolModel');
const AppSession = require('./appSessionModel');
const Profile = require('./profileModel');
const Category = require('./categoryModel');
const Professor = require('./professorModel');
const Course = require('./courseModel');
const Level = require('./levelModel');
const Requirement = require('./Requirement');
const Module = require('./moduleModel');
const Session = require('./sessionModel');
const Evaluation = require('./evaluationModel');
const Question = require('./questionModel');
const Option = require('./optionModel');
const QuestionType = require('./questionTypeModel');
const CourseStudent = require('./courseStudent');
const UserModuleProgress = require('./UserModuleProgress');
const UserSessionProgress = require('./UserSessionProgress');
const EvaluationCourseResult  = require('./EvaluationCourseResult');
const Video = require('./videoModel'); 
const EvaluationModuleResult = require('./EvaluationModuleResult'); 
const Video = require('./videoModel'); 
const FlashCard = require('./FlashcardModel'); 




// Un Curso puede tener varios FlashCards
Course.hasMany(FlashCard, {
    foreignKey: 'course_id',
    as: 'flashcards'
  });
  
  // Un FlashCard pertenece a un Curso
  FlashCard.belongsTo(Course, {
    foreignKey: 'course_id',
    as: 'course'
  });


// Asociación
Video.belongsTo(Session, {foreignKey: 'session_id' });
Session.hasMany(Video, {foreignKey: 'session_id'});


Requirement.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

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

// Asociación
Video.belongsTo(Session, {foreignKey: 'session_id' });
Session.hasMany(Video, {foreignKey: 'session_id'});

//EvaluationModuleResult

Evaluation.hasMany(EvaluationModuleResult, { foreignKey: 'evaluation_id' });
Module.hasMany(EvaluationModuleResult, { foreignKey: 'module_id' });
User.hasMany(EvaluationModuleResult, { foreignKey: 'user_id' });

EvaluationModuleResult.belongsTo(Evaluation, { foreignKey: 'evaluation_id' });
EvaluationModuleResult.belongsTo(Module, { foreignKey: 'module_id' });
EvaluationModuleResult.belongsTo(User, { foreignKey: 'user_id' });

//EvalationCourseResult

Evaluation.hasMany(EvaluationCourseResult, { foreignKey: 'evaluation_id' });
Course.hasMany(EvaluationCourseResult, { foreignKey: 'course_id' });
User.hasMany(EvaluationCourseResult, { foreignKey: 'user_id' });

EvaluationCourseResult.belongsTo(Evaluation, { foreignKey: 'evaluation_id' });
EvaluationCourseResult.belongsTo(Course, { foreignKey: 'course_id' });
EvaluationCourseResult.belongsTo(User, { foreignKey: 'user_id' });


// UserModuleProgress
Module.hasMany(UserModuleProgress, { foreignKey: 'module_id' ,  as: 'usermoduleprogress'});
UserModuleProgress.belongsTo(Module, { foreignKey: 'module_id' });

User.hasMany(UserModuleProgress , { foreignKey: 'user_id' } );
UserModuleProgress.belongsTo(User, { foreignKey: 'user_id' });

//UserSessionPregress
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
Course.hasMany(Module, { foreignKey: 'course_id', as: 'courseModules', onDelete: 'CASCADE', hooks: true});
Module.belongsTo(Course, { foreignKey: 'course_id', as: 'moduleCourse' });

// Relación entre Module y Session
Module.hasMany(Session, { foreignKey: 'module_id', as: 'moduleSessions', onDelete: 'CASCADE', hooks: true });
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