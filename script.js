// Solicitar al usuario que ingrese un número
var numCeldas = prompt("Ingresa el Numero de tu Rifa");

// Convertir el valor ingresado a un número entero
numCeldas = parseInt(numCeldas);

// Calcular el número de filas y columnas
var numFilas = Math.ceil(Math.sqrt(numCeldas));
var numColumnas = Math.ceil(numCeldas / numFilas);

// Crear una tabla
var tabla = document.createElement("table");

// Crear las filas y columnas
for (var i = 0; i < numFilas; i++) {
  // Crear una nueva fila
  var fila = document.createElement("tr");

  for (var j = 0; j < numColumnas; j++) {
    // Crear una nueva celda
    var celda = document.createElement("td");
    // Calcular el número de la celda
    var numCelda = i * numColumnas + j + 1;
    // Asignar el valor de la celda como contenido
    celda.innerHTML = numCelda;
    // Agregar la celda a la fila
    fila.appendChild(celda);
  }

  // Agregar la fila a la tabla
  tabla.appendChild(fila);
}

// Agregar la tabla al contenedor
var contenedor = document.getElementById("tabla-container");
contenedor.appendChild(tabla);

var selectedCell = null;

// Seleccionar una celda de la tabla
function selectCell() {
  var celdas = document.querySelectorAll("#tabla-container td");
  for (var i = 0; i < celdas.length; i++) {
    celdas[i].onclick = function() {
      // Quitar la clase "seleccionado" de la celda previamente seleccionada
      if (selectedCell !== null) {
        selectedCell.classList.remove("seleccionado");
      }
      // Establecer la celda actual como la celda seleccionada
      selectedCell = this;
      // Agregar la clase "seleccionado" a la celda seleccionada
      selectedCell.classList.add("seleccionado");
    }
  }
}

// Establecer el estado de la celda seleccionada
function setCellStatus(status) {
  if (selectedCell !== null) {
    // Quitar todas las clases de estado de la celda
    selectedCell.classList.remove("libre", "escogido", "cancelado");
    // Agregar la clase correspondiente al estado
    selectedCell.classList.add(status);
  }
}

function generarLink() {
    // Obtener el estado actual de la tabla
    let celdas = document.querySelectorAll("#tabla td");
    let estadoTabla = "";
    for (let i = 0; i < celdas.length; i++) {
      estadoTabla += celdas[i].classList.toString() + ",";
    }
    
    // Generar el enlace con el estado actual de la tabla
    let enlace = window.location.href.split('?')[0] + "?tabla=" + estadoTabla.slice(0, -1);
    
    // Mostrar el enlace generado
    let enlaceGenerado = document.querySelector("#enlace");
    enlaceGenerado.value = enlace;
    let contenedorEnlace = document.querySelector("#enlace-generado");
    contenedorEnlace.style.display = "block";
  }
  
  function shareRaffle() {
    var name = $('#name').val();
    var email = $('#email').val();
    var cells = $('.raffle-cell');
    var numbers = [];
  
    cells.each(function() {
      var number = $(this).text();
      var status = $(this).data('status');
      numbers.push({
        number: number,
        status: status
      });
    });
  
    var data = {
      name: name,
      email: email,
      numbers: numbers
    };
  
    $.ajax({
      type: 'POST',
      url: 'https://api.rebrandly.com/v1/links',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'your-api-key-here'
      },
      data: JSON.stringify(data),
      success: function(response) {
        var link = response.shortUrl;
        $('#share-link').html('Aquí está tu enlace para compartir: <a href="' + link + '">' + link + '</a>');
      }
    });
  }

  $(document).ready(function() {
  // Seleccionar el botón de Compartir
  var shareBtn = $('#share-btn');
  
  // Agregar el controlador de eventos
  shareBtn.click(function(event) {
    // Prevenir el comportamiento predeterminado del formulario
    event.preventDefault();
    
    // Llamar a la función shareRaffle() para compartir la rifa
    shareRaffle();
  });
});

    
