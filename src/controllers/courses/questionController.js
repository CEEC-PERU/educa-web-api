// src/controllers/questionController.js
const questionService = require('../../services/courses/questionService');

const imageService = require('../../services/images/imageService');
const fs = require('fs');

exports.uploadQuestionImage = async (req, res) => {
  try {
    const imagePath = req.file.path;
    const imageUrl = await imageService.uploadImage(imagePath, 'Preguntas'); // Especificar carpeta 'Preguntas'
    
    fs.unlinkSync(imagePath); // Elimina el archivo local después de subirlo a Cloudinary
    
    res.json({ url: imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(400).json({ error: 'Error uploading image' });
  }
};


exports.createQuestion = async (req, res) => {
  try {
    const questionData = req.body;
    const newQuestion = await questionService.createQuestion(questionData);
    res.status(201).json(newQuestion);
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({ error: 'Error creating question' });
  }
};


exports.getQuestionsByEvaluationId = async (req, res) => {
  try {
    const questions = await questionService.getQuestionsByEvaluationId(req.params.evaluationId);
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
};
