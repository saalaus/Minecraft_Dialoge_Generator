<script>
    import { onMount } from 'svelte';

    export let bindControl;
    export let control;
    export let controlType = 'control';
    export let emitter;
    export let key;
    export let label;
    export let type = 'text';
    export let getData;
    export let putData;

    let el;

    onMount(() => {
        if (!control) return;

        bindControl(el, control);

        if (getData) el.value = getData(key);
    });

    $: {
        if (el && control) bindControl(el, control);
        // console.log('CONTROL', control);
    }

    function change($event) {
        if (key) putData(key, $event.target.value);

        emitter.trigger('process');
    }
</script>

<style lang="scss" scoped>
    @import './vars';

    .input-control {
        z-index: 1;
        width: calc(100% - #{$socket-size + 2 * $socket-margin});
        vertical-align: middle;
        display: inline-block;
    }

    .control {
        padding: $socket-margin $socket-size/2 + $socket-margin;
    }
</style>

<svelte:options accessors={true} />

<div class={controlType}>
    {#if label}
        <label>{label}</label>
    {/if}
    <input {type} bind:this={el} on:input={change} />
</div>
