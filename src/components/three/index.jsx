/* eslint-disable no-extra-boolean-cast */
/* eslint-disable react/no-unknown-property */
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { angleToRadians } from '../../utils/angle'
import { useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

const Three = () => {

    const orbitControlsRef = useRef(null)

    useFrame((state) => { // this callback runs for 60 times a second
       if(!!orbitControlsRef.current) {
           const { x, y } = state.mouse;
           orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45)); // you can only move around a maximum of 24 radians
           orbitControlsRef.current.setPolarAngle((y + 1) * angleToRadians(90 - 30));
           orbitControlsRef.current.update();
       }

    })  /* gives you access to whatever frames you are seeing correctly. Is something that runs whenever you have a frame available */

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
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            {/* Floor */}
            <mesh rotation={[-(angleToRadians(90)), 0, 0]}>
                <planeGeometry args={[7, 7]} />
                <meshStandardMaterial color="#1ea3d8" />
            </mesh>
            {/* Ambient light */}
            <ambientLight args={['#ffffff', 1]} />
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