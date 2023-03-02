const passport = require('passport');
const mongoose = require('mongoose');
const Vacante = mongoose.model('Vacante');
const Usuarios = mongoose.model('Usuarios');
const crypto = require('crypto');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect : '/administracion',
    failureRedirect : '/iniciar-sesion', 
    failureFlash: true,
    badRequestMessage : 'Ambos campos son obligatorios'
});

// Revisar si el usuario esta autenticado o no
exports.verificarUsuario = (req, res, next) => {

    // revisar el usuario
    if(req.isAuthenticated()){
        return next(); // estan autenticados
    }

    // redireccionar
    res.redirect('/iniciar-sesion');

}

exports.mostrarPanel = async (req, res) => {


    // consultar el usuario autenticado
    const vacantes = await Vacante.find({ autor: req.user._id }).lean();
   //console.log(vacantes)

    res.render('administracion', {
        nombrePagina: 'Panel de Administración',
        tagline: 'Crea y Administra tus vacantes desde aquí',
        cerrarSesion: true,
        nombre : req.user.nombre,       
        imagen : req.user.imagen,                 
        vacantes
    })
}

exports.cerrarSesion = (req, res, next ) => {
    req.logout(function(err) {
        if (err) { 
          return next(err); 
          }
        return res.redirect('/');
      });

    req.flash('correcto', 'Cerraste Sesión Correctamente');
    return res.redirect('/iniciar-sesion');
}

/** Formulario para Reiniciar el password */
exports.formReestablecerPassword = (req, res ) => {
    res.render('reestablecer-password', {
        nombrePagina : 'Reestablece tu Password',
        tagline : 'Si ya tienes una cuenta pero olvidaste tu password, coloca tu email'
    })
}

// Genera el Token en la tabla del usuario
exports.enviarToken = async (req, res) => {
    const usuario = await Usuarios.findOne({ email: req.body.email });

    if(!usuario) {
        req.flash('error', 'No existe esa cuenta');
        return res.redirect('/iniciar-sesion');
    }

    // el usuario existe, generar token
    usuario.token = crypto.randomBytes(20).toString('hex');
    usuario.expira = Date.now() + 3600000;

    // Guardar el usuario
    await usuario.save();
    const resetUrl = `http://${req.headers.host}/reestablecer-password/${usuario.token}`;

    // console.log(resetUrl);

    // Enviar notificacion por email
    // await enviarEmail.enviar({
    //     usuario,
    //     subject : 'Password Reset',
    //     resetUrl,
    //     archivo: 'reset'
    // });

    // Todo correcto
    req.flash('correcto', 'Revisa tu email para las indicaciones');
    res.redirect('/iniciar-sesion');
}