<script>
    export let transactionData
    export let name
    import { transactionStore } from "../transactionStore"

</script>

<!-- Managed to pass name in as a prop! -->
<div class="transaction">
    <p class="description">{$transactionStore.find(txObj => txObj.transactionID === transactionData).description}</p>
    <p class="people">{$transactionStore.find(txObj => txObj.transactionID === transactionData).partiesInvolved}</p>
    <p class="cost">{$transactionStore.find(txObj => txObj.transactionID === transactionData).cost}</p>
</div>

<style>
    .transaction {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
    }
</style>

