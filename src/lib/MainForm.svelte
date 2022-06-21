<script>
import Card from "./Card.svelte";
import Individual from "./Individual.svelte";
import { transactionStore } from "../transactionStore";
import { userStore } from "../userStore"

let description = "Petrol"
let cost = 300
let partiesInvolved = "Esther, Daniel, Miguel"
let paymentSplit = "30-40-30"
let payor = 'Esther'

$: relevantParties = partiesInvolved.split(", ")
$: relevantSplit = paymentSplit.split("-")

let handleSubmit = () => {
    // Backend Stuff

    // Create the transaction
    const newTransaction = {
        transactionID: 4,
        description: description,
        cost: cost,
        splitType: paymentSplit,
        whoPaid: payor,
        partiesInvolved: partiesInvolved
    }

    // Update the TransactionStore
    transactionStore.update((currentStore) => {
        return [...currentStore, newTransaction]
    })

    // Update relevant balances
    let index = 1 // assume 0 is always the payor's proportion

    // (2) Convert parties involved into separate list elements
    for (let i=0; i < relevantParties.length; i++) {
        let personObject = $userStore.find(person => person.name === relevantParties[i])
        let relevantIndex = $userStore.findIndex(name => name === personObject)

        if (personObject.name === payor) {
          userStore.update((currentStore) => {
              let payorUpdate = (1 - relevantSplit[0]/100) * cost
              currentStore[relevantIndex].balance += payorUpdate
              currentStore[relevantIndex].relatedTransactions.push(newTransaction.transactionID)
              return [...currentStore]
          })  
        } 
        else {
            userStore.update((currentStore) => {
                let balanceUpdate = relevantSplit[index]/100 * cost
                currentStore[relevantIndex].balance -= balanceUpdate
                currentStore[relevantIndex].relatedTransactions.push(newTransaction.transactionID)
                index++

                return [...currentStore]
            })
        }
    }
    
}

</script>

<Card>
    <header>
        <h2>Record your transaction</h2>
    </header>

    <form class='form' on:submit|preventDefault={handleSubmit}>
        <!-- <p>{$TransactionStore.find(person => person.name === name)}</p>
        <p>{$TransactionStore.findIndex(personObject => personObject === person)}</p> -->
        <!-- {#each relevantSplit as individual}
            <p>{individual}</p> -->
        <!-- {/each} -->
        <div class="input-group">
            <input type="text" placeholder="Describe the transaction" bind:value = {description}>
        </div>
        <div class="input-group">
            <input type="number" placeholder="Cost of transaction" bind:value = {cost}> <!--- How do I get rid of down/up arrows in input? --->
        </div>
        <div class="input-group">
            <input type="text" placeholder="Who were the people involved?" bind:value = {partiesInvolved}> <!--- Which parties are involved? TBH needs to be a checkbox that is pre-filtered based on the group -->
        </div>
        <div class="input-group">
            <input type="text" placeholder="Who paid?" bind:value = {payor}> <!--- Which parties are involved? TBH needs to be a checkbox that is pre-filtered based on the group -->
        </div>
        <div class="input-group">
            <input type="text" placeholder="Choose how the transaction was split" bind:value = {paymentSplit}>
        </div>
        <button type="submit">Send</button> <!-- I want to put this in the same field -->
        <p>---------------------------------------------</p>
    </form>

    {#each $userStore as user}
        <Individual data={user}/>
    {/each}
</Card>

<style>
</style>