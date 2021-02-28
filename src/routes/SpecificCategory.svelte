<script>
  import { location } from "svelte-spa-router";
  import Card from "./components/Card.svelte";
  import Tobar from "./components/Tobar.svelte";
  import { getFancyString } from "./lib/getCleanURL";
  let category = $location.substr($location.lastIndexOf("/") + 1);
</script>

<div class="main">
  <Tobar />
  <div class="container">
    <div class="title">
      {getFancyString(category)}
    </div>
    <div class="cardContainer">
      <Card />
    </div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    margin: 1rem;
    justify-content: center;
    align-items: center;
  }
  .title {
    font-size: 1.6rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  .main {
    margin: 1rem;
    display: flex;
    flex-direction: column;
  }
</style>
