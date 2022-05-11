import LayerVector from 'ol/layer/Vector';
import sourceVector from 'ol/source/Vector';
import { Draw } from 'ol/interaction';
import { featureToWkt, createMouseTips, createStyle } from './util';
export function getDrawInter(map: Record<string, any>) {
    let wrapLayer: Record<string, any> = {}; // 绘制控件
    let mouseTips: Record<string, any>; // 鼠标提示

    function drawByType(type: string) {
        // 实例化一个矢量图层Vector作为绘制层
        const source = new sourceVector();
        const style = createStyle();
        const vectorLayer = new LayerVector({
            source: source,
            style: style,
        });
        map.addLayer(vectorLayer);
        wrapLayer = new Draw({
            // 绘制控件
            source: source, // 一定要添加绘画图层的数据源，否则画图完成后，无法保存矢量数据
            type: type,
        });
        map.addInteraction(wrapLayer);
        // 开始绘制
        wrapLayer.on('drawstart', () => {
            mouseTips = createMouseTips();
            map.addOverlay(mouseTips);
        });
        // 鼠标移动
        map.on('pointermove', (evt: Record<string, any>) => {
            if (mouseTips) {
                mouseTips.setPosition(evt.coordinate);
            }
        });
        // 绘制完毕
        wrapLayer.on('drawend', (event: Record<string, any>) => {
            map.removeInteraction(wrapLayer); // 移除绘制图形控件
            // 移除提示层
            map.removeOverlay(mouseTips);
            mouseTips = {};
            const tempwkt = featureToWkt(event.feature);
            console.log(tempwkt);
        });
    }

    return drawByType;
}
