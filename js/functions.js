import * as MAT from './materials.js'
import * as PANEL from './panelCoords.js'
import * as CARP from './carpetCoords.js'
import * as REV from './reviewCoords.js'

let panelKeys = Object.keys(PANEL.dict)
let carpetKeys = Object.keys(CARP.dict)
let revKeys = Object.keys(REV.dict)

export function toggleMaterial(obj, sel){
    if (sel){
        lastMat = obj.material
        obj.material = MAT.selectedMat
    } else {
        obj.material = lastMat
    }
}

export function dimAllPanel(){
    panelKeys.forEach(function(e,i){
        interactiveObjects[e].material[2] = panelMat["aMatDark" + i]
        interactiveObjects[e].material[3] = panelMat["bMatDark" + i]
    })
}

export function brightenAllPanel(){
    panelKeys.forEach(function(e,i){
        interactiveObjects[e].material[2] = panelMat["aMat" + i]
        interactiveObjects[e].material[3] = panelMat["bMat" + i]
    })
}

export function disableCarpet(){
    carpetKeys.forEach(e => {
        interactiveObjects[e].material = MAT.disabledMat
    })
}

export function enableCarpet(){
    carpetKeys.forEach(e => {
        interactiveObjects[e].material = MAT.transparentMat
    })
}

export function greyCarpet(){
    carpetKeys.forEach(e => {
        interactiveObjects[e].material = MAT.translucentMat
    })
}

export function disableReviews(){
    revKeys.forEach(e => {
        interactiveObjects[e].material = MAT.disabledMat
    })
}

export function enableReviews(){
    revKeys.forEach(e => {
        interactiveObjects[e].material = MAT.transparentMat
    })
}

export function greyReviews(){
    revKeys.forEach(e => {
        interactiveObjects[e].material = MAT.translucentMat
    })
}

export function resetState() {
    // reset state
    controls.enableZoom = false
    controls.maxDistance = 100;
    controls.autoRotate = true
    cameraState = 1
    brightenAllPanel()
    // clear selection
    if (selectedKey){
        if (selectedKey.slice(0,3) == "CRP"){
            toggleMaterial(interactiveObjects[selectedKey], false)
        }
        selectedKey = undefined
        document.getElementById("contentBox").style.display = "none"
        document.getElementById("defaultBox").style.display = "block"
    }
}

export function toMainSpace() {
    gsap.to( camera, {
        duration: 1,
        zoom: 1.6,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    } );

    gsap.to( camera.position, {
        duration: 1,
        x: 10,
        y: -10,
        z: 20,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    } );

    gsap.to( controls.target, {
        duration: 1,
        x: 0,
        y: 0,
        z: 0,
        onUpdate: function () {
            controls.update();
        }
    } );
    
    resetState()
}

export function toReviewSpace() {
    gsap.to( camera, {
        duration: 1,
        zoom: 1,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    } );

    gsap.to( camera.position, {
        duration: 1,
        x: 10,
        y: -10,
        z: 50,
        onUpdate: function () {
            camera.updateProjectionMatrix();
        }
    } );

    gsap.to( controls.target, {
        duration: 1,
        x: 0,
        y: 0,
        z: 0,
        onUpdate: function () {
            controls.update();
        }
    } );
    
    resetState()
    disableCarpet()
    enableReviews()
    cameraState = 2
}

// vvv impt example for zooming into specific places! Save this elsewhere
// export function toReview1() {
//     gsap.to( camera, {
//         duration: 2,
//         zoom: 11,
//         onUpdate: function () {
//             camera.updateProjectionMatrix();
//         }
//     } );

//     gsap.to( camera.position, {
//         duration: 2,
//         x: 0,
//         y: -50,
//         z: 200,
//         onUpdate: function () {
//             camera.updateProjectionMatrix();
//         }
//     } );

//     gsap.to( controls.target, {
//         duration: 2,
//         x: 40,
//         y: 0,
//         z: 20,
//         onUpdate: function () {
//             controls.update();
//         }
//     } );
    
//     resetState()
//     controls.autoRotate = false;
// }