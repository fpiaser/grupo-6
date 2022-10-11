module.exports = (sequelize, dataTypes) => {
    let alias = 'Products';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        
        nombre: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        descripcion: {
            type: dataTypes.STRING(100),
            allowNull: false
        },
        uom: {
            type: dataTypes.DECIMAL(3,1),
            allowNull: false
        },
        id_categoria: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        },
        precio:{
            type: dataTypes.INTEGER,
            allowNull: false
        },
        image:{
            type: dataTypes.STRING(100),
            allowNull: false
        }
        
    };
    let config = {
        tableName: 'products',
        timestamps: false/*,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'delete_at'*/
    };
    const Products = sequelize.define(alias, cols, config);
    
    Products.associate = function(models){

        Products.belongsTo(models.Categoria,{
            as:'categoria',
            foreignKey: 'id_categoria',
            //target_key: 'id'
        }),

        Products.belongsTo(models.Unidad_Medida,{
            as:'unidad_medida',
            foreignKey: 'uom',
            //target_key: 'uom'

        })
    }


return Products
};