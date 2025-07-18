<script>

    import Button from "@ui/Button.svelte";
    import Input from "@ui/Input.svelte";
    import ColorChoose from "@ui/ColorChoose.svelte";
    import { createClassApplier } from "rangy-classapplier";
    import InputGroup from "./InputGroup.svelte";
    import { onMount } from 'svelte';
    import { Editor } from '@tiptap/core';
    import { Mark, mergeAttributes } from '@tiptap/core'
    import StarterKit from '@tiptap/starter-kit';
    import TextStyle from '@tiptap/extension-text-style';
    import Color from '@tiptap/extension-color';
    import Underline from '@tiptap/extension-underline';
    import Strike from '@tiptap/extension-strike';

    
const Obfuscated = Mark.create({
  name: 'obfuscated',

  parseHTML() {
    return [
      {
        tag: 'span.obfuscated'
      }
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes, {
      class: 'obfuscated'
    }), 0]
  },

  addCommands() {
    return {
      toggleObfuscated: () => ({ commands }) => {
        return commands.toggleMark(this.name)
      }
    }
  }
})
    let html = $state('');
    let input = $state();
    let inputInterval;
    let selectColor = $state();
    let input_list = $state([]);
    /**
     * @typedef {Object} Props
     * @property {boolean} [multiple]
     * @property {number} [additionalInput]
     * @property {any} time
     */

    /** @type {Props} */
    let { multiple = false, additionalInput = $bindable(1), time = $bindable() } = $props();

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

    export function getInput() {
        if (multiple) return [{component: input}, ...input_list];
        else return input;
    }

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

    let editor = $state();

    onMount(() => {
    editor = new Editor({
      element: document.querySelector('#editor'),
      extensions: [
        StarterKit,
        TextStyle,
        Color,
        Underline,
        Strike,
        Obfuscated
      ],
      onUpdate: ({ editor }) => {
        console.log(editor)
        html = editor.getHTML();
      }
    });
  });

  const toggleBold = () => editor.chain().focus().toggleBold().run();
  const toggleItalic = () => editor.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor.chain().focus().toggleStrike().run();
  const toggleObfuscated = () => editor.chain().focus().toggleObfuscated().run();
  const setColor = (color) => editor.chain().focus().setColor(color).run();
</script>

<div class="toolbar">
    <button onclick={toggleBold}>Bold</button>
    <button onclick={toggleItalic}>Italic</button>
    <button onclick={toggleUnderline}>Underline</button>
    <button onclick={toggleStrike}>Strike</button>
    <button onclick={toggleObfuscated}>Obfuscated</button>
    <input type="color" oninput={(e) => setColor(e.target.value)} />
</div>

<div id="editor" class="editor"></div>

<p>HTML: {html}</p>

<div class="editor_text-inputs">
    <div class="editor_text-input">
        <Input
            bind:element={input}
            {onfocus}
            {onblur}/>
        {#if multiple}
            <Button
                class="add-input"
                onclick={() => {
                    input_list = input_list.concat({ id: additionalInput });
                    // input_list = input_list
                    additionalInput += 1;
                }}>+</Button>
        {/if}
    </div>
    {#each input_list as item, i (item.id)}
        <InputGroup
            bind:element={item.component}
            onkill={(e) => {
                console.log(e);
                input_list = input_list.filter(e => e != item)
                console.log(input_list);
            }}
            id={item.id} />
    {/each}
</div>
<div class="time-container" data-hover="Delay before dialog in ticks (20 tick = 1 second)">
    <input type="number" placeholder="time" class="text-input" bind:value={time}/>

</div>
<div class="text-edit">
    <div
        style="display: flex;"
        class="btn-group">
        <Button
            data_edit="bold"
            onclick={() => toggleApplier(textApplier.bold)}>B</Button>
        <Button
            data_edit="italic"
            onclick={() => toggleApplier(textApplier.italic)}>I</Button>
        <Button
            data_edit="underline"
            onclick={() => toggleApplier(textApplier.underline)}>U</Button>
        <Button
            data_edit="strike"
            onclick={() => toggleApplier(textApplier.strike)}>S</Button>
        <Button
            data_edit="obfuscated"
            onclick={() => toggleApplier(textApplier.obfuscated)}>O</Button>
        <Button onclick={() => clearSelection()}>R</Button>
    </div>
    <div class="color-choose_container">
        <ColorChoose
            on:change={(e) => changeColor(colorApplier[e.detail])}
            bind:this={selectColor} />
    </div>
</div>

<style lang="scss">
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
        width: 200px;
    }
    .editor_text{
        &-input{
            display: flex;
            justify-content: space-between;
            & :global(.text-input){
                margin-right: 5px;
            }

            &s{
                overflow-y: auto;
                max-height: 200px;
            }

        }
    }

    .text-input{
        padding: 0.75em 0.75em 0.75em 0.75em;
        border: 0.0625em solid #a0a0a0;
        background-color: black;
        color: white;
        outline: none;
        font: 12pt "Minecraftia", sans-serif;
        white-space: nowrap;
        overflow: hidden;
        width: 50px;
        margin: 12px;
        text-align: center;
        appearance: none;

        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
        }

    }

    .time-container{
        &:before{
            content: attr(data-hover);
            visibility: hidden;
            opacity: 0;
            width: 140px;
            background-color: black;
            color: #fff;
            text-align: center;
            border-radius: 5px;
            padding: 5px 0;
            transition: opacity 1s ease-in-out;
            position: absolute;
            z-index: 1;
            left: 115px;
            top: 150px;
        }

        &:hover:before{
            opacity: 1;
            visibility: visible;
        }

    }
</style>
