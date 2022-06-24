import { writable} from "svelte/store";

// This store keeps track of user balances and relevant transactionIDs

export const userStore = writable([{
    uniqueID: 0,
    name: "Esther",
    balance: 114,
    relatedTransactions: [1, 3]
},
{
    uniqueID: 1,
    name: "Miguel",
    balance: -44,
    relatedTransactions: [2, 3]
},
{
    uniqueID: 2,
    name: "Sebastian",
    balance: -60,
    relatedTransactions: [1]
},
{
    uniqueID: 4,
    name: "Daniel",
    balance: -10,
    relatedTransactions: [1, 2]
},
])

