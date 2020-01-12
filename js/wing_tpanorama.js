(function (global, undefined) {

	var _camera, _scene, _renderer;
	var _cameraOrtho, _sceneOrtho;
	var _fov = 50;
	var _pRadius = 1000;
	var _raycaster;
	var _container;
	var _lon = 0, _lat = 0;


	var options = {
		container: 'panoramaConianer',//容器
		url: 'resources/img/panorama/pano-7.jpg',//全景图路径
		widthSegments: 60,//水平切段数
		heightSegments: 40,//垂直切段数（值小粗糙速度快，值大精细速度慢）
		pRadius: 1000,//全景球的半径，推荐使用默认值
		minFocalLength: 1,//镜头最a小拉近距离
		maxFocalLength: 100,//镜头最大拉近距离
    }

	tpanorama.prototype = {
		constructor: this,
        def: {},
        config: function (opt) {
			this.def = extend(options, opt, true);
        },
        init: function () {
			initContainer(this.def.container);
			initCamera();
			initRaycaster();
			makePanorama(this.def.pRadius, this.def.widthSegments, this.def.heightSegments, this.def.url);
			initRenderer();

			animate();
        },
        clean: function () {
            document.getElementById(this.def.container).innerHTML = '';
        }
    }


    //将属性赋值到对象中
	function tpanorama(opt) {
		this.config(opt);
	}

	function extend(o, n, override) {
		for (var key in n) {
			if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
				o[key] = n[key];
			}
		}
		return o;
	}
	//////////////////////////////////////

	//初始化世界
	function initContainer(c) {
		_container = document.getElementById(c);
	}

	function initCamera() {
		_camera = new THREE.PerspectiveCamera(_fov, window.innerWidth / window.innerHeight, 1, 1100);
		_camera.target = new THREE.Vector3(0, 0, 0);
		_cameraOrtho = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 10);
		_cameraOrtho.position.z = 10;
		_scene = new THREE.Scene();
		_sceneOrtho = new THREE.Scene();
    }

	function initRaycaster() {
		_raycaster = new THREE.Raycaster();
	}

	function makePanorama(pRadius, widthSegments, heightSegments, u) {
		var mesh = new THREE.Mesh(new THREE.SphereGeometry(pRadius, widthSegments, heightSegments),
			new THREE.MeshBasicMaterial(
				{map: THREE.ImageUtils.loadTexture(u)}
			));
		mesh.scale.x = -1;
		_scene.add(mesh);
    }

	function initRenderer() {
		_renderer = new THREE.WebGLRenderer();
		_renderer.setSize(window.innerWidth, window.innerHeight);
		_renderer.autoClear = false;
		_container.appendChild(_renderer.domElement);
    }
    /////////////////////////////////////////////////
    //画面运动
	function animate() {
		_lon = _lon + 0.03;
		if(_lon >= 360)
		{
			_lon = 0;
		}
		requestAnimationFrame(animate);
		render();
    }

    function render() {
		calPosition();
		runRender();
    }

	function calPosition() {
		_lat = Math.max(-85, Math.min(85, _lat));
		var phi = THREE.Math.degToRad(90 - _lat);
		var theta = THREE.Math.degToRad(_lon);
		_camera.target.x = _pRadius * Math.sin(phi) * Math.cos(theta);
		_camera.target.y = _pRadius * Math.cos(phi);
		_camera.target.z = _pRadius * Math.sin(phi) * Math.sin(theta);
		_camera.lookAt(_camera.target);
    }

	function runRender() {
		_renderer.clear();
		_renderer.render(_scene, _camera);
		_renderer.clearDepth();
		_renderer.render(_sceneOrtho, _cameraOrtho);
    }
    ////////////////////////////////////////
    //变化事件
	function onWindowResize() {
		_camera.aspect = window.innerWidth / window.innerHeight;
		_camera.projectionMatrix.makePerspective(_fov, _camera.aspect, 1, 1100);
		_camera.updateProjectionMatrix();
		_cameraOrtho.left = -window.innerWidth / 2;
		_cameraOrtho.right = window.innerWidth / 2;
		_cameraOrtho.top = window.innerHeight / 2;
		_cameraOrtho.bottom = -window.innerHeight / 2;
		_cameraOrtho.updateProjectionMatrix();
		_renderer.setSize(window.innerWidth, window.innerHeight);
	}

    global.tpanorama = tpanorama;
    global.addEventListener('resize', onWindowResize, false);
    //global.addEventListener('mousewheel', onWindowScroll, false);
	//window.setInterval(animate, 16);
	//window.requestAnimationFrame(animate);
}(window));