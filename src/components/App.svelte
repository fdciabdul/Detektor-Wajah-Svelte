<script lang="ts">
  import WebCam from "./WebCam.svelte";
  import {
    loadFaceLandmarkModel,
    loadFaceRecognitionModel,
    loadTinyFaceDetectorModel,
  } from "face-api.js";
  import { onMount } from "svelte";
  import Header from "./Header.svelte";
  import Info from "./Info.svelte";
  import WebCamAlert from "./WebCamAlert.svelte";

  let isLoading = true;

  const loadModels = async () => {
    try {
      await loadFaceLandmarkModel("../../models");
      await loadFaceRecognitionModel("../../models");
      await loadTinyFaceDetectorModel("../../models");
      isLoading = false;
    } catch (error) {
      console.error(error);
    }
  };

  onMount(async () => {
    await loadModels();
  });
</script>

<main>
  <Header />
  <section>
    {#if !isLoading}
      <WebCam />
    {:else}
      <WebCamAlert message={"Loading Models..."} />
    {/if}
    <Info />
  </section>
</main>

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  section {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-areas:
      "webcam  info"
      "webcam  info";
    gap: 1rem;
    text-align: center;
    background-color: var(--background);
  }

  @media (max-width: 1023px) {
    main {
      width: 100%;
      height: 100%;
    }
    section {
      display: flex;
      flex-direction: column;
    }
  }
</style>
