document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro del ejercicio de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseNumber = urlParams.get('exercise');
  
    // Definir los contenidos de los ejercicios
    const exerciseContents = {
      1: {
        title: "Planteamiento del problema",
        content: "Diseñar un diagrama de flujo en el cual el usuario pueda ingresar su nombre a continuacion se mostrara un mensaje saludandolo. \
                A partir del diagrama diseñado codificar en Rust un algoritmo donde el usuario ingrese su nombre y este devuelva el mensaje de saludo.",
        subtitle: "Ejemplo",
        input: "Entrada: user_name",
        output: "Salida: Hola, user_name"
    },
      2:{ 
        title: "Planteamiento del problema",
        content: "Dados dos números, mostrar la suma, resta, división y multiplicación de ambos. Por ejemplo tenemos los nuemeros 5 y 2, \
                las operaciones aritmeticas correspondientes se realizarian automaticamente sobre dichos numeros.",
        subtitle: "Ejemplo",
        input: "Entrada: x=5, y=2",
        output: "Salida: suma = 7, resta = 3, division = 2.5, multiplicacion = 10"
    },
      3:{
        title: "Planteamiento del problema",
        content: "Diseñar un algoritmo que convierta el valor dados en grados Fahrenheit a grados Celsius conociendo la formula a continuacion \
               (32 °F - 32) x 5/9 = 0 °C",
        subtitle: "Ejemplo",
        input: "Entrada: F=58",
        output: "Salida: C=14.4"
    },
      4:{
        title: "Planteamiento del problema",
        content: "Diseñar un algoritmo que determine cuando un numero ingresado por el usuario tine un valor positivo o por el contrario \
              es un valor negativo",
        subtitle: "Ejemplo",
        input: "Entrada: Valor=-38",
        output: "Salida: Es un numero negativo"
    },
      5:{
        title: "Planteamiento del problema",
        content: "Un palíndromo es una palabra la cual puede ser leida igual de izquierda a derecha o de derecha a izquierda, por ello \
                diseñe un algoritmo el cual le entrege verdadero cuando un numero es un palidromo",
        subtitle: "Ejemplo",
        input: "Entrada: Valor=121",
        output: "Salida: Verdadero"
    },
      6:{
        title: "Planteamiento del problema",
        content: "Diseñe un algoritmo que promedie 5 calificaciones de un estudiantes para ayudar a determinar si el estudiante paso el \
                el curso o lo reprobo",
        subtitle: "Ejemplo",
        input: "Entrada: calificaciones=[8, 10, 9, 5, 7]",
        output: "Salida: calificacion_final = 7.8"
    },
      7:{
        title: "Planteamiento del problema",
        content: "Cree un algoritmo que sume todos los numeros ingresados por el usuario, al momento de que el usuario introduzca el numero \
                0 el programa debera detenerse y mostrar la suma de los numeros anteriores",
        subtitle: "Ejemplo",
        input: "Entrada: arreglo_de_valores=[8, 10, 9, 5, 7]",
        output: "Salida: suma = 39"
    },
      8:{
        title: "Planteamiento del problema",
        content: "Diseñe un algoritmo que muestre la tabla de multiplicar hasta el numero 10 de un numero introducido por el usuario para \
                facil lectura",
        subtitle: "Ejemplo",
        input: "Entrada: numero=2",
        output: "Salida: tabla = 2x1=2 ... 2x10=20"
    }
      // Agrega más contenidos de ejercicios aquí
    };
  
    // Obtener el elemento donde se mostrará el contenido del ejercicio
    const exerciseContentElement = document.getElementById('exercise-content');
  
    // Mostrar el contenido del ejercicio seleccionado
    if (exerciseNumber && exerciseContents.hasOwnProperty(exerciseNumber)) {
        const exercise = exerciseContents[exerciseNumber];
        exerciseContentElement.innerHTML = `
        <h2>${exercise.title}</h2>
        <p>${exercise.content}</p>
        <h3>${exercise.subtitle}</h3>
        <p class="font-monospace">${exercise.input}</p>
        <p class="font-monospace">${exercise.output}</p>`;
      } else {
        exerciseContentElement.textContent = "Ejercicio no encontrado";
      }
  });