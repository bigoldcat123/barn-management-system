"use client";

import { Category, Prisma, ShelfCategory } from "@prisma/client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { useRouter } from "next/navigation";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ThreedRoom({
  data,
}: {
  data:
    | Prisma.RoomGetPayload<{
        include: {
          shelves: {
            include: {
              stuff: {
                include: {
                  category: true;
                };
              };
              category: true;
            };
          };
        };
      }>
    | undefined
    | null;
}) {
  console.log(data);

  const router = useRouter();
  function createBarn(scene: THREE.Scene, width: number, length: number) {
    // 围墙参数
    const wallHeight = 3;
    const wallThickness = 0.3;
    const wallLength = length;
    const wallWidth = width;
    // 添加平面作为地面
    const texture = new THREE.TextureLoader().load("/t2.jpg"); // 替换为你的纹理图片路径
    const planeGeometry = new THREE.PlaneGeometry(width, length);
    const planeMaterial = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      side: THREE.DoubleSide,
      map: texture,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2; // 使平面水平
    scene.add(plane);

    const texturewall = new THREE.TextureLoader().load("/t3.jpg");

    // 创建墙体材质
    const wallMaterial = new THREE.MeshBasicMaterial({ map: texturewall });

    // 创建四面墙
    const frontWall = new THREE.Mesh(
      new THREE.BoxGeometry(wallWidth, wallHeight, wallThickness),
      wallMaterial,
    );
    frontWall.position.set(0, wallHeight / 2, -wallLength / 2);

    const backWall = frontWall.clone();
    backWall.position.set(0, wallHeight / 2, wallLength / 2);

    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(wallThickness, wallHeight, wallLength),
      wallMaterial,
    );
    leftWall.position.set(-wallWidth / 2, wallHeight / 2, 0);

    const rightWall = leftWall.clone();
    rightWall.position.set(wallWidth / 2, wallHeight / 2, 0);

    // 添加墙体到场景
    scene.add(frontWall, backWall, leftWall, rightWall);
  }

  useEffect(() => {
    const objs: number[] = [];
    function onkeydown(e: KeyboardEvent) {
      console.log(e.key);
      if (e.key == "Escape") {
        router.back();
      }
    }
    window.addEventListener("keydown", onkeydown);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    // 添加坐标轴辅助线
    // const axesHelper = new THREE.AxesHelper(5); // 参数为轴的长度
    // scene.add(axesHelper);

    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 白色平行光，强度为 1
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    camera.position.z = 10;
    camera.position.y = 10;
    const control = new OrbitControls(camera, renderer.domElement);
    control.update();
    const width = data?.width ?? 0;
    const height = data?.length ?? 0;
    createBarn(scene, width + 2, height + 2);

    data?.shelves.forEach((shelf) => {
      createShelf(shelf, data.length, data.width, scene, objs);
    });
    function animate() {
      control.update();
      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);

    objs.forEach((x) => {
      console.log(x);
    });

    // 创建一个 Raycaster
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    function onMouseDown(event: MouseEvent) {
      // 将鼠标位置归一化（-1 到 1）
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // 使用 Raycaster 检测物体
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        let selectedObject = intersects[0].object;
        let cani = false;
        let topParent = selectedObject;
        // Raycaster 返回的对象是点击的具体网格（Mesh），而不是整个组（Group）。如果点击的目标是子对象，id 会是子对象的 id。
        while (topParent.parent) {
          if (objs.includes(topParent.id)) {
            cani = true;
            selectedObject = topParent;
            break;
          }
          topParent = topParent.parent; // 循环获取根节点
        }
        console.log(topParent.id);
        if (!cani) {
          return;
        }

        // // 更改颜色
        // selectedObject.material.color.set(0xff0000);
        // console.log('Selected:', selectedObject);
        // 计算目标点
        const targetPosition = new THREE.Vector3();
        selectedObject.getWorldPosition(targetPosition);

        control.target.set(
          targetPosition.x,
          targetPosition.y,
          targetPosition.z,
        );
        // control.object.position.set(targetPosition.x, targetPosition.y + 5, targetPosition.z + 5)
        control.update();
        // 计算摄像机新位置
        // const direction = targetPosition.clone().sub(camera.position).normalize();
        // const newCameraPosition = targetPosition.clone().add(direction.multiplyScalar(-5));
        // camera.position.copy(newCameraPosition);

        // 在这里可以执行其他操作，例如改变物体的属性
      }
    }
    window.addEventListener("mousedown", onMouseDown);
    return () => {
      window.removeEventListener("keydown", onkeydown);
      window.removeEventListener("mousedown", onMouseDown);
      // renderer.dispose()
      renderer.domElement.remove();
    };
  }, []);
  return (
    <>
      <Card className=" absolute top-0 right-0">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </>
  );
}

