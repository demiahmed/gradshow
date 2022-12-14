// Import libraries
import { OrbitControls } from './OrbitControls.js';
import { GLTFLoader } from './GLTFLoader.js';
import * as PANEL from './panelCoords.js'
import * as CARP from './carpetCoords.js'
import * as REV from './reviewCoords.js'
import * as FUNCT from './functions.js'
import * as MAT from './materials.js'

const bloomLayer = new THREE.Layers();
bloomLayer.set( BLOOM_SCENE );

init().then( async m => {
    // console.log("done")
    document.getElementById("loader").style.display = "none"
})
FUNCT.toMainSpace();
animate();

async function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x222222);
    scene.fog = new THREE.FogExp2( 0x222222, 0.00255);

    renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true  } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    document.body.appendChild( renderer.domElement );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1500 );
    camera.position.set( 10, -10, 20 );
    camera.up.set( 0, 0, 1 );
    camera.lookAt(new THREE.Vector3(0,0,0))

    // controls
    controls = new OrbitControls( camera, renderer.domElement );
    // THESE ARE TO BE ENABLED ONLY WHILE ANIMATING
    controls.enableZoom = false;
    controls.maxDistance = 100;
    controls.enablePan = false;
    controls.panSpeed = 1.6;
    controls.zoomSpeed = 2.5;
    controls.rotateSpeed = 1.6;
    controls.maxPolarAngle = Math.PI / 2;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.4;

    // mouse
    mouse = new THREE.Vector2();
    mouse_down = new THREE.Vector2();

    // GROUND
    var ground_geo = new THREE.PlaneBufferGeometry( 2000, 2000 );
    var ground_mat = new THREE.MeshToonMaterial( { color: 'black' } )
    ground = new THREE.Mesh( ground_geo, ground_mat );
    ground.position.set(0, 0, -2)
    ground.receiveShadow = true;
    scene.add( ground );

    // RAYCASTER
    raycaster = new THREE.Raycaster();

    // BLOOM
    renderScene = new THREE.RenderPass( scene, camera );

    let bloomPass = new THREE.UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    bloomComposer = new THREE.EffectComposer( renderer );
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass( renderScene );
    bloomComposer.addPass( bloomPass );

    let finalPass = new THREE.ShaderPass(
        new THREE.ShaderMaterial( {
            uniforms: {
                baseTexture: { value: null },
                bloomTexture: { value: bloomComposer.renderTarget2.texture }
            },
            vertexShader: document.getElementById( 'vertexshader' ).textContent,
            fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
            defines: {}
        } ), 'baseTexture'
    );
    finalPass.needsSwap = true;

    finalComposer = new THREE.EffectComposer( renderer );
    finalComposer.addPass( renderScene );
    finalComposer.addPass( finalPass );

    // lights
    const dirLight1 = new THREE.DirectionalLight( 0xffffff, 0.2);
    dirLight1.position.set( 5000, 5000, 5000 );
    scene.add( dirLight1 );

    // DIRECTIONAL LIGHT SHADOWS
    dirLight1.castShadow = true;
    dirLight1.shadow.mapSize.width = 1000;
    dirLight1.shadow.mapSize.height = 1000;
    dirLight1.shadow.camera.near = 1;
    dirLight1.shadow.camera.far = 1000;
    dirLight1.shadow.camera.left = -1000;
    dirLight1.shadow.camera.bottom = -1000;
    dirLight1.shadow.camera.top = 1000;
    dirLight1.shadow.camera.right = 1000;

    const dirLight3 = new THREE.DirectionalLight( 0xffffff, 0.8 );
    dirLight3.position.set( 500, 500, 500 );
    scene.add( dirLight3 );

    const ambientLight = new THREE.AmbientLight( 0x222222 );
    scene.add( ambientLight );

    // *** ALL THESE FLOOR, PANELS, TEXT SHOULD FO TO UTILITY, SO MESSY AND BULKY ***
    // FLOOR
	let loader = new GLTFLoader();

    loader.load( 'assets/models/finalFloor.glb', function ( gltf ) {
        gltf.scene.traverse( function ( node ) {
            if ( node.isMesh || node.isLight ) node.castShadow = true;
            if ( node.isMesh || node.isLight ) node.receiveShadow = true;
            if ( node.isMesh ) node.material = MAT.greyMat
        } )
        var model = gltf.scene;
        model.receiveShadow = true
        model.name = "floor";
        model.position.set( 0, 0, 0 );
        model.rotation.x = Math.PI / 2;
        scene.add(model);
    });

    // REVIEWS
    let revKeys = Object.keys(REV.dict)
    revKeys.forEach(function(e, i){
        loader.load( 'assets/models/rText' + i + '.glb', function ( gltf ) {
            gltf.scene.traverse( function ( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
                if ( node.isMesh || node.isLight ) node.receiveShadow = true;
                if ( node.isMesh ) node.material = MAT.whiteNeonMat;
            } )
            var model = gltf.scene;
            model.key = e
            model.receiveShadow = true
            model.position.set(REV.dict[e].coords[0]/1000, REV.dict[e].coords[1]/1000, REV.dict[e].coords[2]/1000+0.01);
            model.rotation.x = Math.PI / 2;
            var children = model.children
            children.forEach(child => {
                if (child.type == "Mesh"){
                    child.name = "rev"
                    child.key = e
                    child.layers.enable(1)
                }
            })
            scene.add(model);
        });

        loader.load( 'assets/models/r' + i + '.glb', function ( gltf ) {
            gltf.scene.traverse( function ( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
                if ( node.isMesh || node.isLight ) node.receiveShadow = true;
                if ( node.isMesh ) node.material = MAT.disabledMat;
            } )
            var model = gltf.scene;
            model.receiveShadow = true
            model.position.set(REV.dict[e].coords[0]/1000, REV.dict[e].coords[1]/1000, REV.dict[e].coords[2]/1000+0.02);
            model.rotation.x = Math.PI / 2;
            var children = model.children
            children.forEach(child => {
                if (child.type == "Mesh"){
                    child.name = "rev"
                    child.key = e
                    interactiveObjects[e] = child
                    child.layers.enable(1)
                }
            })
            scene.add(model);
        });
    })

    // CARPET
    let carpetKeys = Object.keys(CARP.dict)
    carpetKeys.forEach(function(e, i){
        loader.load( 'assets/models/carpTxt' + i + '.glb', function ( gltf ) {
            gltf.scene.traverse( function ( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
                if ( node.isMesh || node.isLight ) node.receiveShadow = true;
                if ( node.isMesh ) node.material = MAT.whiteNeonMat;
            } )
            var model = gltf.scene;
            //model.name = "carpet"
            model.key = e
            model.receiveShadow = true
            model.position.set(CARP.dict[e].coords[0]/1000, CARP.dict[e].coords[1]/1000, 0.01);
            model.rotation.x = Math.PI / 2;
            var children = model.children
            children.forEach(child => {
                if (child.type == "Mesh"){
                    child.name = "carpet"
                    child.key = e
                    child.layers.enable(1)
                }
            })
            // interactiveObjects[e] = model
            // console.log(interactiveObjects[e])
            scene.add(model);
        });

        if (CARP.dict[e]["shape"] == "diamond") {
            var shape = "carpet"
        } else if (CARP.dict[e]["shape"] == "triangle") {
            var shape = "triangle"
        } else if (CARP.dict[e]["shape"] == "hybrid") {
            var shape = "hybrid"
        } else {
            var shape = "trap"
        }
        loader.load( 'assets/models/' + shape + '.glb', function ( gltf ) {
            gltf.scene.traverse( function ( node ) {
                if ( node.isMesh || node.isLight ) node.castShadow = true;
                if ( node.isMesh || node.isLight ) node.receiveShadow = true;
                if ( node.isMesh ) node.material = MAT.transparentMat;
            } )
            var model = gltf.scene;
            model.receiveShadow = true
            model.position.set(CARP.dict[e].coords[0]/1000, CARP.dict[e].coords[1]/1000, 0.02);
            model.rotation.x = Math.PI / 2;

            var children = model.children
            children.forEach(child => {
                if (child.type == "Mesh"){
                    child.name = "carpet"
                    child.key = e
                    interactiveObjects[e] = child
                    child.layers.enable(1)
                }
            })
            scene.add(model);
        });
    })

    // PANELS
    const panelGeom = new THREE.BoxGeometry( panelLength, panelWidth, panelHeight);

    let panelKeys = Object.keys(PANEL.dict)
    await panelKeys.forEach(function (e, i) {
        let frontMat = panelMat["aMat" + i]
        let backMat = panelMat["bMat" + i]
        let materialArray = [MAT.basicMat, MAT.basicMat, frontMat, backMat, MAT.basicMat, MAT.basicMat]
        var mesh = new THREE.Mesh( panelGeom, materialArray  );
        mesh.key = e;
        mesh.aKey = PANEL.dict[e]["key"][0]
        mesh.bKey = PANEL.dict[e]["key"][1]
        mesh.name = "panel"
        mesh.castShadow = true
        mesh.position.set(PANEL.dict[e].coords[0]/1000, PANEL.dict[e].coords[1]/1000, 0.95);
        if (PANEL.dict[e].clockwise){
            mesh.rotation.z = panelRotation / 180 * Math.PI;
        } else {
            mesh.rotation.z = (180 - panelRotation) / 180 * Math.PI;
        }
        mesh.scale.set(0.01, 0.01, 0.01);
        interactiveObjects[e] = mesh;
        scene.add( mesh );
    })

    // FAKE SHADOW TEXTURE
    const shadowGeom = new THREE.PlaneBufferGeometry(panelLength, panelWidth);
    panelKeys.forEach(function (e, i) {
        var mesh = new THREE.Mesh( shadowGeom, MAT.shadowMat  );
        mesh.name = "shadow"
        mesh.position.set(PANEL.dict[e].coords[0]/1000, PANEL.dict[e].coords[1]/1000, 0.001);
        if (PANEL.dict[e].clockwise){
            mesh.rotation.z = panelRotation / 180 * Math.PI;
        } else {
            mesh.rotation.z = (180 - panelRotation) / 180 * Math.PI;
        }
        mesh.scale.set(0.012, 0.06, 0.015);
        scene.add( mesh );
    })

    // SCENE LINES
    let lineLoader = new THREE.ObjectLoader();
    lineLoader.load(
        // resource URL
        "assets/models/floorPlan.json",
    
        // onLoad callback
        // Here the loaded data is assumed to be an object
        function ( obj ) {
            // Add the loaded object to the scene
            obj.scale.set(0.1, 0.1, 0.1);
            obj.position.set(0,0,0.01)
            obj.rotation.x = -Math.PI / 2;
            obj.rotation.z = Math.PI;
            scene.add( obj );
        },
    
        // onProgress callback
        function ( xhr ) {
            console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
        },
    
        // onError callback
        function ( err ) {
            console.error( 'An error happened' );
        }
    );

    // EventListener
    window.addEventListener('resize', onWindowResize );
    document.addEventListener('mousemove', onMouseMove, false );
    document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mouseup', onMouseUp, false);

}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    bloomComposer.setSize( window.innerWidth, window.innerHeight );
	finalComposer.setSize( window.innerWidth, window.innerHeight );
}

