import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import { Map, View } from 'ol';
import { defaults as Control } from 'ol/control';
import { defaults as Interaction } from 'ol/interaction';

export function initMap(target: string) {
    const map = new Map({
        layers: [
            new TileLayer({
                source: new XYZ({
                    url: 'http://t1.tianditu.gov.cn/DataServer?T=vec_w&x={x}&y={y}&l={z}&tk=5683aef5d0112597851e1fce1ed7751c',
                }),
                zIndex: -1,
            }),
            //底图文字
            new TileLayer({
                source: new XYZ({
                    url: 'http://t1.tianditu.gov.cn/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=5683aef5d0112597851e1fce1ed7751c',
                }),
                zIndex: -1,
            }),
        ],
        target: target,
        interactions: Interaction({
            doubleClickZoom: false, // 屏蔽双击放大事件
        }),
        controls: Control({
            attribution: false,
            zoom: false,
            rotate: false,
        }), // 隐藏默认的控制器
        view: new View({
            zoom: 7,
            center: [119.516012, 32.199207],
            projection: 'EPSG:4326',
            maxZoom: 21,
            minZoom: 6,
        }),
    });
    return map;
}
