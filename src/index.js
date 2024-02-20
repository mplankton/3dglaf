import * as THREE from 'three';

const init = () => {
    //function initialize
    const niji = (e, xa, yb, m) => {
        let points = [];
        for (let a = miny; a <= maxy; a += 0.1) {
            points.push(new THREE.Vector3((xa + Math.sqrt((a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)), a * m + yb, Math.sqrt((-a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)));
        }
        for (let a = maxy; a >= miny; a -= 0.1) {
            points.push(new THREE.Vector3((xa + Math.sqrt((a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)), a * m + yb, -Math.sqrt((-a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)));
        }
        for (let a = miny; a <= maxy; a += 0.1) {
            points.push(new THREE.Vector3(-(-xa + Math.sqrt((a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)), a * m + yb, -Math.sqrt((-a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)));
        }
        for (let a = maxy; a >= miny; a -= 0.1) {
            points.push(new THREE.Vector3(-(-xa + Math.sqrt((a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)), a * m + yb, Math.sqrt((-a + Math.sqrt(Math.pow(a, 2) + Math.pow(w + e, 2))) / 2)));
        }
        return points;
    }

    const tick = () => {
        requestAnimationFrame(tick);

        // レンダリング
        renderer.render(scene, camera);
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
                cameragroup.rotation.y += 0.00005;
            } else if (event.key === 'ArrowRight') {
                cameragroup.rotation.y -= 0.00005;
            } else if (event.key === 'ArrowUp') {
                xzgroup.rotation.x -= 0.00005;
            } else if (event.key === 'ArrowDown') {
                xzgroup.rotation.x += 0.00005;
            }
        });
        w += 0.01;
    }
    const width = 960;
    const height = 540;

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);

    // シーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.set(0, 0, 20);

    //原点O 
    const geometry = new THREE.SphereGeometry(0.3, 30, 30);
    const material = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    //point1
    const point1 = new THREE.Mesh(new THREE.SphereGeometry(0.15, 30, 30), new THREE.MeshPhongMaterial({ color: 0xFF0000 }));
    scene.add(point1);

    //cameragroup
    const cameragroup = new THREE.Group();
    const xzgroup = new THREE.Group();
    scene.add(cameragroup, xzgroup);
    cameragroup.add(xzgroup);
    xzgroup.add(camera);



    // 平行光源
    const light = new THREE.DirectionalLight(0xFFFFFF);
    light.intensity = 2; // 光の強さを倍に
    light.position.set(1, 1, 1); // ライトの方向
    const light2 = new THREE.DirectionalLight(0xFFFFFF);
    light2.intensity = 2;
    light2.position.set(-1, -1, -1);
    // シーンに追加
    scene.add(light);
    scene.add(light2);

    //arrow
    const xgeometry = new THREE.CylinderGeometry(0.05, 0.05, 50, 32, 32, false);
    const ygeometry = new THREE.CylinderGeometry(0.05, 0.05, 50, 32, 32, false);
    const zgeometry = new THREE.CylinderGeometry(0.05, 0.05, 50, 32, 32, false);
    const xmaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    const ymaterial = new THREE.MeshStandardMaterial({ color: 0x00FF00 });
    const zmaterial = new THREE.MeshStandardMaterial({ color: 0x0000FF });
    const xarrow = new THREE.Mesh(xgeometry, xmaterial);
    const yarrow = new THREE.Mesh(ygeometry, ymaterial);
    const zarrow = new THREE.Mesh(zgeometry, zmaterial);
    xarrow.rotation.z = (Math.PI / 2);
    zarrow.rotation.x = (Math.PI / 2);

    const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(50, 50, 50, 50),
        new THREE.MeshPhongMaterial({ color: 0xFFFFFF, wireframe: true })
    );
    plane.rotation.x = (Math.PI / 2);
    scene.add(xarrow, yarrow, zarrow, plane);

    // グラフ
    let ax = 0;
    let by = 0;
    let mxy = 1;
    let miny = -20;
    let maxy = 20;

    point1.position.set(ax, by, 0);
    let w = 0;
    //頂点
    const geometryline = new THREE.BufferGeometry().setFromPoints(niji(0, ax, by, mxy));
    const line = new THREE.Line(geometryline, new THREE.LineBasicMaterial({ color: 0xFFFFFF }));
    scene.add(line);
    // レンダリング
    renderer.render(scene, camera);
    // 初回実行
    tick();
}
window.addEventListener('DOMContentLoaded', init);