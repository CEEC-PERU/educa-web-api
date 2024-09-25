const Classroom = require('../../models/Classroom');
const Enterprise = require('../../models/EnterpriseModel');
const Shift = require('../../models/ShiftModel');
// Obtener todas las aulas (classrooms)
const getAllClassrooms = async () => {
    return await Classroom.findAll();
};


// Obtener un aula por su ID
const getClassroomById = async (id) => {
    return await Classroom.findByPk(id);
};

// Crear una nueva aula
const createClassroom = async (classroomData) => {
    return await Classroom.create(classroomData);
};

// Actualizar un aula por su ID
const updateClassroom = async (id, classroomData) => {
    const classroom = await Classroom.findByPk(id);
    if (classroom) {
        return await classroom.update(classroomData);
    }
    return null;
};

// Eliminar un aula por su ID
const deleteClassroom = async (id) => {
    const classroom = await Classroom.findByPk(id);
    if (classroom) {
        await classroom.destroy();
        return true;
    }
    return false;
};

const getClassroomsByEnterprise = async (enterpriseId) => {
    return await Classroom.findAll({
        where: {
            enterprise_id: enterpriseId
        },
        include: [
            {
                model: Enterprise
            },
            {
                model:Shift
            }
        ]
    });
};

const getClassroomsByEnterpriseSupervisor = async (enterpriseId , userId) => {
    return await Classroom.findAll({
        where: {
            enterprise_id: enterpriseId,
            user_id : userId
        },
        include: [
            {
                model: Enterprise
            },
            {
                model:Shift
            }
        ]
    });
};

module.exports = {
    getAllClassrooms,
    getClassroomsByEnterpriseSupervisor,
    getClassroomById,
    createClassroom,
    updateClassroom,
    deleteClassroom,
    getClassroomsByEnterprise
};
