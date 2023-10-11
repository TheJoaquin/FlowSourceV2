/// <reference path="../typescript/global.d.ts" />

var Diagram = MindFusion.Diagramming.Diagram;
var ShapeNode = MindFusion.Diagramming.ShapeNode;
var NodeListView = MindFusion.Diagramming.NodeListView;
var Behavior = MindFusion.Diagramming.Behavior;

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
    diagramView = MindFusion.Diagramming.DiagramView.create(document.getElementById("diagram"));
    diagram = diagramView.diagram;
    diagram.backBrush = '#f3f3f3'; 

    var shapeIds = ["Save", "Input", "Rectangle", "ManualOperation", "Decision2", "Decision", "BeginLoop", "EndLoop", "DOutDelay", "Ellipse"]
    var namesNodes = ["Datos", "Entrada Manual", "Proceso", "Operación Manual", "Preparación", "Decisión", "Inicio de Ciclo", "Fin de Ciclo", "Terminador", "Conector"]

    var nodeList = NodeListView.create(document.getElementById("nodeList"));
    nodeList.iconSize = new Size(60, 60);
    nodeList.defaultNodeSize = new Size(24, 24);

    // Lista de figuras utilizables por el usuario
    for (var i = 0; i < shapeIds.length; i++) {
        var sNode = new ShapeNode();
        sNode.shape = shapeIds[i];
        sNode.text = ''; // asigna una cadena vacía aquí
        sNode.brush = "#b3d9ff";
        
        // Agrega propiedades personalizadas:
        sNode.tag = { type: namesNodes[i], originalText: '' };
        
        nodeList.addNode(sNode, namesNodes[i]);
    }

   selectControl = document.getElementById("selectControl");
   selectControl.addEventListener("change", onSelectChenged);

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
        return inputText;
    }

    // Capture el evento doubleClick en un nodo
    diagram.addEventListener(MindFusion.Diagramming.Events.nodeDoubleClicked, function(sender, args) {
        var node = args.node;
        
        // Obtiene los metadatos
        var type = node.tag.type;
        var originalText = node.tag.originalText;
        
        var newText = prompt("Por favor, introduce el nuevo texto para el nodo:", originalText);
        if (newText !== null && newText !== "") {
            // Guarda el texto ingresado como "texto original" en los metadatos
            node.tag.originalText = newText;
            
            // Formatea el texto visual del nodo basándose en los metadatos
            node.text = formatTextBasedOnNode(type, newText);
            
            updateGlobalTexts();
        }
    });

    
});

function onSelectChenged(){
    if(selectControl.value == "linkShapes")
        diagramView.behavior = Behavior.LinkShapes;
    else if(selectControl.value == "drawContainers")
        diagramView.behavior = Behavior.DrawContainers;
    else if(selectControl.value == "drawTables")
        diagramView.behavior = Behavior.DrawTables;
    else if(selectControl.value == "modify")
        diagramView.behavior = Behavior.Modify;
    else if(selectControl.value == "pan")
        diagramView.behavior = Behavior.Pan;
}

var selectControl;
var diagramView;