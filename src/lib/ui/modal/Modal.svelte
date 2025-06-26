<script>
    import { input_text } from "../../stores";

    let { onclose = undefined, name = undefined, header = undefined, body, footer } = $props();

    function close() {
        onclose();
        input_text.set("");
    }
    function keypress(e) {
        if (e.key === "Escape") {
            close();
        }
    }
</script>

<svelte:window on:keydown={keypress} />

<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            {@render header?.()}
            <h2 class="modal-header-text">
                {name}
            </h2>
        </div>
        <div class="modal-body">
            {@render body()}
        </div>
        <div class="modal-footer">
            {@render footer()}
        </div>
    </div>
</div>

<style lang="scss">
    .modal {
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);

        &-header{
            padding: 2px 16px;
            color: white;
        }
        &-body{
            padding: 2px 16px;
        }
        &-content{
            position: relative;
            margin: auto;
            padding: 0;
            width: 80%;
        }
        &-footer{
            padding: 2px 16px;
            color: white;
        }
    }
</style>

