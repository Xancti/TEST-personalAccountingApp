<script>
    import Transactions from "$lib/Transactions.svelte"
    export let data

</script>

<div class="individual">
    <p class='name-display'>{data.name}</p>
    <p class='balance-display'>
        {data.balance > 0 ? 
        `You are owed: $${data.balance}` :
         `You owe: -$${-data.balance}`}</p>
    {#each data.relatedTransactions as tx}
            <Transactions transactionData={tx} name={data.name}/>
            <!-- {$transactionStore.find(txObj => txObj.transactionID === tx).cost} -->
    {/each}
    <!-- The above should translate into an accordion -->
</div>

<style>
    .individual {
        background-color: #002D36;
        width: 100%;
        height: auto;
        color: #D6E4F5;
        border-radius: 15px;
        padding: 40px 0;
        margin: 20px auto;
        position: relative;
    }

    .name-display {
        position: absolute;
        font-size: 1.5em;
        top: 0.1rem;
        left: 1.5rem;
    }

    .balance-display {
        position: absolute;
        font-size: 1.5em;
        top: 0.1rem;
        right: 1.5rem;
    }

</style>