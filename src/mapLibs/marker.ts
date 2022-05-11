import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/Layer';
import { Overlay } from 'ol';

export function marker(map: Record<string, any>, coords: any) {
    const features = coords.map(
        (coord: any) =>
            new Feature({
                geometry: new Point(coord),
            }),
    );
    const iconStyle = new Style({
        image: new Icon({
            src: 'src/assets/img/point.png',
        }),
    });
    const source = new VectorSource({ features });
    const vectorLayer = new VectorLayer({
        source,
        style: iconStyle,
    });
    map.addLayer(vectorLayer);
    function clickToShowInfo() {
        const helpToolTipElement = document.createElement('div');
        const helpTooltip = new Overlay({
            element: helpToolTipElement,
            offset: [15, 0],
            positioning: 'center-left',
        });
        map.addOverlay(helpTooltip);
        // 单击拾取 singleclick
        // 移动拾取 pointermove
        map.on('singleclick', (evt: any) => {
            const feature = source.getClosestFeatureToCoordinate(
                evt.coordinate,
            );
            helpTooltip.setPosition(evt.coordinate);
            helpToolTipElement.innerHTML = `<div style="background-color:#E6E6FA"><div>经度：${evt.coordinate[0]}</div><div>纬度：${evt.coordinate[0]}</div></div>`;
        });
    }
    return clickToShowInfo;
}
