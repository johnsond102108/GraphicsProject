import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';

let camera;
let scene;
let renderer;

let backgroundSound;
let laserSound;

let end = false;

const labelRenderer = new CSS2DRenderer();

let p = document.createElement('img');
p.src = 'Images/wormWarning.png';
let cPointLabel;

let p2 = document.createElement('img');
p2.src = 'Images/end.png';
p2.style.position = 'absolute';
p2.style.top = '0px';
p2.style.width = '100%';

let clock;

var playerMesh;
var projectileMesh;
let projectileMeshes = [];

const PLAYER_HEALTH_MAX = 5;
var playerHealth = PLAYER_HEALTH_MAX;
var iframes = 0;

var bossPMesh;
var bossPMesh2;
let bossPMeshes = [];
let PTriggers = [];
var P1Trig = 0;
let bossPMeshes2 = [];
var P2Trig = 0;
let bossPMeshes3 = [];
var P3Trig = 1;
let bossPMeshes4 = [];
var P4Trig = 1;

let bossPMeshes5 = [];
var P5Trig = 0;
let bossPMeshes6 = [];
var P6Trig = 1;

let bossPMeshesP2 = [];
let bossPMeshesP22 = [];

let boss2Meshes = [];
let boss2MeshesHorzL = [];
let boss2MeshesHorzR = [];

var phaseTrigger = 1;

var snakeStart;
var snakerng;
var snakedelay;
var snaketrigger = 0;

var wormRNG;
var wormDelay = 0;
const MAX_WARNING_DELAY = 50;
var warningDelay = MAX_WARNING_DELAY;
var warningTrigger = 0;

const BOSS_HEALTH_MAX_P1 = 15;
const BOSS_HEALTH_MAX_P2 = 20;
var bossHealth = BOSS_HEALTH_MAX_P1;

var bossTag = 1;

var delay = 0;
var bossDelay = 20;
var boss1Delay2 = 90;

var bossMesh;
let bossMeshes = [];

let keyboard = {};

const FIRE_DELAY = 40;

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

async function spawnBProjectile2(){
    const gltfLoader = new GLTFLoader();
    const projectileGLTF = await gltfLoader.loadAsync('models/worm.glb');
    bossPMesh2 = projectileGLTF.scene;
    bossPMesh2.scale.set(3,3,3);

    //bossPMesh3 = projectileGLTF.scene;
    //bossPMesh3.scale.set(1,1,1);
}

