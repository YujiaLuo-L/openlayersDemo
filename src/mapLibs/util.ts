import { WKT } from 'ol/format';
import { Overlay } from 'ol';
import { Style, Stroke, Fill, Circle } from 'ol/style';
function featureToWkt(feature: any) {
    const wkt = new WKT().writeFeature(feature, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:4326',
    });
    return wkt;
}

// 创建提示层
function createMouseTips(innerHTML = '左键添加点，双击结束绘制') {
    const tips = document.createElement('div');
    tips.innerHTML = innerHTML;
    tips.className = 'mouseTips';
    const mouseTips = new Overlay({
        element: tips,
        offset: [15, 0],
        positioning: 'center-left',
    });
    return mouseTips;
}
function createStyle(
    strokeColor?: string,
    fillColor?: string,
    circleColor?: string,
) {
    return new Style({
        fill: new Fill({
            // 填充样式
            color: fillColor || 'rgba(255, 255, 255, 0.2)',
        }),
        stroke: new Stroke({
            // 线样式
            color: strokeColor || '#FF0000',
            width: 2,
        }),
        image: new Circle({
            // 点样式
            radius: 7,
            fill: new Fill({
                color: circleColor || '#FF0000',
            }),
        }),
    });
}

export { featureToWkt, createMouseTips, createStyle };
