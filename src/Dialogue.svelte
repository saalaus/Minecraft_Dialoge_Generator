<script>

    import ControlBinder from './ControlBinder.svelte';
    import Control from './Control.svelte';
    import Socket from './Socket.svelte';
    import { kebab } from './util';

    export let editor;
    export let node;
    export let bindSocket;
    export function update(){
        selected = editor.selected.contains(node)?"selected":""
    }


    $: inputs = Array.from(node.inputs.values())
    $: outputs = Array.from(node.outputs.values());
    $: controls = Array.from(node.controls.values());
    let selected =  '';
</script>

<svelte:options accessors={true} />

<div class="node {kebab(node.name)}" class:selected>

    <!-- Outputs -->
    {#each outputs as output, index (output.key)}
        <div class="output">
            <div class="output-title">{output.name} {selected}</div>
            <Socket bind:socket={output.socket} {output} {bindSocket} type="output" />
        </div>
    {/each}

    <!-- Inputs -->
    {#each inputs as input, index (input.key)}
        <div class="input">
            <Socket bind:socket={input.socket} {input} {bindSocket} type="input" />
            <div class="input-title">{input.name}</div>
        </div>
    {/each}
</div>


<style lang="scss">
    @import './vars';

    .node {
        background: $node-color;
        border: 2px solid #4e58bf;
        border-radius: 10px;
        cursor: pointer;
        min-width: $node-width;
        height: auto;
        padding-bottom: 6px;
        box-sizing: content-box;
        position: relative;
        user-select: none;

        &:hover {
            background: lighten($node-color, 4%);
        }

        &.selected {
            background: $node-color-selected;
            border-color: #e3c000;
        }

        .output {
            text-align: right;
        }

        .input {
            text-align: left;
            display: flex;
        }

        .input-title,
        .output-title {
            vertical-align: middle;
            color: white;
            display: inline-block;
            font-family: sans-serif;
            font-size: 14px;
            margin: $socket-margin;
            line-height: $socket-size;
        }
    }
</style>