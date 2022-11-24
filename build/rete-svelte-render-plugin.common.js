'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Rete = require('rete');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var Rete__default = /*#__PURE__*/_interopDefaultLegacy(Rete);

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}
function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
function get_current_component() {
    if (!current_component)
        throw new Error('Function called outside component initialization');
    return current_component;
}
/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs#run-time-svelte-onmount
 */
function onMount(fn) {
    get_current_component().$$.on_mount.push(fn);
}
/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs#run-time-svelte-ondestroy
 */
function onDestroy(fn) {
    get_current_component().$$.on_destroy.push(fn);
}
/**
 * Retrieves the context that belongs to the closest parent component with the specified `key`.
 * Must be called during component initialisation.
 *
 * https://svelte.dev/docs#run-time-svelte-getcontext
 */
function getContext(key) {
    return get_current_component().$$.context.get(key);
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function tick() {
    schedule_update();
    return resolved_promise;
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
function add_flush_callback(fn) {
    flush_callbacks.push(fn);
}
// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();
let flushidx = 0; // Do *not* move this inside the flush() function
function flush() {
    const saved_component = current_component;
    do {
        // first, call beforeUpdate functions
        // and update components
        while (flushidx < dirty_components.length) {
            const component = dirty_components[flushidx];
            flushidx++;
            set_current_component(component);
            update$1(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        flushidx = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    seen_callbacks.clear();
    set_current_component(saved_component);
}
function update$1($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
    else if (callback) {
        callback();
    }
}
function outro_and_destroy_block(block, lookup) {
    transition_out(block, 1, 1, () => {
        lookup.delete(block.key);
    });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
    let o = old_blocks.length;
    let n = list.length;
    let i = o;
    const old_indexes = {};
    while (i--)
        old_indexes[old_blocks[i].key] = i;
    const new_blocks = [];
    const new_lookup = new Map();
    const deltas = new Map();
    i = n;
    while (i--) {
        const child_ctx = get_context(ctx, list, i);
        const key = get_key(child_ctx);
        let block = lookup.get(key);
        if (!block) {
            block = create_each_block(key, child_ctx);
            block.c();
        }
        else if (dynamic) {
            block.p(child_ctx, dirty);
        }
        new_lookup.set(key, new_blocks[i] = block);
        if (key in old_indexes)
            deltas.set(key, Math.abs(i - old_indexes[key]));
    }
    const will_move = new Set();
    const did_move = new Set();
    function insert(block) {
        transition_in(block, 1);
        block.m(node, next);
        lookup.set(block.key, block);
        next = block.first;
        n--;
    }
    while (o && n) {
        const new_block = new_blocks[n - 1];
        const old_block = old_blocks[o - 1];
        const new_key = new_block.key;
        const old_key = old_block.key;
        if (new_block === old_block) {
            // do nothing
            next = new_block.first;
            o--;
            n--;
        }
        else if (!new_lookup.has(old_key)) {
            // remove old block
            destroy(old_block, lookup);
            o--;
        }
        else if (!lookup.has(new_key) || will_move.has(new_key)) {
            insert(new_block);
        }
        else if (did_move.has(old_key)) {
            o--;
        }
        else if (deltas.get(new_key) > deltas.get(old_key)) {
            did_move.add(new_key);
            insert(new_block);
        }
        else {
            will_move.add(old_key);
            o--;
        }
    }
    while (o--) {
        const old_block = old_blocks[o];
        if (!new_lookup.has(old_block.key))
            destroy(old_block, lookup);
    }
    while (n)
        insert(new_blocks[n - 1]);
    return new_blocks;
}

function bind(component, name, callback) {
    const index = component.$$.props[name];
    if (index !== undefined) {
        component.$$.bound[index] = callback;
        callback(component.$$.ctx[index]);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor, customElement) {
    const { fragment, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    if (!customElement) {
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
            // if the component was destroyed immediately
            // it will update the `$$.on_destroy` reference to `null`.
            // the destructured on_destroy may still reference to the old array
            if (component.$$.on_destroy) {
                component.$$.on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
    }
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const $$ = component.$$ = {
        fragment: null,
        ctx: [],
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        on_disconnect: [],
        before_update: [],
        after_update: [],
        context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false,
        root: options.target || parent_component.$$.root
    };
    append_styles && append_styles($$.root);
    let ready = false;
    $$.ctx = instance
        ? instance(component, options.props || {}, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor, options.customElement);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        if (!is_function(callback)) {
            return noop;
        }
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

/* src/Control.svelte generated by Svelte v3.53.1 */

function create_if_block$2(ctx) {
	let label_1;
	let t;

	return {
		c() {
			label_1 = element("label");
			t = text(/*label*/ ctx[1]);
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			append(label_1, t);
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 2) set_data(t, /*label*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(label_1);
		}
	};
}

function create_fragment$6(ctx) {
	let div;
	let t;
	let input;
	let div_class_value;
	let mounted;
	let dispose;
	let if_block = /*label*/ ctx[1] && create_if_block$2(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			t = space();
			input = element("input");
			attr(input, "type", /*type*/ ctx[2]);
			attr(div, "class", div_class_value = "" + (null_to_empty(/*controlType*/ ctx[0]) + " svelte-q8gd0p"));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append(div, t);
			append(div, input);
			/*input_binding*/ ctx[11](input);

			if (!mounted) {
				dispose = listen(input, "input", /*change*/ ctx[4]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*label*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$2(ctx);
					if_block.c();
					if_block.m(div, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*type*/ 4) {
				attr(input, "type", /*type*/ ctx[2]);
			}

			if (dirty & /*controlType*/ 1 && div_class_value !== (div_class_value = "" + (null_to_empty(/*controlType*/ ctx[0]) + " svelte-q8gd0p"))) {
				attr(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			/*input_binding*/ ctx[11](null);
			mounted = false;
			dispose();
		}
	};
}

function instance$6($$self, $$props, $$invalidate) {
	let { bindControl } = $$props;
	let { control } = $$props;
	let { controlType = 'control' } = $$props;
	let { emitter } = $$props;
	let { key } = $$props;
	let { label } = $$props;
	let { type = 'text' } = $$props;
	let { getData } = $$props;
	let { putData } = $$props;
	let el;

	onMount(() => {
		if (!control) return;
		bindControl(el, control);
		if (getData) $$invalidate(3, el.value = getData(key), el);
	});

	function change($event) {
		if (key) putData(key, $event.target.value);
		emitter.trigger('process');
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(3, el);
		});
	}

	$$self.$$set = $$props => {
		if ('bindControl' in $$props) $$invalidate(5, bindControl = $$props.bindControl);
		if ('control' in $$props) $$invalidate(6, control = $$props.control);
		if ('controlType' in $$props) $$invalidate(0, controlType = $$props.controlType);
		if ('emitter' in $$props) $$invalidate(7, emitter = $$props.emitter);
		if ('key' in $$props) $$invalidate(8, key = $$props.key);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('type' in $$props) $$invalidate(2, type = $$props.type);
		if ('getData' in $$props) $$invalidate(9, getData = $$props.getData);
		if ('putData' in $$props) $$invalidate(10, putData = $$props.putData);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*el, control, bindControl*/ 104) {
			{
				if (el && control) bindControl(el, control);
			} // console.log('CONTROL', control);
		}
	};

	return [
		controlType,
		label,
		type,
		el,
		change,
		bindControl,
		control,
		emitter,
		key,
		getData,
		putData,
		input_binding
	];
}

class Control extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$6, create_fragment$6, safe_not_equal, {
			bindControl: 5,
			control: 6,
			controlType: 0,
			emitter: 7,
			key: 8,
			label: 1,
			type: 2,
			getData: 9,
			putData: 10
		});
	}

	get bindControl() {
		return this.$$.ctx[5];
	}

	set bindControl(bindControl) {
		this.$$set({ bindControl });
		flush();
	}

	get control() {
		return this.$$.ctx[6];
	}

	set control(control) {
		this.$$set({ control });
		flush();
	}

	get controlType() {
		return this.$$.ctx[0];
	}

	set controlType(controlType) {
		this.$$set({ controlType });
		flush();
	}

	get emitter() {
		return this.$$.ctx[7];
	}

	set emitter(emitter) {
		this.$$set({ emitter });
		flush();
	}

	get key() {
		return this.$$.ctx[8];
	}

	set key(key) {
		this.$$set({ key });
		flush();
	}

	get label() {
		return this.$$.ctx[1];
	}

	set label(label) {
		this.$$set({ label });
		flush();
	}

	get type() {
		return this.$$.ctx[2];
	}

	set type(type) {
		this.$$set({ type });
		flush();
	}

	get getData() {
		return this.$$.ctx[9];
	}

	set getData(getData) {
		this.$$set({ getData });
		flush();
	}

	get putData() {
		return this.$$.ctx[10];
	}

	set putData(putData) {
		this.$$set({ putData });
		flush();
	}
}

/* src/ControlBinder.svelte generated by Svelte v3.53.1 */

function create_fragment$5(ctx) {
	let div;

	return {
		c() {
			div = element("div");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			/*div_binding*/ ctx[3](div);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[3](null);
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { bindControl } = $$props;
	let { control } = $$props;
	let el;

	onMount(() => {
		bindControl(el, control);
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$props => {
		if ('bindControl' in $$props) $$invalidate(1, bindControl = $$props.bindControl);
		if ('control' in $$props) $$invalidate(2, control = $$props.control);
	};

	return [el, bindControl, control, div_binding];
}

class ControlBinder extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$5, safe_not_equal, { bindControl: 1, control: 2 });
	}
}

/* src/DefaultableControlComponent.svelte generated by Svelte v3.53.1 */

function create_if_block$1(ctx) {
	let label_1;
	let t;

	return {
		c() {
			label_1 = element("label");
			t = text(/*label*/ ctx[1]);
			attr(label_1, "class", "svelte-1keb4qp");
		},
		m(target, anchor) {
			insert(target, label_1, anchor);
			append(label_1, t);
		},
		p(ctx, dirty) {
			if (dirty & /*label*/ 2) set_data(t, /*label*/ ctx[1]);
		},
		d(detaching) {
			if (detaching) detach(label_1);
		}
	};
}

function create_fragment$4(ctx) {
	let div;
	let t;
	let input;
	let div_class_value;
	let mounted;
	let dispose;
	let if_block = /*label*/ ctx[1] && create_if_block$1(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			t = space();
			input = element("input");
			attr(input, "type", /*type*/ ctx[2]);
			attr(input, "title", /*inputPlaceholder*/ ctx[4]);
			attr(input, "placeholder", /*inputPlaceholder*/ ctx[4]);
			attr(div, "class", div_class_value = "" + (/*controlType*/ ctx[0] + " defaultable" + " svelte-1keb4qp"));
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append(div, t);
			append(div, input);
			/*input_binding*/ ctx[13](input);

			if (!mounted) {
				dispose = listen(input, "input", /*change*/ ctx[5]);
				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*label*/ ctx[1]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(div, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*type*/ 4) {
				attr(input, "type", /*type*/ ctx[2]);
			}

			if (dirty & /*inputPlaceholder*/ 16) {
				attr(input, "title", /*inputPlaceholder*/ ctx[4]);
			}

			if (dirty & /*inputPlaceholder*/ 16) {
				attr(input, "placeholder", /*inputPlaceholder*/ ctx[4]);
			}

			if (dirty & /*controlType*/ 1 && div_class_value !== (div_class_value = "" + (/*controlType*/ ctx[0] + " defaultable" + " svelte-1keb4qp"))) {
				attr(div, "class", div_class_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			if (if_block) if_block.d();
			/*input_binding*/ ctx[13](null);
			mounted = false;
			dispose();
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let inputPlaceholder;
	let { control } = $$props;
	let { controlType = 'control' } = $$props;
	let { emitter } = $$props;
	let { key } = $$props;
	let { label } = $$props;
	let { type = 'text' } = $$props;
	let { getData } = $$props;
	let { putData } = $$props;
	let { value } = $$props;
	let el;
	let connections = control.parent.connections;

	function change($event) {
		if (key) putData(key, $event.target.value);
		emitter.trigger('process');
	}

	onMount(() => {
		emitter.on('connectioncreated connectionremoved', connection => {
			$$invalidate(12, connections = control.parent.connections);
		});

		if (value) {
			tick().then(() => {
				$$invalidate(3, el.value = value, el);
			});
		}
	});

	onDestroy(() => {
		
	});

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(3, el);
		});
	}

	$$self.$$set = $$props => {
		if ('control' in $$props) $$invalidate(6, control = $$props.control);
		if ('controlType' in $$props) $$invalidate(0, controlType = $$props.controlType);
		if ('emitter' in $$props) $$invalidate(7, emitter = $$props.emitter);
		if ('key' in $$props) $$invalidate(8, key = $$props.key);
		if ('label' in $$props) $$invalidate(1, label = $$props.label);
		if ('type' in $$props) $$invalidate(2, type = $$props.type);
		if ('getData' in $$props) $$invalidate(9, getData = $$props.getData);
		if ('putData' in $$props) $$invalidate(10, putData = $$props.putData);
		if ('value' in $$props) $$invalidate(11, value = $$props.value);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*connections*/ 4096) {
			$$invalidate(4, inputPlaceholder = connections.length === 0
			? 'Static value'
			: 'Default value');
		}
	};

	return [
		controlType,
		label,
		type,
		el,
		inputPlaceholder,
		change,
		control,
		emitter,
		key,
		getData,
		putData,
		value,
		connections,
		input_binding
	];
}

class DefaultableControlComponent extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
			control: 6,
			controlType: 0,
			emitter: 7,
			key: 8,
			label: 1,
			type: 2,
			getData: 9,
			putData: 10,
			value: 11
		});
	}

	get control() {
		return this.$$.ctx[6];
	}

	set control(control) {
		this.$$set({ control });
		flush();
	}

	get controlType() {
		return this.$$.ctx[0];
	}

	set controlType(controlType) {
		this.$$set({ controlType });
		flush();
	}

	get emitter() {
		return this.$$.ctx[7];
	}

	set emitter(emitter) {
		this.$$set({ emitter });
		flush();
	}

	get key() {
		return this.$$.ctx[8];
	}

	set key(key) {
		this.$$set({ key });
		flush();
	}

	get label() {
		return this.$$.ctx[1];
	}

	set label(label) {
		this.$$set({ label });
		flush();
	}

	get type() {
		return this.$$.ctx[2];
	}

	set type(type) {
		this.$$set({ type });
		flush();
	}

	get getData() {
		return this.$$.ctx[9];
	}

	set getData(getData) {
		this.$$set({ getData });
		flush();
	}

	get putData() {
		return this.$$.ctx[10];
	}

	set putData(putData) {
		this.$$set({ putData });
		flush();
	}

	get value() {
		return this.$$.ctx[11];
	}

	set value(value) {
		this.$$set({ value });
		flush();
	}
}

function kebab(str) {
    const replace = s => s.toLowerCase().replace(/ /g, '-');

    return Array.isArray(str) ? str.map(replace) : replace(str);
}

/* src/Socket.svelte generated by Svelte v3.53.1 */

function create_fragment$3(ctx) {
	let div;
	let div_class_value;
	let div_title_value;

	return {
		c() {
			div = element("div");
			attr(div, "class", div_class_value = "socket " + kebab(/*type*/ ctx[1]) + " " + kebab(/*socket*/ ctx[0].name) + " svelte-1nhla7k");
			attr(div, "title", div_title_value = /*socket*/ ctx[0].name);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			/*div_binding*/ ctx[6](div);
		},
		p(ctx, [dirty]) {
			if (dirty & /*type, socket*/ 3 && div_class_value !== (div_class_value = "socket " + kebab(/*type*/ ctx[1]) + " " + kebab(/*socket*/ ctx[0].name) + " svelte-1nhla7k")) {
				attr(div, "class", div_class_value);
			}

			if (dirty & /*socket*/ 1 && div_title_value !== (div_title_value = /*socket*/ ctx[0].name)) {
				attr(div, "title", div_title_value);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*div_binding*/ ctx[6](null);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	let { socket } = $$props;
	let { type } = $$props;
	let { bindSocket } = $$props;
	let { output = null } = $$props;
	let { input = null } = $$props;
	let el;

	onMount(() => {
		bindSocket(el, type, type === 'output' ? output : input);
	});

	function div_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(2, el);
		});
	}

	$$self.$$set = $$props => {
		if ('socket' in $$props) $$invalidate(0, socket = $$props.socket);
		if ('type' in $$props) $$invalidate(1, type = $$props.type);
		if ('bindSocket' in $$props) $$invalidate(3, bindSocket = $$props.bindSocket);
		if ('output' in $$props) $$invalidate(4, output = $$props.output);
		if ('input' in $$props) $$invalidate(5, input = $$props.input);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*el, bindSocket, type, output, input*/ 62) {
			{
				if (el) bindSocket(el, type, type === 'output' ? output : input);
			}
		}
	};

	return [socket, type, el, bindSocket, output, input, div_binding];
}

class Socket extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
			socket: 0,
			type: 1,
			bindSocket: 3,
			output: 4,
			input: 5
		});
	}
}

