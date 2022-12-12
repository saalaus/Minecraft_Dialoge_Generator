<script>
    let class_ = "";
    export {class_ as class}
    export let data_edit = "";
    export let type = "primary"
</script>

<button class="btn btn-{type} {class_ || ''}" data-edit={data_edit} on:click>
    <div class="title">
        <slot />
    </div>
</button>

<style>
    .btn{
    --bezel-color: rgba(0, 0, 0, 0.4);
    --bezel-color-invert: rgba(255, 255, 255, 0.4);
    }
    .btn{
        padding: 8px 16px;
        border-style: solid;
        border-width: 0 0 4px 0;
        border-top-color: transparent;
        border-left-color: transparent;
        border-right-color: transparent;
        background-clip: padding-box;
        box-sizing: border-box;
        text-transform: uppercase;
        box-shadow: inset 0px -2px 0px 0px var(--bezel-color), inset -2px 0px 0px 0px var(--bezel-color), inset 0px 2px 0px 0px var(--bezel-color-invert), inset 2px 0px 0px 0px var(--bezel-color-invert);
    }
    .btn-secondary{
        border-bottom-color: #58585a;
        background-color: #d0d1d4;
    }
    .btn-secondary:hover{
        background-color: #f4f6f9;
    }
    .btn-primary{
        background-color: #3b8526;
        border-bottom-color: #1d4d13;
    }
    .btn-primary:hover{
        background-color: #50ad2e;
    }
    .btn:active{
        border-bottom-color: transparent;
        outline: none;
        border-width: 4px 0 0;
        box-shadow: inset 0px -2px 0px 0px var(--bezel-color-invert), inset -2px 0px 0px 0px var(--bezel-color-invert), inset 0px 2px 0px 0px var(--bezel-color), inset 2px 0px 0px 0px var(--bezel-color);
    }
    .btn-primary:active{
        border-bottom-color: #3b8526;
        background-color: #4bbc22;
    }
    .title {
        font-family: 'Minecraftia', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: white;
    }
    .btn-secondary > .title{
        color: #23232a;
    }

    .btn.toggle{
        border-bottom-color: transparent;
        outline: none;
        border-width: 4px 0 0;
        box-shadow: inset 0px -2px 0px 0px var(--bezel-color-invert), inset -2px 0px 0px 0px var(--bezel-color-invert), inset 0px 2px 0px 0px var(--bezel-color), inset 2px 0px 0px 0px var(--bezel-color);
    }
    .btn-primary.toggle{
        border-bottom-color: #3b8526;
        background-color: #4bbc22;
    }
</style>
