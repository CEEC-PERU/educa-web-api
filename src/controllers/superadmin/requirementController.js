const Requirement = require('../../models/Requirement');
const User = require('../../models/UserModel');
const requirementService = require('../../services/superadmin/requirementService');
const Profile = require('../../models/profileModel');
const Enterprise = require('../../models/EnterpriseModel');
const cloudinaryService = require('../../services/superadmin/fileService');

const createRequirement = async (req, res) => {
  try {
    const { user_id, proposed_date, course_name, message, course_duration, is_active } = req.body;

    console.log("Files received:", req.files);

    if (!req.files || !req.files.materials) {
      throw new Error('No materials found');
    }

    const materialsUrls = await Promise.all(
      req.files.materials.map(async (file) => {
        const result = await cloudinaryService.uploadBuffer(file.buffer, 'requirements', file.originalname);
        console.log("Uploaded file URL:", result.secure_url);
        return result.secure_url;
      })
    );

    console.log("All file URLs:", materialsUrls);

    const requirement = await requirementService.createRequirement({
      user_id,
      proposed_date,
      course_name,
      message,
      course_duration,
      materials: materialsUrls, // Guardar como array de strings
      is_active: is_active === 'true' // Convertir el valor a booleano
    });

    res.status(201).json(requirement);
  } catch (error) {
    console.error('Error creating requirement:', error);
    res.status(500).json({ error: 'Error creating requirement' });
  }
};


const getAllRequirements = async (req, res) => {
  try {
    const requirements = await Requirement.findAll({
      include: [
        {
          model: User,
          as: 'user',
          include: [
            {
              model: Profile,
              as: 'userProfile',
            },
            {
              model: Enterprise,
              as: 'enterprise',
            },
          ],
        },
      ],
    });
    res.status(200).json(requirements);
  } catch (error) {
    console.error('Error fetching requirements:', error);
    res.status(500).json({ error: 'Error fetching requirements' });
  }
};

const updateRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;
    await Requirement.update(updatedFields, { where: { requirement_id: id } });
    const updatedRequirement = await Requirement.findByPk(id);
    res.status(200).json(updatedRequirement);
  } catch (error) {
    console.error('Error updating requirement:', error);
    res.status(500).json({ error: 'Error updating requirement' });
  }
};


const deleteRequirement = async (req, res) => {
  try {
    await requirementService.deleteRequirement(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting requirement' });
  }
};

module.exports = {
  createRequirement,
  getAllRequirements,
  updateRequirement,
  deleteRequirement,
};
