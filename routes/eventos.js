import express from 'express';
import Evento from '../models/eventos.js';
import Recinto from '../models/recintos.js';

const router = express.Router();

// GET /eventos/localidad/:nombre - obtiene los eventos en la localidad indicada cuya fecha aún no haya pasado
router.get(['/localidad/:nombre', '/eventos/localidad/:nombre'], async (req, res) => {
  try {
    const recintos = await Recinto.find({
      localidad: new RegExp(`^${req.params.nombre}$`, 'i')
    });
    const recintoIds = recintos.map(r => r._id);

    const eventos = await Evento.find({
      recinto: { $in: recintoIds },
      fecha: { $gte: new Date() }
    }).populate('recinto');

    if (eventos && eventos.length > 0) {
      return res.status(200).json({ resultado: eventos });
    }
    return res.status(404).json({ error: "No se han encontrado eventos" });
  } catch (err) {
    return res.status(404).json({ error: "No se han encontrado eventos" });
  }
});

// GET /eventos/:id - obtiene el evento con el id indicado
router.get(['/:id', '/eventos/:id'], async (req, res) => {
  try {
    const evento = await Evento.findById(req.params.id).populate('recinto');
    if (evento) {
      return res.status(200).json({ resultado: evento });
    }
    return res.status(404).json({ error: `Evento ${req.params.id} no encontrado` });
  } catch (err) {
    return res.status(404).json({ error: `Evento ${req.params.id} no encontrado` });
  }
});

// GET /eventos - obtiene un listado de todos los eventos almacenados
router.get(['/', '/eventos'], async (req, res) => {
  try {
    const eventos = await Evento.find().populate('recinto');
    if (eventos && eventos.length > 0) {
      return res.status(200).json({ resultado: eventos });
    }
    return res.status(500).json({ error: "No se han encontrado eventos" });
  } catch (err) {
    return res.status(500).json({ error: "No se han encontrado eventos" });
  }
});

// POST /eventos - añade un nuevo evento a la colección
router.post(['/', '/eventos'], async (req, res) => {
  try {
    const nuevoEvento = new Evento(req.body);
    const resultado = await nuevoEvento.save();
    return res.status(201).json({ resultado });
  } catch (err) {
    return res.status(500).json({ error: "Error añadiendo evento" });
  }
});

// PUT /eventos/:id - actualiza los datos del evento con el id indicado
router.put(['/:id', '/eventos/:id'], async (req, res) => {
  try {
    const eventoActualizado = await Evento.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (eventoActualizado) {
      return res.status(200).json({ resultado: eventoActualizado });
    }
    return res.status(404).json({ error: `Error actualizando evento ${req.params.id}` });
  } catch (err) {
    return res.status(404).json({ error: `Error actualizando evento ${req.params.id}` });
  }
});

// DELETE /eventos/:id - elimina el evento con el id indicado
router.delete(['/:id', '/eventos/:id'], async (req, res) => {
  try {
    const eventoEliminado = await Evento.findByIdAndDelete(req.params.id);
    if (eventoEliminado) {
      return res.status(200).json({ resultado: eventoEliminado });
    }
    return res.status(404).json({ error: `Error eliminando evento ${req.params.id}` });
  } catch (err) {
    return res.status(404).json({ error: `Error eliminando evento ${req.params.id}` });
  }
});

export default router;
