
    var container, scene, renderer, camera, light, clock, loader;
    var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

    container = document.querySelector('.viewport');
var particles = [];
    clock = new THREE.Clock();

    WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;

    VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 1,
    FAR = 10000;

    scene = new THREE.Scene();

    scene.rotation.x = 0;
    scene.rotation.y = 0;
    scene.rotation.z = 0;
    renderer = new THREE.WebGLRenderer({antialias: true, alpha:true});

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    // renderer.sortObjects = false;
    renderer.shadowMapAutoUpdate = true;
    renderer.setClearColor( 0x222222, 1 );
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    mirrorCamera = new THREE.CubeCamera( 1, 10, 1024);
    camera.position.set(7.59195005741784, 1.4453954384859604 ,3.6399825559441346);
    camera.rotation.x = -Math.PI / 12;

    scene.add(camera);
    controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.target.set(0,0,0);
		controls.update();
    controls.maxPolarAngle = Math.PI/2-0.094;
    controls.enablePan = false;
    controls.maxDistance = 13;
    controls.minDistance = 5.5;


    light = new THREE.DirectionalLight(0xffffff);
    light.intensity = 0.17;
    light.position.set(100, 100, -150);
    light.castShadow = true;
    light.shadowCameraLeft = -3;
    light.shadowCameraTop = -3;
    light.shadowCameraRight = 2;
    light.shadowCameraBottom = 2;
    light.shadowCameraNear = 1;
    light.shadowCameraFar = 400;
    light.shadowBias = -.0001
    light.shadowMapWidth = light.shadowMapHeight = 1024;
    light.shadowDarkness = .001;
    // light.shadow.bias = 1;


    var ambient = new THREE.AmbientLight( 0xFFFFFF);
    var point = new THREE.PointLight( 0xFFFFFF, 0.3, 1000 );
    // point.castShadow = true;
    point.shadowCameraLeft = -2;
    point.shadowCameraTop = -2;
    point.shadowCameraRight = 2;
    point.shadowCameraBottom = 2;
    point.shadowCameraNear = 1;
    point.shadowCameraFar = 1000;
    point.shadowBias = -.0001
    point.shadowMapWidth = point.shadowMapHeight = 256;
    point.shadowDarkness = .001;
    // point.intensity = 0.9;
    ambient.intensity = 0.9;
    scene.add(light);
    scene.add(ambient, point);
    point.position.x = 1;
    point.position.y = 3;
    point.position.z = 5;
    loader = new THREE.JSONLoader();
    scene.add(mirrorCamera);
    // var polight = new THREE.PointLight( 0xff0000, 1, 100 );
    // polight.position.set( -0.5, 0.3, -0.8 );
    // scene.add( polight );
    // var geometry = new THREE.SphereGeometry(0.02, 10, 40, 0, Math.PI * 2, 0, Math.PI * 2);
    // var material = new THREE.MeshBasicMaterial({ color: 0xff0000});
    // var cube = new THREE.Mesh(geometry, material);
    // polight.add(cube);
    // polight.position.set(-1,0.51,-1.4);
    // scene.add( polight );
    //
    // var polight1 = new THREE.PointLight( 0x47de21, 1, 100 );
    // polight1.position.set( -0.5, 1.3, -0.8 );
    // scene.add( polight1 );
    // var geometry = new THREE.SphereGeometry(0.02, 10, 40, 0, Math.PI * 2, 0, Math.PI * 2);
    // var material = new THREE.MeshBasicMaterial({ color: 0x47de21});
    // var cube1 = new THREE.Mesh(geometry, material);
    // polight1.add(cube1);
    // polight1.position.set(-1,1.51,-1.4);


    var mesh, container;
    var maxAnisotropy = renderer.getMaxAnisotropy();
    var floor_geometry = new THREE.BoxGeometry( 10, 0.001, 10);
    var floor_material = new THREE.MeshBasicMaterial( { envMap: mirrorCamera.renderTarget } );

        var planeGeo = new THREE.PlaneBufferGeometry( 100.1, 100.1 );
        var groundMirror = new THREE.Mirror( renderer, camera, { clipBias: 1, textureWidth: WIDTH, textureHeight: HEIGHT, color: 0xECECEC } );
        var texture = groundMirror.material;
        texture.anisotropy = maxAnisotropy;
        var mirrorMesh = new THREE.Mesh( planeGeo, texture );
				mirrorMesh.add( groundMirror );
				mirrorMesh.rotateX( - Math.PI / 2 );
				scene.add( mirrorMesh );
    var currentTexture = 0;
    var images = [];
    var textures = ['branch1.png','branch.png','lotrec.jpg','starrynight.jpg','leopard.png','black.jpg','silver.jpg','abstract.jpg','wall.jpg','metal.jpg','wood.jpg','blood.jpg', 'blue.jpg', 'mermer.jpg', 'minecraft.png','second.jpg', 'greenmarble.jpg','first.jpg','musema.jpg'];
    for (i in textures){
      var image = new Image();
      image.src = "assets/textures/" + textures[i];
      images.push(image);
    }
    var mainTexture = textures[currentTexture];
    texture.needsUpdate = true;
    function changeTexture(){
      if (arguments.length >0){
        switch (arguments[0]) {
          case "black":
            currentTexture = 0;
            break;
          case "white":
            currentTexture = 8;
            break;

          case "silver":
            currentTexture = 1;
            break;
          default:
        }
      } else {
        currentTexture++;
        currentTexture = currentTexture % textures.length;
      }
      console.log(arguments)
      mainTexture = textures[currentTexture];
      mesh.material.map = THREE.ImageUtils.loadTexture('assets/textures/'+mainTexture);
    }
    var loader1 = new THREE.JSONLoader();

    // load a resource







    loader.load('assets/models/christmas_tree_cycles.json', function (geometry, materials) {
      var material = new THREE.MeshPhongMaterial({
        map: THREE.ImageUtils.loadTexture('assets/textures/'+mainTexture), transparent:true, opacity:1, side:THREE.DoubleSide, depthWrite:false
        // color: 0xCCCCCC
      });
      mesh = new THREE.Mesh(
        geometry,
        material
      );
      scene.add(mesh);



//////////////////////
// Snowing  scene
//////////////
var TO_RADIANS = Math.PI / 180;

Particle3D = function(material) {
    THREE.Particle.call(this, material);

    //this.material = material instanceof Array ? material : [ material ];
    // define properties
    this.velocity = new THREE.Vector3(0, -0.03, 0);
    this.velocity.rotateX(randomRange(-45, 45));
    this.velocity.rotateY(randomRange(0, 360));
    this.gravity = new THREE.Vector3(0, 0, 0);
    this.drag = 1;
    // methods...
};

Particle3D.prototype = new THREE.Sprite();
Particle3D.prototype.constructor = Particle3D;
Particle3D.prototype.updatePhysics = function() {
    this.velocity.multiplyScalar(this.drag);
    this.velocity.add(this.gravity);
    this.position.add(this.velocity);
}

THREE.Vector3.prototype.rotateY = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;;
    var tempx = this.x;

    this.x = (tempx * cosRY) + (tempz * sinRY);
    this.z = (tempx * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateX = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempz = this.z;;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempz * sinRY);
    this.z = (tempy * -sinRY) + (tempz * cosRY);
}

THREE.Vector3.prototype.rotateZ = function(angle) {
    cosRY = Math.cos(angle * TO_RADIANS);
    sinRY = Math.sin(angle * TO_RADIANS);

    var tempx = this.x;;
    var tempy = this.y;

    this.y = (tempy * cosRY) + (tempx * sinRY);
    this.x = (tempy * -sinRY) + (tempx * cosRY);
}

// returns a random number between the two limits provided

function randomRange(min, max) {
    return ((Math.random() * (max - min)) + min);
}












var particle;

var particleImage = new Image();
particleImage.src = 'assets/textures/snowflake.png';
var particle_material = new THREE.SpriteMaterial( { map: new THREE.ImageUtils.loadTexture('assets/textures/snowflake.png'), transparent: true } );


for (var i = 0; i < 500; i++) {

    particle = new Particle3D(particle_material);
    particle.position.x = Math.random() * 20 - 10;
    particle.position.y = Math.random() * 40 - 10;
    particle.position.z = Math.random() * 20 - 10;
    particle.scale.x = particle.scale.y =  0.05;
    scene.add( particle );

    particles.push(particle);
}









      floor = new THREE.Mesh(
        floor_geometry,
        floor_material
      );
      mirrorCamera.position = floor.position;
      // mirrorCamera.rotation.x = Math.PI /2;
      // mirrorCamera.position.y =
      // scene.add( new THREE.CameraHelper( light.shadow.camera ) );
      // scene.add( new THREE.CameraHelper( mirrorCamera) );

      floor.receiveShadow = true;
      camera.lookAt(mesh.position);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.rotation.z = 0;
      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.y = 0;
      mesh.position.x = -1;
      mesh.position.z= -1;
// mesh.position.set(-170, 100, 80);      // mesh.position.y = 1;

      // mesh.add(line);
      scene.add(floor);
      // floor.rotation.y = 9.379999999999844;
      scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
      // line.position.set(2, 2.6, -1.34);
      render();
    });
    function render() {
     var time = clock.getElapsedTime();
    //  mesh.rotation.y += .01;

      // floor.visible = false;
    	// mirrorCamera.updateCubeMap( renderer, scene );
    	floor.visible = true;
      // renderer.render(scene, camera);

      floor.visible = false;
      mirrorCamera.position.copy( floor.position );
      mirrorCamera.rotation.set (0,0,0);
      // mirrorCamera.rotation = floor.rotation;
      // mirrorCamera.updateTextureMatrix();
//////////////
// Render Snow
////////////
for(var i = 0; i<particles.length; i++) {
    var particle = particles[i];
    particle.updatePhysics();

    with(particle.position) {
        if(y<-1) y+=10;
        if(x>10) x-=20;
        else if(x<-10) x+=20;
        if(z>10) z-=20;
        else if(z<-10) z+=20;
    }
}



      //Render the scene
      groundMirror.updateTextureMatrix();
      groundMirror.render();
      renderer.render( scene, camera );

     requestAnimationFrame(render);
    }
