import * as PANEL from './panelCoords.js'

export const basicMat = new THREE.MeshToonMaterial( { 
    color: 0xf3f3f3,
    transparent: false,
    side: THREE.DoubleSide,
    emissive: 0xa000000
} );

export const transparentMat = new THREE.MeshBasicMaterial( {
    transparent: true,
    side: THREE.DoubleSide,
    opacity: 0
})

export const translucentMat = new THREE.MeshBasicMaterial( {
    transparent: true,
    side: THREE.DoubleSide,
    color: 0x111111,
    opacity: 0.4
})

export const whiteNeonMat = new THREE.MeshBasicMaterial( { 
    color: 0x9393dd,
    emissive: 0x9393dd
} );

export const disabledMat = new THREE.MeshBasicMaterial( { 
    color: 0x111111,
    emissive: 0x111111
} );

export const selectedMat = new THREE.MeshToonMaterial( { 
    color: 0x000000,
    transparent: false,
    side: THREE.DoubleSide,
    emissive: 0x871203
} );

export const greyMat = new THREE.MeshLambertMaterial( { 
    color: 0x222222,
    transparent: false,
    side: THREE.DoubleSide,
    emissive: 0x050505
} );

export const darkLineMat = new THREE.LineBasicMaterial( {
    color: 0x006699,
    side: THREE.DoubleSide
} );

export const lightLineMat = new THREE.LineBasicMaterial( {
    color: 0xffffff,
    side: THREE.DoubleSide
} );

export const blackMat = new THREE.MeshBasicMaterial( {
    color: 0x000000
})

export const darkMaterial = new THREE.MeshBasicMaterial( { 
    color: 'black' 
})

let panelKeys = Object.keys(PANEL.dict)
panelKeys.forEach(function (e, i) {
    let keys = PANEL.dict[e]["key"]
    if (keys[0].slice(0,3) == "img"){
        var frontTexture = new THREE.TextureLoader().load( 'assets/landingimage/' + keys[0] + '.jpg' );
    } else if (keys[0] == ""){
        var frontTexture = new THREE.TextureLoader().load( 'assets/fallbackimgs/blank.jpg' );
    } else {
        var frontTexture = new THREE.TextureLoader().load( 'projects/2022/' + keys[0] + '/' + keys[0] + '-project.jpg' );
    }
    frontTexture.center = new THREE.Vector2(0.5, 0.5);
    frontTexture.rotation = Math.PI;
    if (keys[1] == ""){
        var backTexture = new THREE.TextureLoader().load( 'assets/fallbackimgs/blank.jpg' );
    } else {
        var backTexture = new THREE.TextureLoader().load( 'projects/2022/' + keys[1] + '/' + keys[1] + '-project.jpg' );
    }
    panelMat["aMat" + i] = new THREE.MeshBasicMaterial( { map: frontTexture })
    panelMat["bMat" + i] = new THREE.MeshBasicMaterial( { map: backTexture })
    panelMat["aMatDark" + i] = new THREE.MeshBasicMaterial( { map: frontTexture, color: 0x666666 })
    panelMat["bMatDark" + i] = new THREE.MeshBasicMaterial( { map: backTexture, color: 0x666666 })
})