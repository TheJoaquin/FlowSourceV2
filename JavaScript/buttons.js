document.addEventListener('DOMContentLoaded', function () {
    // Obtener referencia al botón
    const btnComenzar = document.getElementById('btn-comenzar');

    // Agregar un evento de clic al botón
    btnComenzar.addEventListener('click', function () {
      // Redirigir al usuario a la página first-diagram.html
      window.location.href = 'exercises.html';
    });
  });