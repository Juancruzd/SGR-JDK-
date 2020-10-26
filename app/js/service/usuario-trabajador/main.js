var uid = localStorage.getItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af");   
$(document).ready(function() {  
    /*auth.signOut().then(()=>{  
        localStorage.removeItem("b84eea7076a27fccba11fb66c9bb611a7872ed66eb593c9492afdc47e10d13af"); 
    }).then(()=>{ 
    });*/ 

    /**
     * Perfil
     **/
    db.collection('cuentasusuarios').doc(uid).onSnapshot(function(usuarioinfo) {    
        document.getElementById('nombreperfil').value = usuarioinfo.data().nombre;
        document.getElementById('apellidoperfil').value = usuarioinfo.data().apellido;
        document.getElementById('emailperfil').value = usuarioinfo.data().correo;
        ///select genero 
        fetch('https://mandujanokarol.github.io/SGR-JDK-/app/js/service/gender.json').then(function (respuesta) {
            if (respuesta.ok) {
                respuesta.json().then(dato => {
                    dato.forEach(function (entrada) {
                        var option = document.createElement("option");
                        option.value = entrada.Genero;
                        option.text = entrada.Genero;
                        if(usuarioinfo.data().genero==entrada.Genero){
                            option.setAttribute("selected", "selected");
                        }
                        document.getElementById("generoperfil").add(option);
                    });
                }).catch(function (error) {
                    floatingMessage("Obtener generos",error.message, "error");
                });
            } else {
                floatingMessage("Obtener generos",respuesta, "error");
            }
        }).catch(function (error) { 
            floatingMessage("Obtener generos",'Hubo un problema con la petición Fetch:' + error.message, "error");
        });
        ///select oficio
        fetch('https://mandujanokarol.github.io/SGR-JDK-/app/js/service/oficios.json').then(function (respuesta) {
        if (respuesta.ok) {
            respuesta.json().then(dato => {
                dato.forEach(function (entrada) {
                    var option = document.createElement("option");
                    option.value = entrada.Oficio;
                    option.text = entrada.Oficio;
                    if(usuarioinfo.data().oficio==entrada.Oficio){
                        option.setAttribute("selected", "selected");
                    }
                    document.getElementById("oficioperfil").add(option);
                });
            }).catch(function (error) {
                floatingMessage("Obtener oficios",error.message, "error");
            });
        } else {
            floatingMessage("Obtener oficios",respuesta, "error");
        }
    }).catch(function (error) { 
        floatingMessage("Obtener oficios",'Hubo un problema con la petición Fetch:' + error.message, "error");
    });
        document.getElementById('direccionperfil').value = usuarioinfo.data().direccion;
        document.getElementById('imagenperfil').src=usuarioinfo.data().imagen;
        document.getElementById('telefonoperfil').value=usuarioinfo.data().telefono;
        document.getElementById('nacimientoperfil').value=usuarioinfo.data().fechaNacimiento;
    });
});  
/**
 * Elementos para actualizar perfil
 */
var input = document.querySelector("#telefonoperfil");
var iti = window.intlTelInput(input, {
    // any initialisation options go here
    // initial country 
    initialCountry: "mx",
    //preferredCountries: ["mx","us" ],
    onlyCountries: ["mx"]
});

function onkeyuptelefono(){ 
    var tel=document.getElementById('telefonoperfil').value;
    tel=tel.replace("-","").replace("(","").replace(")","").replace(" ","");
    var arraytel=Array.from(tel) 
    var length=arraytel.length; 
    if(length>10){   
        arraytel.pop();   
        var phoneNumberString = arraytel.join('');
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/) 
        if (match) {
            document.getElementById('telefonoperfil').value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            document.getElementById('telefonoperfil').style = " ";
            return 0;
        } 
    }
    if(length==10){
        var phoneNumberString = tel;
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/) 
        if (match) {
            document.getElementById('telefonoperfil').value = '(' + match[1] + ') ' + match[2] + '-' + match[3];
            document.getElementById('telefonoperfil').style = " ";
            return 0;
        }  
    }
}
function onblurtelefono() {
    if (document.getElementById('telefonoperfil').value != "") {
        var tel=document.getElementById('telefonoperfil').value.replace("-","").replace("(","").replace(")","").replace(" ","");
        if (tel.length == 10) {
            document.getElementById('telefonoperfil').style = " ";
            return 0;
        } else {
            document.getElementById('telefonoperfil').style = "box-shadow: inset 0 0 0 4px #e60346;";
            return 1;
        }
    } else {
        document.getElementById('telefonoperfil').style = "box-shadow: inset 0 0 0 4px #e60346;";
        return 1;
    }
}
///date input 18 years
$(function () {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;// jan=0; feb=1 .......
    var day = dtToday.getDate();
    var year = dtToday.getFullYear() - 18;
    if (month < 10)
        month = '0' + month.toString();
    if (day < 10)
        day = '0' + day.toString();
    var minDate = year + '-' + month + '-' + day;
    var maxDate = year + '-' + month + '-' + day;
    $('#nacimientoperfil').attr('max', maxDate);
});
/**
 * Funcion para actualizar perfil
 */
