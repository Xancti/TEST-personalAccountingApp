<script>
    export let transactionData
    export let personName

    import { transactionStore } from "../transactionStore"
    import { userStore } from "../userStore"
    import { v4 as uuidv4 } from 'uuid'

    const handleRepayment = (txID, person) => {
        // Original Transaction Object
        let originalTransaction = $transactionStore.find(txObj => txObj.transactionID === txID)
        console.log('Stage1')
        
        // Transaction Details
        let description = `Repayment: ${originalTransaction.description}`
        let cost = -originalTransaction.costBreakdown[person][0]
        let paymentSplit = '100-0'
        let payor = person
        let partiesInvolved = `${person}, ${originalTransaction.whoPaid}`
        let costBreakdown = {[person]: [cost, 'Paid'], [originalTransaction.whoPaid]: [-cost, 'Paid']}
        let debtBreakdown = `Repayment by ${person} to ${originalTransaction.whoPaid}`
        console.log('Stage2')

        // Create new transaction; update transactionStore (Utilize name prop)
        const newTransaction = {
            transactionID: uuidv4(),
            description: description,
            cost: cost,
            splitType: paymentSplit,
            whoPaid: payor,
            partiesInvolved: partiesInvolved,
            costBreakdown: costBreakdown,
            debtBreakdownAsString: debtBreakdown,
            relatedTransaction: txID
    }
        console.log('Stage3')
    
    // TBH, all this could be refactored
    transactionStore.update((currentTransactions) => {
        originalTransaction.costBreakdown[person][1] = 'Paid'
        return [...currentTransactions, newTransaction]
    })
    console.log('Stage4')
    
    
    // Update relevant balances and relatedTransactions in userStore
        userStore.update((currentUsers) => {
            $userStore.find(userObj => userObj.name === person).balance += cost
            $userStore.find(userObj => userObj.name === person).relatedTransactions.push(newTransaction.transactionID)

            $userStore.find(userObj => userObj.name === originalTransaction.whoPaid).balance -= cost
            $userStore.find(userObj => userObj.name === originalTransaction.whoPaid).relatedTransactions.push(newTransaction.transactionID)
            return [...currentUsers]
        })
}

    const handleDelete = (txID, person) => {
        // Storing costBreakdown object
        let tempStore = $transactionStore.find(txObj => txObj.transactionID === txID).costBreakdown
        let priorTransaction = $transactionStore.find(userObj => userObj.transactionID === txID).relatedTransaction

        // Logic: Reversing balances before deleting transaction
        for (const person in tempStore) {
            userStore.update((currentUsers) => {
                $userStore.find(userObj => userObj.name === person).balance -= tempStore[person][0]
                $userStore.find(userObj => userObj.name === person).relatedTransactions.filter(transactions => transactions != txID)
                return [...currentUsers]
            })
        }

        // Logic: Deleting transaction
        transactionStore.update((currentTransactions) => {
            // Find the original transaction payment status and reverse it to 'Unpaid'
            if (priorTransaction != '') {
                $transactionStore.find(userObj => userObj.transactionID === priorTransaction).costBreakdown[person][1] = 'Unpaid'
                return currentTransactions.filter(transaction => transaction.transactionID != txID)
            } else {
                return currentTransactions.filter(transaction => transaction.transactionID != txID)
            }
        })
    }

</script>

<div class="transaction">
    {#if ($transactionStore.find(txObj => txObj.transactionID === transactionData)) != undefined }
        <p class="description">{$transactionStore.find(txObj => txObj.transactionID === transactionData).description}</p>
        <p class="payor">{$transactionStore.find(txObj => txObj.transactionID === transactionData).whoPaid}</p>
        <p class="debts">{$transactionStore.find(txObj => txObj.transactionID === transactionData).debtBreakdownAsString}</p>
        <p class="cost">{$transactionStore.find(txObj => txObj.transactionID === transactionData).costBreakdown[personName][0]}</p>
        <button class="delete" on:click={() => handleDelete(transactionData, personName)}></button>
        {#if ($transactionStore.find(txObj => txObj.transactionID === transactionData).whoPaid != personName) && ($transactionStore.find(txObj => txObj.transactionID === transactionData).costBreakdown[personName][1] === 'Unpaid')}
        <button class="pay" on:click={() => handleRepayment(transactionData, personName)}></button>
        {:else if ($transactionStore.find(txObj => txObj.transactionID === transactionData).whoPaid != personName) && ($transactionStore.find(txObj => txObj.transactionID === transactionData).costBreakdown[personName][1] === 'Paid')}
        <button class="paid" on:click={() => handleRepayment(transactionData, personName)}></button>
        {/if}
    {/if}
</div>

<style>
    .transaction {
        position: relative;
        display: grid;
        grid-template-columns: 2.5fr 3fr 3fr 1fr 0.5fr 0.5fr;
        padding: 0 -1em 0 2em;
        margin: 0px 0 0px -2em;
    }

    .cost {
        text-align: right;
        padding-right: 1em;
        border-left: solid 1px #67C59D;
    }
    
    .payor {
        text-align: left;
        padding-left: 10px;
        border-left: solid 1px #67C59D
    }
  
    .debts {
        max-width: 15ch;
        text-align: left;
        padding-left: 0.6rem;
        border-left: solid 1px #67C59D
    }
  
    .pay {
        position: relative;
        top: 0.8rem;
        background-image: url($lib/icons/dollar-sign.svg);
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        background-size: 60%;
        opacity: 0.396;
    }

    .pay:hover,
    .pay:focus {
    transition: opacity 0.2s;
    opacity: 1;
  }

  .paid {
        position: relative;
        top: 0.8rem;
        background-image: url($lib/icons/check-square.svg);
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        background-size: 60%;
        opacity: 1;
    }

    .delete {
        position: relative;
        top: 0.8rem;
        left: 0.5rem;
        background-image: url($lib/icons/trash-2.svg);
        background-repeat: no-repeat;
        background-color: transparent;
        border: none;
        background-size: 55%;
        opacity: 0.396;
    }

    .delete:hover,
    .delete:focus {
    transition: opacity 0.2s;
    opacity: 1;
  }

</style>

