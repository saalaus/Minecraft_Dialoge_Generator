<script>
    import Button from "../ui/Button.svelte";
    import Input from "../ui/Input.svelte";
    import ColorChoose from "../ui/ColorChoose.svelte";
    import { createClassApplier } from "rangy-classapplier";
    import InputGroup from "./InputGroup.svelte";

    export let multiple = false;
    export let additionalInput = 0;
    $: console.log(additionalInput);
    let input;
    let inputInterval;
    let selectColor;
    let input_list = [];
    $: console.log(input_list)

    const textApplier = {
        bold: createClassApplier("bold"),
        italic: createClassApplier("italic"),
        underline: createClassApplier("underline"),
        strike: createClassApplier("strike"),
        obfuscated: createClassApplier("obfuscated"),
    };
    const colorApplier = {
        white: createClassApplier("white"),
        black: createClassApplier("black"),
        dark_blue: createClassApplier("dark_blue"),
        dark_green: createClassApplier("dark_green"),
        dark_aqua: createClassApplier("dark_aqua"),
        dark_red: createClassApplier("dark_red"),
        dark_purple: createClassApplier("dark_purple"),
        gold: createClassApplier("gold"),
        gray: createClassApplier("gray"),
        dark_gray: createClassApplier("dark_gray"),
        blue: createClassApplier("blue"),
        green: createClassApplier("green"),
        aqua: createClassApplier("aqua"),
        red: createClassApplier("red"),
        light_purple: createClassApplier("light_purple"),
        yellow: createClassApplier("yellow"),
    };

    const allApplier = { ...textApplier, ...colorApplier };

    function toggleApplier(classapplier) {
        classapplier.toggleSelection();
        //input.focus()
        input.trigger();
    }

    function toggleSelection() {
        const buttons =
            document.getElementsByClassName("btn-group")[0].children;

        for (let button of buttons) {
            // @ts-ignore
            const applier = textApplier[button.dataset.edit];
            if (applier && isSelectInApplier(applier)) {
                button.classList.add("toggle");
            } else {
                button.classList.remove("toggle");
            }
        }

        let selectedColor = false;
        for (let color in colorApplier) {
            const applier = colorApplier[color];
            if (isSelectInApplier(applier)) {
                selectColor.selectItemByValue(color);
                selectedColor = true;
                break;
            }
        }
        if (!selectedColor) selectColor.selectItemByValue("white");
    }

    function isSelectInApplier(applier) {
        return applier.isAppliedToSelection();
    }

    function onfocus() {
        inputInterval = setInterval(toggleSelection, 100);
    }
    function onblur() {
        clearInterval(inputInterval);
    }
    function clearSelection() {
        for (let applier_name in allApplier) {
            const applier = allApplier[applier_name];
            if (isSelectInApplier(applier)) applier.toggleSelection();
        }
    }
    function changeColor(applier) {
        for (let color in colorApplier) {
            const applier = colorApplier[color];
            if (isSelectInApplier(applier)) {
                applier.undoToSelection();
                break;
            }
        }
        toggleApplier(applier);
        //input.focus()
        input.trigger();
    }
    /* function removeInput(e) { */
    /*     //console.log(e.target.parentNode) */
    /*     //e.target.parentNode.removeChild(e.target); */
    /*     additionalInput -= 1; */
    /* } */
</script>

<div class="editor_text-inputs">
    <div class="editor_text-input">
        <Input bind:element={input_list[0]} bind:this={input} on:focus={onfocus} on:blur={onblur} />
        {#if multiple}
            <Button class="add-input" on:click={() => (additionalInput += 1)}
                >+</Button
            >
        {/if}
    </div>
    {#each Array(additionalInput) as _, i}
        <InputGroup
            bind:element={input_list[i+1]}
            on:kill={(e) => {
                e.detail.remove();
                console.log(e)
                input_list.splice(i+1, 1)
                console.log(input_list)
                /* additionalInput -= 1; */
            }}
        />
    {/each}
</div>
<div class="text-edit">
    <div style="display: flex;" class="btn-group">
        <Button
            data_edit="bold"
            on:click={() => toggleApplier(textApplier.bold)}>B</Button
        >
        <Button
            data_edit="italic"
            on:click={() => toggleApplier(textApplier.italic)}>I</Button
        >
        <Button
            data_edit="underline"
            on:click={() => toggleApplier(textApplier.underline)}>U</Button
        >
        <Button
            data_edit="strike"
            on:click={() => toggleApplier(textApplier.strike)}>S</Button
        >
        <Button
            data_edit="obfuscated"
            on:click={() => toggleApplier(textApplier.obfuscated)}>O</Button
        >
        <Button on:click={() => clearSelection()}>R</Button>
    </div>
    <div class="color-choose_container">
        <ColorChoose
            on:change={(e) => changeColor(colorApplier[e.detail])}
            bind:this={selectColor}
        />
    </div>
</div>

<style>
    * {
        margin: 5px;
    }

    .btn-group :global(*) {
        margin: 5px;
    }

    .text-edit {
        display: flex;
        justify-content: space-evenly;
    }
    .color-choose_container {
        display: flex;
        align-items: center;
    }
    .editor_text-input {
        display: flex;
        justify-content: space-between;
    }
    .editor_text-input :global(.text-input) {
        margin-right: 5px;
    }
    .editor_text-inputs {
        overflow-y: auto;
        max-height: 200px;
    }
</style>
