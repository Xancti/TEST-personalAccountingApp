import { writable} from "svelte/store";

// This store keeps transactions

export const TransactionStore = writable([{
    transactionID: 1,
    description: "Dinner",
    cost: 100,
    splitType: "60-30-10",
    whoPaid: "Esther",
    partiesInvolved: "Sebastian, Daniel, Esther",
},
{
    transactionID: 2,
    description: "Bouldering",
    cost: 40,
    splitType: "Equal",
    whoPaid: "Daniel",
    partiesInvolved: "Daniel, Miguel",
},
{
    transactionID: 3,
    description: "Supper (Hai Di Lao)",
    cost: 60,
    splitType: "60-40",
    whoPaid: "Esther",
    partiesInvolved: "Esther, Miguel",
}
])