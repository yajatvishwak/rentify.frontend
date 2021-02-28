<script>
  import { push } from "svelte-spa-router";

  export let title = "";
  export let owner = "";
  export let id = "";
  export let image = "https://via.placeholder.com/200";
</script>

<div class="container">
  <img class="image" src={image} alt="" />
  <div class="title">{title}</div>
  <div class="owner">sold by <span>{owner}</span></div>
  <div on:click={() => push(`/service/detail/${id}`)} class="button">
    Tell me more
  </div>
</div>

<style lang="scss">
  .container {
    padding: 1rem;
    margin: 1rem;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
  }
  .image {
    margin-top: 1rem;
    border-radius: 1rem;
  }
  .title {
    margin: 0.5rem;
    margin-top: 1rem;
    font-weight: bold;
    text-align: center;
    font-size: 1.3rem;
  }
  .owner {
    span {
      font-weight: 900;
    }
  }
  .button {
    background-color: #1f6f8b;
    color: white;
    padding: 1rem;
    text-align: center;
    border-radius: 0.5rem;
    align-self: stretch;
    margin: 1rem;
  }
</style>
