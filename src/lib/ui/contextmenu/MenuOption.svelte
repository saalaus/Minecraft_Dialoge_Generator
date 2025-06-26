<script lang="ts">
    let { onclick = undefined, children } = $props();
</script>

<div class="context-menu_item" {onclick} onkeypress={() => {}} role="menuitem" tabindex="0">
    {@render children?.()}
</div>

<style lang="scss">
    .context-menu_item{
        padding: 0.5rem 1.5rem 0.5rem 1rem;
        width: 100%;
        cursor: pointer;
        font-family: Minecraftia;
        color:white;
        font-size: 16px;
        box-sizing: border-box;

        &:hover{
            background-color: #8b8b8b;
        }
    }
</style>
