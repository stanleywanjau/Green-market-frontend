import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"></a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarText">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <a class="nav-link toggler" href="#" role="button" data-bs-toggle="" aria-expanded="" style={{color:"white"}}id = "featured">
             Featured Categories
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/" style={{color:"white"}}>Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"style={{color:"white"}}>Features</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#"style={{color:"white"}}>Become a farmer </a>
        </li>
      </ul>
     
    </div>
  </div>
</nav>


    </div>
  )
}

export default Navbar