function carica(){
    $.ajax({
        url: 'https://run.mocky.io/v3/77094d70-fc75-4e4a-a1c8-54e29846dcec',
        type: 'get',
        success: function(data){

            const articoli=data.articles;

            let contenuto=""

            data.articles.forEach(function(articolo) {
                contenuto+=`<div class= "articolo">
                <img src=${articolo.urlToImage} class="miaclasse">
                <h1>
                <a href=${articolo.url} class="linktitle"> ${articolo.title}</a>
                </h1>
                <p>${articolo.content}</p>
                </div>`

            }); 
            $('#notizie').html(contenuto)

        }

    })

   
}
carica();

function formulario() {
    var valido = 0;
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("appellidos");
    var telefono = document.getElementById("telefono");
    var correo = document.getElementById("correo");
    var valCorreo = /^(.+@.+\..+)$/;
    var abono = $("#mesesabono");
    var precio = 9;
    var plus = $(".plus1");
    var descuento = 0.05;
    var preciofin = 0;

   
    if (nombre.value.length <= 15 && isNaN(nombre.value)) {
        valido++;
    }

    
    if (apellidos.value.length <= 40 && isNaN(apellidos.value)) {
        valido++;
    }

    
    if (telefono.value.length == 9 && !isNaN(telefono.value)) {
        valido++;
    }

   
    if (valCorreo.test(correo.value)) {
        valido++;
    }

   
    if (valido >= 3) {
        if (parseInt(abono.val()) < 12 && parseInt(abono.val()) > 0) { 
            var descuentototal = descuento * parseInt(abono.val());
            preciofin = precio * parseInt(abono.val());
            preciofin = preciofin - (preciofin * descuentototal);

           
            plus.each(function() {
                if ($(this).prop('checked')) {
                    preciofin += 10; 
                }
            });

           
            $("#resultado").text("$" + preciofin.toFixed(2));
        }
    }
}

function formulario() {
    var valido = 0;
    var nombre = document.getElementById("nombre");
    var apellidos = document.getElementById("appellidos");
    var telefono = document.getElementById("telefono");
    var correo = document.getElementById("correo");
    var valCorreo = /^(.+@.+\..+)$/;
    var abono = $("#mesesabono");
    var precio = 9;
    var plus = $(".plus1");
    var descuento = 0.05;
    var preciofin = 0;

   
    var abonoVal = parseInt(abono.val());
    if (abonoVal < 1 || isNaN(abonoVal)) {
        abonoVal = 1;
        abono.val(abonoVal);}

     if (parseInt(abono.val()) >= 1 && parseInt(abono.val()) <= 12) {
        var descuentototal = descuento * parseInt(abono.val());
        preciofin = precio * parseInt(abono.val());
        preciofin = preciofin - (preciofin * descuentototal);



        

        plus.each(function() {
            if ($(this).prop('checked')) {
                preciofin += 10;
            }
        });

        
        $("#resultado").text("$" + preciofin.toFixed(2));
        
    }
}
$(document).ready(function() {
    $("#envio").click(function() {
        var valido = 0;
        var nombre = $("#nombre").val();
        var apellidos = $("#appellidos").val();
        var telefono = $("#telefono").val();
        var correo = $("#correo").val();
        var abono = $("#mesesabono").val();

        
        if (nombre.length <= 15 && isNaN(nombre)) valido++;
        if (apellidos.length <= 40 && isNaN(apellidos)) valido++;
        if (telefono.length == 9 && !isNaN(telefono)) valido++;
        if (/^(.+@.+\..+)$/.test(correo)) valido++;
        if (parseInt(abono) >= 1 && parseInt(abono) <= 12) valido++;

       
        if (valido >= 3) {
            if ($("#privacy").prop('checked')) {
                alert("Formulario enviado correctamente");
              
            } else {
                alert("Debes aceptar la política de privacidad.");
            }
        } else {
            alert("Debes completar todos los campos obligatorios para enviar el formulario.");
        }
    });

    
    $("#producto, #mesesabono, .plus1").on("change input", function() {
        formulario(); 
    });

   
    $("#reset").click(function() {
        $("#nombre, #appellidos, #telefono, #correo, #mesesabono").val('');
        $(".plus1").prop('checked', false);
        $("#privacy").prop('checked', false);
        $("#resultado").text(""); 
    });
});

    



const map = L.map('map').setView([41.4036, 2.1744], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const sagradaFamilia = L.latLng(41.4036, 2.1744); 
L.marker(sagradaFamilia).addTo(map)
    .bindPopup("<b>Sagrada Familia</b>")
    .openPopup();


function calcularuta() {
   
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            
            const userLocation = L.latLng(position.coords.latitude, position.coords.longitude);

           
            map.setView(userLocation, 13);

            
            L.marker(userLocation).addTo(map)
                .bindPopup("<b>Tu ubicacion</b>")
                .openPopup();

            
            L.Routing.control({
                waypoints: [
                    userLocation,
                    sagradaFamilia
                ],
                routeWhileDragging: true 
            }).addTo(map);
        }, function(error) {
            
            alert("no ha sido posible geolocalizarte");
        });
    } 
}


calcularuta();
