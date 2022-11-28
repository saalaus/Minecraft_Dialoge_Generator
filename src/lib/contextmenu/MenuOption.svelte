<script>
    import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();	

    function handleClick(){
        dispatch("click")
    }
</script>

<div class="context-menu_item" on:click={handleClick} on:keypress={undefined}>
    <slot />
</div>

<style>
    .context-menu_item{
        padding: 4px 15px;
		cursor: default;
		font-size: 20px;
		display: flex;
		align-items: center;
		grid-gap: 5px;
    }

    .context-menu_item:hover{
        background: #0002;
    }
</style>