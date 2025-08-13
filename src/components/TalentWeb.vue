<script setup lang='ts'>
import * as d3 from 'd3';
import { useTemplateRef, onMounted } from 'vue';
import type {WebData, WebLink, WebNode} from '../stores/builder.types';
import webData from '../assets/talent_web.json';


const props = defineProps<{height: number}>();
const emit = defineEmits(['nodeToggled']);
const webRef = useTemplateRef('my-web');

onMounted(() => {
  // serialize the data from json
  const data: WebData = webData;

  // append the svg object to the body of the page
  const width = webRef.value? webRef.value.offsetWidth : 1080;
  const svg = d3.select(webRef.value)
    .append('svg')
      .attr('width', width)
      .attr('height', props.height);

  // Initialize the links
  const link = svg
    .selectAll('.link')
    .data(data.links)
    .enter()
    .append('line')
      .attr('class', (d) => {return d.weight > 0 ? 'link' : ''});

  // Initialize the nodes
  const node = svg
    .selectAll('.node')
    .data(data.nodes)
    .enter().append('g')
      .attr('class', (d) => {
        return d.root? 'root-node' : 'node secondary-node'
      });

  node.append('circle')
      .attr('r', 20)
      .on('click', (e, d) => {
        if (d.root != true) {
          emit('nodeToggled', d.id);
          let classList = (e.target as SVGCircleElement).parentElement?.classList;
          classList?.toggle('selected-node');
          classList?.toggle('secondary-node');
        }
      });

  node.append('text')
      .attr('dy', '.35em')
      .attr('text-anchor','middle')
      .text((d) => { return d.name });

  // Let's list the force we wanna apply on the network
  d3.forceSimulation(data.nodes)                                  // Force algorithm is applied to data.nodes
      .force('link', d3.forceLink<WebNode, WebLink>()     // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(data.links)                                    // and this the list of links
      )
      .force('charge', d3.forceManyBody().strength(-350))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force('center', d3.forceCenter(width / 2, props.height / 2))     // This force attracts nodes to the center of the svg area
      .on('end', ticked);

  // This function is run at the end of the force algorithm, updating the nodes position.
  function ticked() {
    link
        .attr('x1', d => (d.source as WebNode).x ?? 0)
        .attr('y1', d => (d.source as WebNode).y ?? 0)
        .attr('x2', d => (d.target as WebNode).x ?? 0)
        .attr('y2', d => (d.target as WebNode).y ?? 0);

    node.attr('transform', d => { 
      return 'translate(' + (d.x?d.x+6:0) + ',' + (d.y?d.y-6:0) + ')';
    });
    d3.select(webRef.value).attr('class', 'diagram');
  }

});
</script>

<template>
  <div ref="my-web" class="hidden diagram">
  </div>
</template>

<style>
.hidden {
  visibility: hidden;
}

.diagram text {
  pointer-events: none;
}

.link {
  stroke: #aaa;
}

.root-node circle {
  fill: #bf6e49;
}

.selected-node circle {
  fill: #bf9049;
}

.node circle:hover {
  fill: #49bf88;
  cursor: pointer;
}

.secondary-node circle {
  fill: #c7c9c8;
}

</style>