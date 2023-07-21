<script>
    export let questionRef;
    export let questionText;
</script>

<a id="redirect-link" href={questionRef}>{questionText}</a>

<style>
    #redirect-link {
        color: #0f0f0f;
        transition: ease-in-out 260ms;
        text-decoration: none;
    }

    #redirect-link:hover{
        color: #a2a2a2;
        transition: ease-in-out 260ms;
    }
</style>