/*!
* rete-svelte-render-plugin v0.1.0 
* (c) 2022  
* Released under the ISC license.
*/
function ownKeys$1(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys$1(Object(source), !0).forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys$1(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function _classCallCheck$1(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties$1(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass$1(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties$1(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties$1(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function _inherits$1(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf$1(subClass, superClass);
}
function _getPrototypeOf$1(o) {
  _getPrototypeOf$1 = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf$1(o);
}
function _setPrototypeOf$1(o, p) {
  _setPrototypeOf$1 = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf$1(o, p);
}
function _isNativeReflectConstruct$1() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
function _assertThisInitialized$1(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
function _possibleConstructorReturn$1(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return _assertThisInitialized$1(self);
}
function _createSuper$1(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct$1();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf$1(Derived),
      result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf$1(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn$1(this, result);
  };
}

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
function append_styles(target, style_sheet_id, styles) {
    const append_styles_to = get_root_for_style(target);
    if (!append_styles_to.getElementById(style_sheet_id)) {
        const style = element('style');
        style.id = style_sheet_id;
        style.textContent = styles;
        append_stylesheet(append_styles_to, style);
    }
}
function get_root_for_style(node) {
    if (!node)
        return document;
    const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
    if (root && root.host) {
        return root;
    }
    return node.ownerDocument;
}
function append_stylesheet(node, style) {
    append(node.head || node, style);
    return style.sheet;
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

function add_css$5(target) {
	append_styles(target, "svelte-q8gd0p", ".input-control.svelte-q8gd0p{z-index:1;width:calc(100% - 36px);vertical-align:middle;display:inline-block}.control.svelte-q8gd0p{padding:6px 18px}");
}

// (50:4) {#if label}
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

class Control$1 extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$6,
			create_fragment$6,
			safe_not_equal,
			{
				bindControl: 5,
				control: 6,
				controlType: 0,
				emitter: 7,
				key: 8,
				label: 1,
				type: 2,
				getData: 9,
				putData: 10
			},
			add_css$5
		);
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

function add_css$4(target) {
	append_styles(target, "svelte-1keb4qp", ".input-control.svelte-1keb4qp{z-index:1;width:calc(100% - 36px);vertical-align:middle;display:inline-block}.control.svelte-1keb4qp{padding:6px 18px}.defaultable.svelte-1keb4qp{display:flex;flex-direction:column}label.svelte-1keb4qp{color:white;display:inline-block;font-family:sans-serif;font-size:14px;line-height:24px}");
}

// (67:4) {#if label}
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

		init(
			this,
			options,
			instance$4,
			create_fragment$4,
			safe_not_equal,
			{
				control: 6,
				controlType: 0,
				emitter: 7,
				key: 8,
				label: 1,
				type: 2,
				getData: 9,
				putData: 10,
				value: 11
			},
			add_css$4
		);
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
  var replace = function replace(s) {
    return s.toLowerCase().replace(/ /g, '-');
  };
  return Array.isArray(str) ? str.map(replace) : replace(str);
}

/* src/Socket.svelte generated by Svelte v3.53.1 */

function add_css$3(target) {
	append_styles(target, "svelte-1nhla7k", ".socket.svelte-1nhla7k{display:inline-block;cursor:pointer;border:1px solid white;border-radius:12px;width:24px;height:24px;margin:6px;vertical-align:middle;background:#96b38a;z-index:2;box-sizing:border-box}.socket.svelte-1nhla7k:hover{border-width:4px}.socket.multiple.svelte-1nhla7k{border-color:yellow}.socket.output.svelte-1nhla7k{margin-right:-12px}.socket.input.svelte-1nhla7k{margin-left:-12px}");
}

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

class Socket$1 extends SvelteComponent {
	constructor(options) {
		super();

		init(
			this,
			options,
			instance$3,
			create_fragment$3,
			safe_not_equal,
			{
				socket: 0,
				type: 1,
				bindSocket: 3,
				output: 4,
				input: 5
			},
			add_css$3
		);
	}
}

/* src/Dialogue.svelte generated by Svelte v3.53.1 */

function add_css$2(target) {
	append_styles(target, "svelte-95frew", ".node.svelte-95frew.svelte-95frew{background:rgba(110, 136, 255, 0.8);border:2px solid #4e58bf;border-radius:10px;cursor:pointer;min-width:180px;height:auto;padding-bottom:6px;box-sizing:content-box;position:relative;user-select:none}.node.svelte-95frew.svelte-95frew:hover{background:rgba(130, 153, 255, 0.8)}.node.selected.svelte-95frew.svelte-95frew{background:#ffd92c;border-color:#e3c000}.node.svelte-95frew .output.svelte-95frew{text-align:right}.node.svelte-95frew .input.svelte-95frew{text-align:left;display:flex}.node.svelte-95frew .input-title.svelte-95frew,.node.svelte-95frew .output-title.svelte-95frew{vertical-align:middle;color:white;display:inline-block;font-family:sans-serif;font-size:14px;margin:6px;line-height:24px}");
}

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

	socket = new Socket$1({ props: socket_props });
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

	socket = new Socket$1({ props: socket_props });
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

		init(
			this,
			options,
			instance$2,
			create_fragment$2,
			safe_not_equal,
			{
				editor: 5,
				node: 0,
				bindSocket: 1,
				update: 6
			},
			add_css$2
		);
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

function add_css$1(target) {
	append_styles(target, "svelte-1c8vdv2", ".control.svelte-1c8vdv2{padding:6px 18px}.filter.svelte-1c8vdv2{text-align:center}");
}

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
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { key: 2, control: 3 }, add_css$1);
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

/*!
* rete v1.5.0-rc1 
* (c) 2022 Vitaliy Stoliarov 
* Released under the MIT license.
*/
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }

  return target;
}

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;

      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }

      return desc.value;
    };
  }

  return _get.apply(this, arguments);
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];

  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;

      var F = function () {};

      return {
        s: F,
        n: function () {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function (e) {
          throw e;
        },
        f: F
      };
    }

    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var normalCompletion = true,
      didErr = false,
      err;
  return {
    s: function () {
      it = it.call(o);
    },
    n: function () {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function (e) {
      didErr = true;
      err = e;
    },
    f: function () {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

var Component$1 = /*#__PURE__*/_createClass(function Component(name) {
  _classCallCheck(this, Component);

  _defineProperty(this, "name", void 0);

  _defineProperty(this, "data", {});

  _defineProperty(this, "engine", null);

  this.name = name;
});

var Node$1 = /*#__PURE__*/function () {
  function Node(name) {
    _classCallCheck(this, Node);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "id", void 0);

    _defineProperty(this, "position", [0.0, 0.0]);

    _defineProperty(this, "inputs", new Map());

    _defineProperty(this, "outputs", new Map());

    _defineProperty(this, "controls", new Map());

    _defineProperty(this, "data", {});

    _defineProperty(this, "meta", {});

    this.name = name;
    this.id = Node.incrementId();
  }

  _createClass(Node, [{
    key: "_add",
    value: function _add(list, item, prop) {
      if (list.has(item.key)) throw new Error("Item with key '".concat(item.key, "' already been added to the node"));
      if (item[prop] !== null) throw new Error('Item has already been added to some node');
      item[prop] = this;
      list.set(item.key, item);
    }
  }, {
    key: "addControl",
    value: function addControl(control) {
      this._add(this.controls, control, 'parent');

      return this;
    }
  }, {
    key: "removeControl",
    value: function removeControl(control) {
      control.parent = null;
      this.controls["delete"](control.key);
    }
  }, {
    key: "addInput",
    value: function addInput(input) {
      this._add(this.inputs, input, 'node');

      return this;
    }
  }, {
    key: "removeInput",
    value: function removeInput(input) {
      input.removeConnections();
      input.node = null;
      this.inputs["delete"](input.key);
    }
  }, {
    key: "addOutput",
    value: function addOutput(output) {
      this._add(this.outputs, output, 'node');

      return this;
    }
  }, {
    key: "removeOutput",
    value: function removeOutput(output) {
      output.removeConnections();
      output.node = null;
      this.outputs["delete"](output.key);
    }
  }, {
    key: "setMeta",
    value: function setMeta(meta) {
      this.meta = meta;
      return this;
    }
  }, {
    key: "getConnections",
    value: function getConnections() {
      var ios = [].concat(_toConsumableArray(this.inputs.values()), _toConsumableArray(this.outputs.values()));
      var connections = ios.reduce(function (arr, io) {
        return [].concat(_toConsumableArray(arr), _toConsumableArray(io.connections));
      }, []);
      return connections;
    }
  }, {
    key: "update",
    value: function update() {}
  }, {
    key: "toJSON",
    value: function toJSON() {
      var reduceIO = function reduceIO(list) {
        return Array.from(list).reduce(function (obj, _ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              key = _ref2[0],
              io = _ref2[1];

          obj[key] = io.toJSON();
          return obj;
        }, {});
      };

      return {
        'id': this.id,
        'data': this.data,
        'inputs': reduceIO(this.inputs),
        'outputs': reduceIO(this.outputs),
        'position': this.position,
        'name': this.name
      };
    }
  }], [{
    key: "incrementId",
    value: function incrementId() {
      if (!this.latestId) this.latestId = 1;else this.latestId++;
      return this.latestId;
    }
  }, {
    key: "resetId",
    value: function resetId() {
      this.latestId = 0;
    }
  }, {
    key: "fromJSON",
    value: function fromJSON(json) {
      var node = new Node(json.name);

      var _json$position = _slicedToArray(json.position, 2),
          x = _json$position[0],
          y = _json$position[1];

      node.id = json.id;
      node.data = json.data;
      node.position = [x, y];
      node.name = json.name;
      Node.latestId = Math.max(node.id, Node.latestId);
      return node;
    }
  }]);

  return Node;
}();

_defineProperty(Node$1, "latestId", 0);

var Component = /*#__PURE__*/function (_ComponentWorker) {
  _inherits(Component, _ComponentWorker);

  var _super = _createSuper(Component);

  function Component(name) {
    var _this;

    _classCallCheck(this, Component);

    _this = _super.call(this, name);

    _defineProperty(_assertThisInitialized(_this), "editor", null);

    _defineProperty(_assertThisInitialized(_this), "data", {});

    return _this;
  }

  _createClass(Component, [{
    key: "build",
    value: function () {
      var _build = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(node) {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.builder(node);

              case 2:
                return _context.abrupt("return", node);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function build(_x) {
        return _build.apply(this, arguments);
      }

      return build;
    }()
  }, {
    key: "createNode",
    value: function () {
      var _createNode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var data,
            node,
            _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                data = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
                node = new Node$1(this.name);
                node.data = data;
                _context2.next = 5;
                return this.build(node);

              case 5:
                return _context2.abrupt("return", node);

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function createNode() {
        return _createNode.apply(this, arguments);
      }

      return createNode;
    }()
  }]);

  return Component;
}(Component$1);

var Connection = /*#__PURE__*/function () {
  function Connection(output, input) {
    _classCallCheck(this, Connection);

    _defineProperty(this, "output", void 0);

    _defineProperty(this, "input", void 0);

    _defineProperty(this, "data", {});

    this.output = output;
    this.input = input;
    this.data = {};
    this.input.addConnection(this);
  }

  _createClass(Connection, [{
    key: "remove",
    value: function remove() {
      this.input.removeConnection(this);
      this.output.removeConnection(this);
    }
  }]);

  return Connection;
}();

var Control = /*#__PURE__*/function () {
  function Control(key) {
    _classCallCheck(this, Control);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "data", {});

    _defineProperty(this, "parent", null);

    if (this.constructor === Control) throw new TypeError('Can not construct abstract class');
    if (!key) throw new Error('The key parameter is missing in super() of Control ');
    this.key = key;
  }

  _createClass(Control, [{
    key: "getNode",
    value: function getNode() {
      if (this.parent === null) throw new Error('Control isn\'t added to Node/Input');
      if (this.parent instanceof Node$1) return this.parent;
      if (!this.parent.node) throw new Error('Control hasn\'t be added to Input or Node');
      return this.parent.node;
    }
  }, {
    key: "getData",
    value: function getData(key) {
      return this.getNode().data[key];
    }
  }, {
    key: "putData",
    value: function putData(key, data) {
      this.getNode().data[key] = data;
    }
  }]);

  return Control;
}();

var Emitter = /*#__PURE__*/function () {
  function Emitter(events) {
    _classCallCheck(this, Emitter);

    _defineProperty(this, "events", {});

    _defineProperty(this, "silent", false);

    this.events = events instanceof Emitter ? events.events : events.handlers;
  }

  _createClass(Emitter, [{
    key: "on",
    value: function on(names, handler) {
      var _this = this;

      var events = names instanceof Array ? names : names.split(' ');
      events.forEach(function (name) {
        if (!_this.events[name]) throw new Error("The event ".concat(name, " does not exist"));

        _this.events[name].push(handler);
      });
      return this;
    }
  }, {
    key: "trigger",
    value: function trigger(name) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!(name in this.events)) throw new Error("The event ".concat(String(name), " cannot be triggered"));
      return this.events[name].reduce(function (r, e) {
        return e(params) !== false && r;
      }, true); // return false if at least one event is false
    }
  }, {
    key: "bind",
    value: function bind(name) {
      if (this.events[name]) throw new Error("The event ".concat(name, " is already bound"));
      this.events[name] = [];
    }
  }, {
    key: "exist",
    value: function exist(name) {
      return Array.isArray(this.events[name]);
    }
  }]);

  return Emitter;
}();

