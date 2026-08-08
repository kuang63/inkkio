import { useShallow } from 'zustand/react/shallow'
import { useCardStore } from '../stores/CardStore';
import HeroImage from '../assets/hero.png';
import robots from '../assets/robots.png';

function Toolbar() {
    const { currentPage, addObject, setBgColor, setBgTexture } = useCardStore(
        useShallow((state) => ({ currentPage: state.currentPage, addObject: state.addObject, setBgColor: state.setBgColor, setBgTexture: state.setBgTexture, })),
    )

    function addText() {
        addObject(currentPage, {
            id: crypto.randomUUID(),
            type: "text",
            text: "Hello, world",
            x: 50,
            y: 50,
            fontSize: 25,
            fontFamily: "Arial",
            fill: "black",
            draggable: true,
        });
    };

    function addImage(imageSrc) {
        const img = new Image();

        img.onload = () => {
            addObject(currentPage, {
                id: crypto.randomUUID(),
                type: "image",
                image: img,
                x: 50,
                y: 50,
                width: 100,
                height: 80,
                draggable: true,
            });
        };

        img.src = imageSrc;
    }

    function addShape(shapeType) {
        addObject(currentPage, {
            id: crypto.randomUUID(),
            type: "shape",
            shape: shapeType,
            x: 50,
            y: 50,
            width: 100,
            height: 80,
            fill: "cornflowerblue",
            draggable: true,
        });
    };

    return (
        <>
            <button onClick = {() => {setBgColor(currentPage, "blue")}}>
                Change Background Color  
            </button>
            <button onClick = {() => {setBgTexture(currentPage, robots)}}>
                Change Background Texture
            </button>
            <button onClick = {addText}>
                Add Text
            </button>
            <button onClick = {() => {addImage(HeroImage)}}>
                Upload Image
            </button>
            <button onClick = {() => {addShape("circle")}}>
                Add shape
            </button>
        </>
    );
}

export default Toolbar;