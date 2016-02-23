/*
 * Variables
*/
var dibujo, lienzo;
var ancho = 400, alto = 400;
var anchoInicio = ancho - ancho;
var altoInicio = alto - alto;
var columnas = 3;
var anchoColumna = ancho / columnas;
var filas = 3;
var altoFila = alto / filas;
var matrizJuego = [ [0,0,0],
                    [0,1,0],
                    [0,0,0] ];
var matrizA = [ [0,0,0],
                [0,0,0],
                [0,0,0] ];
var matrizB = [ [0,0,0],
                [0,0,0],
                [0,0,0] ];
/*
 * Funciones
*/
function InicializarCanvas()
{
    dibujo = document.getElementById("canvasDibujo");
    lienzo = dibujo.getContext("2d");

    dibujo.width = ancho;
    dibujo.height = alto;

    var puntoA = new Punto(anchoInicio,altoInicio);
    var puntoB = new Punto(ancho,alto);

    dibujarRectangulo(puntoA, puntoB, "#000");
    dibujarGrilla();
}
function inicializarcontroles()
{
    var btnRigth = document.getElementById("btnRigth");
    var btnLeft = document.getElementById("btnLeft");
    var btnUp = document.getElementById("btnUp");
    var btnDown = document.getElementById("btnDown");
    var btnGame = document.getElementById("btnGame");

    btnRigth.addEventListener("click",btnRigth_Events,false);
    btnLeft.addEventListener("click",btnLeft_Events,false);
    btnUp.addEventListener("click",btnUp_Events,false);
    btnDown.addEventListener("click",btnDown_Events,false);
    btnGame.addEventListener("click",btnGame_Events,false);
}
function Punto(x,y)
{
    this.X = x;
    this.Y = y;
}
function aleatorio(minimo,maximo)
{
    var numero = Math.floor(Math.random() * (maximo - minimo + 1) + minimo);
    return numero;
}
function dibujarLinea(puntoA,puntoB, color)
{
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.moveTo(puntoA.X, puntoA.Y);
    lienzo.lineTo(puntoB.X, puntoB.Y);
    lienzo.stroke();
    lienzo.closePath();
}
function dibujarRectangulo(puntoA, puntoB, color)
{
    var puntoAux = new Punto(puntoB.X,puntoB.Y);
    puntoAux.Y -= puntoB.Y;
    dibujarLinea(puntoA, puntoAux, color);
    dibujarLinea(puntoAux, puntoB, color);
    puntoAux.X -= puntoB.X;
    puntoAux.Y += puntoB.Y;
    dibujarLinea(puntoAux, puntoB, color);
    dibujarLinea(puntoA, puntoAux, color);
}
function dibujarCirculo(fila, columna, color)
{
    var radio = anchoColumna / 2;
    var x = (anchoColumna * columna) - radio;
    var y = (altoFila * fila) - radio;
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.fillStyle = color;
    lienzo.arc(x, y, radio - 20, Math.PI * 2, false);
    lienzo.fill();
    lienzo.closePath();
    lienzo.stroke();
}
function dibujarCruz(fila, columna, color)
{
    var x1 = anchoColumna * columna;
    var y2 = altoFila * fila;
    var y1 = y2 - altoFila;
    var x2 = x1 - anchoColumna;
    var limiteX = 20;
    var limiteY = 20;

    var puntoA = new Punto(x1 - limiteX, y1 + limiteY);
    var puntoB = new Punto(x2 + limiteX, y2 - limiteY);
    dibujarLinea(puntoA, puntoB, color);

    puntoA = new Punto(x2 + limiteX, y1 + limiteY);
    puntoB = new Punto(x1 - limiteX, y2 - limiteY);
    dibujarLinea(puntoA, puntoB, color);
}
function dibujarColumnas()
{
    for (var i = 1; i < columnas; i++)
    {
        var x = i * anchoColumna;
        var y = anchoInicio;
        var puntoA = new Punto(x, y);
        y = alto;
        var puntoB = new Punto(x, y);
        dibujarLinea(puntoA, puntoB);
    }
}
function dibujarFilas()
{
    for (var i = 1; i < filas; i++)
    {
        var y = i * altoFila;
        var x = altoInicio;
        var puntoA = new Punto(x, y);
        x = ancho;
        var puntoB = new Punto(x, y);
        dibujarLinea(puntoA, puntoB);           
    }
}
function dibujarGrilla()
{
    dibujarColumnas();
    dibujarFilas();
}
function showJuegoA()
{
    var puntos = getPuntosMatriz(matrizA);
    if(puntos)
    {
        for (var i = 0; i < puntos.length; i++)
        {
            var punto = puntos[i];
            dibujarCirculo( punto.Y + 1, punto.X + 1, "green");
        }
    }
}
function iniciarJuego()
{
    var punto = getPuntoMatriz(matrizJuego);
    dibujarCirculo( punto.Y + 1, punto.X + 1, "red");
}
function getPuntoMatriz(matriz)
{
    for (var f = 0; f < matriz.length; f++)
    {
        var col = matriz[f];
        for (var c = 0; c < col.length; c++)
        {
            var aux = col[c];
            if (aux == 1)
            {
                var punto = new Punto(f,c);
                return punto;
            }
        }
    }
    return false;
}
function getPuntosMatriz(matriz)
{
    var v = [];
    var x = 0;
    for (var f = 0; f < matriz.length; f++)
    {
        var col = matriz[f];
        for (var c = 0; c < col.length; c++)
        {
            var aux = col[c];
            if (aux == 1)
            {
                var punto = new Punto(f,c);
                v[x] = punto;
                x++;
            }
        }
    }
    if(v.length > 0)
    {
        return v;
    }
    else
    {
        return false;
    }
}
function setMatriz(punto,valor)
{
    matrizJuego[punto.X][punto.Y] = valor;
}
function setMatrizA(punto,valor)
{
    matrizA[punto.X][punto.Y] = valor;
}
function rowsLength()
{
    return matrizJuego.length;
}
function columnsLength()
{
    var col = matrizJuego[0];
    return col.length;
}
function moverDerecha()
{
    var punto = getPuntoMatriz(matrizJuego);
    if(punto.X + 1 < columnsLength())
    {
        setMatriz(punto,0);
        punto.X += 1;
        setMatriz(punto,1);
        InicializarCanvas();
        dibujarCirculo(punto.Y + 1, punto.X + 1, "red");
        return true;
    }
    else
    {
        return false;
    }
}
function moverIzquierda()
{
    var punto = getPuntoMatriz(matrizJuego);
    if(punto.X - 1 >= 0)
    {
        setMatriz(punto,0);
        punto.X -= 1;
        setMatriz(punto,1);
        InicializarCanvas();
        dibujarCirculo(punto.Y + 1, punto.X + 1, "red");
        return true;
    }
    else
    {
        return false;
    }
}
function moverArriba()
{
    var punto = getPuntoMatriz(matrizJuego);
    if(punto.Y - 1 >= 0)
    {
        setMatriz(punto,0);
        punto.Y -= 1;
        setMatriz(punto,1);
        InicializarCanvas();
        dibujarCirculo(punto.Y + 1, punto.X + 1, "red");
        return true;
    }
    else
    {
        return false;
    }
}
function moverAbajo()
{
    var punto = getPuntoMatriz(matrizJuego);
    if(punto.Y + 1 < columnsLength())
    {
        setMatriz(punto,0);
        punto.Y += 1;
        setMatriz(punto,1);
        InicializarCanvas();
        dibujarCirculo(punto.Y + 1, punto.X + 1, "red");
        return true;
    }
    else
    {
        return false;
    }
}
function setJuegoA()
{
    var punto = getPuntoMatriz(matrizJuego);
    setMatrizA(punto, 1);
}
/*
 * Funcion de Inicio
*/
function inicio()
{
    InicializarCanvas();
    inicializarcontroles();
    iniciarJuego();
    showJuegoA();
    dibujarCruz(1,3, "blue");
}
/*
 * Events
*/
function btnRigth_Events()
{
    if(moverDerecha())
    {
        showJuegoA();
    }
}
function btnLeft_Events()
{
    if(moverIzquierda())
    {
        showJuegoA();
    }
}
function btnUp_Events()
{
    if(moverArriba())
    {
        showJuegoA();
    } 
}
function btnDown_Events()
{
    if(moverAbajo())
    {
        showJuegoA();
    } 
}
function btnGame_Events()
{
    setJuegoA();
    InicializarCanvas();
    showJuegoA();
}