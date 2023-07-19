<script>
  import Router from "svelte-spa-router";

  import Login from "./routes/login.svelte";
  import Register from "./routes/register.svelte";
  import AddUser from "./routes/authScreens/addUser.svelte";
  import Home from "./routes/authScreens/home.svelte";
</script>

<body>
  <Router 
    routes={{
      "/": Login,
      "/register": Register,
      "/home": Home,
      "/add/user": AddUser,
    }}
  />
</body>

<style>
  
</style>
