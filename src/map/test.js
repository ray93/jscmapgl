import "./css/reset.css"
import "./css/page.css"

import $ from 'jquery'
import * as maptalks from '~/maptalks.js';
window.maptalks = maptalks;
import JscMap from './js/jsc.two';

import echarts from 'echarts'
import '~/echarts-gl'

var jscMap = new JscMap('app', {
    center: [119, 32],
    zoom: 12,
    baseLayerMode: 'street'
});

var jscMap2 = new JscMap('app2', {
    center: [119, 32],
    zoom: 12,
    baseLayerMode: 'vector'
});
var map = jscMap.map;
var clusterLayer, heatLayer, gridLayer;

$('#clbtn').click(function () {
    map.clearLayers();
    if (!clusterLayer) {
        clusterLayer = jscMap.addClusterLayer([
            [119.2, 32],
            [119.1, 32],
            [119.0, 32]
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
            [119.4, 32, 0.5],
            [119.3, 32, 0.6],
            [119.2, 32, 0.7],
            [119.1, 32, 0.8],
            [119.0, 32, 0.5]
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



// $.getJSON('/src/map/data/data-1524056463493-H1PcbpN2z.json', function (buildingsGeoJSON) {

//     var builds = buildingsGeoJSON.map(function (feature) {
//         return {
//             "type": "Feature",
//             "properties": {
//                 "name": Math.random().toString(),
//                 "height": feature.height || 100
//             },
//             "geometry": {
//                 "type": "Polygon",
//                 "coordinates": [feature.polygon]
//             }

//         }

//     })

//     var myChart = echarts.init(document.getElementById('app'));
//     echarts.registerMap('buildings', {
//         "features": builds
//     });

//     var regionsData = builds.map(function (feature) {
//         return {
//             name: feature.properties.name,
//             value: Math.random() * 1,
//             height: feature.properties.height,
//             itemStyle: {
//                 color: 'red',
//                 borderColor: 'red'
//             }
//         };
//     });


//     $.getJSON('/src/map/data/data-1524055280228-SkugT242f.json', function (linesData) {
//         var data = linesData.features;

//         var hStep = 300 / (data.length - 1);
//         var taxiRoutes = [];
//         var i = 0;
//         for (var x in data) {
//             var lnglats = data[x].geometry.coordinates
//             taxiRoutes.push({
//                 coords: lnglats,
//                 lineStyle: {
//                     color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * x))

//                 },
//                 value: Math.random() * 200
//             })
//         }

//         myChart.setOption({
//             maptalks: {
//                 center: [-74.01164278497646, 40.70769573605318],
//                 zoom: 14,
//                 pitch: 55,
//                 baseLayer: {
//                     'urlTemplate': 'http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png',
//                     'subdomains': ['a', 'b', 'c', 'd']
//                 },
//                 altitudeScale: 2,
//                 postEffect: {
//                     enable: true,
//                     FXAA: {
//                         enable: true
//                     }
//                 },
//                 light: {
//                     main: {
//                         intensity: 1,
//                         shadow: true,
//                         shadowQuality: 'high'
//                     },
//                     ambient: {
//                         intensity: 0.
//                     },
//                     ambientCubemap: {
//                         texture: '/src/map/data/data-1491838644249-ry33I7YTe.hdr',
//                         exposure: 1,
//                         diffuseIntensity: 0.5,
//                         specularIntensity: 2
//                     }
//                 }
//             },
//             series: [{
//                     type: 'map3D',
//                     coordinateSystem: 'maptalks',
//                     map: 'buildings',
//                     data: regionsData,
//                     shading: 'realistic',
//                     silent: true,
//                     instancing: true,
//                     realisticMaterial: {
//                         metalness: 1,
//                         roughness: 0.2,
//                     }
//                 },
//                 // {
//                 //     type: 'lines3D',
//                 //     coordinateSystem: 'maptalks',
//                 //     effect: {
//                 //         show: true,
//                 //         constantSpeed: 1,
//                 //         trailWidth: 3,
//                 //         trailLength: 1,
//                 //         trailOpacity: 1,
//                 //         spotIntensity: 10
//                 //     },

//                 //     blendMode: 'lighter',

//                 //     polyline: true,

//                 //     data: {
//                 //         count: function () {
//                 //             return taxiRoutes.length;
//                 //         },
//                 //         getItem: function (idx) {
//                 //             return taxiRoutes[idx]
//                 //         }
//                 //     }
//                 // }
//             ]
//         });

//         var maptalksIns = myChart.getModel().getComponent('maptalks').getMaptalks();
//         maptalksIns.on('click', function (e) {
//             console.log(e)
//         })

//         var polygon = new maptalks.Polygon([
//             [
//                 [-74.01, 40.72],
//                 [-74.02, 40.71],
//                 [-74.03, 40.72],
//                 [-74.01, 40.72]
//             ]
//         ], {
//             visible: true,
//             editable: true,
//             cursor: 'pointer',
//             shadowBlur: 0,
//             shadowColor: 'black',
//             draggable: false,
//             dragShadow: false, // display a shadow during dragging
//             drawOnAxis: null, // force dragging stick on a axis, can be: x, y
//             symbol: {
//                 'lineColor': '#34495e',
//                 'lineWidth': 2,
//                 'polygonFill': 'rgb(135,196,240)',
//                 'polygonOpacity': 0.6
//             }
//         });

//         new maptalks.VectorLayer('vector', polygon).addTo(maptalksIns);
//         var layer = new maptalks.VectorLayer('vector2').addTo(maptalksIns);

//         var marker1 = new maptalks.Marker(
//             [-74.01, 40.72], {
//                 'symbol': {
//                     'markerFile': '/src/map/img/controller.png',
//                     'markerWidth': 28,
//                     'markerHeight': 40,
//                     'markerDx': 0,
//                     'markerDy': 0,
//                     'markerOpacity': 1
//                 }
//             }
//         ).addTo(layer);
//     });

// });

// window.addEventListener('resize', function () {
//     myChart.resize();
// });