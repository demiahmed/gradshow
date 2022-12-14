let camera, controls, scene, renderer, raycaster, mouse, mouse_down, ground, light;
let renderScene, finalComposer, bloomComposer;
let BLOOM_SCENE = 1;
let params = {
    exposure: 1,
    bloomStrength: 1,
    bloomThreshold: 0,
    bloomRadius: 0
};

function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)
    );
}
let touchDevice = isTouchDevice()

let lastMat
let materials = {};
let rhino;
let selectedKey
let pointedKey
let pointedFace, selectedFace, pointedType
let panelWidth = 10
let panelLength = 190
let panelHeight = 190
let panelRotation = 55.4
let interactiveObjects = {}
let textLeftDict = {}
let textRightDict = {}
// 0 is closeup, 1 is exhibition view & 2 is reviews view
let cameraState = 1
let closeUp = false
let exhibition = true

let textBtnColl = []
for (let i=0; i<2; i++){
    textBtnColl.push(document.getElementById("textBtn" + i))
}

let panelMat = {}

let studentDetails = {}
d3.csv("./assets/drivers/2022.csv", function(data) {
    // data = d3.csvParseRows(text)
    console.log(data);
    for (var i = 0; i < data.length; i++) {
        studentDetails[data[i].key] = {}
        studentDetails[data[i].key]["name"] = data[i].name
        studentDetails[data[i].key]["title"] = data[i].title
    }
});