'user strict'
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../service/jwt');
dateFormat = require('dateformat');
var Empleado = require('../models/empleado');
var shortid = require('shortid');
var nodemailer = require('nodemailer');


/***** mirar que el correo llegue al empleado */
function saveEmpleado(req, res) {
    var empleado = new Empleado();
    var params = req.body;

    empleado.nombre = params.nombre;
    empleado.apellidos = params.apellidos;
    empleado.email = params.email;
    empleado.password = params.password;
    empleado.telefono1 = params.telefono1;
    empleado.telefono2 = params.telefono2;
    empleado.estado = "ACTIVADO";
    empleado.fechaCreacion = dateFormat(new Date(), "yyyy-mm-dd HH:MM:ss");
    empleado.role = 'ROLE_EMPLEADO';

    if (params.password) {
        //encriptar contraseña y guaradar datos
        bcrypt.hash(params.password, null, null, function (err, hash) {
            empleado.password = hash;

            if (empleado.nombre != null && empleado.apellidos != null && empleado.email != null) {
                //Emial no se repita
                Empleado.findOne({ email: empleado.email }, function (err, results) {
                    if (err) {
                        res.status(500).send({ message: 'Error al buscar al empleado' });

                    } else if (results) {
                        res.status(404).send({ message: 'Email ya esta repetido' });

                    } else {//guadar usuario
                        empleado.save((err, empleadoStored) => {
                            if (err) {
                                res.status(500).send({ message: 'Error al guardar el empleado' });
                            } else {
                                if (!empleadoStored) {
                                    res.status(404).send({ message: 'No se ha registrado el usuario empleado' });

                                } else {
                                    res.status(200).send({ empleado: empleadoStored });

                                }

                            }
                        });
                    }
                });

            } else {
                res.status(200).send({ message: 'Rellana todos los campos' });
            }
        })
    } else {
        res.status(200).send({ message: 'Introduce la contraseña' });
    }
}

function cambiarEstado(req, res) {
    var empleadoId = req.params.id;
    var params = req.body;
    var estado = params.estado;

    Empleado.update({ "_id": empleadoId }, { "$set": { "estado": estado } }, (err, empleadoEUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al modificar el empleado' });
        } else {
            if (!empleadoEUpdated) {
                res.status(404).send({ message: 'El empleado no se ha sido actualizado' });
            } else {
                res.status(200).send({ empleado: empleadoEUpdated });
            }
        }
    });
}

function loginEmpleado(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    Empleado.findOne({ email: email.toLowerCase() }, (err, empleado) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!empleado) {
                res.status(404).send({ message: 'El correo o contraseña incorrecta' });
            } else {
                //si existe el usuario comprobamos contraseña
                bcrypt.compare(password, empleado.password, function (err, check) {
                    if (check) {
                        if (params.gethash) {
                            //devolver un token jwt
                            res.status(200).send({
                                token: jwt.createToken(empleado)
                            })
                        } else {
                            res.status(200).send({ empleado });
                        }
                    } else {
                        res.status(404).send({ message: 'Correo o contraseña incorrecta' });
                    }
                });
            }
        }
    });

}
function getEmpleado(req, res) {
    var empleadoId = req.params.id;

    Empleado.findById(empleadoId, (err, empleado) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!empleado) {
                res.status(404).send({ message: 'El nombre empleado no existe.' });
            } else {
                res.status(200).send({ empleado: empleado });
            }
        }
    });
}

function getEmpleados(req, res) {

    Empleado.find({}).sort('nombre').exec(function (err, empleados) {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!empleados) {
                res.status(404).send({ message: 'No hay nombres de empleados' });
            } else {
                res.status(200).send({ empleados: empleados });
            }
        }
    });
}

