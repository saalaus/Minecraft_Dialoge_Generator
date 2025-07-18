<script>
    import { onMount} from "svelte";

    let {x, y, close = undefined, children } = $props();


    $effect((_, __) => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        x = Math.min(window.innerWidth - rect.width, x);
        if (y > window.innerHeight - rect.height) y -= rect.height;
    });

    let element;
    function onPageClick(e){
        // if (e.target === element || element.contains(e.target)) dispatch('close');;
        close(e);
    }
</script>

<svelte:body onclick={onPageClick} />

<div bind:this={element} class="context-menu" style="top: {y}px; left: {x}px;">
    {@render children?.()}
</div>

<style>
    .context-menu{
        position: absolute;
        background-color: #484848;
        padding: 2px;
        box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.4), inset -2px 0px 0px 0px rgba(0, 0, 0, 0.4), inset 0px 2px 0px 0px rgba(255, 255, 255, 0.4), inset 2px 0px 0px 0px rgba(255, 255, 255, 0.4);
        z-index: 1000;
    }
</style>
