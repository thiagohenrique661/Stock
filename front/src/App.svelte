<script>
  import Router from "svelte-spa-router";

  import Login from "./routes/login.svelte";
  //import Register from "./routes/register.svelte";
  import AddUser from "./routes/authScreens/addUser.svelte";
  // import Home from "./routes/authScreens/home.svelte";
</script>

<body>
  <Router 
    routes={{
      "/": Login,
      "/add/user": Register,

    }}
  />
</body>

<style>
  
</style>
