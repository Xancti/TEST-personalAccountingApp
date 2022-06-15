<script>
import Card from "./Card.svelte";
import { FeedbackStore } from "../store";

let data = $FeedbackStore
let description
let cost
let name
$: person = $FeedbackStore.find(personObject => personObject.name === name)
$: relevantIndex = $FeedbackStore.findIndex(personObject => personObject === person)
// $: person = data.find(person => person.name === name) // Remember, you can use multiple fields for this
// $: relevantIndex = data.findIndex(name => name === person)


// Functions being called here can actually be stored within the custom stores
let handleSubmit = () => {
    // If relevantIndex (.findIndex) returns -1; create new entry
    if (($FeedbackStore.findIndex(name => name === person)) === -1) {
        const newTransaction = {
            id: 3,
            name: name,
            balance: cost
        }
        FeedbackStore.update((currentStore) => {
            return [...currentStore, newTransaction]
        })
    // Else, modify currentStore[relevantIndex]
    } else {
        FeedbackStore.update((currentStore) => {
            currentStore[relevantIndex].balance += +cost
            return [...currentStore]
        })
    }
}

</script>

<Card>
    <header>
        <h2>Record your transaction</h2>
    </header>

    <form on:submit|preventDefault={handleSubmit}>
        <p>{$FeedbackStore.find(person => person.name === name)}</p>
        <p>{$FeedbackStore.findIndex(personObject => personObject === person)}</p>
        <div class="input-group">
            <input type="text" placeholder="Describe the transaction" bind:value = {description}>
        </div>
        <div class="input-group">
            <input type="text" placeholder="Who were the people involved?" bind:value = {name}> <!--- Which parties are involved? TBH needs to be a checkbox that is pre-filtered based on the group -->
        </div>
        <div class="input-group">
            <input type="number" placeholder="Cost of transaction" bind:value = {cost}> <!--- How do I get rid of down/up arrows in input? --->
        </div>
        <div class="input-group">
            <input type="checkbox" placeholder="Choose how the transaction was split"> <!-- TODO: Figure out how to split transactions-->
        </div>
        <button type="submit">Send</button> <!-- I want to put this in the same field -->
    </form>    
</Card>

<style>
</style>