var IO = /*#__PURE__*/function () {
  function IO(key, name, socket, multiConns) {
    _classCallCheck(this, IO);

    _defineProperty(this, "node", null);

    _defineProperty(this, "multipleConnections", void 0);

    _defineProperty(this, "connections", []);

    _defineProperty(this, "key", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "socket", void 0);

    this.node = null;
    this.multipleConnections = multiConns;
    this.connections = [];
    this.key = key;
    this.name = name;
    this.socket = socket;
  }

  _createClass(IO, [{
    key: "removeConnection",
    value: function removeConnection(connection) {
      this.connections.splice(this.connections.indexOf(connection), 1);
    }
  }, {
    key: "removeConnections",
    value: function removeConnections() {
      var _this = this;

      this.connections.forEach(function (connection) {
        return _this.removeConnection(connection);
      });
    }
  }]);

  return IO;
}();

var Input = /*#__PURE__*/function (_IO) {
  _inherits(Input, _IO);

  var _super = _createSuper(Input);

  function Input(key, title, socket) {
    var _this;

    var multiConns = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    _classCallCheck(this, Input);

    _this = _super.call(this, key, title, socket, multiConns);

    _defineProperty(_assertThisInitialized(_this), "control", null);

    return _this;
  }

  _createClass(Input, [{
    key: "hasConnection",
    value: function hasConnection() {
      return this.connections.length > 0;
    }
  }, {
    key: "addConnection",
    value: function addConnection(connection) {
      if (!this.multipleConnections && this.hasConnection()) throw new Error('Multiple connections not allowed');
      this.connections.push(connection);
    }
  }, {
    key: "addControl",
    value: function addControl(control) {
      this.control = control;
      control.parent = this;
    }
  }, {
    key: "showControl",
    value: function showControl() {
      return !this.hasConnection() && this.control !== null;
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        'connections': this.connections.map(function (c) {
          if (!c.output.node) throw new Error('Node not added to Output');
          return {
            node: c.output.node.id,
            output: c.output.key,
            data: c.data
          };
        })
      };
    }
  }]);

  return Input;
}(IO);

var Validator = /*#__PURE__*/function () {
  function Validator() {
    _classCallCheck(this, Validator);
  }

  _createClass(Validator, null, [{
    key: "isValidData",
    value: function isValidData(data) {
      return typeof data.id === 'string' && this.isValidId(data.id) && data.nodes instanceof Object && !(data.nodes instanceof Array);
    }
  }, {
    key: "isValidId",
    value: function isValidId(id) {
      return /^[\w-]{3,}@[0-9]+\.[0-9]+\.[0-9]+$/.test(id);
    }
  }, {
    key: "validate",
    value: function validate(id, data) {
      var id1 = id.split('@');
      var id2 = data.id.split('@');
      var msg = [];
      if (!this.isValidData(data)) msg.push('Data is not suitable');
      if (id !== data.id) msg.push('IDs not equal');
      if (id1[0] !== id2[0]) msg.push('Names don\'t match');
      if (id1[1] !== id2[1]) msg.push('Versions don\'t match');
      return {
        success: Boolean(!msg.length),
        msg: msg.join('. ')
      };
    }
  }]);

  return Validator;
}();