/* src/Dialogue.svelte generated by Svelte v3.53.1 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	child_ctx[11] = list;
	child_ctx[12] = i;
	return child_ctx;
}

function get_each_context_1$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	child_ctx[14] = list;
	child_ctx[12] = i;
	return child_ctx;
}

// (27:4) {#each outputs as output, index (output.key)}
function create_each_block_1$1(key_1, ctx) {
	let div1;
	let div0;
	let t0_value = /*output*/ ctx[13].name + "";
	let t0;
	let t1;
	let t2;
	let t3;
	let socket;
	let updating_socket;
	let t4;
	let current;

	function socket_socket_binding(value) {
		/*socket_socket_binding*/ ctx[7](value, /*output*/ ctx[13]);
	}

	let socket_props = {
		output: /*output*/ ctx[13],
		bindSocket: /*bindSocket*/ ctx[1],
		type: "output"
	};

	if (/*output*/ ctx[13].socket !== void 0) {
		socket_props.socket = /*output*/ ctx[13].socket;
	}

	socket = new Socket({ props: socket_props });
	binding_callbacks.push(() => bind(socket, 'socket', socket_socket_binding));

	return {
		key: key_1,
		first: null,
		c() {
			div1 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			t2 = text(/*selected*/ ctx[2]);
			t3 = space();
			create_component(socket.$$.fragment);
			t4 = space();
			attr(div0, "class", "output-title svelte-95frew");
			attr(div1, "class", "output svelte-95frew");
			this.first = div1;
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, t0);
			append(div0, t1);
			append(div0, t2);
			append(div1, t3);
			mount_component(socket, div1, null);
			append(div1, t4);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*outputs*/ 8) && t0_value !== (t0_value = /*output*/ ctx[13].name + "")) set_data(t0, t0_value);
			if (!current || dirty & /*selected*/ 4) set_data(t2, /*selected*/ ctx[2]);
			const socket_changes = {};
			if (dirty & /*outputs*/ 8) socket_changes.output = /*output*/ ctx[13];
			if (dirty & /*bindSocket*/ 2) socket_changes.bindSocket = /*bindSocket*/ ctx[1];

			if (!updating_socket && dirty & /*outputs*/ 8) {
				updating_socket = true;
				socket_changes.socket = /*output*/ ctx[13].socket;
				add_flush_callback(() => updating_socket = false);
			}

			socket.$set(socket_changes);
		},
		i(local) {
			if (current) return;
			transition_in(socket.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(socket.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(socket);
		}
	};
}

