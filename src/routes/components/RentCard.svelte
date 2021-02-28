<script>
  export let title;
  export let description;
  export let owner;
  export let status;
</script>

<div class="maxmax">
  <div class="cardMax">
    <div class="card">
      <img class="image" src="https://via.placeholder.com/100/300" alt="" />
      <div>
        <div class="title">{title}</div>
        <div class="subtitle">{owner}</div>
        <div class="smallDescription">
          {description}
        </div>
      </div>
    </div>
  </div>
  <div class="status">{status}</div>
</div>

<style>
  .maxmax {
    margin: 1rem;
  }
  .cardMax {
    display: flex;
    flex-direction: column;
    background-color: #f1f1f1;
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }
  .card {
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
  }
  .image {
    max-width: 100px;
    max-height: 100px;
    margin: 1rem;
  }
  .title {
    font-weight: bold;
  }
  .smallDescription {
    font-size: 0.8rem;
  }
  .status {
    background-color: #1c2b2d;
    color: white;
    padding: 1rem;
    text-align: center;
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
</style>
