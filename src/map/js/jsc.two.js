import * as maptalks from '~/maptalks';

import AnimateMarkerLayer from '../lib/maptalks.animatemarker.es.js';
import ClusterLayer from '../lib/maptalks.markercluster.es.js';
import HeatLayer from '../lib/maptalks.heatmap.es';
import {
    BigPointLayer,
    BigLineLayer,
    BigPolygonLayer
} from '../lib/maptalks.biglayer';


class JscMap {
    constructor(container, options) {
        if (options.baseLayerMode == 'street') {
            options.baseLayer = new maptalks.TileLayer('base', {
                urlTemplate: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
                subdomains: ['a', 'b', 'c', 'd'],
                attribution: ''
            });
        } else if (options.baseLayerMode == 'vector') {
            options.baseLayer = new maptalks.TileLayer('base', {
                urlTemplate: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
                subdomains: ['a', 'b', 'c', 'd'],
                attribution: ''
            });
        }
        this.map = new maptalks.Map(container, options);
    };

    addClusterLayer = function addClusterLayer(data, options) {
        var markers = [];
        for (var i = 0; i < data.length; i++) {
            var a = data[i];
            markers.push(new maptalks.Marker([a[0], a[1]], {
                symbol: {
                    markerType: 'ellipse',
                    markerWidth: 8,
                    markerHeight: 8,
                    markerFill: 'red',
                    markerLineColor: 'white'
                }
            }));
        }
        options = Object.assign({
            'noClusterWithOneMarker': true,
            'maxClusterZoom': 18,
            'symbol': {
                'markerType': 'ellipse',
                'markerFill': {
                    property: 'count',
                    type: 'interval',
                    stops: [
                        [0, 'rgb(135, 196, 240)'],
                        [9, '#1bbc9b'],
                        [99, 'rgb(216, 115, 149)']
                    ]
                },
                'markerFillOpacity': 0.7,
                'markerLineOpacity': 1,
                'markerLineWidth': 3,
                'markerLineColor': '#fff',
                'markerWidth': {
                    property: 'count',
                    type: 'interval',
                    stops: [
                        [0, 40],
                        [9, 60],
                        [99, 80]
                    ]
                },
                'markerHeight': {
                    property: 'count',
                    type: 'interval',
                    stops: [
                        [0, 40],
                        [9, 60],
                        [99, 80]
                    ]
                }
            },
            'drawClusterText': true,
            'geometryEvents': true,
            'single': true
        }, options);
        var clusterLayer = new ClusterLayer('cluster', markers, options);
        if (options.autoAddtoMap) {
            this.map.addLayer(clusterLayer);
        }
        return clusterLayer;

    };

    addHeatMapLayer = function addHeatMapLayer(data, options) {
        var heatLayer = new HeatLayer('heat', data, options);
        if (options.autoAddtoMap) {
            this.map.addLayer(heatLayer);
        }
    };

    addPoiLayer = function addPoiLayer(data, options) {

    };

    addPolygonLayer = function addPolygonLayer(data, options) {

    };



}

export default JscMap;