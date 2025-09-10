const mongoose = require('mongoose');
const productoModel = new mongoose.Schema(
    {
        producto: {type: String},
        precio: {type: Number},
        category: {type: String},
        stock: {type: Number},
    },
    {
        timestamps:true,
        versionKey:false,
    }
)

const ModelProducto = mongoose.model("productos", productoModel);
module.exports = ModelProducto;