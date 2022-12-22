import './style.css'
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

import { Water } from 'three/examples/jsm/objects/Water.js';
import { Sky } from 'three/examples/jsm/objects/Sky.js';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Vector3 } from 'three';

let container, stats;
let camera, scene, renderer;
let controls, water, sun, mesh;

let player;
let pirates = [];
let treas = [];

let cx, cy, cz;
let cannonball_arr_glob = [];

const loader = new GLTFLoader();

let birds_eye;
let third_person;
let first_person;
let special_view;
var game_ended = false;
let pirate_temp;


let initial_player_position;

let flag = 1;

//generate a random number int betweeen x and y
function generate_rand(x, y) {
  const a = Math.floor(Math.random() * (y - x)) + x;
  return a;
}


class PirateShip {

  constructor(x, y, z) {
    loader.load("assets/pirate_ship/scene.gltf", (gltf) => {
      //   console.log(gltf);

      scene.add(gltf.scene);
      gltf.scene.position.set(x, y, z);
      gltf.scene.scale.set(0.15, 0.15, 0.15);
      gltf.scene.rotation.y = 1.25;

      this.pirate = gltf.scene;
      pirates.push(gltf.scene);

      this.speed = {
        velocity_z: 0.1,
        velocity_x: -0.1
      }

      // this.temp=new THREE.Vector3();
      // this.randok=0;

      this.diff_vec;
      this.normalized_dir_vec;

      this.destroy = function () {
        console.log("pirate destroyed");
        scene.remove(this.pirate);
      }




    });
  }



  update() {

    // this.playerShip

    if (this.pirate) {

      // this.playerShip.rotation.y += 0.01;
      // this.pirate.position.z += this.speed.velocity_z;
      // this.pirate.position.x += this.speed.velocity_x;

      this.pirate.translateZ(this.speed.velocity_z);
      this.shoot_cannonball();



    }
  }

  shoot_cannonball() {


    // for(this.c=0;this.c<this.cannonball_no;(this.c)++){

    // }

    //shoot the ball from the front of the ship
    //so the posiiton should be 
    //so change the 

    // this.ship_cannon_ball = new Cannonball(this.playerShip.position.x, this.playerShip.position.y + 5, this.playerShip.position.z);

    // this.ship_cannon_ball.update();

    if (this.pirate) {
      // console.log("RENDERING CANNONBALL")
      // this.cx = 45;
      // this.cx = this.playerShip.position.x;
      cx = this.pirate.position.x;
      // console.log("cxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      // console.log(cx);
      // this.cy = (this.playerShip.position.y) * 2;
      // this.cz = (this.playerShip.position.z) * 2;

      cy = (this.pirate.position.y) * 2;
      cz = (this.pirate.position.z) * 1;


      this.cannon1 = new Cannonball(cx, cy, cz);
      // this.cannon1.dir.set(this.playerShip.getWorldPosition);
      // this.cannon1.update();


      if (this.cannon1.model) {
        // this.cannon1.dir.set(this.pirate.getWorldPosition);
        // console.log("cannon ball dir");

        // console.log(this.cannon1.dir);
        this.cannon1.update();

      }


      cannonball_arr_glob.push(this.cannon1);

      //moce the  cannon ball towards the z axis



    }

    // destroy = function() {
    // 	scene.remove(this.pirate);
    // }

  }
}


class Cannonball {

  constructor(x, y, z) {
    loader.load("assets/cannonball/scene.gltf", (gltf) => {
      //   console.log(gltf);

      scene.add(gltf.scene);
      gltf.scene.position.set(x, y, z);
      // gltf.scene.position.set(50, 10, 75);


      gltf.scene.scale.set(3, 3, 3);
      // gltf.scene.rotation.y = 1.25;

      this.model = gltf.scene;
      pirates.push(gltf.scene);

      this.speed = {
        velocity: -1,
      }


      this.dir = new THREE.Vector3();

    });
  }