function boss1Phase1(){
    if(phaseTrigger == 1){
    if(bossDelay == 0){
        let projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 10;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshes.push(projectileMeshClone);
        
        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 20;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshes2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 10;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshes3.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 20;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshes4.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 40;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshes5.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 40;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshes6.push(projectileMeshClone);
        bossDelay = 100;
    }
}
}
function updateBoss1Phase1(){
	bossPMeshes.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 90){
            P1Trig = 1;
        }else if(projectile.position.x < -90){
            P1Trig = 0;
        }
        if(P1Trig == 0){
            projectile.position.x += 0.3;
        }else{
            projectile.position.x -= 0.3;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes.splice(index, 1);
		  }
	});

    bossPMeshes2.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 90){
            P2Trig = 1;
        }else if(projectile.position.x < -90){
            P2Trig = 0;
        }
        if(P2Trig == 0){
            projectile.position.x += 0.3;
        }else{
            projectile.position.x -= 0.3;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes2.splice(index, 1);
		  }
	});

    bossPMeshes3.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 90){
            P3Trig = 1;
        }else if(projectile.position.x < -90){
            P3Trig = 0;
        }
        if(P3Trig == 0){
            projectile.position.x += 0.3;
        }else{
            projectile.position.x -= 0.3;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes3.splice(index, 1);
		  }
	});

    bossPMeshes4.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 90){
            P4Trig = 1;
        }else if(projectile.position.x < -90){
            P4Trig = 0;
        }
        if(P4Trig == 0){
            projectile.position.x += 0.3;
        }else{
            projectile.position.x -= 0.3;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes4.splice(index, 1);
		  }
	});

    bossPMeshes5.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 90){
            P5Trig = 1;
        }else if(projectile.position.x < -90){
            P5Trig = 0;
        }
        if(P5Trig == 0){
            projectile.position.x += 0.3;
        }else{
            projectile.position.x -= 0.3;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes5.splice(index, 1);
		  }
	});

    bossPMeshes6.forEach((projectile, index) => {
		projectile.position.z += 0.1;
        if(projectile.position.x > 90){
            P6Trig = 1;
        }else if(projectile.position.x < -90){
            P6Trig = 0;
        }
        if(P6Trig == 0){
            projectile.position.x += 0.3;
        }else{
            projectile.position.x -= 0.3;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshes6.splice(index, 1);
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

    if(wormDelay!=0){
        wormDelay -= 1;
    }
}

function boss1Phase2(){
    if(phaseTrigger == 2){
    if(bossDelay == 0){
        let projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 25;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 15;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 5;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
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
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 15;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        projectileMeshClone = bossPMesh.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 25;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 30;
        scene.add(projectileMeshClone);
        bossPMeshesP2.push(projectileMeshClone);

        bossDelay = 150;
    }
        if (snaketrigger == 1){
    switch(snakerng){
        case 1:
            let projectileMeshClone1 = bossPMesh.clone();
        projectileMeshClone1.position.x = bossMesh.position.x - 60;
        projectileMeshClone1.position.y = bossMesh.position.y;
        projectileMeshClone1.position.z = bossMesh.position.z;
        snakeStart = projectileMeshClone1.position.x;
        scene.add(projectileMeshClone1);
        bossPMeshesP22.push(projectileMeshClone1);
        PTriggers.push(0);
            break;
        case 2:
            let projectileMeshClone2 = bossPMesh.clone();
        projectileMeshClone2.position.x = bossMesh.position.x - 20;
        projectileMeshClone2.position.y = bossMesh.position.y;
        projectileMeshClone2.position.z = bossMesh.position.z;
        snakeStart = projectileMeshClone2.position.x;
        scene.add(projectileMeshClone2);
        bossPMeshesP22.push(projectileMeshClone2);
        PTriggers.push(0);
            break;
        case 3:
            let projectileMeshClone3 = bossPMesh.clone();
        projectileMeshClone3.position.x = bossMesh.position.x + 20;
        projectileMeshClone3.position.y = bossMesh.position.y;
        projectileMeshClone3.position.z = bossMesh.position.z;
        snakeStart = projectileMeshClone3.position.x;
        scene.add(projectileMeshClone3);
        bossPMeshesP22.push(projectileMeshClone3);
        PTriggers.push(0);
            break;
        case 4:
            let projectileMeshClone4 = bossPMesh.clone();
        projectileMeshClone4.position.x = bossMesh.position.x + 60;
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
        if(projectile.position.x > 90){
            P1Trig = 1;
        }else if(projectile.position.x < -90){
            P1Trig = 0;
        }
        if(P1Trig == 0){
            projectile.position.x += 0.6;
        }else{
            projectile.position.x -= 0.6;
        }
		if(projectile.position.z > 50){
			scene.remove(projectile);
			bossPMeshesP2.splice(index, 1);
		  }
	});

    bossPMeshesP22.forEach((projectile, index) => {
		projectile.position.z += 0.6;
        if(projectile.position.x > snakeStart + 15){
            PTriggers[index] = 1;
        }else if(projectile.position.x < snakeStart - 15){
            PTriggers[index] = 0;
        }
        if(PTriggers[index] == 0){
            projectile.position.x += 0.6;
        }else if (PTriggers[index] == 1){
            projectile.position.x -= 0.6;
        }
		if(projectile.position.z > 40){
			scene.remove(projectile);
			bossPMeshesP22.splice(index, 1);
            PTriggers.splice(index, 1);
		  }
	});
}


function boss2Phase1(){
    if(phaseTrigger == 1){
    if(bossDelay == 0){
        let projectileMeshClone = bossPMesh2.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 10;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 50;
        scene.add(projectileMeshClone);
        boss2Meshes.push(projectileMeshClone);
        
        projectileMeshClone = bossPMesh2.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 30;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 50;
        scene.add(projectileMeshClone);
        boss2Meshes.push(projectileMeshClone);

        projectileMeshClone = bossPMesh2.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 10;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 50;
        scene.add(projectileMeshClone);
        boss2Meshes.push(projectileMeshClone);

        projectileMeshClone = bossPMesh2.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 30;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 50;
        scene.add(projectileMeshClone);
        boss2Meshes.push(projectileMeshClone);

        projectileMeshClone = bossPMesh2.clone();
        projectileMeshClone.position.x = bossMesh.position.x - 50;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 50;
        scene.add(projectileMeshClone);
        boss2Meshes.push(projectileMeshClone);

        projectileMeshClone = bossPMesh2.clone();
        projectileMeshClone.position.x = bossMesh.position.x + 50;
        projectileMeshClone.position.y = bossMesh.position.y;
        projectileMeshClone.position.z = bossMesh.position.z + 50;
        scene.add(projectileMeshClone);
        boss2Meshes.push(projectileMeshClone);
        bossDelay = 300;
    }
    if(wormDelay == 0){
        wormRNG = Math.floor(Math.random() * 12) + 1;
        if(warningTrigger == 0){
            warningTrigger = 1;
            switch(wormRNG){
                case 1:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(0);
                    cPointLabel.position.setX(70);
                    scene.add(cPointLabel);
                    break;
                case 2:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-4);
                    cPointLabel.position.setX(70);
                    scene.add(cPointLabel);
                    break;
                case 3:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-8);
                    cPointLabel.position.setX(70);
                    scene.add(cPointLabel);
                    break;
                case 4:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-12);
                    cPointLabel.position.setX(70);
                    scene.add(cPointLabel);
                    break;
                case 5:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-16);
                    cPointLabel.position.setX(70);
                    scene.add(cPointLabel);
                    break;
                case 6:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-20);
                    cPointLabel.position.setX(70);
                    scene.add(cPointLabel);
                    break;
                case 7:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(0);
                    cPointLabel.position.setX(-70);
                    scene.add(cPointLabel);
                    break;
                case 8:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-4);
                    cPointLabel.position.setX(-70);
                    scene.add(cPointLabel);
                    break;
                case 9:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-8);
                    cPointLabel.position.setX(-70);
                    scene.add(cPointLabel);
                    break;
                case 10:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-12);
                    cPointLabel.position.setX(-70);
                    scene.add(cPointLabel);
                    break;
                case 11:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-16);
                    cPointLabel.position.setX(-70);
                    scene.add(cPointLabel);
                    break;
                case 12:
                    cPointLabel = new CSS2DObject(p);
                    cPointLabel.position.setZ(-20);
                    cPointLabel.position.setX(-70);
                    scene.add(cPointLabel);
                    break;
            }
        }
        wormDelay = 100;
    }
}
}

