/// <reference path="../typescript/global.d.ts" />

var Diagram = MindFusion.Diagramming.Diagram;
var ShapeNode = MindFusion.Diagramming.ShapeNode;
var NodeListView = MindFusion.Diagramming.NodeListView;

var Rect = MindFusion.Drawing.Rect;
var Size = MindFusion.Drawing.Size;

var diagram = null;

// Declarar la variable global
window.globalNodeTexts = [];

function updateGlobalTexts() {
    window.globalNodeTexts = Array.from(diagram.nodes).map(node => node.text);
}

document.addEventListener("DOMContentLoaded", function() {
    // create a DiagramView component that wraps the "diagram" canvas
    var diagramView = MindFusion.Diagramming.DiagramView.create(document.getElementById("diagram"));
    diagram = diagramView.diagram;
    diagram.backBrush = '#e6f2ff'; 

    var shapeIds = ["Save", "Input", "Rectangle", "ManualOperation", "Decision2", "Decision", "BeginLoop", "EndLoop", "DOutDelay", "Ellipse"]
    var namesNodes = ["Datos", "Entrada Manual", "Proceso", "Operación Manual", "Preparación", "Decisión", "Inicio de Ciclo", "Fin de Ciclo", "Terminador", "Conector"]

    var nodeList = NodeListView.create(document.getElementById("nodeList"));
    nodeList.iconSize = new Size(60, 60);
    nodeList.defaultNodeSize = new Size(24, 24);

    // Lista de figuras utilizables por el usuario
    for(var i = 0; i < shapeIds.length; i++) {
        var sNode = new ShapeNode();
        sNode.shape = shapeIds[i];
        sNode.text = namesNodes[i]; // asigna el texto aquí
        sNode.brush = "#b3d9ff";
        nodeList.addNode(sNode, namesNodes[i]);
    }

    // Función para formatear el texto basándose en el tipo de nodo
    function formatTextBasedOnNode(nodeName, inputText) {
        switch (nodeName) {
            case "Inicio de Ciclo":
                var matches = inputText.match(/^from\s+(\w+)\s*=\s*(\d+)\s+to\s+(\d+)$/);
                if (matches) {
                    var variable = matches[1];
                    var startValue = parseInt(matches[2]);
                    var endValue = parseInt(matches[3]);
                    return `for ${variable} in ${startValue}..=${endValue} { /* loop here... */ }`;
                }
                break;
            // ... resto del código ...
        }
    }

    // Capture el evento doubleClick en un nodo
    diagram.addEventListener(MindFusion.Diagramming.Events.nodeClicked, function(sender, args) {
        var node = args.node;
        var originalNodeText = node.text; // Conserva el texto original
        var newText = prompt("Por favor, introduce el nuevo texto para el nodo:", node.text);
        if (newText !== null && newText !== "") {
            //node.text = newText;
            node.text = formatTextBasedOnNode(originalNodeText, newText);
            updateGlobalTexts();
        }
    });

});


