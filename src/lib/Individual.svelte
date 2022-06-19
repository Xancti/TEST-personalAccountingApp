<script>
import { userStore } from "../userStore";
export let data

</script>

<div class="individual">
    <p class='name-display'>{data.name}</p>
    <p class='balance-display'>You are owed: ${data.balance}</p>
    <p class='transactionsDisplay'>{data.relatedTransactions}</p>
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