  update() {

    // this.playerShip

    if (this.model) {

      // this.model.position.z += this.speed.velocity;

      this.model.translateZ(this.speed.velocity);

      // this.model.translateOnAxis(this.dir, this.speed.velocity);
      // console.log("direction for the cannon ball");
      // console.log(this.dir);






    }
  }

}


let cannon_ball_glob;

function move_pirates() {


  let pl_wp = new THREE.Vector3();
  let temp_wp = new THREE.Vector3();
  // console.log("omgomgomg");


  if (playerShip1.playerShip) {
    // console.log("inside the loop0");




    for (let i = 0; i < playerShip1.pirate_array.length; i++) {
      // console.log('byebyebye');


      playerShip1.playerShip.getWorldPosition(pl_wp);
      // playerShip1.playerShip.getWorldPosition(temp_wp);
      temp_wp.copy(pl_wp);

      if (playerShip1.pirate_array[i].pirate) {
        // console.log("pirate-->" + i);
        let pi_wp = new THREE.Vector3();
        playerShip1.pirate_array[i].pirate.getWorldPosition(pi_wp);



        let dir = new THREE.Vector3();
        dir.set(pl_wp);
        temp_wp.sub(pi_wp);
        temp_wp.normalize();

        dir.add(temp_wp);

        temp_wp.divideScalar(5);

        playerShip1.pirate_array[i].pirate.position.add(temp_wp);






      }



    }
  }
}


class PlayerShip {

  constructor() {
    loader.load("assets/player_ship/scene.gltf", (gltf) => {
      //   console.log(gltf);

      scene.add(gltf.scene);
      gltf.scene.position.set(20, 5, 100);
      gltf.scene.scale.set(0.015, 0.015, 0.015);
      gltf.scene.rotation.y = -0.07;

      this.playerShip = gltf.scene;
      player = gltf.scene;

      this.speed = {
        velocity: 0.0,
        rotation: 0
      }

      this.loaded = 1;
      this.playerWPos = new THREE.Vector3();


      this.temp = new THREE.Vector3();
      this.randok = 0;

      this.pirate_no = 5;
      this.pirate_array = [];

      this.i = 0;
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.c = 0;

      this.pir_pos = new THREE.Vector3();
      this.spawn_pirates();

      this.cannonball_no = 25;
      this.cannon_array = [];
      this.ship_cannon_ball;
      // this.cx = 0;
      // this.cy = 0;

      // this.cz = 0;
      this.cannon1;



    })
  }

  stop() {
    this.speed.velocity = 0;
    this.speed.rotation = 0;

  }





  //after playerSHip1 has loaded I want to get The world position



  // get world coordinates or position of the ship

  get_world_pos() {

    if (this.playerShip) {
      this.playerShip.getWorldPosition(this.playerWPos);

      return this.playerWPos;


    }
    else {
      console.log("not loaded");
    }


  }

  get_world_dir() {

    if (this.playerShip) {

      return this.playerShip.getWorldDirection(this.get_world_pos());
      // console.log(this.playerWPos);


    }


  }


  get_spawn_pos() {


    this.randok = generate_rand(-500, -50);
    // this.temp = new THREE.Vector3();

    this.temp = (this.get_world_pos().add(this.get_world_dir().multiplyScalar(this.randok))).add({ x: generate_rand(-500, 100), y: 0, z: 0 });
    console.log(this.temp);

    return this.temp;


  }

  spawn_pirates() {

    if (this.playerShip) {

      for (this.i = 0; this.i < this.pirate_no; (this.i)++) {
        this.pir_pos = this.get_spawn_pos();
        // this.pir_pos.set(100 * generate_rand(-5, 5), 0, 100 * generate_rand(-5, 5));


        this.x = this.pir_pos.x;
        // console.log(x);
        this.y = this.pir_pos.y;
        this.y -= 5;
        // console.log(y);

        this.z = this.pir_pos.z;
        // console.log(z);
        pirate_temp = new PirateShip(this.x, this.y, this.z)


        this.pirate_array.push(pirate_temp);

        var player_pos = new THREE.Vector3();

        this.playerShip.getWorldPosition(player_pos);

      }

    }

  }

