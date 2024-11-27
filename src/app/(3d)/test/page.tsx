'use client'

import { Category, Prisma, ShelfCategory } from "@prisma/client";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import Link from "next/link";
export default function Page() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // scene.fog = new THREE.Fog(0xcccccc, 10, 15);
    //add light
    // const light = new THREE.AmbientLight(0x404040); // soft white light
    // scene.add(light);
    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色平行光，强度为 1
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);
    // 添加坐标轴辅助线
    const axesHelper = new THREE.AxesHelper(5); // 参数为轴的长度
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;
    let control = new OrbitControls(camera, renderer.domElement)
    control.update()


    let cube2 = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    )
    // cube2.position.x = 2
    scene.add(cube2)
    // let cube3 = cube.clone()
    // cube3.position.x = 4
    // scene.add(cube3)

    let size = 10;
    let x = size / 2 + 2
    let y = size / 2 + 5
    let z = size / 2 - 12
    let rowHeight = 14.5;
    let leftOffset = size + size / 6
    const geomatry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({
      // map: new THREE.TextureLoader().load('/texture.jpg')
      color: 0x22254221,
    })
    const cube = new THREE.Mesh(geomatry, material);
    cube.position.set(x, y, z);

    
    const loader = new GLTFLoader();

    loader.load('/shelf.glb', async function (gltf) {
      gltf.scene.scale.set(1 / size, 1 / size, 1 / size);
      // gltf.scene.add(cube)
      let cub2 = cube.clone()
      cub2.position.set(x + leftOffset * 1, y, z)
      gltf.scene.add(cub2)

      let cube3 = cube.clone()
      cube3.position.set(x, y + rowHeight * 1, z)
      gltf.scene.add(cube3)

      let dog = await loader.loadAsync("/dog.glb")
      dog.scene.scale.set(0.8, 0.8, 0.8)
      dog.scene.position.z = 5
      dog.scene.position.y = 3
      dog.scene.position.x = 0
      // scene.add(dog.scene)
      dog.scene.scale.set(
        dog.scene.scale.x * size,
        dog.scene.scale.y * size,
        dog.scene.scale.z * size
      )

      dog.scene.position.set(x + dog.scene.position.x + leftOffset, y + dog.scene.position.y + rowHeight, z + dog.scene.position.z)

      gltf.scene.add(dog.scene)

      // gltf.scene.position.set(2,3,4)
      scene.add(gltf.scene);

    }, undefined, function (error) {

      console.error(error);

    });


    // 创建一个 Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // 鼠标点击事件
    window.addEventListener('mousedown', (event) => {
      // 将鼠标位置归一化（-1 到 1）
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // 使用 Raycaster 检测物体
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        // 选中的第一个物体
        const selectedObject = intersects[0].object;

        // // 更改颜色
        // selectedObject.material.color.set(0xff0000);
        console.log('Selected:', selectedObject);
        // 计算目标点
        const targetPosition = new THREE.Vector3();
        selectedObject.getWorldPosition(targetPosition);

        control.target.set(targetPosition.x, targetPosition.y, targetPosition.z);
        control.object.position.set(targetPosition.x, targetPosition.y, targetPosition.z + 5)
        control.update()
        // 计算摄像机新位置
        // const direction = targetPosition.clone().sub(camera.position).normalize();
        // const newCameraPosition = targetPosition.clone().add(direction.multiplyScalar(-5));
        // camera.position.copy(newCameraPosition);

        // 在这里可以执行其他操作，例如改变物体的属性
      } else {
        // 没有选中物体，执行其他操作，例如取消选中状态
      }
    });

    function animate() {
      control.update()
      //   line2.rotation.x += 0.01;
      //   line2.rotation.y += 0.01;
      //   line2.rotation.z += 0.01;
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  }, [])
  return (
    <>

    </>
  );
}

