// Inicializa el editor CodeMirror
var editor = CodeMirror.fromTextArea(document.getElementById("myEditor"), {
    mode: "rust",
    lineNumbers: true,
    theme: "default"
});

//console.log("Contenido de globalNodeTexts:", window.globalNodeTexts);


document.getElementById("populateEditor").addEventListener('click', function() {
    // Transformar el arreglo globalNodeTexts a un string, por ejemplo separado por saltos de línea
    var textToInsert = window.globalNodeTexts.join('\n');
    
    // Establecer el contenido del editor CodeMirror con el texto
    editor.setValue(textToInsert);
});

// Función para ejecutar el código cuando se presiona el botón
function executeRustCode() {
    var code = editor.getValue(); 

    fetch('http://localhost:5000/run-rust', {
        method: 'POST',
        body: JSON.stringify({ code: code }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('output').innerText = data.output;
    })
    .catch(error => {
        console.error('Error ejecutando código:', error);
    });
}

// Vincula el evento del botón para ejecutar el código
document.getElementById('executeCode').addEventListener('click', executeRustCode);

//console.log(window.globalNodeTexts);
