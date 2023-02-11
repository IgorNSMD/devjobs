module.exports = {
    seleccionarSkills : (seleccionadas = [], opciones) => {
        const skills = ['HTML5','CSS3','CSSGrid','Flexbox','JavaScript','JQuery'];
        let html = '';
        skills.forEach(skill => {
            html += `
                <li>${ skill }</li>
            `
        });

        return opciones.fn().html = html
    }
}