import { defineStore } from 'pinia'
import type {WebLink, WebNode} from '../stores/builder.types';
import webData from '../assets/talent_web.json';

export const useGraphStore = defineStore('graph', () => {

    const nodesMap = new Map<number, WebNode>();
    webData.nodes.forEach((n: WebNode) => {
        nodesMap.set(n.id, n);
    });
    
    const links: WebLink[] = webData.links;

    const edges = new Map<number, number[]>();
    webData.links.forEach((l) => {
        edges.set(l.source, (edges.get(l.source) ?? []).concat([l.target]));
        edges.set(l.target, (edges.get(l.target) ?? []).concat([l.source]));
    });

    const getNeighbours = (id: number) => {
        return edges.get(id) ?? [0];
    }

    return { 
        nodesMap,
        links,
        getNeighbours
    };
})