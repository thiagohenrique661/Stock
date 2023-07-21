<script>
    export let text;
    export let dis = "dis";
</script>

<div id="warnRej" class={dis}>
    {text}
</div>

<style>
    #warnRej{
        color: #d0342c;
        font-weight: bold;
    }

    .textSize{
        font-size: 12pt;
    }

    .dis{
        display: none;
    }
</style>