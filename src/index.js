import Control from './Control.svelte';
import ControlBinder from './ControlBinder.svelte'
import DefaultableControlComponent from './DefaultableControlComponent.svelte';
import Dialogue from './Dialogue.svelte'
import FilterControlComponent from './FilterControlComponent.svelte';
import InputControl from './InputControl';
import Node from './Node.svelte';
import Socket from './Socket.svelte';

function createSvelte(el, SvelteComponent, props) {

    const app = new SvelteComponent({
        target: el,
        props
    });

    return app;
}

function createNode(editor, CommonSvelteComponent, { el, node, component, bindSocket, bindControl }, options) {
    const svelteComponent = component.component || CommonSvelteComponent || Node;
    const svelteProps = { ...component.props, node, editor, bindSocket, bindControl };
    const app = createSvelte(el, svelteComponent, svelteProps, options);

    node.svelteContext = app;

    return app;
}

function createControl(editor, { el, control }, options) {
    const svelteComponent = control.component;
    const svelteProps = {
        control,
        ...control.props,
        getData: control.getData.bind(control),
        putData: control.putData.bind(control)
    };

    const app = createSvelte(el, svelteComponent, svelteProps, options);

    control.svelteContext = app;

    return app;
}

const update = entity => {
    return new Promise(res => {
        if (!entity.svelteContext) return res();

        // entity.svelteContext.$forceUpdate();
        // entity.svelteContext.$nextTick(res);
        entity.svelteContext.update()
    });
};

function install(editor, { component: CommonSvelteComponent, options }) {
    editor.on('rendernode', ({ el, node, component, bindSocket, bindControl }) => {
        if (component.render && component.render !== 'svelte') return;

        node._svelte = createNode(
            editor,
            CommonSvelteComponent,
            { el, node, component, bindSocket, bindControl },
            options
        );

        node.update = Promise.resolve(update(node));
    });

    editor.on('rendercontrol', ({ el, control }) => {
        if (control.render && control.render !== 'svelte') return;

        control._svelte = createControl(editor, { el, control }, options);
        control.update = Promise.resolve(update(control));
    });

    editor.on('connectioncreated connectionremoved', connection => {
        update(connection.output.node);
        update(connection.input.node);
    });

    editor.on('nodeselected', () => {
        editor.nodes.map(update);
    });
}
// export { default as Socket } from './Socket.svelte'
// export { default as ControlBinder } from './ControlBinder.svelte'

export default {
    name: 'rete-svelte-render',
    install,
    Control,
    DefaultableControlComponent,
    FilterControlComponent,
    Node,
    InputControl,
    Dialogue
};

export { Socket, ControlBinder, Dialogue }