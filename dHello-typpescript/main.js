var minharvar = 'Minha variavel';
function minhaFunc(x, y) {
    return x + y;
}
//ES6 ou ES 2015
var num = 2;
var pi = 3.14145241413;
var numeros = [1, 2, 3];
numeros.map(function (valor) {
    return valor * 2;
});
numeros.map(function (valor) { return valor * 2; }); //es 2015
var Matematica = /** @class */ (function () {
    function Matematica() {
    }
    Matematica.prototype.Soma = function (x, y) {
        return x + y;
    };
    return Matematica;
}());
var n1 = 'abcde';
n1 = 4;
