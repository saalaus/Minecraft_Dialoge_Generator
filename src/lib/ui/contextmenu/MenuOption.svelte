<div class="context-menu_item" on:click on:keypress={undefined}>
    <slot />
</div>

<style>
    .context-menu_item{
    padding: 0.5rem 1.5rem 0.5rem 1rem;
    width: 100%;
    cursor: pointer;
    font-family: Minecraftia;
    color:white;
    font-size: 16px;
    box-sizing: border-box;
    }

    .context-menu_item:hover{
        background-color: #8b8b8b;
    }
</style>