// (35:4) {#each inputs as input, index (input.key)}
function create_each_block$1(key_1, ctx) {
	let div1;
	let socket;
	let updating_socket;
	let t0;
	let div0;
	let t1_value = /*input*/ ctx[10].name + "";
	let t1;
	let t2;
	let current;

	function socket_socket_binding_1(value) {
		/*socket_socket_binding_1*/ ctx[8](value, /*input*/ ctx[10]);
	}

	let socket_props = {
		input: /*input*/ ctx[10],
		bindSocket: /*bindSocket*/ ctx[1],
		type: "input"
	};

	if (/*input*/ ctx[10].socket !== void 0) {
		socket_props.socket = /*input*/ ctx[10].socket;
	}

	socket = new Socket({ props: socket_props });
	binding_callbacks.push(() => bind(socket, 'socket', socket_socket_binding_1));

	return {
		key: key_1,
		first: null,
		c() {
			div1 = element("div");
			create_component(socket.$$.fragment);
			t0 = space();
			div0 = element("div");
			t1 = text(t1_value);
			t2 = space();
			attr(div0, "class", "input-title svelte-95frew");
			attr(div1, "class", "input svelte-95frew");
			this.first = div1;
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			mount_component(socket, div1, null);
			append(div1, t0);
			append(div1, div0);
			append(div0, t1);
			append(div1, t2);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const socket_changes = {};
			if (dirty & /*inputs*/ 16) socket_changes.input = /*input*/ ctx[10];
			if (dirty & /*bindSocket*/ 2) socket_changes.bindSocket = /*bindSocket*/ ctx[1];

			if (!updating_socket && dirty & /*inputs*/ 16) {
				updating_socket = true;
				socket_changes.socket = /*input*/ ctx[10].socket;
				add_flush_callback(() => updating_socket = false);
			}

			socket.$set(socket_changes);
			if ((!current || dirty & /*inputs*/ 16) && t1_value !== (t1_value = /*input*/ ctx[10].name + "")) set_data(t1, t1_value);
		},
		i(local) {
			if (current) return;
			transition_in(socket.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(socket.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(socket);
		}
	};
}

function create_fragment$2(ctx) {
	let div;
	let each_blocks_1 = [];
	let each0_lookup = new Map();
	let t;
	let each_blocks = [];
	let each1_lookup = new Map();
	let div_class_value;
	let current;
	let each_value_1 = /*outputs*/ ctx[3];
	const get_key = ctx => /*output*/ ctx[13].key;

	for (let i = 0; i < each_value_1.length; i += 1) {
		let child_ctx = get_each_context_1$1(ctx, each_value_1, i);
		let key = get_key(child_ctx);
		each0_lookup.set(key, each_blocks_1[i] = create_each_block_1$1(key, child_ctx));
	}

	let each_value = /*inputs*/ ctx[4];
	const get_key_1 = ctx => /*input*/ ctx[10].key;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context$1(ctx, each_value, i);
		let key = get_key_1(child_ctx);
		each1_lookup.set(key, each_blocks[i] = create_each_block$1(key, child_ctx));
	}

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", div_class_value = "node " + kebab(/*node*/ ctx[0].name) + " svelte-95frew");
			toggle_class(div, "selected", /*selected*/ ctx[2]);
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div, null);
			}

			append(div, t);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*outputs, bindSocket, selected*/ 14) {
				each_value_1 = /*outputs*/ ctx[3];
				group_outros();
				each_blocks_1 = update_keyed_each(each_blocks_1, dirty, get_key, 1, ctx, each_value_1, each0_lookup, div, outro_and_destroy_block, create_each_block_1$1, t, get_each_context_1$1);
				check_outros();
			}

			if (dirty & /*inputs, bindSocket*/ 18) {
				each_value = /*inputs*/ ctx[4];
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, each_value, each1_lookup, div, outro_and_destroy_block, create_each_block$1, null, get_each_context$1);
				check_outros();
			}

			if (!current || dirty & /*node*/ 1 && div_class_value !== (div_class_value = "node " + kebab(/*node*/ ctx[0].name) + " svelte-95frew")) {
				attr(div, "class", div_class_value);
			}

			if (!current || dirty & /*node, selected*/ 5) {
				toggle_class(div, "selected", /*selected*/ ctx[2]);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks_1[i]);
			}

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out(each_blocks_1[i]);
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].d();
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let inputs;
	let outputs;
	let { editor } = $$props;
	let { node } = $$props;
	let { bindSocket } = $$props;

	function update() {
		$$invalidate(2, selected = editor.selected.contains(node) ? "selected" : "");
	}

	let selected = '';

	function socket_socket_binding(value, output) {
		if ($$self.$$.not_equal(output.socket, value)) {
			output.socket = value;
			($$invalidate(3, outputs), $$invalidate(0, node));
		}
	}

	function socket_socket_binding_1(value, input) {
		if ($$self.$$.not_equal(input.socket, value)) {
			input.socket = value;
			($$invalidate(4, inputs), $$invalidate(0, node));
		}
	}

	$$self.$$set = $$props => {
		if ('editor' in $$props) $$invalidate(5, editor = $$props.editor);
		if ('node' in $$props) $$invalidate(0, node = $$props.node);
		if ('bindSocket' in $$props) $$invalidate(1, bindSocket = $$props.bindSocket);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*node*/ 1) {
			$$invalidate(4, inputs = Array.from(node.inputs.values()));
		}

		if ($$self.$$.dirty & /*node*/ 1) {
			$$invalidate(3, outputs = Array.from(node.outputs.values()));
		}

		if ($$self.$$.dirty & /*node*/ 1) {
			Array.from(node.controls.values());
		}
	};

	return [
		node,
		bindSocket,
		selected,
		outputs,
		inputs,
		editor,
		update,
		socket_socket_binding,
		socket_socket_binding_1
	];
}

