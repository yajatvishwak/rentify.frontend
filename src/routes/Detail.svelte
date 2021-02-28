<script>
  import Tobar from "./components/Tobar.svelte";
  import Axios from "axios";
  import { location, push } from "svelte-spa-router";
  import { store } from "../store";
  let username = "";
  store.subscribe((val) => {
    username = JSON.parse(val).username;
  });
  let type = "";
  let owner = "";
  let price = "";
  let period = "";
  let description = "";
  let id = $location.substr($location.lastIndexOf("/") + 1);
  fetch(`http://localhost:3000/item/getItem`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itemID: id,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      type = data.type;
      owner = data.owner;
      price = data.price;
      description = data.description;
      period = data.interval;
    });
  function onClickRent() {
    Axios.post("http://localhost:3000/item/sendNotification", {
      to: owner,
      from: username,
      itemID: id,
    }).then((res) => {
      if (res.data)
        alert(
          "Notification made. Please wait till the owner accepts your request"
        );
    });
  }
  function onChat() {
    Axios.post("http://localhost:3000/user/generateNewChat", {
      user1: username,
      user2: owner,
    }).then((res) => {
      push("/chatroom/" + res.data.roomID);
    });
  }
</script>

<div class="container">
  <Tobar />
  <img class="image" src="https://via.placeholder.com/200" alt="" />
  <div class="title">Title of product or service</div>

  <div>This is a {type} offered by {owner}</div>
  <div class="description">
    {description}
  </div>
  <div class="priceRates">
    <span>{price} ₹</span> for every {period}
  </div>
  <div class="buttongroup">
    <div on:click={onChat} class="button chatwithowner">Chat with owner</div>
    <div on:click={onClickRent} class="button rentthis">Rent this</div>
  </div>
</div>

<style lang="scss">
  .container {
    margin: 1rem;
    text-align: center;
  }
  .button {
    padding: 1rem;
    margin: 1rem;
    color: white;
    border-radius: 0.5rem;
  }
  .chatwithowner {
    background-color: #1c2b2d;
  }
  .rentthis {
    background-color: #1f6f8b;
  }
  .image {
    border-radius: 1rem;
    margin: 1rem;
  }
  .description {
    text-align: left;
    margin: 1rem;
  }
  .priceRates {
    text-align: left;
    margin: 1rem;
  }
</style>
