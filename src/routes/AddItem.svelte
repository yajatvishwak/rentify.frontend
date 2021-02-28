<script>
  import Tobar from "./components/Tobar.svelte";
  import Axios from "axios";
  import { store } from "../store";
  let username = "";
  store.subscribe((val) => {
    const obj = JSON.parse(val);
    username = obj.username;
  });
  let type;
  let name;
  let price;
  let interval;
  let description;
  let category;

  const onSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/item/insertItem", {
      type,
      name,
      price,
      interval,
      description,
      category,
      owner: username,
    }).then((res) => {
      console.log(res.data);
      if (res.data.added === true) {
        alert("Inserted Successfully");
      } else {
        alert("Something went wrong");
      }
    });
  };
</script>

<div class="container">
  <Tobar />
  <form on:submit={onSubmit} encType="multipart/form-data">
    <div class="title">List your services or assets</div>
    <label for="type">What are you renting?</label>
    <select bind:value={type} default="service" id="type">
      <option value="service">Services</option>
      <option value="asset">Assets</option>
    </select>

    <input
      bind:value={name}
      type="text"
      placeholder="Name of product/service"
    />
    <textarea
      placeholder="Description"
      bind:value={description}
      cols="30"
      rows="10"
    />

    <label for="type"
      >What is the rate at which you are renting the product?</label
    >
    <input
      bind:value={price}
      type="text"
      placeholder="Price you want to charge"
    />
    <label for="interval">Choose an interval the user has to pay:</label>
    <select bind:value={interval} id="interval">
      <option value="week">Weekly</option>
      <option value="day">Daily</option>
      <option value="month">Monthly</option>
    </select>
    <label for="category"
      >Which category does your product/service belong to?</label
    >

    {#if type === "service"}
      <select bind:value={category} id="category">
        <option value="Coding">Coding</option>
        <option value="Painting">Painting</option>
        <option value="Scripting">Scripting</option>
        <option value="Other">Other</option>
      </select>
    {/if}
    {#if type === "asset"}
      <select bind:value={category} id="category">
        <option value="Books">Books</option>
        <option value="Electronics">Electronics</option>
        <option value="Gym">Gym</option>
        <option value="Others">Others</option>
      </select>
    {/if}

    <input type="submit" />
  </form>
</div>

<style>
  .container {
    margin: 1rem;
  }
  .title {
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    font-weight: bold;
  }
  label {
    font-size: 1.3rem;
    font-weight: 300;
  }
</style>
