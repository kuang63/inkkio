import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { useCardStore } from '../stores/CardStore';

function CardPage({ pageId }) {
    const [ isDragging, setIsDragging ] = useState();
    const containerRef = useRef(null);

    const page = useCardStore(
        (state) => state.pages.find((p) => p.id === pageId)
    );

    const stageRef = useRef(null);
    const layerRef = useRef(null);

    useEffect(() => {
        const stage = new Konva.Stage({
            container: containerRef.current,
            width: 400,
            height: 560,
        });

        const layer = new Konva.Layer();

        stage.add(layer);

        stageRef.current = stage;
        layerRef.current = layer;

        return () => stage.destroy();
    }, []);

    useEffect(() => {
        const layer = layerRef.current;
        if (!layer) return;

        layer.destroyChildren();

        page.objects.forEach((object) => {
            switch (object.type) {
                case "rect":
                layer.add(new Konva.Rect(object));
                break;

                case "text":
                layer.add(new Konva.Text(object));
                break;

                case "circle":
                layer.add(new Konva.Circle(object));
                break;
            }
        });

        layer.draw();
    }, [page]);

    return <div ref = {containerRef}/>;
}

export default CardPage;