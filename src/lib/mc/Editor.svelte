<script>
    import Button from "./Button.svelte";
    import Input from "./Input.svelte";
    import ColorChoose from "./ColorChoose.svelte";
    import { createClassApplier } from "rangy-classapplier"
    import { input_text } from "../stores";

    let input;
    let inputInterval;
    let selectColor;
    $: console.log($input_text)

    const textApplier = {
        bold: createClassApplier("bold"),
        italic: createClassApplier("italic"),
        underline: createClassApplier("underline"),
        strike: createClassApplier("strike"),
        obfuscated: createClassApplier("obfuscated")
    }
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
        yellow: createClassApplier("yellow")
    }

    const allApplier = {...textApplier, ...colorApplier}

    function toggleApplier(classapplier){
        classapplier.toggleSelection()
        input.focus()
        input.trigger()
    }

    function toggleSelection(){
        const buttons = document.getElementsByClassName("btn-group")[0].children
        
        for(let button of buttons){
            // @ts-ignore
            const applier = textApplier[button.dataset.edit]
            if(applier && isSelectInApplier(applier)){
                button.classList.add("toggle")
            }
            else{
                button.classList.remove("toggle")
            }
        }

        let selectedColor = false
        for (let color in colorApplier){
            const applier = colorApplier[color]
            if(isSelectInApplier(applier)){
                selectColor.selectItemByValue(color)
                selectedColor = true
                break
            }
        }
        if(!selectedColor) selectColor.selectItemByValue("white")
    }

    function isSelectInApplier(applier) {
        return applier.isAppliedToSelection();
    }

    function onfocus(){
        inputInterval = setInterval(toggleSelection, 100)
    }
    function onblur(){
        clearInterval(inputInterval)
    }
    function clearSelection(){
        for(let applier_name in allApplier){
            const applier = allApplier[applier_name]
            if (isSelectInApplier(applier)) applier.toggleSelection()
        }
    }
    function changeColor(applier){
        for (let color in colorApplier){
            const applier = colorApplier[color]
            if (isSelectInApplier(applier)){
                applier.undoToSelection()
                break
            }
        }
        toggleApplier(applier)
        input.focus()
        input.trigger()
    }
</script>

<svelte:body on:click={() => input.focus()} />

<Input bind:this={input} on:focus={onfocus} on:blur={onblur}/>
<div class="text-edit">
    <div style="display: flex;" class="btn-group">
        <Button data_edit="bold" on:click={() => toggleApplier(textApplier.bold)}>B</Button>
        <Button data_edit="italic" on:click={() => toggleApplier(textApplier.italic)}>I</Button>
        <Button data_edit="underline" on:click={() => toggleApplier(textApplier.underline)}>U</Button>
        <Button data_edit="strike" on:click={() => toggleApplier(textApplier.strike)}>S</Button>
        <Button data_edit="obfuscated" on:click={() => toggleApplier(textApplier.obfuscated)}>O</Button>
        <Button on:click={() => clearSelection()}>R</Button>
    </div>
    <div class="color-choose_container">
        <ColorChoose on:change={(e) => changeColor(colorApplier[e.detail])} bind:this={selectColor}/>
    </div>
</div>

<style>
    * {
        margin: 5px;
    }

    :global(.btn-group *) {
        margin: 5px;
    }

    .text-edit {
        display: flex;
        justify-content: space-evenly;
    }
    .color-choose_container{
        display:flex;
        align-items: center;
    }

    :global(.text-input br) {
        display: none;
    }

    :global(.text-input *) {
        display: inline;
        white-space: nowrap;
    }

    :global(.obfuscated) {
        text-shadow: 6px 2px 0px;
        padding: 0 8px 0 4px;
    }

    :global(.bold) {
        font-weight: bold;
    }

    :global(.italic) {
        font-style: italic;
    }

    :global(.strike) {
        text-decoration: line-through;
    }

    :global(.underline) {
        text-decoration: underline;
    }

    :global(.strike.underline) {
        text-decoration: underline line-through;
    }

    :global(.dark_red) {
        color: rgb(170, 0, 0);
    }

    :global(.white) {
        color: white;
    }

    :global(.black) {
        color: black;
    }

    :global(.dark_blue) {
        color: rgb(0, 0, 170);
    }

    :global(.dark_green) {
        color: rgb(0, 170, 0);
    }

    :global(.dark_aqua) {
        color: rgb(0, 170, 170);
    }

    :global(.dark_purple) {
        color: rgb(170, 0, 170);
    }

    :global(.gold) {
        color: rgb(255, 170, 0);
    }

    :global(.gray) {
        color: rgb(170, 170, 170);
    }

    :global(.dark_gray) {
        color: rgb(85, 85, 85);
    }

    :global(.blue) {
        color: rgb(85, 85, 255);
    }

    :global(.green) {
        color: rgb(85, 255, 85);
    }

    :global(.aqua) {
        color: rgb(85, 255, 255);
    }

    :global(.red) {
        color: rgb(255, 85, 85);
    }

    :global(.light_purple) {
        color: rgb(255, 85, 255);
    }

    :global(.yellow) {
        color: rgb(255, 255, 85);
    }

    :global(b) {
        font-weight: normal;
    }

    :global(i) {
        font-style: normal;
    }

    :global(u) {
        text-decoration: none;
    }
</style>
