import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';

let camera;
let scene;
let renderer;

const labelRenderer = new CSS2DRenderer();

let p;
let p2;
let cPointLabel;
let cPointLabel2;
let labelX;
let labelY;
let labelZ;

let labelX2;
let labelY2;
let labelZ2;

let clock;

var playerMesh;
var projectileMesh;
let projectileMeshes = [];

var PLAYER_HEALTH_MAX = 10;
var playerHealth = PLAYER_HEALTH_MAX;
var iframes = 0;

var bossPMesh;
let bossPMeshes = [];
let PTriggers = [];
var P1Trig = 0;
let bossPMeshes2 = [];
let PTriggers2 = [];
var P2Trig = 0;
let bossPMeshes3 = [];
var P3Trig = 1;
let bossPMeshes4 = [];
var P4Trig = 1;

let bossPMeshesP2 = [];
let bossPMeshesP22 = [];

var phaseTrigger = 1;

var snakeStart;
var snakerng;
var snakedelay;
var snaketrigger = 0;

const BOSS_HEALTH_MAX_P1 = 20;
const BOSS_HEALTH_MAX_P2 = 20;
var bossHealth = BOSS_HEALTH_MAX_P1;

var bossTag = 1;

var delay = 0;
var bossDelay = 20;
var boss1Delay2 = 90;

var bossMesh;
let bossMeshes = [];

let keyboard = {};
const FIRE_DELAY = 20;

//////////////////////////////////////////////////////////
// Spawns the player
//////////////////////////////////////////////////////////
async function spawnPlayer(){
    const loader = new GLTFLoader();
    const player = await loader.loadAsync('models/player.glb');
    playerMesh = player.scene.children[0];
    playerMesh.rotateY(45 * Math.PI/2);
    scene.add(playerMesh);

    p2.textContent = playerHealth;
    cPointLabel2 = new CSS2DObject(p2);
    cPointLabel2.position.setZ(labelZ2);
    cPointLabel2.position.setX(labelX2);
    cPointLabel2.position.setY(labelY2);
    scene.add(cPointLabel2);
}
//////////////////////////////////////////////////////////
//
//////////////////////////////////////////////////////////
// Boss code
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
    bossMeshes.push(bossMesh);
    scene.add(bossMesh);

    p.textContent = bossHealth;
    cPointLabel = new CSS2DObject(p);
    cPointLabel.position.setZ(labelZ);
    cPointLabel.position.setX(labelX);
    cPointLabel.position.setY(labelY);
    scene.add(cPointLabel);
}

async function spawnBoss2(){
    const loader = new GLTFLoader();
    const boss = await loader.loadAsync('models/moth.glb');
    bossMesh = boss.scene.children[0];
    bossMesh.position.y = 0;
    bossMesh.position.z = -100;
    //bossMesh.rotateY(149.9);
    bossMesh.scale.set(7,7,7);
    bossMeshes.push(bossMesh);
    scene.add(bossMesh);
}
//////////////////////////////////////////////////////////
// Boss attacks
//////////////////////////////////////////////////////////
async function spawnBProjectile(){
        const gltfLoader = new GLTFLoader();
	    const projectileGLTF = await gltfLoader.loadAsync( 'models/Projectile.glb' );
	    bossPMesh = projectileGLTF.scene;
	    bossPMesh.scale.set(1, 1, 1);
}
function boss1Phase1(){
    if(phaseTrigger == 1){
    if(bossDelay == 0){
        let projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 10;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshes.push(projectileMeshClone);
        
        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 20;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshes2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 10;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshes3.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 20;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshes4.push(projectileMeshClone);
        bossDelay = 100;
    }
}
}
function updateBoss1Phase1(){
	bossPMeshes.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 23){
            P1Trig = 1;
        }else if(projectile.position.x < -23){
            P1Trig = 0;
        }
        if(P1Trig == 0){
            projectile.position.x += 0.1;
        }else{
            projectile.position.x -= 0.1;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes.splice(index, 1);
		  }
	});

    bossPMeshes2.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 23){
            P2Trig = 1;
        }else if(projectile.position.x < -23){
            P2Trig = 0;
        }
        if(P2Trig == 0){
            projectile.position.x += 0.1;
        }else{
            projectile.position.x -= 0.1;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes2.splice(index, 1);
		  }
	});

    bossPMeshes3.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 23){
            P3Trig = 1;
        }else if(projectile.position.x < -23){
            P3Trig = 0;
        }
        if(P3Trig == 0){
            projectile.position.x += 0.1;
        }else{
            projectile.position.x -= 0.1;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes3.splice(index, 1);
		  }
	});

    bossPMeshes4.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 23){
            P4Trig = 1;
        }else if(projectile.position.x < -23){
            P4Trig = 0;
        }
        if(P4Trig == 0){
            projectile.position.x += 0.1;
        }else{
            projectile.position.x -= 0.1;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes4.splice(index, 1);
		  }
	});
}