var Context = /*#__PURE__*/function (_Emitter) {
  _inherits(Context, _Emitter);

  var _super = _createSuper(Context);

  function Context(id, events) {
    var _this;

    _classCallCheck(this, Context);

    _this = _super.call(this, events);

    _defineProperty(_assertThisInitialized(_this), "id", void 0);

    _defineProperty(_assertThisInitialized(_this), "plugins", void 0);

    _defineProperty(_assertThisInitialized(_this), "components", void 0);

    if (!Validator.isValidId(id)) throw new Error('ID should be valid to name@0.1.0 format');
    _this.id = id;
    _this.plugins = new Map();
    _this.components = new Map();
    return _this;
  }

  _createClass(Context, [{
    key: "use",
    value: function use(plugin, options) {
      if (plugin.name && this.plugins.has(plugin.name)) throw new Error("Plugin ".concat(plugin.name, " already in use"));
      plugin.install(this, options || {});
      this.plugins.set(plugin.name, options);
    }
  }, {
    key: "register",
    value: function register(component) {
      if (this.components.has(component.name)) throw new Error("Component ".concat(component.name, " already registered"));
      this.components.set(component.name, component);
      this.trigger('componentregister', component);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.trigger('destroy');
    }
  }]);

  return Context;
}(Emitter);

function listenWindow(event, handler) {
  window.addEventListener(event, handler);
  return function () {
    window.removeEventListener(event, handler);
  };
}

var Drag = /*#__PURE__*/function () {
  function Drag(el) {
    var onTranslate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (_x, _y, _e) {};
    var onStart = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (_e) {};
    var onDrag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function (_e) {};

    _classCallCheck(this, Drag);

    this.onTranslate = onTranslate;
    this.onStart = onStart;
    this.onDrag = onDrag;

    _defineProperty(this, "pointerStart", void 0);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "destroy", void 0);

    this.pointerStart = null;
    this.el = el;
    this.el.style.touchAction = 'none';
    this.el.addEventListener('pointerdown', this.down.bind(this));
    var destroyMove = listenWindow('pointermove', this.move.bind(this));
    var destroyUp = listenWindow('pointerup', this.up.bind(this));

    this.destroy = function () {
      destroyMove();
      destroyUp();
    };
  }

  _createClass(Drag, [{
    key: "down",
    value: function down(e) {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      e.stopPropagation();
      this.pointerStart = [e.pageX, e.pageY];
      this.onStart(e);
    }
  }, {
    key: "move",
    value: function move(e) {
      if (!this.pointerStart) return;
      e.preventDefault();
      var _ref = [e.pageX, e.pageY],
          x = _ref[0],
          y = _ref[1];
      var delta = [x - this.pointerStart[0], y - this.pointerStart[1]];
      var zoom = this.el.getBoundingClientRect().width / this.el.offsetWidth;
      this.onTranslate(delta[0] / zoom, delta[1] / zoom, e);
    }
  }, {
    key: "up",
    value: function up(e) {
      if (!this.pointerStart) return;
      this.pointerStart = null;
      this.onDrag(e);
    }
  }]);

  return Drag;
}();

var Zoom = /*#__PURE__*/function () {
  function Zoom(container, el, intensity, onzoom) {
    _classCallCheck(this, Zoom);

    _defineProperty(this, "el", void 0);

    _defineProperty(this, "intensity", void 0);

    _defineProperty(this, "onzoom", void 0);

    _defineProperty(this, "previous", null);

    _defineProperty(this, "pointers", []);

    _defineProperty(this, "destroy", void 0);

    this.el = el;
    this.intensity = intensity;
    this.onzoom = onzoom;
    container.addEventListener('wheel', this.wheel.bind(this));
    container.addEventListener('pointerdown', this.down.bind(this));
    container.addEventListener('dblclick', this.dblclick.bind(this));
    var destroyMove = listenWindow('pointermove', this.move.bind(this));
    var destroyUp = listenWindow('pointerup', this.end.bind(this));
    var destroyCancel = listenWindow('pointercancel', this.end.bind(this));

    this.destroy = function () {
      destroyMove();
      destroyUp();
      destroyCancel();
    };
  }

  _createClass(Zoom, [{
    key: "translating",
    get: function get() {
      // is translating while zoom (works on multitouch)
      return this.pointers.length >= 2;
    }
  }, {
    key: "wheel",
    value: function wheel(e) {
      e.preventDefault();
      var rect = this.el.getBoundingClientRect();
      var isNegative = e.deltaY < 0;
      var delta = isNegative ? this.intensity : -this.intensity;
      var ox = (rect.left - e.clientX) * delta;
      var oy = (rect.top - e.clientY) * delta;
      this.onzoom(delta, ox, oy, 'wheel');
    }
  }, {
    key: "touches",
    value: function touches() {
      var e = {
        touches: this.pointers
      };
      var _ref = [e.touches[0].clientX, e.touches[0].clientY],
          x1 = _ref[0],
          y1 = _ref[1];
      var _ref2 = [e.touches[1].clientX, e.touches[1].clientY],
          x2 = _ref2[0],
          y2 = _ref2[1];
      var distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
      return {
        cx: (x1 + x2) / 2,
        cy: (y1 + y2) / 2,
        distance: distance
      };
    }
  }, {
    key: "down",
    value: function down(e) {
      this.pointers.push(e);
    }
  }, {
    key: "move",
    value: function move(e) {
      this.pointers = this.pointers.map(function (p) {
        return p.pointerId === e.pointerId ? e : p;
      });
      if (!this.translating) return;
      var rect = this.el.getBoundingClientRect();

      var _this$touches = this.touches(),
          cx = _this$touches.cx,
          cy = _this$touches.cy,
          distance = _this$touches.distance;

      if (this.previous !== null) {
        var delta = distance / this.previous.distance - 1;
        var ox = (rect.left - cx) * delta;
        var oy = (rect.top - cy) * delta;
        this.onzoom(delta, ox - (this.previous.cx - cx), oy - (this.previous.cy - cy), 'touch');
      }

      this.previous = {
        cx: cx,
        cy: cy,
        distance: distance
      };
    }
  }, {
    key: "end",
    value: function end(e) {
      this.previous = null;
      this.pointers = this.pointers.filter(function (p) {
        return p.pointerId !== e.pointerId;
      });
    }
  }, {
    key: "dblclick",
    value: function dblclick(e) {
      e.preventDefault();
      var rect = this.el.getBoundingClientRect();
      var delta = 4 * this.intensity;
      var ox = (rect.left - e.clientX) * delta;
      var oy = (rect.top - e.clientY) * delta;
      this.onzoom(delta, ox, oy, 'dblclick');
    }
  }]);

  return Zoom;
}();

var Area = /*#__PURE__*/function (_Emitter) {
  _inherits(Area, _Emitter);

  var _super = _createSuper(Area);

  function Area(container, emitter) {
    var _this;

    _classCallCheck(this, Area);

    _this = _super.call(this, emitter);

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "transform", {
      k: 1,
      x: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_this), "mouse", {
      x: 0,
      y: 0
    });

    _defineProperty(_assertThisInitialized(_this), "_startPosition", null);

    _defineProperty(_assertThisInitialized(_this), "_zoom", void 0);

    _defineProperty(_assertThisInitialized(_this), "_drag", void 0);

    var el = _this.el = document.createElement('div');
    _this.container = container;
    el.style.transformOrigin = '0 0';
    _this._zoom = new Zoom(container, el, 0.1, _this.onZoom.bind(_assertThisInitialized(_this)));
    _this._drag = new Drag(container, _this.onTranslate.bind(_assertThisInitialized(_this)), _this.onStart.bind(_assertThisInitialized(_this)));
    emitter.on('destroy', function () {
      _this._zoom.destroy();

      _this._drag.destroy();
    });

    _this.container.addEventListener('pointermove', _this.pointermove.bind(_assertThisInitialized(_this)));

    _this.update();

    return _this;
  }

  _createClass(Area, [{
    key: "update",
    value: function update() {
      var t = this.transform;
      this.el.style.transform = "translate(".concat(t.x, "px, ").concat(t.y, "px) scale(").concat(t.k, ")");
    }
  }, {
    key: "pointermove",
    value: function pointermove(e) {
      var clientX = e.clientX,
          clientY = e.clientY;
      var rect = this.el.getBoundingClientRect();
      var x = clientX - rect.left;
      var y = clientY - rect.top;
      var k = this.transform.k;
      this.mouse = {
        x: x / k,
        y: y / k
      };
      this.trigger('mousemove', _objectSpread2({}, this.mouse)); // TODO rename on `pointermove`
    }
  }, {
    key: "onStart",
    value: function onStart() {
      this._startPosition = _objectSpread2({}, this.transform);
    }
  }, {
    key: "onTranslate",
    value: function onTranslate(dx, dy) {
      if (this._zoom.translating) return; // lock translation while zoom on multitouch

      if (this._startPosition) this.translate(this._startPosition.x + dx, this._startPosition.y + dy);
    }
  }, {
    key: "onZoom",
    value: function onZoom(delta, ox, oy, source) {
      this.zoom(this.transform.k * (1 + delta), ox, oy, source);
      this.update();
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      var params = {
        transform: this.transform,
        x: x,
        y: y
      };
      if (!this.trigger('translate', params)) return;
      this.transform.x = params.x;
      this.transform.y = params.y;
      this.update();
      this.trigger('translated');
    }
  }, {
    key: "zoom",
    value: function zoom(_zoom) {
      var ox = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var oy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var source = arguments.length > 3 ? arguments[3] : undefined;
      var k = this.transform.k;
      var params = {
        transform: this.transform,
        zoom: _zoom,
        source: source
      };
      if (!this.trigger('zoom', params)) return;
      var d = (k - params.zoom) / (k - _zoom || 1);
      this.transform.k = params.zoom || 1;
      this.transform.x += ox * d;
      this.transform.y += oy * d;
      this.update();
      this.trigger('zoomed', {
        source: source
      });
    }
  }, {
    key: "appendChild",
    value: function appendChild(el) {
      this.el.appendChild(el);
    }
  }, {
    key: "removeChild",
    value: function removeChild(el) {
      this.el.removeChild(el);
    }
  }]);

  return Area;
}(Emitter);