async function createShelf(
  shelf: Prisma.ShelfGetPayload<{
    include: {
      stuff: {
        include: {
          category: true;
        };
      };
      category: true;
    };
  }>,
  length: number,
  width: number,
  scene: THREE.Scene,
  objs: number[],
) {
  // throw new Error("Function not implemented.");
  const loader = new GLTFLoader();
  const shelfModel = await loader.loadAsync(shelf.category.modle);

  initShelf(shelfModel.scene, shelf.category);

  // const geo = new THREE.BoxGeometry(2, shelf.category.rows , shelf.category.columns );
  // const mat = new THREE.MeshBasicMaterial({ color: color });
  // const mesh = new THREE.Mesh(geo, mat);
  // mesh.add(new THREE.AxesHelper(5))
  shelfModel.scene.position.set(shelf.x - width / 2, 0, shelf.y - length / 2);

  // add stuff to shelf
  // const geo2 = new THREE.BoxGeometry(3, 0.8, 0.8);
  // const mat2 = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  // const mesh2 = new THREE.Mesh(geo2, mat2);
  // mesh2.position.set(0, -shelf.category.rows * 0.5+ 0.5, shelf.category.columns * 0.5 - 0.5);
  // row 2 column 3
  // mesh2.position.y += 1;
  // mesh2.position.z -= 2
  // TODO!!! 4:53 Wed Nov 27 2024

  shelf.stuff.forEach(async (stuff) => {
    // const mesh3 = mesh2.clone();
    // mesh3.position.y += stuff.row - 1;
    // mesh3.position.z -= stuff.column - 1;
    // mesh.add(mesh3)
    const stuffModel = await loader.loadAsync(stuff.category.model);
    initStuff(stuffModel.scene, shelf.category, stuff.category);
    setStuffPosition(stuffModel.scene, shelf.category, stuff.row, stuff.column);
    shelfModel.scene.add(stuffModel.scene);
    console.log(shelfModel.scene.id, "!!!---------");
  });

  // mesh.add(mesh2)
  scene.add(shelfModel.scene);

  objs.push(...shelfModel.scenes.map((x) => x.id));
}

function initShelf(
  shelfModel: THREE.Group<THREE.Object3DEventMap>,
  shelfCategort: ShelfCategory,
) {
  const scale = shelfCategort.scale;
  shelfModel.scale.set(1 / scale, 1 / scale, 1 / scale);
}
function initStuff(
  stuffModel: THREE.Group<THREE.Object3DEventMap>,
  shelfCategort: ShelfCategory,
  stuffCagegroy: Category,
) {
  const scale = stuffCagegroy.scale;
  stuffModel.scale.set(
    (scale / 10) * shelfCategort.scale,
    (scale / 10) * shelfCategort.scale,
    (scale / 10) * shelfCategort.scale,
  );

  stuffModel.position.set(
    shelfCategort.initX + stuffCagegroy.initX,
    shelfCategort.initY + stuffCagegroy.initY,
    shelfCategort.initZ + stuffCagegroy.initZ,
  );
}
function setStuffPosition(
  stuffModel: THREE.Group<THREE.Object3DEventMap>,
  shelfCategort: ShelfCategory,
  row: number,
  column: number,
) {
  stuffModel.position.x += shelfCategort.leftOffset * (column - 1);
  stuffModel.position.y += shelfCategort.rowHeight * (row - 1);
}
