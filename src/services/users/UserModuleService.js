const User = require('../../models/UserModel');
const Module = require('../../models/moduleModel');
const UserModuleProgress = require('../../models/UserModuleProgress');


async function createUserModuleProgress(moduleprogressData) {
    return UserModuleProgress.create(moduleprogressData);
}
  
async function getUserModuleProgress(progressmodule_id) {
    return UserModuleProgress.findByPk(progressmodule_id);
}
  
//todavia falta para actualizar 
async function updateUserModuleProgress(user_id, moduleprogressData) {
    return UserModuleProgress.update(moduleprogressData, { where: { user_id } });
}
  
async function deleteProfile(progressmodule_id) {
    return UserModuleProgress.destroy({ where: { user_module_progress_id : progressmodule_id} });
}
  
async function getAllModuleProgress() {
    return UserModuleProgress.findAll();
}

  
module.exports = {
    createUserModuleProgress,
    getUserModuleProgress,
    updateUserModuleProgress,
    deleteProfile,
    getAllModuleProgress
};