var ConnectionView = /*#__PURE__*/function (_Emitter) {
  _inherits(ConnectionView, _Emitter);

  var _super = _createSuper(ConnectionView);

  function ConnectionView(connection, inputNode, outputNode, emitter) {
    var _this;

    _classCallCheck(this, ConnectionView);

    _this = _super.call(this, emitter);

    _defineProperty(_assertThisInitialized(_this), "connection", void 0);

    _defineProperty(_assertThisInitialized(_this), "inputNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "outputNode", void 0);

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _this.connection = connection;
    _this.inputNode = inputNode;
    _this.outputNode = outputNode;
    _this.el = document.createElement('div');
    _this.el.style.position = 'absolute';
    _this.el.style.zIndex = '-1';

    _this.trigger('renderconnection', {
      el: _this.el,
      connection: _this.connection,
      points: _this.getPoints()
    });

    return _this;
  }

  _createClass(ConnectionView, [{
    key: "getPoints",
    value: function getPoints() {
      var _this$connection = this.connection,
          input = _this$connection.input,
          output = _this$connection.output;

      if (this.inputNode.hasSocket(input) && this.outputNode.hasSocket(output)) {
        var _this$outputNode$getS = this.outputNode.getSocketPosition(output),
            _this$outputNode$getS2 = _slicedToArray(_this$outputNode$getS, 2),
            x1 = _this$outputNode$getS2[0],
            y1 = _this$outputNode$getS2[1];

        var _this$inputNode$getSo = this.inputNode.getSocketPosition(input),
            _this$inputNode$getSo2 = _slicedToArray(_this$inputNode$getSo, 2),
            x2 = _this$inputNode$getSo2[0],
            y2 = _this$inputNode$getSo2[1];

        return [x1, y1, x2, y2];
      }

      return [0, 0, 0, 0];
    }
  }, {
    key: "update",
    value: function update() {
      this.trigger('updateconnection', {
        el: this.el,
        connection: this.connection,
        points: this.getPoints()
      });
    }
  }]);

  return ConnectionView;
}(Emitter);

var ControlView = /*#__PURE__*/function (_Emitter) {
  _inherits(ControlView, _Emitter);

  var _super = _createSuper(ControlView);

  function ControlView(el, control, emitter) {
    var _this;

    _classCallCheck(this, ControlView);

    _this = _super.call(this, emitter);

    _this.trigger('rendercontrol', {
      el: el,
      control: control
    });

    return _this;
  }

  return _createClass(ControlView);
}(Emitter);

var SocketView = /*#__PURE__*/function (_Emitter) {
  _inherits(SocketView, _Emitter);

  var _super = _createSuper(SocketView);

  function SocketView(el, type, io, node, emitter) {
    var _this$trigger;

    var _this;

    _classCallCheck(this, SocketView);

    _this = _super.call(this, emitter);

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _defineProperty(_assertThisInitialized(_this), "type", void 0);

    _defineProperty(_assertThisInitialized(_this), "io", void 0);

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    _this.el = el;
    _this.type = type;
    _this.io = io;
    _this.node = node;

    _this.trigger('rendersocket', (_this$trigger = {
      el: el
    }, _defineProperty(_this$trigger, type, _this.io), _defineProperty(_this$trigger, "socket", io.socket), _this$trigger));

    return _this;
  }

  _createClass(SocketView, [{
    key: "getPosition",
    value: function getPosition(_ref) {
      var position = _ref.position;
      var el = this.el;
      return [position[0] + el.offsetLeft + el.offsetWidth / 2, position[1] + el.offsetTop + el.offsetHeight / 2];
    }
  }]);

  return SocketView;
}(Emitter);

var NodeView = /*#__PURE__*/function (_Emitter) {
  _inherits(NodeView, _Emitter);

  var _super = _createSuper(NodeView);

  function NodeView(node, component, emitter) {
    var _this;

    _classCallCheck(this, NodeView);

    _this = _super.call(this, emitter);

    _defineProperty(_assertThisInitialized(_this), "node", void 0);

    _defineProperty(_assertThisInitialized(_this), "component", void 0);

    _defineProperty(_assertThisInitialized(_this), "sockets", new Map());

    _defineProperty(_assertThisInitialized(_this), "controls", new Map());

    _defineProperty(_assertThisInitialized(_this), "el", void 0);

    _defineProperty(_assertThisInitialized(_this), "_startPosition", []);

    _defineProperty(_assertThisInitialized(_this), "_drag", void 0);

    _this.node = node;
    _this.component = component;
    _this.el = document.createElement('div');
    _this.el.style.position = 'absolute';

    _this.el.addEventListener('contextmenu', function (e) {
      return _this.trigger('contextmenu', {
        e: e,
        node: _this.node
      });
    });

    _this._drag = new Drag(_this.el, _this.onTranslate.bind(_assertThisInitialized(_this)), _this.onSelect.bind(_assertThisInitialized(_this)), function () {
      _this.trigger('nodedraged', node);

      _this.trigger('nodedragged', node);
    });

    _this.trigger('rendernode', {
      el: _this.el,
      node: node,
      component: component.data,
      bindSocket: _this.bindSocket.bind(_assertThisInitialized(_this)),
      bindControl: _this.bindControl.bind(_assertThisInitialized(_this))
    });

    _this.update();

    return _this;
  }

  _createClass(NodeView, [{
    key: "clearSockets",
    value: function clearSockets() {
      var _this2 = this;

      var ios = [].concat(_toConsumableArray(this.node.inputs.values()), _toConsumableArray(this.node.outputs.values()));
      this.sockets.forEach(function (s) {
        if (!ios.includes(s.io)) _this2.sockets["delete"](s.io);
      });
    }
  }, {
    key: "bindSocket",
    value: function bindSocket(el, type, io) {
      this.clearSockets();
      this.sockets.set(io, new SocketView(el, type, io, this.node, this));
    }
  }, {
    key: "bindControl",
    value: function bindControl(el, control) {
      this.controls.set(control, new ControlView(el, control, this));
    }
  }, {
    key: "hasSocket",
    value: function hasSocket(io) {
      return this.sockets.has(io);
    }
  }, {
    key: "getSocketPosition",
    value: function getSocketPosition(io) {
      var socket = this.sockets.get(io);
      if (!socket) throw new Error("Socket not found for ".concat(io.name, " with key ").concat(io.key));
      return socket.getPosition(this.node);
    }
  }, {
    key: "onSelect",
    value: function onSelect(e) {
      var payload = {
        node: this.node,
        accumulate: e.ctrlKey,
        e: e
      };
      this.onStart();
      this.trigger('multiselectnode', payload);
      this.trigger('selectnode', payload);
    }
  }, {
    key: "onStart",
    value: function onStart() {
      this._startPosition = _toConsumableArray(this.node.position);
    }
  }, {
    key: "onTranslate",
    value: function onTranslate(dx, dy) {
      this.trigger('translatenode', {
        node: this.node,
        dx: dx,
        dy: dy
      });
    }
  }, {
    key: "onDrag",
    value: function onDrag(dx, dy) {
      var x = this._startPosition[0] + dx;
      var y = this._startPosition[1] + dy;
      this.translate(x, y);
    }
  }, {
    key: "translate",
    value: function translate(x, y) {
      var node = this.node;
      var params = {
        node: node,
        x: x,
        y: y
      };
      if (!this.trigger('nodetranslate', params)) return;

      var _node$position = _slicedToArray(node.position, 2),
          px = _node$position[0],
          py = _node$position[1];

      var prev = [px, py];
      node.position[0] = params.x;
      node.position[1] = params.y;
      this.update();
      this.trigger('nodetranslated', {
        node: node,
        prev: prev
      });
    }
  }, {
    key: "update",
    value: function update() {
      var _this$node$position = _slicedToArray(this.node.position, 2),
          x = _this$node$position[0],
          y = _this$node$position[1];

      this.el.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
    }
  }, {
    key: "remove",
    value: function remove() {}
  }, {
    key: "destroy",
    value: function destroy() {
      this._drag.destroy();
    }
  }]);

  return NodeView;
}(Emitter);

var EditorView = /*#__PURE__*/function (_Emitter) {
  _inherits(EditorView, _Emitter);

  var _super = _createSuper(EditorView);

  // eslint-disable-next-line max-statements
  function EditorView(container, components, emitter) {
    var _this;

    _classCallCheck(this, EditorView);

    _this = _super.call(this, emitter);

    _defineProperty(_assertThisInitialized(_this), "container", void 0);

    _defineProperty(_assertThisInitialized(_this), "components", void 0);

    _defineProperty(_assertThisInitialized(_this), "nodes", new Map());

    _defineProperty(_assertThisInitialized(_this), "connections", new Map());

    _defineProperty(_assertThisInitialized(_this), "area", void 0);

    _this.container = container;
    _this.components = components;
    _this.container.style.overflow = 'hidden';

    _this.container.addEventListener('click', _this.click.bind(_assertThisInitialized(_this)));

    _this.container.addEventListener('contextmenu', function (e) {
      return _this.trigger('contextmenu', {
        e: e,
        view: _assertThisInitialized(_this)
      });
    });

    emitter.on('destroy', listenWindow('resize', _this.resize.bind(_assertThisInitialized(_this))));
    emitter.on('destroy', function () {
      return _this.nodes.forEach(function (view) {
        return view.destroy();
      });
    });

    _this.on('nodetranslated', _this.updateConnections.bind(_assertThisInitialized(_this)));

    _this.on('rendersocket', function (_ref) {
      var socket = _ref.socket;
      var connections = Array.from(_this.connections.entries());
      var relatedConnections = connections.filter(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 1),
            connection = _ref3[0];

        var input = connection.input,
            output = connection.output;
        return [input.socket, output.socket].includes(socket);
      });
      relatedConnections.forEach(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2);
            _ref5[0];
            var view = _ref5[1];

        return requestAnimationFrame(function () {
          return view.update();
        });
      });
    });

    _this.area = new Area(container, _assertThisInitialized(_this));

    _this.container.appendChild(_this.area.el);

    return _this;
  }

  _createClass(EditorView, [{
    key: "addNode",
    value: function addNode(node) {
      var component = this.components.get(node.name);
      if (!component) throw new Error("Component ".concat(node.name, " not found"));
      var nodeView = new NodeView(node, component, this);
      this.nodes.set(node, nodeView);
      this.area.appendChild(nodeView.el);
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      var nodeView = this.nodes.get(node);
      this.nodes["delete"](node);

      if (nodeView) {
        this.area.removeChild(nodeView.el);
        nodeView.destroy();
      }
    }
  }, {
    key: "addConnection",
    value: function addConnection(connection) {
      if (!connection.input.node || !connection.output.node) throw new Error('Connection input or output not added to node');
      var viewInput = this.nodes.get(connection.input.node);
      var viewOutput = this.nodes.get(connection.output.node);
      if (!viewInput || !viewOutput) throw new Error('View node not found for input or output');
      var connView = new ConnectionView(connection, viewInput, viewOutput, this);
      this.connections.set(connection, connView);
      this.area.appendChild(connView.el);
    }
  }, {
    key: "removeConnection",
    value: function removeConnection(connection) {
      var connView = this.connections.get(connection);
      this.connections["delete"](connection);
      if (connView) this.area.removeChild(connView.el);
    }
  }, {
    key: "updateConnections",
    value: function updateConnections(_ref6) {
      var _this2 = this;

      var node = _ref6.node;
      node.getConnections().forEach(function (conn) {
        var connView = _this2.connections.get(conn);

        if (!connView) throw new Error('Connection view not found');
        connView.update();
      });
    }
  }, {
    key: "resize",
    value: function resize() {
      var container = this.container;
      if (!container.parentElement) throw new Error('Container doesn\'t have parent element');
      var width = container.parentElement.clientWidth;
      var height = container.parentElement.clientHeight;
      container.style.width = width + 'px';
      container.style.height = height + 'px';
    }
  }, {
    key: "click",
    value: function click(e) {
      var container = this.container;
      if (container !== e.target) return;
      if (!this.trigger('click', {
        e: e,
        container: container
      })) return;
    }
  }]);

  return EditorView;
}(Emitter);

