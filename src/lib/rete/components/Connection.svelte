<script lang="ts">
    import type { ClassicScheme } from "rete-svelte-plugin/5";
    
    export let data: ClassicScheme["Connection"];
    export let path: string;
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