  update() {


    if (this.playerShip) {

      this.playerShip.position.z += this.speed.velocity;
      this.playerShip.rotation.y += this.speed.rotation;

      this.playerShip.translateZ(this.speed.velocity);


    }
  }

  shoot_cannonball() {


    if (this.playerShip) {
      // console.log("RENDERING CANNONBALL")
      // this.cx = 45;
      // this.cx = this.playerShip.position.x;
      cx = this.playerShip.position.x;
      // console.log("cxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      // console.log(cx);
      // this.cy = (this.playerShip.position.y) * 2;
      // this.cz = (this.playerShip.position.z) * 2;

      cy = (this.playerShip.position.y) * 2;
      cz = (this.playerShip.position.z) * 1;


      this.cannon1 = new Cannonball(cx, cy, cz);

      if (this.cannon1.model) {
        this.cannon1.dir.set(this.playerShip.getWorldPosition);
        console.log("cannon ball dir");

        console.log(this.cannon1.dir);
        this.cannon1.update();

      }


      cannonball_arr_glob.push(this.cannon1);


    }




  }



}



let playerShip1 = new PlayerShip();
console.log(playerShip1);


function spawn_interval(time) {
  if (playerShip1.playerShip) {
    setTimeout(() => {
      // console.log("SPAWNING PIRATES___________________");

      playerShip1.spawn_pirates();
    }, time);


  }
}



class TreasureChest {

  constructor(x, y, z) {
    loader.load("assets/treasure_chest/scene.gltf", (gltf) => {
      //   console.log(gltf);

      scene.add(gltf.scene);
      gltf.scene.position.set(x, y, z);
      gltf.scene.scale.set(0.02, 0.02, 0.02);
      // gltf.scene.rotation.y = -1.5;

      treas.push(gltf.scene);
      this.chest = gltf.scene;

      this.destroy = function () {
        // console.log("Treasure collected");
        scene.remove(gltf.scene);
      }


    });
  }

  update() {

  }



}


let chest_no = 15;
var chest_array = [];

function spawn_tsChest() {

  for (let i = 0; i < chest_no; i++) {

    let x = 30 * generate_rand(-3, 3);
    let y = 2;
    let z = 100 * generate_rand(-5, 0);

    let tsc = new TreasureChest(x, y, z);
    chest_array.push(tsc);


  }


}

spawn_tsChest();

let pirates_no1 = 10;
var pirates_array = [];

function spawn_piratess() {

  for (let i = 0; i < pirates_no1; i++) {

    let x = 200 * generate_rand(-5, 5);
    let y = -2;
    let z = 400 * generate_rand(-5, 0);

    let tsc = new PirateShip(x, y, z);
    pirates_array.push(tsc);



  }


}


let score = 0;
let health = 10;
let treasure = 0;

