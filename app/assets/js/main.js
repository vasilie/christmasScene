
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
    controls = new THREE.OrbitControls( camera, renderer.domElement );
				controls.target.set(0,0,0);
				controls.update();
        // camera.position.set(21, 7, 18);
        // camera.lookAt(0,0,0);



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
    point.shadowMapWidth = point.shadowMapHeight = 256;
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

    //
    // var textShapes = THREE.FontUtils.generateShapes( text, options );
    // var text = new THREE.ShapeGeometry( textShapes );
    // var textMesh = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
    // scene.add(textMesh);
    // var line_geometry = new THREE.BoxGeometry(0.006, 0.006, 1);
    // var line_material = new THREE.MeshLambertMaterial({color: 0x000000});

    // var line = new THREE.Mesh(line_geometry, line_material);



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
          // var line_geometry  = new THREE.BoxGeometry( 0.5, 5, 5);
          // var line_material = new THREE.MeshBasicMaterial( { color: 0x000000, transparent: true } );
          // // var line = new THREE.Mesh( line_geometry, line_material );
          // var  edges = new THREE.FaceNormalsHelper( line, 2, 0x00ff00, 1 );
          //
          // mesh.add(line);
          // line.add(edges);

          var material = new THREE.LineBasicMaterial({
          	color: 0x0000ff
          });

          var geometry = new THREE.Geometry();
          geometry.vertices.push(
          	new THREE.Vector3( 0.12, -0.253, -0.9 ),
          	new THREE.Vector3( 0.12, -0.253,-1.05 )
          	// new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
	        mesh.add(line);
          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3( 0.12, 2.57,  -0.9 ),
            new THREE.Vector3( 0.12, 2.57,-1.05 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);
          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3(2.084, 2.57,  -0.9 ),
            new THREE.Vector3( 2.084, 2.57,-1.05 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);
          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3(2.084, -0.253,  -0.9 ),
            new THREE.Vector3( 2.084, -0.253,-1.05 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);
          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3(0.12, 2.57,  -1 ),
            new THREE.Vector3( 2.084, 2.57,-1 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);
          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3(0.12, -0.253,  -1 ),
            new THREE.Vector3( 0.12, 2.57,-1 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);

          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3(0.12, -0.3,  -0.87 ),
            new THREE.Vector3( 0.12, -0.48,-0.87 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);

          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3(0.12, -0.3,  -0.031 ),
            new THREE.Vector3( 0.12, -0.48,-0.031 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);

          var geometry = new THREE.Geometry();
          geometry.vertices.push(
            new THREE.Vector3(0.12, -0.42,  -0 ),
            new THREE.Vector3( 0.12, -0.42, -0.87 )
            // new THREE.Vector3( 0, 0, 0 )
          );
          var line = new THREE.Line( geometry, material );
          mesh.add(line);
      floor = new THREE.Mesh(
        floor_geometry,
        floor_material
      );
      camera.position.z = 15
      floor.receiveShadow = true;
      camera.lookAt(0,0,0);
      mesh.receiveShadow = true;
      mesh.castShadow = true;
      mesh.rotation.z = 0;
      mesh.rotation.x = Math.PI / 2;
      mesh.rotation.y = 0;
      mesh.position.x = -1;
      mesh.position.z= -1;
      // mesh.position.y = 1;
      floor.add(mesh);
      // mesh.add(line);
      scene.add(floor);
      floor.rotation.y = 9.379999999999844;
      scene.fog = new THREE.FogExp2( 0x9999ff, 0.00025 );
      // line.position.set(2, 2.6, -1.34);
      render();
    });

    function render() {
     var time = clock.getElapsedTime();
    //  mesh.rotation.y += .01;

     renderer.render(scene, camera);
     requestAnimationFrame(render);
    }
