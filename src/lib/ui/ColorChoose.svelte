<script>
    // TODO: Custom select
    import { createEventDispatcher } from "svelte";
    import Select from "./select/Select.svelte"

    const dispatch = createEventDispatcher();
    let bg_class = "bg-white";
    let element;

    function onChange(e) {
        bg_class = `bg-${e.target.value}`;
        dispatch("change", e.target.value);
    }
    export function selectItemByValue(value) {
        for (let option_i = 0; option_i < element.options.length; option_i++) {
            const option = element.options[option_i];
            if (option.value === value) {
                option.selected = true;
                bg_class = `bg-${option.value}`;
                break;
            }
        }
    }
</script>

<!-- <select
    class="choice_color {bg_class}"
    on:change={onChange}
    bind:this={element}
>
    <option value="white" class="bg-white">White</option>
    <option value="black" class="bg-black">Black</option>
    <option value="dark_blue" class="bg-dark_blue">Dark Blue</option>
    <option value="dark_green" class="bg-dark_green">Dark Green</option>
    <option value="dark_aqua" class="bg-dark_aqua">Dark Aqua</option>
    <option value="dark_red" class="bg-dark_red">Dark Red</option>
    <option value="dark_purple" class="bg-dark_purple">Dark Purple</option>
    <option value="gold" class="bg-gold">Gold</option>
    <option value="gray" class="bg-gray">Gray</option>
    <option value="dark_gray" class="bg-dark_gray">Dark Gray</option>
    <option value="blue" class="bg-blue">Blue</option>
    <option value="green" class="bg-green">Green</option>
    <option value="aqua" class="bg-aqua">Aqua</option>
    <option value="red" class="bg-red">Red</option>
    <option value="light_purple" class="bg-light_purple">Light Purple</option>
    <option value="yellow" class="bg-yellow">Yellow</option>
</select> -->
<Select />

<style>
    .choice_color {
        font-family: "Minecraftia";
        outline: none;
        height: 54px;
        font-size: 20pt;
    }

    .bg-white {
        background-color: white;
        color: black;
    }

    .bg-black {
        background-color: black;
        color: white;
    }

    .bg-dark_blue {
        background-color: rgb(0, 0, 170);
        color: white;
    }

    .bg-dark_green {
        background-color: rgb(0, 170, 0);
        color: white;
    }

    .bg-dark_aqua {
        background-color: rgb(0, 170, 170);
        color: white;
    }

    .bg-dark_purple {
        background-color: rgb(170, 0, 170);
        color: white;
    }

    .bg-gold {
        background-color: rgb(255, 170, 0);
        color: black;
    }

    .bg-gray {
        background-color: rgb(170, 170, 170);
        color: black;
    }

    .bg-dark_gray {
        background-color: rgb(85, 85, 85);
        color: white;
    }

    .bg-blue {
        background-color: rgb(85, 85, 255);
        color: black;
    }

    .bg-green {
        background-color: rgb(85, 255, 85);
        color: black;
    }

    .bg-aqua {
        background-color: rgb(85, 255, 255);
        color: black;
    }

    .bg-red {
        background-color: rgb(255, 85, 85);
        color: white;
    }

    .bg-dark_red {
        background-color: rgb(170, 0, 0);
        color: white;
    }

    .bg-light_purple {
        background-color: rgb(255, 85, 255);
        color: black;
    }

    .bg-yellow {
        background-color: rgb(255, 255, 85);
        color: black;
    }
</style>