function checkCollision() {

  if (playerShip1.playerShip) {

    let playerBB = new THREE.Box3().setFromObject(playerShip1.playerShip);

    var a = chest_array.length;

    while (a--) {


      if (chest_array[a].chest) {
        let treasureBB = new THREE.Box3().setFromObject(chest_array[a].chest);

        if (playerBB.intersectsBox(treasureBB)) {
          treasure += 1;

          scene.remove(chest_array[a].chest)

          treas.splice(a, 1);

          // chest array
          chest_array.splice(a, 1);
          //remove from the scene

          document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score + " &emsp; TREASURE: " + treasure;

        }


      }
    }

    var b = playerShip1.pirate_array.length;
    while (b--) {

      if (playerShip1.pirate_array[b].pirate) {
        // let pirateBB = new THREE.Box3().setFromObject(pirates[b]);
        let pirateBB = new THREE.Box3().setFromObject(playerShip1.pirate_array[b].pirate);


        if (playerBB.intersectsBox(pirateBB)) {
          health -= 2;
          // pirates[a].destroy();
          scene.remove(playerShip1.pirate_array[b].pirate)
          // playerShip1.pirate_array[a].destroy();
          playerShip1.pirate_array.splice(b, 1);

          // pirates.splice(a, 1);
          document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score + " &emsp; TREASURE: " + treasure;
        }

        var c_len = cannonball_arr_glob.length;
        while (c_len--) {

          if (cannonball_arr_glob[c_len].model) {
            // let pirateBB = new THREE.Box3().setFromObject(pirates[b]);
            let cannonBB = new THREE.Box3().setFromObject(cannonball_arr_glob[c_len].model);


            if (pirateBB.intersectsBox(cannonBB)) {
              score += 1;
              // pirates[a].destroy();
              scene.remove(playerShip1.pirate_array[b].pirate);
              scene.remove(cannonball_arr_glob[c_len].model);

              // playerShip1.pirate_array[a].destroy();
              playerShip1.pirate_array.splice(b, 1);
              cannonball_arr_glob.splice(c, 1);

              // pirates.splice(a, 1);
              document.getElementById("scoreboard").innerHTML = "HEALTH: " + health + " &emsp; SCORE: " + score + " &emsp; TREASURE: " + treasure;

            }


          }
        }


      }







    }





  }


}

init();

animate();

spawn_interval(10000);
spawn_interval(100000);



function init() {

  container = document.getElementById('container');
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  container.appendChild(renderer.domElement);


  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 20000);
  camera.position.set(20, 40, 200);

  // const playLoc = new THREE.Vector3(playerShip1.position.x, playerShip1.position.y, playerShip1.position.z);
  // camera.lookAt(playLoc);

  //

  if (playerShip1.playerShip) {

    console.log("BRUHHHHHHHHHHHHHHHHH");
    // playerShip1.playerShip.add(camera);

  }


  sun = new THREE.Vector3();
  // scene.add(sun);

  //initialize views

  birds_eye = 0;
  third_person = 1;
  first_person = 0;
  special_view = 0;
  // Water

  const waterGeometry = new THREE.PlaneGeometry(10000, 10000);

  water = new Water(
    waterGeometry,
    {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals: new THREE.TextureLoader().load('assets/waternormals.jpg', function (texture) {

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

      }),
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: scene.fog !== undefined
    }
  );

  water.rotation.x = - Math.PI / 2;

  scene.add(water);

  // Skybox

  const sky = new Sky();
  sky.scale.setScalar(10000);
  scene.add(sky);

  const skyUniforms = sky.material.uniforms;

  skyUniforms['turbidity'].value = 10;
  skyUniforms['rayleigh'].value = 2;
  skyUniforms['mieCoefficient'].value = 0.005;
  skyUniforms['mieDirectionalG'].value = 0.8;

  const parameters = {
    elevation: 2,
    azimuth: 180
  };

  const pmremGenerator = new THREE.PMREMGenerator(renderer);

  function updateSun() {

    const phi = THREE.MathUtils.degToRad(90 - parameters.elevation);
    const theta = THREE.MathUtils.degToRad(parameters.azimuth);

    sun.setFromSphericalCoords(1, phi, theta);

    sky.material.uniforms['sunPosition'].value.copy(sun);
    water.material.uniforms['sunDirection'].value.copy(sun).normalize();

    scene.environment = pmremGenerator.fromScene(sky).texture;

  }

  updateSun();


  controls = new OrbitControls(camera, renderer.domElement);
  controls.maxPolarAngle = Math.PI * 0.495;
  // controls.target.set(0, 10, 0);


  controls.target.set(0, 20, 10)
  controls.minDistance = 40.0;
  controls.maxDistance = 200.0;

  // controls.target = new THREE.Vector3(0, 20, 500);
  // controls.keys = {
  //   LEFT: 'ArrowLeft', //left arrow
  //   UP: 'ArrowUp', // up arrow
  //   RIGHT: 'ArrowRight', // right arrow
  //   BOTTOM: 'ArrowDown' // down arrow
  // }
  // controls.keys = {
  //   LEFT: 'KeyA', //left arrow
  //   UP: 'KeyW', // up arrow
  //   RIGHT: 'KeyD', // right arrow
  //   BOTTOM: 'KeyS' // down arrow
  // }
  // controls.update();


  stats = new Stats();
  container.appendChild(stats.dom);

  window.addEventListener('resize', onWindowResize);



}


