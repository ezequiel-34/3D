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
function sendText(){

let text = document.getElementById("inputText").value

let words = text.split(" ")

let index=0

function nextWord(){

if(index>=words.length){

resetSphere()

return

}

createWord(words[index])

index++

setTimeout(nextWord,2000)

}

nextWord()

}
function createWord(word){

let canvas=document.createElement("canvas")
let ctx=canvas.getContext("2d")

canvas.width=1000
canvas.height=300

ctx.fillStyle="white"

ctx.font="bold 160px Arial"

ctx.textAlign="center"

ctx.fillText(word,500,150)

let data=ctx.getImageData(0,0,1000,300).data

let positions=particles.geometry.attributes.position.array

let count=0

for(let y=0;y<300;y+=6){

for(let x=0;x<1000;x+=6){

let index=(y*1000+x)*4

if(data[index]>150 && count<particleCount){

let i=count*3

positions[i]=(x-500)/100
positions[i+1]=(150-y)/100
positions[i+2]=0

count++

}

}

}

particles.geometry.attributes.position.needsUpdate=true

}
function resetSphere(){

let positions=particles.geometry.attributes.position.array

for(let i=0;i<particleCount*3;i++){

positions[i]=spherePositions[i]

}

particles.geometry.attributes.position.needsUpdate=true

}