function updateEmpleado(req, res) {
    var empleadoId = req.params.id;
    var update = req.body;

    Empleado.findByIdAndUpdate(empleadoId, update, (err, empleadoEUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al modificar el empleado' });
        } else {
            if (!empleadoEUpdated) {
                res.status(404).send({ message: 'El empleado no se ha sido actualizado' });
            } else {
                res.status(200).send({ empleado: empleadoEUpdated });
            }
        }
    });
}

function deleteEmpleado(req, res) {
    var empleadoId = req.params.id;

    Empleado.findByIdAndRemove(empleadoId, (err, empleadoRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar el empleado' });
        } else {
            if (!empleadoRemoved) {
                res.status(404).send({ message: 'El empleado no ha sido eliminado' });
            } else {
                res.status(200).send({ empleado: empleadoRemoved });

            }
        }
    });

}


/** PONER UNA VARIABLE CORREO EN LA LIENEA 219 , del correo que se obtiene por parametro */
function sendEmail(req, res) {
    var email = req.body.email;
    Empleado.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!user) {
                res.status(404).send({ message: 'El correo es incorrecto' });

            } else {

                var id = user._id;
                var passwordNew = shortid.generate();

                var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'pruebacrm6@gmail.com',
                        pass: '1357zh9l'
                    }
                });

                var mailOptions = {
                    from: 'Remitente',
                    to: 'melani.elisabeht.1992@gmail.com',
                    subject: 'Cambiar Contraseña',
                    text: 'Tu nueva contraseña de CRM es: ' + passwordNew
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        res.status(500).send({ message: err.message });
                    } else {
                        //Cambiar contraseña
                        bcrypt.hash(passwordNew, null, null, function (err, hash) {

                            Empleado.update({ "_id": id }, { "$set": { "password": hash } }, (err, empleadoUpdate) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error al actualizar el usuario.' });
                                } else {
                                    if (!empleadoUpdate) {
                                        res.status(404).send({ message: 'No se ha podido cambiar la contraseña del usuario.' });
                                    } else {
                                        res.status(200).send({ empleado: empleadoUpdate });
                                    }
                                }
                            });
                        });

                    }
                });


            }
        }
    });
}

function changePassword(req, res) {
    var empleadoId = req.params.id;
    var params = req.body;

    var passwordCurrent = params.passwordCurrent;
    var password1 = params.password1;
    var password2 = params.password2;


    if (empleadoId != req.user.sub) { //req.user.
        return res.status(404).send({ message: 'No tienes permiso para actualizar este usuario' });
    }
    if (password1 == '' || password2 == '') {
        return res.status(404).send({ message: 'Los campos estan vacios' });
    }
    // if (password1.length < 6 || password2.length < 6) {
    //     return res.status(404).send({ message: 'la contraseña tiene menos de 6 caracteres' });
    // }

    if (password1 != password2) {
        return res.status(500).send({ message: 'La contraseña son distintas, intentelo de nuevo.' });
    }

    Empleado.findById(empleadoId, (err, empleado) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición.' });
        } else {
            if (!empleado) {
                res.status(404).send({ message: 'No se ha encontrado el usuario.' });
            } else {

                bcrypt.compare(passwordCurrent, empleado.password, function (err, check) {
                    if (check) {

                        bcrypt.hash(password1, null, null, function (err, hash) {
                            Empleado.update({ "_id": empleado._id }, { "$set": { "password": hash } }, (err, empleadoUpdate) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error al actualizar el usuario.' });
                                } else {
                                    if (!empleadoUpdate) {
                                        res.status(404).send({ message: 'No se ha podido cambiar la contraseña del usuario.' });
                                    } else {
                                        res.status(200).send({ empleado: empleadoUpdate });
                                    }
                                }
                            });

                        });

                    } else {
                        return res.status(404).send({ message: 'La contraseña actual no coincide con la bd' });

                    }

                });

            }
        }

    });


}

module.exports = {
    loginEmpleado,
    saveEmpleado,
    cambiarEstado,
    getEmpleado,
    getEmpleados,
    updateEmpleado,
    deleteEmpleado,
    sendEmail,
    changePassword
};