const formactualizarperfil = document.forms['formactualizarperfil']; 
formactualizarperfil.addEventListener('submit', (e) => {
        e.preventDefault();   
        db.collection('cuentasusuarios').doc(uid).update({ 
            "nombre": document.getElementById('nombreperfil').value,
            "apellido": document.getElementById('apellidoperfil').value,
            "edad":getAge(document.getElementById('nacimientoperfil').value) ,
            "imagen": "img/perfil/perfil.png", 
            "telefono":  document.getElementById('telefonoperfil').value,
            "direccion": document.getElementById('direccionperfil').value, 
            "fechaNacimiento": document.getElementById('nacimientoperfil').value, 
            "genero": document.getElementById("generoperfil").value,
            "oficio": document.getElementById("oficioperfil").value
        }).then(function (result) { 
            floatingMessage("Actualizar perfil","Tu perfil fue actualizado", "success");
        }).catch(function (error) {
            floatingMessage(error.code, "", "firebase");
        }); 
});
function getAge(dateString) 
{ 
    var today = new Date(); 
    var birthDate = new Date(dateString); 
    var age = today.getFullYear() - birthDate.getFullYear(); 
    var m = today.getMonth() - birthDate.getMonth(); 
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    { 
     age--; 
    } 
    return age; 
}; 
/**
 * Funcion para postularse
 **/
function postularse(iddocempleo){ 
    db.collection("trabajos").where("estado", "<=", 1).get().then(function(trabajos) {
        trabajos.forEach(function(trabajo) { 
                db.collection('trabajos').doc(trabajo.id).collection('postulantes').doc().where("id_usuario_tra", "==", uid).get().then(function(postulante) {
                    if (!postulante.exists) {
                        db.collection('trabajos').doc(iddocempleo).collection('postulantes').doc().set({
                            "id_usuario_tra": uid,  
                            "fechaRegistro": new Date().toLocaleString(), 
                            "estado": parseInt(0)
                        }).then(function() {
                            floatingMessage("Postularse a Empleo","Te postulaste a el empleo", "success");
                        }).catch(function(error) {
                            floatingMessage(error.code, "", "firebase");
                        });
                    }else{
                        floatingMessage("Postularse a Empleo","Actualmente se encuentra postulado en otro empleo", "error");
                    } 
                }).catch(function(error) {
                    floatingMessage(error.code, "", "firebase");
                });
         });
    }).catch(function(error) {
        floatingMessage(error.code, "", "firebase");
    });
};
/**
 * Funcion para eliminar postulacion
 **/
function eliminarpostulacion(iddocempleo){
    db.collection('trabajos').doc(iddocempleo).collection('postulantes').doc().where("id_usuario_tra", "==", uid).delete().then(function() {
        floatingMessage("Eliminar postulacion","Postulacion eliminada", "success");
    }).catch(function(error) {
        floatingMessage(error.code, "", "firebase");
    });
};
/**
 * Mi empleo pendiente
 **/
function miempleopostulado(){
    db.collection("trabajos").where("estado", "==",0).onSnapshot(function(trabajos) { 
        trabajos.forEach(function(trabajo) { 
            db.collection('trabajos').doc(trabajo.id).collection('postulantes').doc().where("id_usuario_tra", "==",uid).get().then(function(postulate) {
                console.log(trabajo); 
            }).catch(function(error) {
                floatingMessage(error.code, "", "firebase");
            });
        });
    }).catch(function(error) {
        floatingMessage(error.code, "", "firebase");
    });
};
/**
 * Mi empleo en proceso
 **/
function miempleoenproceso(){
    db.collection("trabajos").where("estado", "==",1).onSnapshot(function(trabajos) { 
        trabajos.forEach(function(trabajo) { 
            db.collection('trabajos').doc(trabajo.id).collection('postulantes').doc().where("id_usuario_tra", "==",uid).get().then(function(postulate) {
                console.log(trabajo); 
            }).catch(function(error) {
                floatingMessage(error.code, "", "firebase");
            });
        });
    }).catch(function(error) {
        floatingMessage(error.code, "", "firebase");
    });
}

/**
 * Mis empleos terminados
 **/
function misempleostermiandos(){
    db.collection("trabajos").where("estado", "==",2).onSnapshot(function(trabajos) { 
        trabajos.forEach(function(trabajo) { 
            db.collection('trabajos').doc(trabajo.id).collection('postulantes').doc().where("id_usuario_tra", "==",uid).get().then(function(postulate) {
                console.log(trabajo); 
            }).catch(function(error) {
                floatingMessage(error.code, "", "firebase");
            });
        });
    }).catch(function(error) {
        floatingMessage(error.code, "", "firebase");
    });
}


window.onload = Inicializar;
var Fichero;

var storageRef;

var imagenRef;

  //inicializa la función en espera de algún cambio para ejecutar subirImagenFirebase
function Inicializar() {
    fichero = document.getElementById("fichero");
    fichero.addEventListener("change", subirImagenFirebase, false);
    storageRef = firebase.storage().ref();
   

}
function subirImagenFirebase() {
    var imagenSubir = fichero.files[0];
    var uploadTask = storageRef.child('imagenesperfiltrabajador/' + imagenSubir.name).put(imagenSubir);
    uploadTask.on('state_changed',
        function(snapshot) {
    //Proceso de subida
        },
        function(error) {
            //error de subida
            alert("Hubo un error")
        },
        function() {
            storageRef.child('imagenesperfiltrabajador/' + imagenSubir.name).getDownloadURL().then(function(url) {
                // Or inserted into an <img> element:
                crearNodoEnBDFirebase(imagenSubir.name, url);
                console.log(url);
            }).catch(function(error) {
                // Handle any errors
            });
        });
    }
    
    function crearNodoEnBDFirebase(nombrImage,Url){
        var user = firebase.auth().currentUser;
        if (user) {
            console.log(nombrImage)
            console.log(Url)
            console.log(user.uid)
        db.collection("cuentasusuarios").doc(user.uid).update({
        imagen: Url}
    ).then(function() {
        console.log("Registrado");
        }).catch(function(error) {
            console.error("Error adding document: ", error);
            alert("Error al registrar");
        });
    }
    else {
      console("No hay user logeado")
      }
    }