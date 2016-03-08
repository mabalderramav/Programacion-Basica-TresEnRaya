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
function inicializarControles()
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

    document.addEventListener("keydown", documentTeclado_Events, false);
}
function Punto(x,y)
{
    this.X = x;
    this.Y = y;
}
var teclas = {
    UP: 38,
    DOWN: 40,
    LETF:37,
    RIGHT: 39,
    ENTER: 13
};
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
    lienzo.fillStyle = "#fff";
    lienzo.lineWidth = 8;
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
function showJuego()
{
    showJuegoA();
    showJuegoB();
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
function showJuegoB()
{
    var puntos = getPuntosMatriz(matrizB);
    if(puntos)
    {
        for (var i = 0; i < puntos.length; i++)
        {
            var punto = puntos[i];
            dibujarCruz( punto.Y + 1, punto.X + 1, "green");
        }
    }
}
function iniciarJuego()
{
    var punto = getPuntoMatriz(matrizJuego);
    dibujarCirculo( punto.Y + 1, punto.X + 1, "red");
    setJuegoB();
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
function controlJuego(punto,valor,isJugadorA)
{
    if(isJugadorA)
    {
        var aux = matrizB[punto.X][punto.Y];
        if(aux == valor)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        var aux = matrizA[punto.X][punto.Y];
        if(aux == valor)
        {
            return false;
        }
        else
        {
            return true;
        }
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
function setMatrizB(punto, valor)
{
    matrizB[punto.X][punto.Y] = valor;
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
    if(controlJuego(punto, 1, true))
    {
        setMatrizA(punto, 1);
    }
}
function setJuegoB()
{
    var aux = false;
    while(!aux)
    {
        var x = aleatorio(0, columnas - 1);
        var y = aleatorio(0, filas - 1);
        var punto = new Punto(x, y);
        if(controlJuego(punto, 1, false))
        {
            setMatrizB(punto, 1);
            aux = true;
        }
    }
}
/*
 * Funcion de Inicio
*/
function inicio()
{
    InicializarCanvas();
    inicializarControles();
    iniciarJuego();
    showJuego();
    //var x = aleatorio(1, columnas);
    //var y = aleatorio(1, filas);
    //dibujarCruz(x,y, "blue");
}
/*
 * Events
*/
function btnRigth_Events()
{
    if(moverDerecha())
    {
        showJuego();
    }
}
function btnLeft_Events()
{
    if(moverIzquierda())
    {
        showJuego();
    }
}
function btnUp_Events()
{
    if(moverArriba())
    {
        showJuego();
    } 
}
function btnDown_Events()
{
    if(moverAbajo())
    {
        showJuego();
    } 
}
function btnGame_Events()
{
    setJuegoA();
    setJuegoB();
    InicializarCanvas();
    showJuego();
}
function documentTeclado_Events(datos)
{
    var codigo = datos.keyCode;
    if(codigo == teclas.ENTER)
    {
        setJuegoA();
        setJuegoB();
        InicializarCanvas();
        showJuego();
    }
    if(codigo == teclas.UP)
    {
        if(moverArriba())
        {
            showJuego();
        }
    }
    if(codigo == teclas.DOWN)
    {
        if(moverAbajo())
        {
            showJuego();
        }
    }
    if(codigo == teclas.LETF)
    {
        if(moverIzquierda())
        {
            showJuego();
        }
    }
    if(codigo == teclas.RIGHT)
    {
        if(moverDerecha())
        {
            showJuego();
        }
    }
}