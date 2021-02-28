<script>
  import Tobar from "./components/Tobar.svelte";
  import Axios from "axios";
  let part;
  Axios.post("http://localhost:5000/user/getchatroom").then((res) => {
    part = res.data;
  });
</script>

<div class="container">
  <Tobar />
  <div class="title">Chat with other users</div>
  <div class="listContainer">
    <div class="chatGroup">
      <div class="title">Ayush</div>
      <img class="profileimg" src="https://via.placeholder.com/120" />
    </div>
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
