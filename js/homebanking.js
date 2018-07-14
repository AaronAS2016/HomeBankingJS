/*Paginas de referencia: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Destructuring_assignment,   
                         https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/typeof  
                         https://www.w3schools.com/jsref/jsref_isnan.asp 
                         https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Operadores/Conditional_Operator*/



//Declaración de variables
var saldoCuenta = 3800;
var nombreUsuario = "Aaron Saban";
var limiteExtraccion = 1000;

var agua = {
    precio : 350,
    nombre : "agua"
}
var telefono = {
    precio : 425,
    nombre : "telefono"
} 
var luz = {
    precio : 210,
    nombre : "luz"
} 
var internet = {
    precio : 570,
    nombre : "internet"
}

var cuentaAmiga1 = 1234567,
    cuentaAmiga2 = 7654321;

var codigoLogin = 1234;

var saldoDolares = 0;
var cotizacionDolar = 28;

//Ejecución de las funciones que actualizan los valores de las variables en el HTML.
window.onload = function() {
    iniciarSesion();
    cargarNombreEnPantalla();
    actualizarSaldoEnPantalla();
    actualizarLimiteEnPantalla();
    actualizarSaldoDolaresEnPantalla();
}

//Funciones que tenes que completar
function cambiarLimiteDeExtraccion() {
    var limiteActual = limiteExtraccion;
    var nuevolimiteExtracion = parseInt(prompt("Ingrese el nuevo límite de extracción: "));
    if(verificarCampo(nuevolimiteExtracion)){
        cambiarLimite(nuevolimiteExtracion);
        actualizarLimiteEnPantalla();
        alert(`Su límite de extracción era de: $${limiteActual}.\nSu nuevo límite es: $${nuevolimiteExtracion}.`)
    }else{
        alert("Verifique el valor del nuevo límite sea correcto")
    }
}
 

function extraerDinero() {
    var saldoActual = saldoCuenta;
    var dineroAExtraer = parseInt(prompt("Ingrese el saldo a extraer: "));
    if(!verificarCampo(dineroAExtraer)){
        alert("Verifique el valor del dinero a depositar sea correcto")
    }
    else if(!haySaldoDisponible(dineroAExtraer)){
        alert("No hay saldo disponible en tu cuenta para extraer esa cantidad de dinero.")
    }
    else if(superaLimiteExtraccion(dineroAExtraer)){
        alert("La cantidad de dinero que deseas extraer es mayor a tu límite de extracción")
    }else if(!sePuedeEntregarEn100(dineroAExtraer) ){
        alert("Solo puedes extraer billetes de 100");
    }
    else{
        restarSaldo(parseInt(dineroAExtraer));
        actualizarSaldoEnPantalla();
        alert(`Ha extraído: $${dineroAExtraer}.\nSaldo anterior: $${saldoActual}.\nSaldo nuevo: $${saldoCuenta}.`)
    }
    
}

function depositarDinero() {
    var saldoACtual = saldoCuenta;
    var dineroADepositar = parseInt(prompt("Ingrese el saldo a depositar: "));
    if(verificarCampo(dineroADepositar)){
        sumarSaldo(dineroADepositar);
        actualizarSaldoEnPantalla();
        alert(`Ha depositado: $${dineroADepositar}.\nSaldo anterior: $${saldoACtual}.\nSaldo nuevo: $${saldoCuenta}.`)
    }else{
        alert("Verifique que el dinero ingresado a depositar sea valido")
    }


}

function depositarPagoServicio(servicio){
    var {precio, nombre} = servicio;
    var saldoAnterior = saldoCuenta;
    if(!haySaldoDisponible(precio)){
        alert("No hay saldo disponible en tu cuenta para pagar este servicio.")
    }
    else{
        restarSaldo(parseInt(precio));
        actualizarSaldoEnPantalla();
        alert(`Haz pagado el servicio de ${nombre}\nSaldo anterior: $${saldoAnterior}.\nDinero descontado: $${precio}\nSaldo actual: $${saldoCuenta}.`)
    }
}


function transferirDinero() {
    var dineroATransferir = parseInt(prompt("Ingrese el dinero que quiere transferir:"))
    if(!verificarCampo(dineroATransferir)){
        alert("Verifique el dinero ingresado sea valido")
    }
    else if(haySaldoDisponible(dineroATransferir)){
        var cuentaATransferir = prompt("Ingrese el numero de la cuenta amiga que quiere transferir:")
        if(esCuentaAmiga(cuentaATransferir)){
            restarSaldo(dineroATransferir)
            actualizarSaldoEnPantalla()
            alert(`Se ha transferido $${dineroATransferir}\nCuenta Destino: ${cuentaATransferir} `)
        }else{
            alert("Solo se puede transferir a una cuenta amiga")
        }
    }
    else{
        alert("No hay saldo disponible en tu cuenta para transferir esa cantidad")
    }

}