class Dialogue extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
			editor: 5,
			node: 0,
			bindSocket: 1,
			update: 6
		});
	}

	get editor() {
		return this.$$.ctx[5];
	}

	set editor(editor) {
		this.$$set({ editor });
		flush();
	}

	get node() {
		return this.$$.ctx[0];
	}

	set node(node) {
		this.$$set({ node });
		flush();
	}

	get bindSocket() {
		return this.$$.ctx[1];
	}

	set bindSocket(bindSocket) {
		this.$$set({ bindSocket });
		flush();
	}

	get update() {
		return this.$$.ctx[6];
	}
}

/* src/FilterControlComponent.svelte generated by Svelte v3.53.1 */

function create_fragment$1(ctx) {
	let div;
	let input;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			input = element("input");
			attr(input, "title", "Filter...");
			attr(input, "placeholder", "Filter...");
			attr(div, "class", "control filter svelte-1c8vdv2");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, input);
			/*input_binding*/ ctx[4](input);

			if (!mounted) {
				dispose = listen(input, "input", /*change*/ ctx[1]);
				mounted = true;
			}
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
			/*input_binding*/ ctx[4](null);
			mounted = false;
			dispose();
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	const filter = getContext('filter');
	let { key } = $$props;
	let { control } = $$props;
	let el;

	function change($event) {
		const { value } = $event.target;
		filter.set(value);
	}

	onDestroy(() => {
		
	});

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			el = $$value;
			$$invalidate(0, el);
		});
	}

	$$self.$$set = $$props => {
		if ('key' in $$props) $$invalidate(2, key = $$props.key);
		if ('control' in $$props) $$invalidate(3, control = $$props.control);
	};

	return [el, change, key, control, input_binding];
}

