const path = require('path');

const productController = {
    product: (req, res)=>{
        res.send('AQUÍ VA LA LISTA DE LOS PRODUCTOS');
},

    productDetail:(req, res)=>{
        let id= req.params.id;
        res.send("ESTE ES EL DETALLE DEL PRODUCTO" + ' ' + id),{
            pagina: "Detalles de Producto",
            styles: "/css/styles_detail.css"
        }
        
    },    
    productCart: (req, res) => {
        res.render('../views/products/productCart',{
            pagina: "Carrito de Compras",
            styles: "/css/carrito.css"
        })
    },
    newProduct: (req, res) => {
        res.render('../views/products/newProduct',{
            pagina: "Nuevo Producto",
            styles: "/css/registro.css"
        })
        
    },
    modProduct: (req, res) => {
        res.render('../views/products/modProduct',{
            pagina: "Modificar Producto",
            styles: "/css/registro.css"
        })
        
    } 
}

module.exports =productController;