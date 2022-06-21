import { writable} from "svelte/store";

// This store keeps transactions

export const transactionStore = writable([{
    transactionID: 1,
    description: "Dinner",
    cost: 100,
    splitType: "60-30-10",
    whoPaid: "Esther",
    partiesInvolved: "Sebastian, Daniel, Esther",
    costBreakdown: {Sebastian: -60,
        Daniel: -30,
        Esther: -10
    }
},
{
    transactionID: 2,
    description: "Bouldering",
    cost: 40,
    splitType: "Equal",
    whoPaid: "Daniel",
    partiesInvolved: "Daniel, Miguel",
    costBreakdown: {Daniel: -20,
        Miguel: -20
    }
},
{
    transactionID: 3,
    description: "Supper (Hai Di Lao)",
    cost: 60,
    splitType: "60-40",
    whoPaid: "Esther",
    partiesInvolved: "Esther, Miguel",
    costBreakdown:  {
        Esther: 36,
        Miguel: -24
    }
}
])