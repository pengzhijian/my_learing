# Three.js 学习教程

## 核心思路
Three.js 是一个基于 WebGL 的 JavaScript 3D 库，它封装了复杂的 WebGL 接口，使开发者能够轻松创建 3D 场景、模型和动画。学习 Three.js 需要掌握其核心概念和工作流程，然后通过实践逐步深入。

## 学习路径

### 1. 基础概念理解

#### 1.1 Three.js 核心组件

| 组件 | 描述 | 示例代码 |
|------|------|----------|
| Scene（场景） | 3D 世界的容器，所有对象都添加到场景中 | `const scene = new THREE.Scene();` |
| Camera（相机） | 定义观察视角，类似人眼或摄像机 | `const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);` |
| Renderer（渲染器） | 将 3D 场景渲染到 2D 画布上 | `const renderer = new THREE.WebGLRenderer();` |
| Geometry（几何体） | 定义 3D 对象的形状 | `const geometry = new THREE.BoxGeometry();` |
| Material（材质） | 定义对象的外观（颜色、纹理等） | `const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });` |
| Mesh（网格） | 几何体和材质的组合，构成可见的 3D 对象 | `const cube = new THREE.Mesh(geometry, material);` |

#### 1.2 工作流程
1. 创建场景
2. 创建相机并设置位置
3. 创建渲染器并添加到 DOM
4. 创建几何体和材质
5. 创建网格并添加到场景
6. 编写渲染循环

### 2. 基础示例解析（现有代码）

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js Cube</title>
</head>
<body>
  <!-- 引入 Three.js 库 -->
  <script src="https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js"></script>
  <script>
    // 1. 创建场景
    const scene = new THREE.Scene();

    // 2. 创建相机
    // 参数：视野角度(fov), 宽高比(aspect), 近裁剪面(near), 远裁剪面(far)
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5; // 设置相机位置

    // 3. 创建渲染器
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight); // 设置渲染器大小
    document.body.appendChild(renderer.domElement); // 将渲染器添加到 DOM

    // 4. 创建立方体
    const geometry = new THREE.BoxGeometry(); // 立方体几何体
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 基础材质（不受光照影响）
    const cube = new THREE.Mesh(geometry, material); // 网格 = 几何体 + 材质
    scene.add(cube); // 将立方体添加到场景

    // 5. 渲染循环
    function animate() {
      requestAnimationFrame(animate); // 请求下一帧动画
      
      // 添加旋转动画
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      renderer.render(scene, camera); // 渲染场景
    }
    animate();
  </script>
</body>
</html>
```

### 3. 进阶功能学习

#### 3.1 添加光照

```javascript
// 添加环境光（均匀照亮所有物体）
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// 添加平行光（模拟太阳光）
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// 使用受光照影响的材质
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
```

#### 3.2 添加纹理

```javascript
// 加载纹理
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('textures/cube-texture.jpg');

// 使用带纹理的材质
const material = new THREE.MeshStandardMaterial({ map: texture });
```

#### 3.3 添加控制器（轨道控制器）

```html
<!-- 引入轨道控制器 -->
<script src="https://cdn.jsdelivr.net/npm/three@0.150.1/examples/js/controls/OrbitControls.js"></script>
```

```javascript
// 创建轨道控制器
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // 启用阻尼效果
controls.dampingFactor = 0.05; // 阻尼系数

// 在动画循环中更新控制器
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // 更新控制器
  renderer.render(scene, camera);
}
```

#### 3.4 响应式设计

```javascript
// 监听窗口大小变化
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

#### 3.5 其他几何体

```javascript
// 球体
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

// 圆柱体
const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 2, 32);

// 平面
const planeGeometry = new THREE.PlaneGeometry(5, 5);

//  torus（圆环）
const torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100);
```

### 4. 实践项目

#### 4.1 创建一个简单的 3D 场景

结合以上知识点，创建一个包含多个几何体、光照、纹理和交互控制的 3D 场景。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Three.js Advanced Example</title>
  <style>
    body { margin: 0; }
    canvas { display: block; }
  </style>
</head>
<body>
  <script src="https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.150.1/examples/js/controls/OrbitControls.js"></script>
  <script>
    // 场景
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x222222);

    // 相机
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(5, 5, 5);

    // 渲染器
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 光照
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // 网格辅助线
    const gridHelper = new THREE.GridHelper(10, 10);
    scene.add(gridHelper);

    // 创建立方体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.position.set(-2, 0.5, 0);
    scene.add(cube);

    // 创建球体
    const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.position.set(0, 0.5, 0);
    scene.add(sphere);

    // 创建圆柱体
    const cylinderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(2, 0.5, 0);
    scene.add(cylinder);

    // 轨道控制器
    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // 响应式
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 动画循环
    function animate() {
      requestAnimationFrame(animate);
      
      // 旋转立方体
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      
      // 旋转球体
      sphere.rotation.y += 0.01;
      
      // 旋转圆柱体
      cylinder.rotation.x += 0.01;
      
      controls.update();
      renderer.render(scene, camera);
    }
    animate();
  </script>
</body>
</html>
```

### 5. 高级主题

- **加载外部模型**：使用 `GLTFLoader` 或 `OBJLoader` 加载 3D 模型
- **粒子系统**：创建粒子效果和粒子动画
- **后期处理**：添加 bloom、景深等效果
- **性能优化**：减少绘制调用、使用 LOD、优化纹理等
- **物理引擎集成**：如 Cannon.js 或 Ammo.js

## 注意事项

1. **性能优化**：
   - 减少几何体顶点数量
   - 使用适当的材质（MeshBasicMaterial 比 MeshStandardMaterial 性能更高）
   - 避免不必要的渲染循环计算
   - 使用阴影时注意性能影响

2. **浏览器兼容性**：
   - Three.js 需要支持 WebGL 的现代浏览器
   - 可以使用 `WebGLRenderer` 的 `isWebGLAvailable()` 方法检查支持情况

3. **资源管理**：
   - 正确加载和管理纹理、模型等资源
   - 使用加载管理器跟踪加载进度

## 最佳实践

1. **代码组织**：
   - 将场景、相机、渲染器等核心组件分离
   - 使用模块化设计，将不同功能封装为函数或类

2. **调试技巧**：
   - 使用 Three.js 自带的 `Stats` 类监控性能
   - 使用浏览器开发者工具的 WebGL 面板调试
   - 使用 `AxesHelper` 和 `GridHelper` 辅助定位

3. **学习资源**：
   - [Three.js 官方文档](https://threejs.org/docs/)
   - [Three.js 官方示例](https://threejs.org/examples/)
   - [Three.js Fundamentals](https://threejs.org/manual/)
   - [YouTube 教程](https://www.youtube.com/results?search_query=three.js+tutorial)

## 学习建议

1. **从基础开始**：先掌握核心概念和基本组件
2. **实践为主**：通过编写代码示例巩固理解
3. **参考官方示例**：官方示例包含了几乎所有功能的用法
4. **逐步深入**：先实现简单场景，再添加复杂功能
5. **参与社区**：加入 Three.js 社区，提问和分享经验

祝你学习愉快！🚀