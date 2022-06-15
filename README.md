# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm init svelte

# create a new project in my-app
npm init svelte my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## Data Structure

(1) User would first input a transaction, with cost, descrption, involved parties and nature of split
(2) This transaction would then go into a store with the following properties: (1) transactionID, (2) cost of transaction, (3) description of transaction, (4) split-type, (5) people involved
(3) A separate derived store would track individuals and their respective balances
(3.1) Naturally, this derived store would be: 
(uniqueID), 
(name), 
D(balance) - starts at 0 and increases or decreases based on (2)

NOTE: App would definitely have a huge flaw with respect to relationship drawing // security - a single bad actor could mess up the entire database; but will leave this as proof of concept for the time being, otherwise this project would probably be too time consuming.

Granted, this could be worked around by simple 2-way handshakes? etc. you cannot set up transactions for me if I haven't accepted your relational request
This would however, require authentification of the individuals and recording said relationships.