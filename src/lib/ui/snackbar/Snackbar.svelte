<script>
    import { createEventDispatcher, onMount } from "svelte";

    import Toast from "@assets/toast.png";

    const dispatch = createEventDispatcher();
    export let text;
    export let duration = 3000;

    let active = true;
    onMount(() => {
        setInterval(() => {
            active = false;
            dispatch("destroyed");
        }, duration);
    });
</script>

{#if active}
    <div class="snackbar">
        <span class="snackbar-text">
            {text}
        </span>
        <img
            src={Toast}
            alt="snackbar"
            class="snackbar-img"
        />
    </div>
{/if}

<style lang="scss">
    .snackbar {
        display: flex;
        position: relative;
        margin-bottom: 5px;

        &-img {
            image-rendering: pixelated;
        }

        &-text {
            position: absolute;
            bottom: 8px;
            left: 16px;
            color: yellow;
            font: 20pt "Minecraftia", sans-serif;
            top: 10px;
            -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
            animation: fadein 0.5s, fadeout 0.5s 2.5s;
        }
    }

    @-webkit-keyframes fadein {
        from {
            bottom: 0;
            opacity: 0;
        }
        to {
            bottom: 30px;
            opacity: 1;
        }
    }

    @keyframes fadein {
        from {
            bottom: 0;
            opacity: 0;
        }
        to {
            bottom: 30px;
            opacity: 1;
        }
    }

    @-webkit-keyframes fadeout {
        from {
            bottom: 30px;
            opacity: 1;
        }
        to {
            bottom: 0;
            opacity: 0;
        }
    }

    @keyframes fadeout {
        from {
            bottom: 30px;
            opacity: 1;
        }
        to {
            bottom: 0;
            opacity: 0;
        }
    }
</style>
