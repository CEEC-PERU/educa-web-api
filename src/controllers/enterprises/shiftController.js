// controllers/shiftController.js
const shiftService = require('../../services/enterprise/shiftService');

// Obtener todos los turnos
const getAllShifts = async (req, res) => {
    try {
        const shifts = await shiftService.getAllShifts();
        res.status(200).json(shifts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los turnos' });
    }
};

// Obtener un turno por su ID
const getShiftById = async (req, res) => {
    try {
        const shift = await shiftService.getShiftById(req.params.id);
        if (shift) {
            res.status(200).json(shift);
        } else {
            res.status(404).json({ message: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el turno' });
    }
};

// Crear un nuevo turno
const createShift = async (req, res) => {
    try {
        const newShift = await shiftService.createShift(req.body);
        res.status(201).json(newShift);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el turno' });
    }
};

// Actualizar un turno por su ID
const updateShift = async (req, res) => {
    try {
        const updatedShift = await shiftService.updateShift(req.params.id, req.body);
        if (updatedShift) {
            res.status(200).json(updatedShift);
        } else {
            res.status(404).json({ message: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el turno' });
    }
};

// Eliminar un turno por su ID
const deleteShift = async (req, res) => {
    try {
        const deleted = await shiftService.deleteShift(req.params.id);
        if (deleted) {
            res.status(200).json({ message: 'Turno eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Turno no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el turno' });
    }
};

module.exports = {
    getAllShifts,
    getShiftById,
    createShift,
    updateShift,
    deleteShift
};
