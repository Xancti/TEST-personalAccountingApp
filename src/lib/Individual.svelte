<script>
    import Transactions from "$lib/Transactions.svelte"
    export let data

</script>

<div class="individual">
    <div class="header">
        <p class="description">Description</p>
        <p class="payer">Payer</p>
        <p class="owed-by">Owed By</p>
        <p class="amount">Amount</p>
    </div>
    <p class='name-display'>{data.name}</p>
    <p class='balance-display'>
        {data.balance > -1 ? 
        `You are owed: $${data.balance}` :
         `You owe: -$${-data.balance}`}</p>
    {#each data.relatedTransactions as tx}
            <Transactions transactionData={tx} personName={data.name}/>
            <!-- {$transactionStore.find(txObj => txObj.transactionID === tx).cost} -->
    {/each}
    <!-- The above should translate into an accordion -->
</div>

<style>
    .individual {
        position: relative;
        display: block;
        background-color: #002D36;
        width: 100%;
        min-height: 4rem;
        height: auto;
        color: #D6E4F5;
        border-radius: 15px;
        padding: 5em 0 1em 3em;
        margin: 1em 0 0 -1.5em;
    }

    .name-display {
        position: absolute;
        font-size: 1.5em;
        top: 0.1rem;
        left: 1rem;
        color: #67C59D
    }
    
    .balance-display {
        position: absolute;
        font-size: 1.5em;
        top: 0.1rem;
        right: 1rem;
        color: #67C59D
    }
    
    .header {
        display: grid;
        grid-template-columns: 2.5fr 2fr 3fr 1fr 1fr;
        padding: 0 -1em 0 2em;
        margin: -15px 0 -10px -2em;
    }

    .amount {
        text-align: right;
        padding-right: 1em;
    }

    
</style>