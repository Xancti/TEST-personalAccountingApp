<script>
import {v4 as uuidv4} from 'uuid'
import Card from "./Card.svelte";
import Individual from "./Individual.svelte";
import { transactionStore } from "../transactionStore";
import { userStore } from "../userStore"

let description
let cost
let partiesInvolved = ''
let payor
let paymentSplit = ''

$: relevantParties = partiesInvolved.split(", ")
$: relevantSplit = paymentSplit.split("-")

let costBreakdown = {}
let debtBreakdown = ''

costBreakdown //

let handleSubmit = () => {
    // Backend Stuff
    relevantParties.forEach((element, index) => {
        if (element === payor) {
            costBreakdown[element] = [(cost - relevantSplit[index] * 0.01 * cost), 'Paid']
        } else {
            costBreakdown[element] = [(relevantSplit[index] * 0.01 * -cost), 'Unpaid']
            debtBreakdown += `${element} (${relevantSplit[index] * 0.01 * cost}) `
        }
    })

    // Create the transaction
    const newTransaction = {
        transactionID: uuidv4(),
        description: description,
        cost: cost,
        splitType: paymentSplit,
        whoPaid: payor,
        partiesInvolved: partiesInvolved,
        costBreakdown: costBreakdown,
        debtBreakdownAsString: debtBreakdown,
        relatedTransaction: ''
    }

    // Update the TransactionStore
    transactionStore.update((currentStore) => {
        return [...currentStore, newTransaction]
    })

    costBreakdown = {} // Very important to reset fields

    // Update relevant balances
    // Get payor's index from array
    const findPayor = (person) => person === payor;
    let payorIndex = relevantParties.findIndex(findPayor)
    
    // (2) Convert parties involved into separate list elements
    for (let i=0; i < relevantParties.length; i++) {
        let personObject = $userStore.find(person => person.name === relevantParties[i])
        let relevantIndex = $userStore.findIndex(name => name === personObject)

        if (i != payorIndex) {
            userStore.update((currentStore) => {
                let balanceUpdate = relevantSplit[i]/100 * cost
                currentStore[relevantIndex].balance -= balanceUpdate
                currentStore[relevantIndex].relatedTransactions.push(newTransaction.transactionID)

                return [...currentStore]
        })} 
        else {
            userStore.update((currentStore) => {
              let payorUpdate = (1 - relevantSplit[i]/100) * cost
              currentStore[relevantIndex].balance += payorUpdate
              currentStore[relevantIndex].relatedTransactions.push(newTransaction.transactionID)
              return [...currentStore]
          })
        }
    }
    
    // Reset all textfields

    description = ''
    cost = ''
    partiesInvolved = ''
    payor = ''
    paymentSplit = ''

}

</script>

<Card>
    <div class='form-div'>
        <header>
            <h2>Record your transaction</h2>
        </header>
    
        <form class='form' on:submit|preventDefault={handleSubmit}>
            <div class="input-group">
                <input type="text" bind:value = {description} required="required">
                <span>Description</span>
            </div>
            <div class="input-group">
                <input type="number" bind:value = {cost} required="required"> <!--- How do I get rid of down/up arrows in input? --->
                <span>Cost</span>
            </div>
            <div class="input-group">
                <input type="text" bind:value = {partiesInvolved} required="required">
                <span>People Involved</span>
            </div>
            <div class="input-group">
                <input type="text" bind:value = {payor} required="required">
                <span>Who Paid</span>
            </div>
            <div class="input-group">
                <input type="text" bind:value = {paymentSplit} required="required">
                <button class='send' type="submit"></button> <!-- I want to put this in the same field -->
                <span>Transaction Split</span>
            </div>
        </form>
    </div>

    {#each $userStore as user}
        <Individual data={user}/>
    {/each}
</Card>

<style>
       h2 {
        color: #67C59D
    }

    *{
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
    }

    .input-group {
        position: relative;
        width: 250px;
        padding-top: 10px;
    }

    .input-group input {
        width: 100%;
        padding: 10px;
        border: 1px solid rgba(255,255,255,0.25);
        background: #04232b;
        border-radius: 5px;
        outline: none;
        color: #fff;
        font-size: 1em;
    }

    .input-group span {
        position: absolute;
        left: 0;
        padding: 10px;
        pointer-events: none;
        font-size: 1em;
        color: rgba(255, 255, 255, 0.25);
        text-transform: uppercase;
        transition: 0.5s;
    }

    .input-group input:valid ~ span,
    .input-group input:focus ~ span {
        color: #67C59D;
        transform: translateX(10px) translateY(-7px);
        font-size: 0.8em;
        padding: 0 10px;
        background: #04232b;
        border-left: 1px solid #67C59D;
        border-right: 1px solid #67C59D;
    }

    /* .input-group:nth-child(2) input:valid ~ span,
    .input-group:nth-child(2) input:focus ~ span
    {
        background: #67C59D;
        color: #1d2b3a;
        border-radius: 2px;
    } */

    .input-group input:valid,
    .input-group input:focus {
        border: 1px solid #67C59D;
    }

    .send {
        height: 40px;
        width: 100px;
        position: absolute;
        left: 215px;
        top: 18px;
        background-image: url($lib/icons/send.svg);
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        background-size: 24px;
        opacity: 0.5;
    }

    .send:hover,
    .send:focus {
    transition: opacity 0.2s;
    opacity: 1;
  }

  input[type=number]::-webkit-inner-spin-button, 
  input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; 
  }

        @media only screen and (min-width: 1100px) {
  .form-div {
    display: none;
  }
        }
</style>