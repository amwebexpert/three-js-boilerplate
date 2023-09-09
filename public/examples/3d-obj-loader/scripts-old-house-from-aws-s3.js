var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.z = 20;

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.enableZoom = true;

var keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(30, 100%, 75%)'), 1.0);
keyLight.position.set(-100, 0, 100);

var fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(240, 100%, 75%)'), 0.75);
fillLight.position.set(100, 0, 100);

var backLight = new THREE.DirectionalLight(0xffffff, 1.0);
backLight.position.set(100, 0, -100).normalize();

scene.add(keyLight);
scene.add(fillLight);
scene.add(backLight);

const url = "https://3d-model-old-house.s3.us-east-1.amazonaws.com/uploads_files_4261336_01_model%20%281%29.obj?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJIMEYCIQDcDTmLNxFlumFLtQ6tnuTj8H%2BRzTSAdpwXF2vNS6CceQIhAKEz3Wp09er5C%2BxEGKEBeg5jPDv501Tpx%2B8QM6GD82zFKu0CCLv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQARoMODcxODYwMTQ5MzUzIgzPLEk1gKMZxGZXsLgqwQL7e1NXIqkRDIhwpgoBugQ4prSoMaSI2bvGsoNgzY7FAB63Rwje7tGfsa0z6QlwGCS%2B2lihlVlJk0pBxNqyiBjcxiixoY4l8vAKJCzAvV32IAiNLXqvhX7W0SQ8Iy3jAHDs8HbWhc27ARZg75xnoMm8xoA4gCBsvBTTp3E5%2BHMbkTWY5WWUjiq1V3QQP%2BCWqh6Tni4jShaqf50PVhM3utCpl3zSdX3boMD%2F4k62UBTUsAkeiaHwRs9a9Ls7B3X9fIkOFsRdzyqeLr1qZAXEvO6lOhg7FdD3yuDr3fzIpADESRGDxUGmBpgjPSPzqHJ23Wr%2Fe1b87Xy%2BpMVjZcv7D%2BygH4kLgiD21wDskPxMeRhy84cv92LI%2FryQrmvQm0pNLZmPH63dHKSwDjm%2FfA0oiRnpR8fBX4N%2B4c0mIzykunwD4o8wtYnxpwY6sgJROiXgJW8Tb%2FimQH8E3xn37Gz3Vw3k9Od6X%2BWjSxV9mEJ%2BYFWyHRn%2FkHmgxTRWfRyEAA5OmWRjimAcD7B4UFrjri%2Bp5hRzDcG28gSwxfSPZqq7dLVg8KdgOaWrC4W%2FPFf9Ff%2FwCocagFcebJgGdPP21s0yXE5KQlDtsfBO0ck9f4EOQM4jiyhC4DYh3ibwIhTQGH5qZxHNSZ%2Fb4%2F5vV5e0d3iDJOBhdVFnpdKET2UIh3ErQJR2ocTIdacsCQD3kBTitADutoX%2FgXYHHmn01jlYEWupW37uDnkXMo8gIDqFH1iX2UNbPFFEG6K6ss1fsf32bL%2FotoqAT49d8u992h3mUSLhPB86q6O%2FL1e6e3qPr88nGX1AoqaT04gQgYbG%2FzIyJD1EPcPFnjHt7VN9khDJgCw%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20230909T121501Z&X-Amz-SignedHeaders=host&X-Amz-Expires=7200&X-Amz-Credential=ASIA4V7XKDRUZAHEKLWN%2F20230909%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Signature=0c6c88a7c5804034b04f8a084f18fed39e61ea53b0158fee88712b40c166abf9";
var objLoader = new THREE.OBJLoader();
objLoader.load(url, function (object) {
    scene.add(object);
});

var animate = function () {
	requestAnimationFrame( animate );
	controls.update();
	renderer.render(scene, camera);
};

animate();