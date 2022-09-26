const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const uploadFile=  require('../middlewares/multer');
const authMiddleware = require('../middlewares/authMiddleware');
const guestMiddleware = require('../middlewares/guestMiddleware');
const { body } = require('express-validator');


const validationResult=[
    body('nombre')
    .notEmpty().withMessage('Debe ingresar un nombre')
    .isLength({min:5}).withMessage('El nombre debe tener al menos 5 caracteres'),
    body('descripcion')
    .notEmpty().withMessage('Debe ingresar una descripción')
    .isLength({min:20}).withMessage('El nombre debe tener al menos 20 caracteres'),
    body('precio')
    .notEmpty().withMessage('Debe ingresar el precio'),
    body('uom')
    .custom((value, { req }) => {
        if (req.value === 0) {
            return false;
        }
        return true;
    }
).withMessage('Debe seleccionar la Unidad de medida'),
    body('imagen')
    .custom((value, { req }) => {
        if (req.files.length === 0) {
            return false;
        }
        return true;
    }
).withMessage('Debe subir una imagen')
];

//Ruta productos
// ACCESIBLE POR CUALQUIERA
router.get('/', productController.product);

//Ruta ver carrito
// ACCESIBLE POR CUALQUIERA
router.get('/carrito', productController.productCart);


//Ruta crear producto
// ACCESIBLE SOLO CON LOGIN (sino redirige al login)
router.get('/nuevoProducto',authMiddleware, productController.newProduct);
router.post('/',authMiddleware, uploadFile.single('imagen'),validationResult, productController.storeProduct);

//Ruta editar Producto
// ACCESIBLE SOLO CON LOGIN (sino redirige al login)
router.get('/modificarProducto/:id',authMiddleware, productController.modProduct);
router.put('/:id',authMiddleware,validationResult, productController.updateProduct);

//Ruta de eliminar un producto
// ACCESIBLE SOLO CON LOGIN (sino redirige al login)
router.delete('/:id',authMiddleware, productController.deleteProduct);

//Ruta de un producto
// ACCESIBLE POR CUALQUIERA
router.get('/:id', productController.productDetail);

module.exports = router;