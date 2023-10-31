import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let camera;
let scene;
let renderer;

let clock;

var playerMesh;
var projectileMesh;
let projectileMeshes = [];

var delay = 0;

var bossMesh;

let keyboard = {};

//////////////////////////////////////////////////////////
// Spawns the player
//////////////////////////////////////////////////////////
async function spawnPlayer(){
    const loader = new GLTFLoader();
    const player = await loader.loadAsync('models/player.glb');
    playerMesh = player.scene.children[0];
    playerMesh.rotateY(45 * Math.PI/2);
    scene.add(playerMesh);
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Spawns bosses
//////////////////////////////////////////////////////////
async function spawnBoss1(){
    const loader = new GLTFLoader();
    const boss = await loader.loadAsync('models/moon.glb');
    bossMesh = boss.scene.children[0];
    bossMesh.position.y = -15;
    bossMesh.position.z = -80;
    bossMesh.rotateY(-89.9);
    bossMesh.scale.set(35,35,35);
    scene.add(bossMesh);
}

async function spawnBoss2(){
    const loader = new GLTFLoader();
    const boss = await loader.loadAsync('models/moth.glb');
    bossMesh = boss.scene.children[0];
    bossMesh.position.y = 0;
    bossMesh.position.z = -100;
    //bossMesh.rotateY(149.9);
    bossMesh.scale.set(7,7,7);
    scene.add(bossMesh);
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Gets keyboard info
//////////////////////////////////////////////////////////
function addKeysListener(){
    window.addEventListener('keydown', function(e){
        keyboard[e.keyCode] = true;
    }, false);
    window.addEventListener('keyup', function(e){
        keyboard[e.keyCode] = false;
    }, false);
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Player movement
//////////////////////////////////////////////////////////
function movePlayer(){
    if(keyboard[65] && playerMesh.position.x > -23){
        playerMesh.position.x -= 0.60;
    }
    if(keyboard[68] && playerMesh.position.x < 23){
        playerMesh.position.x += 0.60;
    }
    if(keyboard[87] && playerMesh.position.z > -23){
        playerMesh.position.z -= 0.60;
    }
    if(keyboard[83] && playerMesh.position.z < 0){
        playerMesh.position.z += 0.60;
    }
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Camera movement
//////////////////////////////////////////////////////////
function moveCamera(){
    if(keyboard[38]){
        camera.position.z = -20;
        camera.position.y = 50;
        camera.rotation.x = -Math.PI / 2;
    }
    if(keyboard[40]){
        camera.position.z = 30;
    camera.position.y = 20;
    camera.position.x = 0;
    camera.rotation.x = -0.3;
    }
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// All shooting related functions
//////////////////////////////////////////////////////////
// Projectile spawning
//////////////////////////////////////////////////////////
async function spawnProjectile(){
    var rng = Math.round(Math.random() * 12);
    switch(rng){
        case 1:
        case 2:
        case 3:
            const gltfLoader1 = new GLTFLoader();
	        const projectileGLTF1 = await gltfLoader1.loadAsync( 'models/PlayerProj/proj1.glb' );
	        projectileMesh = projectileGLTF1.scene;
	        projectileMesh.scale.set(1, 1, 1);
            break;
        case 4:
        case 5:
        case 6:
            const gltfLoader2 = new GLTFLoader();
	        const projectileGLTF2 = await gltfLoader2.loadAsync( 'models/PlayerProj/proj2.glb' );
	        projectileMesh = projectileGLTF2.scene;
	        projectileMesh.scale.set(1, 1, 1);
            break;
        case 7:
        case 8:
        case 9:
            const gltfLoader3 = new GLTFLoader();
	        const projectileGLTF3 = await gltfLoader3.loadAsync( 'models/PlayerProj/proj3.glb' );
	        projectileMesh = projectileGLTF3.scene;
	        projectileMesh.scale.set(1, 1, 1);
            break;
        case 10:
        case 11:
        case 12:
            const gltfLoader4 = new GLTFLoader();
	        const projectileGLTF4 = await gltfLoader4.loadAsync( 'models/PlayerProj/proj4.glb' );
	        projectileMesh = projectileGLTF4.scene;
	        projectileMesh.scale.set(1, 1, 1);
            break;
    }
}
//////////////////////////////////////////////////////////
// Projectile movement
//////////////////////////////////////////////////////////
function updateProjectiles(){
	projectileMeshes.forEach((projectile, index) => {
		projectile.position.z -= 0.5;
		if(projectile.position.z > 23){
			scene.remove(projectile);
			projectileMeshes.splice(index, 1);
		  }
	});
}
//////////////////////////////////////////////////////////
// Shooting
//////////////////////////////////////////////////////////
function shoot(){
    spawnProjectile();
    if (keyboard[32] && delay == 0) {
        let projectileMeshClone = projectileMesh.clone();
        projectileMeshClone.position.x = playerMesh.position.x;
        projectileMeshClone.position.y = playerMesh.position.y;
        projectileMeshClone.position.z = playerMesh.position.z - 3;
        scene.add(projectileMeshClone);
        projectileMeshes.push(projectileMeshClone);
        delay = 15;
      }
}
//////////////////////////////////////////////////////////
//Shooting delay
//////////////////////////////////////////////////////////
function updateDelay(){
    if(delay!=0){
        delay -= 1;
    }
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Carrying the entire project, use it for things that need to move
//////////////////////////////////////////////////////////
function animate() {
    movePlayer();
    moveCamera();
    shoot();
	updateProjectiles();
    updateDelay();

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Basically main
//////////////////////////////////////////////////////////
async function init() {

    //Spawning the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    //Renderer setup
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth , window.innerHeight);


    document.getElementById("main").appendChild( renderer.domElement );

    //Light setup
    const hlight = new THREE.HemisphereLight(0xffffff, 0x000000, 10);
    hlight.position.set(0, 5, 0);
    scene.add(hlight)

    const light = new THREE.PointLight(0xffffff, 1000)
    light.position.set(2.5, 7.5, 15)
    scene.add(light)

    //Starting camera
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    camera.position.z = 30;
    camera.position.y = 20;
    camera.position.x = 0;
    camera.rotation.x = -0.3;

    //Funny game clock
    clock = new THREE.Clock();
  
    spawnPlayer();
    spawnBoss2();
  
    addKeysListener();
    animate();
  
  }
  //////////////////////////////////////////////////////////

  init();