var Selected = /*#__PURE__*/function () {
  function Selected() {
    _classCallCheck(this, Selected);

    _defineProperty(this, "list", []);
  }

  _createClass(Selected, [{
    key: "add",
    value: function add(item) {
      var accumulate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!accumulate) this.list = [item];else if (!this.contains(item)) this.list.push(item);
    }
  }, {
    key: "clear",
    value: function clear() {
      this.list = [];
    }
  }, {
    key: "remove",
    value: function remove(item) {
      this.list.splice(this.list.indexOf(item), 1);
    }
  }, {
    key: "contains",
    value: function contains(item) {
      return this.list.indexOf(item) !== -1;
    }
  }, {
    key: "each",
    value: function each(callback) {
      this.list.forEach(callback);
    }
  }]);

  return Selected;
}();

var Events = /*#__PURE__*/_createClass(function Events(handlers) {
  _classCallCheck(this, Events);

  _defineProperty(this, "handlers", void 0);

  this.handlers = _objectSpread2({
    warn: [console.warn],
    error: [console.error],
    componentregister: [],
    destroy: []
  }, handlers);
});

var EditorEvents = /*#__PURE__*/function (_Events) {
  _inherits(EditorEvents, _Events);

  var _super = _createSuper(EditorEvents);

  function EditorEvents() {
    _classCallCheck(this, EditorEvents);

    return _super.call(this, {
      nodecreate: [],
      nodecreated: [],
      noderemove: [],
      noderemoved: [],
      connectioncreate: [],
      connectioncreated: [],
      connectionremove: [],
      connectionremoved: [],
      translatenode: [],
      nodetranslate: [],
      nodetranslated: [],
      nodedraged: [],
      nodedragged: [],
      selectnode: [],
      multiselectnode: [],
      nodeselect: [],
      nodeselected: [],
      rendernode: [],
      rendersocket: [],
      rendercontrol: [],
      renderconnection: [],
      updateconnection: [],
      keydown: [],
      keyup: [],
      translate: [],
      translated: [],
      zoom: [],
      zoomed: [],
      click: [],
      mousemove: [],
      contextmenu: [],
      "import": [],
      "export": [],
      process: [],
      clear: []
    });
  }

  return _createClass(EditorEvents);
}(Events);

