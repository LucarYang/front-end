

<template>
    
    <ul class="nav justify-content-center">
        <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Active</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Dropdown link
            </a>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
            </ul>
        </li>
    </ul>
</template>
<script></script>
<style>  
/* 自定义样式 */  
.navbar {  
  background-color: #333;  
  color: #fff;  
}  

.navbar-brand {  
  color: #fff;  
}  

.navbar-toggle {  
  background-color: #fff;  
  border: 1px solid #ccc;  
}  

.navbar-collapse {  
  display: none;  
}  

.dropdown-menu {  
  background-color: #333;  
  color: #fff;  
}  

.dropdown-toggle {  
  color: #fff;  
}  
</style>  