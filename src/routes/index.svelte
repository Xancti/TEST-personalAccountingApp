<script>
    import { TransactionStore } from "../transactionStore"
    import { userStore } from "../userStore";
    import MainForm from "$lib/MainForm.svelte";

</script>

<div class="container">
    <MainForm />
    {#each $userStore as individual}
        <p>{individual.name}</p>
        <p>{individual.balance}</p>
        <p>{individual.relatedTransactions}</p>
    {/each}

    {#each $TransactionStore as tx}
    <p>{tx.cost}</p>
    <p>{tx.description}</p>
    {/each} 
</div>