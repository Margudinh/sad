//Requerimientos
var express = require('express')
var mongoose = require('mongoose')
//var db = require('./app/db')
var routes = require('./app/routes')
var bodyParser = require('body-parser')
var multer = require('multer')
var path = require('path')
var db = require('./app/config/db')

//Iniciar el almacenamiento de imagenes
var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file, callback){
        callback(null, file.fieldname + '-' + Date.now()  + path.extname(file.originalname));
    },
    
});

//Iniciar la subida de imagenes
var upload = multer({
    storage: storage,
    fileFilter: function(req,file,callback){
        checkFileType(file,callback);
    }

}).single('img');

//Funcion que verifica que solo se puedan subir imagenes
function checkFileType(file, callback){
    var allowedExt = /jpeg|jpg|png|gif|bmp/;
    var extname = allowedExt.test(path.extname(file.originalname).toLowerCase());

    var mimetype = allowedExt.test(file.mimetype);

    if(extname && mimetype){
        return callback(null,true)
    }else{
        return callback('Solo se aceptan imagenes');
    }
}


//Inicializacion del servidor
var app = express();
var port = 8000;

//Uso de public como recurso estatico
app.use(express.static('./public'));
app.use('/static', express.static('public'))

//Utilizacion del body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Conexion con mongo
mongoose.connect(db.url);
 

app.post("/",(req,res) =>{
    res.json(req.body);
});


app.listen(8000, () => console.log(`Servidor iniciado en http://127.0.0.1:${port}`) );




