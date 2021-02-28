<script>
  import { push } from "svelte-spa-router";
  import { store } from "../store";

  let username = "";
  let password = "";
  let name = "";
  let email = "";
  let phone = "";
  store.subscribe((val) => {
    const obj = JSON.parse(val);
    if (obj.username !== null) {
      push("/");
    }
  });
  function onSubmit(event) {
    event.preventDefault();
    fetch(`http://localhost:3000/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        username,
        email,
        password,
        phone,
      }),
    })
      .then((response) => response.json())
      .then((auth) => {
        if (auth.auth === true) {
          store.set(JSON.stringify({ username: username }));
          push("/");
        }
      });
  }
</script>

<div class="container">
  <form class="form" on:submit={onSubmit}>
    <div class="text">
      <div class="greet">Good Afternoon,</div>
      <div class="subgreet">Let's log you in</div>
    </div>
    <input bind:value={name} type="text" placeholder="name" />
    <input bind:value={email} type="text" placeholder="email" />
    <input bind:value={phone} type="text" placeholder="phone" />
    <input bind:value={username} type="text" placeholder="username" />
    <input bind:value={password} placeholder="password" type="password" />

    <input type="submit" class="submit" />
  </form>
  <div on:click={() => push("/login")} class="signup">
    Have I seen you around? Login?
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    background-color: #1c2b2d;
  }
  .signup {
    color: white;
    margin: 1rem;
  }
  .text {
    margin: 1rem;
    .greet {
      font-weight: bold;
      font-size: 2rem;
    }
    .subgreet {
      font-size: 1.5rem;
    }
  }
  .form {
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: column;
    background-color: white;
    padding: 3rem;
    border-radius: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
  input {
    padding: 1em;
    margin: 0.5rem;
    border-radius: 0.4em;
    outline: 0;
    width: 30rem;
    border: none;
    background-color: #f1f1f1;
  }
  @media only screen and (min-device-width: 375px) and (max-device-width: 812px) and (-webkit-min-device-pixel-ratio: 3) and (orientation: portrait) {
    input {
      width: auto;
    }
  }
  .submit {
    background-color: #1c2b2d;
    color: white;
    font-weight: bold;
    margin-top: 1rem;
    transition: all 0.5s;
  }
  .submit:hover {
    background-color: #1f6f8b;
    color: #f1f1f1;
  }
</style>
