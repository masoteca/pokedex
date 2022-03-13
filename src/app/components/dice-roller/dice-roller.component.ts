import {AfterViewInit, Component, OnInit, ViewChild, Input, ElementRef} from '@angular/core';
import * as THREE from "three";
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import * as CANNON from "cannon-es";
import Stats from 'three/examples/jsm/libs/stats.module'
import {GUI} from 'dat.gui'
import CannonDebugger from 'cannon-es-debugger'

@Component({
    selector: 'app-dice-roller',
    templateUrl: './dice-roller.component.html',
    styleUrls: ['./dice-roller.component.scss']
})
export class DiceRollerComponent implements OnInit, AfterViewInit {

    @ViewChild('canvas')
    private canvasRef!: ElementRef<HTMLCanvasElement>;

    @Input() public rotationSpeedX: number = 0.05;
    @Input() public rotationSpeedY: number = 0.01;
    @Input() public size: number = 200;
    @Input() public cameraZ: number = 400;
    @Input() public fieldofview: number = 1;

    @Input('nearClipping') public nearClippingPlane: number = 1;
    @Input('farCliping') public farClipingPlane: number = 1000;
    private world: CANNON.World;
    private camera!: THREE.PerspectiveCamera;
    private material = new THREE.MeshNormalMaterial();
    private cube: any;
    private canonBody: any;
    private renderer!: THREE.WebGLRenderer
    private scene!: THREE.Scene;
    public dice: string = "";
    public gui: GUI;
    public clock: THREE.Clock;
    public minX: number = 0;
    public maxX: number = 0;
    public minY: number = 0;
    public maxY: number = 0;
    public minZ: number = 0;
    public maxZ: number = 0;
    public controls: any;
    private frameId: number = 0;
    public delta: number = 0;
    public stats: Stats;
    public debugger: any;

    constructor() {
        this.world = new CANNON.World();
        this.world.gravity.set(0, -9.82, 0);
        this.gui = new GUI();
        this.stats = Stats();
        this.clock = new THREE.Clock();

        this.world.broadphase.useBoundingBoxes = true;
    }

    ngOnInit(): void {
    }

    private getAspectRatio() {
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }

    public divideToRoll() {
        cancelAnimationFrame(this.frameId);
        this.createScene();
        this.world.gravity.set(Math.random() * 20, -9.8, Math.random() * 20);
        this.gui.updateDisplay();
        this.startRenderingLoop();

        let valuesSum: Array<number> = [];
        let sum = 0;
        let divided = this.dice.split('d'); // [3, 12+3 ]
        let plus = this.dice.split('+'); // [3d12, 3]
        let max = parseInt(divided[1]); //12 parse int deletes the + and the right side of it
        let rounds = parseInt(divided[0]); // 3
        for (let i = 0; i < rounds; i++) {
            let res = Math.random() * (max - 1) + 1;
            valuesSum.push(~~res);
            sum += ~~res;
        }

        let total = valuesSum.reduce((prev, val) => {
            return val += prev;
        })
        total += ~~plus[1];
        this.gui.updateDisplay()
    }

    ngAfterViewInit(): void {
        this.createScene();
    }

    private defineShape() {
        let divided = this.dice.split('d');
        let faces = parseInt(divided[1]);

        if (faces === 6) return new THREE.BoxGeometry();
        if (faces === 4) return new THREE.TetrahedronGeometry();
        if (faces === 8) return new THREE.OctahedronGeometry();
        if (faces === 12) return new THREE.DodecahedronGeometry();
        if (faces === 20) return new THREE.IcosahedronGeometry();
        return new THREE.BoxGeometry();
    }

