
# Introduccion

Esta app en angular esta dividida en 2 partes:

* [Pokedex](#Pokedex)
* [Monitor de rapsberry](#monitor-de-rapsberry)

# Pokedex

Integracion  parcial con api de web [PokeAPI](https://pokeapi.co) .

## Secciones integradas

* Listado de Pokemon
* Listado de movimientos de pokemon

# Monitor de rapsberry

Genera diversos graficos de la informacion obtenida tras conectarse mediante websockets.

En este caso se conecta espeficifamente a la ip de una rapsberry PI corriendo un websocket server en Nodejs, los graficos generados son:

1. Temperatura de procesador en grados Celcios
2. Velocidades de 4 cores
3. Porcentajes en idle, user, nice por cada core.


# WIP

Roll dicer en 3d 

## Pruebas unitarias
Para ejecutar las pruebas unitarias solo se debe ejcutar el comando `ng test`
 