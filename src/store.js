import { writable, derived } from "svelte/store";

export const FeedbackStore = writable([
        {
        id: 1,
        name: 'Daniel Hector',
        balance: 590
    },
        {
        id: 2,
        name: 'Miguel Francesca',
        balance: -500
    }
])