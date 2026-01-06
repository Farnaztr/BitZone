let scene, camera, renderer, crystalGroup, starSystems = [], clock;
let isWarping = false;
let mouseX = 0, mouseY = 0;

function init() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    scene = new THREE.Scene();
    clock = new THREE.Clock();
    camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    
    const createStars = (count, radius, size, color) => {
        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            
            const r = radius + (Math.random() - 0.5) * 50;
            const theta = Math.random() * Math.PI * 2;
            const phi = (Math.random() - 0.5) * 0.2; 

            positions[i * 3] = r * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi);
            positions[i * 3 + 2] = r * Math.sin(theta);
            sizes[i] = Math.random() * size;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        const mat = new THREE.PointsMaterial({
            color: color,
            size: size,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const points = new THREE.Points(geo, mat);
        scene.add(points);
        return points;
    };

    
    starSystems.push(createStars(8000, 100, 0.05, 0x8affff));
    
    starSystems.push(createStars(5000, 40, 0.1, 0xbc13fe));

    
    crystalGroup = new THREE.Group();
    const core = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.5, 15),
        new THREE.MeshPhongMaterial({ color: 0xbc13fe, emissive: 0xbc13fe, emissiveIntensity: 2, wireframe: true, transparent: true, opacity: 0.8 })
    );
    const shell = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(4.5, 1)),
        new THREE.LineBasicMaterial({ color: 0x8affff, transparent: true, opacity: 0.4 })
    );
    crystalGroup.add(core, shell);
    scene.add(crystalGroup);

    scene.add(new THREE.AmbientLight(0x404040, 1));
    const pLight = new THREE.PointLight(0xbc13fe, 5, 100);
    pLight.position.set(0, 0, 10);
    scene.add(pLight);

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
    });

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    if (!isWarping) {
        
        camera.position.x += (mouseX * 15 - camera.position.x) * 0.05;
        camera.position.y += (-mouseY * 15 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        
        starSystems.forEach((sys, i) => {
            sys.rotation.y += 0.0005 * (i + 1);
            sys.rotation.z += 0.0002;
        });

        crystalGroup.rotation.y += 0.005;
        crystalGroup.scale.setScalar(1 + Math.sin(t * 2) * 0.05);
    } else {
        
        camera.position.z = THREE.MathUtils.lerp(camera.position.z, -5, 0.05);
        camera.fov = THREE.MathUtils.lerp(camera.fov, 170, 0.05);
        camera.updateProjectionMatrix();

        starSystems.forEach((sys) => {
            sys.rotation.z += 0.1; 
            const pos = sys.geometry.attributes.position.array;
            for (let i = 0; i < pos.length; i += 3) {
                pos[i + 2] += 5; 
                if (pos[i + 2] > 50) pos[i + 2] = -150;
            }
            sys.geometry.attributes.position.needsUpdate = true;
        });

        crystalGroup.scale.multiplyScalar(1.1);
        crystalGroup.children[0].material.opacity -= 0.02;
    }
    renderer.render(scene, camera);
}

window.theUltimateWarp = function() {
    if (isWarping) return;
    isWarping = true;
    sessionStorage.setItem('hasSeenIntro', 'true');

    const hero = document.getElementById('hero-entrance');
    const title = document.getElementById('main-title');
    const content = document.getElementById('main-site-content');

    
    title.style.transition = "2s cubic-bezier(0.9, 0, 0.1, 1)";
    title.style.letterSpacing = "150px";
    title.style.opacity = "0";
    title.style.filter = "blur(40px)";

    
    let startTime = Date.now();
    function warpStep() {
        let elapsed = (Date.now() - startTime) / 1000;
        camera.position.z -= elapsed * 1.5; 
        camera.fov += elapsed * 2;
        camera.updateProjectionMatrix();
        
        if (elapsed < 2) requestAnimationFrame(warpStep);
    }
    warpStep();

    
    setTimeout(() => {
        
        if(content) {
            content.style.visibility = 'visible';
            content.style.opacity = '1';
        }

        
        hero.style.transition = "clip-path 2s cubic-bezier(0.7, 0, 0.3, 1), opacity 1.5s";
        hero.style.clipPath = "circle(0% at 50% 50%)"; 
        hero.style.opacity = "0";

        setTimeout(() => {
            hero.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 2000);
    }, 1200);
}

window.onload = () => {
    if (sessionStorage.getItem('hasSeenIntro')) {
        document.getElementById('hero-entrance').style.display = 'none';
        document.body.style.overflow = 'auto';
    } else {
        init();
    }
};
const cursor = document.getElementById('custom-cursor');
const dot = document.querySelector('.cursor-dot');
const enterBtn = document.getElementById('enter-btn');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX;
    const y = e.clientY;

    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;

    cursor.style.left = `${x}px`;
    cursor.style.top = `${y}px`;
});

if (enterBtn) {
    enterBtn.addEventListener('mouseenter', () => {
        cursor.classList.add('active');
    });
    enterBtn.addEventListener('mouseleave', () => {
        cursor.classList.remove('active');
    });
}