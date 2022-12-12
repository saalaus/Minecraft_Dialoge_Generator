<script>
    import { createEventDispatcher } from "svelte";
    import { input_text } from "../stores";


    export let name = undefined; 

    let dispatch = createEventDispatcher()
    function close(){
        dispatch("close")
        input_text.set("")
    }
    function keypress(e){
        if (e.key === "Escape"){
            close()
        }
    }
</script>
<svelte:window on:keydown={keypress} />

<div class="modal">
    <div class="modal-content">
        <div class="modal-header">
            <slot name="header">
                <h2 class="modal-header-text">
                    {name}
                </h2>
            </slot>
        </div>
        <div class="modal-body">
            <slot name="body" />
        </div>
        <div class="modal-footer">
            <slot name="footer" />
        </div>
    </div>
</div>

<style>
    .modal{
        position: fixed;
        z-index: 1;
        padding-top: 100px;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .modal-content{
        position: relative;
        margin: auto;
        padding: 0;
        width: 80%;
    }

    .modal-header{
        padding: 2px 16px;
        color: white;
    }

    .modal-body{
        padding: 2px 16px;
    }

    .modal-footer{
        padding: 2px 16px;
        color: white;
    }
</style>