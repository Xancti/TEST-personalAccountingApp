<div class="card">
    <slot>
    </slot>
</div>

<style>
    .card {
        background-color: #04232b;
        width: 89%;
        height: auto;
        color: #D6E4F5;
        border-radius: 15px;
        padding: 8px 50px 1.5em 50px;
        margin: 20px auto 20px 0px;
        position: relative;
    }

    @media only screen and (min-width: 1100px) {
  .card {
    width: 76%;
    margin: 20px auto 20px 10px;
  }
        }

</style>