function onMouseMove( event ) {
    event.preventDefault(); 
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

// Handle mouse click events, save the screen position when mouse down
function onMouseDown(event) {
    mouse_down.x = event.clientX;
    mouse_down.y = event.clientY
    if (touchDevice){
        let isect_objs = Object.values(interactiveObjects)
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( isect_objs );
        if (intersects.length > 0){
            var isect0 = intersects[ 0 ];
            if (isect0.object.name == "panel"){
                pointedFace = isect0.faceIndex
                pointedKey = isect0.object.key
                pointedType = "panel"
            } else if (isect0.object.name == "carpet"){
                pointedFace = undefined
                pointedKey = isect0.object.key
                pointedType = "carpet"
            } else if (isect0.object.name == "rev"){
                pointedFace = undefined
                pointedKey = isect0.object.key
                pointedType = "rev"
            }
        } else {
            pointedFace = undefined
            pointedKey = undefined
            pointedType= undefined
        }
    }
}

// Handle mouse click events
function onMouseUp(event) {
    if (event.target.id == "" && cameraState != 2){
        if ((Math.abs(mouse_down.x - event.clientX) > 10) || (Math.abs(mouse_down.y - event.clientY) > 10)) {
            // we are dragging, so no nothing
            return;
        } else if (pointedKey && (pointedKey.slice(0,3) == "PNL" || pointedKey.slice(0,3) == "CRP")) {
            
            if (selectedKey){
                if (selectedKey.slice(0,3) == "CRP"){
                    FUNCT.toggleMaterial(interactiveObjects[selectedKey], false)
                }
            }
            selectedKey = pointedKey
            selectedFace = pointedFace
            
            if (selectedKey.slice(0,3) == "PNL"){
                FUNCT.dimAllPanel()
            }

            document.getElementById("contentBox").style.display = "none"
            document.getElementById("contentThirdLine").style.display = "none"
            if (pointedType == "panel"){
                if (selectedFace == 4 || selectedFace == 5){
                    // textLeftDict[selectedKey].visible = true
                    interactiveObjects[selectedKey].material[2] = panelMat['aMat' + selectedKey.slice(4)]
                    if (PANEL.dict[selectedKey]["clockwise"]){
                        if (window.innerWidth < 480){
                            var camOffset = [-8, 8, 2.75, 0, -1, -0.6]
                        } else {
                            var camOffset = [-8, 8, 2.75, 0, -1.5, -0.6]
                        }
                    } else {
                        if (window.innerWidth < 480){
                            var camOffset = [-8, -8, 3, 0, 1, -0.15]
                        } else {
                            var camOffset = [-8, -8, 3, 0, 0.35, -0.15]
                        }
                    }
                    if (interactiveObjects[selectedKey]["aKey"] != ""){
                        if (interactiveObjects[selectedKey]["aKey"].slice(0,3) != "img"){
                            document.getElementById("contentBox").style.display = "block"
                            document.getElementById("contentTitle").innerHTML = studentDetails[interactiveObjects[selectedKey]["aKey"]]["title"]
                            document.getElementById("contentSecondLine").innerHTML = studentDetails[interactiveObjects[selectedKey]["aKey"]]["name"]
                            document.getElementById("contentThirdLine").style.display = "block"
                        }
                    }
                } else if (selectedFace == 6 || selectedFace == 7){
                    // textRightDict[selectedKey].visible = true
                    interactiveObjects[selectedKey].material[3] = panelMat['bMat' + selectedKey.slice(4)]
                    if (PANEL.dict[selectedKey]["clockwise"]){
                        if (window.innerWidth < 480){
                            var camOffset = [8, -8, 3, 1, -1, 0.2]
                        } else {
                            var camOffset = [8, -8, 3, 1, -0.5, 0.2]
                        }   
                    } else {
                        if (window.innerWidth < 480){
                            var camOffset = [8, 8, 3, 0, 1, 0.5]
                        } else {
                            var camOffset = [8, 8, 3, 0, 1.5, 0.4]
                        }
                    }
                    if (interactiveObjects[selectedKey]["bKey"] != ""){
                        document.getElementById("contentBox").style.display = "block"
                        document.getElementById("contentTitle").innerHTML = studentDetails[interactiveObjects[selectedKey]["bKey"]]["title"]
                        document.getElementById("contentSecondLine").innerHTML = studentDetails[interactiveObjects[selectedKey]["bKey"]]["name"]
                        document.getElementById("contentThirdLine").style.display = "block"
                    }
                }

                // Look at target & conjure go back button
                if (cameraState == 1){
                    controls.enableZoom = true
                    controls.maxDistance = 50;
                    controls.autoRotate = false
                }
                
                if (window.innerWidth < 480){
                    gsap.to( camera, {
                        duration: 2,
                        zoom: 3,
                        onUpdate: function () {
                            camera.updateProjectionMatrix();
                        }
                    } );
                } else {
                    gsap.to( camera, {
                        duration: 2,
                        zoom: 6,
                        onUpdate: function () {
                            camera.updateProjectionMatrix();
                        }
                    } );
                }

                gsap.to( camera.position, {
                    duration: 2,
                    x: interactiveObjects[selectedKey].position.x + camOffset[0],
                    y: interactiveObjects[selectedKey].position.y + camOffset[1],
                    z: interactiveObjects[selectedKey].position.z + camOffset[2],
                    onUpdate: function () {
                        camera.updateProjectionMatrix();
                    }
                } );
                
                gsap.to( controls.target, {
                    duration: 2,
                    x: interactiveObjects[selectedKey].position.x + 1,
                    y: interactiveObjects[selectedKey].position.y + camOffset[4],
                    z: interactiveObjects[selectedKey].position.z + camOffset[5],
                    onUpdate: function () {
                        controls.update();
                    }
                } );

                cameraState = 0
                document.getElementById("textBtn0").innerHTML = "Go back"
                FUNCT.disableCarpet()
            } else if (pointedType == "carpet" && cameraState == 1){
                // console.log(interactiveObjects[selectedKey])

                FUNCT.greyCarpet()
                FUNCT.toggleMaterial(interactiveObjects[selectedKey], true)
                document.getElementById("contentBox").style.display = "block"
                document.getElementById("contentTitle").innerHTML = CARP.dict[pointedKey]["studio"]
                document.getElementById("contentSecondLine").innerHTML = CARP.dict[pointedKey]["desc"]
            }
            // console.log(selectedKey)
            // console.log(selectedFace)
        } else {
            // remove selection
            if (selectedKey.slice(0,3) == "CRP"){
                FUNCT.enableCarpet()
            }
            document.getElementById("contentBox").style.display = "none"
            selectedKey = undefined
        }
    } else if (event.target.id == "" && cameraState == 2) {
        if ((Math.abs(mouse_down.x - event.clientX) > 10) || (Math.abs(mouse_down.y - event.clientY) > 10)) {
            // we are dragging, so no nothing
            return;
        } else if (pointedKey && pointedKey.slice(0,3) == "RVW") {
            if (selectedKey){
                if (pointedType == "rev"){
                    FUNCT.toggleMaterial(interactiveObjects[selectedKey], false)
                }
            }
            selectedKey = pointedKey
            selectedFace = pointedFace
            
            document.getElementById("contentBox").style.display = "none"
            document.getElementById("contentThirdLine").style.display = "none"
            if (pointedType == "rev"){
                FUNCT.greyReviews()
                FUNCT.toggleMaterial(interactiveObjects[selectedKey], true)
                document.getElementById("contentBox").style.display = "block"
                document.getElementById("contentTitle").innerHTML = REV.dict[pointedKey]["title"]
                document.getElementById("contentSecondLine").innerHTML = REV.dict[pointedKey]["desc"]
            }
            // console.log(selectedKey)
            // console.log(selectedFace)
        } else {
            FUNCT.enableReviews()
            document.getElementById("contentBox").style.display = "none"
            selectedKey = undefined
        }
    }
}

function animate(time) {
    requestAnimationFrame( animate );
    // render scene with bloom
    renderBloom();
    // render the entire scene, then render bloom scene on top
    finalComposer.render();
    controls.update()
    render()
}

function renderBloom() {
    scene.traverse( darkenNonBloomed );
    bloomComposer.render();
    scene.traverse( restoreMaterial );
}
    
function darkenNonBloomed( obj ) {
    if ( obj.isMesh && bloomLayer.test( obj.layers ) === false ) {
        materials[ obj.uuid ] = obj.material;
        obj.material = MAT.darkMaterial;
    }
}

function restoreMaterial( obj ) {
    if ( materials[ obj.uuid ] ) {
        obj.material = materials[ obj.uuid ];
        delete materials[ obj.uuid ];
    }
}

function render() {
    if (touchDevice == false){
        let isect_objs = Object.values(interactiveObjects)
        raycaster.setFromCamera( mouse, camera );
        var intersects = raycaster.intersectObjects( isect_objs );
        if (intersects.length > 0){
            var isect0 = intersects[ 0 ];
            if (isect0.object.name == "panel"){
                pointedFace = isect0.faceIndex
                pointedKey = isect0.object.key
                pointedType = "panel"
            } else if (isect0.object.name == "carpet"){
                pointedFace = undefined
                pointedKey = isect0.object.key
                pointedType = "carpet"
            } else if (isect0.object.name == "rev"){
                pointedFace = undefined
                pointedKey = isect0.object.key
                pointedType = "rev"
            }
        } else {
            pointedFace = undefined
            pointedKey = undefined
            pointedType= undefined
        }
    }
    // renderer.render( scene, camera );
}

textBtnColl.forEach(e => {
    if (e.id == "textBtn0"){
        e.addEventListener("click", () => {
            FUNCT.toMainSpace()
            FUNCT.enableCarpet()
            FUNCT.disableReviews()
        })
    } else if (e.id == "textBtn1"){
        e.addEventListener("click", FUNCT.toReviewSpace)
    }
})