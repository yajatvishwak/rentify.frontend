<script>
  import Tobar from "./components/Tobar.svelte";
  import { location } from "svelte-spa-router";
  import io from "socket.io-client";
  import { store } from "../store";
  let username = "";
  store.subscribe((val) => {
    username = JSON.parse(val).username;
  });
  const socket = io("http://localhost:3000");
  let roomid = $location.substr($location.lastIndexOf("/") + 1);
  let messages = [];

  socket.emit("joinRoom", roomid);
  socket.on("connect", () => console.log("connected"));
  socket.on("message", (m) => {
    console.log(m);
    messages = m;
  });
  let message = "";

  //emit function
  // listen function
  function sendMessage() {
    socket.emit("message", { roomID: roomid, m: message, sender: username });
  }

  function handleKeydown(event) {
    let key = event.key;
    if (key === "Enter") {
      console.log("Enter pressed", message);
      sendMessage();
      message = "";
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<div class="container">
  <Tobar />
  <div class="title">You are now chatting with Ayush</div>
  <div class="chatContainer">
    {#each messages as message}
      {#if message.sender === username}
        <div class="chatPill left">
          <div class="text">{message.message}</div>
        </div>
      {:else}
        <div class="chatPill">
          <div class="text">{message.message}</div>
        </div>
      {/if}
    {/each}
  </div>

  <input bind:value={message} class="message" type="text" />
</div>

<style>
  .container {
    margin: 1rem;
    display: flex;
    height: 100vh;
    flex-direction: column;
    justify-content: center;
    align-content: center;
  }
  .message {
    padding: 1rem;
    margin: 1rem;
    border-radius: 0.4rem;
  }
  .chatContainer {
    margin: 1rem;
    padding: 0.5rem;
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    height: 70vh;
    overflow: scroll;
    border-radius: 1rem;
  }
  .chatPill {
    padding: 1rem;
    background-color: #1f6f8b;
    width: fit-content;
    color: white;
    border-radius: 1rem;
    margin: 0.3rem;
  }
  .left {
    align-self: flex-end;
  }
</style>