function compraDeDolares(){
    var dolaresAComprar = parseInt(prompt(`Ingrese la cantidad de dólares a comprar:\nCotización actual: 1 u$s = $${cotizacionDolar}`));
    var saldoAnterior = saldoCuenta;
    if(verificarCampo(dolaresAComprar)){
        valorDeLaCompraDeDolares = dolaresAComprar * cotizacionDolar;
        if(haySaldoDisponible(valorDeLaCompraDeDolares)){
            var codigoIngresado = parseInt(prompt("Vuelva a ingresar el código de iniciar sesión para confirmar la compra de dólares: "));
            if(verificarLogin(codigoIngresado)){
                restarSaldo(valorDeLaCompraDeDolares)
                sumarSaldoDolar(dolaresAComprar);
                actualizarSaldoEnPantalla();
                actualizarSaldoDolaresEnPantalla();
                alert(`Haz comprado : u$s ${dolaresAComprar} \nSaldo anterior: $${saldoAnterior}.\nDinero descontado: $${valorDeLaCompraDeDolares}\nSaldo actual: $${saldoCuenta}.\nSaldo actual en dólares: u$s ${saldoDolares}`)
            }else{
                alert("Código incorrecto, anulando operación");
            }
          
        }else{
            alert("No hay saldo disponible en tu cuenta para comprar esa cantidad de dolares")
        }
    }else{
        alert("Ingrese un valor de dólares a comprar valido")
    }
}

function iniciarSesion() {
    var codigoIngresado = parseInt(prompt("Ingrese el código para iniciar sesión"))
    if(verificarLogin(codigoIngresado)){
        alert(`Bienvenido/a ${nombreUsuario} ya puedes comenzar a realizar operaciones`)
    }
    else{
        alert(`Código incorrecto. Tu dinero ha sido retenido por cuestiones de seguridad`)
        saldoCuenta = 0;
        nombreUsuario = "";
    }
}


//Funciones creadas
function sumarSaldo(saldo){
    saldoCuenta += saldo;
}

function sumarSaldoDolar(saldo){
    saldoDolares += saldo;
}

function restarSaldo(saldo){
    saldoCuenta -= saldo;
}

function cambiarLimite(nuevolimite){
    limiteExtraccion = nuevolimite;
}

function haySaldoDisponible(dineroADepositar){
    return ( saldoCuenta > dineroADepositar) ? true : false;
}

function superaLimiteExtraccion(dineroADepositar){
    return ( dineroADepositar > limiteExtraccion) ? true : false;
}

function sePuedeEntregarEn100(dineroAExtraer){
    return ((dineroAExtraer % 100) == 0) ? true : false; 
}

function esCuentaAmiga(cuenta){
    return (cuenta == cuentaAmiga1 || cuenta == cuentaAmiga2) ? true : false;
}

function pagarServicio() {
    var servicioAPagar = parseInt(prompt("Ingrese el número que corresponde con el servicio que queres pagar\n 1 - Agua\n 2 - Luz\n 3 - Internet\n 4 - Telefóno"));
    switch(servicioAPagar){
        case 1:
            depositarPagoServicio(agua)
            break
        case 2:
            depositarPagoServicio(luz)
            break
        case 3:
            depositarPagoServicio(internet)
            break
        case 4:
            depositarPagoServicio(telefono)
            break
        default:
            alert("No existe el servicio que se ha seleccionado")
    }
}


function verificarCampo(campo){
    return isNaN(campo) ? false : true;
}

function verificarLogin(codigoIngresado){
    return (codigoIngresado == codigoIngresado) ? true : false;
}

//Funciones que actualizan el valor de las variables en el HTML
function cargarNombreEnPantalla() {
    document.getElementById("nombre").innerHTML = "Bienvenido/a " + nombreUsuario;
}

function actualizarSaldoEnPantalla() {
    document.getElementById("saldo-cuenta").innerHTML = "$" + saldoCuenta;
}

function actualizarLimiteEnPantalla() {
    document.getElementById("limite-extraccion").innerHTML = "Tu límite de extracción es: $" + limiteExtraccion;
}

function actualizarSaldoDolaresEnPantalla(){
    document.getElementById("saldo-dolares").innerHTML = "Tu saldo en dolares es: u$s " + saldoDolares;
}