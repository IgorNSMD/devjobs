const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController.js')
const vacantesController = require('../controllers/vacantesController.js')
const usuariosController = require('../controllers/usuariosController.js');

module.exports = ()=> {
    router.get('/', homeController.MostrarTrabajos )

    // Crear Vacante
    router.get('/vacantes/nuevas',
    vacantesController.formularioNuevaVacante)

    router.post('/vacantes/nuevas',
    vacantesController.agregarVacante)

    // Mostrar Vacantes (singular)
    router.get('/vacantes/:url', vacantesController.mostrarVacante)

    // Editar vacante
    router.get('/vacantes/editar/:url',
        vacantesController.formEditarVacante)
    
    router.post('/vacantes/editar/:url', 
        vacantesController.editarVacante
    );

    // Crear Cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', 
        usuariosController.crearUsuario
    );
    
    return router;
}

