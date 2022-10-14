const fs = require('fs');
const path = require('path');
const productListPath = path.resolve(__dirname, '../data/products.json');
const productList = JSON.parse(fs.readFileSync(productListPath, 'utf8'));


const db = require('../src/database/models');
const sequelize = db.sequelize;
const Op = db.Sequelize.Op;
const Products = require('../src/database/models/Products');
const Categoria = require('../src/database/models/Categoria');
const Unidad_Medida = require('../src/database/models/Unidad_Medida');

const { validationResult } = require('express-validator');
const { Sequelize } = require('../src/database/models');


const apiEndpoint = {

    allProducts:(req,res)=>{
        db.Products.findAll(
            {include: ['categoria']}
        )
        .then(products=>{
            let respuesta = {
                meta: {
                    status: 200,
                    total: products.length,
                    url: "/api/products",
                    last_url:"/api/products/" + products.length
                },
                
                data: products.map(product => {
                    return{
                        id: product.id,
                        nombre: product.nombre,
                        descripcion: product.descripcion,
                        categoria: product.categoria,
                        detail: "/api/products/" + product.id,
                        image: "/images/" + product.image,
                        url: "/product/" + product.id
                    }
                })
            }
            res.json(respuesta)
        })
    },

    productDetail:(req,res)=>{
        db.Products.findByPk(
            req.params.id,
            {include: ['categoria','unidad_medida']}
            )
        .then(product=>{
            let respuesta = {
                meta:{
                    status: 200,
                    total: product.id.length,
                },
                data: {
                        id: product.id,
                        nombre: product.nombre,
                        descripcion: product.descripcion,
                        precio: product.precio,
                        uom: product.unidad_medida,
                        categoria: product.categoria,
                        image: "/images/" + product.image,
                        url: "/product/" + product.id
}
            }
            res.json(respuesta)
        })
    },

    allUsers:(req,res)=>{
        db.Users.findAll()
        .then(users=>{
            let respuesta = {
                meta: {
                    status: 200,
                    total: users.length,
                    url: "/api/users"
                },
                
    data: users.map(user => {
                    return{
                        id: user.id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        email: user.email,
                        detail: "/api/users/" + user.id
                    }
                })
            }
            res.json(respuesta)
        })
    },

    userDetail:(req,res)=>{
        db.Users.findByPk(req.params.id)
        .then(user=>{
            let respuesta = {
                meta:{
                    status: 200,
                    total: user.id.length,
                    url: "/api/users/" + user.id
                },
                data: {
                        id: user.id,
                        nombre: user.nombre,
                        apellido: user.apellido,
                        email: user.email,
                        image: "/img/usersImg/" + user.image,
}
            }
            res.json(respuesta)
        })
    },

    categorias:(req,res)=>{
        db.Categoria.findAll()
        .then(categoria=>{
            let respuesta = {
                meta: {
                    status: 200,
                    total: categoria.length,
                    url: "/api/categorias"
                },
                
                data: categoria
                
            }
            res.json(respuesta)
        })
    },
}

module.exports=apiEndpoint;