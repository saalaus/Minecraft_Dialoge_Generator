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
        if (e.target === element || element.contains(e.target)) return;
		dispatch('clickoutside');
        console.log("outside!")
    }
</script>

<svelte:body on:click={onPageClick} />

<div bind:this={element} class="context-menu" style="top: {y}px; left: {x}px;">
    <slot />
</div>

<style>
    .context-menu{
        position: absolute;
        display: grid;
		border: 1px solid #0003;
		box-shadow: 2px 2px 5px 0px #0002;
		background: white;
    }
</style>