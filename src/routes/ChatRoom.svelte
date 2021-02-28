<script>
  import Tobar from "./components/Tobar.svelte";
  import Axios from "axios";
  import { store } from "../store";
  let username = "";
  store.subscribe((val) => {
    username = JSON.parse(val).username;
  });

  import { push } from "svelte-spa-router";
  let part = [{}];
  Axios.post("http://localhost:3000/user/getChatRoom", {
    username: username,
  }).then((res) => {
    part = res.data;
    console.log(res.data);
    part = res.data.map((item) => {
      const participant1 = item.participants[0];
      const participant2 = item.participants[1];
      const actualParticipant =
        participant1 === username ? participant2 : participant1;
      return { actualPart: actualParticipant, roomID: item.roomID };
    });
    console.log(part);
  });
</script>

<div class="container">
  <Tobar />
  <div class="title">Chat with other users</div>

  <div class="listContainer">
    {#each part as p}
      <div on:click={() => push("/chatroom/" + p.roomID)} class="chatGroup">
        <div class="title">{p.actualPart}</div>
        <img class="profileimg" src="https://via.placeholder.com/120" />
      </div>
    {/each}
  </div>
</div>

<style>
  .container {
    margin: 1rem;
  }
  .listContainer {
    margin-top: 2rem;
  }
  .chatGroup {
    padding: 1rem;
    margin: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 1rem;
  }
  .profileimg {
    max-width: 50px;
    max-height: 50px;

    border-radius: 50rem;
  }
</style>
