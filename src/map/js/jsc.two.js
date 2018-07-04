import * as maptalks from '~/maptalks';

import AnimateMarkerLayer from '../lib/maptalks.animatemarker.es.js';
import ClusterLayer from '../lib/maptalks.markercluster.es.js';
import HeatLayer from '../lib/maptalks.heatmap.es';
import {
    BigPointLayer,
    BigLineLayer,
    BigPolygonLayer
} from '../lib/maptalks.biglayer';

import echarts from 'echarts'
import '~/echarts-gl'

maptalks.Map.prototype.hasLayer = function (layer) {
    for (var i = 0; i < this._layers.length; i++) {
        if (this._layers[i] == layer) {
            return true;
        }
    }
    return false;
}

maptalks.Map.prototype.clearLayers = function (layer) {
    for (var i = this._layers.length; i > 0; i--) {
        this.removeLayer(this._layers[i - 1]);
    }
}

//map.addLayer();
//map.removeLayer();
//map.sortLayers();


class JscMap {
    constructor(container, options) {
        if (options.baseLayerMode == 'street') {
            options.baseLayer = {
                urlTemplate: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
                subdomains: ['a', 'b', 'c', 'd'],
            }
            // new maptalks.TileLayer('base', {
            //     urlTemplate: 'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
            //     subdomains: ['a', 'b', 'c', 'd'],
            // });
        } else if (options.baseLayerMode == 'vector') {
            options.baseLayer = {
                urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
                subdomains: ['a', 'b', 'c', 'd'],
            }
            // new maptalks.TileLayer('base2', {
            //     urlTemplate: 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
            //     subdomains: ['a', 'b', 'c', 'd'],
            // });
        }

        options = Object.assign({
            pitch: 55,
            altitudeScale: 2,
            postEffect: {
                enable: true,
                FXAA: {
                    enable: true
                }
            },
            light: {
                main: {
                    intensity: 1,
                    shadow: true,
                    shadowQuality: 'high'
                },
                ambient: {
                    intensity: 0.
                },
                ambientCubemap: {
                    texture: '/src/map/data/data-1491838644249-ry33I7YTe.hdr',
                    exposure: 1,
                    diffuseIntensity: 0.5,
                    specularIntensity: 2
                }
            }
        }, options);

        var myChart = echarts.init(document.getElementById(container));
        echarts.registerMap('buildings', {
            "features": []
        });

        myChart.setOption({
            maptalks: options,
            series: [{
                type: 'map3D',
                coordinateSystem: 'maptalks',
                map: 'buildings',
                data: [],
                shading: 'realistic',
                silent: true,
                instancing: true,
                realisticMaterial: {
                    metalness: 1,
                    roughness: 0.2,
                }
            }]
        });

        window.addEventListener('resize', function () {
            myChart.resize();
        });

        this.map = myChart.getModel().getComponent('maptalks').getMaptalks();
        this.myChart = myChart;
    };

    addBuildings = function addBuildings(builds) {
        echarts.registerMap('buildings', {
            "features": builds
        });

        var regionsData = builds.map(function (feature) {
            return {
                name: feature.properties.name,
                value: Math.random() * 1,
                height: feature.properties.height,
                itemStyle: {
                    color: 'red',
                    borderColor: 'red'
                }
            };
        });

        this.myChart.setOption({
            series: [{
                type: 'map3D',
                coordinateSystem: 'maptalks',
                map: 'buildings',
                data: regionsData,
                shading: 'realistic',
                silent: true,
                instancing: true,
                realisticMaterial: {
                    metalness: 1,
                    roughness: 0.2,
                }
            }]
        });
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
        options = Object.assign({
            'max': 1,
            'radius': 25,
            'blur': 15,
            'gradient': {
                0.4: 'blue',
                0.6: 'cyan',
                0.7: 'lime',
                0.8: 'yellow',
                1.0: 'red'
            }
        }, options);

        var heatLayer = new HeatLayer('heat', data, options);
        if (options.autoAddtoMap) {
            this.map.addLayer(heatLayer);
        }
        return heatLayer;
    };

    addPoiLayer = function addPoiLayer(data, options) {

    };

    addPolygonLayer = function addPolygonLayer(data, options) {
        // [{
        //     polygon: [
        //         [119.2, 32],
        //         [119.2, 32],
        //         [119.2, 32]
        //     ],
        //     color: '#f00'
        // }]
    };

    addNetGrid = function addNetGrid(data, options) {
        var polygons = [];
        for (var k = 0; k < data.length; k++) {
            for (var i = 0; i < data[k].polygons.length; i++) {
                polygons.push(new maptalks.Polygon(data[k].polygons[i].polygon, {
                    symbol: {
                        lineColor: '#34495e',
                        lineWidth: 2,
                        polygonFill: data[k].polygons[i].color,
                        polygonOpacity: 0.6
                    },
                    properties: {
                        'minReso': data[k].minReso,
                        'maxReso': data[k].maxReso
                    }
                }).setInfoWindow({
                    'title': data[k].polygons[i].title,
                    'content': data[k].polygons[i].content
                }));
            }
        }

        var gridlayer = new maptalks.VectorLayer('grid').addGeometry(polygons);
        if (options.autoAddtoMap) {
            this.map.addLayer(gridlayer);
        }
        this.map.addEventListener('viewchange', function (e) {
            var features = gridlayer.filter(['>=', 'maxReso', e.new.zoom]).filter(['<=', 'minReso', e.new.zoom]);
            gridlayer.forEach(function (feature) {
                feature.updateSymbol({
                    polygonOpacity: 0,
                    lineOpacity: 0,
                });
            });
            features.forEach(function (feature) {
                feature.updateSymbol({
                    polygonOpacity: 0.6,
                    lineOpacity: 0.6,
                });
            });
        });
        return gridlayer;
    }

}

export default JscMap;