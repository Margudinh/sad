var mongoose = require('mongoose');

module.exports = mongoose.model('Animal', {
    nombre: {
        type: String
    },
    especie: {
        type: String
    },
    pesoAprox: {
        type: Number
    },
    edadMax:{
        type: Number
    },
    imagen:{
        type: String
    },
    colores:{
        type: [String]
    },
    pelos:{
        type: [String]
    },
    categorias:{
        type: [String]
    }
});