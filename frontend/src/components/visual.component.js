import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const ActivityMap = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const activityData = [
    {
      timestamp: "2023-04-04T10:30:00",
      location: { latitude: 37.7749, longitude: -122.4194 },
      activity: "Logged in"
    },
    {
      timestamp: "2023-04-04T11:15:00",
      location: { latitude: 37.7858, longitude: -122.4013 },
      activity: "Accessed file abc.txt"
    },
    {
      timestamp: "2023-04-04T12:00:00",
      location: { latitude: 37.7937, longitude: -122.3981 },
      activity: "Changed password"
    },
  ];
  
  
  useEffect(() => {

      if (map.current) return; // if map already exists, do not create again
  
      mapboxgl.accessToken = "pk.eyJ1IjoiZWh0aXNoYW0tZWphei03ODYiLCJhIjoiY2xmZWpwenJtMHM3ZDNzcDZjZ2x4aXBxZSJ9.e0_VwjdMcMsAsI6GDd7GGw  "; // replace with your own Mapbox access token
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/dark-v10", // replace with your own custom style
        center: [-122.4194, 37.7749], // San Francisco
        zoom: 1.5, // set initial zoom to show entire world
        pitch: 40 // tilt the map to show the circular markers better
      });
    }, []);
  
    useEffect(() => {
      if (!map.current) return; // if map does not exist, do not add markers
  
      map.current.on("load", function () {
        // define custom layer for activity markers
        map.current.addLayer({
          id: "activity",
          type: "fill-extrusion",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: activityData.map(activity => ({
                type: "Feature",
                geometry: {
                  type: "Point",
                  coordinates: [activity.location.longitude, activity.location.latitude]
                },
                properties: {
                  height: 500000, // set height to 500km to make it look like Earth
                  color: "#f00" // set color to red
                }
              }))
            }
          },
          paint: {
            "fill-extrusion-color": ["get", "color"],
            "fill-extrusion-height": ["get", "height"],
            "fill-extrusion-base": 0,
            "fill-extrusion-opacity": 0.8
          }
        });
      });
    }, [activityData]);
  
    return <div ref={mapContainer} style={{ height: "100vh" }} />;
  };
  
  export default ActivityMap;
  