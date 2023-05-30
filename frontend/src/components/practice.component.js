import React from 'react';
import { FlowAnalysisGraph } from '@ant-design/graphs';
import download from '../assets/desktop.png'; 

const Practice = ({data_dic}) => {

  //const data_dic = [{anomaly1:{'time':'12345','event':4545,'category':'process termination','value':'how are you.thanku'}},{anomaly2:{'time':'12345','event':4545,'category':'process termination','value':'how are you.thanku'}}]

  const generateData = () => {
    const nodes = [];
    const edges = [];
    let index = 0;
  
    // Create the source node
    const sourceNode = {
      id: '0',
      value: {
        items: [
          {
            icon: download,
          },
        ],
      },
    };
  
    nodes.push(sourceNode);
  
    // Create nodes for each item in the data array
    for (const dataItem of data_dic) {
      const key = Object.keys(dataItem)[0];
      const value = dataItem[key];
      const result = value.value ? (value.value.length > 32 ? `${value.value.slice(0, 32)}\n${value.value.slice(32)}` : value.value) : '';

      //const result = value.value.length > 32 ? `${value.value.slice(0, 32)}\n${value.value.slice(32)}` : value.value;
      console.log('category',result)
  
      const node = {
        id: `${index + 1}`,
        value: {
          title: value.taskCategory,
          items: [
            {
              text: `Time: ${value.timestamp}`,
            },
            {
              text: `Event: ${value.eventId}`,
            },
            {
              text: `Value: ${result}`,
            },
          ],
        },
      };
  
      nodes.push(node);
  
      edges.push({
        source: '0',
        target: `${index + 1}`,
      });
  
      index++;
    }
  
    return {
      nodes,
      edges,
    };
  };
  
  
  
    
  const data = generateData();
  
  const config = {
    data,
    nodeCfg: {
      size: [260, 35],
      customContent: (item, group, cfg) => {
        const { startY } = cfg;
        const { icon, text } = item;

        if (icon) {
          group?.addShape('image', {
            attrs: {
              x: 50,
              y: startY,
              width: 68,
              height: 70,
              img: icon,
            },
            name: `image-${Math.random()}`,
          });
        }
      
        if (text) {
          const textShape = group?.addShape('text', {
            attrs: {
              x: 20,
              y: startY + 10,
              text,
              fill: '#000',
              fontSize: 12,
              textAlign: 'left',
              textBaseline: 'middle',
              maxWidth: 100, // Adjust the maximum width as needed
              whiteSpace: 'break-word', // Add this line
            },
            name: `text-${Math.random()}`,
          });
    
        }
  
        // Row height
        return 20;
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 0,
        },
      },
      style: (cfg) => {
        if (cfg.id === '0') {
          return {
            fill: 'transparent',
            stroke: 'transparent',
          };
        } else {
          return {
            fill: '#E6EAF1', // Custom fill color for nodes other than '0'
            stroke: '#B2BED5', // Custom stroke color for nodes other than '0'
          };
        }
      },
    },
    edgeCfg: {
      style: (edge) => {
        if (edge.source === '0') {
          return {
            stroke: 'brown',
            lineWidth: 7,
            strokeOpacity: 0.5,
          };
        } else {
          return {
            stroke: '#5ae859', // Custom stroke color for edges other than originating from '0'
            lineWidth: 7,
            strokeOpacity: 0.5,
          };
        }
      },
      edgeStateStyles: {
        hover: {
          stroke: 'red',
          lineWidth: 4,
        },
      },
    },
    markerCfg: (cfg) => {
      const { edges } = data;
      return {
        position: 'right',
        show: edges.find((item) => item.source === cfg.id),
      };
    },
    layout: {
      type: 'circular',
      radius: 260,
      startAngle: Math.PI / -14, // Start from the top
      endAngle: (Math.PI / -3) * 7, // End at the top (360 degrees)
    },
    behaviors: ['drag-canvas', 'zoom-canvas', 'drag-node'],
  };
  
  return (
    <FlowAnalysisGraph {...config} style={{ backgroundColor: 'transparent' }} />
  );  
};

export default Practice;
