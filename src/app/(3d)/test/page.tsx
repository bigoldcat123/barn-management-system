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
    scene.add(axesHelper);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 5;
    let control = new OrbitControls(camera, renderer.domElement)
    control.update()
    const MAX_POINTS = 500;

   
    // geometry
    const geometry = new THREE.BufferGeometry();
    
    // attributes
    const positions = new Float32Array( MAX_POINTS * 3 ); // 3 floats (x, y and z) per point
    positions.set(  [
        -1.0, -1.0,  1.0, // v0
         1.0, -1.0,  1.0, // v1
         1.0,  1.0,  1.0, // v2
      
         1.0,  1.0,  1.0, // v3
        -1.0,  1.0,  1.0, // v4
        -1.0, -1.0,  1.0  // v5
      ]);
      geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    // draw range
    const drawCount =3; // draw the first 2 points, only
    // geometry.setDrawRange( 1, 100 ); 
    geometry.setDrawRange(0,  6 )
    
    // material
    const material = new THREE.LineDashedMaterial( {color: 0xff0000,
        linewidth: 1,
        scale: 1,
        dashSize: 0.3,
        gapSize: 0.5,} );
    
    // line
    const line = new THREE.Line(  geometry, material );

    line.position.set(1,1,1)

    const materia2 = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    
    // line
    const line2 = new THREE.Mesh(  new THREE.BoxGeometry(1,2,1), materia2 );

    // line2.matrixAutoUpdate = false;
    // line.add(line2)
    line.add(new THREE.AxesHelper(5))
    scene.add( line );

   
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

