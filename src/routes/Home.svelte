<script>
  import { push } from "svelte-spa-router";
  import { store } from "../store";
  import Tobar from "./components/Tobar.svelte";
  let username = "";
  store.subscribe((val) => {
    const obj = JSON.parse(val);
    username = obj.username;
    if (obj.username === null) {
      push("/login");
    }
  });
</script>

<div class="container">
  <Tobar />
  <div class="greet">Hello <span>{username}</span>,</div>
  <div class="subgreet">What are we renting today?</div>
  <div class="buttonGroup">
    <div
      on:click={() => {
        push("/service/all");
      }}
      class="button services"
    >
      Services
    </div>
    <div class="button assets">Assets</div>
  </div>
  <div class="aboutRentify">
    <img class="image" src="./img/img1.png" alt="" />
  </div>
</div>

<style lang="scss">
  .container {
    margin: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }
  .image {
    margin: 1rem;
    width: 300px;
    height: 300px;
  }
  .greet {
    font-size: 1.7rem;
    span {
      font-weight: bold;
    }
  }
  .buttonGroup {
    .button {
      padding: 1rem;
      outline: none;
      border: none;
      margin: 1rem;
      border-radius: 0.5rem;
      font-weight: bold;
    }
    .services {
      color: white;
      background-color: #1f6f8b;
    }
    .assets {
      color: black;
      background-color: #e6d5b8;
    }
  }
</style>