var NodeEditor = /*#__PURE__*/function (_Context) {
  _inherits(NodeEditor, _Context);

  var _super = _createSuper(NodeEditor);

  function NodeEditor(id, container) {
    var _this;

    _classCallCheck(this, NodeEditor);

    _this = _super.call(this, id, new EditorEvents());

    _defineProperty(_assertThisInitialized(_this), "nodes", []);

    _defineProperty(_assertThisInitialized(_this), "selected", new Selected());

    _defineProperty(_assertThisInitialized(_this), "view", void 0);

    _this.view = new EditorView(container, _this.components, _assertThisInitialized(_this));

    _this.on('destroy', listenWindow('keydown', function (e) {
      return _this.trigger('keydown', e);
    }));

    _this.on('destroy', listenWindow('keyup', function (e) {
      return _this.trigger('keyup', e);
    }));

    _this.on('selectnode', function (_ref) {
      var node = _ref.node,
          accumulate = _ref.accumulate;
      return _this.selectNode(node, accumulate);
    });

    _this.on('nodeselected', function () {
      return _this.selected.each(function (n) {
        var nodeView = _this.view.nodes.get(n);

        nodeView && nodeView.onStart();
      });
    });

    _this.on('translatenode', function (_ref2) {
      var dx = _ref2.dx,
          dy = _ref2.dy;
      return _this.selected.each(function (n) {
        var nodeView = _this.view.nodes.get(n);

        nodeView && nodeView.onDrag(dx, dy);
      });
    });

    return _this;
  }

  _createClass(NodeEditor, [{
    key: "addNode",
    value: function addNode(node) {
      if (!this.trigger('nodecreate', node)) return;
      this.nodes.push(node);
      this.view.addNode(node);
      this.trigger('nodecreated', node);
    }
  }, {
    key: "removeNode",
    value: function removeNode(node) {
      var _this2 = this;

      if (!this.trigger('noderemove', node)) return;
      node.getConnections().forEach(function (c) {
        return _this2.removeConnection(c);
      });
      this.nodes.splice(this.nodes.indexOf(node), 1);
      this.view.removeNode(node);
      this.trigger('noderemoved', node);
    }
  }, {
    key: "connect",
    value: function connect(output, input) {
      var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!this.trigger('connectioncreate', {
        output: output,
        input: input
      })) return;

      try {
        var connection = output.connectTo(input);
        connection.data = data;
        this.view.addConnection(connection);
        this.trigger('connectioncreated', connection);
      } catch (e) {
        this.trigger('warn', e);
      }
    }
  }, {
    key: "removeConnection",
    value: function removeConnection(connection) {
      if (!this.trigger('connectionremove', connection)) return;
      this.view.removeConnection(connection);
      connection.remove();
      this.trigger('connectionremoved', connection);
    }
  }, {
    key: "selectNode",
    value: function selectNode(node) {
      var accumulate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (this.nodes.indexOf(node) === -1) throw new Error('Node not exist in list');
      if (!this.trigger('nodeselect', node)) return;
      this.selected.add(node, accumulate);
      this.trigger('nodeselected', node);
    }
  }, {
    key: "getComponent",
    value: function getComponent(name) {
      var component = this.components.get(name);
      if (!component) throw "Component ".concat(name, " not found");
      return component;
    }
  }, {
    key: "register",
    value: function register(component) {
      _get(_getPrototypeOf(NodeEditor.prototype), "register", this).call(this, component);

      component.editor = this;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this3 = this;

      _toConsumableArray(this.nodes).forEach(function (node) {
        return _this3.removeNode(node);
      });

      this.trigger('clear');
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {
        id: this.id,
        nodes: {}
      };
      this.nodes.forEach(function (node) {
        return data.nodes[node.id] = node.toJSON();
      });
      this.trigger('export', data);
      return data;
    }
  }, {
    key: "beforeImport",
    value: function beforeImport(json) {
      var checking = Validator.validate(this.id, json);

      if (!checking.success) {
        this.trigger('warn', checking.msg);
        return false;
      }

      this.silent = true;
      this.clear();
      this.trigger('import', json);
      return true;
    }
  }, {
    key: "afterImport",
    value: function afterImport() {
      this.silent = false;
      return true;
    }
  }, {
    key: "fromJSON",
    value: function () {
      var _fromJSON = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(json) {
        var _this4 = this;

        var nodes;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (this.beforeImport(json)) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", false);

              case 2:
                nodes = {};
                _context2.prev = 3;
                _context2.next = 6;
                return Promise.all(Object.keys(json.nodes).map( /*#__PURE__*/function () {
                  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
                    var node, component;
                    return _regeneratorRuntime().wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            node = json.nodes[id];
                            component = _this4.getComponent(node.name);
                            _context.next = 4;
                            return component.build(Node$1.fromJSON(node));

                          case 4:
                            nodes[id] = _context.sent;

                            _this4.addNode(nodes[id]);

                          case 6:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));

                  return function (_x2) {
                    return _ref3.apply(this, arguments);
                  };
                }()));

              case 6:
                Object.keys(json.nodes).forEach(function (id) {
                  var jsonNode = json.nodes[id];
                  var node = nodes[id];
                  Object.keys(jsonNode.outputs).forEach(function (key) {
                    var outputJson = jsonNode.outputs[key];
                    outputJson.connections.forEach(function (jsonConnection) {
                      var nodeId = jsonConnection.node;
                      var data = jsonConnection.data;
                      var targetOutput = node.outputs.get(key);
                      var targetInput = nodes[nodeId].inputs.get(jsonConnection.input);

                      if (!targetOutput || !targetInput) {
                        return _this4.trigger('error', "IO not found for node ".concat(node.id));
                      }

                      _this4.connect(targetOutput, targetInput, data);
                    });
                  });
                });
                _context2.next = 13;
                break;

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](3);
                this.trigger('warn', _context2.t0);
                return _context2.abrupt("return", !this.afterImport());

              case 13:
                return _context2.abrupt("return", this.afterImport());

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 9]]);
      }));

      function fromJSON(_x) {
        return _fromJSON.apply(this, arguments);
      }

      return fromJSON;
    }()
  }]);

  return NodeEditor;
}(Context);

var Output = /*#__PURE__*/function (_IO) {
  _inherits(Output, _IO);

  var _super = _createSuper(Output);

  function Output(key, title, socket) {
    var multiConns = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    _classCallCheck(this, Output);

    return _super.call(this, key, title, socket, multiConns);
  }

  _createClass(Output, [{
    key: "hasConnection",
    value: function hasConnection() {
      return this.connections.length > 0;
    }
  }, {
    key: "connectTo",
    value: function connectTo(input) {
      if (!this.socket.compatibleWith(input.socket)) throw new Error('Sockets not compatible');
      if (!input.multipleConnections && input.hasConnection()) throw new Error('Input already has one connection');
      if (!this.multipleConnections && this.hasConnection()) throw new Error('Output already has one connection');
      var connection = new Connection(this, input);
      this.connections.push(connection);
      return connection;
    }
  }, {
    key: "connectedTo",
    value: function connectedTo(input) {
      return this.connections.some(function (item) {
        return item.input === input;
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        'connections': this.connections.map(function (c) {
          if (!c.input.node) throw new Error('Node not added to Input');
          return {
            node: c.input.node.id,
            input: c.input.key,
            data: c.data
          };
        })
      };
    }
  }]);

  return Output;
}(IO);

var Socket = /*#__PURE__*/function () {
  function Socket(name) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Socket);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "compatible", []);

    this.name = name;
    this.data = data;
    this.compatible = [];
  }

  _createClass(Socket, [{
    key: "combineWith",
    value: function combineWith(socket) {
      this.compatible.push(socket);
    }
  }, {
    key: "compatibleWith",
    value: function compatibleWith(socket) {
      return this === socket || this.compatible.includes(socket);
    }
  }]);

  return Socket;
}();

function intersect(array1, array2) {
  return array1.filter(function (value) {
    return -1 !== array2.indexOf(value);
  });
}

var Recursion = /*#__PURE__*/function () {
  function Recursion(nodes) {
    _classCallCheck(this, Recursion);

    _defineProperty(this, "nodes", void 0);

    this.nodes = nodes;
  }

  _createClass(Recursion, [{
    key: "extractInputNodes",
    value: function extractInputNodes(node) {
      var _this = this;

      return Object.keys(node.inputs).reduce(function (acc, key) {
        var connections = node.inputs[key].connections;
        var nodesData = (connections || []).reduce(function (b, c) {
          return [].concat(_toConsumableArray(b), [_this.nodes[c.node]]);
        }, []);
        return [].concat(_toConsumableArray(acc), _toConsumableArray(nodesData));
      }, []);
    }
  }, {
    key: "findSelf",
    value: function findSelf(list, inputNodes) {
      var inters = intersect(list, inputNodes);
      if (inters.length) return inters[0];

      var _iterator = _createForOfIteratorHelper(inputNodes),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var node = _step.value;
          var l = [node].concat(_toConsumableArray(list));
          var inter = this.findSelf(l, this.extractInputNodes(node));
          if (inter) return inter;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return null;
    }
  }, {
    key: "detect",
    value: function detect() {
      var _this2 = this;

      var nodesArr = Object.keys(this.nodes).map(function (id) {
        return _this2.nodes[id];
      });

      var _iterator2 = _createForOfIteratorHelper(nodesArr),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var node = _step2.value;
          var inters = this.findSelf([node], this.extractInputNodes(node));
          if (inters) return inters;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return null;
    }
  }]);

  return Recursion;
}();

var State = {
  AVAILABLE: 0,
  PROCESSED: 1,
  ABORT: 2
};

var EngineEvents = /*#__PURE__*/function (_Events) {
  _inherits(EngineEvents, _Events);

  var _super = _createSuper(EngineEvents);

  function EngineEvents() {
    _classCallCheck(this, EngineEvents);

    return _super.call(this, {});
  }

  return _createClass(EngineEvents);
}(Events);

