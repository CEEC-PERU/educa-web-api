const classroomService = require('../../services/enterprise/classroomService');

// Obtener todas las aulas
const getAllClassrooms = async (req, res) => {
    try {
        const classrooms = await classroomService.getAllClassrooms();
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las aulas' });
    }
};

// Obtener un aula por su ID
const getClassroomById = async (req, res) => {
    try {
        const classroom = await classroomService.getClassroomById(req.params.id);
        if (classroom) {
            res.status(200).json(classroom);
        } else {
            res.status(404).json({ message: 'Aula no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el aula' });
    }
};

// Crear una nueva aula
const createClassroom = async (req, res) => {
    try {
        const newClassroom = await classroomService.createClassroom(req.body);
        res.status(201).json(newClassroom);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el aula' });
    }
};

// Actualizar un aula por su ID
const updateClassroom = async (req, res) => {
    try {
        const updatedClassroom = await classroomService.updateClassroom(req.params.id, req.body);
        if (updatedClassroom) {
            res.status(200).json(updatedClassroom);
        } else {
            res.status(404).json({ message: 'Aula no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el aula' });
    }
};

// Eliminar un aula por su ID
const deleteClassroom = async (req, res) => {
    try {
        const deleted = await classroomService.deleteClassroom(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Aula eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'Aula no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el aula' });
    }
};
const getClassroomsByEnterprise = async (req, res) => {
    try {
        const enterpriseId = req.params.enterprise_id;
        const classrooms = await classroomService.getClassroomsByEnterprise(enterpriseId);
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las aulas por enterprise_id' });
    }
};

const getClassroomsByEnterprisSupervisor = async (req, res) => {
    try {
        const enterpriseId = req.params.enterprise_id;
        const userId = req.params.user_id;
        const classrooms = await classroomService.getClassroomsByEnterprise(enterpriseId , userId);
        res.status(200).json(classrooms);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las aulas por enterprise_id' });
    }
};



module.exports = {
    getAllClassrooms,
    getClassroomsByEnterprisSupervisor,
    getClassroomById,
    createClassroom,
    updateClassroom,
    deleteClassroom,
    getClassroomsByEnterprise
};
