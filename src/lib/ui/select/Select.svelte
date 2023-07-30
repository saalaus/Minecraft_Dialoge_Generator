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

<Select {items} placeholder="Select color" clearable={false} searchable={false}>
    <div slot="item" let:item>
        <SelectItem {item} />
    </div>
</Select>