function updateBossDelay(){
    if(bossDelay!=0){
        bossDelay -= 1;
    }

    if(boss1Delay2!=0){
        boss1Delay2 -= 1;
    }
    if(boss1Delay2 == 0){
        snakerng = Math.round(Math.random() * 12);
        snaketrigger = 1;
        snakedelay = 30;
    }
    if(snakedelay != 0){
        snakedelay -= 1;
    }else{
        snaketrigger = 0;
    }
}

function boss1Phase2(){
    if(phaseTrigger == 2){
    if(bossDelay == 0){
        let projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 15;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 5;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        //projectileMeshClone = bossPMesh.clone();
        //projectileMeshClone.position.x = bossMesh.position.x;
        //projectileMeshClone.position.y = bossMesh.position.y;
        //projectileMeshClone.position.z = bossMesh.position.z;
        //scene.add(projectileMeshClone);
        //bossPMeshes.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 5;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 15;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        bossDelay = 150;
    }
        if (snaketrigger == 1){
    switch(snakerng){
        case 1:
            let projectileMeshClone1 = bossPMesh.clone();
        projectileMeshClone1.position.x = bossMesh.position.x - 20;
        projectileMeshClone1.position.y = bossMesh.position.y;
        projectileMeshClone1.position.z = bossMesh.position.z;
        snakeStart = projectileMeshClone1.position.x;
        scene.add(projectileMeshClone1);
        bossPMeshesP22.push(projectileMeshClone1);
        PTriggers.push(0);
            break;
        case 2:
            let projectileMeshClone2 = bossPMesh.clone();
        projectileMeshClone2.position.x = bossMesh.position.x - 10;
        projectileMeshClone2.position.y = bossMesh.position.y;
        projectileMeshClone2.position.z = bossMesh.position.z;
        snakeStart = projectileMeshClone2.position.x;
        scene.add(projectileMeshClone2);
        bossPMeshesP22.push(projectileMeshClone2);
        PTriggers.push(0);
            break;
        case 3:
            let projectileMeshClone3 = bossPMesh.clone();
        projectileMeshClone3.position.x = bossMesh.position.x + 10;
        projectileMeshClone3.position.y = bossMesh.position.y;
        projectileMeshClone3.position.z = bossMesh.position.z;
        snakeStart = projectileMeshClone3.position.x;
        scene.add(projectileMeshClone3);
        bossPMeshesP22.push(projectileMeshClone3);
        PTriggers.push(0);
            break;
        case 4:
            let projectileMeshClone4 = bossPMesh.clone();
        projectileMeshClone4.position.x = bossMesh.position.x + 20;
        projectileMeshClone4.position.y = bossMesh.position.y;
        projectileMeshClone4.position.z = bossMesh.position.z;
        snakeStart = projectileMeshClone4.position.x;
        scene.add(projectileMeshClone4);
        bossPMeshesP22.push(projectileMeshClone4);
        PTriggers.push(0);
            break;
        }

    boss1Delay2 = 150;
    }
}
}


