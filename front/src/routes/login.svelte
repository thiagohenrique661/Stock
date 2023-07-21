<script>
import TxtLogin from "../components/input/txtLogin.svelte";
import Nav from "../components/nav.svelte";
import MainButton from "../components/button/mainButton.svelte";
import {push} from "svelte-spa-router";
// import {env} from "../../public/variable";
// import Question from "../components/button/question.svelte";
// import Rej from "../components/warn/rej.svelte";

let username;
let password;
let displayWarn;
let displayText;

const createSession = async () => {
    const res = await fetch(`/api/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });

    const resJson = await res.json();

    if(resJson["route"]) {
        push(resJson["route"]);
    } else if (resJson["msg"] === false){
        displayWarn = "disBlock";
        displayText = resJson["text"];
    }
};

</script>

<Nav navRef="#">

    <main id="mainLogin" class="containerMain">
        <form id="formLogin">
            <div id="inputsLogin">
                <TxtLogin
                    bind:inputValue={username}
                    type="email"
                    inputText="email"
                    verifyChar=""
                />
                <TxtLogin
                    bind:inputValue={password}
                    type="password"
                    inputText="senha"
                    verifyChar=""
                />
            </div>
            <div id="btnLogin">
                <MainButton buttonText="Entrar" buttonFunction={createSession}/>
            </div>
        </form>

     
    </main>
</Nav>


<style>

    #mainLogin{
        height: calc(100% - 40px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    #formLogin{
        margin-top: 1.3%;
        width: 30%;
        min-height: 100%;
        border-radius: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #ffffff;
        transition: 0.3s;
        box-shadow: 1px 1px 10px #00000060;

    }

    #inputsLogin{
        width: 80%;
        margin-top: 5rem;
    }

    /* #title h1 {
        margin-top: 5%;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 2.5rem;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: bold;
    } */


    .containerMain{
        height: 90vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>