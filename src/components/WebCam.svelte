<script lang="ts">
  import { onMount } from "svelte";
  import { labeledDescriptors } from "../descriptors";
  import type { CanvasType, PipelineData, VideoFeed } from "../pipeline";
  import { runPipeline } from "../pipeline";

  onMount(async () => {
    try {
      // Grab DOM nodes
      const canvas: CanvasType = document.querySelector("#canvas");
      const video: VideoFeed = document.querySelector("#videoEl") as VideoFeed;

      // Create data structure for pipeline
      const data: PipelineData = {
        video: video,
        canvas: canvas,
        videoWidth: video.clientWidth,
        videoHeight: video.clientHeight,
        facesDetected: null,
        labeledDescriptors: $labeledDescriptors,
      };

      // Check if client has camera
      if (navigator.mediaDevices.getUserMedia) {
        const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        video.srcObject = stream;
      }

      // Run pipeline every 200ms to update facial recognition computation
      setInterval(async () => {
        await runPipeline(data);
      }, 200);
    } catch (error) {
      console.error(error);
    }
  });
</script>

<section>
  <main><center></center>
    <canvas id="canvas" class="overlay" />
    <video playsinline autoplay={true} controls id="videoEl">
      <track kind="captions" />
    </video>
  </main>
</section>

<style>
  section {
    grid-area: webcam;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align: center;
  }

  main {
    margin: 2rem;
    width: 640px;
    height: 480px;
    border: 2px solid black;
    box-shadow: black;
  }

  .overlay {
    position: absolute;
    width: 640px;
    height: 480px;
  }

  video {
    align-items: center;
    width: 640px;
    height: 480px;
    box-shadow: inset 5px 5px black;
    background-color: rgb(8, 1, 7);
  }

  @media (max-width: 600px) {
    main {
      width: 300px;
      height: 225px;
    }

    .overlay {
      width: 300px;
      height: 225px;
    }

    video {
      width: 300px;
      height: 225px;
    }
  }

  @media (max-width: 280px) {
    main {
      width: 200px;
      height: 150px;
    }

    .overlay {
      width: 200px;
      height: 150px;
    }

    video {
      width: 200px;
      height: 150px;
    }
  }
</style>
