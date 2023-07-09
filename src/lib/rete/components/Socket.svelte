<script lang="ts">
    import type { ClassicPreset } from "rete";
    export let data: ClassicPreset.Socket;
</script>

<div
    class="socket"
    title={data.name} />

<style lang="scss" scoped>
    @use "sass:math";
    @import "./vars";
    .socket {
        display: inline-block;
        cursor: pointer;
        width: $socket-size;
        height: $socket-size;
        margin: $socket-margin;
        vertical-align: middle;
        z-index: 2;
        box-sizing: border-box;
        background-color: $socket-color;
        border: 2px solid black;
        &:hover {
            border-width: 1px;
        }
        &.output {
            margin-right: -1 * math.div($socket-size, 2);
        }
        &.input {
            margin-left: -1 * math.div($socket-size, 2);
        }
    }
</style>
