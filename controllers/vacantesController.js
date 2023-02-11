const mongoose = require('mongoose')
const Vacante = mongoose.model('Vacante')

exports.formularioNuevaVacante = (req,res) =>{
    //res.send('funciona..')
    res.render('nueva-vacante',{
        nombrePagina: 'Nueva Vacante',
        tagLine: 'LLena el formulario y publica tu vacante'
    })
}

//Agregar vacantes a la base de datos
exports.agregarVacante = async(req,res) => {
    const vacante = new Vacante(req.body)
    //console.log(req.body)

    //Crear arreglos de habilidades
    vacante.skills = req.body.skills.split(',')
    console.log(vacante)

    // almacenar en la base de datos
    const nuevaVacante = await vacante.save()

    //Redireccionar
    res.redirect(`/vacantes/${ nuevaVacante.url }`);

}