<script lang="ts">
    export let message;
</script>

<main>
  <h3>!INFO {message}</h3>
</main>

<style>
  main {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem;
    width: 640px;
    height: 480px;
  }

  h3 {
    font-weight: 400;
    color: var(--primary-text);
  }

  @media (max-width: 600px) {
    main {
      width: 300px;
      height: 225px;
    }
  }

  @media (max-width: 280px) {
    main {
      width: 200px;
      height: 150px;
    }
  }
</style>
