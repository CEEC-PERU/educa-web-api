// services/shiftService.js
const Shift = require('../../models/ShiftModel');

// Obtener todos los turnos
const getAllShifts = async () => {
    return await Shift.findAll();
};

// Obtener un turno por su ID
const getShiftById = async (id) => {
    return await Shift.findByPk(id);
};

// Crear un nuevo turno
const createShift = async (shiftData) => {
    return await Shift.create(shiftData);
};

// Actualizar un turno por su ID
const updateShift = async (id, shiftData) => {
    const shift = await Shift.findByPk(id);
    if (shift) {
        return await shift.update(shiftData);
    }
    return null;
};

// Eliminar un turno por su ID
const deleteShift = async (id) => {
    const shift = await Shift.findByPk(id);
    if (shift) {
        await shift.destroy();
        return true;
    }
    return false;
};

module.exports = {
    getAllShifts,
    getShiftById,
    createShift,
    updateShift,
    deleteShift
};
