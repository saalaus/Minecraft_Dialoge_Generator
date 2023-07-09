<script lang="ts">
    import type { ClassicScheme, SvelteArea2D } from "rete-svelte-plugin";
    import { Ref } from "rete-svelte-plugin";
    type NodeExtraData = { width?: number; height?: number };
    function sortByIndex<K, I extends undefined | { index?: number }>(
        entries: [K, I][]
    ) {
        entries.sort((a, b) => {
            const ai = (a[1] && a[1].index) || 0;
            const bi = (b[1] && b[1].index) || 0;
            return ai - bi;
        });
        return entries as [K, Exclude<I, undefined>][];
    }
    export let data: ClassicScheme["Node"] & NodeExtraData;
    export let emit: (props: SvelteArea2D<ClassicScheme>) => void;
    $: width = Number.isFinite(data.width) ? `${data.width}px` : "";
    $: height = Number.isFinite(data.height) ? `${data.height}px` : "";
    $: inputs = sortByIndex(Object.entries(data.inputs));
    $: controls = sortByIndex(Object.entries(data.controls));
    $: outputs = sortByIndex(Object.entries(data.outputs));
    function any<T>(arg: T): any {
        return arg;
    }
</script>

<div
    class="node {data.selected ? 'selected' : ''}"
    style:width
    style:height
    data-testid="node">
    <!-- Outputs -->
    {#each outputs as [key, output]}
        <div
            class="output"
            data-testid="'output-'+key">
            <div
                class="output-title"
                data-testid="output-title">
                {output.label || ""}
            </div>
            <Ref
                class="output-socket"
                data-testid="output-socket"
                init={(element) =>
                    emit({
                        type: "render",
                        data: {
                            type: "socket",
                            side: "output",
                            key,
                            nodeId: data.id,
                            element,
                            payload: output.socket,
                        },
                    })}
                unmount={(ref) =>
                    emit({ type: "unmount", data: { element: ref } })} />
        </div>
    {/each}

    <!-- Inputs -->
    {#each inputs as [key, input]}
        <div
            class="input"
            data-testid="'input-'+key">
            <Ref
                class="input-socket"
                data-testid="input-socket"
                init={(element) =>
                    emit({
                        type: "render",
                        data: {
                            type: "socket",
                            side: "input",
                            key,
                            nodeId: data.id,
                            element,
                            payload: input.socket,
                        },
                    })}
                unmount={(ref) =>
                    emit({ type: "unmount", data: { element: ref } })} />
            {#if !input.control || !input.showControl}
                <div
                    class="input-title"
                    data-testid="input-title">
                    {input.label || ""}
                </div>
            {/if}
            {#if input.control && input.showControl}
                <Ref
                    class="input-control"
                    data-testid="input-control"
                    init={(element) =>
                        emit({
                            type: "render",
                            data: {
                                type: "control",
                                element,
                                payload: any(input).control,
                            },
                        })}
                    unmount={(ref) =>
                        emit({ type: "unmount", data: { element: ref } })} />
            {/if}
        </div>
    {/each}
</div>

<style lang="scss">
    @use "sass:math";
    @import "./vars";
    .node {
        display: flex;
        background: rgba(33, 33, 33, 0.8);
        border: 2px solid rgb(85, 85, 85);
        box-shadow: 0 0 0 1px black;
        flex-direction: row-reverse;
        cursor: pointer;
        &:hover {
            background: rgba(33, 33, 33, 1);
        }
        &.selected {
            background: rgba(170, 127, 16, 1);
            border: 1px solid black;
            box-shadow: none;
        }
        .output {
            text-align: right;
        }
        .input {
            text-align: left;
        }
        :global(.output-socket) {
            text-align: right;
            display: inline-block;
            margin-right: -(math.div($socket-size, 2) + $socket-margin);
        }
        :global(.input-socket) {
            text-align: left;
            margin-left: -(math.div($socket-size, 2) + $socket-margin);
            display: inline-block;
        }
        .input-title,
        .output-title {
            vertical-align: middle;
            color: white;
            display: inline-block;
            font: 12pt "Minecraftia", sans-serif;
            margin: $socket-margin;
            line-height: $socket-size;
        }
        :global(.input-control) {
            z-index: 1;
            width: calc(100% - #{$socket-size + 2 * $socket-margin});
            vertical-align: middle;
            display: inline-block;
        }
        :global(.control) {
            display: block;
            padding: $socket-margin math.div($socket-size, 2) + $socket-margin;
        }
    }
</style>