function updateBoss1Phase2(){
	bossPMeshesP2.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 23){
            P1Trig = 1;
        }else if(projectile.position.x < -23){
            P1Trig = 0;
        }
        if(P1Trig == 0){
            projectile.position.x += 0.1;
        }else{
            projectile.position.x -= 0.1;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshesP2.splice(index, 1);
		  }
	});

    bossPMeshesP22.forEach((projectile, index) => {
		projectile.position.z += 0.4;
        if(projectile.position.x > snakeStart + 5){
            PTriggers[index] = 1;
        }else if(projectile.position.x < snakeStart - 5){
            PTriggers[index] = 0;
        }
        if(PTriggers[index] == 0){
            projectile.position.x += 0.3;
        }else if (PTriggers[index] == 1){
            projectile.position.x -= 0.3;
        }
		if(projectile.position.z > 40){
			scene.remove(projectile);
			bossPMeshesP22.splice(index, 1);
            PTriggers.splice(index, 1);
		  }
	});
}

//////////////////////////////////////////////////////////

function updateBossHealth(){
    updateBossHealthUI(bossTag);
    switch(bossTag){
        case 1:
            bossHealth -= 1;
            p.textContent = bossHealth;
    cPointLabel = new CSS2DObject(p);
    cPointLabel.position.setZ(labelZ);
    cPointLabel.position.setX(labelX);
    cPointLabel.position.setY(labelY);
    scene.add(cPointLabel);
            if(bossHealth == 0){
                bossDelay = 100;
                delay = 60;
                projectileMeshes.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        projectileMeshes.splice(index, 1);
                })
                bossMeshes.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossMeshes.splice(index, 1);
                })
                spawnBoss2();
                bossHealth = BOSS_HEALTH_MAX_P2;
                bossTag = 2;
                phaseTrigger = 1;
            }
            if(bossHealth == 5){
                phaseTrigger = 2;
            }
            break;
        case 2:
            bossHealth -= 1;
            if(bossHealth == 0){
                bossDelay = 100;
                delay = 60;
                projectileMeshes.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        projectileMeshes.splice(index, 1);
                })
                bossMeshes.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossMeshes.splice(index, 1);
                })
                bossHealth = 20;
                bossTag = 3;
            }
            break;
        case 3:
            break;
    }
}

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
// Player collision
//////////////////////////////////////////////////////////
function checkCollision(){
    bossPMeshes.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 1 &&
            playerMesh.position.x <= projectile.position.x + 1 &&
            playerMesh.position.z >= projectile.position.z - 1 &&
            playerMesh.position.z <= projectile.position.z + 1 && iframes == 0){
                updatePlayerHealthUI();
                playerHealth -= 1;
                p2.textContent = playerHealth;
    cPointLabel2 = new CSS2DObject(p2);
    cPointLabel2.position.setZ(labelZ2);
    cPointLabel2.position.setX(labelX2);
    cPointLabel2.position.setY(labelY2);
    scene.add(cPointLabel2);
                iframes = 30;
                console.log(playerHealth);
            }
    })
    if(playerHealth == 0){
        location.reload();
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
        camera.rotation.y = 0;
        camera.position.x = 0;

        labelX = -70;
        labelY = 0;
        labelZ = -55;
    
        labelX2 = -69;
        labelY2 = 0;
        labelZ2 = 6;
    
        p.textContent = bossHealth;
        cPointLabel = new CSS2DObject(p);
        cPointLabel.position.setZ(labelZ);
        cPointLabel.position.setX(labelX);
        cPointLabel.position.setY(labelY);
        scene.add(cPointLabel);
    
        p2.textContent = playerHealth;
        cPointLabel2 = new CSS2DObject(p2);
        cPointLabel2.position.setZ(labelZ2);
        cPointLabel2.position.setX(labelX2);
        cPointLabel2.position.setY(labelY2);
        scene.add(cPointLabel2);
    }
    if(keyboard[40]){
        camera.position.z = 30;
    camera.position.y = 20;
    camera.position.x = 0;
    camera.rotation.x = -0.3;
    camera.rotation.y = 0;

    labelX = -35;
    labelY = 30;
    labelZ = 0;

    labelX2 = -52;
    labelY2 = -10;
    labelZ2 = 0;

    p.textContent = bossHealth;
    cPointLabel = new CSS2DObject(p);
    cPointLabel.position.setZ(labelZ);
    cPointLabel.position.setX(labelX);
    cPointLabel.position.setY(labelY);
    scene.add(cPointLabel);

    p2.textContent = playerHealth;
    cPointLabel2 = new CSS2DObject(p2);
    cPointLabel2.position.setZ(labelZ2);
    cPointLabel2.position.setX(labelX2);
    cPointLabel2.position.setY(labelY2);
    scene.add(cPointLabel2);
    }

    if(keyboard[37]){
        camera.position.z = -30;
        camera.position.y = 10;
        camera.position.x = -65;
        camera.rotation.y = -1.8;
        camera.rotation.x = 0;

    labelX = 0;
    labelY = 75;
    labelZ = 120;

    labelX2 = 0;
    labelY2 = -40;
    labelZ2 = 120;

    p.textContent = bossHealth;
    cPointLabel = new CSS2DObject(p);
    cPointLabel.position.setZ(labelZ);
    cPointLabel.position.setX(labelX);
    cPointLabel.position.setY(labelY);
    scene.add(cPointLabel);

    p2.textContent = playerHealth;
    cPointLabel2 = new CSS2DObject(p2);
    cPointLabel2.position.setZ(labelZ2);
    cPointLabel2.position.setX(labelX2);
    cPointLabel2.position.setY(labelY2);
    scene.add(cPointLabel2);
    }

    if(keyboard[39]){
        camera.position.z = -30;
        camera.position.y = 10;
        camera.position.x = 65;
        camera.rotation.y = 1.8;
        camera.rotation.x = 0;

        labelX = 0;
        labelY = 75;
        labelZ = 120;
    
        labelX2 = 0;
        labelY2 = -40;
        labelZ2 = 120;

    p.textContent = bossHealth;
    cPointLabel = new CSS2DObject(p);
    cPointLabel.position.setZ(labelZ);
    cPointLabel.position.setX(labelX);
    cPointLabel.position.setY(labelY);
    scene.add(cPointLabel);

    p2.textContent = playerHealth;
    cPointLabel2 = new CSS2DObject(p2);
    cPointLabel2.position.setZ(labelZ2);
    cPointLabel2.position.setX(labelX2);
    cPointLabel2.position.setY(labelY2);
    scene.add(cPointLabel2);
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
            const gltfLoader1 = new GLTFLoader();
            const projectileGLTF1 = await gltfLoader1.loadAsync( 'models/PlayerProj/proj1.glb' );
            projectileMesh = projectileGLTF1.scene;
            projectileMesh.scale.set(1, 1, 1);
            break;
        case 2:
            const gltfLoader2 = new GLTFLoader();
            const projectileGLTF2 = await gltfLoader2.loadAsync( 'models/PlayerProj/proj2.glb' );
            projectileMesh = projectileGLTF2.scene;
            projectileMesh.scale.set(1, 1, 1);
            break;
        case 3:
            const gltfLoader3 = new GLTFLoader();
            const projectileGLTF3 = await gltfLoader3.loadAsync( 'models/PlayerProj/proj3.glb' );
            projectileMesh = projectileGLTF3.scene;
            projectileMesh.scale.set(1, 1, 1);
            break;
        case 4:
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
		if(projectile.position.z < -45){
			scene.remove(projectile);
			projectileMeshes.splice(index, 1);
            updateBossHealth();
		  }
	});
}
//////////////////////////////////////////////////////////
// Shooting
//////////////////////////////////////////////////////////
function shoot(){
    spawnProjectile();
    if (keyboard[32] && delay == 0) {
        const laserSound = new THREE.Audio( listener );   
        audioLoader.load('../sounds/laserSoundPlayer.MP3', function( buffer ){
            laserSound.setBuffer( buffer );
            laserSound.setLoop( false );
            laserSound.setVolume( 0.05);
            laserSound.play();
        })
        let projectileMeshClone = projectileMesh.clone();
        projectileMeshClone.position.x = playerMesh.position.x;
        projectileMeshClone.position.y = playerMesh.position.y;
        projectileMeshClone.position.z = playerMesh.position.z - 3;
        scene.add(projectileMeshClone);
        projectileMeshes.push(projectileMeshClone);
        delay = FIRE_DELAY;
      }
}
//////////////////////////////////////////////////////////
//Shooting delay
//////////////////////////////////////////////////////////
function updateDelay(){
    if(delay!=0){
        delay -= 1;
    }
    if(iframes != 0){
        iframes -= 1;
    }
}

