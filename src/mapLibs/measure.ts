import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import { Style, Fill, Stroke, Circle } from 'ol/style';
import { Overlay } from 'ol';
import { Draw } from 'ol/interaction';
import { LineString, Polygon } from 'ol/geom';
import { unByKey } from 'ol/Observable';
import { getLength, getArea } from 'ol/sphere.js';

export function measure(map: Record<string, any>) {
    let drawEnd = true;
    let measureResult = '';
    const draw = null;

    const source = new VectorSource({});
    const Vector = new VectorLayer({
        source,
        style: new Style({
            fill: new Fill({
                color: 'rgba(255, 255, 255, 0.4)',
            }),
            stroke: new Stroke({
                color: '#09f',
                width: 2,
            }),
            image: new Circle({
                radius: 7,
                fill: new Fill({
                    color: '#ffcc33',
                }),
            }),
        }),
    });
    map.addLayer(Vector);
    const helpTooltipElement = document.createElement('div');
    const helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left',
    });
    map.addOverlay(helpTooltip);
    // 计算距离
    function formatLength(line: any) {
        const sourceProj = map.getView().getProjection(); // 获取投影坐标系
        const length = getLength(line, { projection: sourceProj });
        const lengthStr = Math.round(length * 100) / 100 + ' m';
        //显示线测量的长度
        helpTooltip.setPosition([
            line.flatCoordinates[0],
            line.flatCoordinates[1],
        ]);
        helpTooltipElement.innerHTML = lengthStr;
        return lengthStr;
    }

    // 计算面积
    function formatArea(polygon: any) {
        const sourceProj = map.getView().getProjection(); // 获取投影坐标系
        const area = getArea(polygon, { projection: sourceProj });
        return Math.round(area * 100) / 100 + ' m2';
    }

    // 激活测量
    function addInteraction(type: string) {
        const draw = new Draw({
            source: source,
            type: type,
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)',
                }),
                stroke: new Stroke({
                    color: '#09f',
                    lineDash: [10, 10],
                    width: 2,
                }),
                image: new Circle({
                    radius: 5,
                    stroke: new Stroke({
                        color: '#09f',
                    }),
                    fill: new Fill({
                        color: 'rgba(255, 255, 255, 0.2)',
                    }),
                }),
            }),
        });

        map.addInteraction(draw);
        let listener: any = null;
        let sketch = null;
        draw.on('drawstart', (evt: any) => {
            drawEnd = false;
            sketch = evt.feature;
            listener = sketch.getGeometry().on('change', (evt: any) => {
                const geom = evt.target;
                let output;
                if (geom instanceof Polygon) {
                    measureResult = formatArea(geom);
                } else if (geom instanceof LineString) {
                    measureResult = formatLength(geom);
                }
            });
        });
        draw.on('drawend', (evt: any) => {
            drawEnd = true;
            console.log(measureResult);
            sketch = null;
            unByKey(listener);
            map.removeInteraction(draw);
        });
    }
    function measureByType(type: string) {
        if (type !== 'clear') {
            map.removeInteraction(draw);
            if (type === 'area') {
                addInteraction('Polygon');
            } else {
                addInteraction('LineString');
            }
        } else {
            map.removeInteraction(draw);
            source.clear();
            map.removeOverlay(helpTooltip); //清除图层
        }
    }
    return measureByType;
}
