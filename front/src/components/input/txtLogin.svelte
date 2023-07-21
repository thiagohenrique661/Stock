<script>
export let req = false;
export let inputText;
export let type;
export let inputValue;
export let verifyChar;

function typeAction(node) {
    node.type = type;
}
</script>

<div id="input-box">
    <input
    bind:value={inputValue}
    use:typeAction
    autocomplete="off"
    id="inputTxtLogin"
    required={req}
    placeholder={inputText}
    on:keyup={verifyChar}
    />
</div>



<style>
    #input-box{
        position: relative;
        width: 100%;
        margin-bottom: 2.18rem;
    }

    #inputTxtLogin{
        position: relative;
        width: 100%;
        padding-top: 1.3rem;
        background-color: transparent;
        color: #000;
        outline: none;
        border: 1px solid #000;
        font-family: "Trebuchet MS", "Helvetica", "Arial", sans-serif;
    }



</style>