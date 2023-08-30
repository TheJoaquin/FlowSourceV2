document.addEventListener('DOMContentLoaded', function () {
    // Obtener el parámetro del ejercicio de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const exerciseNumber = urlParams.get('exercise');
  
    // Definir los contenidos de los ejercicios
    const exerciseContents = {
      1: {
        title: "Planteamiento del problema",
        content: "Desarrollar un diagrama de flujo el cual contenga una entrada para que el usuario pueda ingresar su nombre, una vez hecho esto, \
                el programa automaticamente devolvera un mensaje de salida con el nombre del usuario saludandolo",
        subtitle: "Entrada y Salida",
        input: "input: user_name",
        output: "output: Hola, user_name"
    },
      2:{ 
        title: "Planteamiento del problema",
        content: "Contenido del ejercicio 2...",
    }
      // Agrega más contenidos de ejercicios aquí
    };
  
    // Obtener el elemento donde se mostrará el contenido del ejercicio
    const exerciseContentElement = document.getElementById('exercise-content');
  
    // Mostrar el contenido del ejercicio seleccionado
    if (exerciseNumber && exerciseContents.hasOwnProperty(exerciseNumber)) {
        const exercise = exerciseContents[exerciseNumber];
        exerciseContentElement.innerHTML = `<h2>${exercise.title}</h2>${exercise.content}<h2>${exercise.subtitle}</h2>${exercise.input}<br>${exercise.output}`;
      } else {
        exerciseContentElement.textContent = "Ejercicio no encontrado";
      }
  });