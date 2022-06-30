<script>
    import MainForm from "$lib/MainForm.svelte";
    import SubForm from "../lib/SubForm.svelte";

</script>

<div class="container">
    <div class="sub-left">
        <SubForm />
    </div>
    <div class="sub-right">
        <MainForm />
    </div>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 5%;
    }

    .sub-left {
        align-self: flex-start;
        position: sticky;
        top: 0px;
    }

    @media only screen and (max-width: 1100px) {
  .sub-left {
    display: none;
  }

  .container {
    padding-left: 0px;
  }
        }

</style>