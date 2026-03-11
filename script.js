let scene = new THREE.Scene()

let camera = new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
)

let renderer = new THREE.WebGLRenderer({
canvas:document.getElementById("scene"),
antialias:true
})

renderer.setSize(window.innerWidth,window.innerHeight)

camera.position.z = 6

let particleCount = 8000

let geometry = new THREE.BufferGeometry()

let positions = new Float32Array(particleCount*3)

let spherePositions = []

for(let i=0;i<particleCount;i++){

let radius = 2.5

let theta = Math.random()*Math.PI*2
let phi = Math.acos((Math.random()*2)-1)

let x = radius*Math.sin(phi)*Math.cos(theta)
let y = radius*Math.sin(phi)*Math.sin(theta)
let z = radius*Math.cos(phi)

positions[i*3]=x
positions[i*3+1]=y
positions[i*3+2]=z

spherePositions.push(x,y,z)

}

geometry.setAttribute(
"position",
new THREE.BufferAttribute(positions,3)
)

let material = new THREE.PointsMaterial({

color:0xffffff,
size:0.025,
transparent:true,
opacity:0.9

})

let particles = new THREE.Points(geometry,material)

scene.add(particles)

function animate(){

requestAnimationFrame(animate)

particles.rotation.y+=0.002
particles.rotation.x+=0.001

renderer.render(scene,camera)

}

animate()