function warningDelayUpdate(){
    if(warningTrigger == 1){
        if(warningDelay >= 0){
            warningDelay -= 1;
        }
        if(warningDelay == 0){
            switch(wormRNG){
                case 1:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone = bossPMesh2.clone();
                    projectileMeshClone.position.x = 70;
                    projectileMeshClone.position.z = 0;
                    projectileMeshClone.rotateY(-1.5);
                    projectileMeshClone.scale.set(1,1,1);
                    scene.add(projectileMeshClone);
                    boss2MeshesHorzR.push(projectileMeshClone);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 2:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone1 = bossPMesh2.clone();
                    projectileMeshClone1.position.x = 70;
                    projectileMeshClone1.position.z = -4;
                    projectileMeshClone1.rotateY(-1.5);
                    projectileMeshClone1.scale.set(1,1,1);
                    scene.add(projectileMeshClone1);
                    boss2MeshesHorzR.push(projectileMeshClone1);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 3:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone2 = bossPMesh2.clone();
                    projectileMeshClone2.position.x = 70;
                    projectileMeshClone2.position.z = -8;
                    projectileMeshClone2.rotateY(-1.5);
                    projectileMeshClone2.scale.set(1,1,1);
                    scene.add(projectileMeshClone2);
                    boss2MeshesHorzR.push(projectileMeshClone2);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 4:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone3 = bossPMesh2.clone();
                    projectileMeshClone3.position.x = 70;
                    projectileMeshClone3.position.z = -12;
                    projectileMeshClone3.rotateY(-1.5);
                    projectileMeshClone3.scale.set(1,1,1);
                    scene.add(projectileMeshClone3);
                    boss2MeshesHorzR.push(projectileMeshClone3);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 5:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone4 = bossPMesh2.clone();
                    projectileMeshClone4.position.x = 70;
                    projectileMeshClone4.position.z = -16;
                    projectileMeshClone4.rotateY(-1.5);
                    projectileMeshClone4.scale.set(1,1,1);
                    scene.add(projectileMeshClone4);
                    boss2MeshesHorzR.push(projectileMeshClone4);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 6:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone5 = bossPMesh2.clone();
                    projectileMeshClone5.position.x = 70;
                    projectileMeshClone5.position.z = -20;
                    projectileMeshClone5.rotateY(-1.5);
                    projectileMeshClone5.scale.set(1,1,1);
                    scene.add(projectileMeshClone5);
                    boss2MeshesHorzR.push(projectileMeshClone5);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 7:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone6 = bossPMesh2.clone();
                    projectileMeshClone6.position.x = -70;
                    projectileMeshClone6.position.z = 0;
                    projectileMeshClone6.rotateY(1.5);
                    projectileMeshClone6.scale.set(1,1,1);
                    scene.add(projectileMeshClone6);
                    boss2MeshesHorzL.push(projectileMeshClone6);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 8:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone7 = bossPMesh2.clone();
                    projectileMeshClone7.position.x = -70;
                    projectileMeshClone7.position.z = -4;
                    projectileMeshClone7.rotateY(1.5);
                    projectileMeshClone7.scale.set(1,1,1);
                    scene.add(projectileMeshClone7);
                    boss2MeshesHorzL.push(projectileMeshClone7);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 9:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone8 = bossPMesh2.clone();
                    projectileMeshClone8.position.x = -70;
                    projectileMeshClone8.position.z = -8;
                    projectileMeshClone8.rotateY(1.5);
                    projectileMeshClone8.scale.set(1,1,1);
                    scene.add(projectileMeshClone8);
                    boss2MeshesHorzL.push(projectileMeshClone8);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 10:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone9 = bossPMesh2.clone();
                    projectileMeshClone9.position.x = -70;
                    projectileMeshClone9.position.z = -12;
                    projectileMeshClone9.rotateY(1.5);
                    projectileMeshClone9.scale.set(1,1,1);
                    scene.add(projectileMeshClone9);
                    boss2MeshesHorzL.push(projectileMeshClone9);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 11:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone10 = bossPMesh2.clone();
                    projectileMeshClone10.position.x = -70;
                    projectileMeshClone10.position.z = -16;
                    projectileMeshClone10.rotateY(1.5);
                    projectileMeshClone10.scale.set(1,1,1);
                    scene.add(projectileMeshClone10);
                    boss2MeshesHorzL.push(projectileMeshClone10);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
                case 12:
                    warningTrigger = 0;
                    scene.remove(cPointLabel);
                    let projectileMeshClone11 = bossPMesh2.clone();
                    projectileMeshClone11.position.x = -70;
                    projectileMeshClone11.position.z = -20;
                    projectileMeshClone11.rotateY(1.5);
                    projectileMeshClone11.scale.set(1,1,1);
                    scene.add(projectileMeshClone11);
                    boss2MeshesHorzL.push(projectileMeshClone11);
                    warningDelay = MAX_WARNING_DELAY;
                    break;
            }
        }
    }
}

