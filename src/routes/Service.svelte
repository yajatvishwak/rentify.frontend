<script>
  import Section from "./components/Section.svelte";
  import { push } from "svelte-spa-router";
  import Tobar from "./components/Tobar.svelte";
  import { onMount } from "svelte";
  let itemsarr = [];
  onMount(async () => {
    let items = await fetch(`http://localhost:3000/item/home`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: "service",
      }),
    });
    let jsonitem = await items.json();
    itemsarr = jsonitem;
  });
  const getCorrectCat = (itemarr, cat) => {
    return itemarr.filter((item) => {
      if (cat === item.category) return item;
    });
  };
</script>

<div class="containerMax">
  <div class="container">
    <Tobar />
    <div class="greet">Services Listed on Rentify</div>
    <div class="subgreet">Get your job done quickly</div>

    <div class="serviceContainer">
      {#each itemsarr as ele}
        <Section
          arr={getCorrectCat(itemsarr, ele.category)}
          title={ele.category}
        />
      {/each}
    </div>
  </div>
  <div on:click={() => push("/service/all")} class="allCategory">
    Not what you were looking for? See everything we got.
  </div>
</div>

<style lang="scss">
  .container {
    margin: 1rem;
  }
  .add {
    padding: 1rem;
    background-color: #1c2b2d;
    color: white;
    margin: 1rem;
    text-align: center;
    border-radius: 1rem;
  }
  .serviceContainer {
    margin-top: 2rem;
  }
  .allCategory {
    background-color: #1c2b2d;
    color: white;
    padding: 2rem;
    text-align: center;
  }
  .greet {
    font-size: 1.6rem;
    font-weight: bold;
  }
</style>
