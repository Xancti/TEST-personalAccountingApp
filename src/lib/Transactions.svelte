<script>
    export let transactionData
    export let personName
    import { transactionStore } from "../transactionStore"

</script>

<!-- Managed to pass name in as a prop! -->
<div class="transaction">
    <p class="description">{$transactionStore.find(txObj => txObj.transactionID === transactionData).description}</p>
    <p class="payor">{$transactionStore.find(txObj => txObj.transactionID === transactionData).whoPaid}</p>
    <p class="debts">{$transactionStore.find(txObj => txObj.transactionID === transactionData).debtBreakdownAsString}</p>
    <p class="cost">{$transactionStore.find(txObj => txObj.transactionID === transactionData).costBreakdown[personName]}</p>
</div>

<style>
    .cost {
        text-align: right;
        padding-right: 1em;
        border-left: solid 1px #67C59D
    }

    .payor {
        text-align: left;
        padding-left: 10px;
        border-left: solid 1px #67C59D
    }

    .debts {
        text-align: left;
        padding-left: 1rem;
        border-left: solid 1px #67C59D
    }

    .transaction {
        display: grid;
        grid-template-columns: 2.5fr 3fr 3fr 1fr;
        padding: 0 -1em 0 2em;
        margin: -15px 0 -10px -2em;
    }
</style>

