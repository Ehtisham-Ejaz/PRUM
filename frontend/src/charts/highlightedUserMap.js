import React from 'react';
import { FlowAnalysisGraph } from '@ant-design/graphs';
import download from '../assets/desktop.png';
import server from "../assets/server.png";

const HighlightedUser = ({ count = 2, users}) => {

  console.log('user',users,users.length,count)

  const generateData = () => {
    const nodes = [];
    const edges = [];

    for (let i = 0; i < count + 1; i++) {
      let node = {};

      if (i === 0) {
        node = {
          id: "0",
          value: {
            items: [
              {
                text:'Server',
                icon: server, // Set the image for source node '0'
              },
            ],
          },
        };
      } else {
        node = {
          id: `${i}`,
          value: {
            items: [
              {
                text:users[i-1].text,
                icon: download, // Set the image for other nodes
              },
            ],
          },
        };
        edges.push({
          source: "0",
          target: `${i}`,
        });
      }

      nodes.push(node);
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
      customContent: (item, group, cfg) => {
        const { startY } = cfg;
        const { icon, text } = item;

        text &&
          group?.addShape('text', {
            attrs: {
              textBaseline: 'top',
              x: 35,
              y: startY,
              text,
              fill: '#fff',
            },
            // group 内唯一字段
            name: `text-${Math.random()}`,
          });
        icon &&
          group?.addShape("image", {
            attrs: {
              x: 50,
              y: startY,
              width: 108,
              height: 120,
              img: icon,
            },
            name: `image-${Math.random()}`,
          });

        // 行高
        return 14;
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 0,
        },
      },
      style: {
        fill: "transparent",
        stroke: "transparent",
      },
    },
    edgeCfg: {
      style: {
        stroke: "green",
        lineWidth: 7,
        strokeOpacity: 0.5,
      },

      edgeStateStyles: {
        hover: {
          stroke: "red",
          lineWidth: 4,
        },
      },
    },
    markerCfg: (cfg) => {
      const { edges } = data;
      return {
        position: "right",
        show: edges.find((item) => item.source === cfg.id),
      };
    },
    layout: {
      type: "circular",
      radius: 490,
      startAngle: Math.PI / -10, // Start from the top
      endAngle: (Math.PI / -3) * 5, // End at the top (360 degrees)
    },
    behaviors: ["drag-canvas", "zoom-canvas", "drag-node"],
  };

  return (
    <FlowAnalysisGraph
      {...config}
      style={{ backgroundColor: "transparent" }}
    />
  );
};

export default HighlightedUser;
