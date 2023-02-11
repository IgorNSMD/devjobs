exports.formularioNuevaVacante = (req,res) =>{
    //res.send('funciona..')
    res.render('nueva-vacante',{
        nombrePagina: 'Nueva Vacante',
        tagLine: 'LLena el formulario y publica tu vacante'
    })
}