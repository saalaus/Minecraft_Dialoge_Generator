/*!
* rete-stage0-render-plugin v0.2.14 
* (c) 2018  
* Released under the ISC license.
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('stage0'), require('stage0/keyed')) :
  typeof define === 'function' && define.amd ? define(['stage0', 'stage0/keyed'], factory) :
  (global.Stage0RenderPlugin = factory(global.stage0,global.stage0));
}(this, (function (h,keyed) { 'use strict';

  h = h && h.hasOwnProperty('default') ? h['default'] : h;

  /**
   * Base component
   * @param {*} scope
   */
  function BaseComponent(scope) {
    const view = this.getView();

    this.root = view.cloneNode(true);

    const refCl = view.collect(this.root);

    this.setRefs(refCl);
    this.init(scope);
  }

  BaseComponent.prototype = {
    getView: function () {
      return h(["<div></div>"]);
    },
    init: function (scope) {
      this.root.update = this.rootUpdate.bind(this);
      this.root.update(scope);
    },
    setRefs: function (refCl) {
      this.refs = refCl;
    },
    rootUpdate: function (_scope) {}
  };

  function extend(ChildClass, ParentClass) {
    ChildClass.prototype = Object.assign({}, ParentClass.prototype, ChildClass.prototype);
    ChildClass.prototype.constructor = ChildClass;
  }

  /**
   * Socket component
   * @param {*} socket
   * @param {*} type
   */
  function SocketComponent(io, type, node) {
    this.type = type;
    this.node = node;
    this.name;
    this.hint;
    BaseComponent.call(this, io);
  }

  SocketComponent.prototype.init = function (io) {
    BaseComponent.prototype.init.call(this, io.socket);
    this.node.context.bindSocket(this.root, this.type, io);
  };

  SocketComponent.prototype.getView = function () {
    return h(["<div></div>"]);
  };

  SocketComponent.prototype.rootUpdate = function (socket) {
    if (this.name !== socket.name) this.root.className = "socket " + socket.name + " " + this.type;

    if (this.name !== socket.name || this.hint !== socket.hint) this.root.title = socket.name + " " + (socket.hint ? socket.hint : "");

    this.name = socket.name;
    this.hint = socket.hint;
  };

  extend(SocketComponent, BaseComponent);

  /**
   * Control component
   * @param {*} control
   */
  function ControlComponent(control) {
    this.control = control;
    BaseComponent.call(this, control);
  }

  ControlComponent.prototype.init = function (control) {
    let ctx;
    if (this.control.parent.context) ctx = this.control.parent.context;else if (this.control.parent.node) ctx = this.control.parent.node.context;
    ctx.bindControl(this.root, control);
    BaseComponent.prototype.init.call(this, control);

    this.root.addEventListener("mousedown", e => {
      e.stopPropagation();
    });
  };

  ControlComponent.prototype.getView = function () {
    return h(['<div class="control"></div>']);
  };

  ControlComponent.prototype.rootUpdate = function (control) {
    if (this.control.key !== control.key) {
      while (this.root.firstChild) {
        this.root.removeChild(this.root.firstChild);
      }
      this.root.appendChild(control.stage0Context.root);
    }
    this.control = control;
  };

  extend(ControlComponent, BaseComponent);

  /**
   * Input component
   * @param {*} input
   */
  function InputComponent(input, node) {
    this.name = null;
    this.node = node;
    this.showControl = null;
    BaseComponent.call(this, input);
  }

  InputComponent.prototype.getView = function () {
    return h(['<div class="input"><span class="input-socket" #socket></span><div class="input-title" #inputTitle>#inputName</div><div class="input-control" #controls></div></div>']);
  };

  InputComponent.prototype.getSocketComponent = function (input) {
    return new SocketComponent(input, "input", this.node);
  };

  InputComponent.prototype.getControlComponent = function (input) {
    return new ControlComponent(input.control, input.node);
  };

  InputComponent.prototype.rootUpdate = function (input) {
    const name = input.name;
    const showControl = input.showControl();

    if (this.showControl !== showControl) {
      while (this.refs.controls.firstChild) {
        this.refs.controls.removeChild(this.refs.controls.firstChild);
      }
      if (this.root.contains(this.refs.inputtitle)) {
        this.root.removeChild(this.refs.inputtitle);
      }
      if (showControl) {
        const controlComp = this.getControlComponent(input);
        this.refs.controls.appendChild(controlComp.root);
      } else {
        this.root.appendChild(this.refs.inputtitle);
        if (this.name !== name) {
          this.name = this.refs.inputName.nodeValue = name;
        }
      }
    }

    if (!this.refs.socket.firstChild) {
      const compSocket = this.getSocketComponent(input);
      this.refs.socket.appendChild(compSocket.root);
    }
  };

  extend(InputComponent, BaseComponent);

  /**
   * Output component
   * @param {*} output
   */
  function OutputComponent(output, node) {
    this.name = null;
    this.node = node;
    this.oldChild = null;
    BaseComponent.call(this, output);
  }

  OutputComponent.prototype.getView = function () {
    return h(['<div class="output"><div class="output-title" #outputTitle>#outputName</div><div #socket></div></div>']);
  };

  OutputComponent.prototype.getSocketComponent = function (output) {
    return new SocketComponent(output, "output", this.node);
  };

  OutputComponent.prototype.rootUpdate = function (output) {
    let name = output.name;

    if (this.name !== name) {
      const b = h(["<div>"+name+"</div>"]);
      if (this.oldChild){
        this.refs.outputtitle.removeChild(this.oldChild);
      }
      this.name = this.refs.outputtitle.appendChild(b);
      this.oldChild = b;
      
    }

    if (!this.refs.socket.firstChild) {
      const compSocket = this.getSocketComponent(output);
      this.refs.socket.appendChild(compSocket.root);
    }
  };

  extend(OutputComponent, BaseComponent);

  /**
   * Node component
   * @param {*} item
   * @param {*} scope
   */
  function NodeComponent(scope) {
    this.renderedInputs = [];
    this.renderedOutputs = [];
    this.renderedControls = [];

    this.visibleInputs = undefined;
    this.visibleOutputs = undefined;
    this.visibleControls = undefined;

    this.name = null;
    this.selected = null;


    BaseComponent.call(this, scope);
  }

  NodeComponent.prototype.init = function (scope) {
    BaseComponent.prototype.init.call(this, scope);
  };

  NodeComponent.prototype.getView = function () {
    return h(['<div class="node"><div class="outputs" #outputs></div><div class="inputs" #inputs></div></div>']);
  };

  NodeComponent.prototype.getInputComponent = function (item, node) {
    return new InputComponent(item, node);
  };

  NodeComponent.prototype.getOutputComponent = function (item, node) {
    return new OutputComponent(item, node);
  };

  NodeComponent.prototype.getControlComponent = function (item, node) {
    return new ControlComponent(item, node);
  };

  NodeComponent.prototype.rootUpdate = function (scope) {
    const selected = scope.editor.selected.contains(scope.node);

    if (this.name !== scope.node.name || this.selected !== selected) {
      // this.root.classList.remove(this.name);
      this.root.classList.remove("selected");

      // this.root.classList.add(scope.node.name);
      if (selected) this.root.classList.add("selected");
    }

    this.selected = selected;

    // if (this.name !== scope.node.name) {
    //   this.name = this.refs.nodeName.nodeValue = scope.node.name;
    // }

    this.visibleInputs = Array.from(scope.node.inputs.values()).slice();

    keyed.keyed("key", this.refs.inputs, this.renderedInputs, this.visibleInputs, item => {
      return this.getInputComponent(item, scope.node).root;
    }, (input, item) => {
      input.update(item);
    });

    this.renderedInputs = this.visibleInputs.slice();

    this.visibleOutputs = Array.from(scope.node.outputs.values()).slice();

    keyed.keyed("key", this.refs.outputs, this.renderedOutputs, this.visibleOutputs, item => {
      return this.getOutputComponent(item, scope.node).root;
    }, (output, item) => {
      output.update(item);
    });

    this.renderedOutputs = this.visibleOutputs.slice();
  };

  extend(NodeComponent, BaseComponent);

  var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

  /**
   * Control component
   * @param {*} control
   */
  function RootControlComponent(editor, { el, control, controlProps }) {
    this.component = Object.assign({}, control.component, controlProps);

    this.editor = editor;
    this.el = el;

    BaseComponent.call(this, control);
    this.component.root = this.root;
  }

  RootControlComponent.prototype.getView = function () {
    return h([this.component.template]);
  };

  RootControlComponent.prototype.init = function (_control) {
    this.root.update = this.rootUpdate.bind(this);
  };

  RootControlComponent.prototype.rootUpdate = function (_control) {
    this.component.methods.update.apply(this.component);
  };

  extend(RootControlComponent, BaseComponent);

  function createNode({ el, nodeProps, component }) {
    const comp = component.component || new NodeComponent(nodeProps);
    nodeProps.node.stage0Context = comp;
    el.appendChild(comp.root);
    return comp;
  }

  function createControl(editor, { el, control, controlProps }) {
    const comp = new RootControlComponent(editor, { el, control, controlProps });

    control.stage0Context = comp;

    el.appendChild(comp.root);

    comp.component.mounted();

    return comp;
  }

  function install(editor, _params) {
    editor.on("rendernode", ({ el, node, component, bindSocket, bindControl }) => {
      if (component.render && component.render !== "stage0") return;
      const nodeProps = _extends({}, component.props, { node, editor, bindSocket, bindControl });
      node.context = nodeProps;
      node._stage0 = createNode({ el, nodeProps, component });
      node.update = () => {
        node.stage0Context.rootUpdate(nodeProps);
      };
    });

    editor.on("rendercontrol", ({ el, control }) => {
      if (control.render && control.render !== "stage0") return;
      let controlProps = _extends({}, control.props, {
        getData: control.getData.bind(control),
        putData: control.putData.bind(control)
      });
      control._stage0 = createControl(editor, { el, control, controlProps });
      control.update = () => {
        control.stage0Context.rootUpdate(controlProps);
      };
    });

    editor.on("connectioncreated connectionremoved", connection => {
      let inputContext = connection.input.node.context;
      let outputContext = connection.output.node.context;
      connection.output.node.stage0Context.rootUpdate(outputContext);
      connection.input.node.stage0Context.rootUpdate(inputContext);
    });

    editor.on("nodeselected", () => {
      for (const key in editor.nodes) {
        const editorNode = editor.nodes[key];
        const context = editorNode.context;
        editorNode.stage0Context.rootUpdate(context);
      }
    });
  }

  var index = {
    name: "stage0-render",
    install,
    NodeComponent,
    InputComponent,
    OutputComponent,
    ControlComponent,
    RootControlComponent,
    SocketComponent
  };

  return index;

})));
//# sourceMappingURL=stage0-render-plugin.debug.js.map
