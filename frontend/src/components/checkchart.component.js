
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = "pk.eyJ1IjoiZWh0aXNoYW0tZWphei03ODYiLCJhIjoiY2xmZWpwenJtMHM3ZDNzcDZjZ2x4aXBxZSJ9.e0_VwjdMcMsAsI6GDd7GGw";

const Map = () => {
  const [map, setMap] = useState(null);
  const getCoordinates = (location) => {
    switch (location) {
      case 'New York':
        return [-74.005941, 40.712784];
      case 'Los Angeles':
        return [-118.243683, 34.052235];
      case 'San Francisco':
        return [-122.419418, 37.774929];
      case 'Seattle':
        return [-122.332071, 47.606209];
      case 'Boston':
        return [-71.0589, 42.3601];
      case 'Chicago':
        return [-87.6298, 41.8781];
      default:
        return [0, 0];
    }
  }  

  useEffect(() => {
    const initializeMap = ({ setMap, mapContainer }) => {
      const mapboxMap = new mapboxgl.Map({
        container: mapContainer,
        style: "mapbox://styles/mapbox/light-v10",
        center: [0, 0],
        zoom: 0,
      });

      mapboxMap.on("load", () => {
        setMap(mapboxMap);
        mapboxMap.resize();
      });
    };

    if (!map) {
      initializeMap({ setMap, mapContainer: "map" });
    } else {

      const data = [
        {
          id: 1,
          source: "New York",
          destination: "Los Angeles",
          protocol: "TCP",
          timestamp: "2022-03-18T14:30:00Z",
          latitude: 40.7128,
          longitude: -74.006,
        },
        {
          id: 2,
          source: "San Francisco",
          destination: "Seattle",
          protocol: "UDP",
          timestamp: "2022-03-18T15:00:00Z",
          latitude: 37.7749,
          longitude: -122.4194,
        },
        {
          id: 3,
          source: "Boston",
          destination: "Chicago",
          protocol: "HTTP",
          timestamp: "2022-03-18T16:30:00Z",
          latitude: 42.3601,
          longitude: -71.0589,
        },
        // Add more objects as needed
      ];
      
      // Create a source for the lines
      map.addSource('lines', {
        'type': 'geojson',
        'data': {
          'type': 'FeatureCollection',
          'features': []
        }
      });

      // Create a layer for the lines
      map.addLayer({
        'id': 'lines',
        'type': 'line',
        'source': 'lines',
        'paint': {
          'line-color': 'red',
          'line-width': 2
        }
      });
      

      // Add the lines to the map
      const features = data.map(({ source, destination, latitude, longitude }) => {
        const destinationCoordinates = getCoordinates(destination);
        return {
          'type': 'Feature',
          'geometry': {
            'type': 'LineString',
            'coordinates': [
              [longitude, latitude],
              destinationCoordinates
            ]
          },
          'properties': {
            'source': source,
            'destination': destination
          }
        }
      });      
      map.getSource('lines').setData({
        'type': 'FeatureCollection',
        'features': features
      });
    }
  }, [map]);

  return <div id="map" style={{ height: "100vh", width: "100vw" }} />;
};

export default Map;
