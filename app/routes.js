var Animal = require('./models/animal');
var routename = '/animalesdomesticos';
var fs = require('fs');

module.exports = function(app,upload){
    
    app.post(routename, (req,res) => {
        
        
        upload(req, res, (err) =>{
            if(req.file == undefined){
                res.json({"error":"No se envio correctamente la imagen"});
                return;
            }
            if(err){
                res.json({"error": err});
            }else{
                
                Animal.create({
                    nombre: req.body.nombre.toLowerCase(),
                    especie: req.body.especie.toLowerCase(),
                    pesoAprox: req.body.pesoAprox,
                    edadMax: req.body.edadMax,
                    imagen: req.file.filename,
                    colores: req.body.colores.toLowerCase().split(','),
                    pelos: req.body.pelos.toLowerCase().split(','),
                    categorias: req.body.categorias.toLowerCase().split(',')
                },function(err,animal){
                    if(err){
                        res.json({"error": err})
                    }else{
                        res.json(animal);
                    }
                });
                //res.json({"imagen": req.file, "data": req.body});
                

                
            }
        });
    });

    //  |   ||
    //  ||  |_ 
    app.delete(routename+'/:animal_id', (req,res) => {
        Animal.findOneAndRemove({
            _id: req.params.animal_id
        },function(err,animal){
            if(err){
                res.json({"error": err});
            }else{
                fs.unlink("./public/uploads/" + animal.imagen, (error)=>{
                    //console.log(error);
                });
                res.json(animal);
            }
        });
        
        

    });

    //Busquedas
    app.get(routename,(req,res) =>{
        //Busqueda General
        if(req.query.hasOwnProperty("all")){
            Animal.find({},function(err,animal){
                if(err){
                    res.json({"error":err});
                }else{
                    res.json(animal);
                }
            })
        }
        //Busqueda Especifica
        else{
            Animal.find(req.query,function(err,animal){
                if(err){
                    res.json({"error": err});
                }else{
                    res.json(animal);
                }
            })
        }
    
    })

    app.get('*',function(req,res){
        res.sendFile(__dirname + "./public/index.html")
    })
}