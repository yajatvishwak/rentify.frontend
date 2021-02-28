<script>
  import Card from "./Card.svelte";
  export let title = "";
  export let arr;
  console.log(arr);
</script>

<div>
  <div class="sectionTitle">{title}</div>
  {#each arr as ele}
    <Card
      image={ele.image}
      id={ele.itemID}
      owner={ele.owner}
      title={ele.name}
    />
  {/each}
</div>

<style>
  .sectionTitle {
    font-size: 1.6rem;
    font-weight: bold;
  }
</style>
