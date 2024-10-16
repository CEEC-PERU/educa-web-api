const Classroom = require('../../models/Classroom');
const Enterprise = require('../../models/EnterpriseModel');
const Shift = require('../../models/ShiftModel');
const User = require('../../models/UserModel');
const Profile = require('../../models/profileModel');
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
    try {
        const classrooms = await Classroom.findAll({
            where: {
                enterprise_id: enterpriseId
            },
            include: [
                {
                    model: Enterprise,
                },
                {
                    model: Shift,
                },
                {
                    model: User,
                    attributes: ['user_id'], // Fetch only user_id from User
                    include: [
                        {
                            model: Profile,
                            attributes: ['first_name', 'last_name'], // Fetch name details from Profile
                            as: 'userProfile' 
                        }
                    ]
                }
            ]
        });
        return classrooms;
    } catch (error) {
        console.error('Error fetching classrooms:', error);
        throw error; // Re-throw the error to handle it in the calling function
    }
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