function update_camera_aaa() {

  if (playerShip1.playerShip) {

    let target_vec = new THREE.Vector3();



    console.log("playerShip1.playerWPos");
    // console.log(playerShip1.playerWPos);

    // target_vec.set(playerShip1.playerWPos);
    // console.log("target ppos----------------");
    // console.log(target_vec);
    // console.log("-----------------------");



    playerShip1.playerShip.getWorldPosition(target_vec);

    let tar_x = target_vec.x;

    let tar_y = target_vec.y;

    let tar_z = target_vec.z;
    tar_z += 200;
    tar_x += 20;

    let new_target_vec = new THREE.Vector3(tar_x, tar_y, tar_z);

    // camera.target.set(new_target_vec);
    controls.target.set(new_target_vec);

    // console.log(target_vec);

  }
}

function update_camera_pos() {


  //0 +10 +10

  let q = new THREE.Vector3(50, 10, 200);

  if (playerShip1.playerShip) {


    let p = new THREE.Vector3();

    playerShip1.playerShip.getWorldPosition(p);

    p.add(q);
    camera.position.set(p);
    console.log(p);

    //   // playerShip1.playerShip.add(camera);




  }


}


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

}

function update_camera_first_person() {

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      //w
      case 87:
        camera.position.z -= 1.5;

        break;

      //s
      case 83:
        camera.position.z += 1.5;

        break;




    }
  }

}

var bx;
var by;
var bz;

function sunset_close_up() {

  if (playerShip1.playerShip) {

    bx = playerShip1.playerWPos.x;
    by = playerShip1.playerWPos.y;
    bz = playerShip1.playerWPos.z;


    console.log("PLAYER WORLD POSITION");
    console.log(bx, by, bz);


    camera.position.set(bx, by, bz);
  }
}

function birds_eye_view() {

  birds_eye = 1;
  third_person = 0;
  first_person = 0;
  special_view = 0;


  if (playerShip1.playerShip) {

    // bx = playerShip1.playerWPos.x;
    // by = playerShip1.playerWPos.y;
    // bz = playerShip1.playerWPos.z;

    // by = by + 300;
    // // bx = -(bx);


    // console.log("PLAYER WORLD POSITION");
    // console.log(bx, by, bz);


    // camera.position.set(bx, by, bz);
    camera.position.set(100, 200, 300);
    // camera.rotation.x += 0.5;
  }
}

function third_person_view() {

  birds_eye = 0;
  third_person = 1;
  first_person = 0;
  special_view = 0;


  if (playerShip1.playerShip) {

    bx = playerShip1.playerWPos.x;
    by = playerShip1.playerWPos.y;
    bz = playerShip1.playerWPos.z;

    // console.log("inside thirs person view function");

    // console.log("PLAYER WORLD POSITION");
    // console.log(bx, by, bz);


    camera.position.set(bx, by, bz);
    // camera.rotation.x
  }
}


