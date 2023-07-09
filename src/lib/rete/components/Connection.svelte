<script>
    // svelte-ignore unused-export-let
    export let data;
    // svelte-ignore unused-export-let
    export let start;
    // svelte-ignore unused-export-let
    export let end;
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
        stroke-width: 2px;
        stroke: black;
    }
    .two {
        stroke-width: 1px;
        stroke: white;
    }
</style>
