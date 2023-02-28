const express = require('express')
const router = express.Router();
const homeController = require('../controllers/homeController.js')
const vacantesController = require('../controllers/vacantesController.js')
const usuariosController = require('../controllers/usuariosController.js');
const authController = require('../controllers/authController.js');

module.exports = ()=> {
    router.get('/', homeController.MostrarTrabajos )

    // Crear Vacante
    router.get('/vacantes/nuevas',
    authController.verificarUsuario,    
    vacantesController.formularioNuevaVacante)

    router.post('/vacantes/nuevas',
    authController.verificarUsuario,    
    vacantesController.agregarVacante)

    // Mostrar Vacantes (singular)
    router.get('/vacantes/:url', vacantesController.mostrarVacante)

    // Editar vacante
    router.get('/vacantes/editar/:url',
        authController.verificarUsuario,    
        vacantesController.formEditarVacante)
    
    router.post('/vacantes/editar/:url', 
        authController.verificarUsuario,    
        vacantesController.editarVacante
    );

    // Crear Cuentas
    router.get('/crear-cuenta', usuariosController.formCrearCuenta);
    router.post('/crear-cuenta', 
        usuariosController.validarRegistro,
        usuariosController.crearUsuario
    );
    
    // Autenticar Usuarios
    router.get('/iniciar-sesion', usuariosController.formIniciarSesion);
    router.post('/iniciar-sesion',authController.autenticarUsuario);

    // Panel de administración
    router.get('/administracion',
        authController.verificarUsuario,    
        authController.mostrarPanel
    );

    // Editar Perfil
    router.get('/editar-perfil', 
        authController.verificarUsuario,
        usuariosController.formEditarPerfil
    );
    router.post('/editar-perfil', 
        authController.verificarUsuario,
        usuariosController.editarPerfil
    )
    return router;
}

