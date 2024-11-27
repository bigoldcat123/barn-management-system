'use client'

import { Category, Prisma, ShelfCategory } from "@prisma/client";
import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
export default function ThreedRoom({
  data
}: {
  data: Prisma.RoomGetPayload<{
    include: {
      shelves: {
        include: {
          stuff: true,
          category:true
        }
      }
    }
  }> | undefined | null
}) {
  const router = useRouter()
  function createBarn(scene: THREE.Scene, width: number, length: number) {
    // 围墙参数
    const wallHeight = 3;
    const wallThickness = 0.3;
    const wallLength = length;
    const wallWidth = width;
    // 添加平面作为地面
    const texture = new THREE.TextureLoader().load('/t2.jpg'); // 替换为你的纹理图片路径
    const planeGeometry = new THREE.PlaneGeometry(width, length);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc, side: THREE.DoubleSide ,map: texture});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // 使平面水平
    scene.add(plane);


    const texturewall = new THREE.TextureLoader().load('/t3.jpg');

    // 创建墙体材质
    const wallMaterial = new THREE.MeshBasicMaterial({map:texturewall });

    // 创建四面墙
    const frontWall = new THREE.Mesh(
      new THREE.BoxGeometry(wallWidth, wallHeight, wallThickness),
      wallMaterial
    );
    frontWall.position.set(0, wallHeight / 2, -wallLength / 2);

    const backWall = frontWall.clone();
    backWall.position.set(0, wallHeight / 2, wallLength / 2);

    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(wallThickness, wallHeight, wallLength),
      wallMaterial
    );
    leftWall.position.set(-wallWidth / 2, wallHeight / 2, 0);

    const rightWall = leftWall.clone();
    rightWall.position.set(wallWidth / 2, wallHeight / 2, 0);

    // 添加墙体到场景
    scene.add(frontWall, backWall, leftWall, rightWall);
  }

  useEffect(() => {
    function onkeydown(e: KeyboardEvent) {
      console.log(e.key)
      if (e.key == 'Escape') {
        router.back()
      }
    }
    window.addEventListener('keydown',onkeydown)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    // 添加坐标轴辅助线
    const axesHelper = new THREE.AxesHelper(5); // 参数为轴的长度
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;
    let control = new OrbitControls(camera, renderer.domElement)
    control.update()

    createBarn(scene, data?.width! + 2, data?.length! + 2)

    data?.shelves.forEach(shelf => {
      createShelf(shelf, data.length, data.width, scene);
    })
    function animate() {
      control.update()
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
    return () => {
      window.removeEventListener('keydown', onkeydown)
      // renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return (
    <>

    </>
  );
}

async function createShelf(shelf: Prisma.ShelfGetPayload<{
  include: {
    stuff: true,
   category:true 
  }
}>, length: number, width: number, scene: THREE.Scene, color: number = 0x00ff00) {
  // throw new Error("Function not implemented.");
  const loader = new GLTFLoader()
  const shelfModel = await loader.loadAsync(shelf.category.modle)

  initShelf(shelfModel.scene,shelf.category)

  // const geo = new THREE.BoxGeometry(2, shelf.category.rows , shelf.category.columns );
  // const mat = new THREE.MeshBasicMaterial({ color: color });
  // const mesh = new THREE.Mesh(geo, mat);
  // mesh.add(new THREE.AxesHelper(5))
  shelfModel.scene.position.set(shelf.x - width / 2, shelf.category.rows * 0.5, shelf.y - length / 2);
  
// add stuff to shelf
  // const geo2 = new THREE.BoxGeometry(3, 0.8, 0.8);
  // const mat2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  // const mesh2 = new THREE.Mesh(geo2, mat2);
  // mesh2.position.set(0, -shelf.category.rows * 0.5+ 0.5, shelf.category.columns * 0.5 - 0.5);
  // row 2 column 3
  // mesh2.position.y += 1;
  // mesh2.position.z -= 2
 // TODO!!! 4:53 Wed Nov 27 2024
  shelf.stuff.forEach(async stuff => {
    // const mesh3 = mesh2.clone();
    // mesh3.position.y += stuff.row - 1;
    // mesh3.position.z -= stuff.column - 1;
    // mesh.add(mesh3)

  })

  // mesh.add(mesh2)
  scene.add(shelfModel.scene);
}


function initShelf(shelfModel: THREE.Group<THREE.Object3DEventMap>, shelfCategort: ShelfCategory) {
  const scale = shelfCategort.scale
  shelfModel.scale.set(1 / scale, 1 / scale, 1 / scale);
}
function initStuff(stuffModel: THREE.Group<THREE.Object3DEventMap>, shelfCategort: ShelfCategory, stuffCagegroy: Category) {
  const scale = stuffCagegroy.scale
  stuffModel.scale.set(1 / scale, 1 / scale, 1 / scale);
  stuffModel.position.set(
    shelfCategort.initX + stuffCagegroy.initX,
    shelfCategort.initY + stuffCagegroy.initY,
    shelfCategort.initZ + stuffCagegroy.initZ
  )
}
function setStuffPosition(stuffModel: THREE.Group<THREE.Object3DEventMap>, shelfCategort: ShelfCategory,row:number,column: number) {
  stuffModel.position.x += shelfCategort.leftOffset * (column - 1)
  stuffModel.position.y += shelfCategort.rowHeight * (row - 1)
}