class FilterControlComponent extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { key: 2, control: 3 });
	}

	get key() {
		return this.$$.ctx[2];
	}

	set key(key) {
		this.$$set({ key });
		flush();
	}

	get control() {
		return this.$$.ctx[3];
	}

	set control(control) {
		this.$$set({ control });
		flush();
	}
}

class InputControl extends Rete__default["default"].Control {
    constructor(emitter, key, readonly) {
        this.render = 'svelte';
        this.component = Control;
        this.props = {
            emitter,
            key,
            readonly
        };
    }
}

/* src/Node.svelte generated by Svelte v3.53.1 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[10] = list[i];
	child_ctx[11] = list;
	child_ctx[12] = i;
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[13] = list[i];
	return child_ctx;
}

function get_each_context_2(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	child_ctx[17] = list;
	child_ctx[12] = i;
	return child_ctx;
}

// (26:4) {#each outputs as output, index (output.key)}
function create_each_block_2(key_1, ctx) {
	let div1;
	let div0;
	let t0_value = /*output*/ ctx[16].name + "";
	let t0;
	let t1;
	let t2;
	let t3;
	let socket;
	let updating_socket;
	let t4;
	let current;

	function socket_socket_binding(value) {
		/*socket_socket_binding*/ ctx[8](value, /*output*/ ctx[16]);
	}

	let socket_props = {
		output: /*output*/ ctx[16],
		bindSocket: /*bindSocket*/ ctx[1],
		type: "output"
	};

	if (/*output*/ ctx[16].socket !== void 0) {
		socket_props.socket = /*output*/ ctx[16].socket;
	}

	socket = new Socket({ props: socket_props });
	binding_callbacks.push(() => bind(socket, 'socket', socket_socket_binding));

	return {
		key: key_1,
		first: null,
		c() {
			div1 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();
			t2 = text(/*selected*/ ctx[3]);
			t3 = space();
			create_component(socket.$$.fragment);
			t4 = space();
			attr(div0, "class", "output-title svelte-piykio");
			attr(div1, "class", "output svelte-piykio");
			this.first = div1;
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, t0);
			append(div0, t1);
			append(div0, t2);
			append(div1, t3);
			mount_component(socket, div1, null);
			append(div1, t4);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if ((!current || dirty & /*outputs*/ 32) && t0_value !== (t0_value = /*output*/ ctx[16].name + "")) set_data(t0, t0_value);
			if (!current || dirty & /*selected*/ 8) set_data(t2, /*selected*/ ctx[3]);
			const socket_changes = {};
			if (dirty & /*outputs*/ 32) socket_changes.output = /*output*/ ctx[16];
			if (dirty & /*bindSocket*/ 2) socket_changes.bindSocket = /*bindSocket*/ ctx[1];

			if (!updating_socket && dirty & /*outputs*/ 32) {
				updating_socket = true;
				socket_changes.socket = /*output*/ ctx[16].socket;
				add_flush_callback(() => updating_socket = false);
			}

			socket.$set(socket_changes);
		},
		i(local) {
			if (current) return;
			transition_in(socket.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(socket.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(socket);
		}
	};
}

