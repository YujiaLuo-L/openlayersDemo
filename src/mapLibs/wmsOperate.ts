import { wmsLayerUrl } from '@/api/map';
import LayerImage from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import LayerVector from 'ol/layer/Vector';
import sourceVector from 'ol/source/Vector';
import { unByKey } from 'ol/Observable';
import { createStyle } from './util';
import { LineString, Polygon, Point } from 'ol/geom';
import Feature from 'ol/Feature';
export function wmsOperate() {
    let mapCick: any;
    // 渲染wms图层
    function loadWmsLayer(data: string, wmsParams = {}) {
        if (data) {
            const wmsLayer = new LayerImage({
                visible: true,
                source: new ImageWMS({
                    url: wmsLayerUrl, // wms地址
                    params: {
                        LAYERS: data,
                        ...wmsParams, // 可以传自定义的参数
                    },
                    serverType: 'geoserver',
                }),
            });
            return wmsLayer;
        }
    }
    function handleWmsSelect(
        map: Record<string, any>,
        wmsSource: Record<string, any>,
    ) {
        if (mapCick) return;
        let activeLayer: Record<string, any>;
        mapCick = map.on('singleclick', (evt: Record<string, any>) => {
            const viewResolution = map.getView().getResolution(); // 当前视图分辨率
            // 获取feature要素的url
            const featureUrl = wmsSource.getFeatureInfoUrl(
                evt.coordinate, // 坐标
                viewResolution,
                'EPSG:4326', // 投影
                { INFO_FORMAT: 'application/json' }, // 信息格式
            );
            if (featureUrl) {
                fetch(featureUrl)
                    .then((response) => response.text()) // text()方法属于fetchAPI的一部分，它返回一个Promise实例对象 用于获取后台返回的数据 response.text();
                    .then((data) => {
                        if (activeLayer) {
                            map.removeLayer(activeLayer);
                        }
                        // 在这个then里面我们能拿到最终的数据
                        const { features } = JSON.parse(data);
                        console.log(features);
                        const featureArr: any[] = [];
                        const style = createStyle();
                        features.forEach((item: Record<string, any>) => {
                            const { coordinates, type } = item?.geometry;
                            let geom;
                            switch (type) {
                                case 'Point':
                                    geom = new Point(coordinates);
                                    break;

                                case 'LineString':
                                    geom = new LineString(coordinates);
                                    break;
                                case 'Polygon':
                                    geom = new Polygon(coordinates);
                                    break;
                            }
                            const temp = new Feature({
                                geometry: geom,
                            });
                            temp.setStyle(style);
                            featureArr.push(temp);
                        });
                        activeLayer = new LayerVector({
                            source: new sourceVector({
                                features: featureArr,
                            }),
                        });
                        map.addLayer(activeLayer);
                    });
            }
        });
    }

    function removeClick() {
        if (mapCick) {
            unByKey(mapCick);
        }
    }

    return { loadWmsLayer, handleWmsSelect, removeClick };
}
