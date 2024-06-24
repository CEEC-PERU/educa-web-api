const Evaluation = require('../../models/evaluationModel');
const Question = require('../../models/questionModel');
const Option = require('../../models/optionModel');

exports.createEvaluation = async (evaluationData) => {
  try {
    return await Evaluation.create(evaluationData);
  } catch (error) {
    console.error('Error creating evaluation:', error);
    throw new Error('Error creating evaluation');
  }
};

exports.getEvaluations = async () => {
  try {
    return await Evaluation.findAll();
  } catch (error) {
    console.error('Error fetching evaluations:', error);
    throw new Error('Error fetching evaluations');
  }
};


exports.getEvaluationById = async (id) => {
  try {
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) {
      console.error(`Evaluation with id ${id} not found`);
      throw new Error('Evaluation not found');
    }
    const questions = await Question.findAll({
      where: { evaluation_id: id },
      attributes: ['question_id', 'evaluation_id', 'question_text', 'type_id', 'score', 'image', 'created_at', 'updated_at'] // Asegúrate de que esto está correcto
    });
    for (const question of questions) {
      const options = await Option.findAll({ where: { question_id: question.question_id } });
      question.setDataValue('options', options);
    }
    return { evaluation, questions };
  } catch (error) {
    console.error('Error fetching evaluation by id:', error);
    throw new Error('Error fetching evaluation by id');
  }
};


exports.updateEvaluation = async (id, evaluationData, questionsData) => {
  try {
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) {
      throw new Error('Evaluation not found');
    }
    await evaluation.update(evaluationData);

    if (!Array.isArray(questionsData)) {
      throw new Error('questionsData should be an array');
    }

    for (const questionData of questionsData) {
      let question = await Question.findByPk(questionData.question_id);
      if (question) {
        await question.update(questionData);
      } else {
        question = await Question.create({ ...questionData, evaluation_id: id });
      }
      
      // Actualizar o crear opciones
      for (const optionData of questionData.options) {
        let option;
        if (optionData.option_id) {
          option = await Option.findByPk(optionData.option_id);
          if (option) {
            await option.update(optionData);
          } else {
            option = await Option.create({ ...optionData, question_id: question.question_id });
          }
        } else {
          option = await Option.create({ ...optionData, question_id: question.question_id });
        }
      }
    }
    return evaluation;
  } catch (error) {
    console.error('Error updating evaluation:', error);
    throw new Error('Error updating evaluation');
  }
};

exports.deleteEvaluation = async (id) => {
  try {
    const evaluation = await Evaluation.findByPk(id);
    if (!evaluation) {
      throw new Error('Evaluation not found');
    }
    await evaluation.destroy();
  } catch (error) {
    console.error('Error deleting evaluation:', error);
    throw new Error('Error deleting evaluation');
  }
};
