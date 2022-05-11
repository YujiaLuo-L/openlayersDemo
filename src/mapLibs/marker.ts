import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Style, Icon } from 'ol/style';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/Layer';
export function marker(map: Record<string, any>, coords: any) {
    const features = coords.map(
        (coord: any) =>
            new Feature({
                geometry: new Point(coord),
            }),
    );
    const iconStyle = new Style({
        image: new Icon({
            src: '../assets/img/point.png',
        }),
    });
    const source = new VectorSource({ features });
    const vectorLayer = new VectorLayer({
        source,
        style: iconStyle,
    });
    map.addLayer(vectorLayer);
}