var Engine = /*#__PURE__*/function (_Context) {
  _inherits(Engine, _Context);

  var _super = _createSuper(Engine);

  function Engine(id) {
    var _this;

    _classCallCheck(this, Engine);

    _this = _super.call(this, id, new EngineEvents());

    _defineProperty(_assertThisInitialized(_this), "args", []);

    _defineProperty(_assertThisInitialized(_this), "data", null);

    _defineProperty(_assertThisInitialized(_this), "state", State.AVAILABLE);

    _defineProperty(_assertThisInitialized(_this), "forwarded", new Set());

    _defineProperty(_assertThisInitialized(_this), "onAbort", function () {});

    return _this;
  }

  _createClass(Engine, [{
    key: "clone",
    value: function clone() {
      var engine = new Engine(this.id);
      this.components.forEach(function (c) {
        return engine.register(c);
      });
      return engine;
    }
  }, {
    key: "throwError",
    value: function () {
      var _throwError = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(message) {
        var data,
            _args = arguments;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
                _context.next = 3;
                return this.abort();

              case 3:
                this.trigger('error', {
                  message: message,
                  data: data
                });
                this.processDone();
                return _context.abrupt("return", 'error');

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function throwError(_x) {
        return _throwError.apply(this, arguments);
      }

      return throwError;
    }()
  }, {
    key: "processStart",
    value: function processStart() {
      if (this.state === State.AVAILABLE) {
        this.state = State.PROCESSED;
        return true;
      }

      if (this.state === State.ABORT) {
        return false;
      }

      console.warn("The process is busy and has not been restarted.\n                Use abort() to force it to complete");
      return false;
    }
  }, {
    key: "processDone",
    value: function processDone() {
      var success = this.state !== State.ABORT;
      this.state = State.AVAILABLE;

      if (!success) {
        this.onAbort();

        this.onAbort = function () {};
      }

      return success;
    }
  }, {
    key: "abort",
    value: function () {
      var _abort = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var _this2 = this;

        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (ret) {
                  if (_this2.state === State.PROCESSED) {
                    _this2.state = State.ABORT;
                    _this2.onAbort = ret;
                  } else if (_this2.state === State.ABORT) {
                    _this2.onAbort();

                    _this2.onAbort = ret;
                  } else ret();
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function abort() {
        return _abort.apply(this, arguments);
      }

      return abort;
    }()
  }, {
    key: "lock",
    value: function () {
      var _lock = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(node) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (res) {
                  node.unlockPool = node.unlockPool || [];
                  if (node.busy && !node.outputData) node.unlockPool.push(res);else res();
                  node.busy = true;
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function lock(_x2) {
        return _lock.apply(this, arguments);
      }

      return lock;
    }()
  }, {
    key: "unlock",
    value: function unlock(node) {
      node.unlockPool.forEach(function (a) {
        return a();
      });
      node.unlockPool = [];
      node.busy = false;
    }
  }, {
    key: "extractInputData",
    value: function () {
      var _extractInputData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(node) {
        var _this3 = this;

        var obj, _i, _Object$keys, key, input, conns, connData;

        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                obj = {};
                _i = 0, _Object$keys = Object.keys(node.inputs);

              case 2:
                if (!(_i < _Object$keys.length)) {
                  _context5.next = 13;
                  break;
                }

                key = _Object$keys[_i];
                input = node.inputs[key];
                conns = input.connections;
                _context5.next = 8;
                return Promise.all(conns.map( /*#__PURE__*/function () {
                  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(c) {
                    var prevNode, outputs;
                    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                      while (1) {
                        switch (_context4.prev = _context4.next) {
                          case 0:
                            prevNode = _this3.data.nodes[c.node];
                            _context4.next = 3;
                            return _this3.processNode(prevNode);

                          case 3:
                            outputs = _context4.sent;

                            if (outputs) {
                              _context4.next = 8;
                              break;
                            }

                            _this3.abort();

                            _context4.next = 9;
                            break;

                          case 8:
                            return _context4.abrupt("return", outputs[c.output]);

                          case 9:
                          case "end":
                            return _context4.stop();
                        }
                      }
                    }, _callee4);
                  }));

                  return function (_x4) {
                    return _ref.apply(this, arguments);
                  };
                }()));

              case 8:
                connData = _context5.sent;
                obj[key] = connData;

              case 10:
                _i++;
                _context5.next = 2;
                break;

              case 13:
                return _context5.abrupt("return", obj);

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      function extractInputData(_x3) {
        return _extractInputData.apply(this, arguments);
      }

      return extractInputData;
    }()
  }, {
    key: "processWorker",
    value: function () {
      var _processWorker = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(node) {
        var inputData, component, outputData;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.next = 2;
                return this.extractInputData(node);

              case 2:
                inputData = _context6.sent;
                component = this.components.get(node.name);
                outputData = {};
                _context6.prev = 5;
                _context6.next = 8;
                return component.worker.apply(component, [node, inputData, outputData].concat(_toConsumableArray(this.args)));

              case 8:
                _context6.next = 14;
                break;

              case 10:
                _context6.prev = 10;
                _context6.t0 = _context6["catch"](5);
                this.abort();
                this.trigger('warn', _context6.t0);

              case 14:
                return _context6.abrupt("return", outputData);

              case 15:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[5, 10]]);
      }));

      function processWorker(_x5) {
        return _processWorker.apply(this, arguments);
      }

      return processWorker;
    }()
  }, {
    key: "processNode",
    value: function () {
      var _processNode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(node) {
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                if (!(this.state === State.ABORT || !node)) {
                  _context7.next = 2;
                  break;
                }

                return _context7.abrupt("return", null);

              case 2:
                _context7.next = 4;
                return this.lock(node);

              case 4:
                if (node.outputData) {
                  _context7.next = 8;
                  break;
                }

                _context7.next = 7;
                return this.processWorker(node);

              case 7:
                node.outputData = _context7.sent;

              case 8:
                this.unlock(node);
                return _context7.abrupt("return", node.outputData);

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function processNode(_x6) {
        return _processNode.apply(this, arguments);
      }

      return processNode;
    }()
  }, {
    key: "forwardProcess",
    value: function () {
      var _forwardProcess = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(node) {
        var _this4 = this;

        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                if (!(this.state === State.ABORT)) {
                  _context10.next = 2;
                  break;
                }

                return _context10.abrupt("return", null);

              case 2:
                _context10.next = 4;
                return Promise.all(Object.keys(node.outputs).map( /*#__PURE__*/function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(key) {
                    var output;
                    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
                      while (1) {
                        switch (_context9.prev = _context9.next) {
                          case 0:
                            output = node.outputs[key];
                            _context9.next = 3;
                            return Promise.all(output.connections.map( /*#__PURE__*/function () {
                              var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(c) {
                                var nextNode;
                                return _regeneratorRuntime().wrap(function _callee8$(_context8) {
                                  while (1) {
                                    switch (_context8.prev = _context8.next) {
                                      case 0:
                                        nextNode = _this4.data.nodes[c.node];

                                        if (_this4.forwarded.has(nextNode)) {
                                          _context8.next = 7;
                                          break;
                                        }

                                        _this4.forwarded.add(nextNode);

                                        _context8.next = 5;
                                        return _this4.processNode(nextNode);

                                      case 5:
                                        _context8.next = 7;
                                        return _this4.forwardProcess(nextNode);

                                      case 7:
                                      case "end":
                                        return _context8.stop();
                                    }
                                  }
                                }, _callee8);
                              }));

                              return function (_x9) {
                                return _ref3.apply(this, arguments);
                              };
                            }()));

                          case 3:
                            return _context9.abrupt("return", _context9.sent);

                          case 4:
                          case "end":
                            return _context9.stop();
                        }
                      }
                    }, _callee9);
                  }));

                  return function (_x8) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 4:
                return _context10.abrupt("return", _context10.sent);

              case 5:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function forwardProcess(_x7) {
        return _forwardProcess.apply(this, arguments);
      }

      return forwardProcess;
    }()
  }, {
    key: "copy",
    value: function copy(data) {
      data = Object.assign({}, data);
      data.nodes = Object.assign({}, data.nodes);
      Object.keys(data.nodes).forEach(function (key) {
        data.nodes[key] = Object.assign({}, data.nodes[key]);
      });
      return data;
    }
  }, {
    key: "validate",
    value: function () {
      var _validate = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(data) {
        var checking, recursion, recurrentNode;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                checking = Validator.validate(this.id, data);
                recursion = new Recursion(data.nodes);

                if (checking.success) {
                  _context11.next = 6;
                  break;
                }

                _context11.next = 5;
                return this.throwError(checking.msg);

              case 5:
                return _context11.abrupt("return", _context11.sent);

              case 6:
                recurrentNode = recursion.detect();

                if (!recurrentNode) {
                  _context11.next = 11;
                  break;
                }

                _context11.next = 10;
                return this.throwError('Recursion detected', recurrentNode);

              case 10:
                return _context11.abrupt("return", _context11.sent);

              case 11:
                return _context11.abrupt("return", true);

              case 12:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function validate(_x10) {
        return _validate.apply(this, arguments);
      }

      return validate;
    }()
  }, {
    key: "processStartNode",
    value: function () {
      var _processStartNode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(id) {
        var startNode;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                if (id) {
                  _context12.next = 2;
                  break;
                }

                return _context12.abrupt("return");

              case 2:
                startNode = this.data.nodes[id];

                if (startNode) {
                  _context12.next = 7;
                  break;
                }

                _context12.next = 6;
                return this.throwError('Node with such id not found');

              case 6:
                return _context12.abrupt("return", _context12.sent);

              case 7:
                _context12.next = 9;
                return this.processNode(startNode);

              case 9:
                _context12.next = 11;
                return this.forwardProcess(startNode);

              case 11:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function processStartNode(_x11) {
        return _processStartNode.apply(this, arguments);
      }

      return processStartNode;
    }()
  }, {
    key: "processUnreachable",
    value: function () {
      var _processUnreachable = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13() {
        var data, i, node;
        return _regeneratorRuntime().wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                data = this.data;
                _context13.t0 = _regeneratorRuntime().keys(data.nodes);

              case 2:
                if ((_context13.t1 = _context13.t0()).done) {
                  _context13.next = 12;
                  break;
                }

                i = _context13.t1.value;
                // process nodes that have not been reached
                node = data.nodes[i];

                if (!(typeof node.outputData === 'undefined')) {
                  _context13.next = 10;
                  break;
                }

                _context13.next = 8;
                return this.processNode(node);

              case 8:
                _context13.next = 10;
                return this.forwardProcess(node);

              case 10:
                _context13.next = 2;
                break;

              case 12:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function processUnreachable() {
        return _processUnreachable.apply(this, arguments);
      }

      return processUnreachable;
    }()
  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(data) {
        var startId,
            _len,
            args,
            _key,
            _args14 = arguments;

        return _regeneratorRuntime().wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                startId = _args14.length > 1 && _args14[1] !== undefined ? _args14[1] : null;

                if (this.processStart()) {
                  _context14.next = 3;
                  break;
                }

                return _context14.abrupt("return");

              case 3:
                if (this.validate(data)) {
                  _context14.next = 5;
                  break;
                }

                return _context14.abrupt("return");

              case 5:
                this.data = this.copy(data);

                for (_len = _args14.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                  args[_key - 2] = _args14[_key];
                }

                this.args = args;
                this.forwarded = new Set();
                _context14.next = 11;
                return this.processStartNode(startId);

              case 11:
                _context14.next = 13;
                return this.processUnreachable();

              case 13:
                return _context14.abrupt("return", this.processDone() ? 'success' : 'aborted');

              case 14:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function process(_x12) {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }]);

  return Engine;
}(Context);

var index$1 = {
  Engine: Engine,
  Recursion: Recursion,
  Component: Component,
  Control: Control,
  Connection: Connection,
  Emitter: Emitter,
  Input: Input,
  IO: IO,
  Node: Node$1,
  NodeEditor: NodeEditor,
  Output: Output,
  Socket: Socket
};

var _default = /*#__PURE__*/function (_Rete$Control) {
  _inherits$1(_default, _Rete$Control);
  _createSuper$1(_default);
  function _default(emitter, key, readonly) {
    var _this;
    _classCallCheck$1(this, _default);
    _this.render = 'svelte';
    _this.component = Control$1;
    _this.props = {
      emitter: emitter,
      key: key,
      readonly: readonly
    };
    return _possibleConstructorReturn$1(_this);
  }
  return _createClass$1(_default);
}(index$1.Control);

/* src/Node.svelte generated by Svelte v3.53.1 */

function add_css(target) {
	append_styles(target, "svelte-piykio", ".node.svelte-piykio.svelte-piykio{background:rgba(110, 136, 255, 0.8);border:2px solid #4e58bf;border-radius:10px;cursor:pointer;min-width:180px;height:auto;padding-bottom:6px;box-sizing:content-box;position:relative;user-select:none}.node.svelte-piykio.svelte-piykio:hover{background:rgba(130, 153, 255, 0.8)}.node.selected.svelte-piykio.svelte-piykio{background:#ffd92c;border-color:#e3c000}.node.svelte-piykio .title.svelte-piykio{color:white;font-family:sans-serif;font-size:18px;padding:8px}.node.svelte-piykio .output.svelte-piykio{text-align:right}.node.svelte-piykio .input.svelte-piykio{text-align:left;display:flex}.node.svelte-piykio .input-title.svelte-piykio,.node.svelte-piykio .output-title.svelte-piykio{vertical-align:middle;color:white;display:inline-block;font-family:sans-serif;font-size:14px;margin:6px;line-height:24px}");
}

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

	socket = new Socket$1({ props: socket_props });
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

	socket = new Socket$1({ props: socket_props });
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

		init(
			this,
			options,
			instance,
			create_fragment,
			safe_not_equal,
			{
				editor: 7,
				node: 0,
				bindSocket: 1,
				bindControl: 2
			},
			add_css
		);
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
  var app = new SvelteComponent({
    target: el,
    props: props
  });
  return app;
}
function createNode(editor, CommonSvelteComponent, _ref, options) {
  var el = _ref.el,
    node = _ref.node,
    component = _ref.component,
    bindSocket = _ref.bindSocket,
    bindControl = _ref.bindControl;
  var svelteComponent = component.component || CommonSvelteComponent || Node;
  var svelteProps = _objectSpread2$1(_objectSpread2$1({}, component.props), {}, {
    node: node,
    editor: editor,
    bindSocket: bindSocket,
    bindControl: bindControl
  });
  var app = createSvelte(el, svelteComponent, svelteProps);
  node.svelteContext = app;
  return app;
}
function createControl(editor, _ref2, options) {
  var el = _ref2.el,
    control = _ref2.control;
  var svelteComponent = control.component;
  var svelteProps = _objectSpread2$1(_objectSpread2$1({
    control: control
  }, control.props), {}, {
    getData: control.getData.bind(control),
    putData: control.putData.bind(control)
  });
  var app = createSvelte(el, svelteComponent, svelteProps);
  control.svelteContext = app;
  return app;
}
var update = function update(entity) {
  return new Promise(function (res) {
    if (!entity.svelteContext) return res();

    // entity.svelteContext.$forceUpdate();
    // entity.svelteContext.$nextTick(res);
    entity.svelteContext.update();
  });
};
function install(editor, _ref3) {
  var CommonSvelteComponent = _ref3.component;
    _ref3.options;
  editor.on('rendernode', function (_ref4) {
    var el = _ref4.el,
      node = _ref4.node,
      component = _ref4.component,
      bindSocket = _ref4.bindSocket,
      bindControl = _ref4.bindControl;
    if (component.render && component.render !== 'svelte') return;
    node._svelte = createNode(editor, CommonSvelteComponent, {
      el: el,
      node: node,
      component: component,
      bindSocket: bindSocket,
      bindControl: bindControl
    });
    node.update = Promise.resolve(update(node));
  });
  editor.on('rendercontrol', function (_ref5) {
    var el = _ref5.el,
      control = _ref5.control;
    if (control.render && control.render !== 'svelte') return;
    control._svelte = createControl(editor, {
      el: el,
      control: control
    });
    control.update = Promise.resolve(update(control));
  });
  editor.on('connectioncreated connectionremoved', function (connection) {
    update(connection.output.node);
    update(connection.input.node);
  });
  editor.on('nodeselected', function () {
    editor.nodes.map(update);
  });
}
// export { default as Socket } from './Socket.svelte'
// export { default as ControlBinder } from './ControlBinder.svelte'

var index = {
  name: 'rete-svelte-render',
  install: install,
  Control: Control$1,
  DefaultableControlComponent: DefaultableControlComponent,
  FilterControlComponent: FilterControlComponent,
  Node: Node,
  InputControl: _default,
  Dialogue: Dialogue
};

export { ControlBinder, Dialogue, Socket$1 as Socket, index as default };
//# sourceMappingURL=rete-svelte-render-plugin.esm.js.map
