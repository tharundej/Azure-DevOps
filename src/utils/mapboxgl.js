import mapboxgl from 'mapbox-gl';

// @ts-ignore

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker')?.default;
