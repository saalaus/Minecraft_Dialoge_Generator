<button class="btn">
    <div class="title">
        <slot />
    </div>
</button>

<style>
    .btn{
        --button-bg-color: #3b8526;
    --button-bg-hover-color: #50ad2e;
    --button-bg-active-color: #4bbc22;
    --button-text-color: #fff;
    --button-text-hover-color: #fff;
    --button-border-color: #1d4d13;
    --bezel-color: rgba(0, 0, 0, 0.4);
    --bezel-color-invert: rgba(255, 255, 255, 0.4);
    }
    .btn{
        padding: 8px 16px;
        border-style: solid;
        border-width: 0 0 4px 0;
        border-top-color: transparent;
        border-bottom-color: var(--button-border-color);
        border-left-color: transparent;
        border-right-color: transparent;
        background-color: var(--button-bg-color);
        background-clip: padding-box;
        box-sizing: border-box;
        text-transform: uppercase;
        box-shadow: inset 0px -2px 0px 0px var(--bezel-color), inset -2px 0px 0px 0px var(--bezel-color), inset 0px 2px 0px 0px var(--bezel-color-invert), inset 2px 0px 0px 0px var(--bezel-color-invert);
    }
    .btn:hover{
        background-color: var(--button-bg-hover-color);
    }
    .btn:active{
        border-bottom-color: transparent;
        outline: none;
        border-width: 4px 0 0;
        border-bottom-color: var(--button-bg-color);
        background-color: var(--button-bg-active-color);
        box-shadow: inset 0px -2px 0px 0px var(--bezel-color-invert), inset -2px 0px 0px 0px var(--bezel-color-invert), inset 0px 2px 0px 0px var(--bezel-color), inset 2px 0px 0px 0px var(--bezel-color);
    }

    .title {
        font-family: 'Minecraftia', sans-serif;
        font-size: 1rem;
        font-weight: 400;
        line-height: 1.5;
        color: var(--button-text-color);
    }
</style>
