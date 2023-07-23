<script>
    // svelte-ignore unused-export-let
    export let sourceOutput;
    // svelte-ignore unused-export-let
    export let id;
    // svelte-ignore unused-export-let
    export let source;
    // svelte-ignore unused-export-let
    export let target;
    // svelte-ignore unused-export-let
    export let targetInput;
    // svelte-ignore unused-export-let
    export let start;
    // svelte-ignore unused-export-let
    export let end;
    // svelte-ignore unused-export-let
    export let isPseudo;
    export let path;
</script>

<svg data-testid="connection">
    <path
        class="one"
        d={path} />
    <path
        class="two"
        d={path} />
</svg>

<style>
    /*! https://github.com/retejs/connection-plugin/commit/206ca0fd7fb82801ac45a0f7180ae05dff9ed901 */
    svg {
        overflow: visible !important;
        position: absolute;
        pointer-events: none;
        width: 9999px;
        height: 9999px;
    }
    svg path {
        fill: none;
        pointer-events: auto;
    }
    .one {
        stroke-width: 3px;
        stroke: black;
    }
    .two {
        stroke-width: 2px;
        stroke: white;
    }
</style>
