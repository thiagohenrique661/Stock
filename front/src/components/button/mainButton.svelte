<script>
    export let buttonText;

    export let buttonFunction = () =>{
        console.log("Function no set");
    };

    let Value;

</script>

<div id="mainButton" on:click={buttonFunction}>
    <span />
    <span />
    <span />
    <span />
    {buttonText}
</div>



<style>
    #mainButton{
        box-sizing: border-box;
        font-size: 1rem;
        height: 2.5rem;
        overflow: hidden;
    }
    
    #mainButton{
        text-align: center;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        font-size: 1.12rem;
        width: 100%;
        height: 3.12rem;
        border-radius: 5px;
        color: #111;
        background-color: #d9d9d9;
        transition: 0.3s;
        box-shadow: 1px 1px 10px #00000020;
        font-family: Arial, Helvetica, sans-serif;
    }

    #mainButton:hover{
        background-color: #f0f0f040;
        box-shadow: 1px 1px 10px rgba(0,0,0,0.5);
    }

    #mainButton span{
        position: absolute;
        display: block;
    }
</style>