// (34:4) {#each controls as control}
function create_each_block_1(ctx) {
	let controlbinder;
	let current;

	controlbinder = new ControlBinder({
			props: {
				bindControl: /*bindControl*/ ctx[2],
				control: /*control*/ ctx[13]
			}
		});

	return {
		c() {
			create_component(controlbinder.$$.fragment);
		},
		m(target, anchor) {
			mount_component(controlbinder, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const controlbinder_changes = {};
			if (dirty & /*bindControl*/ 4) controlbinder_changes.bindControl = /*bindControl*/ ctx[2];
			if (dirty & /*controls*/ 16) controlbinder_changes.control = /*control*/ ctx[13];
			controlbinder.$set(controlbinder_changes);
		},
		i(local) {
			if (current) return;
			transition_in(controlbinder.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(controlbinder.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(controlbinder, detaching);
		}
	};
}

// (44:12) {:else}
function create_else_block(ctx) {
	let controlbinder;
	let current;

	controlbinder = new ControlBinder({
			props: {
				bindControl: /*bindControl*/ ctx[2],
				control: /*input*/ ctx[10].control
			}
		});

	return {
		c() {
			create_component(controlbinder.$$.fragment);
		},
		m(target, anchor) {
			mount_component(controlbinder, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const controlbinder_changes = {};
			if (dirty & /*bindControl*/ 4) controlbinder_changes.bindControl = /*bindControl*/ ctx[2];
			if (dirty & /*inputs*/ 64) controlbinder_changes.control = /*input*/ ctx[10].control;
			controlbinder.$set(controlbinder_changes);
		},
		i(local) {
			if (current) return;
			transition_in(controlbinder.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(controlbinder.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(controlbinder, detaching);
		}
	};
}

// (42:12) {#if !input.showControl()}
function create_if_block(ctx) {
	let div;
	let t_value = /*input*/ ctx[10].name + "";
	let t;

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "input-title svelte-piykio");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);
		},
		p(ctx, dirty) {
			if (dirty & /*inputs*/ 64 && t_value !== (t_value = /*input*/ ctx[10].name + "")) set_data(t, t_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (39:4) {#each inputs as input, index (input.key)}
function create_each_block(key_1, ctx) {
	let div;
	let socket;
	let updating_socket;
	let t0;
	let show_if;
	let current_block_type_index;
	let if_block;
	let t1;
	let current;

	function socket_socket_binding_1(value) {
		/*socket_socket_binding_1*/ ctx[9](value, /*input*/ ctx[10]);
	}

	let socket_props = {
		input: /*input*/ ctx[10],
		bindSocket: /*bindSocket*/ ctx[1],
		type: "input"
	};

	if (/*input*/ ctx[10].socket !== void 0) {
		socket_props.socket = /*input*/ ctx[10].socket;
	}

	socket = new Socket({ props: socket_props });
	binding_callbacks.push(() => bind(socket, 'socket', socket_socket_binding_1));
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (dirty & /*inputs*/ 64) show_if = null;
		if (show_if == null) show_if = !!!/*input*/ ctx[10].showControl();
		if (show_if) return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx, -1);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		key: key_1,
		first: null,
		c() {
			div = element("div");
			create_component(socket.$$.fragment);
			t0 = space();
			if_block.c();
			t1 = space();
			attr(div, "class", "input svelte-piykio");
			this.first = div;
		},
		m(target, anchor) {
			insert(target, div, anchor);
			mount_component(socket, div, null);
			append(div, t0);
			if_blocks[current_block_type_index].m(div, null);
			append(div, t1);
			current = true;
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const socket_changes = {};
			if (dirty & /*inputs*/ 64) socket_changes.input = /*input*/ ctx[10];
			if (dirty & /*bindSocket*/ 2) socket_changes.bindSocket = /*bindSocket*/ ctx[1];

			if (!updating_socket && dirty & /*inputs*/ 64) {
				updating_socket = true;
				socket_changes.socket = /*input*/ ctx[10].socket;
				add_flush_callback(() => updating_socket = false);
			}

			socket.$set(socket_changes);
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx, dirty);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div, t1);
			}
		},
		i(local) {
			if (current) return;
			transition_in(socket.$$.fragment, local);
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(socket.$$.fragment, local);
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div);
			destroy_component(socket);
			if_blocks[current_block_type_index].d();
		}
	};
}

function create_fragment(ctx) {
	let div1;
	let div0;
	let t0_value = /*node*/ ctx[0].name + "";
	let t0;
	let t1;
	let each_blocks_2 = [];
	let each0_lookup = new Map();
	let t2;
	let t3;
	let each_blocks = [];
	let each2_lookup = new Map();
	let div1_class_value;
	let current;
	let each_value_2 = /*outputs*/ ctx[5];
	const get_key = ctx => /*output*/ ctx[16].key;

	for (let i = 0; i < each_value_2.length; i += 1) {
		let child_ctx = get_each_context_2(ctx, each_value_2, i);
		let key = get_key(child_ctx);
		each0_lookup.set(key, each_blocks_2[i] = create_each_block_2(key, child_ctx));
	}

	let each_value_1 = /*controls*/ ctx[4];
	let each_blocks_1 = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks_1[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks_1[i], 1, 1, () => {
		each_blocks_1[i] = null;
	});

	let each_value = /*inputs*/ ctx[6];
	const get_key_1 = ctx => /*input*/ ctx[10].key;

	for (let i = 0; i < each_value.length; i += 1) {
		let child_ctx = get_each_context(ctx, each_value, i);
		let key = get_key_1(child_ctx);
		each2_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
	}

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			t0 = text(t0_value);
			t1 = space();

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].c();
			}

			t2 = space();

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].c();
			}

			t3 = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div0, "class", "title svelte-piykio");
			attr(div1, "class", div1_class_value = "node " + kebab(/*node*/ ctx[0].name) + " svelte-piykio");
			toggle_class(div1, "selected", /*selected*/ ctx[3]);
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			append(div0, t0);
			append(div1, t1);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].m(div1, null);
			}

			append(div1, t2);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				each_blocks_1[i].m(div1, null);
			}

			append(div1, t3);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(div1, null);
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if ((!current || dirty & /*node*/ 1) && t0_value !== (t0_value = /*node*/ ctx[0].name + "")) set_data(t0, t0_value);

			if (dirty & /*outputs, bindSocket, selected*/ 42) {
				each_value_2 = /*outputs*/ ctx[5];
				group_outros();
				each_blocks_2 = update_keyed_each(each_blocks_2, dirty, get_key, 1, ctx, each_value_2, each0_lookup, div1, outro_and_destroy_block, create_each_block_2, t2, get_each_context_2);
				check_outros();
			}

			if (dirty & /*bindControl, controls*/ 20) {
				each_value_1 = /*controls*/ ctx[4];
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks_1[i]) {
						each_blocks_1[i].p(child_ctx, dirty);
						transition_in(each_blocks_1[i], 1);
					} else {
						each_blocks_1[i] = create_each_block_1(child_ctx);
						each_blocks_1[i].c();
						transition_in(each_blocks_1[i], 1);
						each_blocks_1[i].m(div1, t3);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks_1.length; i += 1) {
					out(i);
				}

				check_outros();
			}

			if (dirty & /*inputs, bindControl, bindSocket*/ 70) {
				each_value = /*inputs*/ ctx[6];
				group_outros();
				each_blocks = update_keyed_each(each_blocks, dirty, get_key_1, 1, ctx, each_value, each2_lookup, div1, outro_and_destroy_block, create_each_block, null, get_each_context);
				check_outros();
			}

			if (!current || dirty & /*node*/ 1 && div1_class_value !== (div1_class_value = "node " + kebab(/*node*/ ctx[0].name) + " svelte-piykio")) {
				attr(div1, "class", div1_class_value);
			}

			if (!current || dirty & /*node, selected*/ 9) {
				toggle_class(div1, "selected", /*selected*/ ctx[3]);
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_2.length; i += 1) {
				transition_in(each_blocks_2[i]);
			}

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks_1[i]);
			}

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			for (let i = 0; i < each_blocks_2.length; i += 1) {
				transition_out(each_blocks_2[i]);
			}

			each_blocks_1 = each_blocks_1.filter(Boolean);

			for (let i = 0; i < each_blocks_1.length; i += 1) {
				transition_out(each_blocks_1[i]);
			}

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);

			for (let i = 0; i < each_blocks_2.length; i += 1) {
				each_blocks_2[i].d();
			}

			destroy_each(each_blocks_1, detaching);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].d();
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let inputs;
	let outputs;
	let controls;
	let selected;
	let { editor } = $$props;
	let { node } = $$props;
	let { bindSocket } = $$props;
	let { bindControl } = $$props;

	function socket_socket_binding(value, output) {
		if ($$self.$$.not_equal(output.socket, value)) {
			output.socket = value;
			($$invalidate(5, outputs), $$invalidate(0, node));
		}
	}

	function socket_socket_binding_1(value, input) {
		if ($$self.$$.not_equal(input.socket, value)) {
			input.socket = value;
			($$invalidate(6, inputs), $$invalidate(0, node));
		}
	}

	$$self.$$set = $$props => {
		if ('editor' in $$props) $$invalidate(7, editor = $$props.editor);
		if ('node' in $$props) $$invalidate(0, node = $$props.node);
		if ('bindSocket' in $$props) $$invalidate(1, bindSocket = $$props.bindSocket);
		if ('bindControl' in $$props) $$invalidate(2, bindControl = $$props.bindControl);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*node*/ 1) {
			$$invalidate(6, inputs = Array.from(node.inputs.values()));
		}

		if ($$self.$$.dirty & /*node*/ 1) {
			$$invalidate(5, outputs = Array.from(node.outputs.values()));
		}

		if ($$self.$$.dirty & /*node*/ 1) {
			$$invalidate(4, controls = Array.from(node.controls.values()));
		}

		if ($$self.$$.dirty & /*editor, node*/ 129) {
			$$invalidate(3, selected = editor.selected.list[0] && editor.selected.list[0].id == node.id
			? 'selected'
			: '');
		}
	};

	return [
		node,
		bindSocket,
		bindControl,
		selected,
		controls,
		outputs,
		inputs,
		editor,
		socket_socket_binding,
		socket_socket_binding_1
	];
}

