'use client'

import { Prisma } from "@prisma/client";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import Link from "next/link";
export default function Page() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    scene.fog = new THREE.Fog(0xcccccc, 10, 15);

    // 添加坐标轴辅助线
    const axesHelper = new THREE.AxesHelper(5); // 参数为轴的长度
    // scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;
    let control = new OrbitControls(camera, renderer.domElement)
    control.update()

    const geomatry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({
      // map: new THREE.TextureLoader().load('/texture.jpg')
      color: 0x22254221,
    })
    const cube = new THREE.Mesh(geomatry, material);
    scene.add(cube);
    let cube2 = cube.clone()
    cube2.position.x = 2
    scene.add(cube2)
    let cube3 = cube.clone()
    cube3.position.x = 4
    scene.add(cube3)


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

