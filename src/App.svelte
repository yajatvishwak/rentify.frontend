<script>
  import Router from "svelte-spa-router";
  import routes from "./routes";
</script>

<body>
  <Router {routes} />
</body>

<style type="scss">
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:wght@100&display=swap");
  @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,700;0,900;1,900&display=swap");
  :global(body) {
    margin: 0;
    padding: 0;
    font-family: "Noto Sans", sans-serif;
  }
</style>
