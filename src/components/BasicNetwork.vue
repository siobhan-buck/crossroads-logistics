<script setup lang="ts">
import * as d3 from 'd3';
import { useTemplateRef, onMounted, defineComponent } from 'vue';
import netData from '../assets/talent_network.json';

defineComponent(
  {name: 'BasicNetwork'}
);

const networkRef = useTemplateRef('my-network');

onMounted(() => {
// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select(networkRef.value)
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("svg")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

interface NetworkNode extends d3.SimulationNodeDatum {
  id: number;
  name: string;
  primary?: boolean;
  x?: number;
  y?: number;
}

interface NetworkLink extends d3.SimulationLinkDatum<NetworkNode> {
}

type NetworkData = {
  nodes: Array<NetworkNode>;
  links: Array<NetworkLink>;
};

let data: NetworkData = netData;
// let data: NetworkData = JSON.parse(readFileSync('../asets/talent_network.json', 'utf-8'));

  // Initialize the links
  var link = svg
    .selectAll(".link")
    .data(data.links)
    .enter()
    .append("line")
      .attr("class", "link");

  // Initialize the nodes
  var node = svg
    .selectAll(".node")
    .data(data.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("class", (d) => {return d.primary? "primary-node" : "secondary-node"});

  node.append("circle")
      .attr("r", 20);

  node.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor","middle")
      .text((d) => { return d.name });

  // Let's list the force we wanna apply on the network
  var simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
      .force("link", d3.forceLink<NetworkNode, NetworkLink>()     // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
      )
      .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
      .on("end", ticked);

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    link
        .attr("x1", d => (d.source as NetworkNode).x ?? 0)
        .attr("y1", d => (d.source as NetworkNode).y ?? 0)
        .attr("x2", d => (d.target as NetworkNode).x ?? 0)
        .attr("y2", d => (d.target as NetworkNode).y ?? 0);

    node.attr("transform", d => { 
      return "translate(" + (d.x?d.x+6:0) + "," + (d.y?d.y-6:0) + ")";
    });
  }

});


</script>

<template>
  <div ref="my-network"></div>
</template>

<style>

.link {
  stroke: #aaa;
}

.node text {
  pointer-events: none;
}

.primary-node circle {
  fill: #49bfbf;
}

.secondary-node circle {
  fill: #49bf88;
}

</style>