/**
Copyright (c) The New York Times, CMS Group, Matthew DeLambo

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program as the file license.txt. If not, see
<http://www.gnu.org/licenses/old-licenses/gpl-2.0.txt>

**/
window.rangy = function () {
    function e(a, d) {
        var b = typeof a[d];
        return b == t || !! (b == l && a[d]) || b == "unknown"
    }
    function b(a, d) {
        return !!(typeof a[d] == l && a[d])
    }
    function a(a, d) {
        return typeof a[d] != n
    }
    function d(a) {
        return function (d, b) {
            for (var f = b.length; f--;) if (!a(d, b[f])) return !1;
            return !0
        }
    }
    function f(a) {
        return a && j(a, r) && v(a, k)
    }
    function g(a) {
        window.alert("Rangy not supported in your browser. Reason: " + a);
        p.initialized = !0;
        p.supported = !1
    }
    function h() {
        if (!p.initialized) {
            var a, d = !1,
                q = !1;
            e(document, "createRange") && (a = document.createRange(), j(a, o) && v(a, s) && (d = !0), a.detach());
            if ((a = b(document, "body") ? document.body : document.getElementsByTagName("body")[0]) && e(a, "createTextRange")) a = a.createTextRange(), f(a) && (q = !0);
            !d && !q && g("Neither Range nor TextRange are implemented");
            p.initialized = !0;
            p.features = {
                implementsDomRange: d,
                implementsTextRange: q
            };
            d = F.concat(x);
            q = 0;
            for (a = d.length; q < a; ++q) try {
                d[q](p)
            } catch (h) {
                b(window, "console") && e(window.console, "log") && window.console.log("Init listener threw an exception. Continuing.",
                h)
            }
        }
    }
    function i(a) {
        this.name = a;
        this.supported = this.initialized = !1
    }
    var l = "object",
        t = "function",
        n = "undefined",
        s = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer", "START_TO_START", "START_TO_END", "END_TO_START", "END_TO_END"],
        o = ["setStart", "setStartBefore", "setStartAfter", "setEnd", "setEndBefore", "setEndAfter", "collapse", "selectNode", "selectNodeContents", "compareBoundaryPoints", "deleteContents", "extractContents", "cloneContents", "insertNode", "surroundContents",
            "cloneRange", "toString", "detach"],
        k = ["boundingHeight", "boundingLeft", "boundingTop", "boundingWidth", "htmlText", "text"],
        r = ["collapse", "compareEndPoints", "duplicate", "getBookmark", "moveToBookmark", "moveToElementText", "parentElement", "pasteHTML", "select", "setEndPoint", "getBoundingClientRect"],
        j = d(e),
        q = d(b),
        v = d(a),
        p = {
            version: "1.2",
            initialized: !1,
            supported: !0,
            util: {
                isHostMethod: e,
                isHostObject: b,
                isHostProperty: a,
                areHostMethods: j,
                areHostObjects: q,
                areHostProperties: v,
                isTextRange: f
            },
            features: {},
            modules: {},
            config: {
                alertOnWarn: !1,
                preferTextRange: !1
            }
        };
    p.fail = g;
    p.warn = function (a) {
        a = "Rangy warning: " + a;
        p.config.alertOnWarn ? window.alert(a) : typeof window.console != n && typeof window.console.log != n && window.console.log(a)
    };
    ({}).hasOwnProperty ? p.util.extend = function (a, d) {
        for (var b in d) d.hasOwnProperty(b) && (a[b] = d[b])
    } : g("hasOwnProperty not supported");
    var x = [],
        F = [];
    p.init = h;
    p.addInitListener = function (a) {
        p.initialized ? a(p) : x.push(a)
    };
    var B = [];
    p.addCreateMissingNativeApiListener = function (a) {
        B.push(a)
    };
    p.createMissingNativeApi = function (a) {
        a = a || window;
        h();
        for (var d = 0, b = B.length; d < b; ++d) B[d](a)
    };
    i.prototype.fail = function (a) {
        this.initialized = !0;
        this.supported = !1;
        throw Error("Module '" + this.name + "' failed to load: " + a);
    };
    i.prototype.warn = function (a) {
        p.warn("Module " + this.name + ": " + a)
    };
    i.prototype.createError = function (a) {
        return Error("Error in Rangy " + this.name + " module: " + a)
    };
    p.createModule = function (a, d) {
        var b = new i(a);
        p.modules[a] = b;
        F.push(function (a) {
            d(a, b);
            b.initialized = !0;
            b.supported = !0
        })
    };
    p.requireModules = function (a) {
        for (var d = 0, b = a.length, f, e; d < b; ++d) {
            e = a[d];
            f = p.modules[e];
            if (!f || !(f instanceof i)) throw Error("Module '" + e + "' not found");
            if (!f.supported) throw Error("Module '" + e + "' not supported");
        }
    };
    var A = !1,
        q = function () {
            A || (A = !0, p.initialized || h())
        };
    if (typeof window == n) g("No window found");
    else if (typeof document == n) g("No document found");
    else return e(document, "addEventListener") && document.addEventListener("DOMContentLoaded", q, !1), e(window, "addEventListener") ? window.addEventListener("load", q, !1) : e(window, "attachEvent") ? window.attachEvent("onload", q) : g("Window does not have required addEventListener or attachEvent method"), p
}();
rangy.createModule("DomUtil", function (e, b) {
    function a(a) {
        for (var d = 0; a = a.previousSibling;) d++;
        return d
    }
    function d(a, d) {
        var b = [],
            f;
        for (f = a; f; f = f.parentNode) b.push(f);
        for (f = d; f; f = f.parentNode) if (j(b, f)) return f;
        return null
    }
    function f(a, d, b) {
        for (b = b ? a : a.parentNode; b;) {
            a = b.parentNode;
            if (a === d) return b;
            b = a
        }
        return null
    }
    function g(a) {
        a = a.nodeType;
        return a == 3 || a == 4 || a == 8
    }
    function h(a, d) {
        var b = d.nextSibling,
            f = d.parentNode;
        b ? f.insertBefore(a, b) : f.appendChild(a);
        
        if(d.nodeValue =='\ufeff' && a.nodeValue == '\ufeff'){
           f.remove(d); 
        };
        return a
    }
    function i(a) {
        if (a.nodeType == 9) return a;
        else if (typeof a.ownerDocument != o) return a.ownerDocument;
        else if (typeof a.document != o) return a.document;
        else if (a.parentNode) return i(a.parentNode);
        else throw Error("getDocument: no document found for node");
    }
    function l(a) {
        return !a ? "[No node]" : g(a) ? '"' + a.data + '"' : a.nodeType == 1 ? "<" + a.nodeName + (a.id ? ' id="' + a.id + '"' : "") + ">[" + a.childNodes.length + "]" : a.nodeName
    }
    function t(a) {
        this._next = this.root = a
    }
    function n(a, d) {
        this.node = a;
        this.offset = d
    }
    function s(a) {
        this.code = this[a];
        this.codeName = a;
        this.message = "DOMException: " + this.codeName
    }
    var o = "undefined",
        k = e.util;
    k.areHostMethods(document, ["createDocumentFragment", "createElement", "createTextNode"]) || b.fail("document missing a Node creation method");
    k.isHostMethod(document, "getElementsByTagName") || b.fail("document missing getElementsByTagName method");
    var r = document.createElement("div");
    k.areHostMethods(r, ["insertBefore", "appendChild", "cloneNode"]) || b.fail("Incomplete Element implementation");
    r = document.createTextNode("test");
    k.areHostMethods(r, ["splitText", "deleteData",
        "insertData", "appendData", "cloneNode"]) || b.fail("Incomplete Text Node implementation");
    var j = function (a, d) {
        for (var b = a.length; b--;) if (a[b] === d) return !0;
        return !1
    };
    t.prototype = {
        _current: null,
        hasNext: function () {
            return !!this._next
        },
        next: function () {
            var a = this._current = this._next,
                d;
            if (this._current) {
                d = a.firstChild;
                if (!d) for (d = null; a !== this.root && !(d = a.nextSibling);) a = a.parentNode;
                this._next = d
            }
            return this._current
        },
        detach: function () {
            this._current = this._next = this.root = null
        }
    };
    n.prototype = {
        equals: function (a) {
            return this.node === a.node & this.offset == a.offset
        },
        inspect: function () {
            return "[DomPosition(" + l(this.node) + ":" + this.offset + ")]"
        }
    };
    s.prototype = {
        INDEX_SIZE_ERR: 1,
        HIERARCHY_REQUEST_ERR: 3,
        WRONG_DOCUMENT_ERR: 4,
        NO_MODIFICATION_ALLOWED_ERR: 7,
        NOT_FOUND_ERR: 8,
        NOT_SUPPORTED_ERR: 9,
        INVALID_STATE_ERR: 11
    };
    s.prototype.toString = function () {
        return this.message
    };
    e.dom = {
        arrayContains: j,
        getNodeIndex: a,
        getNodeLength: function (a) {
            var d;
            return g(a) ? a.length : (d = a.childNodes) ? d.length : 0
        },
        getCommonAncestor: d,
        isAncestorOf: function (a, d, b) {
            for (d = b ? d : d.parentNode; d;) if (d === a) return !0;
            else d = d.parentNode;
            return !1
        },
        getClosestAncestorIn: f,
        isCharacterDataNode: g,
        insertAfter: h,
        splitDataNode: function (a, d) {
            var b = a.cloneNode(!1);
            b.deleteData(0, d);
            a.deleteData(d, a.length - d);
            h(b, a);
            return b
        },
        getDocument: i,
        getWindow: function (a) {
            a = i(a);
            if (typeof a.defaultView != o) return a.defaultView;
            else if (typeof a.parentWindow != o) return a.parentWindow;
            else throw Error("Cannot get a window object for node");
        },
        getIframeWindow: function (a) {
            if (typeof a.contentWindow != o) return a.contentWindow;
            else if (typeof a.contentDocument != o) return a.contentDocument.defaultView;
            else throw Error("getIframeWindow: No Window object found for iframe element");
        },
        getIframeDocument: function (a) {
            if (typeof a.contentDocument != o) return a.contentDocument;
            else if (typeof a.contentWindow != o) return a.contentWindow.document;
            else throw Error("getIframeWindow: No Document object found for iframe element");
        },
        getBody: function (a) {
            return k.isHostObject(a, "body") ? a.body : a.getElementsByTagName("body")[0]
        },
        getRootContainer: function (a) {
            for (var d; d = a.parentNode;) a = d;
            return a
        },
        comparePoints: function (b, e, g, j) {
            var h;
            if (b == g) return e === j ? 0 : e < j ? -1 : 1;
            else if (h = f(g, b, !0)) return e <= a(h) ? -1 : 1;
            else if (h = f(b, g, !0)) return a(h) < j ? -1 : 1;
            else if (e = d(b, g), b = b === e ? e : f(b, e, !0), g = g === e ? e : f(g, e, !0), b === g) throw Error("comparePoints got to case 4 and childA and childB are the same!");
            else {
                for (e = e.firstChild; e;) {
                    if (e === b) return -1;
                    else if (e === g) return 1;
                    e = e.nextSibling
                }
                throw Error("Should not be here!");
            }
        },
        inspectNode: l,
        createIterator: function (a) {
            return new t(a)
        },
        DomPosition: n
    };
    e.DOMException = s
});
rangy.createModule("DomRange", function (e) {
    function b(a, d) {
        return a.nodeType != 3 && (m.isAncestorOf(a, d.startContainer, !0) || m.isAncestorOf(a, d.endContainer, !0))
    }
    function a(a) {
        return m.getDocument(a.startContainer)
    }
    function d(a, d, b) {
        if (d = a._listeners[d]) for (var f = 0, e = d.length; f < e; ++f) d[f].call(a, {
            target: a,
            args: b
        })
    }
    function f(a) {
        return new u(a.parentNode, m.getNodeIndex(a))
    }
    function g(a) {
        return new u(a.parentNode, m.getNodeIndex(a) + 1)
    }
    function h(a, d, b) {
        var f = a.nodeType == 11 ? a.firstChild : a;
        m.isCharacterDataNode(d) ? b == d.length ? m.insertAfter(a, d) : d.parentNode.insertBefore(a, b == 0 ? d : m.splitDataNode(d, b)) : b >= d.childNodes.length ? d.appendChild(a) : d.insertBefore(a, d.childNodes[b]);
        return f
    }
    function i(d) {
        for (var b, f, e = a(d.range).createDocumentFragment(); f = d.next();) {
            b = d.isPartiallySelectedSubtree();
            f = f.cloneNode(!b);
            b && (b = d.getSubtreeIterator(), f.appendChild(i(b)), b.detach(!0));
            if (f.nodeType == 10) throw new D("HIERARCHY_REQUEST_ERR");
            e.appendChild(f)
        }
        return e
    }
    function l(a, d, b) {
        for (var f, e, b = b || {
            stop: !1
        }; f = a.next();) if (a.isPartiallySelectedSubtree()) if (d(f) === !1) {
            b.stop = !0;
            break
        } else {
            if (f = a.getSubtreeIterator(), l(f, d, b), f.detach(!0), b.stop) break
        } else for (f = m.createIterator(f); e = f.next();) if (d(e) === !1) {
            b.stop = !0;
            return
        }
    }
    function t(a) {
        for (var d; a.next();) a.isPartiallySelectedSubtree() ? (d = a.getSubtreeIterator(), t(d), d.detach(!0)) : a.remove()
    }
    function n(d) {
        for (var b, f = a(d.range).createDocumentFragment(), e; b = d.next();) {
            d.isPartiallySelectedSubtree() ? (b = b.cloneNode(!1), e = d.getSubtreeIterator(), b.appendChild(n(e)), e.detach(!0)) : d.remove();
            if (b.nodeType == 10) throw new D("HIERARCHY_REQUEST_ERR");
            f.appendChild(b)
        }
        return f
    }
    function s(a, d, b) {
        var f = !(!d || !d.length),
            e, g = !! b;
        f && (e = RegExp("^(" + d.join("|") + ")$"));
        var y = [];
        l(new k(a, !1), function (a) {
            (!f || e.test(a.nodeType)) && (!g || b(a)) && y.push(a)
        });
        return y
    }
    function o(a) {
        return "[" + (typeof a.getName == "undefined" ? "Range" : a.getName()) + "(" + m.inspectNode(a.startContainer) + ":" + a.startOffset + ", " + m.inspectNode(a.endContainer) + ":" + a.endOffset + ")]"
    }
    function k(a, d) {
        this.range = a;
        this.clonePartiallySelectedTextNodes = d;
        if (!a.collapsed) {
            this.sc = a.startContainer;
            this.so = a.startOffset;
            this.ec = a.endContainer;
            this.eo = a.endOffset;
            var b = a.commonAncestorContainer;
            this.sc === this.ec && m.isCharacterDataNode(this.sc) ? (this.isSingleCharacterDataNode = !0, this._first = this._last = this._next = this.sc) : (this._first = this._next = this.sc === b && !m.isCharacterDataNode(this.sc) ? this.sc.childNodes[this.so] : m.getClosestAncestorIn(this.sc, b, !0), this._last = this.ec === b && !m.isCharacterDataNode(this.ec) ? this.ec.childNodes[this.eo - 1] : m.getClosestAncestorIn(this.ec, b, !0))
        }
    }
    function r(a) {
        this.code = this[a];
        this.codeName = a;
        this.message = "RangeException: " + this.codeName
    }
    function j(a, d, b) {
        this.nodes = s(a, d, b);
        this._next = this.nodes[0];
        this._position = 0
    }
    function q(a) {
        return function (d, b) {
            for (var f, e = b ? d : d.parentNode; e;) {
                f = e.nodeType;
                if (m.arrayContains(a, f)) return e;
                e = e.parentNode
            }
            return null
        }
    }
    function v(a, d) {
        if (Z(a, d)) throw new r("INVALID_NODE_TYPE_ERR");
    }
    function p(a) {
        if (!a.startContainer) throw new D("INVALID_STATE_ERR");
    }
    function x(a, d) {
        if (!m.arrayContains(d, a.nodeType)) throw new r("INVALID_NODE_TYPE_ERR");
    }
    function F(a, d) {
        if (d < 0 || d > (m.isCharacterDataNode(a) ? a.length : a.childNodes.length)) throw new D("INDEX_SIZE_ERR");
    }
    function B(a, d) {
        if (M(a, !0) !== M(d, !0)) throw new D("WRONG_DOCUMENT_ERR");
    }
    function A(a) {
        if ($(a, !0)) throw new D("NO_MODIFICATION_ALLOWED_ERR");
    }
    function z(a, d) {
        if (!a) throw new D(d);
    }
    function w(a) {
        p(a);
        if (!m.arrayContains(J, a.startContainer.nodeType) && !M(a.startContainer, !0) || !m.arrayContains(J, a.endContainer.nodeType) && !M(a.endContainer, !0) || !(a.startOffset <= (m.isCharacterDataNode(a.startContainer) ? a.startContainer.length : a.startContainer.childNodes.length)) || !(a.endOffset <= (m.isCharacterDataNode(a.endContainer) ? a.endContainer.length : a.endContainer.childNodes.length))) throw Error("Range error: Range is no longer valid after DOM mutation (" + a.inspect() + ")");
    }
    function H() {}
    function K(a) {
        a.START_TO_START = R;
        a.START_TO_END = U;
        a.END_TO_END = aa;
        a.END_TO_START = V;
        a.NODE_BEFORE = W;
        a.NODE_AFTER = X;
        a.NODE_BEFORE_AND_AFTER = Y;
        a.NODE_INSIDE = S
    }
    function I(a) {
        K(a);
        K(a.prototype)
    }
    function G(a, d) {
        return function () {
            w(this);
            var b = this.startContainer,
                f = this.startOffset,
                e = this.commonAncestorContainer,
                y = new k(this, !0);
            if (b !== e) b = m.getClosestAncestorIn(b, e, !0), f = g(b), b = f.node, f = f.offset;
            l(y, A);
            y.reset();
            e = a(y);
            y.detach();
            d(this, b, f, b, f);
            return e
        }
    }
    function C(a, d, j) {
        function C(a, d) {
            return function (b) {
                p(this);
                x(b, O);
                x(y(b), J);
                b = (a ? f : g)(b);
                (d ? h : l)(this, b.node, b.offset)
            }
        }
        function h(a, b, f) {
            var e = a.endContainer,
                g = a.endOffset;
            if (b !== a.startContainer || f !== this.startOffset) {
                if (y(b) != y(e) || m.comparePoints(b, f, e, g) == 1) e = b, g = f;
                d(a, b,
                f, e, g)
            }
        }
        function l(a, b, f) {
            var e = a.startContainer,
                g = a.startOffset;
            if (b !== a.endContainer || f !== this.endOffset) {
                if (y(b) != y(e) || m.comparePoints(b, f, e, g) == -1) e = b, g = f;
                d(a, e, g, b, f)
            }
        }
        function M(a, b, f) {
            (b !== a.startContainer || f !== this.startOffset || b !== a.endContainer || f !== this.endOffset) && d(a, b, f, b, f)
        }
        a.prototype = new H;
        e.util.extend(a.prototype, {
            setStart: function (a, d) {
                p(this);
                v(a, !0);
                F(a, d);
                h(this, a, d)
            },
            setEnd: function (a, d) {
                p(this);
                v(a, !0);
                F(a, d);
                l(this, a, d)
            },
            setStartBefore: C(!0, !0),
            setStartAfter: C(!1, !0),
            setEndBefore: C(!0, !1),
            setEndAfter: C(!1, !1),
            collapse: function (a) {
                w(this);
                a ? d(this, this.startContainer, this.startOffset, this.startContainer, this.startOffset) : d(this, this.endContainer, this.endOffset, this.endContainer, this.endOffset)
            },
            selectNodeContents: function (a) {
                p(this);
                v(a, !0);
                d(this, a, 0, a, m.getNodeLength(a))
            },
            selectNode: function (a) {
                p(this);
                v(a, !1);
                x(a, O);
                var b = f(a),
                    a = g(a);
                d(this, b.node, b.offset, a.node, a.offset)
            },
            extractContents: G(n, d),
            deleteContents: G(t, d),
            canSurroundContents: function () {
                w(this);
                A(this.startContainer);
                A(this.endContainer);
                var a = new k(this, !0),
                    d = a._first && b(a._first, this) || a._last && b(a._last, this);
                a.detach();
                return !d
            },
            detach: function () {
                j(this)
            },
            splitBoundaries: function () {
                w(this);
                var a = this.startContainer,
                    b = this.startOffset,
                    f = this.endContainer,
                    e = this.endOffset,
                    g = a === f;
                m.isCharacterDataNode(f) && e > 0 && e < f.length && m.splitDataNode(f, e);
                m.isCharacterDataNode(a) && b > 0 && b < a.length && (a = m.splitDataNode(a, b), g ? (e -= b, f = a) : f == a.parentNode && e >= m.getNodeIndex(a) && e++, b = 0);
                d(this, a, b, f, e)
            },
            normalizeBoundaries: function () {
                w(this);
                var a = this.startContainer,
                    b = this.startOffset,
                    f = this.endContainer,
                    e = this.endOffset,
                    g = function (a) {
                        var d = a.nextSibling;
                        if (d && d.nodeType == a.nodeType) f = a, e = a.length, a.appendData(d.data), d.parentNode.removeChild(d)
                    }, y = function (d) {
                        var g = d.previousSibling;
                        if (g && g.nodeType == d.nodeType) {
                            a = d;
                            var y = d.length;
                            b = g.length;
                            d.insertData(0, g.data);
                            g.parentNode.removeChild(g);
                            a == f ? (e += b, f = a) : f == d.parentNode && (g = m.getNodeIndex(d), e == g ? (f = d, e = y) : e > g && e--)
                        }
                    }, j = !0;
                m.isCharacterDataNode(f) ? f.length == e && g(f) : (e > 0 && (j = f.childNodes[e - 1]) && m.isCharacterDataNode(j) && g(j), j = !this.collapsed);
                j ? m.isCharacterDataNode(a) ? b == 0 && y(a) : b < a.childNodes.length && (g = a.childNodes[b]) && m.isCharacterDataNode(g) && y(g) : (a = f, b = e);
                d(this, a, b, f, e)
            },
            collapseToPoint: function (a, d) {
                p(this);
                v(a, !0);
                F(a, d);
                M(this, a, d)
            }
        });
        I(a)
    }
    function P(a) {
        a.collapsed = a.startContainer === a.endContainer && a.startOffset === a.endOffset;
        a.commonAncestorContainer = a.collapsed ? a.startContainer : m.getCommonAncestor(a.startContainer, a.endContainer)
    }
    function N(a, b, f, e, g) {
        var y = a.startContainer !== b || a.startOffset !== f,
            j = a.endContainer !== e || a.endOffset !== g;
        a.startContainer = b;
        a.startOffset = f;
        a.endContainer = e;
        a.endOffset = g;
        P(a);
        d(a, "boundarychange", {
            startMoved: y,
            endMoved: j
        })
    }
    function E(a) {
        this.startContainer = a;
        this.startOffset = 0;
        this.endContainer = a;
        this.endOffset = 0;
        this._listeners = {
            boundarychange: [],
            detach: []
        };
        P(this)
    }
    e.requireModules(["DomUtil"]);
    var m = e.dom,
        u = m.DomPosition,
        D = e.DOMException;
    k.prototype = {
        _current: null,
        _next: null,
        _first: null,
        _last: null,
        isSingleCharacterDataNode: !1,
        reset: function () {
            this._current = null;
            this._next = this._first
        },
        hasNext: function () {
            return !!this._next
        },
        next: function () {
            var a = this._current = this._next;
            if (a) this._next = a !== this._last ? a.nextSibling : null, m.isCharacterDataNode(a) && this.clonePartiallySelectedTextNodes && (a === this.ec && (a = a.cloneNode(!0)).deleteData(this.eo, a.length - this.eo), this._current === this.sc && (a = a.cloneNode(!0)).deleteData(0, this.so));
            return a
        },
        remove: function () {
            var a = this._current,
                d, b;
            m.isCharacterDataNode(a) && (a === this.sc || a === this.ec) ? (d = a === this.sc ? this.so : 0, b = a === this.ec ? this.eo : a.length, d != b && a.deleteData(d, b - d)) : a.parentNode && a.parentNode.removeChild(a)
        },
        isPartiallySelectedSubtree: function () {
            return b(this._current, this.range)
        },
        getSubtreeIterator: function () {
            var d;
            if (this.isSingleCharacterDataNode) d = this.range.cloneRange(), d.collapse();
            else {
                d = new E(a(this.range));
                var b = this._current,
                    f = b,
                    e = 0,
                    g = b,
                    y = m.getNodeLength(b);
                if (m.isAncestorOf(b, this.sc, !0)) f = this.sc, e = this.so;
                if (m.isAncestorOf(b, this.ec, !0)) g = this.ec, y = this.eo;
                N(d, f, e, g, y)
            }
            return new k(d, this.clonePartiallySelectedTextNodes)
        },
        detach: function (a) {
            a && this.range.detach();
            this.range = this._current = this._next = this._first = this._last = this.sc = this.so = this.ec = this.eo = null
        }
    };
    r.prototype = {
        BAD_BOUNDARYPOINTS_ERR: 1,
        INVALID_NODE_TYPE_ERR: 2
    };
    r.prototype.toString = function () {
        return this.message
    };
    j.prototype = {
        _current: null,
        hasNext: function () {
            return !!this._next
        },
        next: function () {
            this._current = this._next;
            this._next = this.nodes[++this._position];
            return this._current
        },
        detach: function () {
            this._current = this._next = this.nodes = null
        }
    };
    var O = [1, 3, 4, 5,
    7, 8, 10],
        J = [2, 9, 11],
        Q = [1, 3, 4, 5, 7, 8, 10, 11],
        L = [1, 3, 4, 5, 7, 8],
        y = m.getRootContainer,
        M = q([9, 11]),
        $ = q([5, 6, 10, 12]),
        Z = q([6, 10, 12]),
        T = ["startContainer", "startOffset", "endContainer", "endOffset", "collapsed", "commonAncestorContainer"],
        R = 0,
        U = 1,
        aa = 2,
        V = 3,
        W = 0,
        X = 1,
        Y = 2,
        S = 3;
    H.prototype = {
        attachListener: function (a, d) {
            this._listeners[a].push(d)
        },
        compareBoundaryPoints: function (a, d) {
            w(this);
            B(this.startContainer, d.startContainer);
            var b = a == V || a == R ? "start" : "end",
                f = a == U || a == R ? "start" : "end";
            return m.comparePoints(this[b + "Container"],
            this[b + "Offset"], d[f + "Container"], d[f + "Offset"])
        },
        insertNode: function (a) {
            w(this);
            x(a, Q);
            A(this.startContainer);
            if (m.isAncestorOf(a, this.startContainer, !0)) throw new D("HIERARCHY_REQUEST_ERR");
            this.setStartBefore(h(a, this.startContainer, this.startOffset))
        },
        cloneContents: function () {
            w(this);
            var d, b;
            if (this.collapsed) return a(this).createDocumentFragment();
            else {
                if (this.startContainer === this.endContainer && m.isCharacterDataNode(this.startContainer)) return d = this.startContainer.cloneNode(!0), d.data = d.data.slice(this.startOffset,
                this.endOffset), b = a(this).createDocumentFragment(), b.appendChild(d), b;
                else b = new k(this, !0), d = i(b), b.detach();
                return d
            }
        },
        canSurroundContents: function () {
            w(this);
            A(this.startContainer);
            A(this.endContainer);
            var a = new k(this, !0),
                d = a._first && b(a._first, this) || a._last && b(a._last, this);
            a.detach();
            return !d
        },
        surroundContents: function (a) {
            x(a, L);
            if (!this.canSurroundContents()) throw new r("BAD_BOUNDARYPOINTS_ERR");
            var d = this.extractContents();
            if (a.hasChildNodes()) for (; a.lastChild;) a.removeChild(a.lastChild);
            h(a, this.startContainer, this.startOffset);
            a.appendChild(d);
            this.selectNode(a)
        },
        cloneRange: function () {
            w(this);
            for (var d = new E(a(this)), b = T.length, f; b--;) f = T[b], d[f] = this[f];
            return d
        },
        toString: function () {
            w(this);
            var a = this.startContainer;
            if (a === this.endContainer && m.isCharacterDataNode(a)) return a.nodeType == 3 || a.nodeType == 4 ? a.data.slice(this.startOffset, this.endOffset) : "";
            else {
                var d = [],
                    a = new k(this, !0);
                l(a, function (a) {
                    (a.nodeType == 3 || a.nodeType == 4) && d.push(a.data)
                });
                a.detach();
                return d.join("")
            }
        },
        compareNode: function (a) {
            w(this);
            var d = a.parentNode,
                b = m.getNodeIndex(a);
            if (!d) throw new D("NOT_FOUND_ERR");
            a = this.comparePoint(d, b);
            d = this.comparePoint(d, b + 1);
            return a < 0 ? d > 0 ? Y : W : d > 0 ? X : S
        },
        comparePoint: function (a, d) {
            w(this);
            z(a, "HIERARCHY_REQUEST_ERR");
            B(a, this.startContainer);
            if (m.comparePoints(a, d, this.startContainer, this.startOffset) < 0) return -1;
            else if (m.comparePoints(a, d, this.endContainer, this.endOffset) > 0) return 1;
            return 0
        },
        createContextualFragment: function (d) {
            p(this);
            var b = a(this),
                f = b.createElement("div");
            f.innerHTML = d;
            for (d = b.createDocumentFragment(); b = f.firstChild;) d.appendChild(b);
            return d
        },
        toHtml: function () {
            w(this);
            var d = a(this).createElement("div");
            d.appendChild(this.cloneContents());
            return d.innerHTML
        },
        intersectsNode: function (d, b) {
            w(this);
            z(d, "NOT_FOUND_ERR");
            if (m.getDocument(d) !== a(this)) return !1;
            var f = d.parentNode,
                e = m.getNodeIndex(d);
            z(f, "NOT_FOUND_ERR");
            var g = m.comparePoints(f, e, this.endContainer, this.endOffset),
                f = m.comparePoints(f, e + 1, this.startContainer, this.startOffset);
            return b ? g <= 0 && f >= 0 : g < 0 && f > 0
        },
        isPointInRange: function (a,
        d) {
            w(this);
            z(a, "HIERARCHY_REQUEST_ERR");
            B(a, this.startContainer);
            return m.comparePoints(a, d, this.startContainer, this.startOffset) >= 0 && m.comparePoints(a, d, this.endContainer, this.endOffset) <= 0
        },
        intersectsRange: function (d, b) {
            w(this);
            if (a(d) != a(this)) throw new D("WRONG_DOCUMENT_ERR");
            var f = m.comparePoints(this.startContainer, this.startOffset, d.endContainer, d.endOffset),
                e = m.comparePoints(this.endContainer, this.endOffset, d.startContainer, d.startOffset);
            return b ? f <= 0 && e >= 0 : f < 0 && e > 0
        },
        intersection: function (a) {
            if (this.intersectsRange(a)) {
                var d = m.comparePoints(this.startContainer, this.startOffset, a.startContainer, a.startOffset),
                    b = m.comparePoints(this.endContainer, this.endOffset, a.endContainer, a.endOffset),
                    f = this.cloneRange();
                d == -1 && f.setStart(a.startContainer, a.startOffset);
                b == 1 && f.setEnd(a.endContainer, a.endOffset);
                return f
            }
            return null
        },
        union: function (a) {
            if (this.intersectsRange(a, !0)) {
                var d = this.cloneRange();
                m.comparePoints(a.startContainer, a.startOffset, this.startContainer, this.startOffset) == -1 && d.setStart(a.startContainer, a.startOffset);
                m.comparePoints(a.endContainer, a.endOffset, this.endContainer, this.endOffset) == 1 && d.setEnd(a.endContainer, a.endOffset);
                return d
            } else throw new r("Ranges do not intersect");
        },
        containsNode: function (a, d) {
            return d ? this.intersectsNode(a, !1) : this.compareNode(a) == S
        },
        containsNodeContents: function (a) {
            return this.comparePoint(a, 0) >= 0 && this.comparePoint(a, m.getNodeLength(a)) <= 0
        },
        containsRange: function (a) {
            return this.intersection(a).equals(a)
        },
        containsNodeText: function (a) {
            var d = this.cloneRange();
            d.selectNode(a);
            var b = d.getNodes([3]);
            return b.length > 0 ? (d.setStart(b[0], 0), a = b.pop(), d.setEnd(a, a.length), a = this.containsRange(d), d.detach(), a) : this.containsNodeContents(a)
        },
        createNodeIterator: function (a, d) {
            w(this);
            return new j(this, a, d)
        },
        getNodes: function (a, d) {
            w(this);
            return s(this, a, d)
        },
        getDocument: function () {
            return a(this)
        },
        collapseBefore: function (a) {
            p(this);
            this.setEndBefore(a);
            this.collapse(!1)
        },
        collapseAfter: function (a) {
            p(this);
            this.setStartAfter(a);
            this.collapse(!0)
        },
        getName: function () {
            return "DomRange"
        },
        equals: function (a) {
            return E.rangesEqual(this, a)
        },
        inspect: function () {
            return o(this)
        }
    };
    C(E, N, function (a) {
        p(a);
        a.startContainer = a.startOffset = a.endContainer = a.endOffset = null;
        a.collapsed = a.commonAncestorContainer = null;
        d(a, "detach", null);
        a._listeners = null
    });
    e.rangePrototype = H.prototype;
    E.rangeProperties = T;
    E.RangeIterator = k;
    E.copyComparisonConstants = I;
    E.createPrototypeRange = C;
    E.inspect = o;
    E.getRangeDocument = a;
    E.rangesEqual = function (a, d) {
        return a.startContainer === d.startContainer && a.startOffset === d.startOffset && a.endContainer === d.endContainer && a.endOffset === d.endOffset
    };
    e.DomRange = E;
    e.RangeException = r
});
rangy.createModule("WrappedRange", function (e) {
    function b(a, d, b, e) {
        var h = a.duplicate();
        h.collapse(b);
        var k = h.parentElement();
        f.isAncestorOf(d, k, !0) || (k = d);
        if (!k.canHaveHTML) return new g(k.parentNode, f.getNodeIndex(k));
        var d = f.getDocument(k).createElement("span"),
            r, j = b ? "StartToStart" : "StartToEnd";
        do k.insertBefore(d, d.previousSibling), h.moveToElementText(d);
        while ((r = h.compareEndPoints(j, a)) > 0 && d.previousSibling);
        j = d.nextSibling;
        if (r == -1 && j && f.isCharacterDataNode(j)) {
            h.setEndPoint(b ? "EndToStart" : "EndToEnd",
            a);
            if (/[\r\n]/.test(j.data)) {
                k = h.duplicate();
                b = k.text.replace(/\r\n/g, "\r").length;
                for (b = k.moveStart("character", b); k.compareEndPoints("StartToEnd", k) == -1;) b++, k.moveStart("character", 1)
            } else b = h.text.length;
            k = new g(j, b)
        } else j = (e || !b) && d.previousSibling, k = (b = (e || b) && d.nextSibling) && f.isCharacterDataNode(b) ? new g(b, 0) : j && f.isCharacterDataNode(j) ? new g(j, j.length) : new g(k, f.getNodeIndex(d));
        d.parentNode.removeChild(d);
        return k
    }
    function a(a, d) {
        var b, e, g = a.offset,
            h = f.getDocument(a.node),
            r = h.body.createTextRange(),
            j = f.isCharacterDataNode(a.node);
        j ? (b = a.node, e = b.parentNode) : (b = a.node.childNodes, b = g < b.length ? b[g] : null, e = a.node);
        h = h.createElement("span");
        h.innerHTML = "&#feff;";
        b ? e.insertBefore(h, b) : e.appendChild(h);
        r.moveToElementText(h);
        r.collapse(!d);
        e.removeChild(h);
        if (j) r[d ? "moveStart" : "moveEnd"]("character", g);
        return r
    }
    e.requireModules(["DomUtil", "DomRange"]);
    var d, f = e.dom,
        g = f.DomPosition,
        h = e.DomRange;
    if (e.features.implementsDomRange && (!e.features.implementsTextRange || !e.config.preferTextRange))(function () {
        function a(d) {
            for (var b = e.length, f; b--;) f = e[b], d[f] = d.nativeRange[f]
        }
        var b, e = h.rangeProperties,
            g;
        d = function (d) {
            if (!d) throw Error("Range must be specified");
            this.nativeRange = d;
            a(this)
        };
        h.createPrototypeRange(d, function (a, d, b, f, e) {
            var g = a.endContainer !== f || a.endOffset != e;
            if (a.startContainer !== d || a.startOffset != b || g) a.setEnd(f, e), a.setStart(d, b)
        }, function (a) {
            a.nativeRange.detach();
            a.detached = !0;
            for (var d = e.length, b; d--;) b = e[d], a[b] = null
        });
        b = d.prototype;
        b.selectNode = function (d) {
            this.nativeRange.selectNode(d);
            a(this)
        };
        b.deleteContents = function () {
            this.nativeRange.deleteContents();
            a(this)
        };
        b.extractContents = function () {
            var d = this.nativeRange.extractContents();
            a(this);
            return d
        };
        b.cloneContents = function () {
            return this.nativeRange.cloneContents()
        };
        b.surroundContents = function (d) {
            this.nativeRange.surroundContents(d);
            a(this)
        };
        b.collapse = function (d) {
            this.nativeRange.collapse(d);
            a(this)
        };
        b.cloneRange = function () {
            return new d(this.nativeRange.cloneRange())
        };
        b.refresh = function () {
            a(this)
        };
        b.toString = function () {
            return this.nativeRange.toString()
        };
        var i = document.createTextNode("test");
        f.getBody(document).appendChild(i);
        var k = document.createRange();
        k.setStart(i, 0);
        k.setEnd(i, 0);
        try {
            k.setStart(i, 1), b.setStart = function (d, b) {
                this.nativeRange.setStart(d, b);
                a(this)
            }, b.setEnd = function (d, b) {
                this.nativeRange.setEnd(d, b);
                a(this)
            }, g = function (d) {
                return function (b) {
                    this.nativeRange[d](b);
                    a(this)
                }
            }
        } catch (r) {
            b.setStart = function (d, b) {
                try {
                    this.nativeRange.setStart(d, b)
                } catch (f) {
                    this.nativeRange.setEnd(d, b), this.nativeRange.setStart(d, b)
                }
                a(this)
            }, b.setEnd = function (d,
            b) {
                try {
                    this.nativeRange.setEnd(d, b)
                } catch (f) {
                    this.nativeRange.setStart(d, b), this.nativeRange.setEnd(d, b)
                }
                a(this)
            }, g = function (d, b) {
                return function (f) {
                    try {
                        this.nativeRange[d](f)
                    } catch (e) {
                        this.nativeRange[b](f), this.nativeRange[d](f)
                    }
                    a(this)
                }
            }
        }
        b.setStartBefore = g("setStartBefore", "setEndBefore");
        b.setStartAfter = g("setStartAfter", "setEndAfter");
        b.setEndBefore = g("setEndBefore", "setStartBefore");
        b.setEndAfter = g("setEndAfter", "setStartAfter");
        k.selectNodeContents(i);
        b.selectNodeContents = k.startContainer == i && k.endContainer == i && k.startOffset == 0 && k.endOffset == i.length ? function (d) {
            this.nativeRange.selectNodeContents(d);
            a(this)
        } : function (a) {
            this.setStart(a, 0);
            this.setEnd(a, h.getEndOffset(a))
        };
        k.selectNodeContents(i);
        k.setEnd(i, 3);
        g = document.createRange();
        g.selectNodeContents(i);
        g.setEnd(i, 4);
        g.setStart(i, 2);
        b.compareBoundaryPoints = k.compareBoundaryPoints(k.START_TO_END, g) == -1 & k.compareBoundaryPoints(k.END_TO_START, g) == 1 ? function (a, d) {
            d = d.nativeRange || d;
            if (a == d.START_TO_END) a = d.END_TO_START;
            else if (a == d.END_TO_START) a = d.START_TO_END;
            return this.nativeRange.compareBoundaryPoints(a, d)
        } : function (a, d) {
            return this.nativeRange.compareBoundaryPoints(a, d.nativeRange || d)
        };
        f.getBody(document).removeChild(i);
        k.detach();
        g.detach()
    })(), e.createNativeRange = function (a) {
        return (a || document).createRange()
    };
    else if (e.features.implementsTextRange) {
        d = function (a) {
            this.textRange = a;
            this.refresh()
        };
        d.prototype = new h(document);
        d.prototype.refresh = function () {
            var a, d, e = this.textRange;
            a = e.parentElement();
            var g = e.duplicate();
            g.collapse(!0);
            d = g.parentElement();
            g = e.duplicate();
            g.collapse(!1);
            e = g.parentElement();
            d = d == e ? d : f.getCommonAncestor(d, e);
            d = d == a ? d : f.getCommonAncestor(a, d);
            this.textRange.compareEndPoints("StartToEnd", this.textRange) == 0 ? d = a = b(this.textRange, d, !0, !0) : (a = b(this.textRange, d, !0, !1), d = b(this.textRange, d, !1, !1));
            this.setStart(a.node, a.offset);
            this.setEnd(d.node, d.offset)
        };
        h.copyComparisonConstants(d);
        var i = function () {
            return this
        }();
        if (typeof i.Range == "undefined") i.Range = d;
        e.createNativeRange = function (a) {
            return (a || document).body.createTextRange()
        }
    }
    if (e.features.implementsTextRange) d.rangeToTextRange = function (d) {
        if (d.collapsed) return a(new g(d.startContainer, d.startOffset), !0);
        else {
            var b = a(new g(d.startContainer, d.startOffset), !0),
                e = a(new g(d.endContainer, d.endOffset), !1),
                d = f.getDocument(d.startContainer).body.createTextRange();
            d.setEndPoint("StartToStart", b);
            d.setEndPoint("EndToEnd", e);
            return d
        }
    };
    d.prototype.getName = function () {
        return "WrappedRange"
    };
    e.WrappedRange = d;
    e.createRange = function (a) {
        return new d(e.createNativeRange(a || document))
    };
    e.createRangyRange = function (a) {
        return new h(a || document)
    };
    e.createIframeRange = function (a) {
        return e.createRange(f.getIframeDocument(a))
    };
    e.createIframeRangyRange = function (a) {
        return e.createRangyRange(f.getIframeDocument(a))
    };
    e.addCreateMissingNativeApiListener(function (a) {
        a = a.document;
        if (typeof a.createRange == "undefined") a.createRange = function () {
            return e.createRange(this)
        };
        a = a = null
    })
});
rangy.createModule("WrappedSelection", function (e, b) {
    function a(a) {
        return (a || window).getSelection()
    }
    function d(a) {
        return (a || window).document.selection
    }
    function f(a, d, b) {
        var f = b ? "end" : "start",
            b = b ? "start" : "end";
        a.anchorNode = d[f + "Container"];
        a.anchorOffset = d[f + "Offset"];
        a.focusNode = d[b + "Container"];
        a.focusOffset = d[b + "Offset"]
    }
    function g(a) {
        a.anchorNode = a.focusNode = null;
        a.anchorOffset = a.focusOffset = 0;
        a.rangeCount = 0;
        a.isCollapsed = !0;
        a._ranges.length = 0
    }
    function h(a) {
        var d;
        if (a instanceof v) {
            if (d = a._selectionNativeRange, !d) d = e.createNativeRange(j.getDocument(a.startContainer)), d.setEnd(a.endContainer, a.endOffset), d.setStart(a.startContainer, a.startOffset), a._selectionNativeRange = d, a.attachListener("detach", function () {
                this._selectionNativeRange = null
            })
        } else a instanceof p ? d = a.nativeRange : e.features.implementsDomRange && a instanceof j.getWindow(a.startContainer).Range && (d = a);
        return d
    }
    function i(a) {
        var d = a.getNodes(),
            b;
        a: if (!d.length || d[0].nodeType != 1) b = !1;
        else {
            b = 1;
            for (var f = d.length; b < f; ++b) if (!j.isAncestorOf(d[0], d[b])) {
                b = !1;
                break a
            }
            b = !0
        }
        if (!b) throw Error("getSingleElementFromRange: range " + a.inspect() + " did not consist of a single element");
        return d[0]
    }
    function l(a, d) {
        var b = new p(d);
        a._ranges = [b];
        f(a, b, !1);
        a.rangeCount = 1;
        a.isCollapsed = b.collapsed
    }
    function t(a) {
        a._ranges.length = 0;
        if (a.docSelection.type == "None") g(a);
        else {
            var d = a.docSelection.createRange();
            if (d && typeof d.text != "undefined") l(a, d);
            else {
                a.rangeCount = d.length;
                for (var b, h = j.getDocument(d.item(0)), C = 0; C < a.rangeCount; ++C) b = e.createRange(h), b.selectNode(d.item(C)),
                a._ranges.push(b);
                a.isCollapsed = a.rangeCount == 1 && a._ranges[0].collapsed;
                f(a, a._ranges[a.rangeCount - 1], !1)
            }
        }
    }
    function n(a, d) {
        for (var b = a.docSelection.createRange(), f = i(d), e = j.getDocument(b.item(0)), e = j.getBody(e).createControlRange(), g = 0, h = b.length; g < h; ++g) e.add(b.item(g));
        try {
            e.add(f)
        } catch (C) {
            throw Error("addRange(): Element within the specified Range could not be added to control selection (does it have layout?)");
        }
        e.select();
        t(a)
    }
    function s(a, d, b) {
        this.nativeSelection = a;
        this.docSelection = d;
        this._ranges = [];
        this.win = b;
        this.refresh()
    }
    function o(a, d) {
        for (var b = j.getDocument(d[0].startContainer), b = j.getBody(b).createControlRange(), f = 0, e; f < rangeCount; ++f) {
            e = i(d[f]);
            try {
                b.add(e)
            } catch (g) {
                throw Error("setRanges(): Element within the one of the specified Ranges could not be added to control selection (does it have layout?)");
            }
        }
        b.select();
        t(a)
    }
    function k(a, d) {
        if (a.anchorNode && j.getDocument(a.anchorNode) !== j.getDocument(d)) throw new x("WRONG_DOCUMENT_ERR");
    }
    function r(a) {
        var d = [],
            b = new F(a.anchorNode, a.anchorOffset),
            f = new F(a.focusNode, a.focusOffset),
            e = typeof a.getName == "function" ? a.getName() : "Selection";
        if (typeof a.rangeCount != "undefined") for (var g = 0, h = a.rangeCount; g < h; ++g) d[g] = v.inspect(a.getRangeAt(g));
        return "[" + e + "(Ranges: " + d.join(", ") + ")(anchor: " + b.inspect() + ", focus: " + f.inspect() + "]"
    }
    e.requireModules(["DomUtil", "DomRange", "WrappedRange"]);
    e.config.checkSelectionRanges = !0;
    var j = e.dom,
        q = e.util,
        v = e.DomRange,
        p = e.WrappedRange,
        x = e.DOMException,
        F = j.DomPosition,
        B, A, z = e.util.isHostMethod(window, "getSelection"),
        w = e.util.isHostObject(document, "selection"),
        H = w && (!z || e.config.preferTextRange);
    H ? (B = d, e.isSelectionValid = function (a) {
        var a = (a || window).document,
            d = a.selection;
        return d.type != "None" || j.getDocument(d.createRange().parentElement()) == a
    }) : z ? (B = a, e.isSelectionValid = function () {
        return !0
    }) : b.fail("Neither document.selection or window.getSelection() detected.");
    e.getNativeSelection = B;
    var z = B(),
        K = e.createNativeRange(document),
        I = j.getBody(document),
        G = q.areHostObjects(z, q.areHostProperties(z, ["anchorOffset", "focusOffset"]));
    e.features.selectionHasAnchorAndFocus = G;
    var C = q.isHostMethod(z, "extend");
    e.features.selectionHasExtend = C;
    var P = typeof z.rangeCount == "number";
    e.features.selectionHasRangeCount = P;
    var N = !1,
        E = !0;
    q.areHostMethods(z, ["addRange", "getRangeAt", "removeAllRanges"]) && typeof z.rangeCount == "number" && e.features.implementsDomRange && function () {
        var a = document.createElement("iframe");
        I.appendChild(a);
        var d = j.getIframeDocument(a);
        d.open();
        d.write("<html><head></head><body>12</body></html>");
        d.close();
        var b = j.getIframeWindow(a).getSelection(),
            f = d.documentElement.lastChild.firstChild,
            d = d.createRange();
        d.setStart(f, 1);
        d.collapse(!0);
        b.addRange(d);
        E = b.rangeCount == 1;
        b.removeAllRanges();
        var e = d.cloneRange();
        d.setStart(f, 0);
        e.setEnd(f, 2);
        b.addRange(d);
        b.addRange(e);
        N = b.rangeCount == 2;
        d.detach();
        e.detach();
        I.removeChild(a)
    }();
    e.features.selectionSupportsMultipleRanges = N;
    e.features.collapsedNonEditableSelectionsSupported = E;
    var m = !1,
        u;
    I && q.isHostMethod(I, "createControlRange") && (u = I.createControlRange(), q.areHostProperties(u, ["item", "add"]) && (m = !0));
    e.features.implementsControlRange = m;
    A = G ? function (a) {
        return a.anchorNode === a.focusNode && a.anchorOffset === a.focusOffset
    } : function (a) {
        return a.rangeCount ? a.getRangeAt(a.rangeCount - 1).collapsed : !1
    };
    var D;
    q.isHostMethod(z, "getRangeAt") ? D = function (a, d) {
        try {
            return a.getRangeAt(d)
        } catch (b) {
            return null
        }
    } : G && (D = function (a) {
        var d = j.getDocument(a.anchorNode),
            d = e.createRange(d);
        d.setStart(a.anchorNode, a.anchorOffset);
        d.setEnd(a.focusNode, a.focusOffset);
        d.collapsed !== this.isCollapsed && (d.setStart(a.focusNode,
        a.focusOffset), d.setEnd(a.anchorNode, a.anchorOffset));
        return d
    });
    e.getSelection = function (a) {
        var a = a || window,
            b = a._rangySelection,
            f = B(a),
            e = w ? d(a) : null;
        b ? (b.nativeSelection = f, b.docSelection = e, b.refresh(a)) : (b = new s(f, e, a), a._rangySelection = b);
        
        return b
    };
    e.getIframeSelection = function (a) {
        return e.getSelection(j.getIframeWindow(a))
    };
    u = s.prototype;
    if (!H && G && q.areHostMethods(z, ["removeAllRanges", "addRange"])) {
        u.removeAllRanges = function () {
            this.nativeSelection.removeAllRanges();
            g(this)
        };
        var O = function (a, d) {
            var b = v.getRangeDocument(d),
                b = e.createRange(b);
            b.collapseToPoint(d.endContainer, d.endOffset);
            a.nativeSelection.addRange(h(b));
            a.nativeSelection.extend(d.startContainer, d.startOffset);
            a.refresh()
        };
        u.addRange = P ? function (a, d) {
            if (m && w && this.docSelection.type == "Control") n(this, a);
            else if (d && C) O(this, a);
            else {
                var b;
                N ? b = this.rangeCount : (this.removeAllRanges(), b = 0);
                this.nativeSelection.addRange(h(a));
                this.rangeCount = this.nativeSelection.rangeCount;
                this.rangeCount == b + 1 ? (e.config.checkSelectionRanges && (b = D(this.nativeSelection,
                this.rangeCount - 1)) && !v.rangesEqual(b, a) && (a = new p(b)), this._ranges[this.rangeCount - 1] = a, f(this, a, L(this.nativeSelection)), this.isCollapsed = A(this)) : this.refresh()
            }
        } : function (a, d) {
            d && C ? O(this, a) : (this.nativeSelection.addRange(h(a)), this.refresh())
        };
        u.setRanges = function (a) {
            if (m && a.length > 1) o(this, a);
            else {
                this.removeAllRanges();
                for (var d = 0, b = a.length; d < b; ++d) this.addRange(a[d])
            }
        }
    } else if (q.isHostMethod(z, "empty") && q.isHostMethod(K, "select") && m && H) u.removeAllRanges = function () {
        try {
            if (this.docSelection.empty(),
            this.docSelection.type != "None") {
                var a;
                if (this.anchorNode) a = j.getDocument(this.anchorNode);
                else if (this.docSelection.type == "Control") {
                    var d = this.docSelection.createRange();
                    d.length && (a = j.getDocument(d.item(0)).body.createTextRange())
                }
                a && (a.body.createTextRange().select(), this.docSelection.empty())
            }
        } catch (b) {}
        g(this)
    }, u.addRange = function (a) {
        this.docSelection.type == "Control" ? n(this, a) : (p.rangeToTextRange(a).select(), this._ranges[0] = a, this.rangeCount = 1, this.isCollapsed = this._ranges[0].collapsed, f(this,
        a, !1))
    }, u.setRanges = function (a) {
        this.removeAllRanges();
        var d = a.length;
        d > 1 ? o(this, a) : d && this.addRange(a[0])
    };
    else return b.fail("No means of selecting a Range or TextRange was found"), !1;
    u.getRangeAt = function (a) {
        if (a < 0 || a >= this.rangeCount) throw new x("INDEX_SIZE_ERR");
        else return this._ranges[a]
    };
    var J;
    if (H) J = function (a) {
        var d;
        e.isSelectionValid(a.win) ? d = a.docSelection.createRange() : (d = j.getBody(a.win.document).createTextRange(), d.collapse(!0));
        a.docSelection.type == "Control" ? t(a) : d && typeof d.text !=
            "undefined" ? l(a, d) : g(a)
    };
    else if (q.isHostMethod(z, "getRangeAt") && typeof z.rangeCount == "number") J = function (a) {
        if (m && w && a.docSelection.type == "Control") t(a);
        else if (a._ranges.length = a.rangeCount = a.nativeSelection.rangeCount, a.rangeCount) {
            for (var d = 0, b = a.rangeCount; d < b; ++d) a._ranges[d] = new e.WrappedRange(a.nativeSelection.getRangeAt(d));
            f(a, a._ranges[a.rangeCount - 1], L(a.nativeSelection));
            a.isCollapsed = A(a)
        } else g(a)
    };
    else if (G && typeof z.isCollapsed == "boolean" && typeof K.collapsed == "boolean" && e.features.implementsDomRange) J = function (a) {
        var d;
        d = a.nativeSelection;
        d.anchorNode ? (d = D(d, 0), a._ranges = [d], a.rangeCount = 1, d = a.nativeSelection, a.anchorNode = d.anchorNode, a.anchorOffset = d.anchorOffset, a.focusNode = d.focusNode, a.focusOffset = d.focusOffset, a.isCollapsed = A(a)) : g(a)
    };
    else return b.fail("No means of obtaining a Range or TextRange from the user's selection was found"), !1;
    u.refresh = function (a) {
        var d = a ? this._ranges.slice(0) : null;
        J(this);
        if (a) {
            a = d.length;
            if (a != this._ranges.length) return !1;
            for (; a--;) if (!v.rangesEqual(d[a], this._ranges[a])) return !1;
            return !0
        }
    };
    var Q = function (a, d) {
        var b = a.getAllRanges(),
            f = !1;
        a.removeAllRanges();
        for (var e = 0, h = b.length; e < h; ++e) f || d !== b[e] ? a.addRange(b[e]) : f = !0;
        a.rangeCount || g(a)
    };
    u.removeRange = m ? function (a) {
        if (this.docSelection.type == "Control") {
            for (var d = this.docSelection.createRange(), a = i(a), b = j.getDocument(d.item(0)), b = j.getBody(b).createControlRange(), f, e = !1, g = 0, h = d.length; g < h; ++g) f = d.item(g), f !== a || e ? b.add(d.item(g)) : e = !0;
            b.select();
            t(this)
        } else Q(this, a)
    } : function (a) {
        Q(this, a)
    };
    var L;
    !H && G && e.features.implementsDomRange ? (L = function (a) {
        var d = !1;
        a.anchorNode && (d = j.comparePoints(a.anchorNode, a.anchorOffset, a.focusNode, a.focusOffset) == 1);
        return d
    }, u.isBackwards = function () {
        return L(this)
    }) : L = u.isBackwards = function () {
        return !1
    };
    u.toString = function () {
        for (var a = [], d = 0, b = this.rangeCount; d < b; ++d) a[d] = "" + this._ranges[d];
        return a.join("")
    };
    u.collapse = function (a, d) {
        k(this, a);
        var b = e.createRange(j.getDocument(a));
        b.collapseToPoint(a, d);
        this.removeAllRanges();
        this.addRange(b);
        this.isCollapsed = !0
    };
    u.collapseToStart = function () {
        if (this.rangeCount) {
            var a = this._ranges[0];
            this.collapse(a.startContainer, a.startOffset)
        } else throw new x("INVALID_STATE_ERR");
    };
    u.collapseToEnd = function () {
        if (this.rangeCount) {
            var a = this._ranges[this.rangeCount - 1];
            this.collapse(a.endContainer, a.endOffset)
        } else throw new x("INVALID_STATE_ERR");
    };
    u.selectAllChildren = function (a) {
        k(this, a);
        var d = e.createRange(j.getDocument(a));
        d.selectNodeContents(a);
        this.removeAllRanges();
        this.addRange(d)
    };
    u.deleteFromDocument = function () {
        if (m && w && this.docSelection.type == "Control") {
            for (var a = this.docSelection.createRange(),
            d; a.length;) d = a.item(0), a.remove(d), d.parentNode.removeChild(d);
            this.refresh()
        } else if (this.rangeCount) {
            a = this.getAllRanges();
            this.removeAllRanges();
            d = 0;
            for (var b = a.length; d < b; ++d) a[d].deleteContents();
            this.addRange(a[b - 1])
        }
    };
    u.getAllRanges = function () {
        return this._ranges.slice(0)
    };
    u.setSingleRange = function (a) {
        this.setRanges([a])
    };
    u.containsNode = function (a, d) {
        for (var b = 0, f = this._ranges.length; b < f; ++b) if (this._ranges[b].containsNode(a, d)) return !0;
        return !1
    };
    u.toHtml = function () {
        var a = "";
        if (this.rangeCount) {
            for (var a = v.getRangeDocument(this._ranges[0]).createElement("div"), d = 0, b = this._ranges.length; d < b; ++d) a.appendChild(this._ranges[d].cloneContents());
            a = a.innerHTML
        }
        return a
    };
    u.getName = function () {
        return "WrappedSelection"
    };
    u.inspect = function () {
        return r(this)
    };
    u.detach = function () {
        this.win = this.anchorNode = this.focusNode = this.win._rangySelection = null
    };
    s.inspect = r;
    e.Selection = s;
    e.selectionPrototype = u;
    e.addCreateMissingNativeApiListener(function (a) {
        if (typeof a.getSelection == "undefined") a.getSelection = function () {
            return e.getSelection(this)
        };
        a = null
    })
});
rangy.createModule("CssClassApplier", function (e, b) {
    function a(a, d) {
        return a.className && RegExp("(?:^|\\s)" + d + "(?:\\s|$)").test(a.className)
    }
    function d(d, b) {
        d.className ? a(d, b) || (d.className += " " + b) : d.className = b
    }
    function f(a) {
        return a.split(/\s+/).sort().join(" ")
    }
    function g(a, d) {
        return f(a.className) == f(d.className)
    }
    function h(a) {
        for (var d = a.parentNode; a.hasChildNodes();) d.insertBefore(a.firstChild, a);
        d.removeChild(a)
    }
    function i(a, d) {
        var b = a.cloneRange();
        b.selectNodeContents(d);
        var f = b.intersection(a),
            f = f ? f.toString() : "";
        b.detach();
        return f != ""
    }
    function l(a) {
        return a.getNodes([3], function (d) {
            return i(a, d)
        })
    }
    function t(a, d) {
        if (a.attributes.length != d.attributes.length) return !1;
        for (var b = 0, f = a.attributes.length, e, g; b < f; ++b) if (e = a.attributes[b], g = e.name, g != "class") {
            g = d.attributes.getNamedItem(g);
            if (e.specified != g.specified) return !1;
            if (e.specified && e.nodeValue !== g.nodeValue) return !1
        }
        return !0
    }
    function n(a, d) {
        for (var b = 0, f = a.attributes.length, e; b < f; ++b) if (e = a.attributes[b].name, (!d || !x.arrayContains(d,
        e)) && a.attributes[b].specified && e != "class") return !0;
        return !1
    }
    function s(a) {
        var d;
        return a && a.nodeType == 1 && ((d = a.parentNode) && d.nodeType == 9 && d.designMode == "on" || A(a) && !A(a.parentNode))
    }
    function o(a) {
        return (A(a) || a.nodeType != 1 && A(a.parentNode)) && !s(a)
    }
    function k(a) {
        return a && a.nodeType == 1 && !z.test(B(a, "display"))
    }
    function r(a) {
        if (a.data.length == 0) return !0;
        if (w.test(a.data)) return !1;
        switch (B(a.parentNode, "whiteSpace")) {
            case "pre":
            case "pre-wrap":
            case "-moz-pre-wrap":
                return !1;
            case "pre-line":
                if (/[\r\n]/.test(a.data)) return !1
        }
        return k(a.previousSibling) || k(a.nextSibling)
    }
    function j(a, d, f, e) {
        var g, h = f == 0;
        if (x.isAncestorOf(d, a)) throw b.createError("descendant is ancestor of node");
        if (x.isCharacterDataNode(d)) if (f == 0) f = x.getNodeIndex(d), d = d.parentNode;
        else if (f == d.length) f = x.getNodeIndex(d) + 1, d = d.parentNode;
        else throw b.createError("splitNodeAt should not be called with offset in the middle of a data node (" + f + " in " + d.data);
        if (x.isCharacterDataNode(d) ? f == 0 ? d.previousSibling : f == d.length ? d.nextSibling : 1 : f > 0 && f < d.childNodes.length) {
            if (!g) {
                g = d.cloneNode(!1);
                for (g.id && g.removeAttribute("id"); h = d.childNodes[f];) g.appendChild(h);
                x.insertAfter(g, d)
            }
            return d == a ? g : j(a, g.parentNode, x.getNodeIndex(g), e)
        } else if (a != d) return g = d.parentNode, d = x.getNodeIndex(d), h || d++, j(a, g, d, e);
        return a
    }
    function q(a) {
        var d = a ? "nextSibling" : "previousSibling";
        return function (b, f) {
            var e = b.parentNode,
                h = b[d];
            if (h) {
                if (h && h.nodeType == 3) return h
            } else if (f && (h = e[d]) && h.nodeType == 1 && e.tagName == h.tagName && g(e, h) && t(e, h)) return h[a ? "firstChild" : "lastChild"];
            return null
        }
    }
    function v(a) {
        this.firstTextNode = (this.isElementMerge = a.nodeType == 1) ? a.lastChild : a;
        this.textNodes = [this.firstTextNode]
    }
    function p(a, d, b) {
        this.cssClass = a;
        var e, g, h = null;
        if (typeof d == "object" && d !== null) {
            b = d.tagNames;
            h = d.elementProperties;
            for (e = 0; g = I[e++];) d.hasOwnProperty(g) && (this[g] = d[g]);
            e = d.normalize
        } else e = d;
        this.normalize = typeof e == "undefined" ? !0 : e;
        this.attrExceptions = [];
        e = document.createElement(this.elementTagName);
        this.elementProperties = {};
        for (var j in h) h.hasOwnProperty(j) && (G.hasOwnProperty(j) && (j = G[j]), e[j] = h[j], this.elementProperties[j] = e[j], this.attrExceptions.push(j));
        this.elementSortedClassName = this.elementProperties.hasOwnProperty("className") ? f(this.elementProperties.className + " " + a) : a;
        this.applyToAnyTagName = !1;
        a = typeof b;
        if (a == "string") b == "*" ? this.applyToAnyTagName = !0 : this.tagNames = b.toLowerCase().replace(/^\s\s*/, "").replace(/\s\s*$/, "").split(/\s*,\s*/);
        else if (a == "object" && typeof b.length == "number") {
            this.tagNames = [];
            e = 0;
            for (a = b.length; e < a; ++e) b[e] == "*" ? this.applyToAnyTagName = !0 : this.tagNames.push(b[e].toLowerCase())
        } else this.tagNames = [this.elementTagName]
    }
    e.requireModules(["WrappedSelection", "WrappedRange"]);
    var x = e.dom,
        F = function () {
            function a(d, b, f) {
                return b && f ? " " : ""
            }
            return function (d, b) {
                if (d.className) d.className = d.className.replace(RegExp("(?:^|\\s)" + b + "(?:\\s|$)"), a)
            }
        }(),
        B;
    typeof window.getComputedStyle != "undefined" ? B = function (a, d) {
        return x.getWindow(a).getComputedStyle(a, null)[d]
    } : typeof document.documentElement.currentStyle != "undefined" ? B = function (a, d) {
        return a.currentStyle[d]
    } : b.fail("No means of obtaining computed style properties found");
    var A;
    (function () {
        A = typeof document.createElement("div").isContentEditable == "boolean" ? function (a) {
            return a && a.nodeType == 1 && a.isContentEditable
        } : function (a) {
            return !a || a.nodeType != 1 || a.contentEditable == "false" ? !1 : a.contentEditable == "true" || A(a.parentNode)
        }
    })();
    var z = /^inline(-block|-table)?$/i,
        w = /[^\r\n\t\f \u200B]/,
        H = q(!1),
        K = q(!0);
    v.prototype = {
        doMerge: function () {
            for (var a = [], d, b, f = 0, e = this.textNodes.length; f < e; ++f) d = this.textNodes[f], b = d.parentNode, a[f] = d.data, f && (b.removeChild(d), b.hasChildNodes() || b.parentNode.removeChild(b));
            return this.firstTextNode.data = a = a.join("")
        },
        getLength: function () {
            for (var a = this.textNodes.length, d = 0; a--;) d += this.textNodes[a].length;
            return d
        },
        toString: function () {
            for (var a = [], d = 0, b = this.textNodes.length; d < b; ++d) a[d] = "'" + this.textNodes[d].data + "'";
            return "[Merge(" + a.join(",") + ")]"
        }
    };
    var I = ["elementTagName", "ignoreWhiteSpace", "applyToEditableOnly"],
        G = {
            "class": "className"
        };
    p.prototype = {
        elementTagName: "span",
        elementProperties: {},
        ignoreWhiteSpace: !0,
        applyToEditableOnly: !1,
        hasClass: function (d) {
            return d.nodeType == 1 && x.arrayContains(this.tagNames, d.tagName.toLowerCase()) && a(d, this.cssClass)
        },
        getSelfOrAncestorWithClass: function (a) {
            for (; a;) {
                if (this.hasClass(a, this.cssClass)) return a;
                a = a.parentNode
            }
            return null
        },
        isModifiable: function (a) {
            return !this.applyToEditableOnly || o(a)
        },
        isIgnorableWhiteSpaceNode: function (a) {
            return this.ignoreWhiteSpace && a && a.nodeType == 3 && r(a)
        },
        postApply: function (a, d, b) {
            for (var f = a[0], e = a[a.length - 1], g = [], h, j = f, k = e, r = 0, i = e.length, l, q, n = 0, p = a.length; n < p; ++n) if (l = a[n], q = H(l, !b)) {
                h || (h = new v(q), g.push(h));
                h.textNodes.push(l);
                if (l === f) j = h.firstTextNode, r = j.length;
                if (l === e) k = h.firstTextNode, i = h.getLength()
            } else h = null;
            if (a = K(e, !b)) h || (h = new v(e), g.push(h)), h.textNodes.push(a);
            if (g.length) {
                n = 0;
                for (p = g.length; n < p; ++n) g[n].doMerge();
                d.setStart(j, r);
                d.setEnd(k, i)
            }
        },
        createContainer: function (a) {
            a = a.createElement(this.elementTagName);
            e.util.extend(a, this.elementProperties);
            d(a, this.cssClass);
            return a
        },
        applyToTextNode: function (a) {
            var b = a.parentNode;
            b.childNodes.length == 1 && x.arrayContains(this.tagNames, b.tagName.toLowerCase()) ? d(b, this.cssClass) : (b = this.createContainer(x.getDocument(a)), a.parentNode.insertBefore(b, a), b.appendChild(a))
        },
        isRemovable: function (a) {
            var d;
            if (d = a.tagName.toLowerCase() == this.elementTagName) if (d = f(a.className) == this.elementSortedClassName) {
                var b;
                a: {
                    d = this.elementProperties;
                    for (b in d) if (d.hasOwnProperty(b) && a[b] !== d[b]) {
                        b = !1;
                        break a
                    }
                    b = !0
                }
                d = b && !n(a, this.attrExceptions) && this.isModifiable(a)
            }
            return d
        },
        undoToTextNode: function (a, d, b) {
            d.containsNode(b) || (a = d.cloneRange(), a.selectNode(b), a.isPointInRange(d.endContainer, d.endOffset) && (j(b, d.endContainer, d.endOffset, [d]), d.setEndAfter(b)), a.isPointInRange(d.startContainer, d.startOffset) && (b = j(b, d.startContainer, d.startOffset, [d])));
            this.isRemovable(b) ? h(b) : F(b, this.cssClass)
        },
        applyToRange: function (a) {
            a.splitBoundaries();
            var d = l(a);
            if (d.length) {
                for (var b, f = 0, e = d.length; f < e; ++f) b = d[f], !this.isIgnorableWhiteSpaceNode(b) && !this.getSelfOrAncestorWithClass(b) && this.isModifiable(b) && this.applyToTextNode(b);
                a.setStart(d[0], 0);
                b = d[d.length - 1];
                a.setEnd(b, b.length);
                this.normalize && this.postApply(d, a, !1)
            }
        },
        applyToSelection: function (a) {
            var a = e.getSelection(a || window),
                d, b = a.getAllRanges();
            a.removeAllRanges();
            for (var f = b.length; f--;) d = b[f], this.applyToRange(d), a.addRange(d)
        },
        undoToRange: function (a) {
            a.splitBoundaries();
            var d = l(a),
                b, f, e = d[d.length - 1];
            if (d.length) {
                for (var g = 0, h = d.length; g < h; ++g) b = d[g], (f = this.getSelfOrAncestorWithClass(b)) && this.isModifiable(b) && this.undoToTextNode(b, a, f), a.setStart(d[0], 0), a.setEnd(e,
                e.length);
                this.normalize && this.postApply(d, a, !0)
            }
        },
        undoToSelection: function (a) {
            var a = e.getSelection(a || window),
                d = a.getAllRanges(),
                b;
            a.removeAllRanges();
            for (var f = 0, g = d.length; f < g; ++f) b = d[f], this.undoToRange(b), a.addRange(b)
        },
        getTextSelectedByRange: function (a, d) {
            var b = d.cloneRange();
            b.selectNodeContents(a);
            var f = b.intersection(d),
                f = f ? f.toString() : "";
            b.detach();
            return f
        },
        isAppliedToRange: function (a) {
            if (a.collapsed) return !!this.getSelfOrAncestorWithClass(a.commonAncestorContainer);
            else {
                for (var d = a.getNodes([3]),
                b = 0, f; f = d[b++];) if (!this.isIgnorableWhiteSpaceNode(f) && i(a, f) && this.isModifiable(f) && !this.getSelfOrAncestorWithClass(f)) return !1;
                return !0
            }
        },
        isAppliedToSelection: function (a) {
            for (var a = e.getSelection(a || window).getAllRanges(), d = a.length; d--;) if (!this.isAppliedToRange(a[d])) return !1;
            return !0
        },
        toggleRange: function (a) {
            this.isAppliedToRange(a) ? this.undoToRange(a) : this.applyToRange(a)
        },
        toggleSelection: function (a) {
            this.isAppliedToSelection(a) ? this.undoToSelection(a) : this.applyToSelection(a)
        },
        detach: function () {}
    };
    p.util = {
        hasClass: a,
        addClass: d,
        removeClass: F,
        hasSameClasses: g,
        replaceWithOwnChildren: h,
        elementsHaveSameNonClassAttributes: t,
        elementHasNonClassAttributes: n,
        splitNodeAt: j,
        isEditableElement: A,
        isEditingHost: s,
        isEditable: o
    };
    e.CssClassApplier = p;
    e.createCssClassApplier = function (a, d, b) {
        return new p(a, d, b)
    }
});
rangy.createModule("SaveRestore", function (e, b) {
    function a(a, d) {
        var b = "selectionBoundary_" + +new Date + "_" + ("" + Math.random()).slice(2),
            f, e = h.getDocument(a.startContainer),
            g = a.cloneRange();
        g.collapse(d);
        f = e.createElement("span");
        f.id = b;
        f.style.lineHeight = "0";
        f.style.display = "none";
        f.className = "rangySelectionBoundary";
        f.appendChild(e.createTextNode(i));
        g.insertNode(f);
        g.detach();
        return f
    }
    function d(a, d, f, e) {
        (a = (a || document).getElementById(f)) ? (d[e ? "setStartBefore" : "setEndBefore"](a), a.parentNode.removeChild(a)) : b.warn("Marker element has been removed. Cannot restore selection.")
    }
    function f(a, d) {
        return d.compareBoundaryPoints(a.START_TO_START, a)
    }
    function g(a, d) {
        var b = (a || document).getElementById(d);
        b && b.parentNode.removeChild(b)
    }
    e.requireModules(["DomUtil", "DomRange", "WrappedRange"]);
    var h = e.dom,
        i = "\ufeff";
    e.saveSelection = function (d) {
        var d = d || window,
            g = d.document;
        if (e.isSelectionValid(d)) {
            var h = e.getSelection(d),
                i = h.getAllRanges(),
                o = [],
                k, r;
            i.sort(f);
            for (var j = 0, q = i.length; j < q; ++j) k = i[j], k.collapsed ? (r = a(k, !1), o.push({
                markerId: r.id,
                collapsed: !0
            })) : (r = a(k, !1), k = a(k, !0), o[j] = {
                startMarkerId: k.id,
                endMarkerId: r.id,
                collapsed: !1,
                backwards: i.length == 1 && h.isBackwards()
            });
            for (j = q - 1; j >= 0; --j) k = i[j], k.collapsed ? k.collapseBefore((g || document).getElementById(o[j].markerId)) : (k.setEndBefore((g || document).getElementById(o[j].endMarkerId)), k.setStartAfter((g || document).getElementById(o[j].startMarkerId)));
            h.setRanges(i);
            return {
                win: d,
                doc: g,
                rangeInfos: o,
                restored: !1
            }
        } else b.warn("Cannot save selection. This usually happens when the selection is collapsed and the selection document has lost focus.")
    };
    e.restoreSelection = function (a, f) {
        if (!a.restored) {
            for (var g = a.rangeInfos, h = e.getSelection(a.win), i = [], k = g.length, r = k - 1, j, q; r >= 0; --r) {
                j = g[r];
                q = e.createRange(a.doc);
                if (j.collapsed) if (j = (a.doc || document).getElementById(j.markerId)) {
                    j.style.display = "inline";
                    var v = j.previousSibling;
                    v && v.nodeType == 3 ? (j.parentNode.removeChild(j), q.collapseToPoint(v, v.length)) : (q.collapseBefore(j), j.parentNode.removeChild(j))
                } else b.warn("Marker element has been removed. Cannot restore selection.");
                else d(a.doc, q, j.startMarkerId, !0), d(a.doc, q, j.endMarkerId, !1);
                k == 1 && q.normalizeBoundaries();
                i[r] = q
            }
            k == 1 && f && e.features.selectionHasExtend && g[0].backwards ? (h.removeAllRanges(), h.addRange(i[0], !0)) : h.setRanges(i);
            a.restored = !0
        }
    };
    e.removeMarkerElement = g;
    e.removeMarkers = function (a) {
        for (var d = a.rangeInfos, b = 0, f = d.length, e; b < f; ++b) e = d[b], e.collapsed ? g(a.doc, e.markerId) : (g(a.doc, e.startMarkerId), g(a.doc, e.endMarkerId))
    }
});
rangy.createModule("Serializer", function (e, b) {
    function a(d, b) {
        var b = b || [],
            f = d.nodeType,
            e = d.childNodes,
            g = e.length,
            h = [f, d.nodeName, g].join(":"),
            i = "",
            l = "";
        switch (f) {
            case 3:
                i = d.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                break;
            case 8:
                i = "<\!--" + d.nodeValue.replace(/</g, "&lt;").replace(/>/g, "&gt;") + "--\>";
                break;
            default:
                i = "<" + h + ">", l = "</>"
        }
        i && b.push(i);
        for (f = 0; f < g; ++f) a(e[f], b);
        l && b.push(l);
        return b
    }
    function d(d) {
        d = a(d).join("");
        return s(d).toString(16)
    }
    function f(a, d, b) {
        for (var f = [], e = a, b = b || o.getDocument(a).documentElement; e && e != b;) f.push(o.getNodeIndex(e, !0)), e = e.parentNode;
        return f.join("/") + ":" + d
    }
    function g(a, d, f) {
        d ? f || o.getDocument(d) : d = (f || document).documentElement;
        for (var a = a.split(":"), f = a[0] ? a[0].split("/") : [], e = f.length, g; e--;) if (g = parseInt(f[e], 10), g < d.childNodes.length) d = d.childNodes[parseInt(f[e], 10)];
        else throw b.createError("deserializePosition failed: node " + o.inspectNode(d) + " has no child with index " + g + ", " + e);
        return new o.DomPosition(d, parseInt(a[1], 10))
    }
    function h(a, b, g) {
        g = g || e.DomRange.getRangeDocument(a).documentElement;
        if (!o.isAncestorOf(g, a.commonAncestorContainer, !0)) throw Error("serializeRange: range is not wholly contained within specified root node");
        a = f(a.startContainer, a.startOffset, g) + "," + f(a.endContainer, a.endOffset, g);
        b || (a += "{" + d(g) + "}");
        return a
    }
    function i(a, b, f) {
        b ? f = f || o.getDocument(b) : (f = f || document, b = f.documentElement);
        var a = /^([^,]+),([^,\{]+)({([^}]+)})?$/.exec(a),
            h = a[4],
            i = d(b);
        if (h && h !== d(b)) throw Error("deserializeRange: checksums of serialized range root node (" + h + ") and target root node (" + i + ") do not match");
        h = g(a[1], b, f);
        b = g(a[2], b, f);
        f = e.createRange(f);
        f.setStart(h.node, h.offset);
        f.setEnd(b.node, b.offset);
        return f
    }
    function l(a, b, f) {
        b ? f || o.getDocument(b) : b = (f || document).documentElement;
        a = /^([^,]+),([^,]+)({([^}]+)})?$/.exec(a)[3];
        return !a || a === d(b)
    }
    function t(a, d, b) {
        for (var a = a || e.getSelection(), a = a.getAllRanges(), f = [], g = 0, i = a.length; g < i; ++g) f[g] = h(a[g], d, b);
        return f.join("|")
    }
    function n(a, d, b) {
        d ? b = b || o.getWindow(d) : (b = b || window, d = b.document.documentElement);
        for (var a = a.split("|"),
        f = e.getSelection(b), g = [], h = 0, l = a.length; h < l; ++h) g[h] = i(a[h], d, b.document);
        f.setRanges(g);
        return f
    }
    e.requireModules(["WrappedSelection", "WrappedRange"]);
    (typeof encodeURIComponent == "undefined" || typeof decodeURIComponent == "undefined") && b.fail("Global object is missing encodeURIComponent and/or decodeURIComponent method");
    var s = function () {
        var a = null;
        return function (d) {
            for (var b = [], f = 0, e = d.length, g; f < e; ++f) g = d.charCodeAt(f), g < 128 ? b.push(g) : g < 2048 ? b.push(g >> 6 | 192, g & 63 | 128) : b.push(g >> 12 | 224, g >> 6 & 63 | 128,
            g & 63 | 128);
            d = -1;
            if (!a) {
                for (var f = [], e = 0, h; e < 256; ++e) {
                    h = e;
                    for (g = 8; g--;)(h & 1) == 1 ? h = h >>> 1 ^ 3988292384 : h >>>= 1;
                    f[e] = h >>> 0
                }
                a = f
            }
            f = a;
            e = 0;
            for (g = b.length; e < g; ++e) h = (d ^ b[e]) & 255, d = d >>> 8 ^ f[h];
            return (d ^ -1) >>> 0
        }
    }(),
        o = e.dom;
    e.serializePosition = f;
    e.deserializePosition = g;
    e.serializeRange = h;
    e.deserializeRange = i;
    e.canDeserializeRange = l;
    e.serializeSelection = t;
    e.deserializeSelection = n;
    e.canDeserializeSelection = function (a, d, b) {
        var f;
        d ? f = b ? b.document : o.getDocument(d) : d = (b || window).document.documentElement;
        for (var a = a.split("|"),
        b = 0, e = a.length; b < e; ++b) if (!l(a[b], d, f)) return !1;
        return !0
    };
    e.restoreSelectionFromCookie = function (a) {
        var a = a || window,
            d;
        a: {
            d = a.document.cookie.split(/[;,]/);
            for (var b = 0, f = d.length, e; b < f; ++b) if (e = d[b].split("="), e[0].replace(/^\s+/, "") == "rangySerializedSelection" && (e = e[1])) {
                d = decodeURIComponent(e.replace(/\s+$/, ""));
                break a
            }
            d = null
        }
        d && n(d, a.doc)
    };
    e.saveSelectionCookie = function (a, d) {
        var a = a || window,
            d = typeof d == "object" ? d : {}, b = d.expires ? ";expires=" + d.expires.toUTCString() : "",
            f = d.path ? ";path=" + d.path : "",
            g = d.domain ? ";domain=" + d.domain : "",
            h = d.secure ? ";secure" : "",
            i = t(e.getSelection(a));
        a.document.cookie = encodeURIComponent("rangySerializedSelection") + "=" + encodeURIComponent(i) + b + f + g + h
    };
    e.getElementChecksum = d
});
(function () {
    var e, b;
    e = {
        changeIdAttribute: "data-cid",
        userIdAttribute: "data-userid",
        userNameAttribute: "data-username",
        timeAttribute: "data-time",
        langAttribute: "lang",
        dirAttribute: "dir",
        attrValuePrefix: "",
        blockEl: "p",
        stylePrefix: "cts",
        currentUser: {
            id: null,
            name: null
        },
        changeTypes: {
            insertType: {
                tag: "insert",
                alias: "ins",
                action: "Inserted"
            },
            deleteType: {
                tag: "delete",
                alias: "del",
                action: "Deleted"
            }
        },
        handleEvents: !1,
        contentEditable: !0,
        isTracking: !0,
        noTrack: ".ice-no-track",
        avoid: ".ice-avoid"
    };
    b = function (a) {
        a || (a = {});
        if (!a.element) throw Error("`options.element` must be defined for ice construction.");
        ice.dom.extend(!0, this, e, a);
        this.pluginsManager = new ice.IcePluginManager(this);
        a.plugins && this.pluginsManager.usePlugins("ice-init", a.plugins)
    };
    b.prototype = {
        _changes: {},
        _userStyles: {},
        _styles: {},
        _uniqueStyleIndex: 0,
        _browserType: null,
        _batchChangeid: null,
        _preventCharInsert: false,
        _uniqueIDIndex: 1,
        _delBookmark: "tempdel",
        isPlaceHoldingDeletes: !1,
        startTracking: function () {
            this.element.setAttribute("contentEditable", this.contentEditable);
            if (this.handleEvents) {
                var a = this;
                ice.dom.bind(a.element, "keyup.ice keydown.ice keypress.ice mousedown.ice mouseup.ice",

                function (d) {
                    return a.handleEvent(d)
                })
            }
            this.initializeEnvironment();
            this.initializeEditor();
            this.initializeRange();
            this.pluginsManager.fireEnabled(this.element);
            return this
        },
        stopTracking: function () {
            this.element.setAttribute("contentEditable", !this.contentEditable);
            this.handleEvents && ice.dom.unbind(this.element, "keyup.ice keydown.ice keypress.ice mousedown.ice mouseup.ice");
            this.pluginsManager.fireDisabled(this.element);
            return this
        },
        initializeEnvironment: function () {
            this.env || (this.env = {});
            this.env.element = this.element;
            this.env.document = this.element.ownerDocument;
            this.env.window = this.env.document.defaultView || this.env.document.parentWindow || window;
            this.env.frame = this.env.window.frameElement;
            this.env.selection = this.selection = new ice.Selection(this.env);
            this.env.document.createElement(this.changeTypes.insertType.tag);
            this.env.document.createElement(this.changeTypes.deleteType.tag)
        },
        initializeRange: function () {
            var a = this.selection.createRange();
            a.setStart(ice.dom.find(this.element, this.blockEl)[0], 0);
            a.collapse(!0);
            this.selection.addRange(a);
            this.env.frame ? this.env.frame.contentWindow.focus() : this.element.focus()
        },
        initializeEditor: function () {
            var a = this,
                d = this.env.document.createElement("div");
            this.element.childNodes.length ? (ice.dom.each(ice.dom.contents(this.element), function (a, b) {
                ice.dom.isBlockElement(b) && d.appendChild(b)
            }), d.innerHTML === "" && d.appendChild(ice.dom.create("<" + this.blockEl + " ><br/></" + this.blockEl + ">"))) : d.appendChild(ice.dom.create("<" + this.blockEl + " ><br/></" + this.blockEl + ">"));
            this.element.innerHTML = d.innerHTML;
            var b = [],
                e;
            for (e in this.changeTypes) b.push(this._getIceNodeClass(e));
            ice.dom.each(ice.dom.find(this.element, "." + b.join(", .")), function (d, e) {
                for (var g = 0, t = "", n = e.className.split(" "), d = 0; d < n.length; d++) {
                    var s = RegExp(a.stylePrefix + "-(\\d+)").exec(n[d]);
                    s && (g = s[1]);
                    (s = RegExp("(" + b.join("|") + ")").exec(n[d])) && (t = a._getChangeTypeFromAlias(s[1]))
                }
                n = ice.dom.attr(e, a.userIdAttribute);
                a.setUserStyle(n, Number(g));
                g = ice.dom.attr(e, a.changeIdAttribute);
                a._changes[g] = {
                    type: t,
                    userid: n,
                    username: ice.dom.attr(e,
                    a.userNameAttribute),
                    time: ice.dom.attr(e, a.timeAttribute)
                }
            })
        },
        enableChangeTracking: function () {
            this.isTracking = !0;
            this.pluginsManager.fireEnabled(this.element)
        },
        disableChangeTracking: function () {
            this.isTracking = !1;
            this.pluginsManager.fireDisabled(this.element)
        },
        setCurrentUser: function (a) {
            this.currentUser = a
        },
        handleEvent: function (a) {
            if (this.isTracking) if (a.type == "mouseup") {
                var d = this;
                setTimeout(function () {
                    d.mouseUp(a)
                }, 200)
            } else if (a.type == "mousedown") return this.mouseDown(a);
            else if (a.type == "keypress") {
                var b = this.keyPress(a);
                b || a.preventDefault();
                return b
            } else if (a.type == "keydown"){
             
              return (b = this.keyDown(a)) || a.preventDefault(), b;
            }else a.type == "keyup" && this.pluginsManager.fireCaretUpdated()
        },
        createIceNode: function (a, d) {

            var b = this.env.document.createElement(this.changeTypes[a].tag);
            ice.dom.addClass(b, this._getIceNodeClass(a));
            b.appendChild(d ? d : this.env.document.createTextNode(""));
            this.addChange(this.changeTypes[a].alias, [b]);
            this.pluginsManager.fireNodeCreated(b, {
                action: this.changeTypes[a].action
            });
            return b
        },
        insert: function (a, d) {
            d ? this.selection.addRange(d) : d = this.getCurrentRange();
        
            typeof a === "string" && (a = document.createTextNode(a));
            if (!d.collapsed && (this.deleteContents(), d = this.getCurrentRange(), d.startContainer === d.endContainer && this.element === d.startContainer)) {
                ice.dom.empty(this.element);
                var b = d.getLastSelectableChild(this.element);
                d.setStartAfter(b);
                d.collapse(!0)
            };
            this._moveRangeToValidTrackingPos(d);
            b = this.startBatchChange();
            this._insertNode((!this._preventCharInsert && a) || document.createTextNode("\ufeff"), d, !a);
            this.pluginsManager.fireNodeInserted(a,d);
            this.endBatchChange(b);
            return !1
        },
        preventTextFlat : function(){
          return this.insertFlag
        },
        placeholdDeletes: function () {
            var a = this;
            this.isPlaceholdingDeletes && this.revertDeletePlaceholders();
            this.isPlaceholdingDeletes = !0;
            this._deletes = [];
            var d = "." + this._getIceNodeClass("deleteType");
            ice.dom.each(ice.dom.find(this.element, d), function (d, b) {
                a._deletes.push(ice.dom.cloneNode(b));
                ice.dom.replaceWith(b, "<" + a._delBookmark + ' data-allocation="' + (a._deletes.length - 1) + '"/>')
            });
            return !0
        },
        revertDeletePlaceholders: function () {
            var a = this;
            if (!this.isPlaceholdingDeletes) return !1;
            ice.dom.each(this._deletes, function (d, b) {
                ice.dom.find(a.element, a._delBookmark + "[data-allocation=" + d + "]").replaceWith(b)
            });
            this.isPlaceholdingDeletes = !1;
            return !0
        },
        deleteContents: function (a, d) {
            var b = !0;
            d ? this.selection.addRange(d) : d = this.getCurrentRange();
            var e = this.startBatchChange(this.changeTypes.deleteType.alias);
            d.collapsed === !1 ? this._deleteFromSelection(d) : b = a ? this._deleteFromRight(d) : this._deleteFromLeft(d);
            this.selection.addRange(d);
            this.endBatchChange(e);
            return b
        },
        getChanges: function () {
            return this._changes
        },
        getElementContent: function () {
            return this.element.innerHTML
        },
        getCleanContent: function (a, d, b) {
          
            var e = "",
                h = this;
                
            ice.dom.each(this.changeTypes, function (a, d) {
                a != "deleteType" && (d > 0 && (e += ","), e += "." + h._getIceNodeClass(a))
            });

            a = a ? typeof a === "string" ? ice.dom.create("<div>" + a + "</div>") : ice.dom.cloneNode(a)[0] : ice.dom.cloneNode(this.element)[0];
            a = b ? b.call(this, a) : a;
            b = ice.dom.find(a, e);
            
            ice.dom.each(b, function () {
        
                ice.dom.replaceWith(this, ice.dom.contents(this))
            });
            
            b = ice.dom.find(a, "." + this._getIceNodeClass("deleteType"));

            ice.dom.remove(b);
            a = d ? d.call(this, a) : a;
            return a.innerHTML
        },
        acceptAll: function () {
            this.element.innerHTML = this.getCleanContent()
        },
        rejectAll: function () {
            var a = "." + this._getIceNodeClass("insertType"),
                d = "." + this._getIceNodeClass("deleteType");
            ice.dom.remove(ice.dom.find(this.element, a));
            ice.dom.each(ice.dom.find(this.element, d), function (a, d) {
                ice.dom.replaceWith(d, ice.dom.contents(d))
            })
        },
        acceptChange: function (a) {
            this.acceptRejectChange(a, !0)
        },
        rejectChange: function (a) {
            this.acceptRejectChange(a, !1)
        },
        acceptRejectChange: function (a,
        d) {
            var b, e, h, i, l, t, n = ice.dom;
            if (!a) if (b = this.getCurrentRange(), b.collapsed) a = b.startContainer;
            else return;
            b = h = "." + this._getIceNodeClass("deleteType");
            e = i = "." + this._getIceNodeClass("insertType");
            l = n.getNode(a, b + "," + e);
            t = n.find(this.element, "[" + this.changeIdAttribute + "=" + n.attr(l, this.changeIdAttribute) + "]");
            d || (h = e, i = b);
            ice.dom.is(l, i) ? n.each(t, function (a, d) {
                n.replaceWith(d, ice.dom.contents(d))
            }) : n.is(l, h) && n.remove(t)
        },
        isInsideChange: function (a) {
            var d = "." + this._getIceNodeClass("insertType") + ", ." + this._getIceNodeClass("deleteType");
            if (!a) if (range = this.getCurrentRange(), range.collapsed) a = range.startContainer;
            else return !1;
            return !!ice.dom.getNode(a, d)
        },
        addChangeType: function (a, d, b, e) {
            d = {
                tag: d,
                alias: b
            };
            if (e) d.action = e;
            this.changeTypes[a] = d
        },
        getIceNode: function (a, d) {
            var b = "." + this._getIceNodeClass(d);

            return ice.dom.getNode(a, b)
        },
        _moveRangeToValidTrackingPos: function (a) {
            for (var d = !1, b = this._getVoidElement(a.endContainer); b;) {
                try {
                    a.moveEnd(ice.dom.CHARACTER_UNIT, 1), a.moveEnd(ice.dom.CHARACTER_UNIT, -1)
                } catch (e) {
                    d = !0
                }
                if (d || ice.dom.onBlockBoundary(a.endContainer, a.startContainer, this.blockEl)) {
                    a.setStartAfter(b);
                    a.collapse(!0);
                    break
                }(b = this._getVoidElement(a.endContainer)) ? (a.setEnd(a.endContainer, 0), a.moveEnd(ice.dom.CHARACTER_UNIT, ice.dom.getNodeTextContent(a.endContainer).length), a.collapse()) : (a.setStart(a.endContainer, 0), a.collapse(!0))
            }
        },
        _getNoTrackElement: function (a) {
            var d = this._getNoTrackSelector();
            return ice.dom.is(a, d) ? a : ice.dom.parents(a, d)[0] || null
        },
        _getNoTrackSelector: function () {
            return this.noTrack
        },
        _getVoidElement: function (a) {
            var d = this._getVoidElSelector();
 
            return ice.dom.is(a, d) ? a : ice.dom.parents(a, d)[0] || null
        },
        _getVoidElSelector: function () {
            return "." + this._getIceNodeClass("deleteType") + "," + this.avoid
        },
        _currentUserIceNode: function (a) {
            return ice.dom.attr(a, this.userIdAttribute) == this.currentUser.id
        },
        _getChangeTypeFromAlias: function (a) {
            var d, b = null;
            for (d in this.changeTypes) this.changeTypes.hasOwnProperty(d) && this.changeTypes[d].alias == a && (b = d);
            return b
        },
        _getIceNodeClass: function (a) {
            return this.attrValuePrefix + this.changeTypes[a].alias
        },
        getUserStyle: function (a) {
            var d = null;
            return d = this._userStyles[a] ? this._userStyles[a] : this.setUserStyle(a, this.getNewStyleId())
        },
        setUserStyle: function (a, d) {
            var b = this.stylePrefix + "-" + d;
            this._styles[d] || (this._styles[d] = !0);
            return this._userStyles[a] = b
        },
        getNewStyleId: function () {
            var a = ++this._uniqueStyleIndex;
            return this._styles[a] ? this.getNewStyleId() : (this._styles[a] = !0, a)
        },
        addChange: function (a, d) {
            var b = this._batchChangeid || this.getNewChangeId();
            this._changes[b] || (this._changes[b] = {
                type: this._getChangeTypeFromAlias(a),
                time: (new Date).getTime(),
                userid: this.currentUser.id,
                username: this.currentUser.name,
                lang : this.lang,
                dir  : this.dir
            });
            var e = this;
            ice.dom.foreach(d, function (a) {
                e.addNodeToChange(b, d[a])
            });
            return b
        },
        addNodeToChange: function (a, d) {
            if (this._batchChangeid !== null) a = this._batchChangeid;
            
            var b = this.getChange(a);
            
            d.getAttribute(this.changeIdAttribute) || d.setAttribute(this.changeIdAttribute, a);
            d.getAttribute(this.userIdAttribute) || d.setAttribute(this.userIdAttribute, b.userid);
            d.getAttribute(this.userNameAttribute) || d.setAttribute(this.userNameAttribute, b.username);
            d.getAttribute(this.timeAttribute) || d.setAttribute(this.timeAttribute, b.time);
            d.getAttribute(this.timeAttribute) || d.setAttribute(this.timeAttribute, b.time);
            
            d.getAttribute(this.lang) || d.setAttribute(this.lang, b.time);
            d.getAttribute(this.dir) || d.setAttribute(this.dir, b.time);
            
            
            ice.dom.hasClass(d, this._getIceNodeClass(b.type)) || ice.dom.addClass(d, this._getIceNodeClass(b.type));
            b = this.getUserStyle(b.userid);
            ice.dom.hasClass(d, b) || ice.dom.addClass(d, b)
        },
        getChange: function (a) {
            var d = null;
           
            this._changes[a] && (d = this._changes[a]);
            
    
             
            return d
        },
        getNewChangeId: function () {
            var a = ++this._uniqueIDIndex;
            this._changes[a] && (a = this.getNewChangeId());
            return a
        },
        startBatchChange: function () {
            return this._batchChangeid = this.getNewChangeId()
        },
        endBatchChange: function (a) {
            if (a === this._batchChangeid) this._batchChangeid = null
        },
        getCurrentRange: function () {
            return this.selection.getRangeAt(0)
        },
        _insertNode: function (a, d, b) {
            var e = this._currentUserIceNode(this.getIceNode(d.startContainer, "insertType"));
            if (!b || !e) e || (a = this.createIceNode("insertType", a)), d.insertNode(a), d.setEnd(a, 1), d.collapse(), b && (d.setStart(a, 0), d.setEnd(a, 1)), this.selection.addRange(d)
        },
        _deleteFromSelection: function (a) {
            for (var d = new ice.Bookmark(this.env,
            a), b = ice.dom.getElementsBetween(d.start, d.end), e = ice.dom.parents(a.startContainer, this.blockEl)[0], h = ice.dom.parents(a.endContainer, this.blockEl)[0], i = [], l = b.length, t = 0; t < l; t++) {
                var n = b[t];
                ice.dom.is(n, this.blockEl) && i.push(n);
                if (!(n.nodeType === ice.dom.TEXT_NODE && ice.dom.getNodeTextContent(n) === "")) {
                    if (n.hasChildNodes()) for (var s = 0; s < n.childNodes.length; s++) {
                        var o = n.childNodes[s];
                        (this._getNoTrackElement(o) || this._currentUserIceNode(o)) && ice.dom.remove(o)
                    }(this._getNoTrackElement(n) || this._currentUserIceNode(n)) && ice.dom.remove(n);
                    if (!this._getVoidElement(n)) {
                        if (n.nodeType !== ice.dom.TEXT_NODE) if (ice.dom.remove(ice.dom.find(n, "br")), s = ice.dom.cloneNode(n), ice.dom.remove(ice.dom.find(s, this._getVoidElSelector())), ice.dom.getNodeTextContent(s).length === 0) continue;
                        else if (ice.dom.is(n, this.blockEl)) {
                            s = this.createIceNode("deleteType");
                            newEl = document.createElement(this.blockEl);
                            s.innerHTML = n.innerHTML;
                            n.innerHTML = "";
                            n.appendChild(s);
                            continue
                        }
                        s = this.createIceNode("deleteType");
                        ice.dom.insertBefore(n, s);
                        s.appendChild(n)
                    }
                }
            }
            if (e !== h) {
                for (; i.length;) ice.dom.mergeContainers(i.shift(), e);
                ice.dom.mergeContainers(h, e)
            }(b = d.start.previousSibling) ? (d.selectBookmark(), a = this.getCurrentRange(), a.moveStart(ice.dom.CHARACTER_UNIT, -1), a.moveStart(ice.dom.CHARACTER_UNIT, 1)) : (b = this.env.document.createTextNode(""), ice.dom.insertBefore(d.start, b), this.selection.addRange(a), d.selectBookmark(), a = this.getCurrentRange(), a.setStart(b, 0));
            a.collapse(!0)
        },
        _deleteFromRight: function (a) {
            var d = ice.dom.parents(a.startContainer, this.blockEl)[0] || ice.dom.is(a.startContainer,
            this.blockEl) && a.startContainer || null,
                b = d && d.nextSibling || null,
                e = ice.dom.is(a.startContainer, this.blockEl) && ice.dom.getNodeTextContent(a.startContainer) == "";
            a.moveEnd(ice.dom.CHARACTER_UNIT, 1);
            a.moveEnd(ice.dom.CHARACTER_UNIT, -1);
            if (!b && !ice.dom.isChildOf(a.endContainer, this.element)) return a.moveEnd(ice.dom.CHARACTER_UNIT, -1), a.moveEnd(ice.dom.CHARACTER_UNIT, 1), a.collapse(), !0;
            if ((ice.dom.onBlockBoundary(a.endContainer, a.startContainer, this.blockEl) || e) && !this._getVoidElement(d)) return b !== ice.dom.parents(a.endContainer,
            this.blockEl)[0] && a.setEnd(b, 0), ice.dom.remove(ice.dom.find(a.startContainer, "br")), ice.dom.mergeBlockWithSibling(a, ice.dom.parents(a.startContainer, this.blockEl)[0] || d, !0);
            if (this._getVoidElement(a.endContainer)) return a.setEnd(a.endContainer, 0), a.moveEnd(ice.dom.CHARACTER_UNIT, ice.dom.getNodeTextContent(a.endContainer).length || 0), a.collapse(), this._deleteFromRight(a);
            if (this._getNoTrackElement(a.endContainer.parentElement)) return a.deleteContents(), !1;
            a.collapse();
            d = a.startContainer;
            if (a.startContainer.data && a.endOffset === d.data.length) {
                b = a.cloneRange();
                b.moveEnd(ice.dom.CHARACTER_UNIT, 1);
                if (e = ice.dom.getBlockParent(b.endContainer, this.element)) {
                    if (ice.dom.isChildOf(e, this.element) === !1) return;
                    var h = ice.dom.getBlockParent(b.startContainer, this.element);
                    if (e !== h) {
                        ice.dom.mergeContainers(e, h);
                        a.setStart(b.startContainer, b.startContainer.data.length);
                        a.collapse(!0);
                        return
                    }
                }
                d = a.getNextContainer(d);
                if (ice.dom.isChildOf(d, this.element) === !1) return !1;
                d = a.getFirstSelectableChild(d);
                a.setStart(d, 0);
                this._addTextNodeTracking(d,
                a)
            } else if (d = this.getIceNode(a.startContainer, "insertType"), d === null || !this._currentUserIceNode(d)) this._addTextNodeTracking(a.startContainer, a, !0);
            else if (a.moveEnd(ice.dom.CHARACTER_UNIT, 1), a.deleteContents(), d !== null && ice.dom.isBlank(ice.dom.getNodeTextContent(d)) === !0) {
                b = d.previousSibling;
                if (!b || b.nodeType !== ice.dom.TEXT_NODE) b = this.env.document.createTextNode(""), ice.dom.insertBefore(d, b);
                a.setStart(b, b.data.length);
                ice.dom.remove(d)
            }
            a.collapse(!0);
            return !0
        },
        _deleteFromLeft: function (a) {
            var d = ice.dom.parents(a.startContainer, this.blockEl)[0] || ice.dom.is(a.startContainer, this.blockEl) && a.startContainer || null,
                b = d && d.previousSibling || null,
                e = ice.dom.is(a.startContainer, this.blockEl) && ice.dom.getNodeTextContent(a.startContainer) == "";
            a.moveStart(ice.dom.CHARACTER_UNIT, -1);
            var h = a.startOffset === a.endOffset && a.startContainer === a.endContainer,
                i = !ice.dom.isChildOf(a.startContainer, this.element);
            if (h || !b && i) return b && a.moveStart(ice.dom.CHARACTER_UNIT, 1), a.collapse(!0), !0;
            a.moveStart(ice.dom.CHARACTER_UNIT,
            1);
            if ((ice.dom.onBlockBoundary(a.startContainer, a.endContainer, this.blockEl) || e) && this._getVoidElement(b)) return a.deleteContents(), !1;
            if (this._getVoidElement(a.startContainer)) return a.setStart(a.startContainer, 0), a.collapse(!0), this._deleteFromLeft(a);
            if (ice.dom.onBlockBoundary(a.startContainer, a.endContainer, this.blockEl) || e) return b !== ice.dom.parents(a.startContainer, this.blockEl)[0] && a.setStart(b, 0), ice.dom.remove(ice.dom.find(a.startContainer, "br")), ice.dom.mergeBlockWithSibling(a, ice.dom.parents(a.endContainer,
            this.blockEl)[0] || d);
            if (this._getNoTrackElement(a.startContainer.parentElement)) return a.deleteContents(), !1;
            d = a.startContainer;
            if (a.startOffset === 0) {
                b = a.cloneRange();
                b.moveStart(ice.dom.CHARACTER_UNIT, -1);
                if (e = ice.dom.getBlockParent(b.startContainer, this.element)) {
                    if (ice.dom.isChildOf(e, this.element) === !1) return !1;
                    h = ice.dom.getBlockParent(b.endContainer, this.element);
                    if (h !== e) {
                        ice.dom.mergeContainers(h, e);
                        a.setStart(b.startContainer, b.startContainer.data.length);
                        a.collapse(!0);
                        return
                    }
                }
                d = a.getPreviousContainer(d);
                if (!ice.dom.isChildOf(d, this.element)) return !1;
                ice.dom.isStubElement(d) ? (a.moveStart(ice.dom.CHARACTER_UNIT, -1), ice.dom.addClass(d, this._getIceNodeClass("deleteType")), ice.dom.attr(d, "title", "Content removed"), a.collapse(!0)) : (d = a.getLastSelectableChild(d), a.setStart(d, d.data.length), this._addTextNodeTracking(d, a))
            } else b = a.startContainer, d = this.getIceNode(b, "insertType"), d === null || !this._currentUserIceNode(d) ? this._addTextNodeTracking(b, a) : (a.moveStart(ice.dom.CHARACTER_UNIT, -1), a.moveEnd(ice.dom.CHARACTER_UNIT, -1), a.moveEnd(ice.dom.CHARACTER_UNIT, 1), a.deleteContents(), d !== null && ice.dom.isBlank(ice.dom.getNodeTextContent(d)) && (b = this.env.document.createTextNode(""), ice.dom.insertBefore(d, b), a.setStart(b, 0), a.collapse(!0), ice.dom.replaceWith(d, ice.dom.contents(d))));
            return !0
        },
        _addTextNodeTracking: function (a, d, b) {
            if (!(!b && d.startOffset === 0 || this.getIceNode(a, "deleteType") !== null)) {
                var e = "",
                    h = "",
                    i = "";
                b ? (e = a.nodeValue.substring(0, d.endOffset), h = a.nodeValue.substr(d.endOffset, 1), i = a.nodeValue.substring(d.endOffset + 1)) : (e = a.nodeValue.substring(0, d.startOffset - 1), h = a.nodeValue.substr(d.startOffset - 1, 1), i = a.nodeValue.substring(d.startOffset));
                if (d.startOffset === 1 && !b || b && d.startOffset === 0) {
                    var l = this.getIceNode(a.previousSibling, "deleteType");
                    l !== null && !this._currentUserIceNode(l) && (l = null);
                    if (l) {
                        if (b) if (l.lastChild && l.lastChild.nodeType === ice.dom.TEXT_NODE ? l.lastChild.nodeValue += h : (b = this.env.document.createTextNode(h), l.appendChild(b)), a.nodeValue = e + i, a.nodeValue.length === 0) {
                            b = !1;
                            for (a = a.nextSibling; !b;)(l = this.getIceNode(a, "deleteType")) ? a = a.nextSibling : b = !0;
                            a && (d.setStart(a, 0), d.collapse(!0))
                        } else d.setStart(a, 0), d.collapse(!0);
                        else if (l.lastChild && l.lastChild.nodeType === ice.dom.TEXT_NODE ? (l.lastChild.nodeValue += h, d.setStart(l.lastChild, l.lastChild.nodeValue.length - 1)) : (b = this.env.document.createTextNode(h), l.appendChild(b), d.setStart(b, 0)), a.nodeValue = e + i, a.nodeValue = e + i, a.nodeValue.length === 0) {
                            b = !1;
                            for (a = a.previousSibling; !b;)(l = this.getIceNode(a, "deleteType")) ? a = a.previousSibling : b = !0;
                            a && (a = d.getLastSelectableChild(a),
                            d.setStart(a, a.nodeValue.length), d.collapse(!0))
                        } else d.collapse(!0);
                        return
                    }
                }
                if (d.startOffset === a.nodeValue.length && (l = this.getIceNode(a.nextSibling, "deleteType"), l !== null && !this._currentUserIceNode(l) && (l = null), l)) {
                    l.firstChild && l.firstChild.nodeType === ice.dom.TEXT_NODE ? l.firstChild.nodeValue = h + l.firstChild.nodeValue : (b = this.env.document.createTextNode(h), ice.dom.insertBefore(l.firstChild, b));
                    a.nodeValue = e;
                    d.setStart(a, a.nodeValue.length);
                    d.setEnd(a, a.nodeValue.length);
                    return
                }
                l = this.createIceNode("deleteType");
                e = null;
                b !== !0 ? (e = a.splitText(d.startOffset - 1), e.nodeValue = e.nodeValue.substring(1), ice.dom.insertAfter(a, e), l.firstChild.nodeValue = h, ice.dom.insertAfter(a, l), d.setStart(a, a.nodeValue.length), d.setEnd(a, a.nodeValue.length)) : (e = a.splitText(d.endOffset), e.nodeValue = e.nodeValue.substring(1), ice.dom.insertAfter(a, e), l.firstChild.nodeValue = h, ice.dom.insertAfter(a, l), d.setStart(e, 0), d.setEnd(e, 0))
            }
        },
        _handleAncillaryKey: function (a) {
            var d = !0;
            switch (a.keyCode) {
                case ice.dom.DOM_VK_DELETE:
                    d = this.deleteContents();
                    this.pluginsManager.fireKeyPressed(a);
                    break;
                case 46:
                    d = this.deleteContents(!0);
                    this.pluginsManager.fireKeyPressed(a);
                    break;
                case ice.dom.DOM_VK_DOWN:
                case ice.dom.DOM_VK_UP:
                case ice.dom.DOM_VK_LEFT:
                case ice.dom.DOM_VK_RIGHT:
                    this.pluginsManager.fireCaretPositioned();
                    d = !1;
                    break;
                default:
                    d = !1
            }
            return d === !0 ? (ice.dom.preventDefault(a), !1) : !0
        },
        keyDown: function (a) {

            if (!this.pluginsManager.fireKeyDown(a)) return ice.dom.preventDefault(a), !1;
            var d = !1;
            if (this._handleSpecialKey(a) === !1) {
                if (ice.dom.isBrowser("msie") !== !0) this._preventKeyPress = !0;
                return !1
            } else if ((a.ctrlKey === !0 || a.metaKey === !0) && (ice.dom.isBrowser("msie") === !0 || ice.dom.isBrowser("chrome") === !0) && !this.pluginsManager.fireKeyPressed(a)) return !1;
            switch (a.keyCode) {
                case 27:
                    break;
                default:
                    /Firefox/.test(navigator.userAgent) !== !0 && (d = !this._handleAncillaryKey(a))
            }
            return d ? (ice.dom.preventDefault(a), !1) : !0
        },
        keyPress: function (a) {
            if (this._preventKeyPress === !0){
                    this._preventKeyPress = !1;
            }else {
                if (!this.pluginsManager.fireKeyPressed(a)) return !1;
                var d = null;
                a.which == null ? d = String.fromCharCode(a.keyCode) : a.which > 0 && (d = String.fromCharCode(a.which));
                var b = this.getCurrentRange(),
                    e = ice.dom.parents(b.startContainer, "br")[0] || null;
                e && (b.moveToNextEl(e), e.parentNode.removeChild(e));
                if (d !== null && a.ctrlKey !== !0 && a.metaKey !== !0) switch (a.keyCode) {
                    case ice.dom.DOM_VK_DELETE:
                        break;
                    case ice.dom.DOM_VK_ENTER:
                        return this._handleEnter();
                    default:
                        return this._moveRangeToValidTrackingPos(b, b.startContainer), this.insert(d)
                }
             
                return this._handleAncillaryKey(a)
            }
        },
        _handleEnter: function () {
            this.getCurrentRange().collapsed || this.deleteContents();
            return !0
        },
        _handleSpecialKey: function (a) {
            var d = a.which;
            if (d === null) d = a.keyCode;
            var b = !1;
            switch (d) {
                case 65:
                    if (a.ctrlKey === !0 || a.metaKey === !0) {
                        b = !0;
                        d = this.getCurrentRange();
                        if (ice.dom.isBrowser("msie") === !0) {
                            var e = this.env.document.createTextNode(""),
                                h = this.env.document.createTextNode("");
                            this.element.firstChild ? ice.dom.insertBefore(this.element.firstChild, e) : this.element.appendChild(e);
                            this.element.appendChild(h);
                            d.setStart(e, 0);
                            d.setEnd(h, 0)
                        } else d.setStart(d.getFirstSelectableChild(this.element),
                        0), e = d.getLastSelectableChild(this.element), d.setEnd(e, e.length);
                        this.selection.addRange(d)
                    }
            }
            return b === !0 ? (ice.dom.preventDefault(a), !1) : !0
        },
        mouseUp: function (a) {
            if (!this.pluginsManager.fireClicked(a)) return !1;
            this.pluginsManager.fireSelectionChanged(this.getCurrentRange())
        },
        mouseDown: function (a) {
            if (!this.pluginsManager.fireMouseDown(a)) return !1;
            this.pluginsManager.fireCaretUpdated()
        }
    };
    this.ice = this.ice || {};
    this.ice.InlineChangeEditor = b
}).call(this);
(function () {
    var e = {
        DOM_VK_DELETE: 8,
        DOM_VK_LEFT: 37,
        DOM_VK_UP: 38,
        DOM_VK_RIGHT: 39,
        DOM_VK_DOWN: 40,
        DOM_VK_ENTER: 13,
        ELEMENT_NODE: 1,
        ATTRIBUTE_NODE: 2,
        TEXT_NODE: 3,
        CDATA_SECTION_NODE: 4,
        ENTITY_REFERENCE_NODE: 5,
        ENTITY_NODE: 6,
        PROCESSING_INSTRUCTION_NODE: 7,
        COMMENT_NODE: 8,
        DOCUMENT_NODE: 9,
        DOCUMENT_TYPE_NODE: 10,
        DOCUMENT_FRAGMENT_NODE: 11,
        NOTATION_NODE: 12,
        CHARACTER_UNIT: "character",
        WORD_UNIT: "word",
        getKeyChar: function (b) {
            return String.fromCharCode(b.which)
        },
        getClass: function (b, a, d) {
            if (!a) a = document.body;
            b = "." + b.split(" ").join(".");
            d && (b = d + b);
            return jQuery.makeArray(jQuery(a).find(b))
        },
        getId: function (b, a) {
            a || (a = document);
            return element = a.getElementById(b)
        },
        getTag: function (b, a) {
            a || (a = document);
            return jQuery.makeArray(jQuery(a).find(b))
        },
        getElementWidth: function (b) {
            return b.offsetWidth
        },
        getElementHeight: function (b) {
            return b.offsetHeight
        },
        getElementDimensions: function (b) {
            return {
                width: e.getElementWidth(b),
                height: e.getElementHeight(b)
            }
        },
        trim: function (b) {
            return jQuery.trim(b)
        },
        empty: function (b) {
            if (b) return jQuery(b).empty()
        },
        remove: function (b) {
            if (b) return jQuery(b).remove()
        },
        prepend: function (b, a) {
            jQuery(b).prepend(a)
        },
        append: function (b, a) {
            jQuery(b).append(a)
        },
        insertBefore: function (b, a) {
            jQuery(b).before(a)
        },
        insertAfter: function (b, a) {
            jQuery(b).after(a)
        },
        getHtml: function (b) {
            return jQuery(b).html()
        },
        setHtml: function (b, a) {
            b && jQuery(b).html(a)
        },
        contents: function (b) {
            return jQuery(b).contents()
        },
        extractContent: function (b) {
            for (var a = document.createDocumentFragment(), d; d = b.firstChild;) a.appendChild(d);
            return a
        }
    };
    e.getNode = function (b, a) {
        return e.is(b, a) ? b : e.parents(b, a)[0] || null
    };
    e.getParents = function (b, a, d) {
        for (var b = jQuery(b).parents(a), a = b.length, e = [], g = 0; g < a; g++) {
            if (b[g] === d) break;
            e.push(b[g])
        }
        return e
    };
    e.hasBlockChildren = function (b) {
        for (var a = b.childNodes.length, d = 0; d < a; d++) if (b.childNodes[d].nodeType === e.ELEMENT_NODE && e.isBlockElement(b.childNodes[d]) === !0) return !0;
        return !1
    };
    e.removeTag = function (b, a) {
        jQuery(b).find(a).replaceWith(function () {
            return jQuery(this).contents()
        });
        return b
    };
    e.stripEnclosingTags = function (b, a) {
        var d = jQuery(b);
        d.find("*").not(a).replaceWith(function () {
            return jQuery(this).contents()
        });
        return d[0]
    };
    e.getSiblings = function (b, a, d, e) {
        if (d === !0) return a === "prev" ? jQuery(b).prevAll() : jQuery(b).nextAll();
        else {
            d = [];
            if (a === "prev") for (; b.previousSibling;) {
                b = b.previousSibling;
                if (b === e) break;
                d.push(b)
            } else for (; b.nextSibling;) {
                b = b.nextSibling;
                if (b === e) break;
                d.push(b)
            }
            return d
        }
    };
    e.getNodeTextContent = function (b) {
        return jQuery(b).text()
    };
    e.setNodeTextContent = function (b, a) {
        return jQuery(b).text(a)
    };
    e.getTagName = function (b) {
        return b.tagName && b.tagName.toLowerCase() || null
    };
    e.getIframeDocument = function (b) {
        var a = null;
        if (b.contentDocument) a = b.contentDocument;
        else if (b.contentWindow) a = b.contentWindow.document;
        else if (b.document) a = b.document;
        return a
    };
    e.isBlockElement = function (b) {
        switch (b.nodeName.toLowerCase()) {
            case "p":
            case "div":
            case "pre":
            case "ul":
            case "ol":
            case "li":
            case "table":
            case "tbody":
            case "td":
            case "th":
            case "fieldset":
            case "form":
            case "blockquote":
            case "dl":
            case "dir":
            case "center":
            case "address":
            case "h1":
            case "h2":
            case "h3":
            case "h4":
            case "h5":
            case "h6":
            case "img":
                return !0;
            default:
                return !1
        }
    };
    e.isStubElement = function (b) {
        if (b) switch (b.nodeName.toLowerCase()) {
            case "img":
            case "br":
            case "hr":
            case "iframe":
            case "param":
            case "link":
            case "meta":
            case "input":
            case "frame":
            case "col":
            case "base":
            case "area":
                return !0
        }
        return !1
    };
    e.isChildOf = function (b, a) {
        try {
            for (; b && b.parentNode;) {
                if (b.parentNode === a) return !0;
                b = b.parentNode
            }
        } catch (d) {}
        return !1
    };
    e.isChildOfTagName = function (b, a) {
        var d = null;
        try {
            for (; b && b.parentNode;) {
                if (b.parentNode && b.parentNode.tagName && b.parentNode.tagName.toLowerCase() === a) d = b.parentNode;
                b = b.parentNode
            }
        } catch (e) {}
        return d
    };
    e.isChildOfClassName = function (b, a) {
        var d = null;
        try {
            for (; b && b.parentNode;) {
                if (jQuery(b.parentNode).hasClass(a)) d = b.parentNode;
                b = b.parentNode
            }
        } catch (e) {}
        return d
    };
    e.cloneNode = function (b, a) {
        a === void 0 && (a = !0);
        return jQuery(b).clone(a)
    };
    e.bind = function (b, a, d) {
        return jQuery(b).bind(a, d)
    };
    e.unbind = function (b, a, d) {
        return jQuery(b).unbind(a, d)
    };
    e.attr = function (b, a, d) {
        return d ? jQuery(b).attr(a, d) : jQuery(b).attr(a)
    };
    e.replaceWith = function (b, a) {
        return jQuery(b).replaceWith(a)
    };
    e.removeAttr = function (b, a) {
        jQuery(b).removeAttr(a)
    };
    e.getElementsBetween = function (b, a) {
        var d = [];
        if (b === a) return d;
        if (e.isChildOf(a, b) === !0) {
            for (var f = b.childNodes.length, g = 0; g < f; g++) if (b.childNodes[g] === a) break;
            else if (e.isChildOf(a, b.childNodes[g]) === !0) return e.arrayMerge(d, e.getElementsBetween(b.childNodes[g], a));
            else d.push(b.childNodes[g]);
            return d
        }
        for (f = b.nextSibling; f;) if (e.isChildOf(a, f) === !0) return d = e.arrayMerge(d, e.getElementsBetween(f, a));
        else if (f === a) return d;
        else d.push(f), f = f.nextSibling;
        for (var f = e.getParents(b), g = e.getParents(a), f = e.arrayDiff(f, g, !0), g = f.length, h = 0; h < g - 1; h++) d = e.arrayMerge(d, e.getSiblings(f[h], "next"));
        return d = e.arrayMerge(d, e.getElementsBetween(f[f.length - 1], a))
    };
    e.getCommonAncestor = function (b, a) {
        for (var d = b; d;) {
            if (e.isChildOf(a, d) === !0) return d;
            d = d.parentNode
        }
        return null
    };
    e.getNextNode = function (b) {
        if (b.nextSibling) return b.nextSibling;
        else if (b.parentNode) return e.getFirstChild(b.parentNode);
        return null
    };
    e.getPrevNode = function (b) {
        if (b.previousSibling) return b.previousSibling;
        else if (b.parentNode) return e.getLastChild(b.parentNode);
        return null
    };
    e.getFirstChild = function (b) {
        return b.firstChild ? b.firstChild.nodeType === e.ELEMENT_NODE ? e.getFirstChild(b.firstChild) : b.firstChild : b
    };
    e.getLastChild = function (b) {
        return b.lastChild ? b.lastChild.nodeType === e.ELEMENT_NODE ? e.getLastChild(b.lastChild) : b.lastChild : b
    };
    e.removeEmptyNodes = function (b, a) {
        for (var d = jQuery(b).find(":empty"), f = d.length; f > 0;) f--, e.isStubElement(d[f]) === !1 && (!a || a.call(this, d[f]) !== !1) && e.remove(d[f])
    };
    e.create = function (b) {
        return jQuery(b)[0]
    };
    e.find = function (b, a) {
        return jQuery(b).find(a)
    };
    e.children = function (b, a) {
        return jQuery(b).children(a)
    };
    e.parent = function (b, a) {
        return jQuery(b).parent(a)[0]
    };
    e.parents = function (b, a) {
        return jQuery(b).parents(a)
    };
    e.is = function (b, a) {
        return jQuery(b).is(a)
    };
    e.extend = function (b, a, d, e) {
        return jQuery.extend.apply(this, arguments)
    };
    e.walk = function (b, a, d) {
        b && (d || (d = 0), a.call(this, b, d) !== !1 && (b.childNodes && b.childNodes.length > 0 ? e.walk(b.firstChild, a, d + 1) : b.nextSibling ? e.walk(b.nextSibling,
        a, d) : b.parentNode && b.parentNode.nextSibling && e.walk(b.parentNode.nextSibling, a, d - 1)))
    };
    e.revWalk = function (b, a) {
        b && a.call(this, b) !== !1 && (b.childNodes && b.childNodes.length > 0 ? e.walk(b.lastChild, a) : b.previousSibling ? e.walk(b.previousSibling, a) : b.parentNode && b.parentNode.previousSibling && e.walk(b.parentNode.previousSibling, a))
    };
    e.setStyle = function (b, a, d) {
        b && jQuery(b).css(a, d)
    };
    e.getStyle = function (b, a) {
        return jQuery(b).css(a)
    };
    e.hasClass = function (b, a) {
        return jQuery(b).hasClass(a)
    };
    e.addClass = function (b,
    a) {
        jQuery(b).addClass(a)
    };
    e.removeClass = function (b, a) {
        jQuery(b).removeClass(a)
    };
    e.preventDefault = function (b) {
        b.preventDefault();
        e.stopPropagation(b)
    };
    e.stopPropagation = function (b) {
        b.stopPropagation()
    };
    e.noInclusionInherits = function (b, a) {
        if (a instanceof String || typeof a === "string") a = window[a];
        if (b instanceof String || typeof b === "string") b = window[b];
        var d = function () {};
        if (e.isset(a) === !0) for (value in a.prototype) b.prototype[value] ? d.prototype[value] = a.prototype[value] : b.prototype[value] = a.prototype[value];
        if (b.prototype) d.prototype.constructor = a, b.prototype["super"] = new d
    };
    e.each = function (b, a) {
        jQuery.each(b, function (d, b) {
            a.call(this, d, b)
        })
    };
    e.foreach = function (b, a) {
        if (b instanceof Array || b instanceof NodeList || typeof b.length != "undefined" && typeof b.item != "undefined") for (var d = b.length, e = 0; e < d; e++) {
            var g = a.call(this, e, b[e]);
            if (g === !1) break
        } else for (d in b) if (b.hasOwnProperty(d) === !0 && (g = a.call(this, d), g === !1)) break
    };
    e.isBlank = function (b) {
        return !b || /^\s*$/.test(b) ? !0 : !1
    };
    e.isFn = function (b) {
        return typeof b ===
            "function" ? !0 : !1
    };
    e.isObj = function (b) {
        return b !== null && typeof b === "object" ? !0 : !1
    };
    e.isset = function (b) {
        return typeof b !== "undefined" && b !== null ? !0 : !1
    };
    e.isArray = function (b) {
        return jQuery.isArray(b)
    };
    e.isNumeric = function (b) {
        return b.match(/^\d+$/) !== null ? !0 : !1
    };
    e.getUniqueId = function () {
        return ((new Date).getTime() + "" + Math.ceil(Math.random() * 1E6)).substr(5, 18).replace(/,/, "")
    };
    e.inArray = function (b, a) {
        for (var d = a.length, e = 0; e < d; e++) if (b === a[e]) return !0;
        return !1
    };
    e.arrayDiff = function (b, a, d) {
        for (var f = b.length,
        g = [], h = 0; h < f; h++) e.inArray(b[h], a) === !1 && g.push(b[h]);
        if (d !== !0) {
            f = a.length;
            for (h = 0; h < f; h++) e.inArray(a[h], b) === !1 && g.push(a[h])
        }
        return g
    };
    e.arrayMerge = function (b, a) {
        for (var d = a.length, e = 0; e < d; e++) b.push(a[e]);
        return b
    };
    e.stripTags = function (b, a) {
        if (typeof a === "string") {
            var d = jQuery("<div>" + b + "</div>");
            d.find("*").not(a).remove();
            return d.html()
        } else {
            for (var f = RegExp(/<\/?(\w+)((\s+\w+(\s*=\s*(?:".*?"|'.*?'|[^'">\s]+))?)+\s*|\s*)\/?>/gim), g = b;
            (d = f.exec(b)) != null;) if (e.isset(a) === !1 || e.inArray(d[1],
            a) !== !0) g = g.replace(d[0], "");
            return g
        }
    };
    e.browser = function () {
        var b = {};
        b.version = jQuery.browser.version;
        if (jQuery.browser.mozilla === !0) b.type = "mozilla";
        else if (jQuery.browser.msie === !0) b.type = "msie";
        else if (jQuery.browser.opera === !0) b.type = "opera";
        else if (jQuery.browser.safari === !0) b.type = "safari";
        return b
    };
    e.getBrowserType = function () {
        if (this._browserType === null) {
            for (var b = ["msie", "firefox", "chrome", "safari"], a = b.length, d = 0; d < a; d++) if (RegExp(b[d], "i").test(navigator.userAgent) === !0) return this._browserType = b[d];
            this._browserType = "other"
        }
        return this._browserType
    };
    e.isBrowser = function (b) {
        return e.browser().type === b
    };
    e.getBlockParent = function (b, a) {
        if (b) for (; b.parentNode;) {
            b = b.parentNode;
            if (b === a) break;
            if (e.isBlockElement(b) === !0) return b
        }
        return null
    };
    e.onBlockBoundary = function (b, a, d) {
        if (!b || !a) return !1;
        b = e.isChildOfTagName(b, d) || e.is(b, d) && b || null;
        a = e.isChildOfTagName(a, d) || e.is(a, d) && a || null;
        return b !== a
    };
    e.mergeContainers = function (b, a) {
        if (!b || !a) return !1;
        if (b.nodeType === e.TEXT_NODE || e.isStubElement(b)) a.appendChild(b);
        else if (b.nodeType === e.ELEMENT_NODE) {
            for (; b.firstChild;) a.appendChild(b.firstChild);
            e.remove(b)
        }
        return !0
    };
    e.mergeBlockWithSibling = function (b, a, d) {
        var f = d ? a.nextSibling : a.previousSibling;
        d ? e.mergeContainers(f, a) : e.mergeContainers(a, f);
        b.collapse(!0);
        return !0
    };
    e.date = function (b, a, d) {
        if (a === null && d && (a = e.tsIso8601ToTimestamp(d), !a)) return;
        for (var a = new Date(a), b = b.split(""), d = b.length, f = "", g = 0; g < d; g++) {
            var h = "",
                i = b[g];
            switch (i) {
                case "D":
                case "l":
                    h = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
                        "Friday", "Saturday"][a.getDay()];
                    i === "D" && (h = h.substring(0, 3));
                    break;
                case "F":
                case "m":
                    h = a.getMonth() + 1;
                    h < 10 && (h = "0" + h);
                    break;
                case "M":
                    months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    h = months[a.getMonth()];
                    i === "M" && (h = h.substring(0, 3));
                    break;
                case "d":
                    h = a.getDate();
                    break;
                case "S":
                    h = e.getOrdinalSuffix(a.getDate());
                    break;
                case "Y":
                    h = a.getFullYear();
                    break;
                case "y":
                    h = a.getFullYear();
                    h = h.toString().substring(2);
                    break;
                case "H":
                    h = a.getHours();
                    break;
                case "h":
                    h = a.getHours();
                    h === 0 ? h = 12 : h > 12 && (h -= 12);
                    break;
                case "i":
                    h = e.addNumberPadding(a.getMinutes());
                    break;
                case "a":
                    h = "am";
                    a.getHours() >= 12 && (h = "pm");
                    break;
                default:
                    h = i
            }
            f += h
        }
        return f
    };
    e.getOrdinalSuffix = function (b) {
        var a = "",
            a = b % 100;
        if (a >= 4 && a <= 20) a = "th";
        else switch (b % 10) {
            case 1:
                a = "st";
                break;
            case 2:
                a = "nd";
                break;
            case 3:
                a = "rd";
                break;
            default:
                a = "th"
        }
        return a
    };
    e.addNumberPadding = function (b) {
        b < 10 && (b = "0" + b);
        return b
    };
    e.tsIso8601ToTimestamp = function (b) {
        if (b = b.match(RegExp(/(\d\d\d\d)(?:-?(\d\d)(?:-?(\d\d)(?:[T ](\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(?:Z|(?:([-+])(\d\d)(?::?(\d\d))?)?)?)?)?)?/))) {
            var a = new Date;
            a.setDate(b[3]);
            a.setFullYear(b[1]);
            a.setMonth(b[2] - 1);
            a.setHours(b[4]);
            a.setMinutes(b[5]);
            a.setSeconds(b[6]);
            var d = b[9] * 60;
            b[8] === "+" && (d *= -1);
            d -= a.getTimezoneOffset();
            return a.getTime() + d * 6E4
        }
        return null
    };
    this.dom = e
}).call(this.ice);
(function () {
    var e;
    e = function (b, a, d) {
        this.env = b;
        this.element = b.element;
        this.selection = this.env.selection;
        d || this.removeBookmarks(this.element);
        var b = a || this.selection.getRangeAt(0),
            a = b.cloneRange(),
            e = a.startContainer,
            g = a.startOffset;
        a.collapse(!1);
        d = this.env.document.createElement("span");
        d.style.display = "none";
        ice.dom.setHtml(d, "&nbsp;");
        ice.dom.addClass(d, "iceBookmark iceBookmark_end");
        d.setAttribute("iceBookmark", "end");
        a.insertNode(d);
        ice.dom.isChildOf(d, this.element) || this.element.appendChild(d);
        a.setStart(e, g);
        a.collapse(!0);
        e = this.env.document.createElement("span");
        e.style.display = "none";
        ice.dom.addClass(e, "iceBookmark iceBookmark_start");
        ice.dom.setHtml(e, "&nbsp;");
        e.setAttribute("iceBookmark", "start");
        try {
            a.insertNode(e), e.previousSibling === d && (a = e, e = d, d = a)
        } catch (h) {
            ice.dom.insertBefore(d, e)
        }
        ice.dom.isChildOf(e, this.element) === !1 && (this.element.firstChild ? ice.dom.insertBefore(this.element.firstChild, e) : this.element.appendChild(e));
        d.previousSibling || (a = this.env.document.createTextNode(""),
        ice.dom.insertBefore(d, a));
        e.nextSibling || (a = this.env.document.createTextNode(""), ice.dom.insertAfter(e, a));
        b.setStart(e.nextSibling, 0);
        b.setEnd(d.previousSibling, d.previousSibling.length || 0);
        this.start = e;
        this.end = d
    };
    e.prototype = {
        selectBookmark: function () {
            var b = this.selection.getRangeAt(0),
                a = null,
                d = null,
                e = 0,
                g = null;
            if (this.start.nextSibling === this.end || ice.dom.getElementsBetween(this.start, this.end).length === 0) if (this.end.nextSibling) a = ice.dom.getFirstChild(this.end.nextSibling);
            else if (this.start.previousSibling) {
                if (a = ice.dom.getFirstChild(this.start.previousSibling), a.nodeType === ice.dom.TEXT_NODE) e = a.length
            } else this.end.parentNode.appendChild(this.env.document.createTextNode("")), a = ice.dom.getFirstChild(this.end.nextSibling);
            else this.start.nextSibling ? a = ice.dom.getFirstChild(this.start.nextSibling) : (this.start.previousSibling || (a = this.env.document.createTextNode(""), ice.dom.insertBefore(this.start, a)), a = ice.dom.getLastChild(this.start.previousSibling), e = a.length), this.end.previousSibling ? d = ice.dom.getLastChild(this.end.previousSibling) : (d = ice.dom.getFirstChild(this.end.nextSibling || this.end), g = 0);
            ice.dom.remove([this.start, this.end]);
            d === null ? (b.setEnd(a, e), b.collapse(!1)) : (b.setStart(a, e), g === null && (g = d.length || 0), b.setEnd(d, g));
            try {
                this.selection.addRange(b)
            } catch (h) {}
        },
        getBookmark: function (b, a) {
            return ice.dom.getClass("iceBookmark_" + a, b)[0]
        },
        removeBookmarks: function (b) {
            ice.dom.remove(ice.dom.getClass("iceBookmark", b, "span"))
        }
    };
    this.Bookmark = e
}).call(this.ice);
(function () {
    var e;
    e = function (b) {
        this._selection = null;
        this.env = b;
        this._initializeRangeLibrary();
        this._getSelection()
    };
    e.prototype = {
        _getSelection: function () {
            this._selection ? this._selection.refresh() : this._selection = this.env.frame ? rangy.getIframeSelection(this.env.frame) : rangy.getSelection();
            
            return this._selection
        },
        createRange: function () {
            return rangy.createRange(this.env.document)
        },
        getRangeAt: function (b) {
            this._selection.refresh();
            try {
                return this._selection.getRangeAt(b)
            } catch (a) {
                return this._selection = null, this._getSelection().getRangeAt(0)
            }
        },
        addRange: function (b) {
            this._selection || (this._selection = this._getSelection());
            this._selection.setSingleRange(b);
            this._selection.ranges = [b]
        },
        _initializeRangeLibrary: function () {
            var b = this;
            rangy.init();
            rangy.config.checkSelectionRanges = !1;
            var a = function (a, b, e, h) {
                if (e === 0) throw Error("InvalidArgumentException: units cannot be 0");
                switch (b) {
                    case ice.dom.CHARACTER_UNIT:
                        e > 0 ? a.moveCharRight(h, e) : a.moveCharLeft(h, e * -1)
                }
            };
            rangy.rangePrototype.moveStart = function (d, b) {
                a(this,
                d, b, !0)
            };
            rangy.rangePrototype.moveEnd = function (d, b) {
                a(this, d, b, !1)
            };
            rangy.rangePrototype.setRange = function (a, b, e) {
                a ? this.setStart(b, e) : this.setEnd(b, e)
            };
            rangy.rangePrototype.moveCharLeft = function (a, b) {
                var e, h;
                a ? (e = this.startContainer, h = this.startOffset) : (e = this.endContainer, h = this.endOffset);
                if (e.nodeType === ice.dom.ELEMENT_NODE) if (e.hasChildNodes()) {
                    e = e.childNodes[h];
                    for (e = this.getPreviousTextNode(e); e && e.nodeType == ice.dom.TEXT_NODE && e.nodeValue === "";) e = this.getPreviousTextNode(e);
                    h = e.data.length - b
                } else h = b * -1;
                else h -= b;
                if (h < 0) for (; h < 0;) {
                    e = this.getPreviousTextNode(e, []);
                    if (!e) return;
                    e.nodeType !== ice.dom.ELEMENT_NODE && (h += e.data.length)
                }
                this.setRange(a, e, h)
            };
            rangy.rangePrototype.moveCharRight = function (a, b) {
                var e, h;
                a ? (e = this.startContainer, h = this.startOffset) : (e = this.endContainer, h = this.endOffset);
                e.nodeType === ice.dom.ELEMENT_NODE ? (e = e.childNodes[h], e.nodeType !== ice.dom.TEXT_NODE && (e = this.getNextTextNode(e)), h = b) : h += b;
                var i = h - e.data.length;
                if (i > 0) {
                    for (h = []; i > 0;) if (e = this.getNextContainer(e,
                    h), e.nodeType !== ice.dom.ELEMENT_NODE) if (e.data.length >= i) break;
                    else e.data.length > 0 && (i -= e.data.length);
                    h = i
                }
                this.setRange(a, e, h)
            };
            rangy.rangePrototype.getNextContainer = function (a, b) {
                if (!a) return null;
                for (; a.nextSibling;) if (a = a.nextSibling, a.nodeType !== ice.dom.TEXT_NODE) {
                    var e = this.getFirstSelectableChild(a);
                    if (e !== null) return e
                } else if (this.isSelectable(a) === !0) return a;
                for (; a && !a.nextSibling;) a = a.parentNode;
                if (!a) return null;
                a = a.nextSibling;
                if (this.isSelectable(a) === !0) return a;
                else b && ice.dom.isBlockElement(a) === !0 && b.push(a);
                e = this.getFirstSelectableChild(a);
                return e !== null ? e : this.getNextContainer(a, b)
            };
            rangy.rangePrototype.getPreviousContainer = function (a, b) {
                if (!a) return null;
                for (; a.previousSibling;) if (a = a.previousSibling, a.nodeType !== ice.dom.TEXT_NODE) if (ice.dom.isStubElement(a) === !0) return a;
                else {
                    var e = this.getLastSelectableChild(a);
                    if (e !== null) return e
                } else if (this.isSelectable(a) === !0) return a;
                for (; a && !a.previousSibling;) a = a.parentNode;
                if (!a) return null;
                a = a.previousSibling;
                if (this.isSelectable(a) === !0) return a;
                else b && ice.dom.isBlockElement(a) === !0 && b.push(a);
                e = this.getLastSelectableChild(a);
                return e !== null ? e : this.getPreviousContainer(a, b)
            };
            rangy.rangePrototype.getNextTextNode = function (a) {
                if (a.nodeType === ice.dom.ELEMENT_NODE && a.childNodes.length !== 0) return this.getFirstSelectableChild(a);
                a = this.getNextContainer(a);
                return a.nodeType === ice.dom.TEXT_NODE ? a : this.getNextTextNode(a)
            };
            rangy.rangePrototype.getPreviousTextNode = function (a, b) {
                if (a.nodeType === ice.dom.ELEMENT_NODE && a.childNodes.length !== 0) return this.getLastSelectableChild(a);
                a = this.getPreviousContainer(a, b);
                return a.nodeType === ice.dom.TEXT_NODE ? a : this.getPreviousTextNode(a, b)
            };
            rangy.rangePrototype.getFirstSelectableChild = function (a) {
                if (a) if (a.nodeType !== ice.dom.TEXT_NODE) for (a = a.firstChild; a;) if (this.isSelectable(a) === !0) return a;
                else if (a.firstChild) {
                    var b = this.getFirstSelectableChild(a);
                    if (b !== null) return b;
                    else a = a.nextSibling
                } else a = a.nextSibling;
                else return a;
                return null
            };
            rangy.rangePrototype.getLastSelectableChild = function (a) {
                if (a) if (a.nodeType !== ice.dom.TEXT_NODE) for (a = a.lastChild; a;) if (this.isSelectable(a) === !0) return a;
                else if (a.lastChild) {
                    var b = this.getLastSelectableChild(a);
                    if (b !== null) return b;
                    else a = a.previousSibling
                } else a = a.previousSibling;
                else return a;
                return null
            };
            rangy.rangePrototype.isSelectable = function (a) {
                return a && a.nodeType === ice.dom.TEXT_NODE && a.data.length !== 0 ? !0 : !1
            };
            rangy.rangePrototype.getHTMLContents = function (a) {
                a || (a = this.cloneContents());
                var e = b.env.document.createElement("div");
                e.appendChild(a.cloneNode(!0));
                return e.innerHTML
            };
            rangy.rangePrototype.getHTMLContentsObj = function () {
                return this.cloneContents()
            }
        }
    };
    this.Selection = e
}).call(this.ice);
(function () {
    var e = function (b) {
        this._ice = b
    };
    e.prototype = {
        start: function () {},
        clicked: function () {
            return !0
        },
        mouseDown: function () {
            return !0
        },
        keyDown: function () {
            return !0
        },
        keyPress: function () {
            return !0
        },
        selectionChanged: function () {},
        setEnabled: function () {},
        setDisabled: function () {},
        caretUpdated: function () {},
        nodeInserted: function () {},
        nodeCreated: function () {},
        caretPositioned: function () {},
        remove: function () {
            this._ice.removeKeyPressListener(this)
        },
        setSettings: function () {}
    };
    this.IcePlugin = e
}).call(this.ice);
(function () {
    var e = function (b) {
        this.plugins = {};
        this.pluginConstructors = {};
        this.keyPressListeners = {};
        this.activePlugin = null;
        this.pluginSets = {};
        this.activePluginSet = null;
        this._ice = b
    };
    e.prototype = {
        getPluginNames: function () {
            var b = [],
                a;
            for (a in this.plugins) b.push(a);
            return b
        },
        addPluginObject: function (b, a) {
            this.plugins[b] = a
        },
        addPlugin: function (b, a) {
            if (typeof a !== "function") throw Error("IcePluginException: plugin must be a constructor function");
            ice.dom.isset(this.pluginConstructors[b]) === !1 && (this.pluginConstructors[b] = a)
        },
        loadPlugins: function (b, a) {
            if (b.length === 0) a.call(this);
            else {
                var d = b.shift();
                if (typeof d === "object") d = d.name;
                if (ice.dom.isset(ice._plugin[d]) === !0) this.addPlugin(d, ice._plugin[d]), this.loadPlugins(b, a);
                else throw Error("plugin was not included in the page: " + d);
            }
        },
        _enableSet: function (b) {
            this.activePluginSet = b;
            for (var a = this.pluginSets[b].length, d = 0; d < a; d++) {
                var e = this.pluginSets[b][d],
                    g = "",
                    g = typeof e === "object" ? e.name : e,
                    h = this.pluginConstructors[g];
                h && (h = new h(this._ice), this.plugins[g] = h, ice.dom.isset(e.settings) === !0 && h.setSettings(e.settings), h.start())
            }
        },
        setActivePlugin: function (b) {
            this.activePlugin = b
        },
        getActivePlugin: function () {
            return this.activePlugin
        },
        _getPluginName: function (b) {
            b = b.toString();
            return b.substr(9, b.indexOf("(") - 9)
        },
        removePlugin: function (b) {
            this.plugins[b] && this.plugins[b].remove()
        },
        getPlugin: function (b) {
            return this.plugins[b]
        },
        usePlugins: function (b, a, d) {
            var e = this;
            this.pluginSets[b] = ice.dom.isset(a) === !0 ? a : [];
            this.loadPlugins(this.pluginSets[b].concat([]), function () {
                e._enableSet(b);
                d && d.call(this)
            })
        },
        disablePlugin: function (b) {
            this.plugins[b].disable()
        },
        isPluginElement: function (b) {
            for (var a in this.plugins) if (this.plugins[a].isPluginElement && this.plugins[a].isPluginElement(b) === !0) return !0;
            return !1
        },
        fireKeyPressed: function (b) {
            if (this._fireKeyPressFns(b, "all_keys") === !1) return !1;
            var a = [];
            (b.ctrlKey === !0 || b.metaKey === !0) && a.push("ctrl");
            b.shiftKey === !0 && a.push("shift");
            b.altKey === !0 && a.push("alt");
            switch (b.keyCode) {
                case 13:
                    a.push("enter");
                    break;
                case ice.dom.DOM_VK_LEFT:
                    a.push("left");
                    break;
                case ice.dom.DOM_VK_RIGHT:
                    a.push("right");
                    break;
                case ice.dom.DOM_VK_UP:
                    a.push("up");
                    break;
                case ice.dom.DOM_VK_DOWN:
                    a.push("down");
                    break;
                case 9:
                    a.push("tab");
                    break;
                case ice.dom.DOM_VK_DELETE:
                    a.push("delete");
                    break;
                default:
                    var d;
                    if (b.keyCode) d = b.keyCode;
                    else if (b.which) d = b.which;
                    d && a.push(String.fromCharCode(d).toLowerCase())
            }
            a = a.sort().join("+");
            return this._fireKeyPressFns(b, a)
        },
        _fireKeyPressFns: function (b, a) {
            if (this.keyPressListeners[a]) for (var d = this.keyPressListeners[a].length, e = 0; e < d; e++) {
                var g = this.keyPressListeners[a][e],
                    h = g.fn,
                    i = g.plugin,
                    g = g.data;
                if (h) if (ice.dom.isFn(h) === !0) {
                    if (h.call(i, b, g) === !0) return ice.dom.preventDefault(b), !1
                } else if (i[h] && i[h].call(i, b, g) === !0) return ice.dom.preventDefault(b), !1
            }
            return !0
        },
        fireSelectionChanged: function (b) {
            for (var a in this.plugins) this.plugins[a].selectionChanged(b)
        },
        fireNodeInserted: function (b, a) {
            for (var d in this.plugins) if (this.plugins[d].nodeInserted(b, a) === !1) return !1
        },
        fireNodeCreated: function (b, a) {
            for (var d in this.plugins) if (this.plugins[d].nodeCreated(b, a) === !1) return !1
        },
        fireCaretPositioned: function () {
            for (var b in this.plugins) this.plugins[b].caretPositioned()
        },
        fireClicked: function (b) {
            var a = !0,
                d;
            for (d in this.plugins) this.plugins[d].clicked(b) === !1 && (a = !1);
            return a
        },
        fireMouseDown: function (b) {
            var a = !0,
                d;
            for (d in this.plugins) this.plugins[d].mouseDown(b) === !1 && (a = !1);
            return a
        },
        fireKeyDown: function (b) {
            var a = !0,
                d;
            for (d in this.plugins) this.plugins[d].keyDown(b) === !1 && (a = !1);
            return a
        },
        fireKeyPress: function (b) {
            var a = !0,
                d;
            for (d in this.plugins) this.plugins[d].keyPress(b) === !1 && (a = !1);
            return a
        },
        fireEnabled: function (b) {
            for (var a in this.plugins) this.plugins[a].setEnabled(b)
        },
        fireDisabled: function (b) {
            for (var a in this.plugins) this.plugins[a].setDisabled(b)
        },
        fireCaretUpdated: function () {
            for (var b in this.plugins) this.plugins[b].caretUpdated && this.plugins[b].caretUpdated()
        }
    };
    this._plugin = {};
    this.IcePluginManager = e
}).call(this.ice);
(function () {
    var e;
    e = function (b) {
        this._ice = b
    };
    e.prototype = {
        nodeCreated: function (b, a) {
            b.setAttribute("title", (a.action || "Modified") + " by " + b.getAttribute(this._ice.userNameAttribute) + " - " + ice.dom.date("m/d/Y h:ia", parseInt(b.getAttribute(this._ice.timeAttribute))))
        }
    };
    ice.dom.noInclusionInherits(e, ice.IcePlugin);
    this._plugin.IceAddTitlePlugin = e
}).call(this.ice);
(function () {
    var e;
    e = function (b) {
        this._ice = b;
        this._tmpNode = null;
        this._tmpNodeTagName = "icepaste";
        this._pasteId = "icepastediv";
        var a = this;
        this.pasteType = "formattedClean";
        this.preserve = "p";
        this.beforePasteClean = function (a) {
            return a
        };
        this.afterPasteClean = function (a) {
            return a
        };
        b.element.oncopy = function () {
            return a.handleCopy.apply(a)
        };
        b.element.oncut = function () {
            return a.handleCut.apply(a)
        }
    };
    e.prototype = {
        setSettings: function (b) {
            b = b || {};
            ice.dom.extend(this, b);
            this.preserve += "," + this._tmpNodeTagName;
            this.setupPreserved()
        },
        keyDown: function (b) {
            b.metaKey !== !0 && b.ctrlKey !== !0 || b.keyCode == 86 && this.handlePaste()
        },
        handleCut: function () {
            if (this._ice.isTracking) {
                var b = this._ice.getCurrentRange();
                if (!b.collapsed) {
                    var a = b.cloneContents(),
                        d = this;
                    setTimeout(function () {
                        d.doCut(a)
                    }, 1);
                    return !0
                }
            }
        },
        doCut: function (b) {
            var a = this._ice.getCurrentRange(),
                d, e;
            this._tmpNode = this._ice.env.document.createElement("span");
            a.insertNode(this._tmpNode);
            a.setStartAfter(this._tmpNode);
            for (a.collapse(!0); d = b.firstChild;) a.insertNode(d), a.setStartAfter(d),
            a.collapse(!0), e = d;
            a.setStartBefore(this._tmpNode);
            a.collapse(!0);
            a.setEndAfter(e);
            this._ice.env.selection.addRange(a);
            this._ice.deleteContents(null, null, "cutType");
            ice.dom.remove(this._tmpNode)
        },
        handleCopy: function () {},
        handlePaste: function () {
            var b = this._ice.getCurrentRange();
            b.collapsed || (this._ice.isTracking ? (this._ice.deleteContents(), b = b.cloneRange()) : (b.deleteContents(), b.collapse(!0)));
            this._ice.isTracking && this._ice._moveRangeToValidTrackingPos(b);
            if (b.startContainer == this._ice.element) {
                var a = ice.dom.find(this._ice.element, this._ice.blockEl)[0];
                a || (a = ice.dom.create("<" + this._ice.blockEl + " ><br/></" + this._ice.blockEl + ">"), this._ice.element.appendChild(a));
                b.setStart(a, 0);
                b.collapse(!0);
                this._ice.env.selection.addRange(b)
            }
            this._tmpNode = this._ice.env.document.createElement(this._tmpNodeTagName);
            b.insertNode(this._tmpNode);
            switch (this.pasteType) {
                case "formatted":
                    this.setupPaste();
                    break;
                case "formattedClean":
                    this.setupPaste(!0)
            }
            return !0
        },
        setupPaste: function (b) {
            var a = this.createDiv(this._pasteId),
                d = this;
            a.focus();
            a.onpaste = function () {
                setTimeout(function () {
                    d.handlePasteValue(b)
                }, 1)
            };
            return !0
        },
        handlePasteValue: function (b) {
            var a = ice.dom.getHtml(document.getElementById(this._pasteId)),
                d = ice.dom.children("<div>" + a + "</div>", this._ice.blockEl);
            d.length === 1 && ice.dom.getNodeTextContent("<div>" + a + "</div>") === ice.dom.getNodeTextContent(d) && (a = ice.dom.getHtml(a));
            a = this.beforePasteClean.call(this, a);
            b && (a = this._ice.getCleanContent(a), a = this.stripPaste(a));
            var a = this.afterPasteClean.call(this, a),
                a = ice.dom.trim(a),
                e = this._ice.getCurrentRange();
            e.setStartAfter(this._tmpNode);
            e.collapse(!0);
            var g = null,
                a = e.createContextualFragment(a),
                b = this._ice.startBatchChange();
            if (ice.dom.hasBlockChildren(a)) {
                var h = ice.dom.isChildOfTagName(this._tmpNode, this._ice.blockEl);
                e.setEndAfter(h.lastChild);
                this._ice.selection.addRange(e);
                g = e.extractContents();
                d = this._ice.env.document.createElement(this._ice.blockEl);
                d.appendChild(g);
                ice.dom.insertAfter(h, d);
                e.setStart(d, 0);
                e.collapse(!0);
                this._ice.selection.addRange(e);
                for (var e = e.startContainer,
                i = null, h = null; a.firstChild;) if (a.firstChild.nodeType === 3 && !jQuery.trim(a.firstChild.nodeValue)) a.removeChild(a.firstChild);
                else if (ice.dom.isBlockElement(a.firstChild)) {
                    if (a.firstChild.textContent !== "") h = i = null, this._ice.isTracking ? (h = this._ice.createIceNode("insertType"), this._ice.addChange("insertType", [h]), g = document.createElement(a.firstChild.tagName), h.innerHTML = a.firstChild.innerHTML, g.appendChild(h)) : (h = g = document.createElement(a.firstChild.tagName), g.innerHTML = a.firstChild.innerHTML), ice.dom.insertBefore(e,
                    g);
                    a.removeChild(a.firstChild)
                } else i || (g = document.createElement(this._ice.blockEl), ice.dom.insertBefore(e, g), this._ice.isTracking ? (i = this._ice.createIceNode("insertType"), this._ice.addChange("insertType", [i]), g.appendChild(i)) : i = g), h = i, i.appendChild(a.removeChild(a.firstChild));
                d.textContent || d.parentNode.removeChild(d)
            } else if (this._ice.isTracking) g = this._ice.createIceNode("insertType", a), this._ice.addChange("insertType", [g]), e.insertNode(g), h = g;
            else for (; d = a.firstChild;) e.insertNode(d), e.setStartAfter(d),
            e.collapse(!0), h = d;
            this._ice.endBatchChange(b);
            this._cleanup(h)
        },
        createDiv: function (b) {
            var a = ice.dom.getId(b);
            if (a) return ice.dom.empty(a), a;
            a = this._ice.env.document.createElement("div");
            a.id = b;
            a.setAttribute("contentEditable", !0);
            ice.dom.setStyle(a, "width", "1px");
            ice.dom.setStyle(a, "height", "1px");
            ice.dom.setStyle(a, "overflow", "hidden");
            ice.dom.setStyle(a, "position", "fixed");
            ice.dom.setStyle(a, "top", "10px");
            ice.dom.setStyle(a, "left", "10px");
            document.body.appendChild(a);
            return a
        },
        handleCut: function () {
            this.cutElementId =
                "icecut";
            this.cutElement = this.createDiv(this.cutElementId);
            var b = this._ice.getCurrentRange();
            if (!b.collapsed) {
                var a = b.getHTMLContents();
                this._ice.isTracking ? this._ice.deleteContents() : b.deleteContents();
                var d = b.cloneRange();
                d.collapse(!0);
                this.cutElement.innerHTML = a;
                b.setStart(this.cutElement.firstChild, 0);
                b.setEndAfter(this.cutElement.lastChild, this.cutElement.lastChild.length);
                var e = this;
                setTimeout(function () {
                    b.setStart(d.startContainer, d.startOffset);
                    b.collapse(!0);
                    e._ice.env.selection.addRange(b);
                    ice.dom.remove(this.cutElement)
                }, 10)
            }
        },
        stripPaste: function (b) {
            b = this._cleanWordPaste(b);
            return b = this.cleanPreserved(b)
        },
        setupPreserved: function () {
            var b = this;
            this._tags = "";
            this._attributesMap = [];
            ice.dom.each(this.preserve.split(","), function (a, d) {
                d.match(/(\w+)(\[(.+)\])?/);
                var e = RegExp.$1,
                    g = RegExp.$3;
                b._tags && (b._tags += ",");
                b._tags += e.toLowerCase();
                b._attributesMap[e] = g.split("|")
            })
        },
        cleanPreserved: function (b) {
            var a = this,
                d = this._ice.env.document.createElement("div");
            d.innerHTML = b;
            d = ice.dom.stripEnclosingTags(d,
            this._tags);
            ice.dom.each(ice.dom.find(d, this._tags), function (b, d) {
                if (ice.dom.hasClass(d, "skip-clean")) return !0;
                var e = d.tagName.toLowerCase(),
                    e = a._attributesMap[e];
                if (e[0] && e[0] === "*") return !0;
                if (d.hasAttributes()) for (var i = d.attributes, b = i.length - 1; b >= 0; b--) ice.dom.inArray(i[b].name, e) || d.removeAttribute(i[b].name)
            });
            return d.innerHTML
        },
        _cleanWordPaste: function (b) {
            b = b.replace(/<(meta|link)[^>]+>/g, "");
            b = b.replace(/<\!--(.|\s)*?--\>/g, "");
            b = b.replace(/<style>[\s\S]*?<\/style>/g, "");
            b = b.replace(/<\/?\w+:[^>]*>/gi,
                "");
            b = b.replace(/<\\?\?xml[^>]*>/gi, "");
            b = this._cleanPaste(b);
            return b = b.replace(/<(\w[^>]*) (lang)=([^ |>]*)([^>]*)/gi, "<$1$4")
        },
        _getListType: function (b, a) {
            var d = ice.dom.getHtml(b),
                e = null;
            ice.dom.foreach(a, function (b) {
                ice.dom.foreach(a[b], function (h) {
                    ice.dom.foreach(a[b][h], function (i) {
                        if (RegExp(a[b][h][i]).test(d) === !0) return e = {
                            html: d.replace(RegExp(a[b][h][i]), ""),
                            listType: b,
                            listStyle: h
                        }, !1
                    });
                    if (e !== null) return !1
                });
                if (e !== null) return !1
            });
            return e
        },
        _cleanPaste: function (b) {
            b = b.replace(/<b(\s+|>)/g,
                "<strong$1");
            b = b.replace(/<\/b(\s+|>)/g, "</strong$1");
            b = b.replace(/<i(\s+|>)/g, "<em$1");
            return b = b.replace(/<\/i(\s+|>)/g, "</em$1")
        },
        _cleanup: function (b) {
            try {
                var b = b && b.lastChild || b || this._tmpNode,
                    a = this._ice.getCurrentRange();
                a.setStart(b, b.length);
                a.collapse(!0);
                this._ice.selection.addRange(a);
                this._ice.env.frame ? this._ice.env.frame.contentWindow.focus() : this._ice.element.focus();
                this._tmpNode.parentNode.removeChild(this._tmpNode);
                this._tmpNode = null;
                for (var d = this._ice.env.document.getElementsByClassName(this._ice.changeTypes.insertType.alias),
                b = 0; b < d.length; b++) d[b].textContent || d[b].parentNode && d[b].parentNode.removeChild(d[b])
            } catch (e) {
                window.console && console.error(e)
            }
        }
    };
    ice.dom.noInclusionInherits(e, ice.IcePlugin);
    this._plugin.IceCopyPastePlugin = e
}).call(this.ice);
(function () {
    var e = this.ice,
        b = function (a) {
            this._ice = a
        };
    b.prototype = {
        convert: function (a) {
            var b = this;
            try {
                b._ice.placeholdDeletes(), e.dom.each(a.getElementsByTagName(this._ice.blockEl), function (a, e) {
                    b._convertBlock(e)
                })
            } catch (f) {
                window.console && console.error(f)
            } finally {
                b._ice.revertDeletePlaceholders()
            }
        },
        _convertBlock: function (a) {
            if (!(e.dom.getNodeTextContent(a) < 2)) {
                var b, f, g, h, i, l = String.fromCharCode(8216),
                    t = String.fromCharCode(8217),
                    n = String.fromCharCode(8220),
                    s = String.fromCharCode(8221),
                    o = function (a) {
                        return a === String.fromCharCode(160) || a === String.fromCharCode(32)
                    }, k = function (a) {
                        return o(a) || a == null || a === ";" || a === ")" || a == "." || a === "!" || a === "," || a === "?" || a === ":"
                    }, r = function (a) {
                        return a === "'" || a === l || a === t
                    };
                h = e.dom.getHtml(a).match(/(<("[^"]*"|'[^']*'|[^'">])*>|&.*;|.)/g);
                i = function (a, b, d) {
                    var e = a.length,
                        f = d < 0 ? -1 : 1;
                    return function B(a, b, d) {
                        if (b < 0 || b >= e) return null;
                        var g = a[b + f];
                        return g && g.length == 1 && (d += f * -1, !d) ? g : B(a, b + f, d)
                    }(a, b, d)
                };
                e.dom.each(h, function (a, e) {
                    e == "&nbsp;" && (e = h[a] = " ");
                    if (e.length == 1) {
                        b = i(h,
                        a, -1);
                        f = e;
                        g = i(h, a, 1);
                        switch (f) {
                            case l:
                            case t:
                                f = "'";
                            case "'":
                                var v;
                                if (v = b == null || o(b)) if (v = /\d/.test(g)) v = /\d/.test(i(h, a, 2)) && k(i(h, a, 3));
                                v ? f = t : b == null || (o(b) || b === "(") && !o(g) ? f = l : g == null || !o(b) && k(g) ? f = t : /\w/.test(b) && /\w/.test(g) && (f = t);
                                break;
                            case n:
                            case s:
                                f = '"';
                            case '"':
                                if (k(g) && o(b) && r(i(h, a, -2))) f = s;
                                else if (b == null || (o(b) || b === "(") && !o(g)) f = n;
                                else if (g == null || !o(b) && k(g)) f = s;
                                else if ((b == null || o(b)) && o(g) && r(i(h, a, 1))) f = n
                        }
                        f != null && (h[a] = f)
                    }
                });
                e.dom.setHtml(a, h.join(""))
            }
        }
    };
    e.dom.noInclusionInherits(b,
    e.IcePlugin);
    this.ice._plugin.IceSmartQuotesPlugin = b
}).call(this);
(function () {
    var e = function (b) {
        this._ice = b
    };
    e.prototype = {
        keyDown: function (b) {
            if (ice.dom.isBrowser("mozilla")) {
                var a = parseInt(ice.dom.browser().version);
                if (a > 14 && b.keyCode === 173 || a <= 14 && b.keyCode === 109) return this.convertEmdash(b)
            } else if (b.keyCode === 189) return this.convertEmdash(b);
            return !0
        },
        convertEmdash: function () {
            var b = this._ice.getCurrentRange();
            if (b.collapsed) {
                try {
                    b.moveStart(ice.dom.CHARACTER_UNIT, -1);
                    var a = ice.dom.getParents(b.startContainer, this._ice.blockEl)[0],
                        d = ice.dom.getParents(b.endContainer,
                        this._ice.blockEl)[0];
                    if (a === d && !this._ice.getIceNode(b.startContainer, "deleteType") && (c = b.toHtml(), c === "-")) {
                        b.extractContents();
                        b.collapse();
                        var e = this._ice.env.document.createTextNode("\u2014");
                        this._ice.isTracking ? this._ice._insertNode(e, b) : (b.insertNode(e), b.setStart(e, 1), b.collapse(!0));
                        this._ice._preventKeyPress = !0;
                        return !1
                    }
                } catch (g) {}
                b.collapse()
            }
            return !0
        }
    };
    ice.dom.noInclusionInherits(e, ice.IcePlugin);
    this._plugin.IceEmdashPlugin = e
}).call(this.ice);