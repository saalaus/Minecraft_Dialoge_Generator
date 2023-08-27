<script>
    import { onMount, createEventDispatcher } from "svelte";

    export let x;
    export let y;

    const dispatch = createEventDispatcher()

    $: ((_, __) => {
		if (!element) return;
		
		const rect = element.getBoundingClientRect();
		x = Math.min(window.innerWidth - rect.width, x);
		if (y > window.innerHeight - rect.height) y -= rect.height;
	})(x, y);

    let element;
    function onPageClick(e){
        // if (e.target === element || element.contains(e.target)) dispatch('close');;
		dispatch('close');
    }
</script>

<svelte:body on:click={onPageClick} />

<div bind:this={element} class="context-menu" style="top: {y}px; left: {x}px;">
    <slot />
</div>

<style>
    .context-menu{
        position: absolute;
        background-color: #484848;
        padding: 2px;
        box-shadow: inset 0px -2px 0px 0px rgba(0, 0, 0, 0.4), inset -2px 0px 0px 0px rgba(0, 0, 0, 0.4), inset 0px 2px 0px 0px rgba(255, 255, 255, 0.4), inset 2px 0px 0px 0px rgba(255, 255, 255, 0.4);
    }
</style>