    private createScene() {
        this.scene = new THREE.Scene();
        this.scene.add(new THREE.AxesHelper(25))
        this.scene.background = new THREE.Color(0x000000);
        this.addLighting();

        this.camera = new THREE.PerspectiveCamera(75, this.getAspectRatio(), 0.1, 1000);
        this.camera.position.set(-6, 15, -9)

        this.addFloor();
        this.addWalls()
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true
        this.controls.target.y = 0.5

        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas});
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        this.debugger = CannonDebugger(this.scene, this.world, {
            // options...
        })

        this.renderer.render(this.scene, this.camera);
        // aqui solo esta renderizado la vista inicial para no tener fondo blanco/negro
    }

    public addFloor() {

        const planeGeometry = new THREE.PlaneGeometry(50, 50);
        const planeMaterial = new THREE.MeshStandardMaterial({color: 0xdddddd})
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;

        plane.rotateX(-Math.PI / 2); //rotate the plane 90 degrees, so it can be floor;


        const WorldPlane = new CANNON.Plane();
        const planeBody = new CANNON.Body({mass: 0})
        planeBody.addShape(WorldPlane);
        planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2)
        this.world.addBody(planeBody)
        this.scene.add(plane);
    }

    public addWalls() {
        let planeGeometry = new THREE.PlaneGeometry(50, 12.5)
        let planeMaterial = new THREE.MeshStandardMaterial({color: 0xdddddd})
        let plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotateY(-Math.PI / 2);
        plane.position.set(25, 12.5 /2, 0)

        let WorldPlane = new CANNON.Plane();
        let planeBody = new CANNON.Body({mass: 0})
        planeBody.addShape(WorldPlane);
        planeBody.position.set(plane.position.x, plane.position.y, plane.position.z)
        planeBody.quaternion.set(plane.quaternion.x, plane.quaternion.y, plane.quaternion.z, plane.quaternion.w)
        this.world.addBody(planeBody)
        this.scene.add(plane);


        /////////////////////////


        planeGeometry = new THREE.PlaneGeometry(50, 12.5);
        planeMaterial = new THREE.MeshStandardMaterial({color: 0xdddddd})
        plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        plane.rotateY(Math.PI );
        plane.position.set(0, 12.5 /2, 25)

        WorldPlane = new CANNON.Plane();
        planeBody = new CANNON.Body({mass: 0})
        planeBody.addShape(WorldPlane);
        planeBody.position.set(plane.position.x, plane.position.y, plane.position.z)
        planeBody.quaternion.set(plane.quaternion.x, plane.quaternion.y, plane.quaternion.z, plane.quaternion.w)
        this.world.addBody(planeBody)
        this.scene.add(plane);

    }

    private animateCube() {
        this.cube.position.set(
            this.canonBody.position.x,
            this.canonBody.position.y,
            this.canonBody.position.z
        );
        this.cube.quaternion.set(
            this.canonBody.quaternion.x,
            this.canonBody.quaternion.y,
            this.canonBody.quaternion.z,
            this.canonBody.quaternion.w
        );
        // this.moveCubeOnXAxis();
        // this.moveCubeOnYAxis();
        // this.moveCubeOnZAxis();
        // if(this.animateRotation) {
        //
        //     if (this.cube.rotation.y < 20) {
        //         this.cube.rotation.y += this.rotationSpeedY ;
        //     }
        //     if(this.cube.rotation.x < 20) {
        //         this.cube.rotation.x += this.rotationSpeedX;
        //     }
        //     console.log(this.cube.rotation)
        // }
    }

    private startRenderingLoop() {
        if (this.cube) this.scene.remove(this.cube); // si existe un cubo lo eliminamos
        // creamos el cubo
        this.generateDice();

        this.generateCannon(); // tecnicamente en este punto tenemos 2 geometrias en el mismo lugar
        this.canonBody.position.set(this.cube.position.x, this.cube.position.y, this.cube.position.z)
        this.canonBody.quaternion.set(1,1,1,280)

        if (!this.gui.__folders['Physics']) {
            const physicsFolder = this.gui.addFolder('Physics')
            physicsFolder.add(this.world.gravity, 'x', -10.0, 10.0, 0.1)
            physicsFolder.add(this.world.gravity, 'y', -10.0, 10.0, 0.1)
            physicsFolder.add(this.world.gravity, 'z', -10.0, 10.0, 0.1)
            physicsFolder.open()
        }

        this.render(0);
    }

    private generateDice() {
        this.cube = new THREE.Mesh(this.defineShape(), this.material);
        this.cube.castShadow = true;
        this.cube.receiveShadow = false;
        this.cube.position.set(Math.random() *10 , Math.random() * 10, Math.random() * 10);

        this.scene.add(this.cube);

    }

    private generateCannon() {
        if (this.canonBody) {
            this.world.removeBody(this.canonBody)
        }
        let position = this.cube.geometry.attributes.position.array;
        let icosahedronPoints: CANNON.Vec3[] = [];
        let icosahedronFaces: number[][] = [];

        for (let i = 0; i < position.length; i += 3) {
            icosahedronPoints.push(
                new CANNON.Vec3(position[i], position[i + 1], position[i + 2])
            );
        }

        for (let i = 0; i < position.length / 3; i += 3) {
            icosahedronFaces.push([i, i + 1, i + 2]);
        }
        //polyedron forma aqui se genera la forma 3d
        let icosahedronShape = new CANNON.ConvexPolyhedron({
            vertices: icosahedronPoints,
            faces: icosahedronFaces,
        });

        this.canonBody = new CANNON.Body({mass: 1, allowSleep: true})

        this.canonBody.addShape(icosahedronShape);
        this.canonBody.position.x = this.cube.position.x;
        this.canonBody.position.y = this.cube.position.y;
        this.canonBody.position.z = this.cube.position.z;

        this.world.addBody(this.canonBody);

    }

    public addLighting() {

        const light1 = new THREE.SpotLight(0xffffff);
        light1.position.y = 45;
        light1.castShadow = true
        light1.shadow.mapSize.width = 512
        light1.shadow.mapSize.height = 512
        light1.shadow.camera.near = 0.1
        light1.shadow.camera.far = 1000
        this.scene.add(light1)
        const helper1 = new THREE.CameraHelper(light1.shadow.camera);
        this.scene.add(helper1)

    }

    public render(count: number) {

        if (count == 300) {
            count = 0;
            this.world.gravity.set(0, -9.8, 0);
        }
        this.frameId = requestAnimationFrame(() => {
            count++
            this.render(count);
        });


        this.world.step(1/60);
        this.debugger.update()
        this.gui.updateDisplay()
        this.animateCube();



        this.renderer.render(this.scene, this.camera);
    }

    private get canvas(): HTMLCanvasElement {
        return this.canvasRef.nativeElement;
    }

    public deleteDice() {

        this.scene.remove(this.cube)
        //cancelAnimationFrame(this.frameId); // esto detiene por completo cualquier animacion
    }
}
