
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
    var textures = ['lotrec.jpg','starrynight.jpg','leopard.png','black.jpg','silver.jpg','abstract.jpg','wall.jpg','metal.jpg','wood.jpg','blood.jpg', 'blue.jpg', 'mermer.jpg', 'minecraft.png','second.jpg', 'greenmarble.jpg','first.jpg','musema.jpg'];
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

    loader.load('assets/models/stand.json', function (geometry, materials) {
      var material = new THREE.MeshLambertMaterial({
        map: THREE.ImageUtils.loadTexture('assets/textures/'+mainTexture),
        // color: 0xCCCCCC
      });
      mesh = new THREE.Mesh(
        geometry,
        material
      );
      scene.add(mesh);

          // LINES
          // var material = new THREE.LineBasicMaterial({
          // 	color: 0x0000ff
          // });
          //
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          // 	new THREE.Vector3( 0.12, -0.253, -0.9 ),
          // 	new THREE.Vector3( 0.12, -0.253,-1.05 )
          // 	// new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
	        // mesh.add(line);
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3( 0.12, 2.57,  -0.9 ),
          //   new THREE.Vector3( 0.12, 2.57,-1.05 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3(2.084, 2.57,  -0.9 ),
          //   new THREE.Vector3( 2.084, 2.57,-1.05 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3(2.084, -0.253,  -0.9 ),
          //   new THREE.Vector3( 2.084, -0.253,-1.05 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3(0.12, 2.57,  -1 ),
          //   new THREE.Vector3( 2.084, 2.57,-1 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3(0.12, -0.253,  -1 ),
          //   new THREE.Vector3( 0.12, 2.57,-1 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
          //
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3(0.12, -0.3,  -0.87 ),
          //   new THREE.Vector3( 0.12, -0.48,-0.87 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
          //
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3(0.12, -0.3,  -0.031 ),
          //   new THREE.Vector3( 0.12, -0.48,-0.031 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
          //
          // var geometry = new THREE.Geometry();
          // geometry.vertices.push(
          //   new THREE.Vector3(0.12, -0.42,  -0 ),
          //   new THREE.Vector3( 0.12, -0.42, -0.87 )
          //   // new THREE.Vector3( 0, 0, 0 )
          // );
          // var line = new THREE.Line( geometry, material );
          // mesh.add(line);
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

      //Render the scene
      groundMirror.updateTextureMatrix();
      groundMirror.render();
      renderer.render( scene, camera );

     requestAnimationFrame(render);
    }
