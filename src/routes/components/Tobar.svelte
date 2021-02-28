<script>
  import { push } from "svelte-spa-router";
  import { store } from "../../store";
  let username = "";
  store.subscribe((val) => {
    const obj = JSON.parse(val);
    username = obj.username;
  });
</script>

<div class="topbar">
  <div class="logo"><i>Rentify</i><span>🤙</span></div>
  <div
    on:click={() => {
      push("/user");
    }}
    class="user"
  >
    {username}
  </div>
</div>

<style>
  .topbar {
    margin-bottom: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .logo {
    font-size: 1.8rem;
    font-family: "Poppins", sans-serif;
    font-weight: 700;
  }
  .user {
    padding: 1rem;
    background-color: antiquewhite;
    border-radius: 1rem;
  }
</style>
