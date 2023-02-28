module.exports = {
    seleccionarSkills : (seleccionadas = [], opciones) => {
        const skills = ['HTML5','CSS3','CSSGrid','Flexbox','JavaScript','JQuery'];
        let html = '';
        skills.forEach(skill => {
            html += `
                <li ${seleccionadas.includes(skill) ? ' class="activo"' : '' }>${ skill }</li>
            `
        });

        return opciones.fn().html = html
    }
    ,
    tipoContrato : (seleccionado,opciones) => {
       console.log(seleccionado)
       let html = ''
       html += '<option value="" disabled selected>-- Selecciona --</option>'
       html += '<option value="Freelance">Freelance</option>'
       html += '<option value="Tiempo Completo">Tiempo Completo</option>'
       html += '<option value="Medio Tiempo">Medio Tiempo</option>'
       html += '<option value="Por Proyecto">Por Proyecto</option>'

       return opciones.fn().html = html.replace(
        new RegExp(` value="${seleccionado}"`), '$& selected="selected"'
    )

      // opciones.fn(this).replace(new RegExp(` value="${ seleccionado }" `), '$& selected="selected"')
    }
}