<script>
    export let text;
    export let dis = "dis";
</script>

<div id="warnAcc" class={dis}>
    {text}
</div>

<style>
    #warnAcc{
        color: #32d02c;
        font-weight: bold;
    }

    .textSize{
        font-size: 12pt;
    }

    .dis{
        display: none;
    }

    .disBlock{
        display: block;
    }
</style>