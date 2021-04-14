<script lang="ts"></script>

<header>
  <div />
  <div id="title">
    <center><h1>Testing Face Api.js</h1></center>
  </div>
</header>

<style>
  header {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 96px;
    align-items: center;
    grid-area: header;
  }

  #title {
   
    width: 100%;

    background-color: rgba(112, 194, 190, 0.562);
  }

  h1 {
    
    color: #fff;
    font-size: 36px;
    align-items: center;
    font-weight: 500;
  }

  div:first-of-type {
    width: 100%;
    height: 16px;
    background-color: var(--dark-primary);
  }

  @media (max-width: 600px) {
    h1 {
      font-size: 22px;
   
    
    }
  }

  @media (max-width: 280px) {
    h1 {
      font-size: 18px;
      margin: 0;
      margin-left: auto;
      margin-right: auto;
    }
  }
</style>
