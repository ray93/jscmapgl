import "./css/reset.css"
import "./css/page.css"

import $ from 'jquery'
import * as maptalks from '~/maptalks.js';
window.maptalks = maptalks;
import JscMap from './js/jsc.two';

import png01 from './img/player.png';

// import echarts from 'echarts'
// import '~/echarts-gl'

var jscMap = new JscMap('app', {
    center: [-74.01, 40.70],
    zoom: 14,
    baseLayerMode: 'street'
});

var jscMap2 = new JscMap('app2', {
    center: [-74.01, 40.70],
    zoom: 14,
    baseLayerMode: 'vector'
});
var map = jscMap.map;
var clusterLayer, heatLayer, gridLayer, poiLayer;

$('#clbtn').click(function () {
    map.clearLayers();
    if (!clusterLayer) {
        clusterLayer = jscMap.addClusterLayer([
            [-74.01, 40.70],
            [-74.02, 40.70],
            [-74.03, 40.70]
        ], {
            autoAddtoMap: true
        });
    } else if (!map.hasLayer(clusterLayer)) {
        map.addLayer(clusterLayer);
    }
});

$('#heatbtn').click(function () {
    map.clearLayers();
    if (!heatLayer) {
        heatLayer = jscMap.addHeatMapLayer([
            [-74.01, 40.70, 0.5],
            [-74.02, 40.70, 0.6],
            [-74.03, 40.70, 0.7]
        ], {
            autoAddtoMap: true
        });
    } else if (!map.hasLayer(heatLayer)) {
        map.addLayer(heatLayer);
    }
});

$('#gridbtn').click(function () {
    map.clearLayers();
    if (!gridLayer) {
        gridLayer = jscMap.addNetGrid(
            [{
                    minReso: 10,
                    maxReso: 12,
                    polygons: [{
                        polygon: [
                            [-74.01, 40.70],
                            [-74.11, 40.70],
                            [-74.11, 40.80],
                            [-74.01, 40.80],
                            [-74.01, 40.70],
                        ],
                        id: 'p01',
                        title: 'hhhhhhh',
                        content: 'wewqewqewqewqewq',
                        color: '#f00'
                    }, {
                        polygon: [
                            [-74.11, 40.70],
                            [-74.21, 40.70],
                            [-74.21, 40.80],
                            [-74.11, 40.80],
                            [-74.11, 40.70],
                        ],
                        id: 'p02',
                        title: 'hhffffh',
                        color: '#ff0'
                    }]
                },
                {
                    minReso: 13,
                    maxReso: 14,
                    polygons: [{
                        polygon: [
                            [-74.15, 40.70],
                            [-74.18, 40.70],
                            [-74.18, 40.75],
                            [-74.15, 40.75],
                            [-74.15, 40.70],
                        ],
                        id: 'p11',
                        title: 'hhhhhhh',
                        content: 'wewqewqewqewqewq',
                        color: '#f55'
                    }, {
                        polygon: [
                            [-74.18, 40.70],
                            [-74.20, 40.70],
                            [-74.20, 40.75],
                            [-74.18, 40.75],
                            [-74.18, 40.70],
                        ],
                        id: 'p12',
                        title: 'hhffffh',
                        color: '#f88'
                    }]
                }
            ], {
                autoAddtoMap: true
            });
    } else if (!map.hasLayer(gridLayer)) {
        map.addLayer(gridLayer);
    }

});

$('#buildbtn').click(function () {
    $.getJSON('/src/map/data/data-1524056463493-H1PcbpN2z.json', function (buildingsGeoJSON) {
        var builds = buildingsGeoJSON.map(function (feature) {
            return {
                "type": "Feature",
                "properties": {
                    "name": Math.random().toString(),
                    "height": feature.height || 100
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": [feature.polygon]
                }

            }
        });

        jscMap.addBuildings(builds);
    });
});

$('#clearbuildbtn').click(function () {
    jscMap.addBuildings([]);
});

$('#poibtn').click(function () {
    map.clearLayers();
    if (!poiLayer) {
        poiLayer = jscMap.addPoiLayer(
            [{
                poi: [-74, 40.70],
                id: "poi01",
                path: png01,
                width: 50,
                height: 50
            }, {
                poi: [-74.01, 40.70],
                id: "poi02",
                isVector: true,
                width: 50,
                height: 50
            }, {
                poi: [-74.02, 40.70],
                id: "poi03",
                path: png01,
                width: 50,
                height: 50
            }], {
                autoAddtoMap: true
            });

        map.addEventListener("selectPoi", function (e) {
            console.log(e.getId());
        })
    }
});