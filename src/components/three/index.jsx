/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { angleToRadians } from '../../utils/angle'
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';
import * as THREE from 'three'

const Three = () => {

    const orbitControlsRef = useRef(null)

    /* gives you access to whatever frames you are seeing correctly. Is something that runs whenever you have a frame available */
    useFrame((state) => { // this callback runs for 60 times a second
       if(!!orbitControlsRef.current) {
           const { x, y } = state.mouse;
           orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45)); // you can only move around a maximum of 24 radians
           orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
           orbitControlsRef.current.update();
       }
    })

    useEffect(() => {
        if(!!orbitControlsRef.current) {
            console.log(orbitControlsRef.current)
        }
    }, [orbitControlsRef.current])

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 1, 5]} />
            <OrbitControls ref={orbitControlsRef} minPolarAngle={angleToRadians(60)} maxPolarAngle={angleToRadians(80)} /> {/* allow the camera to orbit around a target (move the mouse over the target), i stay in a circular orbit around the target */}
            {/* Ball */}
            <mesh position={[0, 0.5, 0]} castShadow>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
            </mesh>
            {/* Floor */}
            <mesh rotation={[-(angleToRadians(90)), 0, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>
            {/* Ambient light */}
            <ambientLight args={['#ffffff', 0.25]} />

            {/* Directional light */}
            {/* <directionalLight args={[ '#ffffff', 1]} position={[-4, 1, 0]} /> */}

            {/* PointLight */}
           {/*  <pointLight args={[ '#ffffff', 1]} position={[-3, 1, 0]} /> */}

            {/* SpotLight */}
            <spotLight args={[ '#ffffff', 1.5, 7, angleToRadians(45), 0.4]} position={[-3, 1, 0]} castShadow />

            {/* Environment */}
            <Environment background>
                <mesh scale={100}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshBasicMaterial side={THREE.BackSide} color="#2266cc" />{/* 2280cc */}
                </mesh>
            </Environment>
            {/* Environment is what surrounds the object */}
        </>
    );
}

export default Three;

/* 
- mesh: anything that you can see in a scene, for example a shape or object (sphere, etc...), is called a MESH.
Any object that you have it's going to comprise of two things:
1. It's a SHAPE, how it looks (a cube, etc...)  --> GEOMETRY
2. It has a SURFACE (superficie)  --> MATERIAL  (the nature of this surface, color, etc...)

MESH = GEOMETRY + MATERIAL

---------
For CAMERA:
    Azimuth angle --> x-axis
    Polar angle --> y-axis
*/