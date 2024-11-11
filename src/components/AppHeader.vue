<template>
    <header class="app-header">
      <div class="container-fluid">
        <div class="row">
          <div class="col-2">
            <img class="logo" src="../assets/BOOL-BNB-DB.png" alt="Logo">
          </div>
          <div class="col-10">
            <div class="content">
              <ul class="list-unstyled mt-3 d-flex justify-content-end">
                <li class="mx-3"><router-link to="/" class="text-decoration-none text-black" active-class="active-link" exact> Home </router-link></li>
                <li class="mx-3"><a href="#" class="text-decoration-none text-black">About US</a></li>
                <li class="mx-3"><a href="#" class="text-decoration-none text-black">Activities</a></li>
                <li class="mx-3"><a href="#" class="text-decoration-none text-black">Contacts</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="centered-text">
          Trova la casa ideale con bool bnb!
        </div>
      </div>
    </header>
  </template>
  
  <script>
  export default {
  };
  </script>
  
  <style lang="scss" scoped>
  .logo {
    height: 60px;
    position: relative;
    z-index: 10;
  }
  
  .container-fluid {
    background-image: url('../assets/landing-page.jpg');
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 400px;
    overflow: hidden;
  }
  
  .container-fluid::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.4);
    z-index: 1;
  }
  
  .content {
    position: relative;
    z-index: 10;
  }
  
  ul.list-unstyled li a {
    color: #000000;
    font-size: 18px;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
  
  .centered-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #000;
    font-size: 2rem;
    text-align: center;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    z-index: 2;
  }
  
  ul.list-unstyled li a:active {
    border: 1px solid black;
    padding: 5px;
  }
  
  .app-header {
    top: 0;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 10px 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1000;
  }
  
  .active-link {
    border: 2px solid black;
    padding: 5px;
  }
  </style>
  