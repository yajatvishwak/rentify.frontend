<script>
  import Card from "./components/Card.svelte";
  import Tobar from "./components/Tobar.svelte";
  import Axios from "axios";
  import { push } from "svelte-spa-router";
  let services = [];
  Axios.post("http://localhost:3000/item/getall").then((res) => {
    services = res.data;
  });
</script>

<div class="container">
  <Tobar />
  <div class="title">All Services⚙️</div>
  <div on:click={() => push("/insertItem")} class="add">Add your Service</div>
  <div class="categoryContainer">
    {#each services as c}
      <Card title={c.name} id={c.itemID} owner={c.owner} />
    {/each}
  </div>
</div>

<style lang="scss">
  .container {
    margin: 1rem;
    .title {
      font-size: 2rem;
      font-weight: bold;
      text-align: center;
    }
  }
  .add {
    padding: 1rem;
    background-color: #1c2b2d;
    color: white;
    margin: 1rem;
    text-align: center;
    border-radius: 1rem;
  }

  .categoryContainer {
    margin: 1rem;
  }
</style>
