<script>
    import Nav from "../../components/nav.svelte";
    import TxtLogin from "../../components/input/txtLogin.svelte";
    import MainButton from "../../components/button/mainButton.svelte";

    let displayAccText;
    let displayAccWarn;
    let displayWarn;
    let displayText;

    let username;
    let userPassword;

    const addUser = async () =>{
        const res = await fetch(`api/add/user`, {
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                username,
                passwordUser,
            }),
        });

        const resJson = await res.json();

        if(resJson["msg"] === true){
            displayWarn = "dis";
            displayAccWarn = "disBlock";
            displayAccText = resJson["text"];
        }
    };

</script>



<Nav navRef="#/home">
    <main id="mainAddUser">
        <div id="title">
            <h1>Cadastrar usuário</h1>
        </div>

        <form id="form-AddUser">
            <div id="inputs-AddUser">
                <TxtLogin bind:inputValue={username} type="mail" inputText="Usuário"/>
                <TxtLogin bind:inputValue={userPassword} type="password" inputText="Senha"/>
            </div>

            <div class="btnRegister">
               <MainButton button="Cadastrar" buttonFunction={addUser}/>
            </div>

        </form>
    </main>

</Nav>


<style>
    
</style>