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
let events = true;
let studentkey;

let textBtnColl = []
for (let i=0; i<2; i++){
    textBtnColl.push(document.getElementById("textBtn" + i))
}

let panelMat = {}

let studentDetails = {}
d3.csv("./assets/drivers/2022.csv", function(data) {
    for (var i = 0; i < data.length; i++) {
        studentDetails[data[i].key] = {}
        studentDetails[data[i].key]["name"] = data[i].name
        studentDetails[data[i].key]["title"] = data[i].title
        if (data[i].summary.length < 81){
            studentDetails[data[i].key]["summary"] = data[i].summary
        } else {
            var sliced = data[i].summary.slice(0, 81)
            var lastspace = sliced.lastIndexOf(" ")
            sliced = sliced.slice(0, lastspace)
            studentDetails[data[i].key]["summary"] = sliced + "..."
        }
    }
});
// *** TO DO (camera related) ***
// $ allow further zoom (must have a max) while in close up mode
// X -this kinda solves itself- zoom to the right side of the panel
// $ animated fly out

// *** TO DO (general) ***
// $ give a nice gradient fog background (i think can google for sky effect)
// $ use a very "white" palette. I think will look pretty & archi-ey
// $ probably can explore the cartoon camera thing for a more cartoony, archi diagram look?

// *** 28 OCT meeting ***
// REQUESTS
// Try loading some textures on the boxes by 11 november meeting
// slow turn table motion on non close up
// clickable "carpet" for the various studios -> click to give a studio detail popup
// button to start from m.arch intro panel -> less urgent
// Lock zoom out from closeup mode

// *** GOALS for 4 NOV ***
// $ Lock zoom out from closeup mode
// $ Slow turn table motion on non close up
// $ Clickable "carpets"
// $ ok quite urgent but need to fix this with a clear af head, but rn pointedKey is always filled with the prev pointedKey even when nothing is being pointed, it should be updated to undefined (SAME SHIT FOR UDOPT!) now need to resolve if pointedKey is undefined dont throw arrow, if sth is selected and pointedkey is undefined, dont unselect, whether pointedkey is panel or carp, do sth diff!
// $ test monochrome aesthetic
// $ animated fly out
// $ controlled starting camera angle
// $ Clear panel selection when zoomed out

// *** 4 NOV INSIGHTS ***
// Do the circular depressions
// Neon is GOOD
// 5 event spaces including the circular depressions, mark with glowy sims crystal thats clickable
// apply simplified floorplan as texture

// *** GOALS for 11 NOV ***
// $ Try loading random textures on all boxes and see if it lags
// $ Apply floor textures
// X Button to start from m.arch intro panel
// $ Fly in facing the panel at a fixed angle, not just anyhow and zoom in on the narrow edge
// $ Try out some neon effects, maybe on the carpets (eventually for directions as well)

// THE NEON EFFECT GOT CLIPPED BY ANYTHING WITH FUCKING MATERRIALS
// BUT MAYBE CAN SOLVE WITH THE GLOWING LINES OVER CUBE EXAMPLE
// THE NEON MATERIAL DOESNT WORK ON THE DIAMONDS?? WTF?? OK BUT I GUESS WORST CASE I CAN STILL JUST MAKE THESE 3D

// OK SO IT SEEMS THAT THE ONLY CORRECT WAY TO DO THIS IS BY FOLLOWING THE THREE.JS EXAMPLE, WHICH NOW AFTER I TRY ALL OF THIS STUPID ALTERNATIVES, I'VE COME TO KINDA UNDERSTAND
// SO THE TIMELINE SHOULD BE
// $ Sunday 13 evening : do an easy sample adaptation of the three.js example
// $ Monday-Tues: adapt to my codes
// $ Monday-Tues: reconfigure aesthetics
// $ Wed-Thu: load texture to panels, send ahmed by end of thu
// $ Thu: work on floor
// $ Fri: display text in a div on carpet click + font + tidy up and package into github repo or sth

// ^^^Goals for until 18 Nov
// *** Goals for until 25 nov ***
// $ Beautify Floor (triceratops!)***
// $ Minimal Floor Shape
// $ Beautify buttons ***
// $ Button to start from diff spots with diff zoom levels (review spaces + exhibition space) ***
// $ Screencapture vid for thurs ***
// $ Need triangles ***
// $ Clear any selection if not "in" exhibition space

// *** Goals for until 2 Dec ***
// figure out how to get shadow to reappear
// https://r105.threejsfundamentals.org/threejs/lessons/threejs-shadows.html
// ^ looks like the easiest way is to use fake shadow
// $ Reviews and exhibition space lights on/off + fix floor
// $ Have the image texture at 50% transparceny when not clicked
// $ Fix the carpet shapes
// $ [MONDAY] send the student "index" layout for peter to fill
// $ Change to only zoom in and zoom out mode (there is nothing in review spaces)
// $ remove the steps thingies -> turn into lines, also include the right doors
// $ include lab names & review spaces name in the carpets when not clicked
// $ Camera zoom to the correct rotation
// ^ FIX BY ADDING CAMERA POSITION GSAP
// $ Disable clicking on panels if not "in" exhibition space
// $ thumbnail issue
// $ csv access stuff

// *** Goals for until 9 Dec ***
// $ Layout student details
// $ Prettify html, project details popup etc
// $ get a big button on bottom left corner to go to main site
// I dont like how the lines are glowing too, how to reassign material?
// $ back button to also say "back"
// $ Tidy up & split up codes (+ download all ref, dont use cdn)
// $ Bootstrap -> check adaptability when zoomedd in, out etc (test font size esp)
// $ to add SUTD logo & "GRAD SHOW" on right corner as a default
// $ Test for phone

// *** Goals for until 16 Dec ***
// $ Test for phone
// $ Fix up camera fly to panel for phone
// $ Tidy up & split codes
// $ Add webkit etc

// PROBLEMS
// $ The camera return after fly out is a little inconsistent, check if the changes made for bloom has caused this
// -> this is caused by clicking on multiple panels while zoomed in
// ^^^ SOLVEDDDD - MISSION FAILED SUCCESSFULLY WHILE FIXING ZOOM ANGLES
// $ Clicking the panels isn't very sensitive anymore, need to fix this
// -> somehow started to work better after console.logging pointedkey?? like whut