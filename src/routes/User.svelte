<script>
  import RentCard from "./components/RentCard.svelte";
  import Axios from "axios";
  import Tobar from "./components/Tobar.svelte";
  import { store } from "../store";
  import { push } from "svelte-spa-router";

  let username = "";
  let rentedItems = [];
  let listedItems = [];
  let user = {};
  store.subscribe((val) => {
    username = JSON.parse(val).username;
  });

  fetch(`http://localhost:3000/user/getUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      user = data.user;
      rentedItems = data.rentedItems;
      listedItems = data.listedItems;
    });

  const getStatus = (id) => {
    return new Promise((resolve, reject) => {
      fetch(`http://localhost:3000/item/getStatus`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          itemID: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
        });
    });
  };
</script>

<div class="container">
  <Tobar />
  <div class="title">DashBoard</div>
  <div class="userProfile">
    <img src="https://via.placeholder.com/200" alt="" class="profileimg" />
    <div class="name">{user.name} aka {user.username}</div>
    <div class="phone">+91 {user.phone}</div>
    <div class="phone">{user.email}</div>
  </div>
  <div class="sectionTitle">Actions</div>
  <div class="sectioncontainer">
    <div
      on:click={() => push("/notification")}
      class="button notificationButton"
    >
      Check Notification
    </div>
    <div on:click={() => push("/chatroom")} class=" button chatRoomButton">
      Your previous chats
    </div>
  </div>
  <div class="sectionTitle">Your items on rent</div>
  <div class="sectioncontainer">
    {#each rentedItems as item}
      {#await getStatus(item.itemID)}
        <RentCard
          title={item.name}
          description={item.description}
          owner={item.owner}
          status={"Listed on Rentify"}
        />
      {:then status}
        <RentCard
          title={item.name}
          description={item.description}
          owner={item.owner}
          status={status.status}
        />
      {/await}
    {/each}
  </div>

  <div class="sectionTitle">Your Listed items</div>
  <div class="sectioncontainer">
    {#each listedItems as item}
      {#await getStatus(item.itemID)}
        <RentCard
          title={item.name}
          description={item.description}
          owner={item.owner}
          status={"waiting"}
        />
      {:then status}
        <RentCard
          title={item.name}
          description={item.description}
          owner={item.owner}
          status={status.status}
        />
      {/await}
    {/each}
  </div>
</div>

<style>
  .container {
    margin: 1rem;
  }
  .title {
    font-size: 1.7rem;
    font-weight: bold;
  }
  .sectionTitle {
    font-size: 1.7rem;
    font-weight: bold;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .button {
    padding: 1rem;
    margin: 0.5rem;
    border-radius: 1rem;
  }
  .notificationButton {
    background-color: #1f6f8b;
    color: white;
  }
  .chatRoomButton {
    background-color: #e6d5b8;
  }
  .userProfile {
    background-color: #f1f1f1;
    padding: 1.7rem;
    border-radius: 1rem;
    text-align: center;
  }
</style>
