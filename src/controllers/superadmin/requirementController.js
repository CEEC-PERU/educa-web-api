const Requirement = require('../../models/Requirement');
const User = require('../../models/UserModel');
const requirementService = require('../../services/superadmin/requirementService');
const Profile = require('../../models/profileModel');
const Enterprise = require('../../models/EnterpriseModel');
const cloudinaryService = require('../../services/superadmin/fileService');

const createRequirement = async (req, res) => {
  try {
    const { user_id, proposed_date, course_name, message, course_duration, is_active } = req.body;

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const materialsUrls = await Promise.all(
      req.files.map(async (file) => {
        const filename = `${file.originalname}`;
        const result = await cloudinaryService.uploadBuffer(file.buffer, 'requirements', filename);
        return result.secure_url;
      })
    );

    const requirement = await requirementService.createRequirement({
      user_id,
      proposed_date,
      course_name,
      message,
      course_duration,
      material: JSON.stringify(materialsUrls),
      is_active: is_active === 'true' // Convierte el valor a booleano
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
    deleteRequirement,
  };
