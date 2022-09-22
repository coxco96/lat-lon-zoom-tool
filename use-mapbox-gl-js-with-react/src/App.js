import React from 'react';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// import cemeteries from './us-cemeteries.js';

mapboxgl.accessToken = 'pk.eyJ1IjoiY294Y285NiIsImEiOiJja3BrY2k0ZHgwa3Y0MnZwYTl3NWs4emJ5In0.ItwJEcRmF0LwO1DkHFgpZw';



export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            lng: -96.48,
            lat: 39.42,
            zoom: 4.15
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
                'data': "https://raw.githubusercontent.com/coxco96/us-cemeteries-in-react/main/use-mapbox-gl-js-with-react/data/us-hexgrid.json"
            });
            map.addLayer({
                'id': 'cemeteries-layer',
                'type': 'fill',
                'source': 'cemeteries',
                'paint': {
                    'fill-color': [
                        "step",
                        ["get", "count"],
                        "#ede5cf",
                        3,
                        "#e0c2a2",
                        10,
                        "#d39c83",
                        30,
                        "#c1766f",
                        60,
                        "#a65461",
                        100,
                        "#813753",
                        150,
                        "#541f3f"
                    ],
                    'fill-opacity': .4,
                },
                'filter': ['!=', 'count', 0]
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