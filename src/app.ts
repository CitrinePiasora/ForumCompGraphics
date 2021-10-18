import * as BABYLON from "babylonjs";
import 'babylonjs-loaders';

// Default BabylonJS setup
let canvas : any = document.getElementById("renderCanvas");
let engine = new BABYLON.Engine(canvas, true);
let scene = new BABYLON.Scene(engine);

// Camera setup
let camera = new BABYLON.ArcRotateCamera("camera1", 0, 0.8, 100, BABYLON.Vector3.Zero(), scene);
camera.attachControl(canvas, false);

// Lightning setup
let light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0,5,0), scene);
let light2 = new BABYLON.PointLight("Omni", new BABYLON.Vector3(0, 5, 0), scene);

// Object setup
// create three colors
let red = new BABYLON.Color3(1.0, 0.0, 0.0);
let green = new BABYLON.Color3(0.0, 1.0, 0.0);
let blue = new BABYLON.Color3(0.0, 0.0, 1.0);

// load the Utah teapot model to the scene
BABYLON.SceneLoader.ImportMeshAsync("", "dist/models/", "teapot.obj", scene).then((result) => {
    let teapot = result.meshes[0];

    // set the camera target to the teapot
    camera.target = teapot.getAbsolutePosition();
    // set scaling and rotation for the teapot
    teapot.scaling = new BABYLON.Vector3(0.025, 0.025, 0.025);
    teapot.rotation = new BABYLON.Vector3(-Math.PI/2, 0, 0);
    // set default teapot color
    let mat =  new BABYLON.StandardMaterial("mat", scene);
    mat.diffuseColor = red;
    teapot.material = mat;

    // change teapot color when it is clicked
    teapot.actionManager = new BABYLON.ActionManager(scene);
    teapot.actionManager.registerAction(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            teapot,
            'material.diffuseColor',
            green,
            1000
        )
    ).then(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            teapot,
            'material.diffuseColor',
            blue,
            1000
        )
    ).then(
        new BABYLON.InterpolateValueAction(
            BABYLON.ActionManager.OnPickTrigger,
            teapot,
            'material.diffuseColor',
            red,
            1000
        )
    );
});


engine.runRenderLoop( () => {
    scene.render();
})   

window.addEventListener("resize", () => {
    engine.resize();
})