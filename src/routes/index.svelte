<script>
    import { FeedbackStore } from "../store"
    import MainForm from "$lib/MainForm.svelte";

    const test = $FeedbackStore[0].id

</script>

<div class="container">
    <MainForm />
    {#each $FeedbackStore as fb}
        {#if fb.name != 'undefined' && fb.balance != 'undefined'}
            <p>{fb.name}</p>
            <p>{fb.balance}</p>
            <p>{fb.id}</p>
        {/if}
    {/each}
</div>