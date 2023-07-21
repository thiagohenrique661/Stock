<script>
    export let navRef;
</script>

<div class="container">
    <nav id="nav">
        <a href={navRef}>
            <h1>LOGO</h1>
        </a>
    </nav>
</div>

<style>

    h1{
        height: 6vh;
        cursor: pointer;
    }

    #nav{
        background-color: #000;
        display: flex;
        text-align: center;
        justify-content: center;
        align-items: center;
        padding: 0.25rem;
        height: 2.5rem;
    }

    .container{
        height: 100%;
        width: 100%;
    }
</style>