<script setup lang='ts'>
import * as d3 from 'd3';
import { useTemplateRef, onMounted } from 'vue';
import type {WebLink, WebNode} from '../stores/builder.types';
import { useCharacterStore } from '@/stores/character';
import { useGraphStore } from '@/stores/graph';

const NODE_PREFIX = 'talent-web-node-';
const generateLinkId = (link: WebLink) => {
  let a = (link.source as WebNode).id;
  let b = (link.target as WebNode).id;
  return 'talent-web-link-' + (a < b ? a + "-" + b : b + "-" + a);
}

const props = defineProps<{height: number}>();
const emit = defineEmits(['talentTransaction', 'healthTransaction']);
const webRef = useTemplateRef('my-web');

const character = useCharacterStore();
const graph = useGraphStore();

const categorizeNodes = () => {
  graph.nodesMap.forEach((node, id) => {
    let classList = document.getElementById(NODE_PREFIX + id)?.classList;
    classList?.remove('anchor-node', 'selected-node', 'dead-node', 'next-node', 'node');
    if (character.talentsTaken.size == 0 && node.root) {
      classList?.add('next-node');
    } else if (node.root && character.talentsTaken.size > 1 && character.talentsTaken.has(id)) {
      classList?.add('anchor-node')
    } else if (character.talentsTaken.has(id)) {
      classList?.add('selected-node');
    } else if (node.root) {
      classList?.add('dead-node');
    } else if (graph.getNeighbours(id).filter(i => character.talentsTaken.has(i)).length > 0) {
      classList?.add('next-node');
    } else {
      classList?.add('node');
    }
  });
}

onMounted(() => {
  // append the svg object to the body of the page
  const width = webRef.value? webRef.value.offsetWidth : 1080;
  const svg = d3.select(webRef.value)
    .append('svg')
      .attr('width', width)
      .attr('height', props.height);

  // Initialize the links
  const link = svg
    .selectAll('.link')
    .data(graph.links)
    .enter().append('g')
      .attr('id', (d) => { return generateLinkId(d) });

  const linkLine = link.append('line')
    .attr('class', (d) => {return d.weight > 0 ? 'link' : ''});

  const linkText = link.append('text')
    .attr('class', 'hidden')
    .attr('dy', '.35em')
    .attr('text-anchor','middle')
    .text((d) => { return d.weight });

  // Initialize the nodes
  const node = svg
    .selectAll('.node')
    .data(graph.nodesMap.values())
    .enter().append('g')
      .attr('id', (d) => {return NODE_PREFIX + d.id});

  node.append('circle')
      .attr('r', (d) => d.health? 14 : 20)
      .on('click', (e, d) => {
        let classList = (e.target as SVGCircleElement).parentElement?.classList;
        if (classList?.contains('selected-node')) {
          character.talentsTaken.delete(d.id);
          emit('talentTransaction', d.root? 0 : 1);
          if (d.health) {
            emit('healthTransaction', -1)
          }
          categorizeNodes();
        } else if (classList?.contains('next-node')) {
          character.talentsTaken.add(d.id);
          emit('talentTransaction', d.root? 0 : -1);
          if (d.health) {
            emit('healthTransaction', 1)
          }
          categorizeNodes();
        }
      });

  node.append('text')
      .attr('dy', '.35em')
      .attr('text-anchor','middle')
      .text((d) => { return d.name });
  
  // assign classes to the nodes based on their heirarchy from taken nodes
  categorizeNodes();

  // Let's list the force we wanna apply on the network
  d3.forceSimulation(Array.from(graph.nodesMap.values()))                                  // Force algorithm is applied to data.nodes
      .force('link', d3.forceLink<WebNode, WebLink>()     // This force provides links between nodes
            .id(function(d) { return d.id; })                     // This provide  the id of a node
            .links(graph.links)                                   // and this the list of links
      )
      .force('charge', d3.forceManyBody().strength(-140))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
      .force('collide', d3.forceCollide((d) => d.health? 20 : 35))
      .force('center', d3.forceCenter(width / 2, props.height / 2))     // This force attracts nodes to the center of the svg area
      .on('end', ticked);

  // This function is run at the end of the force algorithm, updating the nodes position.
  function ticked() {
    node.attr('transform', d => { 
      return 'translate(' + (d.x ?? 0) + ',' + (d.y ?? 0) + ')';
    });

    linkLine
        .attr('x1', d => (d.source as WebNode).x ?? 0)
        .attr('y1', d => (d.source as WebNode).y ?? 0)
        .attr('x2', d => (d.target as WebNode).x ?? 0)
        .attr('y2', d => (d.target as WebNode).y ?? 0);

    // center the link text in the link
    linkText
        .attr('x', d => {
          return (((d.source as WebNode).x ?? 0) + ((d.target as WebNode).x ?? 0)) / 2;
        })
        .attr('y', d => {
          return (((d.source as WebNode).y ?? 0) + ((d.target as WebNode).y ?? 0)) / 2;
        })


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
  fill: var(--color-text);
}

.link {
  stroke: var(--color-text);
}

.anchor-node circle {
  fill: var(--vt-c-orange);
}

.selected-node circle {
  fill: var(--vt-c-yellow);
}

.selected-node circle:hover {
  fill: var(--vt-c-yellow);
  cursor: pointer;
}

.next-node circle {
  fill: var(--vt-c-indigo);
}

.next-node circle:hover {
  fill: var(--vt-c-yellow);
  cursor: pointer;
}

.dead-node circle {
  fill: black;
}

.node circle {
  fill: var(--vt-c-black-mute);
}

</style>