import "./css/reset.css"
import "./css/page.css"

import $ from 'jquery'
import * as maptalks from '~/maptalks.js';
window.maptalks = maptalks;
import JscMap from './js/jsc.two';

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
var clusterLayer, heatLayer, gridLayer;

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
                            [119.4, 32],
                            [119.5, 32],
                            [119.5, 32.1],
                            [119.4, 32.1],
                            [119.4, 32],
                        ],
                        id: 'p01',
                        title: 'hhhhhhh',
                        content: 'wewqewqewqewqewq',
                        color: '#f00'
                    }, {
                        polygon: [
                            [119.3, 32],
                            [119.2, 32],
                            [119.2, 32.1],
                            [119.3, 32.1],
                            [119.3, 32],
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
                            [119.34, 32],
                            [119.35, 32],
                            [119.35, 32.1],
                            [119.34, 32.1],
                            [119.34, 32],
                        ],
                        id: 'p11',
                        title: 'hhhhhhh',
                        content: 'wewqewqewqewqewq',
                        color: '#f55'
                    }, {
                        polygon: [
                            [119.33, 32],
                            [119.32, 32],
                            [119.32, 32.1],
                            [119.33, 32.1],
                            [119.33, 32],
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