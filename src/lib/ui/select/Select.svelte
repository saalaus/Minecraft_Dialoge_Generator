<script>
    import Select from 'svelte-select/no-styles/Select.svelte'
    import SelectItem from "./SelectItem.svelte";
    let items = [
        { value: "white", class: "bg-white", label: "White" },
        { value: "black", class: "bg-black", label: "Black" },
        { value: "dark_blue", class: "bg-dark_blue", label: "Dark Blue" },
        { value: "dark_green", class: "bg-dark_green", label: "Dark Green" },
        { value: "dark_aqua", class: "bg-dark_aqua", label: "Dark Aqua" },
        { value: "dark_red", class: "bg-dark_red", label: "Dark Red" },
        { value: "dark_purple", class: "bg-dark_purple", label: "Dark Purple" },
        { value: "gold", class: "bg-gold", label: "Gold" },
        { value: "gray", class: "bg-gray", label: "Gray" },
        { value: "dark_gray", class: "bg-dark_gray", label: "Dark Gray" },
        { value: "blue", class: "bg-blue", label: "Blue" },
        { value: "green", class: "bg-green", label: "Green" },
        { value: "aqua", class: "bg-aqua", label: "Aqua" },
        { value: "red", class: "bg-red", label: "Red" },
        { value: "light_purple", class: "bg-light_purple", label: "Light Purple" },
        { value: "yellow", class: "bg-yellow", label: "Yellow" },
    ];
</script>

<div class="select-container">
    <Select {items} placeholder="Select color" clearable={false} searchable={false}>
        {#snippet item({ item })}
                <div  >
                <SelectItem {item} />
            </div>
            {/snippet}
    </Select>
</div>

<style>
    :global(.select-container .svelte-select) {
        --border: 2px solid #000;
        --borderRadius: 0;
        --background: #c6c6c6;
        --height: 54px;
        --padding: 0 8px;
        --boxShadow: inset -2px -2px #000;
        --textShadow: 2px 2px #000;
        --fontFamily: "Minecraftia";
        --fontSize: 10pt;
    }

    :global(.select-container .svelte-select .selected) {
        background-color: #c6c6c6;
        border: 2px solid #000;
        box-shadow: inset -2px -2px #000;
    }

    :global(.select-container .svelte-select .selected:hover) {
        background-color: #d6d6d6;
    }

    :global(.select-container .svelte-select .selected:active) {
        box-shadow: inset 2px 2px #000;
    }

    :global(.select-container .svelte-select .list) {
        background-color: #c6c6c6;
        border: 2px solid #000;
        box-shadow: inset -2px -2px #000;
    }

    :global(.select-container .svelte-select .list .option) {
        padding: 8px;
        border-bottom: 1px solid #000;
    }

    :global(.select-container .svelte-select .list .option:last-child) {
        border-bottom: none;
    }

    :global(.select-container .svelte-select .list .option:hover) {
        background-color: #d6d6d6;
    }

    :global(.select-container .svelte-select .list .option:active) {
        box-shadow: inset 2px 2px #000;
    }
</style>
