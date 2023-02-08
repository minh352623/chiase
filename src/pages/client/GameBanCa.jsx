import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../../filesGame/banca.css";

const GameBanCa = () => {
  useEffect(() => {
    (function (b) {
      function a(a, c, b) {
        for (
          var d = a.length,
            i = c.length,
            j,
            k,
            p,
            q,
            o,
            l = { x: 0, y: 0 },
            m = 0;
          m < d;
          m++
        ) {
          j = a[m];
          k = a[m < d - 1 ? m + 1 : 0];
          l.x = j.x - k.x;
          l.y = k.y - j.y;
          j = Math.sqrt(l.x * l.x + l.y * l.y);
          l.x /= j;
          l.y /= j;
          j = k = a[0].x * l.x + a[0].y * l.y;
          for (var n = 1; n < d; n++)
            (o = a[n].x * l.x + a[n].y * l.y),
              o > k ? (k = o) : o < j && (j = o);
          p = q = c[0].x * l.x + c[0].y * l.y;
          for (n = 1; n < i; n++)
            (o = c[n].x * l.x + c[n].y * l.y),
              o > q ? (q = o) : o < p && (p = o);
          j < p ? ((j = p - k), (l.x = -l.x), (l.y = -l.y)) : (j -= q);
          if (j >= 0) return !1;
          else if (j > b.overlap)
            (b.overlap = j), (b.normal.x = l.x), (b.normal.y = l.y);
        }
        return b;
      }
      var c = (b.Quark = b.Quark || { version: "1.0.0", global: b }),
        d = function () {};
      c.inherit = function (a, c) {
        d.prototype = c.prototype;
        a.superClass = c.prototype;
        a.prototype = new d();
        a.prototype.constructor = a;
      };
      c.merge = function (a, c, b) {
        for (var d in c)
          if (!b || a.hasOwnProperty(d) || a[d] !== void 0) a[d] = c[d];
        return a;
      };
      c.delegate = function (a, c) {
        var d = c || b;
        if (arguments.length > 2) {
          var g = Array.prototype.slice.call(arguments, 2);
          return function () {
            var c = Array.prototype.concat.apply(g, arguments);
            return a.apply(d, c);
          };
        } else
          return function () {
            return a.apply(d, arguments);
          };
      };
      c.getDOM = function (a) {
        return document.getElementById(a);
      };
      c.createDOM = function (a, c) {
        var b = document.createElement(a),
          d;
        for (d in c) {
          var i = c[d];
          if (d == "style") for (var j in i) b.style[j] = i[j];
          else b[d] = i;
        }
        return b;
      };
      c.use = function (a) {
        for (var a = a.split("."), c = b, d = 0; d < a.length; d++)
          var g = a[d], c = c[g] || (c[g] = {});
        return c;
      };
      (function (a) {
        var c = (a.ua = navigator.userAgent);
        a.isWebKit = /webkit/i.test(c);
        a.isMozilla = /mozilla/i.test(c);
        a.isIE = /msie/i.test(c);
        a.isFirefox = /firefox/i.test(c);
        a.isChrome = /chrome/i.test(c);
        a.isSafari = /safari/i.test(c) && this?.isChrome;
        a.isMobile = /mobile/i.test(c);
        a.isOpera = /opera/i.test(c);
        a.isIOS = /ios/i.test(c);
        a.isIpad = /ipad/i.test(c);
        a.isIpod = /ipod/i.test(c);
        a.isIphone = /iphone/i.test(c) && !this.isIpod;
        a.isAndroid = /android/i.test(c);
        a.supportStorage = "localStorage" in b;
        a.supportOrientation = "orientation" in b;
        a.supportDeviceMotion = "ondevicemotion" in b;
        a.supportTouch = "ontouchstart" in b;
        a.cssPrefix = a.isWebKit
          ? "webkit"
          : a.isFirefox
          ? "Moz"
          : a.isOpera
          ? "O"
          : a.isIE
          ? "ms"
          : "";
      })(c);
      c.getElementOffset = function (a) {
        for (
          var c = a.offsetLeft, b = a.offsetTop;
          (a = a.offsetParent) && a != document.body && a != document;

        )
          (c += a.offsetLeft), (b += a.offsetTop);
        return { left: c, top: b };
      };
      c.createDOMDrawable = function (a, b) {
        var d = a.tagName || "div",
          g = b.image,
          i = a.width || (g && g.width),
          j = a.height || (g && g.height),
          k = c.createDOM(d);
        if (a.id) k.id = a.id;
        k.style.position = "absolute";
        k.style.left = (a.left || 0) + "px";
        k.style.top = (a.top || 0) + "px";
        k.style.width = i + "px";
        k.style.height = j + "px";
        if (d == "canvas")
          (k.width = i),
            (k.height = j),
            g &&
              ((d = k.getContext("2d")),
              (i = b.rect || [0, 0, i, j]),
              d.drawImage(
                g,
                i[0],
                i[1],
                i[2],
                i[3],
                a.x || 0,
                a.y || 0,
                a.width || i[2],
                a.height || i[3]
              ));
        else if (
          ((k.style.opacity = a.alpha != void 0 ? a.alpha : 1),
          (k.style.overflow = "hidden"),
          g && g.src)
        )
          (k.style.backgroundImage = "url(" + g.src + ")"),
            (k.style.backgroundPosition =
              -(a.rectX || 0) + "px " + -(a.rectY || 0) + "px");
        return k;
      };
      c.DEG_TO_RAD = Math.PI / 180;
      c.RAD_TO_DEG = 180 / Math.PI;
      c.hitTestPoint = function (a, c, b, d) {
        var a = a.getBounds(),
          i = a.length,
          j = c >= a.x && c <= a.x + a.width && b >= a.y && b <= a.y + a.height;
        if (j && d) {
          for (var d = 0, j = !1, k, p, q, o, l = 0; l < i; l++) {
            var m = a[l],
              n = a[(l + 1) % i];
            if (
              m.y == n.y &&
              b == m.y &&
              (m.x > n.x ? ((k = n.x), (p = m.x)) : ((k = m.x), (p = n.x)),
              c >= k && c <= p)
            ) {
              j = !0;
              continue;
            }
            m.y > n.y ? ((q = n.y), (o = m.y)) : ((q = m.y), (o = n.y));
            b < q ||
              b > o ||
              ((m = ((b - m.y) * (n.x - m.x)) / (n.y - m.y) + m.x),
              m > c ? d++ : m == c && (j = !0));
          }
          if (j) return 0;
          else if (d % 2 == 1) return 1;
          return -1;
        }
        return j ? 1 : -1;
      };
      c.hitTestObject = function (a, b, d) {
        a = a.getBounds();
        b = b.getBounds();
        return (a =
          a.x <= b.x + b.width &&
          b.x <= a.x + a.width &&
          a.y <= b.y + b.height &&
          b.y <= a.y + a.height) && d
          ? ((a = c.polygonCollision(b, b)), a !== !1)
          : a;
      };
      c.polygonCollision = function (c, b) {
        var d = a(c, b, { overlap: -Infinity, normal: { x: 0, y: 0 } });
        return d ? a(b, c, d) : !1;
      };
      c.toString = function () {
        return "Quark";
      };
      c.trace = function () {
        var a = Array.prototype.slice.call(arguments);
        typeof console != "undefined" &&
          typeof console.log != "undefined" &&
          console.log(a.join(" "));
      };
      if (b.Q == void 0) b.Q = c;
      if (b.trace == void 0) b.trace = c.trace;
    })(window);
    (function () {
      var b = (Quark.Matrix = function (a, c, b, e, f, h) {
        this.a = a;
        this.b = c;
        this.c = b;
        this.d = e;
        this.tx = f;
        this.ty = h;
      });
      b.prototype.concat = function (a) {
        var c = this.a,
          b = this.c,
          e = this.tx;
        this.a = c * a.a + this.b * a.c;
        this.b = c * a.b + this.b * a.d;
        this.c = b * a.a + this.d * a.c;
        this.d = b * a.b + this.d * a.d;
        this.tx = e * a.a + this.ty * a.c + a.tx;
        this.ty = e * a.b + this.ty * a.d + a.ty;
        return this;
      };
      b.prototype.rotate = function (a) {
        var c = Math.cos(a),
          a = Math.sin(a),
          b = this.a,
          e = this.c,
          f = this.tx;
        this.a = b * c - this.b * a;
        this.b = b * a + this.b * c;
        this.c = e * c - this.d * a;
        this.d = e * a + this.d * c;
        this.tx = f * c - this.ty * a;
        this.ty = f * a + this.ty * c;
        return this;
      };
      b.prototype.scale = function (a, c) {
        this.a *= a;
        this.d *= c;
        this.tx *= a;
        this.ty *= c;
        return this;
      };
      b.prototype.translate = function (a, c) {
        this.tx += a;
        this.ty += c;
        return this;
      };
      b.prototype.identity = function () {
        this.a = this.d = 1;
        this.b = this.c = this.tx = this.ty = 0;
        return this;
      };
      b.prototype.invert = function () {
        var a = this.a,
          c = this.b,
          b = this.c,
          e = this.d,
          f = this.tx,
          h = a * e - c * b;
        this.a = e / h;
        this.b = -c / h;
        this.c = -b / h;
        this.d = a / h;
        this.tx = (b * this.ty - e * f) / h;
        this.ty = -(a * this.ty - c * f) / h;
        return this;
      };
      b.prototype.transformPoint = function (a, c, b) {
        var e = a.x * this.a + a.y * this.c + this.tx,
          f = a.x * this.b + a.y * this.d + this.ty;
        c && ((e = (e + 0.5) >> 0), (f = (f + 0.5) >> 0));
        if (b) return { x: e, y: f };
        a.x = e;
        a.y = f;
        return a;
      };
      b.prototype.clone = function () {
        return new b(this.a, this.b, this.c, this.d, this.tx, this.ty);
      };
      b.prototype.toString = function () {
        return (
          "(a=" +
          this.a +
          ", b=" +
          this.b +
          ", c=" +
          this.c +
          ", d=" +
          this.d +
          ", tx=" +
          this.tx +
          ", ty=" +
          this.ty +
          ")"
        );
      };
    })();
    (function () {
      var b = (Quark.Rectangle = function (a, c, b, e) {
        this.x = a;
        this.y = c;
        this.width = b;
        this.height = e;
      });
      b.prototype.intersects = function (a) {
        return (
          this.x <= a.x + a.width &&
          a.x <= this.x + this.width &&
          this.y <= a.y + a.height &&
          a.y <= this.y + this.height
        );
      };
      b.prototype.intersection = function (a) {
        var c = Math.max(this.x, a.x),
          d = Math.min(this.x + this.width, a.x + a.width);
        if (c <= d) {
          var e = Math.max(this.y, a.y),
            a = Math.min(this.y + this.height, a.y + a.height);
          if (e <= a) return new b(c, e, d - c, a - e);
        }
        return null;
      };
      b.prototype.union = function (a, c) {
        var d = Math.min(this.x, a.x),
          e = Math.min(this.y, a.y),
          f = Math.max(this.x + this.width, a.x + a.width) - d,
          h = Math.max(this.y + this.height, a.y + a.height) - e;
        if (c) return new b(d, e, f, h);
        else (this.x = d), (this.y = e), (this.width = f), (this.height = h);
      };
      b.prototype.containsPoint = function (a, c) {
        return (
          this.x <= a &&
          a <= this.x + this.width &&
          this.y <= c &&
          c <= this.y + this.height
        );
      };
      b.prototype.clone = function () {
        return new b(this.x, this.y, this.width, this.height);
      };
      b.prototype.toString = function () {
        return (
          "(x=" +
          this.x +
          ", y=" +
          this.y +
          ", width=" +
          this.width +
          ", height=" +
          this.height +
          ")"
        );
      };
    })();
    (function () {
      Quark.KEY = {
        MOUSE_LEFT: 1,
        MOUSE_MID: 2,
        MOUSE_RIGHT: 3,
        BACKSPACE: 8,
        TAB: 9,
        NUM_CENTER: 12,
        ENTER: 13,
        RETURN: 13,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAUSE: 19,
        CAPS_LOCK: 20,
        ESC: 27,
        ESCAPE: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        PRINT_SCREEN: 44,
        INSERT: 45,
        DELETE: 46,
        ZERO: 48,
        ONE: 49,
        TWO: 50,
        THREE: 51,
        FOUR: 52,
        FIVE: 53,
        SIX: 54,
        SEVEN: 55,
        EIGHT: 56,
        NINE: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        CONTEXT_MENU: 93,
        NUM_ZERO: 96,
        NUM_ONE: 97,
        NUM_TWO: 98,
        NUM_THREE: 99,
        NUM_FOUR: 100,
        NUM_FIVE: 101,
        NUM_SIX: 102,
        NUM_SEVEN: 103,
        NUM_EIGHT: 104,
        NUM_NINE: 105,
        NUM_MULTIPLY: 106,
        NUM_PLUS: 107,
        NUM_MINUS: 109,
        NUM_PERIOD: 110,
        NUM_DIVISION: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
      };
    })();
    (function () {
      var b = (Quark.EventManager = function () {
        this.keyState = {};
        this._evtHandlers = {};
      });
      b.prototype.registerStage = function (a, c, b, e) {
        this.register(a.context.canvas, c, { host: a, func: a._onEvent }, b, e);
      };
      b.prototype.unregisterStage = function (a, c) {
        this.unregister(a.context.canvas, c, a.onEvent);
      };
      b.prototype.register = function (a, c, b, e, f) {
        if (b == null || typeof b == "function") b = { host: null, func: b };
        for (
          var h = { prevent: e, stop: f },
            g = this,
            e = function (a) {
              g._onEvent(a, h, b);
            },
            f = 0;
          f < c.length;
          f++
        ) {
          for (
            var i = c[f],
              j = this._evtHandlers[i] || (this._evtHandlers[i] = []),
              k = 0,
              p = !1;
            k < j.length;
            k++
          ) {
            var q = j[k];
            if (q.target == a && q.callback.func == b.func) {
              trace("duplicate callback");
              p = !0;
              break;
            }
          }
          p ||
            (j.push({ target: a, callback: b, handler: e }),
            a.addEventListener(i, e, !1));
        }
      };
      b.prototype.unregister = function (a, c, b) {
        for (var e = 0; e < c.length; e++)
          for (
            var f = c[e], h = this._evtHandlers[f], g = 0;
            g < h.length;
            g++
          ) {
            var i = h[g];
            if (i.target == a && (i.callback.func == b || b == null)) {
              a.removeEventListener(f, i.handler);
              h.splice(g, 1);
              break;
            }
          }
      };
      b.prototype._onEvent = function (a, c, d) {
        var e = a,
          f = a.type;
        if (a.type.indexOf("touch") == 0)
          (e =
            a.touches && a.touches.length > 0
              ? a.touches[0]
              : a.changedTouches && a.changedTouches.length > 0
              ? a.changedTouches[0]
              : a),
            (e.type = f);
        if (f == "keydown" || f == "keyup" || f == "keypress")
          this.keyState[a.keyCode] = f;
        d.func != null && d.func.call(d.host, e);
        b.stop(a, !c.prevent, !c.stop);
      };
      b.stop = function (a, c, b) {
        c || a.preventDefault();
        b ||
          (a.stopPropagation(),
          a.stopImmediatePropagation && a.stopImmediatePropagation());
      };
    })();
    (function () {
      var b = (Quark.EventDispatcher = function () {
        this._eventMap = {};
      });
      b.prototype.addEventListener = function (a, c) {
        var b = this._eventMap[a];
        b == null && (b = this._eventMap[a] = []);
        return b.indexOf(c) == -1 ? (b.push(c), !0) : !1;
      };
      b.prototype.removeEventListener = function (a, c) {
        var b = this._eventMap[a];
        if (b == null) return !1;
        for (var e = 0; e < b.length; e++)
          if (b[e] === c)
            return (
              b.splice(e, 1), b.length == 0 && delete this._eventMap[a], !0
            );
        return !1;
      };
      b.prototype.removeEventListenerByType = function (a) {
        return this._eventMap[a] != null ? (delete this._eventMap[a], !0) : !1;
      };
      b.prototype.removeAllEventListeners = function () {
        this._eventMap = {};
      };
      b.prototype.dispatchEvent = function (a) {
        var c = this._eventMap[a.type];
        if (c == null) return !1;
        if (!a.target) a.target = this;
        for (var c = c.slice(), b = 0; b < c.length; b++) {
          var e = c[b];
          typeof e == "function" && e.call(this, a);
        }
        return !0;
      };
      b.prototype.hasEventListener = function (a) {
        a = this._eventMap[a];
        return a != null && a.length > 0;
      };
      b.prototype.on = b.prototype.addEventListener;
      b.prototype.un = b.prototype.removeEventListener;
      b.prototype.fire = b.prototype.dispatchEvent;
    })();
    (function () {
      var b = (Quark.UIDUtil = { _counter: 0 });
      b.createUID = function (a) {
        var c = a.charCodeAt(a.length - 1);
        c >= 48 && c <= 57 && (a += "_");
        return a + this._counter++;
      };
      b.displayObjectToString = function (a) {
        for (var c; a != null; a = a.parent) {
          var b = a.id != null ? a.id : a.name;
          c = c == null ? b : b + "." + c;
          if (a == a.parent) break;
        }
        return c;
      };
    })();
    (function () {
      function b(a, c) {
        for (var d = 0; d < a.children.length; d++) {
          var g = a.children[d];
          if (g.children) b(g, c);
          else if (c != null) {
            g = g.getBounds();
            c.globalAlpha = 0.2;
            c.beginPath();
            var i = g[0];
            c.moveTo(i.x - 0.5, i.y - 0.5);
            for (var j = 1; j < g.length; j++) {
              var k = g[j];
              c.lineTo(k.x - 0.5, k.y - 0.5);
            }
            c.lineTo(i.x - 0.5, i.y - 0.5);
            c.stroke();
            c.closePath();
            c.globalAlpha = 0.5;
            c.beginPath();
            c.rect(
              (g.x >> 0) - 0.5,
              (g.y >> 0) - 0.5,
              g.width >> 0,
              g.height >> 0
            );
            c.stroke();
            c.closePath();
          } else if (g.drawable.domDrawable)
            g.drawable.domDrawable.style.border = "1px solid #f00";
        }
      }
      Quark.getUrlParams = function () {
        var e;
        var a = {},
          c = window.location.href,
          b = c.indexOf("?");
        if (b > 0)
          for (var c = c.substring(b + 1).split("&"), b = 0, d; (d = c[b]); b++)
            (e = c[b] = d.split("=")),
              (d = e),
              (a[d[0]] = d.length > 1 ? d[1] : !0);
        return a;
      };
      var a = document.head,
        c = a.getElementsByTagName("meta"),
        d = c.length > 0 ? c[c.length - 1].nextSibling : a.childNodes[0];
      Quark.addMeta = function (c) {
        var b = document.createElement("meta"),
          h;
        for (h in c) b.setAttribute(h, c[h]);
        a.insertBefore(b, d);
      };
      Quark.toggleDebugRect = function (a) {
        a.debug = !a.debug;
        a._render = a.debug
          ? function (c) {
              c.clear != null && c.clear(0, 0, a.width, a.height);
              Quark.Stage.superClass._render.call(a, c);
              c = a.context.context;
              if (c != null)
                c.save(),
                  (c.lineWidth = 1),
                  (c.strokeStyle = "#f00"),
                  (c.globalAlpha = 0.5);
              b(a, c);
              c != null && c.restore();
            }
          : function (c) {
              c.clear != null && c.clear(0, 0, a.width, a.height);
              Quark.Stage.superClass._render.call(a, c);
            };
      };
    })();
    (function () {
      var b = (Quark.Timer = function (a) {
        this.interval = a || 50;
        this.paused = !1;
        this.info = {
          lastTime: 0,
          currentTime: 0,
          deltaTime: 0,
          realDeltaTime: 0,
        };
        this._startTime = 0;
        this._intervalID = null;
        this._listeners = [];
      });
      b.prototype.start = function () {
        if (this._intervalID == null) {
          this._startTime =
            this.info.lastTime =
            this.info.currentTime =
              Date.now();
          var a = this,
            c = function () {
              a._intervalID = setTimeout(c, a.interval);
              a._run();
            };
          c();
        }
      };
      b.prototype.stop = function () {
        clearTimeout(this._intervalID);
        this._intervalID = null;
        this._startTime = 0;
      };
      b.prototype.pause = function () {
        this.paused = !0;
      };
      b.prototype.resume = function () {
        this.paused = !1;
      };
      b.prototype._run = function () {
        if (!this.paused) {
          var a = this.info,
            c = (a.currentTime = Date.now());
          a.deltaTime = a.realDeltaTime = c - a.lastTime;
          for (var b = 0, e = this._listeners.length, f, h; b < e; b++)
            (f = this._listeners[b]),
              (h = f.__runTime || 0),
              h == 0
                ? f.step(this.info)
                : c > h &&
                  (f.step(this.info), this._listeners.splice(b, 1), b--, e--);
          a.lastTime = c;
        }
      };
      b.prototype.delay = function (a, c) {
        this.addListener({ step: a, __runTime: Date.now() + c });
      };
      b.prototype.addListener = function (a) {
        if (a == null || typeof a.step != "function")
          throw "Timer Error: The listener object must implement a step() method!";
        this._listeners.push(a);
      };
      b.prototype.removeListener = function (a) {
        a = this._listeners.indexOf(a);
        a > -1 && this._listeners.splice(a, 1);
      };
    })();
    (function () {
      var b = (Quark.ImageLoader = function (a) {
        b.superClass.constructor.call(this);
        this.loading = !1;
        this._index = -1;
        this._loaded = 0;
        this._images = {};
        this._totalSize = 0;
        this._loadHandler = Quark.delegate(this._loadHandler, this);
        this._addSource(a);
      });
      Quark.inherit(b, Quark.EventDispatcher);
      b.prototype.load = function (a) {
        this._addSource(a);
        this.loading || this._loadNext();
      };
      b.prototype._addSource = function (a) {
        if (a) {
          for (var a = a instanceof Array ? a : [a], c = 0; c < a.length; c++)
            this._totalSize += a[c].size || 0;
          this._source = this._source ? this._source.concat(a) : a;
        }
      };
      b.prototype._loadNext = function () {
        this._index++;
        if (this._index >= this._source.length)
          this.dispatchEvent({
            type: "complete",
            target: this,
            images: this._images,
          }),
            (this._source = []),
            (this.loading = !1),
            (this._index = -1);
        else {
          var a = new Image();
          a.onload = this._loadHandler;
          a.src = this._source[this._index].src;
          this.loading = !0;
        }
      };
      b.prototype._loadHandler = function (a) {
        this._loaded++;
        var c = this._source[this._index];
        c.image = a.target;
        this._images[c.id || c.src] = c;
        this.dispatchEvent({ type: "loaded", target: this, image: c });
        this._loadNext();
      };
      b.prototype.getLoaded = function () {
        return this._loaded;
      };
      b.prototype.getTotal = function () {
        return this._source.length;
      };
      b.prototype.getLoadedSize = function () {
        var a = 0,
          c;
        for (c in this._images) a += this._images[c].size || 0;
        return a;
      };
      b.prototype.getTotalSize = function () {
        return this._totalSize;
      };
    })();
    (function () {
      var b = (Quark.Tween = function (c, b, e) {
        this.target = c;
        this.delay = this.time = 0;
        this.reverse = this.loop = this.paused = !1;
        this.interval = 0;
        this.ease = a.Linear.EaseNone;
        this.onComplete = this.onUpdate = this.onStart = this.next = null;
        this._oldProps = {};
        this._newProps = {};
        this._deltaProps = {};
        this._lastTime = this._startTime = 0;
        this._reverseFlag = 1;
        this._frameCount = this._frameTotal = 0;
        for (var f in b) {
          var h = c[f],
            g = b[f];
          h !== void 0 &&
            typeof h == "number" &&
            typeof g == "number" &&
            ((this._oldProps[f] = h),
            (this._newProps[f] = g),
            (this._deltaProps[f] = g - h));
        }
        for (f in e) this[f] = e[f];
      });
      b.prototype.setProps = function (a, b) {
        for (var e in a) this.target[e] = this._oldProps[e] = a[e];
        for (e in b)
          (this._newProps[e] = b[e]),
            (this._deltaProps[e] = b[e] - this.target[e]);
      };
      b.prototype._init = function () {
        this._startTime = Date.now() + this.delay;
        if (this.interval > 0)
          this._frameTotal = Math.round(this.time / this.interval);
        b.add(this);
      };
      b.prototype.start = function () {
        this._init();
        this.paused = !1;
      };
      b.prototype.stop = function () {
        this.paused = !0;
        b.remove(this);
      };
      b.prototype.pause = function () {
        this.paused = !0;
      };
      b.prototype._update = function () {
        if (!this.paused) {
          var a = Date.now(),
            d = a - this._startTime;
          if (!(d < 0)) {
            if (this._lastTime == 0 && this.onStart != null) this.onStart(this);
            this._lastTime = a;
            a =
              this._frameTotal > 0
                ? ++this._frameCount / this._frameTotal
                : d / this.time;
            a > 1 && (a = 1);
            var d = this.ease(a),
              e;
            for (e in this._oldProps)
              this.target[e] =
                this._oldProps[e] + this._deltaProps[e] * this._reverseFlag * d;
            if (this.onUpdate != null) this.onUpdate(this, d);
            if (a >= 1) {
              if (this.reverse) {
                if (
                  ((e = this._oldProps),
                  (this._oldProps = this._newProps),
                  (this._newProps = e),
                  (this._startTime = Date.now()),
                  (this._frameCount = 0),
                  (this._reverseFlag *= -1),
                  !this.loop)
                )
                  this.reverse = !1;
              } else if (this.loop) {
                for (e in this._oldProps) this.target[e] = this._oldProps[e];
                this._startTime = Date.now();
                this._frameCount = 0;
              } else if (
                (b.remove(this),
                (e = this.next),
                e != null &&
                  (e instanceof b ? ((a = e), (e = null)) : (a = e.shift()),
                  a != null))
              )
                (a.next = e), a.start();
              if (this.onComplete != null) this.onComplete(this);
            }
          }
        }
      };
      b._tweens = [];
      b.step = function () {
        for (var a = this._tweens, b = a.length; --b >= 0; ) a[b]._update();
      };
      b.add = function (a) {
        this._tweens.indexOf(a) == -1 && this._tweens.push(a);
        return this;
      };
      b.remove = function (a) {
        var b = this._tweens,
          a = b.indexOf(a);
        a > -1 && b.splice(a, 1);
        return this;
      };
      b.to = function (a, d, e) {
        a = new b(a, d, e);
        a._init();
        return a;
      };
      b.from = function (a, d, e) {
        d = new b(a, d, e);
        e = d._oldProps;
        d._oldProps = d._newProps;
        d._newProps = e;
        d._reverseFlag = -1;
        for (var f in d._oldProps) a[f] = d._oldProps[f];
        d._init();
        return d;
      };
      var a = (Quark.Easing = {
        Linear: {},
        Quadratic: {},
        Cubic: {},
        Quartic: {},
        Quintic: {},
        Sinusoidal: {},
        Exponential: {},
        Circular: {},
        Elastic: {},
        Back: {},
        Bounce: {},
      });
      a.Linear.EaseNone = function (a) {
        return a;
      };
      a.Quadratic.EaseIn = function (a) {
        return a * a;
      };
      a.Quadratic.EaseOut = function (a) {
        return -a * (a - 2);
      };
      a.Quadratic.EaseInOut = function (a) {
        return (a *= 2) < 1 ? 0.5 * a * a : -0.5 * (--a * (a - 2) - 1);
      };
      a.Cubic.EaseIn = function (a) {
        return a * a * a;
      };
      a.Cubic.EaseOut = function (a) {
        return --a * a * a + 1;
      };
      a.Cubic.EaseInOut = function (a) {
        return (a *= 2) < 1 ? 0.5 * a * a * a : 0.5 * ((a -= 2) * a * a + 2);
      };
      a.Quartic.EaseIn = function (a) {
        return a * a * a * a;
      };
      a.Quartic.EaseOut = function (a) {
        return -(--a * a * a * a - 1);
      };
      a.Quartic.EaseInOut = function (a) {
        return (a *= 2) < 1
          ? 0.5 * a * a * a * a
          : -0.5 * ((a -= 2) * a * a * a - 2);
      };
      a.Quintic.EaseIn = function (a) {
        return a * a * a * a * a;
      };
      a.Quintic.EaseOut = function (a) {
        return (a -= 1) * a * a * a * a + 1;
      };
      a.Quintic.EaseInOut = function (a) {
        return (a *= 2) < 1
          ? 0.5 * a * a * a * a * a
          : 0.5 * ((a -= 2) * a * a * a * a + 2);
      };
      a.Sinusoidal.EaseIn = function (a) {
        return -Math.cos((a * Math.PI) / 2) + 1;
      };
      a.Sinusoidal.EaseOut = function (a) {
        return Math.sin((a * Math.PI) / 2);
      };
      a.Sinusoidal.EaseInOut = function (a) {
        return -0.5 * (Math.cos(Math.PI * a) - 1);
      };
      a.Exponential.EaseIn = function (a) {
        return a == 0 ? 0 : Math.pow(2, 10 * (a - 1));
      };
      a.Exponential.EaseOut = function (a) {
        return a == 1 ? 1 : -Math.pow(2, -10 * a) + 1;
      };
      a.Exponential.EaseInOut = function (a) {
        return a == 0
          ? 0
          : a == 1
          ? 1
          : (a *= 2) < 1
          ? 0.5 * Math.pow(2, 10 * (a - 1))
          : 0.5 * (-Math.pow(2, -10 * (a - 1)) + 2);
      };
      a.Circular.EaseIn = function (a) {
        return -(Math.sqrt(1 - a * a) - 1);
      };
      a.Circular.EaseOut = function (a) {
        return Math.sqrt(1 - --a * a);
      };
      a.Circular.EaseInOut = function (a) {
        return (a /= 0.5) < 1
          ? -0.5 * (Math.sqrt(1 - a * a) - 1)
          : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
      };
      a.Elastic.EaseIn = function (a) {
        var b,
          e = 0.1,
          f = 0.4;
        if (a == 0) return 0;
        else if (a == 1) return 1;
        else f || (f = 0.3);
        !e || e < 1
          ? ((e = 1), (b = f / 4))
          : (b = (f / (2 * Math.PI)) * Math.asin(1 / e));
        return -(
          e *
          Math.pow(2, 10 * (a -= 1)) *
          Math.sin(((a - b) * 2 * Math.PI) / f)
        );
      };
      a.Elastic.EaseOut = function (a) {
        var b,
          e = 0.1,
          f = 0.4;
        if (a == 0) return 0;
        else if (a == 1) return 1;
        else f || (f = 0.3);
        !e || e < 1
          ? ((e = 1), (b = f / 4))
          : (b = (f / (2 * Math.PI)) * Math.asin(1 / e));
        return (
          e * Math.pow(2, -10 * a) * Math.sin(((a - b) * 2 * Math.PI) / f) + 1
        );
      };
      a.Elastic.EaseInOut = function (a) {
        var b,
          e = 0.1,
          f = 0.4;
        if (a == 0) return 0;
        else if (a == 1) return 1;
        else f || (f = 0.3);
        !e || e < 1
          ? ((e = 1), (b = f / 4))
          : (b = (f / (2 * Math.PI)) * Math.asin(1 / e));
        return (a *= 2) < 1
          ? -0.5 *
              e *
              Math.pow(2, 10 * (a -= 1)) *
              Math.sin(((a - b) * 2 * Math.PI) / f)
          : e *
              Math.pow(2, -10 * (a -= 1)) *
              Math.sin(((a - b) * 2 * Math.PI) / f) *
              0.5 +
              1;
      };
      a.Back.EaseIn = function (a) {
        return a * a * (2.70158 * a - 1.70158);
      };
      a.Back.EaseOut = function (a) {
        return (a -= 1) * a * (2.70158 * a + 1.70158) + 1;
      };
      a.Back.EaseInOut = function (a) {
        return (a *= 2) < 1
          ? 0.5 * a * a * (3.5949095 * a - 2.5949095)
          : 0.5 * ((a -= 2) * a * (3.5949095 * a + 2.5949095) + 2);
      };
      a.Bounce.EaseIn = function (c) {
        return 1 - a.Bounce.EaseOut(1 - c);
      };
      a.Bounce.EaseOut = function (a) {
        return (a /= 1) < 1 / 2.75
          ? 7.5625 * a * a
          : a < 2 / 2.75
          ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75
          : a < 2.5 / 2.75
          ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375
          : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
      };
      a.Bounce.EaseInOut = function (b) {
        return b < 0.5
          ? a.Bounce.EaseIn(b * 2) * 0.5
          : a.Bounce.EaseOut(b * 2 - 1) * 0.5 + 0.5;
      };
    })();
    (function () {
      var b = (Quark.Audio = function (a, c, d, e) {
        b.superClass.constructor.call(this);
        this.src = a;
        this.autoPlay = c && d;
        this.loop = e;
        this._playing = this._loaded = !1;
        this._evtHandler = Quark.delegate(this._evtHandler, this);
        this._element = document.createElement("audio");
        this._element.preload = c;
        this._element.src = a;
        c && this.load();
      });
      Quark.inherit(b, Quark.EventDispatcher);
      b.prototype.load = function () {
        this._element.addEventListener("progress", this._evtHandler, !1);
        this._element.addEventListener("ended", this._evtHandler, !1);
        this._element.addEventListener("error", this._evtHandler, !1);
        try {
          this._element.load();
        } catch (a) {
          trace(a);
        }
      };
      b.prototype._evtHandler = function (a) {
        if (a.type == "progress") {
          var b = 0,
            d = 0,
            e = a.target.buffered;
          if (e && e.length > 0)
            for (b = e.length; b >= 0; b--) d = e.end(b) - e.start(b);
          if (d / a.target.duration >= 1)
            this._element.removeEventListener("progress", this._evtHandler),
              this._element.removeEventListener("error", this._evtHandler),
              (this._loaded = !0),
              this.dispatchEvent({ type: "loaded", target: this }),
              this.autoPlay && this.play();
        } else
          a.type == "ended"
            ? (this.dispatchEvent({ type: "ended", target: this }),
              this.loop ? this.play() : (this._playing = !1))
            : a.type == "error" && trace("Quark.Audio Error: " + a.target.src);
      };
      b.prototype.play = function () {
        this._loaded
          ? (this._element.play(), (this._playing = !0))
          : ((this.autoPlay = !0), this.load());
      };
      b.prototype.stop = function () {
        if (this._playing) this._element.pause(), (this._playing = !1);
      };
      b.prototype.loaded = function () {
        return this._loaded;
      };
      b.prototype.playing = function () {
        return this._playing;
      };
    })();
    (function () {
      var b = (Quark.Drawable = function (a, b) {
        this.domDrawable = this.rawDrawable = null;
        this.set(a, b);
      });
      b.prototype.get = function (a, b) {
        if (b == null || b.canvas.getContext != null) return this.rawDrawable;
        else {
          if (this.domDrawable == null)
            this.domDrawable = Quark.createDOMDrawable(a, {
              image: this.rawDrawable,
            });
          return this.domDrawable;
        }
      };
      b.prototype.set = function (a, b) {
        if (
          a instanceof HTMLImageElement ||
          a instanceof HTMLCanvasElement ||
          a instanceof HTMLVideoElement
        )
          this.rawDrawable = a;
        if (b === !0) this.domDrawable = a;
        else if (this.domDrawable)
          this.domDrawable.style.backgroundImage =
            "url(" + this.rawDrawable.src + ")";
      };
    })();
    (function () {
      var b = (Quark.DisplayObject = function (a) {
        this.id = Quark.UIDUtil.createUID("DisplayObject");
        this.name = null;
        this.height = this.width = this.regY = this.regX = this.y = this.x = 0;
        this.scaleY = this.scaleX = this.alpha = 1;
        this.rotation = 0;
        this.transformEnabled = this.eventEnabled = this.visible = !0;
        this.useHandCursor = !1;
        this.context = this.parent = this.drawable = this.polyArea = null;
        this._depth = 0;
        this._lastState = {};
        this._stateList = [
          "x",
          "y",
          "regX",
          "regY",
          "width",
          "height",
          "alpha",
          "scaleX",
          "scaleY",
          "rotation",
          "visible",
          "_depth",
        ];
        Quark.merge(this, a, !0);
        a.mixin && Quark.merge(this, a.mixin, !1);
      });
      b.prototype.setDrawable = function (a) {
        this.drawable == null
          ? (this.drawable = new Quark.Drawable(a))
          : this.drawable.rawDrawable != a && this.drawable.set(a);
      };
      b.prototype.getDrawable = function (a) {
        return this.drawable && this.drawable.get(this, a);
      };
      b.prototype._update = function (a) {
        this.update(a);
      };
      b.prototype.update = function () {};
      b.prototype._render = function (a) {
        a = this.context || a;
        !this.visible || this.alpha <= 0
          ? (a.hide != null && a.hide(this),
            this.saveState(["visible", "alpha"]))
          : (a.startDraw(),
            a.transform(this),
            this.render(a),
            a.endDraw(),
            this.saveState());
      };
      b.prototype.render = function (a) {
        a.draw(
          this,
          0,
          0,
          this.width,
          this.height,
          0,
          0,
          this.width,
          this.height
        );
      };
      b.prototype._onEvent = function (a) {
        if (this.onEvent != null) this.onEvent(a);
      };
      b.prototype.onEvent = null;
      b.prototype.saveState = function (a) {
        for (
          var a = a || this._stateList,
            b = this._lastState,
            d = 0,
            e = a.length;
          d < e;
          d++
        ) {
          var f = a[d];
          b["last" + f] = this[f];
        }
      };
      b.prototype.getState = function (a) {
        return this._lastState["last" + a];
      };
      b.prototype.propChanged = function () {
        for (
          var a = arguments.length > 0 ? arguments : this._stateList,
            b = 0,
            d = a.length;
          b < d;
          b++
        ) {
          var e = a[b];
          if (this._lastState["last" + e] != this[e]) return !0;
        }
        return !1;
      };
      b.prototype.hitTestPoint = function (a, b, d) {
        return Quark.hitTestPoint(this, a, b, d);
      };
      b.prototype.hitTestObject = function (a, b) {
        return Quark.hitTestObject(this, a, b);
      };
      b.prototype.localToGlobal = function (a, b) {
        var d = this.getConcatenatedMatrix();
        return { x: d.tx + a, y: d.ty + b };
      };
      b.prototype.globalToLocal = function (a, b) {
        var d = this.getConcatenatedMatrix().invert();
        return { x: d.tx + a, y: d.ty + b };
      };
      b.prototype.localToTarget = function (a, b, d) {
        a = this.localToGlobal(a, b);
        return d.globalToLocal(a.x, a.y);
      };
      b.prototype.getConcatenatedMatrix = function (a) {
        var b = new Quark.Matrix(1, 0, 0, 1, 0, 0);
        if (a == this) return b;
        for (var d = this; d.parent != null && d.parent != a; d = d.parent) {
          var e = 1,
            f = 0;
          d.rotation % 360 != 0 &&
            ((f = d.rotation * Quark.DEG_TO_RAD),
            (e = Math.cos(f)),
            (f = Math.sin(f)));
          d.regX != 0 && (b.tx -= d.regX);
          d.regY != 0 && (b.ty -= d.regY);
          b.concat(
            new Quark.Matrix(
              e * d.scaleX,
              f * d.scaleX,
              -f * d.scaleY,
              e * d.scaleY,
              d.x,
              d.y
            )
          );
        }
        return b;
      };
      b.prototype.getBounds = function () {
        var a = this.width,
          b = this.height,
          d = this.getConcatenatedMatrix(),
          a = this.polyArea || [
            { x: 0, y: 0 },
            { x: a, y: 0 },
            { x: a, y: b },
            { x: 0, y: b },
          ],
          b = [],
          e = a.length,
          f,
          h,
          g,
          i,
          j;
        f = d.transformPoint(a[0], !0, !0);
        h = g = f.x;
        i = j = f.y;
        b[0] = f;
        for (var k = 1; k < e; k++) {
          f = d.transformPoint(a[k], !0, !0);
          if (h > f.x) h = f.x;
          else if (g < f.x) g = f.x;
          if (i > f.y) i = f.y;
          else if (j < f.y) j = f.y;
          b[k] = f;
        }
        b.x = h;
        b.y = i;
        b.width = g - h;
        b.height = j - i;
        return b;
      };
      b.prototype.getCurrentWidth = function () {
        return Math.abs(this.width * this.scaleX);
      };
      b.prototype.getCurrentHeight = function () {
        return Math.abs(this.height * this.scaleY);
      };
      b.prototype.getStage = function () {
        for (var a = this; a.parent; ) a = a.parent;
        return a instanceof Quark.Stage ? a : null;
      };
      b.prototype.toString = function () {
        return Quark.UIDUtil.displayObjectToString(this);
      };
    })();
    (function () {
      var b = (Quark.DisplayObjectContainer = function (a) {
        this.eventChildren = !0;
        this.autoSize = !1;
        a = a || {};
        b.superClass.constructor.call(this, a);
        this.id = a.id || Quark.UIDUtil.createUID("DisplayObjectContainer");
        this.setDrawable(a.drawable || a.image || null);
        this.children = [];
        if (a.children)
          for (var c = 0; c < a.children.length; c++)
            this.addChild(a.children[c]);
      });
      Quark.inherit(b, Quark.DisplayObject);
      b.prototype.addChildAt = function (a, b) {
        if (b < 0) b = 0;
        else if (b > this.children.length) b = this.children.length;
        var d = this.getChildIndex(a);
        if (d != -1) {
          if (d == b) return this;
          this.children.splice(d, 1);
        } else a.parent && a.parent.removeChild(a);
        this.children.splice(b, 0, a);
        a.parent = this;
        if (this.autoSize) {
          var d = new Quark.Rectangle(
              0,
              0,
              this.rectWidth || this.width,
              this.rectHeight || this.height
            ),
            e = new Quark.Rectangle(
              a.x,
              a.y,
              a.rectWidth || a.width,
              a.rectHeight || a.height
            );
          d.union(e);
          this.width = d.width;
          this.height = d.height;
        }
        return this;
      };
      b.prototype.addChild = function (a) {
        for (var b = this.children.length, d = 0; d < arguments.length; d++)
          (a = arguments[d]), this.addChildAt(a, b + d);
        return this;
      };
      b.prototype.removeChildAt = function (a) {
        if (a < 0 || a >= this.children.length) return !1;
        var b = this.children[a];
        if (b != null) this.getStage().context.remove(b), (b.parent = null);
        this.children.splice(a, 1);
        return !0;
      };
      b.prototype.removeChild = function (a) {
        return this.removeChildAt(this.children.indexOf(a));
      };
      b.prototype.removeAllChildren = function () {
        for (; this.children.length > 0; ) this.removeChildAt(0);
      };
      b.prototype.getChildAt = function (a) {
        return a < 0 || a >= this.children.length ? null : this.children[a];
      };
      b.prototype.getChildIndex = function (a) {
        return this.children.indexOf(a);
      };
      b.prototype.setChildIndex = function (a, b) {
        if (a.parent == this) {
          var d = this.children.indexOf(a);
          b != d && (this.children.splice(d, 1), this.children.splice(b, 0, a));
        }
      };
      b.prototype.swapChildren = function (a, b) {
        var d = this.getChildIndex(a),
          e = this.getChildIndex(b);
        this.children[d] = b;
        this.children[e] = a;
      };
      b.prototype.swapChildrenAt = function (a, b) {
        var d = this.getChildAt(a),
          e = this.getChildAt(b);
        this.children[a] = e;
        this.children[b] = d;
      };
      b.prototype.contains = function (a) {
        return this.getChildIndex(a) != -1;
      };
      b.prototype.getNumChildren = function () {
        return this.children.length;
      };
      b.prototype._update = function (a) {
        this.update != null && this.update(a);
        for (var b = this.children.slice(0), d = 0, e = b.length; d < e; d++) {
          var f = b[d];
          f._depth = d + 1;
          f._update(a);
        }
      };
      b.prototype.render = function (a) {
        b.superClass.render.call(this, a);
        for (var c = 0, d = this.children.length; c < d; c++)
          this.children[c]._render(a);
      };
      b.prototype.getObjectUnderPoint = function (a, b, d, e) {
        if (e) var f = [];
        for (var h = this.children.length - 1; h >= 0; h--) {
          var g = this.children[h];
          if (
            !(
              g == null ||
              (!g.eventEnabled && g.children == void 0) ||
              !g.visible ||
              g.alpha <= 0
            )
          )
            if (
              g.children != void 0 &&
              g.eventChildren &&
              g.getNumChildren() > 0
            ) {
              var i = g.getObjectUnderPoint(a, b, d, e);
              if (i)
                if (e) i.length > 0 && (f = f.concat(i));
                else return i;
              else if (g.hitTestPoint(a, b, d) >= 0)
                if (e) f.push(g);
                else return g;
            } else if (g.hitTestPoint(a, b, d) >= 0)
              if (e) f.push(g);
              else return g;
        }
        return e ? f : null;
      };
    })();
    (function () {
      var b = (Quark.Stage = function (a) {
        this.stageY = this.stageX = 0;
        this.paused = !1;
        this._eventTarget = null;
        a = a || {};
        b.superClass.constructor.call(this, a);
        this.id = a.id || Quark.UIDUtil.createUID("Stage");
        if (this.context == null)
          throw "Quark.Stage Error: context is required.";
        this.updatePosition();
      });
      Quark.inherit(b, Quark.DisplayObjectContainer);
      b.prototype.step = function (a) {
        this.paused || (this._update(a), this._render(this.context));
      };
      b.prototype._update = function (a) {
        for (var b = this.children.slice(0), d = 0, e = b.length; d < e; d++) {
          var f = b[d];
          f._depth = d;
          f._update(a);
        }
        this.update != null && this.update(a);
      };
      b.prototype._render = function (a) {
        a.clear != null && a.clear(0, 0, this.width, this.height);
        b.superClass._render.call(this, a);
      };
      b.prototype._onEvent = function (a) {
        var b = a.pageX - this.stageX,
          d = a.pageY - this.stageY,
          e = this._eventTarget,
          f = this.getObjectUnderPoint(b, d, !0);
        a.eventX = b;
        a.eventY = d;
        if (e != null && e != f)
          (a.lastEventTarget = e),
            (b =
              a.type == "mousemove"
                ? "mouseout"
                : a.type == "touchmove"
                ? "touchout"
                : null) && e._onEvent({ type: b }),
            (this._eventTarget = null);
        if (f != null && f.eventEnabled)
          (a.eventTarget = e = this._eventTarget = f), f._onEvent(a);
        if (!Quark.supportTouch)
          this.context.canvas.style.cursor =
            e && e.useHandCursor && e.eventEnabled ? "pointer" : "";
        if (this.onEvent != null) this.onEvent(a);
      };
      b.prototype.updatePosition = function () {
        var a = Quark.getElementOffset(this.context.canvas);
        this.stageX = a.left;
        this.stageY = a.top;
      };
    })();
    (function () {
      var b = (Quark.Bitmap = function (a) {
        this.image = null;
        this.rectHeight = this.rectWidth = this.rectY = this.rectX = 0;
        a = a || {};
        b.superClass.constructor.call(this, a);
        this.id = a.id || Quark.UIDUtil.createUID("Bitmap");
        this.setRect(a.rect || [0, 0, this.image.width, this.image.height]);
        this.setDrawable(this.image);
        this._stateList.push("rectX", "rectY", "rectWidth", "rectHeight");
      });
      Quark.inherit(b, Quark.DisplayObject);
      b.prototype.setRect = function (a) {
        this.rectX = a[0];
        this.rectY = a[1];
        this.rectWidth = this.width = a[2];
        this.rectHeight = this.height = a[3];
      };
      b.prototype.render = function (a) {
        a.draw(
          this,
          this.rectX,
          this.rectY,
          this.rectWidth,
          this.rectHeight,
          0,
          0,
          this.width,
          this.height
        );
      };
    })();
    (function () {
      var b = (Quark.MovieClip = function (a) {
        this.interval = 0;
        this.useFrames = this.paused = !1;
        this.currentFrame = 0;
        this._frames = [];
        this._frameLabels = {};
        this._frameDisObj = null;
        this._displayedCount = 0;
        a = a || {};
        b.superClass.constructor.call(this, a);
        this.id = a.id || Quark.UIDUtil.createUID("MovieClip");
        a.frames && this.addFrame(a.frames);
      });
      Quark.inherit(b, Quark.Bitmap);
      b.prototype.addFrame = function (a) {
        var b = this._frames.length;
        if (a instanceof Array)
          for (var d = 0; d < a.length; d++) this.setFrame(a[d], b + d);
        else this.setFrame(a, b);
        return this;
      };
      b.prototype.setFrame = function (a, b) {
        b == void 0 || b > this._frames.length
          ? (b = this._frames.length)
          : b < 0 && (b = 0);
        this._frames[b] = a;
        a.label && (this._frameLabels[a.label] = a);
        if (a.interval == void 0) a.interval = this.interval;
        b == 0 && this.currentFrame == 0 && this.setRect(a.rect);
      };
      b.prototype.getFrame = function (a) {
        return typeof a == "number" ? this._frames[a] : this._frameLabels[a];
      };
      b.prototype.play = function () {
        this.paused = !1;
      };
      b.prototype.stop = function () {
        this.paused = !0;
      };
      b.prototype.gotoAndStop = function (a) {
        this.currentFrame = this.getFrameIndex(a);
        this.paused = !0;
      };
      b.prototype.gotoAndPlay = function (a) {
        this.currentFrame = this.getFrameIndex(a);
        this.paused = !1;
      };
      b.prototype.getFrameIndex = function (a) {
        if (typeof a == "number") return a;
        for (
          var a = this._frameLabels[a], b = this._frames, d = 0;
          d < b.length;
          d++
        )
          if (a == b[d]) return d;
        return -1;
      };
      b.prototype.nextFrame = function (a) {
        var b = this._frames[this.currentFrame];
        if (b.interval > 0)
          (a = this._displayedCount + a),
            (this._displayedCount = b.interval > a ? a : 0);
        if (b.jump >= 0 || typeof b.jump == "string")
          if (this._displayedCount == 0 || !b.interval)
            return (this.currentFrame = this.getFrameIndex(b.jump));
        return b.interval > 0 && this._displayedCount > 0
          ? this.currentFrame
          : this.currentFrame >= this._frames.length - 1
          ? (this.currentFrame = 0)
          : ++this.currentFrame;
      };
      b.prototype._update = function (a) {
        var c = this._frames[this.currentFrame];
        c.stop
          ? this.stop()
          : (this.paused ||
              this.nextFrame(this.useFrames ? 1 : a && a.deltaTime),
            this.setRect(c.rect),
            b.superClass._update.call(this, a));
      };
      b.prototype.render = function (a) {
        var b = this._frames[this.currentFrame].rect;
        a.draw(this, b[0], b[1], b[2], b[3], 0, 0, this.width, this.height);
      };
    })();
    (function () {
      var b = (Quark.Button = function (a) {
        this.state = b.UP;
        this.enabled = !0;
        a = a || {};
        b.superClass.constructor.call(this, a);
        this.id = a.id || Quark.UIDUtil.createUID("Button");
        this._skin = new Quark.MovieClip({ id: "skin", image: a.image });
        this.addChild(this._skin);
        this._skin.stop();
        this.eventChildren = !1;
        if (a.useHandCursor === void 0) this.useHandCursor = !0;
        a.up && this.setUpState(a.up);
        a.over && this.setOverState(a.over);
        a.down && this.setDownState(a.down);
        a.disabled && this.setDisabledState(a.disabled);
      });
      Quark.inherit(b, Quark.DisplayObjectContainer);
      b.UP = "up";
      b.OVER = "over";
      b.DOWN = "down";
      b.DISABLED = "disabled";
      b.prototype.setUpState = function (a) {
        a.label = b.UP;
        this._skin.setFrame(a, 0);
        this.upState = a;
        return this;
      };
      b.prototype.setOverState = function (a) {
        a.label = b.OVER;
        this._skin.setFrame(a, 1);
        this.overState = a;
        return this;
      };
      b.prototype.setDownState = function (a) {
        a.label = b.DOWN;
        this._skin.setFrame(a, 2);
        this.downState = a;
        return this;
      };
      b.prototype.setDisabledState = function (a) {
        a.label = b.DISABLED;
        this._skin.setFrame(a, 3);
        this.disabledState = a;
        return this;
      };
      b.prototype.setEnabled = function (a) {
        if (this.enabled == a) return this;
        (this.eventEnabled = this.enabled = a)
          ? this.currentFrame == 3 && this._skin.gotoAndStop(b.UP)
          : this.disabledState
          ? this._skin.gotoAndStop(b.DISABLED)
          : this._skin.gotoAndStop(b.state.UP);
        return this;
      };
      b.prototype.changeState = function (a) {
        if (this.state != a) {
          this.state = a;
          switch (a) {
            case b.OVER:
            case b.DOWN:
            case b.UP:
              if (!this.enabled) this.eventEnabled = this.enabled = !0;
              this._skin.gotoAndStop(a);
              break;
            case b.DISABLED:
              this.setEnabled(!1);
          }
          return this;
        }
      };
      b.prototype._onEvent = function (a) {
        if (this.enabled) {
          switch (a.type) {
            case "mousemove":
              this.overState && this.changeState(b.OVER);
              break;
            case "mousedown":
            case "touchstart":
            case "touchmove":
              this.downState && this.changeState(b.DOWN);
              break;
            case "mouseup":
              this.overState
                ? this.changeState(b.OVER)
                : this.changeState(b.UP);
              break;
            case "mouseout":
            case "touchout":
            case "touchend":
              this.upState && this.changeState(b.UP);
          }
          b.superClass._onEvent.call(this, a);
        }
      };
      b.prototype.setDrawable = function () {
        b.superClass.setDrawable.call(this, null);
      };
    })();
    (function () {
      var b = (Quark.Context = function (a) {
        if (a.canvas == null) throw "Quark.Context Error: canvas is required.";
        this.canvas = null;
        Quark.merge(this, a);
      });
      b.prototype.startDraw = function () {};
      b.prototype.draw = function () {};
      b.prototype.endDraw = function () {};
      b.prototype.transform = function () {};
      b.prototype.remove = function () {};
    })();
    (function () {
      var b = (Quark.CanvasContext = function (a) {
        b.superClass.constructor.call(this, a);
        this.context = this.canvas.getContext("2d");
      });
      Quark.inherit(b, Quark.Context);
      b.prototype.startDraw = function () {
        this.context.save();
      };
      b.prototype.draw = function (a) {
        var b = a.getDrawable(this);
        b != null &&
          ((arguments[0] = b),
          this.context.drawImage.apply(this.context, arguments));
      };
      b.prototype.endDraw = function () {
        this.context.restore();
      };
      b.prototype.transform = function (a) {
        var b = this.context;
        (a.x != 0 || a.y != 0) && b.translate(a.x, a.y);
        a.rotation % 360 != 0 &&
          b.rotate((a.rotation % 360) * Quark.DEG_TO_RAD);
        (a.scaleX != 1 || a.scaleY != 1) && b.scale(a.scaleX, a.scaleY);
        (a.regX != 0 || a.regY != 0) && b.translate(-a.regX, -a.regY);
        a.alpha > 0 && (b.globalAlpha *= a.alpha);
      };
      b.prototype.clear = function (a, b, d, e) {
        this.context.clearRect(a, b, d, e);
      };
    })();
    (function () {
      function b(a, b) {
        var c = "";
        c += b
          ? "translate3d(" +
            (a.x - a.regX) +
            "px, " +
            (a.y - a.regY) +
            "px, 0px)rotate3d(0, 0, 1, " +
            a.rotation +
            "deg)scale3d(" +
            a.scaleX +
            ", " +
            a.scaleY +
            ", 1)"
          : "translate(" +
            (a.x - a.regX) +
            "px, " +
            (a.y - a.regY) +
            "px)rotate(" +
            a.rotation +
            "deg)scale(" +
            a.scaleX +
            ", " +
            a.scaleY +
            ")";
        return c;
      }
      var a = document.createElement("div"),
        c = a.style[Quark.cssPrefix + "Transform"] != void 0,
        d = a.style[Quark.cssPrefix + "Perspective"] != void 0,
        e = document.documentElement;
      if (d && "webkitPerspective" in e.style) {
        a.id = "test3d";
        var f = document.createElement("style");
        f.textContent = "@media (-webkit-transform-3d){#test3d{height:3px}}";
        document.head.appendChild(f);
        e.appendChild(a);
        d = a.offsetHeight === 3;
        f.parentNode.removeChild(f);
        a.parentNode.removeChild(a);
      }
      Quark.supportTransform = c;
      Quark.supportTransform3D = d;
      if (!c) throw "Error: DOMContext requires css transfrom support.";
      var h = (Quark.DOMContext = function (a) {
        h.superClass.constructor.call(this, a);
      });
      Quark.inherit(h, Quark.Context);
      h.prototype.draw = function (a) {
        if (!a._addedToDOM) {
          var b = a.parent,
            c = a.getDrawable(this);
          b == null && c.parentNode == null
            ? this.canvas.appendChild(c)
            : ((b = b.getDrawable(this)),
              c.parentNode != b && b.appendChild(c));
          a._addedToDOM = !0;
        }
      };
      h.prototype.transform = function (a) {
        var c = a.getDrawable(this);
        if (a.transformEnabled || !a._addedToDOM) {
          var d = Quark.cssPrefix,
            e = d + "TransformOrigin";
          d += "Transform";
          if (!c.style.display || a.propChanged("visible", "alpha"))
            c.style.display = !a.visible || a.alpha <= 0 ? "none" : "";
          if (!c.style.opacity || a.propChanged("alpha"))
            c.style.opacity = a.alpha;
          if (!c.style.backgroundPosition || a.propChanged("rectX", "rectY"))
            c.style.backgroundPosition = -a.rectX + "px " + -a.rectY + "px";
          if (!c.style.width || a.propChanged("width", "height"))
            (c.style.width = a.width + "px"),
              (c.style.height = a.height + "px");
          if (!c.style[e] || a.propChanged("regX", "regY"))
            c.style[e] = a.regX + "px " + a.regY + "px";
          if (
            !c.style[d] ||
            a.propChanged(
              "x",
              "y",
              "regX",
              "regY",
              "scaleX",
              "scaleY",
              "rotation"
            )
          )
            (e = Quark.supportTransform3D ? b(a, !0) : b(a, !1)),
              (c.style[d] = e);
          if (!c.style.zIndex || a.propChanged("_depth"))
            c.style.zIndex = a._depth;
        }
      };
      h.prototype.hide = function (a) {
        a.getDrawable(this).style.display = "none";
      };
      h.prototype.remove = function (a) {
        var b = a.getDrawable(this),
          c = b.parentNode;
        c != null && c.removeChild(b);
        a._addedToDOM = !1;
      };
    })();
    (function () {
      var c = (Q.use("fish").R = {});
      c.sources = [
        {
          id: "mainbg",
          size: 456,
          src: "../../../../images/game_bg_2_hd.jpg?" + Math.random(),
        },
        {
          id: "bottom",
          size: 50,
          src: "../../../../images/bottom.png?" + Math.random(),
        },
        {
          id: "fish1",
          size: 6,
          src: "../../../../images/fish1.png?" + Math.random(),
        },
        {
          id: "fish2",
          size: 16,
          src: "../../../../images/fish2.png?" + Math.random(),
        },
        {
          id: "fish3",
          size: 11,
          src: "../../../../images/fish3.png?" + Math.random(),
        },
        {
          id: "fish4",
          size: 15,
          src: "../../../../images/fish4.png?" + Math.random(),
        },
        {
          id: "fish5",
          size: 43,
          src: "../../../../images/fish5.png?" + Math.random(),
        },
        {
          id: "fish6",
          size: 45,
          src: "../../../../images/fish6.png?" + Math.random(),
        },
        {
          id: "fish7",
          size: 80,
          src: "../../../../images/fish7.png?" + Math.random(),
        },
        {
          id: "fish8",
          size: 100,
          src: "../../../../images/fish8.png?" + Math.random(),
        },
        {
          id: "fish9",
          size: 104,
          src: "../../../../images/fish9.png?" + Math.random(),
        },
        {
          id: "fish10",
          size: 121,
          src: "../../../../images/fish10.png?" + Math.random(),
        },
        {
          id: "shark1",
          size: 287,
          src: "../../../../images/shark1.png?" + Math.random(),
        },
        {
          id: "shark2",
          size: 382,
          src: "../../../../images/shark2.png?" + Math.random(),
        },
        {
          id: "cannon1",
          size: 11,
          src: "../../../../images/cannon1.png?" + Math.random(),
        },
        {
          id: "cannon2",
          size: 11,
          src: "../../../../images/cannon2.png?" + Math.random(),
        },
        {
          id: "cannon3",
          size: 11,
          src: "../../../../images/cannon3.png?" + Math.random(),
        },
        {
          id: "cannon4",
          size: 13,
          src: "../../../../images/cannon4.png?" + Math.random(),
        },
        {
          id: "cannon5",
          size: 13,
          src: "../../../../images/cannon5.png?" + Math.random(),
        },
        {
          id: "cannon6",
          size: 15,
          src: "../../../../images/cannon6.png?" + Math.random(),
        },
        {
          id: "cannon7",
          size: 17,
          src: "../../../../images/cannon7.png?" + Math.random(),
        },
        {
          id: "bullet",
          size: 8,
          src: "../../../../images/bullet.png?" + Math.random(),
        },
        {
          id: "web",
          size: 93,
          src: "../../../../images/web.png?" + Math.random(),
        },
        {
          id: "numBlack",
          size: 1,
          src: "../../../../images/number_black.png?" + Math.random(),
        },
        {
          id: "coinAni1",
          size: 19,
          src: "../../../../images/coinAni1.png?" + Math.random(),
        },
        {
          id: "coinAni2",
          size: 22,
          src: "../../../../images/coinAni2.png?" + Math.random(),
        },
        {
          id: "coinText",
          size: 16,
          src: "../../../../images/coinText.png?" + Math.random(),
        },
      ];
      c.init = function (a) {
        this.images = a;
        this.initResources();
      };
      c.initResources = function () {
        this.mainbg = this.getImage("mainbg");
        this.bottom = this.getImage("bottom");
        this.bottombar = { image: this.bottom, rect: [0, 0, 765, 72] };
        this.cannonMinus = {
          image: this.bottom,
          up: { rect: [132, 72, 44, 31] },
          down: { rect: [88, 72, 44, 31] },
          width: 44,
          height: 31,
        };
        this.cannonPlus = {
          image: this.bottom,
          up: { rect: [44, 72, 44, 31] },
          down: { rect: [0, 72, 44, 31] },
          width: 44,
          height: 31,
        };
        this.numBlack = {
          image: this.getImage("numBlack"),
          9: [0, 0, 20, 24],
          8: [0, 24, 20, 24],
          7: [0, 48, 20, 24],
          6: [0, 72, 20, 24],
          5: [0, 96, 20, 24],
          4: [0, 120, 20, 24],
          3: [0, 144, 20, 24],
          2: [0, 168, 20, 24],
          1: [0, 192, 20, 24],
          0: [0, 216, 20, 24],
        };
        this.coinText = {
          image: this.getImage("coinText"),
          0: [0, 0, 36, 49],
          1: [36, 0, 36, 49],
          2: [72, 0, 36, 49],
          3: [108, 0, 36, 49],
          4: [144, 0, 36, 49],
          5: [180, 0, 36, 49],
          6: [216, 0, 36, 49],
          7: [252, 0, 36, 49],
          8: [288, 0, 36, 49],
          9: [324, 0, 36, 49],
          "+": [360, 0, 36, 49],
        };
        this.coinAni1 = {
          image: this.getImage("coinAni1"),
          frames: [
            { rect: [0, 0, 60, 60] },
            { rect: [0, 60, 60, 60] },
            { rect: [0, 120, 60, 60] },
            { rect: [0, 180, 60, 60] },
            { rect: [0, 240, 60, 60] },
            { rect: [0, 300, 60, 60] },
            { rect: [0, 360, 60, 60] },
            { rect: [0, 420, 60, 60] },
            { rect: [0, 480, 60, 60] },
            { rect: [0, 540, 60, 60] },
          ],
          regX: 30,
          regY: 30,
          scaleX: 0.8,
          scaleY: 0.8,
          useFrames: !0,
          interval: 2,
        };
        this.coinAni2 = {
          image: this.getImage("coinAni2"),
          frames: [
            { rect: [0, 0, 60, 60] },
            { rect: [0, 60, 60, 60] },
            { rect: [0, 120, 60, 60] },
            { rect: [0, 180, 60, 60] },
            { rect: [0, 240, 60, 60] },
            { rect: [0, 300, 60, 60] },
            { rect: [0, 360, 60, 60] },
            { rect: [0, 420, 60, 60] },
            { rect: [0, 480, 60, 60] },
            { rect: [0, 540, 60, 60] },
          ],
          regX: 30,
          regY: 30,
          scaleX: 0.8,
          scaleY: 0.8,
          useFrames: !0,
          interval: 2,
        };
        var a = {
            image: this.getImage("fish1"),
            frames: [
              { rect: [0, 0, 55, 37], label: "swim" },
              { rect: [0, 37, 55, 37] },
              { rect: [0, 74, 55, 37] },
              { rect: [0, 111, 55, 37], jump: "swim" },
              { rect: [0, 148, 55, 37], label: "capture" },
              { rect: [0, 185, 55, 37] },
              { rect: [0, 222, 55, 37] },
              { rect: [0, 259, 55, 37], jump: "capture" },
            ],
            polyArea: [
              { x: 10, y: 5 },
              { x: 55, y: 5 },
              { x: 55, y: 22 },
              { x: 10, y: 22 },
            ],
            mixin: {
              coin: 1,
              captureRate: 0.55,
              maxNumGroup: 8,
              minSpeed: 0.5,
              maxSpeed: 1.2,
              regX: 35,
              regY: 12,
              useFrames: !0,
              interval: 10,
            },
          },
          b = {
            image: this.getImage("fish2"),
            frames: [
              { rect: [0, 0, 78, 64], label: "swim" },
              { rect: [0, 64, 78, 64] },
              { rect: [0, 128, 78, 64] },
              { rect: [0, 192, 78, 64], jump: "swim" },
              { rect: [0, 256, 78, 64], label: "capture" },
              { rect: [0, 320, 78, 64] },
              { rect: [0, 384, 78, 64] },
              { rect: [0, 448, 78, 64], jump: "capture" },
            ],
            polyArea: [
              { x: 15, y: 10 },
              { x: 78, y: 10 },
              { x: 78, y: 32 },
              { x: 15, y: 32 },
            ],
            mixin: {
              coin: 3,
              captureRate: 0.5,
              maxNumGroup: 6,
              minSpeed: 0.5,
              maxSpeed: 1.2,
              regX: 58,
              regY: 20,
              useFrames: !0,
              interval: 10,
            },
          },
          e = {
            image: this.getImage("fish3"),
            frames: [
              { rect: [0, 0, 72, 56], label: "swim" },
              { rect: [0, 56, 72, 56] },
              { rect: [0, 112, 72, 56] },
              { rect: [0, 168, 72, 56], jump: "swim" },
              { rect: [0, 224, 72, 56], label: "capture" },
              { rect: [0, 280, 72, 56] },
              { rect: [0, 336, 72, 56] },
              { rect: [0, 392, 72, 56], jump: "capture" },
            ],
            polyArea: [
              { x: 5, y: 5 },
              { x: 72, y: 5 },
              { x: 72, y: 28 },
              { x: 5, y: 28 },
            ],
            mixin: {
              coin: 5,
              captureRate: 0.45,
              maxNumGroup: 6,
              minSpeed: 0.5,
              maxSpeed: 1.2,
              regX: 52,
              regY: 18,
              useFrames: !0,
              interval: 10,
            },
          },
          d = {
            image: this.getImage("fish4"),
            frames: [
              { rect: [0, 0, 77, 59], label: "swim" },
              { rect: [0, 59, 77, 59] },
              { rect: [0, 118, 77, 59] },
              { rect: [0, 177, 77, 59], jump: "swim" },
              { rect: [0, 236, 77, 59], label: "capture" },
              { rect: [0, 295, 77, 59] },
              { rect: [0, 354, 77, 59] },
              { rect: [0, 413, 77, 59], jump: "capture" },
            ],
            polyArea: [
              { x: 10, y: 5 },
              { x: 77, y: 5 },
              { x: 77, y: 28 },
              { x: 10, y: 28 },
            ],
            mixin: {
              coin: 8,
              captureRate: 0.4,
              maxNumGroup: 6,
              minSpeed: 0.5,
              maxSpeed: 1.2,
              regX: 57,
              regY: 18,
              useFrames: !0,
              interval: 10,
            },
          },
          c = {
            image: this.getImage("fish5"),
            frames: [
              { rect: [0, 0, 107, 122], label: "swim" },
              { rect: [0, 122, 107, 122] },
              { rect: [0, 244, 107, 122] },
              { rect: [0, 366, 107, 122], jump: "swim" },
              { rect: [0, 488, 107, 122], label: "capture" },
              { rect: [0, 610, 107, 122] },
              { rect: [0, 732, 107, 122] },
              { rect: [0, 854, 107, 122], jump: "capture" },
            ],
            polyArea: [
              { x: 20, y: 30 },
              { x: 100, y: 30 },
              { x: 100, y: 70 },
              { x: 20, y: 70 },
            ],
            mixin: {
              coin: 10,
              captureRate: 0.35,
              maxNumGroup: 5,
              minSpeed: 0.5,
              maxSpeed: 1.2,
              regX: 67,
              regY: 50,
              useFrames: !0,
              interval: 10,
            },
          },
          i = {
            image: this.getImage("fish6"),
            frames: [
              { rect: [0, 0, 105, 79], label: "swim" },
              { rect: [0, 79, 105, 79] },
              { rect: [0, 158, 105, 79] },
              { rect: [0, 237, 105, 79] },
              { rect: [0, 316, 105, 79] },
              { rect: [0, 395, 105, 79] },
              { rect: [0, 474, 105, 79] },
              { rect: [0, 553, 105, 79], jump: "swim" },
              { rect: [0, 632, 105, 79], label: "capture" },
              { rect: [0, 711, 105, 79] },
              { rect: [0, 790, 105, 79] },
              { rect: [0, 869, 105, 79], jump: "capture" },
            ],
            polyArea: [
              { x: 45, y: 0 },
              { x: 105, y: 0 },
              { x: 105, y: 55 },
              { x: 45, y: 55 },
            ],
            mixin: {
              coin: 20,
              captureRate: 0.3,
              maxNumGroup: 3,
              minSpeed: 0.5,
              maxSpeed: 1.2,
              regX: 65,
              regY: 25,
              useFrames: !0,
              interval: 10,
            },
          },
          g = {
            image: this.getImage("fish7"),
            frames: [
              { rect: [0, 0, 92, 151], label: "swim" },
              { rect: [0, 151, 92, 151] },
              { rect: [0, 302, 92, 151] },
              { rect: [0, 453, 92, 151] },
              { rect: [0, 604, 92, 151] },
              { rect: [0, 755, 92, 151], jump: "swim" },
              { rect: [0, 906, 92, 151], label: "capture" },
              { rect: [0, 1057, 92, 151] },
              { rect: [0, 1208, 92, 151] },
              { rect: [0, 1359, 92, 151], jump: "capture" },
            ],
            polyArea: [
              { x: 15, y: 5 },
              { x: 85, y: 5 },
              { x: 85, y: 80 },
              { x: 15, y: 80 },
            ],
            mixin: {
              coin: 30,
              captureRate: 0.25,
              maxNumGroup: 5,
              minSpeed: 0.5,
              maxSpeed: 0.8,
              regX: 40,
              regY: 50,
              useFrames: !0,
              interval: 10,
            },
          },
          f = {
            image: this.getImage("fish8"),
            frames: [
              { rect: [0, 0, 174, 126], label: "swim" },
              { rect: [0, 126, 174, 126] },
              { rect: [0, 252, 174, 126] },
              { rect: [0, 378, 174, 126] },
              { rect: [0, 504, 174, 126] },
              { rect: [0, 630, 174, 126] },
              { rect: [0, 756, 174, 126] },
              { rect: [0, 882, 174, 126], jump: "swim" },
              { rect: [0, 1008, 174, 126], label: "capture" },
              { rect: [0, 1134, 174, 126] },
              { rect: [0, 1260, 174, 126] },
              { rect: [0, 1386, 174, 126], jump: "capture" },
            ],
            polyArea: [
              { x: 20, y: 20 },
              { x: 120, y: 20 },
              { x: 120, y: 75 },
              { x: 20, y: 75 },
            ],
            mixin: {
              coin: 40,
              captureRate: 0.2,
              maxNumGroup: 3,
              minSpeed: 0.5,
              maxSpeed: 0.8,
              regX: 90,
              regY: 50,
              useFrames: !0,
              interval: 10,
            },
          },
          l = {
            image: this.getImage("fish9"),
            frames: [
              { rect: [0, 0, 166, 183], label: "swim" },
              { rect: [0, 183, 166, 183] },
              { rect: [0, 366, 166, 183] },
              { rect: [0, 549, 166, 183] },
              { rect: [0, 732, 166, 183] },
              { rect: [0, 915, 166, 183] },
              { rect: [0, 1098, 166, 183] },
              { rect: [0, 1281, 166, 183], jump: "swim" },
              { rect: [0, 1464, 166, 183], label: "capture" },
              { rect: [0, 1647, 166, 183] },
              { rect: [0, 1830, 166, 183] },
              { rect: [0, 2013, 166, 183], jump: "capture" },
            ],
            polyArea: [
              { x: 60, y: 10 },
              { x: 160, y: 10 },
              { x: 160, y: 140 },
              { x: 60, y: 140 },
            ],
            mixin: {
              coin: 50,
              captureRate: 0.15,
              maxNumGroup: 2,
              minSpeed: 0.5,
              maxSpeed: 0.8,
              regX: 120,
              regY: 70,
              useFrames: !0,
              interval: 10,
            },
          },
          k = {
            image: this.getImage("fish10"),
            frames: [
              { rect: [0, 0, 178, 187], label: "swim" },
              { rect: [0, 187, 178, 187] },
              { rect: [0, 374, 178, 187] },
              { rect: [0, 561, 178, 187] },
              { rect: [0, 748, 178, 187] },
              { rect: [0, 935, 178, 187], jump: "swim" },
              { rect: [0, 1122, 178, 187], label: "capture" },
              { rect: [0, 1309, 178, 187] },
              { rect: [0, 1496, 178, 187] },
              { rect: [0, 1683, 178, 187], jump: "capture" },
            ],
            polyArea: [
              { x: 20, y: 30 },
              { x: 170, y: 30 },
              { x: 170, y: 120 },
              { x: 20, y: 120 },
            ],
            mixin: {
              coin: 60,
              captureRate: 0.1,
              maxNumGroup: 2,
              minSpeed: 0.5,
              maxSpeed: 0.8,
              regX: 100,
              regY: 80,
              useFrames: !0,
              interval: 10,
            },
          },
          j = {
            image: this.getImage("shark1"),
            frames: [
              { rect: [0, 0, 509, 270], label: "swim" },
              { rect: [0, 270, 509, 270] },
              { rect: [0, 540, 509, 270] },
              { rect: [0, 810, 509, 270] },
              { rect: [0, 1080, 509, 270] },
              { rect: [0, 1350, 509, 270] },
              { rect: [0, 1620, 509, 270] },
              { rect: [0, 1890, 509, 270], jump: "swim" },
              { rect: [0, 2160, 509, 270], label: "capture" },
              { rect: [0, 2430, 509, 270] },
              { rect: [0, 2700, 509, 270] },
              { rect: [0, 2970, 509, 270], jump: "capture" },
            ],
            polyArea: [
              { x: 20, y: 50 },
              { x: 500, y: 50 },
              { x: 500, y: 220 },
              { x: 20, y: 210 },
            ],
            mixin: {
              coin: 100,
              captureRate: 0.05,
              maxNumGroup: 1,
              minSpeed: 0.5,
              maxSpeed: 0.6,
              regX: 350,
              regY: 130,
              useFrames: !0,
              interval: 10,
            },
          },
          m = {
            image: this.getImage("shark2"),
            frames: [
              { rect: [0, 0, 516, 273], label: "swim" },
              { rect: [0, 273, 516, 273] },
              { rect: [0, 546, 516, 273] },
              { rect: [0, 819, 516, 273] },
              { rect: [0, 1092, 516, 273] },
              { rect: [0, 1365, 516, 273] },
              { rect: [0, 1638, 516, 273] },
              { rect: [0, 1911, 516, 273], jump: "swim" },
              { rect: [0, 2184, 516, 273], label: "capture" },
              { rect: [0, 2457, 516, 273] },
              { rect: [0, 2730, 516, 273] },
              { rect: [0, 3003, 516, 273], jump: "capture" },
            ],
            polyArea: [
              { x: 20, y: 50 },
              { x: 500, y: 50 },
              { x: 500, y: 220 },
              { x: 20, y: 210 },
            ],
            mixin: {
              coin: 200,
              captureRate: 0.02,
              maxNumGroup: 1,
              minSpeed: 0.5,
              maxSpeed: 0.6,
              regX: 350,
              regY: 130,
              useFrames: !0,
              interval: 10,
            },
          },
          n = {
            image: this.getImage("cannon1"),
            frames: [
              { rect: [0, 0, 74, 74] },
              { rect: [0, 74, 74, 74] },
              { rect: [0, 148, 74, 74] },
              { rect: [0, 222, 74, 74] },
              { rect: [0, 296, 74, 74], stop: 1 },
            ],
            mixin: { regX: 37, regY: 45, useFrames: !0, interval: 3, power: 1 },
          },
          o = {
            image: this.getImage("cannon2"),
            frames: [
              { rect: [0, 0, 74, 76] },
              { rect: [0, 76, 74, 76] },
              { rect: [0, 152, 74, 76] },
              { rect: [0, 228, 74, 76] },
              { rect: [0, 304, 74, 76], stop: 1 },
            ],
            mixin: { regX: 37, regY: 46, useFrames: !0, interval: 3, power: 2 },
          },
          p = {
            image: this.getImage("cannon3"),
            frames: [
              { rect: [0, 0, 74, 76] },
              { rect: [0, 76, 74, 76] },
              { rect: [0, 152, 74, 76] },
              { rect: [0, 228, 74, 76] },
              { rect: [0, 304, 74, 76], stop: 1 },
            ],
            mixin: { regX: 37, regY: 46, useFrames: !0, interval: 3, power: 3 },
          },
          q = {
            image: this.getImage("cannon4"),
            frames: [
              { rect: [0, 0, 74, 83] },
              { rect: [0, 83, 74, 83] },
              { rect: [0, 166, 74, 83] },
              { rect: [0, 249, 74, 83] },
              { rect: [0, 332, 74, 83], stop: 1 },
            ],
            mixin: { regX: 37, regY: 52, useFrames: !0, interval: 3, power: 4 },
          },
          r = {
            image: this.getImage("cannon5"),
            frames: [
              { rect: [0, 0, 74, 85] },
              { rect: [0, 85, 74, 85] },
              { rect: [0, 170, 74, 85] },
              { rect: [0, 255, 74, 85] },
              { rect: [0, 340, 74, 85], stop: 1 },
            ],
            mixin: { regX: 37, regY: 55, useFrames: !0, interval: 3, power: 5 },
          },
          s = {
            image: this.getImage("cannon6"),
            frames: [
              { rect: [0, 0, 74, 90] },
              { rect: [0, 90, 74, 90] },
              { rect: [0, 180, 74, 90] },
              { rect: [0, 270, 74, 90] },
              { rect: [0, 360, 74, 90], stop: 1 },
            ],
            mixin: { regX: 37, regY: 58, useFrames: !0, interval: 3, power: 6 },
          },
          t = {
            image: this.getImage("cannon7"),
            frames: [
              { rect: [0, 0, 74, 94] },
              { rect: [0, 94, 74, 94] },
              { rect: [0, 188, 74, 94] },
              { rect: [0, 282, 74, 94] },
              { rect: [0, 376, 74, 94], stop: 1 },
            ],
            mixin: { regX: 37, regY: 60, useFrames: !0, interval: 3, power: 7 },
          };
        this.fishTypes = [null, a, b, e, d, c, i, f, l, k, g, j, m];
        this.cannonTypes = [null, n, o, p, q, r, s, t];
        a = this.getImage("bullet");
        this.bullets = [
          { image: a, rect: [86, 0, 24, 26], regX: 12, regY: 13 },
          { image: a, rect: [61, 0, 25, 29], regX: 12, regY: 14 },
          { image: a, rect: [32, 35, 27, 31], regX: 13, regY: 15 },
          { image: a, rect: [30, 82, 29, 33], regX: 14, regY: 16 },
          { image: a, rect: [0, 82, 30, 34], regX: 15, regY: 17 },
          { image: a, rect: [30, 0, 31, 35], regX: 15, regY: 17 },
          { image: a, rect: [0, 44, 32, 38], regX: 16, regY: 19 },
        ];
        a = this.getImage("web");
        this.webs = [
          {
            image: a,
            rect: [319, 355, 116, 118],
            regX: 58,
            regY: 59,
            polyArea: [
              { x: 20, y: 20 },
              { x: 100, y: 20 },
              { x: 100, y: 100 },
              { x: 20, y: 100 },
            ],
          },
          {
            image: a,
            rect: [0, 399, 137, 142],
            regX: 68,
            regY: 71,
            polyArea: [
              { x: 20, y: 20 },
              { x: 120, y: 20 },
              { x: 120, y: 120 },
              { x: 20, y: 120 },
            ],
          },
          {
            image: a,
            rect: [163, 355, 156, 162],
            regX: 78,
            regY: 81,
            polyArea: [
              { x: 20, y: 20 },
              { x: 140, y: 20 },
              { x: 140, y: 140 },
              { x: 20, y: 140 },
            ],
          },
          {
            image: a,
            rect: [242, 181, 180, 174],
            regX: 90,
            regY: 87,
            polyArea: [
              { x: 20, y: 20 },
              { x: 160, y: 20 },
              { x: 160, y: 160 },
              { x: 20, y: 160 },
            ],
          },
          {
            image: a,
            rect: [0, 244, 163, 155],
            regX: 81,
            regY: 77,
            polyArea: [
              { x: 10, y: 10 },
              { x: 150, y: 10 },
              { x: 150, y: 150 },
              { x: 10, y: 150 },
            ],
          },
          {
            image: a,
            rect: [242, 0, 191, 181],
            regX: 95,
            regY: 90,
            polyArea: [
              { x: 10, y: 10 },
              { x: 180, y: 10 },
              { x: 180, y: 180 },
              { x: 10, y: 180 },
            ],
          },
          {
            image: a,
            rect: [0, 0, 242, 244],
            regX: 121,
            regY: 122,
            polyArea: [
              { x: 30, y: 30 },
              { x: 210, y: 30 },
              { x: 210, y: 210 },
              { x: 30, y: 210 },
            ],
          },
        ];
      };
      c.convertPlistImage = function () {
        this.fish = this.getImage("fish");
        this.shark = this.getImage("shark");
        this.cannon = this.getImage("cannon");
        var a = [
            {
              frame: [1438, 419, 60, 60],
              offset: [0, 0],
              rotated: !1,
              sourceRect: [0, 0, 60, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [1396, 507, 60, 60],
              offset: [0, 0],
              rotated: !1,
              sourceRect: [0, 0, 60, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [1377, 419, 60, 60],
              offset: [0, 0],
              rotated: !1,
              sourceRect: [0, 0, 60, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [1051, 1295, 54, 60],
              offset: [0, 0],
              rotated: !1,
              sourceRect: [3, 0, 54, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [644, 1254, 42, 60],
              offset: [0, 0],
              rotated: !0,
              sourceRect: [9, 0, 42, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [133, 2018, 28, 60],
              offset: [-1, 0],
              rotated: !0,
              sourceRect: [15, 0, 28, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [0, 2025, 14, 60],
              offset: [0, 0],
              rotated: !0,
              sourceRect: [23, 0, 14, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [934, 685, 26, 60],
              offset: [0, 0],
              rotated: !0,
              sourceRect: [17, 0, 26, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [583, 1254, 42, 60],
              offset: [0, 0],
              rotated: !0,
              sourceRect: [9, 0, 42, 60],
              sourceSize: [60, 60],
            },
            {
              frame: [1034, 1372, 54, 60],
              offset: [-1, 0],
              rotated: !1,
              sourceRect: [2, 0, 54, 60],
              sourceSize: [60, 60],
            },
          ],
          b = {
            maxNumGroup: 8,
            minSpeed: 0.5,
            maxSpeed: 1.2,
            regX: 35,
            regY: 12,
            useFrames: !0,
            interval: 10,
          };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [1522, 78, 60, 60],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 60, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [1470, 248, 60, 60],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 60, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [1439, 329, 60, 60],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 60, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [1134, 1163, 54, 60],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [3, 0, 54, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [1337, 670, 42, 60],
            offset: [0, 0],
            rotated: !0,
            sourceRect: [9, 0, 42, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [194, 2018, 28, 60],
            offset: [-1, 0],
            rotated: !0,
            sourceRect: [15, 0, 28, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [61, 2025, 14, 60],
            offset: [0, 0],
            rotated: !0,
            sourceRect: [23, 0, 14, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [1356, 570, 26, 60],
            offset: [0, 0],
            rotated: !0,
            sourceRect: [17, 0, 26, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [705, 1254, 42, 60],
            offset: [0, 0],
            rotated: !0,
            sourceRect: [9, 0, 42, 60],
            sourceSize: [60, 60],
          },
          {
            frame: [1105, 1233, 54, 60],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [2, 0, 54, 60],
            sourceSize: [60, 60],
          },
        ];
        b = {
          maxNumGroup: 8,
          minSpeed: 0.5,
          maxSpeed: 1.2,
          regX: 35,
          regY: 12,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [572, 1062, 55, 35],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 1, 55, 35],
            sourceSize: [55, 37],
          },
          {
            frame: [628, 1062, 55, 33],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 2, 55, 33],
            sourceSize: [55, 37],
          },
          {
            frame: [684, 1062, 55, 31],
            offset: [0, 1],
            rotated: !1,
            sourceRect: [0, 2, 55, 31],
            sourceSize: [55, 37],
          },
          {
            frame: [828, 685, 55, 33],
            offset: [0, 1],
            rotated: !1,
            sourceRect: [0, 1, 55, 33],
            sourceSize: [55, 37],
          },
          {
            frame: [934, 985, 51, 25],
            offset: [0, -4],
            rotated: !1,
            sourceRect: [2, 10, 51, 25],
            sourceSize: [55, 37],
          },
          {
            frame: [884, 685, 49, 27],
            offset: [1, -4],
            rotated: !1,
            sourceRect: [4, 9, 49, 27],
            sourceSize: [55, 37],
          },
          {
            frame: [846, 1042, 51, 27],
            offset: [0, -3],
            rotated: !0,
            sourceRect: [2, 8, 51, 27],
            sourceSize: [55, 37],
          },
          {
            frame: [818, 1042, 51, 27],
            offset: [1, -4],
            rotated: !0,
            sourceRect: [3, 9, 51, 27],
            sourceSize: [55, 37],
          },
        ];
        b = {
          maxNumGroup: 8,
          minSpeed: 0.5,
          maxSpeed: 1.2,
          regX: 35,
          regY: 12,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [1194, 450, 74, 58],
            offset: [1, -1],
            rotated: !1,
            sourceRect: [3, 4, 74, 58],
            sourceSize: [78, 64],
          },
          {
            frame: [1234, 832, 70, 54],
            offset: [3, 1],
            rotated: !0,
            sourceRect: [7, 4, 70, 54],
            sourceSize: [78, 64],
          },
          {
            frame: [1078, 1092, 74, 44],
            offset: [1, 2],
            rotated: !0,
            sourceRect: [3, 8, 74, 44],
            sourceSize: [78, 64],
          },
          {
            frame: [314, 1998, 74, 50],
            offset: [2, 0],
            rotated: !1,
            sourceRect: [4, 7, 74, 50],
            sourceSize: [78, 64],
          },
          {
            frame: [1080, 965, 72, 58],
            offset: [0, 3],
            rotated: !0,
            sourceRect: [3, 0, 72, 58],
            sourceSize: [78, 64],
          },
          {
            frame: [995, 646, 66, 58],
            offset: [4, 3],
            rotated: !0,
            sourceRect: [10, 0, 66, 58],
            sourceSize: [78, 64],
          },
          {
            frame: [992, 1297, 74, 58],
            offset: [1, 3],
            rotated: !0,
            sourceRect: [3, 0, 74, 58],
            sourceSize: [78, 64],
          },
          {
            frame: [1054, 646, 66, 56],
            offset: [4, 4],
            rotated: !0,
            sourceRect: [10, 0, 66, 56],
            sourceSize: [78, 64],
          },
        ];
        b = {
          maxNumGroup: 6,
          minSpeed: 0.5,
          maxSpeed: 1.2,
          regX: 58,
          regY: 20,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [1358, 258, 70, 56],
            offset: [0, 0],
            rotated: !0,
            sourceRect: [1, 0, 70, 56],
            sourceSize: [72, 56],
          },
          {
            frame: [1415, 258, 70, 54],
            offset: [0, 1],
            rotated: !0,
            sourceRect: [1, 0, 70, 54],
            sourceSize: [72, 56],
          },
          {
            frame: [389, 1998, 70, 50],
            offset: [0, 2],
            rotated: !1,
            sourceRect: [1, 1, 70, 50],
            sourceSize: [72, 56],
          },
          {
            frame: [894, 1244, 70, 52],
            offset: [0, 2],
            rotated: !1,
            sourceRect: [1, 0, 70, 52],
            sourceSize: [72, 56],
          },
          {
            frame: [1125, 460, 68, 48],
            offset: [1, 3],
            rotated: !1,
            sourceRect: [3, 1, 68, 48],
            sourceSize: [72, 56],
          },
          {
            frame: [1157, 284, 66, 48],
            offset: [2, 3],
            rotated: !1,
            sourceRect: [5, 1, 66, 48],
            sourceSize: [72, 56],
          },
          {
            frame: [1090, 284, 66, 48],
            offset: [2, 3],
            rotated: !1,
            sourceRect: [5, 1, 66, 48],
            sourceSize: [72, 56],
          },
          {
            frame: [1056, 460, 68, 48],
            offset: [2, 3],
            rotated: !1,
            sourceRect: [4, 1, 68, 48],
            sourceSize: [72, 56],
          },
        ];
        b = {
          maxNumGroup: 6,
          minSpeed: 0.5,
          maxSpeed: 1.2,
          regX: 52,
          regY: 18,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [911, 1519, 77, 53],
            offset: [0, 3],
            rotated: !0,
            sourceRect: [0, 0, 77, 53],
            sourceSize: [77, 59],
          },
          {
            frame: [740, 1042, 77, 51],
            offset: [0, 4],
            rotated: !1,
            sourceRect: [0, 0, 77, 51],
            sourceSize: [77, 59],
          },
          {
            frame: [1224, 283, 77, 45],
            offset: [0, 5],
            rotated: !1,
            sourceRect: [0, 2, 77, 45],
            sourceSize: [77, 59],
          },
          {
            frame: [460, 1998, 77, 49],
            offset: [0, 4],
            rotated: !1,
            sourceRect: [0, 1, 77, 49],
            sourceSize: [77, 59],
          },
          {
            frame: [1123, 1091, 71, 57],
            offset: [-1, 0],
            rotated: !0,
            sourceRect: [2, 1, 71, 57],
            sourceSize: [77, 59],
          },
          {
            frame: [918, 1373, 67, 57],
            offset: [1, 1],
            rotated: !0,
            sourceRect: [6, 0, 67, 57],
            sourceSize: [77, 59],
          },
          {
            frame: [1178, 832, 71, 55],
            offset: [0, 1],
            rotated: !0,
            sourceRect: [3, 1, 71, 55],
            sourceSize: [77, 59],
          },
          {
            frame: [1139, 965, 71, 57],
            offset: [0, 0],
            rotated: !0,
            sourceRect: [3, 1, 71, 57],
            sourceSize: [77, 59],
          },
        ];
        b = {
          maxNumGroup: 6,
          minSpeed: 0.5,
          maxSpeed: 1.2,
          regX: 57,
          regY: 18,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [1353, 166, 91, 90],
            offset: [3, -1],
            rotated: !0,
            sourceRect: [11, 17, 91, 90],
            sourceSize: [107, 122],
          },
          {
            frame: [782, 1960, 87, 88],
            offset: [5, -1],
            rotated: !1,
            sourceRect: [15, 18, 87, 88],
            sourceSize: [107, 122],
          },
          {
            frame: [1430, 0, 89, 86],
            offset: [4, -1],
            rotated: !0,
            sourceRect: [13, 19, 89, 86],
            sourceSize: [107, 122],
          },
          {
            frame: [688, 1960, 93, 88],
            offset: [2, -1],
            rotated: !1,
            sourceRect: [9, 18, 93, 88],
            sourceSize: [107, 122],
          },
          {
            frame: [1169, 333, 91, 116],
            offset: [2, 0],
            rotated: !1,
            sourceRect: [10, 3, 91, 116],
            sourceSize: [107, 122],
          },
          {
            frame: [1178, 509, 97, 118],
            offset: [-1, 1],
            rotated: !1,
            sourceRect: [4, 1, 97, 118],
            sourceSize: [107, 122],
          },
          {
            frame: [1176, 713, 89, 118],
            offset: [4, -1],
            rotated: !1,
            sourceRect: [13, 3, 89, 118],
            sourceSize: [107, 122],
          },
          {
            frame: [1078, 509, 99, 118],
            offset: [-2, 0],
            rotated: !1,
            sourceRect: [2, 2, 99, 118],
            sourceSize: [107, 122],
          },
        ];
        b = {
          maxNumGroup: 5,
          minSpeed: 0.5,
          maxSpeed: 1.2,
          regX: 67,
          regY: 50,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [1352, 0, 91, 77],
            offset: [4, 0],
            rotated: !0,
            sourceRect: [11, 1, 91, 77],
            sourceSize: [105, 79],
          },
          {
            frame: [1444, 166, 81, 77],
            offset: [2, 0],
            rotated: !0,
            sourceRect: [14, 1, 81, 77],
            sourceSize: [105, 79],
          },
          {
            frame: [1370, 92, 73, 77],
            offset: [1, 0],
            rotated: !0,
            sourceRect: [17, 1, 73, 77],
            sourceSize: [105, 79],
          },
          {
            frame: [1361, 329, 89, 77],
            offset: [-4, 0],
            rotated: !0,
            sourceRect: [4, 1, 89, 77],
            sourceSize: [105, 79],
          },
          {
            frame: [1273, 166, 99, 79],
            offset: [2, 0],
            rotated: !0,
            sourceRect: [5, 0, 99, 79],
            sourceSize: [105, 79],
          },
          {
            frame: [1272, 0, 99, 79],
            offset: [3, 0],
            rotated: !0,
            sourceRect: [6, 0, 99, 79],
            sourceSize: [105, 79],
          },
          {
            frame: [1192, 0, 99, 79],
            offset: [2, 0],
            rotated: !0,
            sourceRect: [5, 0, 99, 79],
            sourceSize: [105, 79],
          },
          {
            frame: [1276, 508, 99, 79],
            offset: [1, 0],
            rotated: !0,
            sourceRect: [4, 0, 99, 79],
            sourceSize: [105, 79],
          },
          {
            frame: [918, 1297, 73, 75],
            offset: [2, 2],
            rotated: !1,
            sourceRect: [18, 0, 73, 75],
            sourceSize: [105, 79],
          },
          {
            frame: [911, 1441, 71, 77],
            offset: [3, 0],
            rotated: !1,
            sourceRect: [20, 1, 71, 77],
            sourceSize: [105, 79],
          },
          {
            frame: [1448, 90, 73, 75],
            offset: [2, 2],
            rotated: !1,
            sourceRect: [18, 0, 73, 75],
            sourceSize: [105, 79],
          },
          {
            frame: [1517, 0, 71, 77],
            offset: [3, 0],
            rotated: !1,
            sourceRect: [20, 1, 71, 77],
            sourceSize: [105, 79],
          },
        ];
        b = {
          maxNumGroup: 3,
          minSpeed: 0.5,
          maxSpeed: 1.2,
          regX: 65,
          regY: 25,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [833, 1297, 84, 143],
            offset: [-1, 1],
            rotated: !1,
            sourceRect: [3, 3, 84, 143],
            sourceSize: [92, 151],
          },
          {
            frame: [853, 867, 80, 143],
            offset: [0, -1],
            rotated: !1,
            sourceRect: [6, 5, 80, 143],
            sourceSize: [92, 151],
          },
          {
            frame: [832, 1450, 78, 147],
            offset: [2, -1],
            rotated: !1,
            sourceRect: [9, 3, 78, 147],
            sourceSize: [92, 151],
          },
          {
            frame: [538, 1963, 84, 149],
            offset: [3, 0],
            rotated: !0,
            sourceRect: [7, 1, 84, 149],
            sourceSize: [92, 151],
          },
          {
            frame: [867, 1094, 86, 149],
            offset: [3, 1],
            rotated: !1,
            sourceRect: [6, 0, 86, 149],
            sourceSize: [92, 151],
          },
          {
            frame: [829, 719, 86, 147],
            offset: [1, 2],
            rotated: !1,
            sourceRect: [4, 0, 86, 147],
            sourceSize: [92, 151],
          },
          {
            frame: [1090, 166, 86, 117],
            offset: [-2, 16],
            rotated: !1,
            sourceRect: [1, 1, 86, 117],
            sourceSize: [92, 151],
          },
          {
            frame: [874, 1011, 82, 113],
            offset: [-1, 17],
            rotated: !0,
            sourceRect: [4, 2, 82, 113],
            sourceSize: [92, 151],
          },
          {
            frame: [1111, 628, 84, 113],
            offset: [-2, 16],
            rotated: !0,
            sourceRect: [2, 3, 84, 113],
            sourceSize: [92, 151],
          },
          {
            frame: [1225, 628, 84, 111],
            offset: [-2, 17],
            rotated: !0,
            sourceRect: [2, 3, 84, 111],
            sourceSize: [92, 151],
          },
        ];
        b = {
          maxNumGroup: 5,
          minSpeed: 0.5,
          maxSpeed: 0.8,
          regX: 40,
          regY: 50,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [284, 1825, 172, 124],
            offset: [1, 1],
            rotated: !0,
            sourceRect: [2, 0, 172, 124],
            sourceSize: [174, 126],
          },
          {
            frame: [264, 1652, 172, 124],
            offset: [1, 1],
            rotated: !0,
            sourceRect: [2, 0, 172, 124],
            sourceSize: [174, 126],
          },
          {
            frame: [409, 1825, 172, 122],
            offset: [1, 0],
            rotated: !0,
            sourceRect: [2, 2, 172, 122],
            sourceSize: [174, 126],
          },
          {
            frame: [415, 1297, 172, 120],
            offset: [1, -1],
            rotated: !0,
            sourceRect: [2, 4, 172, 120],
            sourceSize: [174, 126],
          },
          {
            frame: [389, 1652, 172, 122],
            offset: [1, -1],
            rotated: !0,
            sourceRect: [2, 3, 172, 122],
            sourceSize: [174, 126],
          },
          {
            frame: [264, 1479, 172, 124],
            offset: [1, 0],
            rotated: !0,
            sourceRect: [2, 1, 172, 124],
            sourceSize: [174, 126],
          },
          {
            frame: [789, 0, 172, 124],
            offset: [1, 0],
            rotated: !0,
            sourceRect: [2, 1, 172, 124],
            sourceSize: [174, 126],
          },
          {
            frame: [389, 1479, 172, 122],
            offset: [1, 1],
            rotated: !0,
            sourceRect: [2, 1, 172, 122],
            sourceSize: [174, 126],
          },
          {
            frame: [449, 915, 170, 122],
            offset: [2, 0],
            rotated: !0,
            sourceRect: [4, 2, 170, 122],
            sourceSize: [174, 126],
          },
          {
            frame: [933, 342, 168, 122],
            offset: [3, 2],
            rotated: !0,
            sourceRect: [6, 0, 168, 122],
            sourceSize: [174, 126],
          },
          {
            frame: [828, 516, 168, 122],
            offset: [3, 1],
            rotated: !0,
            sourceRect: [6, 1, 168, 122],
            sourceSize: [174, 126],
          },
          {
            frame: [914, 0, 168, 122],
            offset: [3, 2],
            rotated: !0,
            sourceRect: [6, 0, 168, 122],
            sourceSize: [174, 126],
          },
        ];
        b = {
          maxNumGroup: 3,
          minSpeed: 0.5,
          maxSpeed: 0.8,
          regX: 90,
          regY: 50,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [640, 0, 148, 173],
            offset: [6, 1],
            rotated: !1,
            sourceRect: [15, 4, 148, 173],
            sourceSize: [166, 183],
          },
          {
            frame: [572, 892, 146, 169],
            offset: [6, -1],
            rotated: !1,
            sourceRect: [16, 8, 146, 169],
            sourceSize: [166, 183],
          },
          {
            frame: [583, 1098, 148, 155],
            offset: [4, 0],
            rotated: !1,
            sourceRect: [13, 14, 148, 155],
            sourceSize: [166, 183],
          },
          {
            frame: [719, 891, 150, 133],
            offset: [2, 0],
            rotated: !0,
            sourceRect: [10, 25, 150, 133],
            sourceSize: [166, 183],
          },
          {
            frame: [697, 1297, 152, 135],
            offset: [2, 0],
            rotated: !0,
            sourceRect: [9, 24, 152, 135],
            sourceSize: [166, 183],
          },
          {
            frame: [841, 1784, 158, 155],
            offset: [0, 0],
            rotated: !0,
            sourceRect: [4, 14, 158, 155],
            sourceSize: [166, 183],
          },
          {
            frame: [505, 722, 156, 169],
            offset: [2, 1],
            rotated: !1,
            sourceRect: [7, 6, 156, 169],
            sourceSize: [166, 183],
          },
          {
            frame: [133, 1840, 150, 177],
            offset: [6, 0],
            rotated: !1,
            sourceRect: [14, 3, 150, 177],
            sourceSize: [166, 183],
          },
          {
            frame: [290, 925, 158, 175],
            offset: [2, 2],
            rotated: !1,
            sourceRect: [6, 2, 158, 175],
            sourceSize: [166, 183],
          },
          {
            frame: [686, 1798, 154, 161],
            offset: [5, -4],
            rotated: !1,
            sourceRect: [11, 15, 154, 161],
            sourceSize: [166, 183],
          },
          {
            frame: [264, 1301, 150, 177],
            offset: [8, 3],
            rotated: !1,
            sourceRect: [16, 0, 150, 177],
            sourceSize: [166, 183],
          },
          {
            frame: [1037, 0, 154, 165],
            offset: [5, -6],
            rotated: !1,
            sourceRect: [11, 15, 154, 165],
            sourceSize: [166, 183],
          },
        ];
        b = {
          maxNumGroup: 2,
          minSpeed: 0.5,
          maxSpeed: 0.8,
          regX: 120,
          regY: 70,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [668, 533, 168, 159],
            offset: [3, 3],
            rotated: !0,
            sourceRect: [8, 11, 168, 159],
            sourceSize: [178, 187],
          },
          {
            frame: [0, 380, 166, 187],
            offset: [2, 0],
            rotated: !1,
            sourceRect: [8, 0, 166, 187],
            sourceSize: [178, 187],
          },
          {
            frame: [512, 1470, 164, 163],
            offset: [1, 7],
            rotated: !0,
            sourceRect: [8, 5, 164, 163],
            sourceSize: [178, 187],
          },
          {
            frame: [0, 568, 166, 185],
            offset: [2, 1],
            rotated: !1,
            sourceRect: [8, 0, 166, 185],
            sourceSize: [178, 187],
          },
          {
            frame: [807, 173, 168, 135],
            offset: [4, 5],
            rotated: !0,
            sourceRect: [9, 21, 168, 135],
            sourceSize: [178, 187],
          },
          {
            frame: [441, 1101, 170, 141],
            offset: [4, 5],
            rotated: !0,
            sourceRect: [8, 18, 170, 141],
            sourceSize: [178, 187],
          },
          {
            frame: [512, 1635, 164, 153],
            offset: [-1, -4],
            rotated: !0,
            sourceRect: [6, 21, 164, 153],
            sourceSize: [178, 187],
          },
          {
            frame: [809, 1623, 160, 149],
            offset: [-4, -1],
            rotated: !0,
            sourceRect: [5, 20, 160, 149],
            sourceSize: [178, 187],
          },
          {
            frame: [532, 1800, 162, 153],
            offset: [-4, 0],
            rotated: !0,
            sourceRect: [4, 17, 162, 153],
            sourceSize: [178, 187],
          },
          {
            frame: [676, 1462, 160, 155],
            offset: [-1, 7],
            rotated: !0,
            sourceRect: [8, 9, 160, 155],
            sourceSize: [178, 187],
          },
        ];
        b = {
          maxNumGroup: 2,
          minSpeed: 0.5,
          maxSpeed: 0.8,
          regX: 100,
          regY: 80,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.fish,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [504, 648, 501, 206],
            offset: [2, -3],
            rotated: !1,
            sourceRect: [6, 35, 501, 206],
            sourceSize: [509, 270],
          },
          {
            frame: [1551, 0, 497, 208],
            offset: [4, -4],
            rotated: !1,
            sourceRect: [10, 35, 497, 208],
            sourceSize: [509, 270],
          },
          {
            frame: [983, 873, 477, 210],
            offset: [14, -4],
            rotated: !1,
            sourceRect: [30, 34, 477, 210],
            sourceSize: [509, 270],
          },
          {
            frame: [499, 855, 483, 212],
            offset: [11, -4],
            rotated: !1,
            sourceRect: [24, 33, 483, 212],
            sourceSize: [509, 270],
          },
          {
            frame: [1551, 416, 495, 212],
            offset: [5, -4],
            rotated: !1,
            sourceRect: [12, 33, 495, 212],
            sourceSize: [509, 270],
          },
          {
            frame: [0, 444, 503, 208],
            offset: [1, -4],
            rotated: !1,
            sourceRect: [4, 35, 503, 208],
            sourceSize: [509, 270],
          },
          {
            frame: [1006, 666, 495, 206],
            offset: [5, -3],
            rotated: !1,
            sourceRect: [12, 35, 495, 206],
            sourceSize: [509, 270],
          },
          {
            frame: [1551, 209, 497, 206],
            offset: [4, -3],
            rotated: !1,
            sourceRect: [10, 35, 497, 206],
            sourceSize: [509, 270],
          },
          {
            frame: [0, 883, 483, 192],
            offset: [9, -16],
            rotated: !1,
            sourceRect: [22, 55, 483, 192],
            sourceSize: [509, 270],
          },
          {
            frame: [933, 1084, 423, 264],
            offset: [38, 3],
            rotated: !1,
            sourceRect: [81, 0, 423, 264],
            sourceSize: [509, 270],
          },
          {
            frame: [1502, 853, 481, 216],
            offset: [14, -16],
            rotated: !1,
            sourceRect: [28, 43, 481, 216],
            sourceSize: [509, 270],
          },
          {
            frame: [1461, 1070, 429, 258],
            offset: [34, -1],
            rotated: !1,
            sourceRect: [74, 7, 429, 258],
            sourceSize: [509, 270],
          },
        ];
        b = {
          maxNumGroup: 1,
          minSpeed: 0.5,
          maxSpeed: 0.6,
          regX: 350,
          regY: 130,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.shark,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [1034, 222, 516, 219],
            offset: [0, -1],
            rotated: !1,
            sourceRect: [0, 28, 516, 219],
            sourceSize: [516, 273],
          },
          {
            frame: [1034, 0, 516, 221],
            offset: [0, -2],
            rotated: !1,
            sourceRect: [0, 28, 516, 221],
            sourceSize: [516, 273],
          },
          {
            frame: [1525, 629, 498, 223],
            offset: [9, -2],
            rotated: !1,
            sourceRect: [18, 27, 498, 223],
            sourceSize: [516, 273],
          },
          {
            frame: [1022, 442, 502, 223],
            offset: [7, -3],
            rotated: !1,
            sourceRect: [14, 28, 502, 223],
            sourceSize: [516, 273],
          },
          {
            frame: [0, 0, 516, 223],
            offset: [0, -3],
            rotated: !1,
            sourceRect: [0, 28, 516, 223],
            sourceSize: [516, 273],
          },
          {
            frame: [517, 0, 516, 221],
            offset: [0, -2],
            rotated: !1,
            sourceRect: [0, 28, 516, 221],
            sourceSize: [516, 273],
          },
          {
            frame: [0, 224, 516, 219],
            offset: [0, -1],
            rotated: !1,
            sourceRect: [0, 28, 516, 219],
            sourceSize: [516, 273],
          },
          {
            frame: [517, 222, 516, 219],
            offset: [0, -1],
            rotated: !1,
            sourceRect: [0, 28, 516, 219],
            sourceSize: [516, 273],
          },
          {
            frame: [517, 442, 504, 205],
            offset: [3, -14],
            rotated: !1,
            sourceRect: [9, 48, 504, 205],
            sourceSize: [516, 273],
          },
          {
            frame: [0, 1076, 444, 269],
            offset: [32, 2],
            rotated: !1,
            sourceRect: [68, 0, 444, 269],
            sourceSize: [516, 273],
          },
          {
            frame: [0, 653, 498, 229],
            offset: [9, -14],
            rotated: !1,
            sourceRect: [18, 36, 498, 229],
            sourceSize: [516, 273],
          },
          {
            frame: [484, 1068, 448, 269],
            offset: [29, 0],
            rotated: !1,
            sourceRect: [63, 2, 448, 269],
            sourceSize: [516, 273],
          },
        ];
        b = {
          maxNumGroup: 1,
          minSpeed: 0.5,
          maxSpeed: 0.6,
          regX: 350,
          regY: 130,
          useFrames: !0,
          interval: 10,
        };
        this.translateImage(
          this.shark,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [122, 949, 60, 74],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 74],
            sourceSize: [74, 74],
          },
          {
            frame: [61, 915, 60, 74],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 74],
            sourceSize: [74, 74],
          },
          {
            frame: [244, 1096, 60, 72],
            offset: [0, -1],
            rotated: !1,
            sourceRect: [7, 2, 60, 72],
            sourceSize: [74, 74],
          },
          {
            frame: [0, 915, 60, 74],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 74],
            sourceSize: [74, 74],
          },
          {
            frame: [122, 949, 60, 74],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 74],
            sourceSize: [74, 74],
          },
        ];
        this.translateImage(
          this.cannon,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [917, 1156, 60, 76],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 76],
            sourceSize: [74, 76],
          },
          {
            frame: [490, 1237, 60, 76],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 76],
            sourceSize: [74, 76],
          },
          {
            frame: [551, 1283, 60, 74],
            offset: [0, -1],
            rotated: !1,
            sourceRect: [7, 2, 60, 74],
            sourceSize: [74, 76],
          },
          {
            frame: [565, 1206, 60, 76],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 76],
            sourceSize: [74, 76],
          },
          {
            frame: [917, 1156, 60, 76],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [7, 0, 60, 76],
            sourceSize: [74, 76],
          },
        ];
        this.translateImage(
          this.cannon,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [584, 1129, 62, 76],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [5, 0, 62, 76],
            sourceSize: [74, 76],
          },
          {
            frame: [653, 1127, 62, 76],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [5, 0, 62, 76],
            sourceSize: [74, 76],
          },
          {
            frame: [716, 1140, 62, 72],
            offset: [-1, -2],
            rotated: !1,
            sourceRect: [5, 4, 62, 72],
            sourceSize: [74, 76],
          },
          {
            frame: [726, 1063, 62, 76],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [5, 0, 62, 76],
            sourceSize: [74, 76],
          },
          {
            frame: [584, 1129, 62, 76],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [5, 0, 62, 76],
            sourceSize: [74, 76],
          },
        ];
        this.translateImage(
          this.cannon,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [299, 1012, 64, 83],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [4, 0, 64, 83],
            sourceSize: [74, 83],
          },
          {
            frame: [372, 1010, 64, 83],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [4, 0, 64, 83],
            sourceSize: [74, 83],
          },
          {
            frame: [588, 1049, 64, 79],
            offset: [-1, -2],
            rotated: !1,
            sourceRect: [4, 4, 64, 79],
            sourceSize: [74, 83],
          },
          {
            frame: [372, 1010, 64, 83],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [4, 0, 64, 83],
            sourceSize: [74, 83],
          },
          {
            frame: [299, 1012, 64, 83],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [4, 0, 64, 83],
            sourceSize: [74, 83],
          },
        ];
        this.translateImage(
          this.cannon,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [521, 1e3, 66, 85],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [3, 0, 66, 85],
            sourceSize: [74, 85],
          },
          {
            frame: [594, 963, 66, 85],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [3, 0, 66, 85],
            sourceSize: [74, 85],
          },
          {
            frame: [452, 1007, 66, 79],
            offset: [-1, -3],
            rotated: !1,
            sourceRect: [3, 6, 66, 79],
            sourceSize: [74, 85],
          },
          {
            frame: [669, 879, 66, 85],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [3, 0, 66, 85],
            sourceSize: [74, 85],
          },
          {
            frame: [521, 1e3, 66, 85],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [3, 0, 66, 85],
            sourceSize: [74, 85],
          },
        ];
        this.translateImage(
          this.cannon,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [232, 839, 70, 90],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [1, 0, 70, 90],
            sourceSize: [74, 90],
          },
          {
            frame: [312, 835, 70, 90],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [1, 0, 70, 90],
            sourceSize: [74, 90],
          },
          {
            frame: [529, 835, 70, 82],
            offset: [-1, -4],
            rotated: !1,
            sourceRect: [1, 8, 70, 82],
            sourceSize: [74, 90],
          },
          {
            frame: [385, 833, 70, 90],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [1, 0, 70, 90],
            sourceSize: [74, 90],
          },
          {
            frame: [232, 839, 70, 90],
            offset: [-1, 0],
            rotated: !1,
            sourceRect: [1, 0, 70, 90],
            sourceSize: [74, 90],
          },
        ];
        this.translateImage(
          this.cannon,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        a = [
          {
            frame: [947, 986, 72, 94],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [1, 0, 72, 94],
            sourceSize: [74, 94],
          },
          {
            frame: [947, 891, 72, 94],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [1, 0, 72, 94],
            sourceSize: [74, 94],
          },
          {
            frame: [312, 748, 72, 86],
            offset: [0, -4],
            rotated: !1,
            sourceRect: [1, 8, 72, 86],
            sourceSize: [74, 94],
          },
          {
            frame: [757, 806, 72, 94],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [1, 0, 72, 94],
            sourceSize: [74, 94],
          },
          {
            frame: [947, 986, 72, 94],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [1, 0, 72, 94],
            sourceSize: [74, 94],
          },
        ];
        this.translateImage(
          this.cannon,
          a,
          a[0].sourceSize[0],
          a[0].sourceSize[1],
          !0,
          b
        );
        for (
          var a = [
              {
                frame: [437, 490, 24, 26],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 24, 26],
                sourceSize: [24, 26],
              },
              {
                frame: [436, 577, 25, 29],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 25, 29],
                sourceSize: [25, 29],
              },
              {
                frame: [619, 587, 27, 31],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 27, 31],
                sourceSize: [27, 31],
              },
              {
                frame: [406, 574, 29, 33],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 29, 33],
                sourceSize: [29, 33],
              },
              {
                frame: [406, 471, 30, 34],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 30, 34],
                sourceSize: [30, 34],
              },
              {
                frame: [190, 317, 31, 35],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 31, 35],
                sourceSize: [31, 35],
              },
              {
                frame: [654, 395, 32, 38],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 32, 38],
                sourceSize: [32, 38],
              },
              {
                frame: [190, 353, 30, 44],
                offset: [0, 0],
                rotated: !1,
                sourceRect: [0, 0, 30, 44],
                sourceSize: [30, 44],
              },
            ],
            e = 0;
          e < a.length;
          e++
        ) {
          var d = a[e],
            b = { regX: d.sourceSize[0] >> 1, regY: d.sourceSize[1] >> 1 };
          this.translateImage(
            this.getImage("cannon"),
            [d],
            d.sourceSize[0],
            d.sourceSize[1],
            !0,
            b
          );
        }
        a = [
          {
            frame: [830, 891, 116, 118],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 116, 118],
            sourceSize: [116, 118],
          },
          {
            frame: [619, 736, 137, 142],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 137, 142],
            sourceSize: [137, 142],
          },
          {
            frame: [462, 587, 156, 162],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 156, 162],
            sourceSize: [156, 162],
          },
          {
            frame: [0, 425, 180, 174],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 180, 174],
            sourceSize: [180, 174],
          },
          {
            frame: [242, 436, 163, 155],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 163, 155],
            sourceSize: [163, 155],
          },
          {
            frame: [462, 223, 191, 181],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 191, 181],
            sourceSize: [191, 181],
          },
          {
            frame: [0, 0, 242, 244],
            offset: [0, 0],
            rotated: !1,
            sourceRect: [0, 0, 242, 244],
            sourceSize: [242, 244],
          },
          {
            frame: [701, 0, 226, 220],
            offset: [2, -1],
            rotated: !1,
            sourceRect: [14, 16, 226, 220],
            sourceSize: [250, 250],
          },
        ];
        for (e = 0; e < a.length; e++)
          (d = a[e]),
            (b = { regX: d.sourceSize[0] >> 1, regY: d.sourceSize[1] >> 1 }),
            this.translateImage(
              this.getImage("cannon"),
              [d],
              d.sourceSize[0],
              d.sourceSize[1],
              !0,
              b
            );
      };
      c.translateImage = function (a, b, e, d, c, i) {
        a = this.cacheImage(a, b, e, d, c);
        Q.merge(a, i);
        return a;
      };
      c.cacheImage = function (a, b, e, d, c) {
        var i = Q.createDOM("canvas"),
          g = i.getContext("2d");
        i.width = e;
        i.height = d * b.length;
        for (var f = 0, l = [], k = 0; k < b.length; k++) {
          var f = b[k],
            j = f.frame,
            m = f.rotated,
            n = f.sourceRect || [0, 0];
          g.save();
          f = k * d;
          if (m) {
            var o = j[3];
            j[3] = j[2];
            j[2] = o;
          }
          g.translate(0 + n[0], m ? f + j[2] + n[1] : f + n[1]);
          m && g.rotate((-90 * Math.PI) / 180);
          g.drawImage(a, j[0], j[1], j[2], j[3], 0, 0, j[2], j[3]);
          g.restore();
          l[k] = { rect: [0, f, e, d] };
        }
        trace(JSON.stringify(l));
        return c
          ? ((a = new Image()),
            (a.src = i.toDataURL("image/png")),
            (a.width = i.width),
            (a.height = i.height),
            document.body.appendChild(a),
            { image: a, frames: l })
          : { image: i, frames: l };
      };
      c.getImage = function (a) {
        return this.images[a].image;
      };
    })();
    (function () {
      window.onload = function () {
        setTimeout(function () {
          a.load();
        }, 10);
      };
      var c = Q.use("fish"),
        a = (c.game = {
          container: null,
          width: 480,
          height: 320,
          fps: 60,
          frames: 0,
          params: null,
          events: Q.supportTouch
            ? ["touchstart", "touchend"]
            : ["mousedown", "mouseup"],
          fireInterval: 30,
          fireCount: 0,
        });
      a.load = function (b) {
        Q.isIpod || Q.isIphone
          ? ((this.width = 980),
            (this.height = 545),
            Q.addMeta({ name: "viewport", content: "user-scalable=no" }))
          : (Q.addMeta({
              name: "viewport",
              content:
                "user-scalable=no, initial-scale=1.0, minimum-scale=1, maximum-scale=1",
            }),
            (this.width = Math.min(1024, window.innerWidth)),
            (this.height = Math.min(768, window.innerHeight)));
        this.container = b || Q.getDOM("container");
        this.container.style.width = this.width + "px";
        this.container.style.height = this.height + "px";
        b = Q.createDOM("div", {
          innerHTML: "Đang tải game, vui lòng chờ...<br>",
          style: {
            id: "loader",
            position: "absolute",
            width: this.width + "px",
            left: "0px",
            top: (this.height >> 1) + "px",
            textAlign: "center",
            color: "#fff",
            font: Q.isMobile ? "bold 16px Đen" : "bold 16px Times New Roman",
            textShadow: "0 2px 2px #111",
          },
        });
        this.container.appendChild(b);
        this.loader = b;
        this.hideNavBar();
        if (Q.supportOrientation)
          window.onorientationchange = function () {
            a.hideNavBar();
            a.stage && a.stage.updatePosition();
          };
        b = new Q.ImageLoader();
        b.addEventListener("loaded", Q.delegate(this.onLoadLoaded, this));
        b.addEventListener("complete", Q.delegate(this.onLoadComplete, this));
        b.load(c.R.sources);
      };
      a.onLoadLoaded = function (a) {
        this.loader.innerHTML =
          "Đang tải game, vui lòng chờ...<br>(" +
          Math.round(
            (a.target.getLoadedSize() / a.target.getTotalSize()) * 100
          ) +
          "%)";
      };
      a.onLoadComplete = function (a) {
        a.target.removeAllEventListeners();
        this.init(a.images);
      };
      a.init = function (a) {
        c.R.init(a);
        this.startup();
      };
      a.startup = function () {
        this.container.removeChild(this.loader);
        this.loader = null;
        if (Q.isWebKit && !Q.supportTouch)
          (document.body.style.webkitTouchCallout = "none"),
            (document.body.style.webkitUserSelect = "none"),
            (document.body.style.webkitTextSizeAdjust = "none"),
            (document.body.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
        this.container.style.overflow = "hidden";
        this.container.style.width = this.width + "px";
        this.container.style.height = this.height + "px";
        this.screenWidth = window.innerWidth;
        this.screenHeight = window.innerHeight;
        var a = (this.params = Q.getUrlParams());
        if (a.mode == void 0) a.mode = 2;
        if (a.fps) this.fps = a.fps;
        this.fireInterval = this.fps * 0.5;
        a.mode == 1
          ? ((a = Q.createDOM("canvas", {
              id: "canvas",
              width: this.width,
              height: this.height,
              style: { position: "absolute" },
            })),
            this.container.appendChild(a),
            (this.context = new Q.CanvasContext({ canvas: a })))
          : (this.context = new Q.DOMContext({ canvas: this.container }));
        this.stage = new Q.Stage({
          width: this.width,
          height: this.height,
          context: this.context,
          update: Q.delegate(this.update, this),
        });
        (this.evtManager = new Q.EventManager()).registerStage(
          this.stage,
          this.events,
          !0,
          !0
        );
        this.initUI();
        this.initPlayer();
        this.fishManager = new c.FishManager(this.fishContainer);
        this.fishManager.makeFish();
        a = this.timer = new Q.Timer(1e3 / this.fps);
        a.addListener(this.stage);
        a.addListener(Q.Tween);
        a.start();
        this.showFPS();
      };
      a.initUI = function () {
        this.bg = new Q.Bitmap({
          id: "bg",
          image: c.R.mainbg,
          transformEnabled: !1,
        });
        this.fishContainer = new Q.DisplayObjectContainer({
          id: "fishContainer",
          width: this.width,
          height: this.height,
          eventChildren: !1,
          transformEnabled: !1,
        });
        this.fishContainer.onEvent = function (b) {
          if (b.type == a.events[0] && a.fireCount >= a.fireInterval)
            (a.fireCount = 0), a.player.fire({ x: b.eventX, y: b.eventY });
        };
        this.bottom = new Q.Bitmap(c.R.bottombar);
        this.bottom.id = "bottom";
        this.bottom.x = (this.width - this.bottom.width) >> 1;
        this.bottom.y = this.height - this.bottom.height + 2;
        this.bottom.transformEnabled = !1;
        this.stage.addChild(this.bg, this.fishContainer, this.bottom);
      };
      a.initPlayer = function () {
        this.player = new c.Player({
          id: "quark",
          coin: Number(this.params.coin) || 1e4,
        });
      };
      a.update = function () {
        this.frames++;
        this.fireCount++;
        this.fishManager.update();
      };
      a.testFish = function () {
        for (
          var a = this.params.num || 50, e = c.R.fishTypes.length, d = 0;
          d < a;
          d++
        ) {
          var h = new c.Fish(
            c.R.fishTypes[
              (Math.random() * ((Math.random() * (e - 1)) >> 0) + 1) >> 0
            ]
          );
          h.x = (Math.random() * this.width) >> 0;
          h.y = (Math.random() * this.height) >> 0;
          h.moving = !0;
          h.rotation = (Math.random() * 360) >> 0;
          h.init();
          this.fishContainer.addChild(h);
        }
      };
      a.testFishDirection = function () {
        for (var a = [0, 45, 90, 135, 180, 225, 270, 315], e = 0; e < 8; e++) {
          var d = new c.Fish(c.R.fishTypes[1]);
          d.x = this.width >> 1;
          d.y = this.height >> 1;
          d.speed = 0.5;
          d.setDirection(a[e]);
          d.moving = !0;
          this.stage.addChild(d);
        }
      };
      a.testFishALL = function () {
        for (var a = 0, e = c.R.fishTypes.length, d = 0; d < e - 1; d++) {
          var h = new c.Fish(c.R.fishTypes[d + 1]);
          h.x = d == 9 ? 100 : 100 + Math.floor(d / 5) * 200;
          d == 9 ? (a = 370) : d % 5 == 0 && (a = 50);
          h.y = a + (d % 5) * 20;
          a += h.height;
          h.update = function () {};
          this.stage.addChild(h);
        }
      };
      a.showFPS = function () {
        var a = this,
          e = Quark.getDOM("fps");
        e &&
          setInterval(function () {
            e.innerHTML = "FPS:" + a.frames;
            a.frames = 0;
          }, 1e3);
      };
      a.hideNavBar = function () {
        window.scrollTo(0, 1);
      };
    })();
    (function () {
      var c = Q.use("fish"),
        a = c.game,
        b = (c.FishManager = function (e) {
          this.fishPool = [];
          this.poolSize = a.params.num || 100;
          this.minNumFishScreen = this.poolSize >> 1;
          this.maxNumFishScreen = this.poolSize;
          this.container = e;
          this.fishes = [];
          this.makeCounter = a.fps * 2;
          this.initPool();
        });
      b.prototype.initPool = function () {
        for (var e = 0; e < this.poolSize; e++) {
          var b = new c.Fish(c.R.fishTypes[1]);
          b.getDrawable(a.stage.context);
          this.fishPool[e] = b;
        }
      };
      b.prototype.update = function () {
        for (var e = 0; e < this.fishes.length; e++) {
          var b = this.fishes[e];
          if (b.captured) this.fishes.splice(e, 1), e--;
          else if (b.isOutOfScreen()) {
            if (b.hasShown || b.changeDirCounter < -a.fps * 10)
              this.fishes.splice(e, 1),
                this.fishPool.push(b),
                b.parent.removeChild(b),
                e--;
          } else if (!b.hasShown) b.hasShown = !0;
        }
        if (--this.makeCounter <= 0)
          (this.makeCounter =
            this.fishes.length < this.minNumFishScreen ? a.fps * 2 : a.fps * 3),
            this.makeFish();
      };
      b.prototype.makeFish = function () {
        if (!(this.fishes.length >= this.poolSize)) {
          var b =
              c.R.fishTypes[
                (Math.random() * ((Math.random() * c.R.fishTypes.length) >> 0) +
                  1) >>
                  0
              ],
            d = (Math.random() * b.mixin.maxNumGroup + 1) >> 0;
          if (d > this.fishPool.length) d = this.fishPool.length;
          if (!(d <= 0)) {
            var h = this.fishPool.splice(0, d),
              i = b.frames[0].rect[2],
              i = Math.random() > 0.5 ? -i : a.width + i,
              g = (Math.random() * 200 + (a.height >> 1) - 100) >> 0,
              f =
                Math.random() * (b.mixin.maxSpeed - b.mixin.minSpeed) +
                b.mixin.minSpeed,
              l = (Math.random() * 20 - 10) >> 0;
            i > 0 && (l += 180);
            for (var k = 0; k < d; k++) {
              var j = h[k];
              j.setType(b);
              j.moving = !0;
              j.canTurning = !1;
              j.hasShown = !1;
              j.captured = !1;
              j.speed = f;
              j.changeDirection(l);
              this.fishes.push(j);
              this.container.addChild(j);
            }
            c.FishGroup.setRandomPatten(h, i, g);
          }
        }
      };
    })();
    (function () {
      var c = (Q.use("fish").FishGroup = { pattens: [] });
      c.setRandomPatten = function (a, b, e) {
        var d = this.pattens;
        (0, d[(Math.random() * d.length) >> 0])(a, b, e);
      };
      c.pattens.push(function (a, b, e) {
        for (
          var d = a.length,
            e = { x: b, y: e, width: 0, height: 0 },
            b = b > 0 ? 1 : -1,
            c = 0;
          c < d;
          c++
        ) {
          var i = a[c],
            g = (Math.random() * i.width + 20) >> 0,
            f = (Math.random() * i.height + 20) >> 0;
          Math.random() > 0.5 && (f *= -1);
          i.x = e.x + g * b;
          i.y = e.y + f;
          e = i;
        }
      });
    })();
    (function () {
      (Q.use("fish").Utils = {}).calcDirection = function (c, a) {
        var b;
        c.x == a.x
          ? ((b = a.y > c.y ? Math.PI / 2 : -Math.PI / 2), (b *= Q.RAD_TO_DEG))
          : ((b = Math.atan(1 / ((a.y - c.y) / (a.x - c.x)))),
            (b *= Q.RAD_TO_DEG),
            a.y < c.y ? a.x < c.x && (b += 180) : (b = 90 - b));
        return {
          degree: b,
          sin: Math.sin(b * Q.DEG_TO_RAD),
          cos: Math.cos(b * Q.DEG_TO_RAD),
        };
      };
    })();
    (function () {
      var c = (Q.use("fish").Num = function (a) {
        this.max = 1;
        this.gap = 2;
        this.autoAddZero = this.addSign = !1;
        this.src = null;
        a = a || {};
        c.superClass.constructor.call(this, a);
        this.id = a.id || Q.UIDUtil.createUID("Num");
        this.eventEnabled = this.eventChildren = !1;
        this.autoSize = !0;
        this.init();
      });
      Q.inherit(c, Q.DisplayObjectContainer);
      c.prototype.init = function () {
        for (
          var a = this.addSign ? this.max + 1 : this.max, b = 0;
          b < a;
          b++
        ) {
          var e = this.src[0];
          this.addChild(
            new Q.Bitmap({
              image: this.src.image,
              rect: e,
              x: (e[2] + this.gap) * b,
            })
          );
        }
      };
      c.prototype.setValue = function (a) {
        var b = a.toString(),
          e = this.children.length;
        if (this.autoAddZero)
          for (var d = this.addSign ? e - 1 : e; b.length < d; ) b = "0" + b;
        this.addSign && a > 0 && (b = "+" + b);
        a = e - 1;
        for (e = b.length - 1; a >= 0; a--) {
          var d = this.getChildAt(a),
            c = e >= 0;
          (d.visible = c) && d.setRect(this.src[b.charAt(e)]);
          e--;
        }
      };
    })();
    (function () {
      var c = Q.use("fish"),
        a = c.game,
        b = (c.Fish = function (a) {
          this.type = a;
          this.speed = 0.5;
          this.moving = !0;
          this.captured = this.hasShown = this.canTurning = !1;
          b.superClass.constructor.call(this, a);
          this.id = Q.UIDUtil.createUID("Fish");
        });
      Q.inherit(b, Q.MovieClip);
      b.prototype.init = function () {
        this.changeDirection(this.rotation);
      };
      b.prototype.setType = function (a) {
        Q.merge(this, a, !0);
        Q.merge(this, a.mixin, !1);
        this.setDrawable(a.image);
        this._frames.length = 0;
        this.addFrame(a.frames);
        this.gotoAndPlay(0);
      };
      b.prototype.changeDirection = function (b) {
        if (b != void 0) this.setDirection(b);
        else if (Math.random() > 0.8)
          (b = Math.random() > 0.5 ? 1 : -1),
            (this._destRotation =
              (this.rotation + ((Math.random() * 10 + 20) >> 0) * b) >> 0);
        var b = a.fps,
          c = b * 5;
        this.changeDirCounter = (Math.random() * (b * 10 - c + 1) + c) >> 1;
      };
      b.prototype.setDirection = function (a) {
        if (!(this.rotation == a && this.speedX != void 0)) {
          if (a.degree == void 0)
            var b = a * Q.DEG_TO_RAD,
              a = { degree: a, sin: Math.sin(b), cos: Math.cos(b) };
          this.rotation = a.degree % 360;
          this.speedX = this.speed * a.cos;
          this.speedY = this.speed * a.sin;
        }
      };
      b.prototype.canBeCaptured = function (a) {
        return this.captureRate * (1 + a * 0.05) > Math.random();
      };
      b.prototype.update = function () {
        if (this.captured) {
          if (--this.capturingCounter <= 0) {
            var b = new Q.MovieClip(
              this.coin >= 10 ? c.R.coinAni2 : c.R.coinAni1
            );
            b.x = this.x;
            b.y = this.y;
            this.parent.addChild(b);
            var d = "+" + this.coin.toString(),
              h = new c.Num({
                id: "coinCount",
                src: c.R.coinText,
                max: d.length,
                gap: 3,
                scaleX: 0.8,
                scaleY: 0.8,
              });
            h.x = this.x;
            h.y = this.y;
            h.setValue(d);
            this.parent.addChild(h);
            Q.Tween.to(
              h,
              { y: h.y - 50 },
              {
                time: 800,
                onComplete: function (a) {
                  a.target.parent.removeChild(a.target);
                },
              }
            );
            Q.Tween.to(
              b,
              { x: a.bottom.x + 100, y: a.height },
              {
                time: 800,
                onComplete: function (a) {
                  a.target.parent.removeChild(a.target);
                },
              }
            );
            this.parent.removeChild(this);
            a.player.captureFish(this);
            a.fishManager.fishPool.push(this);
          }
        } else
          this.moving && ((this.x += this.speedX), (this.y += this.speedY)),
            this._destRotation != null
              ? ((b = this._destRotation - this.rotation),
                (d = b > 0 ? 0.1 : -0.1),
                (h = this.rotation + d),
                b == 0 ||
                (d > 0 && h >= this._destRotation) ||
                (d < 0 && h <= this._destRotation)
                  ? (this.setDirection(this._destRotation),
                    (this._destRotation = null))
                  : this.setDirection(h))
              : --this.changeDirCounter <= 0 &&
                this.canTurning &&
                this.changeDirection();
      };
      b.prototype.isOutOfScreen = function () {
        if (
          this.x < -this.width ||
          this.x > a.width + this.width ||
          this.y < -this.height ||
          this.y > a.height + this.height
        )
          return !0;
        else if (
          this.x > 100 &&
          this.x < a.width - 100 &&
          this.y > 100 &&
          this.y < a.height - 100
        )
          this.canTurning = !0;
        return !1;
      };
    })();
    (function () {
      var c = Q.use("fish"),
        a = c.game,
        b = (c.Player = function (a) {
          this.id = null;
          this.numCapturedFishes = this.coin = 0;
          this.coinNum =
            this.cannonPlus =
            this.cannonMinus =
            this.cannon =
              null;
          a = a || {};
          Q.merge(this, a, !0);
          this.init();
        });
      b.prototype.init = function () {
        var b = this;
        this.cannon = new c.Cannon(c.R.cannonTypes[1]);
        this.cannon.id = "cannon";
        this.cannon.x = a.bottom.x + 425;
        this.cannon.y = a.bottom.y + 60;
        this.cannon.y = a.height - 10;
        this.cannonMinus = new Q.Button(c.R.cannonMinus);
        this.cannonMinus.id = "cannonMinus";
        this.cannonMinus.x = a.bottom.x + 340;
        this.cannonMinus.y = a.bottom.y + 36;
        this.cannonMinus.onEvent = function (c) {
          c.type == a.events[1] && b.cannon.setPower(-1, !0);
        };
        this.cannonPlus = new Q.Button(c.R.cannonPlus);
        this.cannonPlus.id = "cannonPlus";
        this.cannonPlus.x = this.cannonMinus.x + 140;
        this.cannonPlus.y = this.cannonMinus.y;
        this.cannonPlus.onEvent = function (c) {
          c.type == a.events[1] && b.cannon.setPower(1, !0);
        };
        this.coinNum = new c.Num({
          id: "coinNum",
          src: c.R.numBlack,
          max: 6,
          gap: 3,
          autoAddZero: !0,
        });
        this.coinNum.x = a.bottom.x + 20;
        this.coinNum.y = a.bottom.y + 44;
        this.updateCoin(this.coin);
        a.stage.addChild(
          this.cannon,
          this.cannonMinus,
          this.cannonPlus,
          this.coinNum
        );
      };
      b.prototype.fire = function (b) {
        var d = this.cannon,
          h = d.power;
        if (!(this.coin < h)) {
          b = c.Utils.calcDirection(d, b).degree;
          b == -90
            ? (b = 0)
            : b < 0 && b > -90
            ? (b = -b)
            : b >= 180 && b <= 270 && (b = 180 - b);
          d.fire(b);
          var i = Math.sin(b * Q.DEG_TO_RAD),
            g = Math.cos(b * Q.DEG_TO_RAD),
            f = new c.Bullet(c.R.bullets[h - 1]);
          f.x = d.x + (d.regY + 20) * i;
          f.y = d.y - (d.regY + 20) * g;
          f.rotation = b;
          f.power = h;
          f.speedX = 5 * i;
          f.speedY = 5 * g;
          a.stage.addChild(f);
          this.updateCoin(-h, !0);
        }
      };
      b.prototype.captureFish = function (a) {
        this.updateCoin(a.coin, !0);
        this.numCapturedFishes++;
      };
      b.prototype.updateCoin = function (a, b) {
        b ? (this.coin += a) : (this.coin = a);
        if (this.coin > 999999) this.coin = 999999;
        this.coinNum.setValue(this.coin);
      };
    })();
    (function () {
      var c = Q.use("fish"),
        a = (c.Cannon = function (b) {
          this.power = 0;
          a.superClass.constructor.call(this, b);
          this.stop();
        });
      Q.inherit(a, Q.MovieClip);
      a.prototype.setPower = function (a, e) {
        e && (a += this.power);
        a = a > 7 ? 1 : a < 1 ? 7 : a;
        if (this.power != a) (this.power = a), this.setType(c.R.cannonTypes[a]);
      };
      a.prototype.setType = function (a) {
        Q.merge(this, a, !0);
        Q.merge(this, a.mixin, !1);
        this.setDrawable(a.image);
        this._frames.length = 0;
        this.addFrame(a.frames);
        this.gotoAndStop(0);
      };
      a.prototype.fire = function (a) {
        this.rotation = a;
        this.gotoAndPlay(0);
      };
    })();
    (function () {
      var c = Q.use("fish"),
        a = c.game,
        b = (c.Bullet = function (a) {
          this.speedY = this.speedX = this.power = 0;
          b.superClass.constructor.call(this, a);
          this.id = Q.UIDUtil.createUID("Bullet");
        });
      Q.inherit(b, Q.Bitmap);
      b.prototype.update = function () {
        this.isOutOfScreen()
          ? this.destory()
          : ((this.x += this.speedX),
            (this.y -= this.speedY),
            this.checkCollision() && this.destory());
      };
      b.prototype.checkCollision = function () {
        for (
          var b = a.fishManager.fishes, d = b.length, h = !1, i = 0;
          i < d;
          i++
        ) {
          var g = b[i];
          if (
            !(
              this.y - this.height * 0.5 > g.y + g.height * 0.5 ||
              this.y + this.height * 0.5 < g.y - g.height * 0.5 ||
              this.x - this.width * 0.5 > g.x + g.width * 0.5 ||
              this.x + this.width * 0.5 < g.x - g.width * 0.5
            ) &&
            this.hitTestObject(g, !0)
          ) {
            h = !0;
            break;
          }
        }
        if (h === !1) return !1;
        var f = new Q.Bitmap(c.R.webs[this.power - 1]);
        f.x = this.x;
        f.y = this.y;
        f.scaleX = f.scaleY = 0.8;
        f.eventEnabled = !1;
        this.parent.addChild(f);
        Q.Tween.to(
          f,
          { scaleX: 1, scaleY: 1 },
          {
            time: 100,
            reverse: !0,
            onComplete: function (a) {
              a.reversing && f.parent && f.parent.removeChild(f);
              a.reversing = !0;
            },
          }
        );
        for (i = 0; i < d; i++)
          if (
            ((g = b[i]),
            !(
              f.y - f.height * 0.5 > g.y + g.height * 0.5 ||
              f.y + f.height * 0.5 < g.y - g.height * 0.5 ||
              f.x - f.width * 0.5 > g.x + g.width * 0.5 ||
              f.x + f.width * 0.5 < g.x - g.width * 0.5
            ) &&
              f.hitTestObject(g, !0) &&
              g.canBeCaptured(this.power - 1))
          )
            (g.moving = !1),
              (g.captured = !0),
              (g.capturingCounter = a.fps >> 1),
              g.gotoAndPlay("capture");
        return !0;
      };
      b.prototype.destory = function () {
        this.parent.removeChild(this);
      };
      b.prototype.isOutOfScreen = function () {
        return (
          this.x < -50 ||
          this.x > a.width + 50 ||
          this.y < -50 ||
          this.y > a.height + 50
        );
      };
    })();
  });
  return (
    <div>
      <Link
        to="/mini-game"
        className="px-4 mt-5 fixed rounded-lg  py-2 bg-slate-400 text-white "
      >
        Về trang chủ
      </Link>

      <div id="outer">
        <div id="middle">
          <div
            id="container"
            className="relative w-full h-full m-auto"
            // style="position:relative;width:980px;height:545px;top:-50%;margin:0 auto;"
          ></div>
          <div id="msg"></div>
        </div>
      </div>
      <div
        id="fps"
        className="absolute top-0 left-0 text-white"

        //   style="position:absolute;top:0;left:0;color:#fff;"
      ></div>
    </div>
  );
};

export default GameBanCa;