//////////////////////////////////////////////////////////
// Boss Health Bar
//////////////////////////////////////////////////////////
function updateBossHealthUI(bossTag){
    var elem = document.getElementById("bossHealthBar");
    switch (bossTag) {
        case 1:
            elem.style.width = (bossHealth / BOSS_HEALTH_MAX_P1 * 100) + "%";
            break;
        
        case 2:
            elem.style.width = (bossHealth / BOSS_HEALTH_MAX_P2 * 100) + "%";
            break;
        
        default:
            break;
    }
    
}

//////////////////////////////////////////////////////////
// Player Health Bar
//////////////////////////////////////////////////////////
function updatePlayerHealthUI(){
    var elem = document.getElementById("playerHealthBar");
    elem.style.width = (playerHealth / PLAYER_HEALTH_MAX * 100) + "%";
    
}

//////////////////////////////////////////////////////////
// Carrying the entire project, use it for things that need to move
//////////////////////////////////////////////////////////
function animate() {
    movePlayer();
    moveCamera();
    shoot();
    boss1Phase1();
    boss1Phase2();
	updateProjectiles();
    updateBoss1Phase1();
    updateBoss1Phase2();
    updateDelay();
    updateBossDelay();
    checkCollision();

    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
    requestAnimationFrame(animate)
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Sounds area
//////////////////////////////////////////////////////////
const listener = new THREE.AudioListener();
//camera.add(listener);

const audioLoader = new THREE.AudioLoader();
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Basically main
//////////////////////////////////////////////////////////
async function init() {

    //Spawning the scene
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xdddddd);

    //Space background image
    var loadBackground = new THREE.TextureLoader();
    loadBackground.load("./Images/DarkSpace.png", function (texture){
        scene.background = texture;
    });

    //Renderer setup
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth , window.innerHeight);

    labelRenderer.setSize(window.innerWidth , window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.color = "white";
    labelRenderer.domElement.style.fontFamily = "sans-serif";
    labelRenderer.domElement.style.fontWeight = "bold";
    labelRenderer.domElement.style.fontSize = "30px";
    document.body.appendChild(labelRenderer.domElement);

    const backgroundSound = new THREE.Audio( listener );
audioLoader.load('../sounds/backgroundMusic.MP3', function( buffer ){
    backgroundSound.setBuffer( buffer );
    backgroundSound.setLoop( true );
    backgroundSound.setVolume( 0.01);
    backgroundSound.play();
});


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
    //camera.lookAt(scene.position);
    labelX = -35;
    labelY = 30;
    labelZ = 0;

    labelX2 = -52;
    labelY2 = -10;
    labelZ2 = 0;

    p = document.createElement('p');
    p2 = document.createElement('p');

    //Funny game clock
    clock = new THREE.Clock();
  
    spawnPlayer();
    spawnBoss1();
    spawnBProjectile();
    
    addKeysListener();
    animate();
  
  }
  //////////////////////////////////////////////////////////

  init();