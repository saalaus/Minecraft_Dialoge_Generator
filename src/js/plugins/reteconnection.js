/*!
 * rete-connection-plugin v0.9.0 
 * (c) 2019 Vitaliy Stoliarov 
 * Released under the MIT license.
 */
! function(t) {
    "use strict";
    var u, e = Object.prototype,
        s = e.hasOwnProperty,
        n = "function" == typeof Symbol ? Symbol : {},
        r = n.iterator || "@@iterator",
        o = n.asyncIterator || "@@asyncIterator",
        i = n.toStringTag || "@@toStringTag",
        c = "object" == typeof module,
        a = t.regeneratorRuntime;
    if (a) c && (module.exports = a);
    else {
        (a = t.regeneratorRuntime = c ? module.exports : {}).wrap = w;
        var h = "suspendedStart",
            l = "suspendedYield",
            f = "executing",
            p = "completed",
            d = {},
            v = {};
        v[r] = function() {
            return this
        };
        var y = Object.getPrototypeOf,
            m = y && y(y(N([])));
        m && m !== e && s.call(m, r) && (v = m);
        var g = L.prototype = b.prototype = Object.create(v);
        E.prototype = g.constructor = L, L.constructor = E, L[i] = E.displayName = "GeneratorFunction", a.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === E || "GeneratorFunction" === (e.displayName || e.name))
        }, a.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, L) : (t.__proto__ = L, i in t || (t[i] = "GeneratorFunction")), t.prototype = Object.create(g), t
        }, a.awrap = function(t) {
            return {
                __await: t
            }
        }, x(C.prototype), C.prototype[o] = function() {
            return this
        }, a.AsyncIterator = C, a.async = function(t, e, n, o) {
            var r = new C(w(t, e, n, o));
            return a.isGeneratorFunction(e) ? r : r.next().then(function(t) {
                return t.done ? t.value : r.next()
            })
        }, x(g), g[i] = "Generator", g[r] = function() {
            return this
        }, g.toString = function() {
            return "[object Generator]"
        }, a.keys = function(n) {
            var o = [];
            for (var t in n) o.push(t);
            return o.reverse(),
                function t() {
                    for (; o.length;) {
                        var e = o.pop();
                        if (e in n) return t.value = e, t.done = !1, t
                    }
                    return t.done = !0, t
                }
        }, a.values = N, j.prototype = {
            constructor: j,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = u, this.done = !1, this.delegate = null, this.method = "next", this.arg = u, this.tryEntries.forEach(O), !t)
                    for (var e in this) "t" === e.charAt(0) && s.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = u)
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval
            },
            dispatchException: function(n) {
                if (this.done) throw n;
                var o = this;

                function t(t, e) {
                    return i.type = "throw", i.arg = n, o.next = t, e && (o.method = "next", o.arg = u), !!e
                }
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                    var r = this.tryEntries[e],
                        i = r.completion;
                    if ("root" === r.tryLoc) return t("end");
                    if (r.tryLoc <= this.prev) {
                        var c = s.call(r, "catchLoc"),
                            a = s.call(r, "finallyLoc");
                        if (c && a) {
                            if (this.prev < r.catchLoc) return t(r.catchLoc, !0);
                            if (this.prev < r.finallyLoc) return t(r.finallyLoc)
                        } else if (c) {
                            if (this.prev < r.catchLoc) return t(r.catchLoc, !0)
                        } else {
                            if (!a) throw new Error("try statement without catch or finally");
                            if (this.prev < r.finallyLoc) return t(r.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(t, e) {
                for (var n = this.tryEntries.length - 1; 0 <= n; --n) {
                    var o = this.tryEntries[n];
                    if (o.tryLoc <= this.prev && s.call(o, "finallyLoc") && this.prev < o.finallyLoc) {
                        var r = o;
                        break
                    }
                }
                r && ("break" === t || "continue" === t) && r.tryLoc <= e && e <= r.finallyLoc && (r = null);
                var i = r ? r.completion : {};
                return i.type = t, i.arg = e, r ? (this.method = "next", this.next = r.finallyLoc, d) : this.complete(i)
            },
            complete: function(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), d
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                    var n = this.tryEntries[e];
                    if (n.finallyLoc === t) return this.complete(n.completion, n.afterLoc), O(n), d
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; 0 <= e; --e) {
                    var n = this.tryEntries[e];
                    if (n.tryLoc === t) {
                        var o = n.completion;
                        if ("throw" === o.type) {
                            var r = o.arg;
                            O(n)
                        }
                        return r
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(t, e, n) {
                return this.delegate = {
                    iterator: N(t),
                    resultName: e,
                    nextLoc: n
                }, "next" === this.method && (this.arg = u), d
            }
        }
    }

    function w(t, e, n, o) {
        var r = e && e.prototype instanceof b ? e : b,
            i = Object.create(r.prototype),
            c = new j(o || []);
        return i._invoke = function(i, c, a) {
            var u = h;
            return function(t, e) {
                if (u === f) throw new Error("Generator is already running");
                if (u === p) {
                    if ("throw" === t) throw e;
                    return S()
                }
                for (a.method = t, a.arg = e;;) {
                    var n = a.delegate;
                    if (n) {
                        var o = P(n, a);
                        if (o) {
                            if (o === d) continue;
                            return o
                        }
                    }
                    if ("next" === a.method) a.sent = a._sent = a.arg;
                    else if ("throw" === a.method) {
                        if (u === h) throw u = p, a.arg;
                        a.dispatchException(a.arg)
                    } else "return" === a.method && a.abrupt("return", a.arg);
                    u = f;
                    var r = k(i, c, a);
                    if ("normal" === r.type) {
                        if (u = a.done ? p : l, r.arg === d) continue;
                        return {
                            value: r.arg,
                            done: a.done
                        }
                    }
                    "throw" === r.type && (u = p, a.method = "throw", a.arg = r.arg)
                }
            }
        }(t, n, c), i
    }

    function k(t, e, n) {
        try {
            return {
                type: "normal",
                arg: t.call(e, n)
            }
        } catch (t) {
            return {
                type: "throw",
                arg: t
            }
        }
    }

    function b() {}

    function E() {}

    function L() {}

    function x(t) {
        ["next", "throw", "return"].forEach(function(e) {
            t[e] = function(t) {
                return this._invoke(e, t)
            }
        })
    }

    function C(u) {
        var e;
        this._invoke = function(n, o) {
            function t() {
                return new Promise(function(t, e) {
                    ! function e(t, n, o, r) {
                        var i = k(u[t], u, n);
                        if ("throw" !== i.type) {
                            var c = i.arg,
                                a = c.value;
                            return a && "object" == typeof a && s.call(a, "__await") ? Promise.resolve(a.__await).then(function(t) {
                                e("next", t, o, r)
                            }, function(t) {
                                e("throw", t, o, r)
                            }) : Promise.resolve(a).then(function(t) {
                                c.value = t, o(c)
                            }, r)
                        }
                        r(i.arg)
                    }(n, o, t, e)
                })
            }
            return e = e ? e.then(t, t) : t()
        }
    }

    function P(t, e) {
        var n = t.iterator[e.method];
        if (n === u) {
            if (e.delegate = null, "throw" === e.method) {
                if (t.iterator.return && (e.method = "return", e.arg = u, P(t, e), "throw" === e.method)) return d;
                e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
            }
            return d
        }
        var o = k(n, t.iterator, e.arg);
        if ("throw" === o.type) return e.method = "throw", e.arg = o.arg, e.delegate = null, d;
        var r = o.arg;
        return r ? r.done ? (e[t.resultName] = r.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = u), e.delegate = null, d) : r : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, d)
    }

    function _(t) {
        var e = {
            tryLoc: t[0]
        };
        1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
    }

    function O(t) {
        var e = t.completion || {};
        e.type = "normal", delete e.arg, t.completion = e
    }

    function j(t) {
        this.tryEntries = [{
            tryLoc: "root"
        }], t.forEach(_, this), this.reset(!0)
    }

    function N(e) {
        if (e) {
            var t = e[r];
            if (t) return t.call(e);
            if ("function" == typeof e.next) return e;
            if (!isNaN(e.length)) {
                var n = -1,
                    o = function t() {
                        for (; ++n < e.length;)
                            if (s.call(e, n)) return t.value = e[n], t.done = !1, t;
                        return t.value = u, t.done = !0, t
                    };
                return o.next = o
            }
        }
        return {
            next: S
        }
    }

    function S() {
        return {
            value: u,
            done: !0
        }
    }
}(function() {
    return this
}() || Function("return this")()),
function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("rete")) : "function" == typeof define && define.amd ? define(["exports", "rete"], e) : e((t = t || self).ConnectionPlugin = {}, t.Rete)
}(this, function(t, c) {
    "use strict";

    function o(t, e) {
        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
    }

    function r(t, e) {
        for (var n = 0; n < e.length; n++) {
            var o = e[n];
            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
        }
    }

    function i(t, e, n) {
        return e && r(t.prototype, e), n && r(t, n), t
    }

    function a(t, e, n) {
        return e in t ? Object.defineProperty(t, e, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : t[e] = n, t
    }

    function s(t, e) {
        return function(t) {
            if (Array.isArray(t)) return t
        }(t) || function(t, e) {
            var n = [],
                o = !0,
                r = !1,
                i = void 0;
            try {
                for (var c, a = t[Symbol.iterator](); !(o = (c = a.next()).done) && (n.push(c.value), !e || n.length !== e); o = !0);
            } catch (t) {
                r = !0, i = t
            } finally {
                try {
                    o || null == a.return || a.return()
                } finally {
                    if (r) throw i
                }
            }
            return n
        }(t, e) || function() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance")
        }()
    }

    function u(t) {
        return t.toLowerCase().replace(/ /g, "-")
    }

    function h(t, e) {
        var n = s(t, 4),
            o = n[0],
            r = n[1],
            i = n[2],
            c = n[3],
            a = o + Math.abs(i - o) * e,
            u = i - Math.abs(i - o) * e;
        return "M ".concat(o, " ").concat(r, " C ").concat(a, " ").concat(r, " ").concat(u, " ").concat(c, " ").concat(i, " ").concat(c)
    }

    function l(t, e, n) {
        var o = {
            points: e,
            connection: n,
            d: ""
        };
        return t.trigger("connectionpath", o), o.d || h(e, .4)
    }

    function f(t) {
        var e = t.el,
            n = t.d,
            o = e.querySelector(".connection path");
        if (!o) throw new Error("Path of connection was broken");
        o.setAttribute("d", n);
    }

    function p(t) {
        var e, n = t.el,
            o = t.d,
            r = t.connection,
            i = r ? ["input", "output", "socket-input", "socket-output"] : [],
            c = document.createElementNS("http://www.w3.org/2000/svg", "svg"),
            a = document.createElementNS("http://www.w3.org/2000/svg", "path");
        (e = c.classList).add.apply(e, ["connection"].concat(i)), a.classList.add("main-path"), a.setAttribute("d", o), c.appendChild(a), n.appendChild(c), f({
            el: n,
            d: o
        })
    }
    var d = function() {
            function n(t, e) {
                o(this, n), this.emitter = t, this.editorView = e, a(this, "el", void 0), this.el = document.createElement("div"), this.el.style.position = "absolute", this.editorView.area.appendChild(this.el)
            }
            return i(n, [{
                key: "updatePseudoConnection",
                value: function(t) {
                    null !== t ? this.renderConnection(t) : this.el.parentElement && (this.el.innerHTML = "")
                }
            }, {
                key: "getPoints",
                value: function(t) {
                    var e = this.editorView.area.mouse;
                    if (!t.node) throw new Error("Node in output/input not found");
                    var n = this.editorView.nodes.get(t.node);
                    if (!n) throw new Error("Node view not found");
                    var o = s(n.getSocketPosition(t), 2),
                        r = o[0],
                        i = o[1];
                    return t instanceof c.Output ? [r, i, e.x, e.y] : [e.x, e.y, r, i]
                }
            }, {
                key: "updateConnection",
                value: function(t) {
                    var e = l(this.emitter, this.getPoints(t));
                    f({
                        el: this.el,
                        d: e
                    })
                }
            }, {
                key: "renderConnection",
                value: function(t) {
                    var e = l(this.emitter, this.getPoints(t));
                    p({
                        el: this.el,
                        d: e
                    })
                }
            }]), n
        }(),
        e = function() {
            function n(t) {
                var e = this;
                o(this, n), a(this, "editor", void 0), a(this, "_io", null), a(this, "view", void 0), this.editor = t, this.view = new d(t, t.view), t.on("mousemove", function() {
                    return e.io && e.view.updateConnection(e.io)
                })
            }
            return i(n, [{
                key: "reset",
                value: function() {
                    this.io = null
                }
            }, {
                key: "pickOutput",
                value: function(t) {
                    if (this.editor.trigger("connectionpick", t)) {
                        if (this.io instanceof c.Input) return !t.multipleConnections && t.hasConnection() && this.editor.removeConnection(t.connections[0]), this.editor.connect(t, this.io), void this.reset();
                        this.io && this.reset(), this.io = t
                    }
                }
            }, {
                key: "pickInput",
                value: function(t) {
                    var e = this;
                    if (this.editor.trigger("connectionpick", t)) {
                        if (null === this.io) return t.hasConnection() ? (this.io = t.connections[0].output, this.editor.removeConnection(t.connections[0])) : this.io = t, !0;
                        if (!t.multipleConnections && t.hasConnection() && this.editor.removeConnection(t.connections[0]), !this.io.multipleConnections && this.io.hasConnection() && this.editor.removeConnection(this.io.connections[0]), this.io instanceof c.Output && this.io.connectedTo(t)) {
                            var n = t.connections.find(function(t) {
                                return t.output === e.io
                            });
                            n && this.editor.removeConnection(n)
                        }
                        this.io instanceof c.Output && (this.editor.connect(this.io, t), this.reset())
                    }
                }
            }, {
                key: "pickConnection",
                value: function(t) {
                    var e = t.output;
                    this.editor.removeConnection(t), this.io = e
                }
            }, {
                key: "io",
                get: function() {
                    return this._io
                },
                set: function(t) {
                    this._io = t, this.view.updatePseudoConnection(t)
                }
            }]), n
        }(),
        v = function() {
            function e(t) {
                o(this, e), a(this, "picker", void 0), a(this, "target", void 0), this.picker = t, this.target = null
            }
            return i(e, [{
                key: "act",
                value: function(t) {
                    var e = t.input,
                        n = t.output;
                    this.unlock(e || n) || (e ? this.picker.pickInput(e) : n ? this.picker.pickOutput(n) : this.picker.reset())
                }
            }, {
                key: "start",
                value: function(t, e) {
                    this.act(t), this.target = e
                }
            }, {
                key: "complete",
                value: function(t) {
                    var e = 0 < arguments.length && void 0 !== t ? t : {};
                    this.act(e)
                }
            }, {
                key: "hasTarget",
                value: function() {
                    return Boolean(this.target)
                }
            }, {
                key: "unlock",
                value: function(t) {
                    var e = this.target;
                    return this.target = null, e && e === t
                }
            }]), e
        }();
    ! function(t) {
        if (t && "undefined" != typeof window) {
            var e = document.createElement("style");
            e.setAttribute("type", "text/css"), e.innerHTML = t, document.head.appendChild(e)
        }
    }(".connection {\n  overflow: visible !important;\n  position: absolute;\n  z-index: -1;\n  pointer-events: none; }\n  .connection > * {\n    pointer-events: all; }\n  .connection .main-path {\n    fill: none;\n    stroke-width: 5px;\n    stroke: orange; }\n");
    var n = {
        name: "connection",
        install: function(r) {
            r.bind("connectionpath"), r.bind("connectiondrop"), r.bind("connectionpick"), r.bind("resetconnection");
            var n = new e(r),
                i = new v(n),
                c = new WeakMap;

            function a(t) {
                var e = c.get(this);
                if (e) {
                    var n = e.input,
                        o = e.output;
                    r.view.container.dispatchEvent(new PointerEvent("pointermove", t)), t.preventDefault(), t.stopPropagation(), i.start({
                        input: n,
                        output: o
                    }, n || o)
                }
            }

            function t(t) {
                var e = document.elementFromPoint(t.clientX, t.clientY);
                n.io && r.trigger("connectiondrop", n.io), e && i.complete(function t(e, n) {
                    return e.get(n) || (n.parentElement ? t(e, n.parentElement) : null)
                }(c, e) || {})
            }
            r.on("resetconnection", function() {
                return i.complete()
            }), r.on("rendersocket", function(t) {
                var e = t.el,
                    n = t.input,
                    o = t.output;
                c.set(e, {
                    input: n,
                    output: o
                }), e.removeEventListener("pointerdown", a), e.addEventListener("pointerdown", a)
            }), window.addEventListener("pointerup", t), r.on("renderconnection", function(t) {
                var e = t.el,
                    n = t.connection,
                    o = t.points;
                p({
                    el: e,
                    d: l(r, o, n),
                    connection: n
                })
            }), r.on("updateconnection", function(t) {
                var e = t.el,
                    n = t.connection,
                    o = t.points;
                f({
                    el: e,
                    d: l(r, o, n)
                })
            }), r.on("destroy", function() {
                window.removeEventListener("pointerup", t)
            })
        }
    };
    t.default = n, t.defaultPath = h, Object.defineProperty(t, "__esModule", {
        value: !0
    })
});
//# sourceMappingURL=connection-plugin.min.js.map