function setupKeyControlsForplayer() {

  document.onkeydown = function (e) {
    switch (e.keyCode) {
      //w
      case 87:
        playerShip1.speed.velocity = -1;
        // camera.position.set(playerShip1.get_world_pos);
        camera.position.z -= 2;

        break;
      // playerShip1.position.x_0.1;

      //s
      case 83:
        playerShip1.speed.velocity = 1;
        camera.position.z += 2;

        break;


      //a
      case 65:
        playerShip1.speed.rotation = 0.02;
        camera.position.z -= 0.2;

        // camera.position.x -= 0.5;
        // camera.rotation.y -= 0.05;
        //i want to turn sideways
        // camera.position.z -= 1;

        //DOUBT

        //and this rotates around some already fixed axis that was initialized at the start not around the ship axis
        // camera.rotation.y += 0.005;

        //this doesnt work why?????????????????
        // camera.rotation.y += 0.01;//or 0.05

        //this doesnt work why?????????????????



        var y_dir = new THREE.Vector3(0, 1, 0);

        // camera.rotateOnAxis(y_dir, 0.5);

        //DOUBT



        break;


      //d
      case 68:
        playerShip1.speed.rotation = -0.02;

        camera.rotation.y -= 0.005;
        camera.position.z -= 0.2;


        break;

      // case 32:
      //   playerShip1.shoot_cannonball();
      //   break;

      //space bar
      case 32:

        console.log("PSACE BAR PRESSED");

        playerShip1.shoot_cannonball();
        break;


      //shift
      case 16:


        if (birds_eye === 0) {
          console.log("SHIFT TO BIRDS YEE VIEWVIEW");
          birds_eye_view();



        }

        else if (third_person === 0) {

          console.log("SHIFT TO THIRD PERSON VIEWVIEW");
          third_person_view();



        }



        break;







    }
  }

  document.onkeyup = function (e) {
    switch (e.keyCode) {
      //w
      case 87:
        playerShip1.speed.velocity = 0;
        // playerShip1.position.x_0.1;
        break;

      //s
      case 83:
        playerShip1.speed.velocity = 0;

      //a
      case 65:
        playerShip1.speed.rotation = 0;

      //d
      case 68:
        playerShip1.speed.rotation = 0;



    }
  }


  window.addEventListener('keyup', function (e) {

    playerShip1.stop();

  });


}

function animate() {



  //player ship
  playerShip1.update();

  // ts_chest1.update();
  // ts_chest2.update();

  requestAnimationFrame(animate);
  render();
  // stats.update();


  // update_camera_pos();
  if (playerShip1.playerShip) {
    for (let i = 0; i < playerShip1.pirate_array.length; i++) {

      playerShip1.pirate_array[i].update();

    }

  }



  //if first person ===true
  //then add the camera else dont add



  if (playerShip1.playerShip) {

    // scene.add(camera);

    let p = new THREE.Vector3();

    playerShip1.playerShip.getWorldPosition(p);
    // camera.position.set(p);
    camera.lookAt(p);

    // playerShip1.playerShip.add(camera);




  }

  if (treasure >= 5) {

    game_ended = true;

    document.getElementById("gameover").innerHTML = treasure + " TREASURE CHESTS.YOU WIN!!!";

  }

  if (health <= 0) {
    game_ended = true;

    // if (health > 0)
    //     document.getElementById("gameover").innerHTML = "GAME OVER"; 
    // else
    document.getElementById("gameover").innerHTML = "YOU LOST";
  }


  // for (let i = 0; i < playerShip1.pirate_array.length; i++) {

  //   playerShip1.pirate_array[i].update();

  // }

  if (!game_ended) {
    setupKeyControlsForplayer();
    // update_camera_first_person();

    checkCollision();

  }


  // update_camera_aaa();


  move_pirates();



  //update the position of all the rendered cannon balls here

  if (playerShip1.playerShip) {
    for (let i = 0; i < cannonball_arr_glob.length; i++) {

      cannonball_arr_glob[i].update();

    }

  }
  // spawn_interval();

  //CHANGE THE VALUE OF THE PIRATE NO AND KEEP SPAWnING HTE PIRATE


  //GET THE UPADTED POSITION OF THE Player not the initial position

  if (playerShip1.playerShip) {

    if (playerShip1.pirate_array.length < 5) {
      spawn_interval();
    }
  }

}

function render() {

  water.material.uniforms['time'].value += 1.0 / 60.0;
  renderer.render(scene, camera);

}