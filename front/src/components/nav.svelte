<script>
    export let navRef;
</script>

<div>
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
        padding: 4px;
        height: 2.5rem;
    }
</style>