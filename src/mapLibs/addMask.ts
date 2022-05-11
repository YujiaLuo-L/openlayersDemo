import { Feature } from 'ol';
import { GeoJSON, WKT } from 'ol/format';
import LayerVector from 'ol/layer/Vector';
import sourceVector from 'ol/source/Vector';
import * as Polygon from 'ol/geom/Polygon';
import { LinearRing } from 'ol/geom';
import { createStyle } from './util';
export function addMask() {
    function getDataByJson(data: Record<string, any>) {
        const fts = new GeoJSON().readFeatures(data);
        const ftsObj: Record<string, any> = fts[0];
        const geom = ftsObj.getGeometry().getGeometries()[0];
        const feature = new Feature(geom);
        const source = new sourceVector();
        const style = createStyle('rgba(0,0,0,0.6)', 'rgba(0,0,0,0.2)');
        feature.setStyle(style);
        source.addFeature(feature);
        const layer = new LayerVector({
            source: source,
        });
        return layer;
    }

    function getDataBydata(data: Record<string, any>) {
        // 读取feature
        const feature: Record<string, any> = new WKT().readFeature(data, {
            dataProjection: 'EPSG:4326',
            featureProjection: 'EPSG:4326',
        });
        // 样式
        const style = createStyle('rgba(50,50,50)', 'rgba(0,0,0,.3)');
        feature.setStyle(style);
        // 获取遮罩范围的geometry geometry 组成 feature 用getGeometry获取 geometry
        const converGeom = erase(feature.getGeometry());
        feature.setGeometry(converGeom);
        const featureArr: any[] = [feature];
        // 创建矢量层
        const xzLayer = new LayerVector({
            source: new sourceVector({
                features: featureArr,
            }),
        });
        return xzLayer;
    }

    // 擦除操作,生成遮罩范围
    function erase(geometrys: Record<string, any>) {
        const extent = [-180, -90, 180, 90];
        // 根据范围（囊括整个地图）创建一个多边形
        const polygonRing = Polygon.fromExtent(extent);
        const coords = geometrys.getCoordinates(); // 注意(coordinate) 组成 geometry 获取 Coordinates 用getCoordinates方法
        // 获取这个多边形的边界
        // MultiPolygon 是由Polygon组成
        coords.forEach((item: Array<number>) => {
            // 第一个遍历的是multipolygon
            item.forEach((coord: any) => {
                // 第二个遍历遍历的是polygon
                const linearRing = new LinearRing(coord); //线性环几何。仅用作多边形的一部分
                polygonRing.appendLinearRing(linearRing);
            });
        });

        return polygonRing;
    }

    return { getDataByJson, getDataBydata };
}
