
    var container, scene, renderer, camera, light, clock, loader;
    var WIDTH, HEIGHT, VIEW_ANGLE, ASPECT, NEAR, FAR;

    container = document.querySelector('.viewport');

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
    renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setSize(WIDTH, HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowMapType = THREE.PCFShadowMap;
    renderer.shadowMapAutoUpdate = true;
    renderer.setClearColor( 0xffffff, 1 );
    container.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);

    camera.position.set(0, 2 ,7);
    camera.rotation.x = -Math.PI / 12;

    scene.add(camera);

    light = new THREE.DirectionalLight(0xffffff);
    light.intensity = 0.17;
    light.position.set(0, 100, 200);
    light.castShadow = true;
    light.shadowCameraLeft = -2;
    light.shadowCameraTop = -2;
    light.shadowCameraRight = 2;
    light.shadowCameraBottom = 2;
    light.shadowCameraNear = 1;
    light.shadowCameraFar = 1000;
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
    point.shadowMapWidth = point.shadowMapHeight = 512;
    point.shadowDarkness = .001;
    // point.intensity = 0.9;
    ambient.intensity = 0.8;
    scene.add(light);
    scene.add(ambient, point);
    point.position.x = 1;
    point.position.y = 3;
    point.position.z = 5;
    loader = new THREE.JSONLoader();
    var mesh, container;
    var floor_geometry = new THREE.BoxGeometry( 10, 0.05, 10);
    var floor_material = new THREE.MeshLambertMaterial( {
      color: 0xFFFFFF
    });
    loader.load('assets/models/stand.json', function (geometry, materials) {
      var material = new THREE.MeshLambertMaterial({
        // map: THREE.ImageUtils.loadTexture('/js/threejs/models/textures/gtare.jpg'),
        // colorAmbient: [0.480000026226044, 0.480000026226044, 0.480000026226044],
        // colorDiffuse: [0.480000026226044, 0.480000026226044, 0.480000026226044],
        // colorSpecular: [0.8999999761581421, 0.8999999761581421, 0.8999999761581421]
        color: 0xCCCCCC
      });

      mesh = new THREE.Mesh(
        geometry,
        material
      );
      floor = new THREE.Mesh(
        floor_geometry,
        floor_material
      );
      floor.receiveShadow = true;

      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.rotation.z = 0;
      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.y = 0;
      mesh.position.x = -1;
      mesh.position.z= -1;
      // mesh.position.y = 1;
      floor.add(mesh);
      scene.add(floor);
      render();
    });

    function render() {
     var time = clock.getElapsedTime();
    //  mesh.rotation.y += .01;
      floor.rotation.y += .01;
     renderer.render(scene, camera);
     requestAnimationFrame(render);
    }
