import { useEffect, useRef, useState } from "react";
import Konva from "konva";
import { useCardStore } from '../stores/CardStore';

function CardPage({ pageId }) {
    const [ isDragging, setIsDragging ] = useState();
    const containerRef = useRef(null);

    const page = useCardStore(
        (state) => state.pages.find((p) => p.id === pageId)
    );
    const bgColor = page.bgColor;
    const bgTexture = `url(${page.bgTexture})`;

    const stageRef = useRef(null)
    const layerRef = useRef(null)
    const transformerRef = useRef(null)

    useEffect(() => {
        const stage = new Konva.Stage({
            container: containerRef.current,
            width: 400,
            height: 560,
        });

        const layer = new Konva.Layer();
        const transformer = new Konva.Transformer({
            anchorSize: 10,
            anchorFill: "white",
            anchorStroke: "#3b82f6",
            anchorStrokeWidth: 2,
            anchorCornerRadius: 2,
        });

        layer.add(transformer);
        stage.add(layer);

        stageRef.current = stage;
        layerRef.current = layer;
        transformerRef.current = transformer; 

        return () => stage.destroy();
    }, []);

    useEffect(() => {
        const layer = layerRef.current;
        const transformer = transformerRef.current; 
        const stage = stageRef.current;
        if (!layer || !transformer) return;

        layer.getChildren().forEach(child => {
            if (!(child instanceof Konva.Transformer)) {
            child.destroy();
            }
        });

        page.objects.forEach((object) => {

            let node;

            switch (object.type) {
                case "text":
                    node = new Konva.Text(object);
                    break;

                case "image":
                    node = new Konva.Image(object);
                    break;

                case "shape":
                    switch (object.shape) {
                        case "rect": 
                            node = new Konva.Image(object);
                            break;

                        case "circle":
                            node = new Konva.Circle(object);
                            break;
                    }
            }

            node.on("dragend", () => {
                updateObject(page.id, object.id, {
                    x: node.x(),
                    y: node.y(),
                });
            });

            node.on("click", () => {
                transformer.nodes([node]);
                layer.batchDraw();
            })

            node.on("touch", () => {
                transformer.nodes([node]);
                layer.batchDraw();
            })

            stage.on("click", (e) => {
                if (e.target === stage) {
                    transformer.nodes([]);
                    layer.batchDraw();
                }
            })

            stage.on("touch", (e) => {
                if (e.target === stage) {
                    transformer.nodes([]);
                    layer.batchDraw();
                }
            })

            layer.add(node);
        });

        layer.draw();
    }, [page]);

    return <div ref = {containerRef} style = {{backgroundColor: bgColor, backgroundImage: bgTexture, backgroundRepeat: "repeat", backgroundSize: "auto",}}/>;
}

export default CardPage;