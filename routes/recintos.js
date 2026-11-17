import express from 'express';
import Recinto from '../models/recintos.js';

const router = express.Router();

// GET /recintos/localidad/:nombre - obtiene los recintos que se encuentren en la localidad indicada
router.get(['/localidad/:nombre', '/recintos/localidad/:nombre'], async (req, res) => {
  try {
    const recintos = await Recinto.find({
      localidad: new RegExp(`^${req.params.nombre}$`, 'i')
    });
    if (recintos && recintos.length > 0) {
      return res.status(200).json({ resultado: recintos });
    }
    return res.status(404).json({ error: "No se han encontrado recintos de la localidad indicada" });
  } catch (err) {
    return res.status(404).json({ error: "No se han encontrado recintos de la localidad indicada" });
  }
});

// GET /recintos/:id - obtiene el recinto con el id indicado
router.get(['/:id', '/recintos/:id'], async (req, res) => {
  try {
    const recinto = await Recinto.findById(req.params.id);
    if (recinto) {
      return res.status(200).json({ resultado: recinto });
    }
    return res.status(404).json({ error: `Recinto ${req.params.id} no encontrado` });
  } catch (err) {
    return res.status(404).json({ error: `Recinto ${req.params.id} no encontrado` });
  }
});

// GET /recintos - obtiene un listado de todos los recintos almacenados
router.get(['/', '/recintos'], async (req, res) => {
  try {
    const recintos = await Recinto.find();
    if (recintos && recintos.length > 0) {
      return res.status(200).json({ resultado: recintos });
    }
    return res.status(500).json({ error: "No se han encontrado recintos" });
  } catch (err) {
    return res.status(500).json({ error: "No se han encontrado recintos" });
  }
});

// POST /recintos - añade un nuevo recinto a la colección
router.post(['/', '/recintos'], async (req, res) => {
  try {
    const nuevoRecinto = new Recinto(req.body);
    const resultado = await nuevoRecinto.save();
    return res.status(201).json({ resultado });
  } catch (err) {
    return res.status(500).json({ error: "Error añadiendo recinto" });
  }
});

// DELETE /recintos/:id - elimina el recinto con el id indicado
router.delete(['/:id', '/recintos/:id'], async (req, res) => {
  try {
    const recintoEliminado = await Recinto.findByIdAndDelete(req.params.id);
    if (recintoEliminado) {
      return res.status(200).json({ resultado: recintoEliminado });
    }
    return res.status(404).json({ error: `Error eliminando recinto ${req.params.id}` });
  } catch (err) {
    return res.status(404).json({ error: `Error eliminando recinto ${req.params.id}` });
  }
});

export default router;
