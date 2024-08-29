const CourseStudent = require('../../models/courseStudent');
const Course = require('../../models/courseModel');
const Category = require('../../models/categoryModel');
const Profesor = require('../../models/professorModel');
const Nivel = require('../../models/levelModel');
const Module = require('../../models/moduleModel');
const Session = require('../../models/sessionModel');
const Evaluation = require('../../models/evaluationModel');
const Question = require('../../models/questionModel');
const Option = require('../../models/optionModel');
const UserModuleProgress = require('../../models/UserModuleProgress');
const UserSessionProgress = require('../../models/UserSessionProgress');
const QuestionType = require('../../models/questionTypeModel');
const User = require('../../models/UserModel');
const Enterprise = require('../../models/EnterpriseModel'); 
const CourseResult = require('../../models/EvaluationCourseResult'); // Asegúrate de que la ruta es correcta
const { Op, fn, col, literal, Sequelize } = require('sequelize');
const ModuleResult = require('../../models/EvaluationModuleResult');
const AppSession = require('../../models/appSessionModel');
const Profile = require('../../models/profileModel'); // Importar el modelo Profile


