const path = require('path');

const mainController = {
    home: (req, res)=>{
        res.render('../views/home',{
            pagina: "Inicio",
            styles: "/css/home.css",
        })
    },
}

module.exports = mainController;