function updateBoss2Phase1(){
	boss2Meshes.forEach((projectile, index) => {
		projectile.position.z += 0.1;
		if(projectile.position.z > 50){
			scene.remove(projectile);
			boss2Meshes.splice(index, 1);
		  }
	});
    boss2MeshesHorzR.forEach((projectile, index) => {
        projectile.position.x -= 0.6;
        if(projectile.position.x < -100){
            scene.remove(projectile);
            boss2MeshesHorzR.splice(index,1);
        }
    })
    boss2MeshesHorzL.forEach((projectile, index) => {
        projectile.position.x += 0.6;
        if(projectile.position.x > 100){
            scene.remove(projectile);
            boss2MeshesHorzL.splice(index,1);
        }
    })
}

//////////////////////////////////////////////////////////

function updateBossHealth(){
    switch(bossTag){
        case 1:
            bossHealth -= 1;
            updateBossHealthUI(bossTag);
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
                bossPMeshes.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshes.splice(index, 1);
                })
                bossPMeshes2.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshes2.splice(index, 1);
                })
                bossPMeshes3.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshes3.splice(index, 1);
                })
                bossPMeshes4.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshes4.splice(index, 1);
                })
                bossPMeshes5.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshes5.splice(index, 1);
                })
                bossPMeshes6.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshes6.splice(index, 1);
                })

                bossPMeshesP2.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshesP2.splice(index, 1);
                })
                bossPMeshesP22.forEach((projectile, index) =>{
                    scene.remove(projectile);
			        bossPMeshesP22.splice(index, 1);
                })
                spawnBoss2();
                bossHealth = BOSS_HEALTH_MAX_P2;
                bossTag = 2;
                phaseTrigger = 1;
                updateBossHealthUI(bossTag);
            }
            if(bossHealth == 10){
                phaseTrigger = 2;
            }
            break;
        case 2:
            bossHealth -= 1;
            updateBossHealthUI(bossTag);
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
            }
            if(bossHealth <= 0){
                end = true;
                document.body.appendChild(p2);
                backgroundSound.stop();
                scene.remove(cPointLabel);
            }
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
    if(keyboard[65] && playerMesh.position.x > -60){
        playerMesh.position.x -= 0.60;
    }
    if(keyboard[68] && playerMesh.position.x < 60){
        playerMesh.position.x += 0.60;
    }
    if(keyboard[87] && playerMesh.position.z > -23){
        playerMesh.position.z -= 0.60;
    }
    if(keyboard[83] && playerMesh.position.z < 10){
        playerMesh.position.z += 0.60;
    }
}
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
// Player collision
//////////////////////////////////////////////////////////
function checkCollision(){
    bossPMeshes.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })

    bossPMeshes2.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })
    bossPMeshes3.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })
    bossPMeshes4.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })
    bossPMeshes5.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })
    bossPMeshes6.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })

    bossPMeshesP2.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })
    bossPMeshesP22.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
            }
    })

    boss2Meshes.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 10 &&
            playerMesh.position.x <= projectile.position.x + 10 &&
            playerMesh.position.z >= projectile.position.z - 10 &&
            playerMesh.position.z <= projectile.position.z + 10 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
        }
        projectileMeshes.forEach((projectileA, indexA) => {
            if(projectile.position.x >= projectileA.position.x - 10 &&
                projectile.position.x <= projectileA.position.x + 10 &&
                projectile.position.z >= projectileA.position.z - 10 &&
                projectile.position.z <= projectileA.position.z + 10){
                    scene.remove(projectile);
			        boss2Meshes.splice(index, 1);
                    scene.remove(projectileA);
                    projectileMeshes.splice(indexA, 1);
            }
        })
    })
    boss2MeshesHorzL.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
        }
    })

    boss2MeshesHorzR.forEach((projectile, index) => {
        if(playerMesh.position.x >= projectile.position.x - 3 &&
            playerMesh.position.x <= projectile.position.x + 3 &&
            playerMesh.position.z >= projectile.position.z - 3 &&
            playerMesh.position.z <= projectile.position.z + 3 && iframes == 0){
                playerHealth -= 1;
                updatePlayerHealthUI();
                iframes = 100;
        }
    })

    if(playerHealth <= 0){
        end = true;
        document.body.appendChild(p2);
        backgroundSound.stop();
        scene.remove(cPointLabel);
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
    }
    if(keyboard[40]){
        camera.position.z = 30;
    camera.position.y = 20;
    camera.position.x = 0;
    camera.rotation.x = -0.3;
    camera.rotation.y = 0;
    }

    if(keyboard[37]){
        camera.position.z = -30;
        camera.position.y = 10;
        camera.position.x = -65;
        camera.rotation.y = -1.8;
        camera.rotation.x = 0;
    }

    if(keyboard[39]){
        camera.position.z = -30;
        camera.position.y = 10;
        camera.position.x = 65;
        camera.rotation.y = 1.8;
        camera.rotation.x = 0;
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
    if (keyboard[16] && delay == 0) {
        let projectileMeshClone = projectileMesh.clone();
        projectileMeshClone.position.x = playerMesh.position.x;
        projectileMeshClone.position.y = playerMesh.position.y;
        projectileMeshClone.position.z = playerMesh.position.z - 3;
        scene.add(projectileMeshClone);
        projectileMeshes.push(projectileMeshClone);

                laserSound = new THREE.Audio( listener );
                audioLoader.load('../sounds/Chord3.MP3', function( buffer ){
                    laserSound.setBuffer( buffer );
                    laserSound.setLoop( false );
                    laserSound.setVolume( 0.05);
                    laserSound.play();
                })

        
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
    if(end != true){
    movePlayer();
    moveCamera();
    shoot();
	updateProjectiles();
    switch(bossTag){
        case 1:
            boss1Phase1();
            boss1Phase2();
            updateBoss1Phase1();
            updateBoss1Phase2();
            break;
        case 2:
            boss2Phase1();
            updateBoss2Phase1();
    }
    updateDelay();
    warningDelayUpdate();
    updateBossDelay();
    checkCollision();

    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
    requestAnimationFrame(animate)
}
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

    var img = document.getElementById("image");
    img.parentNode.removeChild(img);
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
    renderer.setSize(window.innerWidth, window.innerHeight);

    labelRenderer.setSize(window.innerWidth, window.innerHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    document.body.appendChild(labelRenderer.domElement);

    backgroundSound = new THREE.Audio( listener );
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

    camera.position.z = 40;
    camera.position.y = 20;
    camera.position.x = 0;
    camera.rotation.x = -0.3;
    //camera.lookAt(scene.position);

    //Funny game clock
    clock = new THREE.Clock();
  
    spawnPlayer();
    spawnBoss1();
    spawnBProjectile();
    spawnBProjectile2();
    
    addKeysListener();
    animate();
  
  }
  //////////////////////////////////////////////////////////

  //init();
  window.addEventListener('click', function(e){
    if(end != true){
        init();
    }else{
        location.reload();
    }
  });