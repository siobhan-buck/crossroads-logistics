import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('character', () => {
    const episodes = ref(0);
    const talentsTaken = new Set<number>();
    const skillsTaken= new Map<number, number>();

    const incrementEpisodes = () => {
        episodes.value++;
    }

    const decrementEpisodes = () => {
        if (episodes.value > 1) {
            episodes.value--;
        }
    }

    return { 
        episodes, 
        talentsTaken, 
        skillsTaken, 
        incrementEpisodes, 
        decrementEpisodes 
    };
})
