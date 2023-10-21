import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

let camera;
let scene;
let renderer;

let clock;

var player;
var projectileMesh;
let projectileMeshes = [];

var delay = 0;

let mixers = [];

let keyboard = {};

//////////////////////////////////////////////////////////
// Spawns the player
//////////////////////////////////////////////////////////
async function spawnPlayer(){
    const loader = new GLTFLoader();
    loader.load('models/DroneAttack.glb', function(gltf){
        player = gltf.scene;
        scene.add(player);
    })
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Gets key info
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
    if(keyboard[65] && player.position.x > -43){
        player.position.x -= 0.60;
    }
    if(keyboard[68] && player.position.x < 43){
        player.position.x += 0.60;
    }
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// All shooting related functions
//////////////////////////////////////////////////////////
// Projectile spawning
//////////////////////////////////////////////////////////
async function spawnProjectile(){
    const gltfLoader = new GLTFLoader();
	const projectileGLTF = await gltfLoader.loadAsync( 'models/Projectile.glb' );
	projectileMesh = projectileGLTF.scene;
	projectileMesh.scale.set(1, 1, 1);
}
//////////////////////////////////////////////////////////
// Projectile movement
//////////////////////////////////////////////////////////
function updateProjectiles(){
	projectileMeshes.forEach((projectile, index) => {
		projectile.position.z += 0.5;
		if(projectile.position.z > 40){
			scene.remove(projectile);
			projectileMeshes.splice(index, 1);
		  }
	});
}
//////////////////////////////////////////////////////////
// Shooting
//////////////////////////////////////////////////////////
function shoot(){
    if (keyboard[32] && delay == 0) {
        let projectileMeshClone = projectileMesh.clone();
        projectileMeshClone.position.x = player.position.x;
        projectileMeshClone.position.y = player.position.y;
        projectileMeshClone.position.z = player.position.z;
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
    shoot();
	updateProjectiles();
    updateDelay();

    renderer.render(scene, camera)
    requestAnimationFrame(animate)

    const dt = clock.getDelta();
	for ( const mixer of mixers ) mixer.update( dt );
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
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //Light setup
    const hlight = new THREE.AmbientLight(0x404040, 100)
    scene.add(hlight)

    const light = new THREE.PointLight(0xffffff, 1000)
    light.position.set(2.5, 7.5, 15)
    scene.add(light)

    //Camera stuff, not final, will be changed when camera moves to keys/mouse
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    camera.position.y = -50;
    camera.lookAt( scene.position ); // the origin
    if (camera.position.z < 0) {
        camera.rotation.z = 0;
    }

    //Funny game clock
    clock = new THREE.Clock();
  
    spawnPlayer();
    spawnProjectile();
  
  
    addKeysListener();
    animate();
  
  }
  //////////////////////////////////////////////////////////

  init();