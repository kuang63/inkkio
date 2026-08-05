import { useCardStore } from '../stores/CardStore';

function Toolbar() {
    const addObject = useCardStore((state) => state.addObject);

    const addRectangle = () => {
        addObject(1, {
            id: crypto.randomUUID(),
            type: "rect",
            x: 50,
            y: 50,
            width: 100,
            height: 80,
            fill: "cornflowerblue",
            draggable: true,
        });
    };

    return (
        <button onClick = {addRectangle}>
            Add Rectangle
        </button>
    );
}

export default Toolbar;