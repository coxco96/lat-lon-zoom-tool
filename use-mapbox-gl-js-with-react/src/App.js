import React from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// import cemeteries from './us-cemeteries.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiY294Y285NiIsImEiOiJja3BrY2k0ZHgwa3Y0MnZwYTl3NWs4emJ5In0.ItwJEcRmF0LwO1DkHFgpZw';



export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lng: -70.9,
            lat: 42.35,
            zoom: 9
        };
        this.mapContainer = React.createRef();
    }

    componentDidMount() {
        const {
            lng,
            lat,
            zoom
        } = this.state;
        const map = new mapboxgl.Map({
            container: this.mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v10',
            center: [lng, lat],
            zoom: zoom
        });



        map.on('load', () => {
            // add cemetery data to map
            map.addSource('cemeteries', {
                'type': 'geojson',
                'data': cemeteries
            });
            map.addLayer({
                'id': 'cemeteries-layer',
                'type': 'circle',
                'source': 'cemeteries',
                'paint': {
                    'circle-radius': 4,
                    'circle-stroke-width': 2,
                    'circle-color': 'gold',
                    'circle-stroke-color': 'white'
                }
            })
        });

        map.on('move', () => {
            this.setState({
              lng: map.getCenter().lng.toFixed(4),
              lat: map.getCenter().lat.toFixed(4),
              zoom: map.getZoom().toFixed(2)
            });
          });
    }
    render() {
        const { lng, lat, zoom } = this.state;
        return (
          <div>
            <div className="sidebar">
              Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={this.mapContainer} className="map-container" />
          </div>
        );
      }
}