class Node extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance, create_fragment, safe_not_equal, {
			editor: 7,
			node: 0,
			bindSocket: 1,
			bindControl: 2
		});
	}

	get editor() {
		return this.$$.ctx[7];
	}

	set editor(editor) {
		this.$$set({ editor });
		flush();
	}

	get node() {
		return this.$$.ctx[0];
	}

	set node(node) {
		this.$$set({ node });
		flush();
	}

	get bindSocket() {
		return this.$$.ctx[1];
	}

	set bindSocket(bindSocket) {
		this.$$set({ bindSocket });
		flush();
	}

	get bindControl() {
		return this.$$.ctx[2];
	}

	set bindControl(bindControl) {
		this.$$set({ bindControl });
		flush();
	}
}

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
    const app = createSvelte(el, svelteComponent, svelteProps);

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

    const app = createSvelte(el, svelteComponent, svelteProps);

    control.svelteContext = app;

    return app;
}

const update = entity => {
    return new Promise(res => {
        if (!entity.svelteContext) return res();

        // entity.svelteContext.$forceUpdate();
        // entity.svelteContext.$nextTick(res);
        entity.svelteContext.update();
    });
};

function install(editor, { component: CommonSvelteComponent, options }) {
    editor.on('rendernode', ({ el, node, component, bindSocket, bindControl }) => {
        if (component.render && component.render !== 'svelte') return;

        node._svelte = createNode(
            editor,
            CommonSvelteComponent,
            { el, node, component, bindSocket, bindControl });

        node.update = Promise.resolve(update(node));
    });

    editor.on('rendercontrol', ({ el, control }) => {
        if (control.render && control.render !== 'svelte') return;

        control._svelte = createControl(editor, { el, control });
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

var index = {
    name: 'rete-svelte-render',
    install,
    Control,
    DefaultableControlComponent,
    FilterControlComponent,
    Node,
    InputControl,
    Dialogue
};

exports.ControlBinder = ControlBinder;
exports.Dialogue = Dialogue;
exports.Socket = Socket;
exports["default"] = index;
//# sourceMappingURL=rete-svelte-render-plugin.common.js.map
