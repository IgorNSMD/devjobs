exports.MostrarTrabajos = (req,res) => {
    res.render('home',{
        nombrePagina : 'devJobs',
        tagline: 'Encuentra y publica trabajos para desarrolladores WEB',
        barra:true,
        boton:true
    })
}