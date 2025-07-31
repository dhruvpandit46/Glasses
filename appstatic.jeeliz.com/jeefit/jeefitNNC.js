var JEELIZVTO = (function() {
    var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, d) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = d.value;
        return a
    }
    ;
    function fa(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var d = a[b];
            if (d && d.Math == Math)
                return d
        }
        throw Error("Cannot find global object");
    }
    var ha = fa(this);
    function qa(a, b) {
        if (b)
            a: {
                var d = ha;
                a = a.split(".");
                for (var f = 0; f < a.length - 1; f++) {
                    var n = a[f];
                    if (!(n in d))
                        break a;
                    d = d[n]
                }
                a = a[a.length - 1];
                f = d[a];
                b = b(f);
                b != f && null != b && ba(d, a, {
                    configurable: !0,
                    writable: !0,
                    value: b
                })
            }
    }
    function ta(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    function ua(a) {
        var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
        if (b)
            return b.call(a);
        if ("number" == typeof a.length)
            return {
                next: ta(a)
            };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }
    qa("Promise", function(a) {
        function b(p) {
            this.Ba = 0;
            this.Sa = void 0;
            this.ia = [];
            this.kh = !1;
            var g = this.Rc();
            try {
                p(g.resolve, g.reject)
            } catch (k) {
                g.reject(k)
            }
        }
        function d() {
            this.ia = null
        }
        function f(p) {
            return p instanceof b ? p : new b(function(g) {
                g(p)
            }
            )
        }
        if (a)
            return a;
        d.prototype.Ba = function(p) {
            if (null == this.ia) {
                this.ia = [];
                var g = this;
                this.Sa(function() {
                    g.Uc()
                })
            }
            this.ia.push(p)
        }
        ;
        var n = ha.setTimeout;
        d.prototype.Sa = function(p) {
            n(p, 0)
        }
        ;
        d.prototype.Uc = function() {
            for (; this.ia && this.ia.length; ) {
                var p = this.ia;
                this.ia = [];
                for (var g = 0; g < p.length; ++g) {
                    var k = p[g];
                    p[g] = null;
                    try {
                        k()
                    } catch (r) {
                        this.Rc(r)
                    }
                }
            }
            this.ia = null
        }
        ;
        d.prototype.Rc = function(p) {
            this.Sa(function() {
                throw p;
            })
        }
        ;
        b.prototype.Rc = function() {
            function p(r) {
                return function(w) {
                    k || (k = !0,
                    r.call(g, w))
                }
            }
            var g = this
              , k = !1;
            return {
                resolve: p(this.vk),
                reject: p(this.Uc)
            }
        }
        ;
        b.prototype.vk = function(p) {
            if (p === this)
                this.Uc(new TypeError("A Promise cannot resolve to itself"));
            else if (p instanceof b)
                this.yk(p);
            else {
                a: switch (typeof p) {
                case "object":
                    var g = null != p;
                    break a;
                case "function":
                    g = !0;
                    break a;
                default:
                    g = !1
                }
                g ? this.uk(p) : this.bk(p)
            }
        }
        ;
        b.prototype.uk = function(p) {
            var g = void 0;
            try {
                g = p.then
            } catch (k) {
                this.Uc(k);
                return
            }
            "function" == typeof g ? this.zk(g, p) : this.bk(p)
        }
        ;
        b.prototype.Uc = function(p) {
            this.lh(2, p)
        }
        ;
        b.prototype.bk = function(p) {
            this.lh(1, p)
        }
        ;
        b.prototype.lh = function(p, g) {
            if (0 != this.Ba)
                throw Error("Cannot settle(" + p + ", " + g + "): Promise already settled in state" + this.Ba);
            this.Ba = p;
            this.Sa = g;
            2 === this.Ba && this.xk();
            this.rk()
        }
        ;
        b.prototype.xk = function() {
            var p = this;
            n(function() {
                if (p.sk()) {
                    var g = ha.console;
                    "undefined" !== typeof g && g.error(p.Sa)
                }
            }, 1)
        }
        ;
        b.prototype.sk = function() {
            if (this.kh)
                return !1;
            var p = ha.CustomEvent
              , g = ha.Event
              , k = ha.dispatchEvent;
            if ("undefined" === typeof k)
                return !0;
            "function" === typeof p ? p = new p("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof g ? p = new g("unhandledrejection",{
                cancelable: !0
            }) : (p = ha.document.createEvent("CustomEvent"),
            p.initCustomEvent("unhandledrejection", !1, !0, p));
            p.promise = this;
            p.reason = this.Sa;
            return k(p)
        }
        ;
        b.prototype.rk = function() {
            if (null != this.ia) {
                for (var p = 0; p < this.ia.length; ++p)
                    t.Ba(this.ia[p]);
                this.ia = null
            }
        }
        ;
        var t = new d;
        b.prototype.yk = function(p) {
            var g = this.Rc();
            p.qd(g.resolve, g.reject)
        }
        ;
        b.prototype.zk = function(p, g) {
            var k = this.Rc();
            try {
                p.call(g, k.resolve, k.reject)
            } catch (r) {
                k.reject(r)
            }
        }
        ;
        b.prototype.then = function(p, g) {
            function k(v, x) {
                return "function" == typeof v ? function(y) {
                    try {
                        r(v(y))
                    } catch (m) {
                        w(m)
                    }
                }
                : x
            }
            var r, w, H = new b(function(v, x) {
                r = v;
                w = x
            }
            );
            this.qd(k(p, r), k(g, w));
            return H
        }
        ;
        b.prototype.catch = function(p) {
            return this.then(void 0, p)
        }
        ;
        b.prototype.qd = function(p, g) {
            function k() {
                switch (r.Ba) {
                case 1:
                    p(r.Sa);
                    break;
                case 2:
                    g(r.Sa);
                    break;
                default:
                    throw Error("Unexpected state: " + r.Ba);
                }
            }
            var r = this;
            null == this.ia ? t.Ba(k) : this.ia.push(k);
            this.kh = !0
        }
        ;
        b.resolve = f;
        b.reject = function(p) {
            return new b(function(g, k) {
                k(p)
            }
            )
        }
        ;
        b.race = function(p) {
            return new b(function(g, k) {
                for (var r = ua(p), w = r.next(); !w.done; w = r.next())
                    f(w.value).qd(g, k)
            }
            )
        }
        ;
        b.all = function(p) {
            var g = ua(p)
              , k = g.next();
            return k.done ? f([]) : new b(function(r, w) {
                function H(y) {
                    return function(m) {
                        v[y] = m;
                        x--;
                        0 == x && r(v)
                    }
                }
                var v = []
                  , x = 0;
                do
                    v.push(void 0),
                    x++,
                    f(k.value).qd(H(v.length - 1), w),
                    k = g.next();
                while (!k.done)
            }
            )
        }
        ;
        return b
    });
    qa("Math.log2", function(a) {
        return a ? a : function(b) {
            return Math.log(b) / Math.LN2
        }
    });
    var va = "function" == typeof Object.assign ? Object.assign : function(a, b) {
        for (var d = 1; d < arguments.length; d++) {
            var f = arguments[d];
            if (f)
                for (var n in f)
                    Object.prototype.hasOwnProperty.call(f, n) && (a[n] = f[n])
        }
        return a
    }
    ;
    qa("Object.assign", function(a) {
        return a || va
    });
    function ya(a, b, d) {
        a instanceof String && (a = String(a));
        for (var f = a.length, n = 0; n < f; n++) {
            var t = a[n];
            if (b.call(d, t, n, a))
                return {
                    wi: n,
                    lk: t
                }
        }
        return {
            wi: -1,
            lk: void 0
        }
    }
    qa("Array.prototype.find", function(a) {
        return a ? a : function(b, d) {
            return ya(this, b, d).lk
        }
    });
    qa("Object.is", function(a) {
        return a ? a : function(b, d) {
            return b === d ? 0 !== b || 1 / b === 1 / d : b !== b && d !== d
        }
    });
    qa("Array.prototype.includes", function(a) {
        return a ? a : function(b, d) {
            var f = this;
            f instanceof String && (f = String(f));
            var n = f.length;
            d = d || 0;
            for (0 > d && (d = Math.max(d + n, 0)); d < n; d++) {
                var t = f[d];
                if (t === b || Object.is(t, b))
                    return !0
            }
            return !1
        }
    });
    qa("String.prototype.includes", function(a) {
        return a ? a : function(b, d) {
            if (null == this)
                throw new TypeError("The 'this' value for String.prototype.includes must not be null or undefined");
            if (b instanceof RegExp)
                throw new TypeError("First argument to String.prototype.includes must not be a regular expression");
            return -1 !== this.indexOf(b, d || 0)
        }
    });
    qa("Array.prototype.findIndex", function(a) {
        return a ? a : function(b, d) {
            return ya(this, b, d).wi
        }
    });
    qa("Promise.prototype.finally", function(a) {
        return a ? a : function(b) {
            return this.then(function(d) {
                return Promise.resolve(b()).then(function() {
                    return d
                })
            }, function(d) {
                return Promise.resolve(b()).then(function() {
                    throw d;
                })
            })
        }
    });
    qa("Math.sign", function(a) {
        return a ? a : function(b) {
            b = Number(b);
            return 0 === b || isNaN(b) ? b : 0 < b ? 1 : -1
        }
    });
    var c = {
        Hh: !0,
        bq: !1,
        cq: !1,
        Dl: !1,
        Gh: !1,
        aq: !1,
        Ta: !1,
        Od: !1,
        Pq: !1,
        ea: "",
        Vi: "",
        al: 700,
        $k: 200,
        Ih: !1,
        qp: !1,
        rp: !1,
        pp: !1,
        Ik: 3,
        Sb: !1,
        sh: !0,
        Pb: "images/backgrounds/interior2.jpg",
        zc: "images/backgrounds/interior_light.jpg",
        cl: [256, 256, 512, 512],
        yc: 2.1,
        Ac: 8,
        bl: [64, 128, 256, 256],
        Vm: [60, 96, 160, 250],
        Um: [8, 12, 18, 40],
        Wc: 2.2,
        qg: 1,
        Ue: 300,
        xh: 500,
        Ve: 50,
        ml: 0,
        nl: 0,
        Rp: 45,
        Tp: 1,
        Sp: 1E3,
        yh: 20,
        Hp: 10,
        Jp: 10,
        Kp: 5,
        Pn: .1,
        cj: 20,
        fj: 100,
        gj: 100,
        On: -Math.PI / 3,
        Nn: Math.PI / 3,
        ej: 0,
        Xj: 0,
        Ad: [40, 32, 16, 16],
        Gk: [0, .87, .92, .9],
        Kn: 2,
        En: 100,
        ga_: !1,
        Jk: 16,
        Kk: .4,
        Mk: [.72, .73, .72, .74],
        Wk: 1.2,
        Tk: [.5, .5, .5, 1],
        Yk: 140,
        Xk: 280,
        Zk: 1.2,
        Nk: 20,
        Ok: 40,
        Vk: [6, 9, 9, 12],
        Sk: [.03, .02, .02, .018],
        Rk: [.35, .35, .4, .5],
        Pk: [.2, .2, .2, .2],
        Lk: [.1, .15, .15, .15],
        Uk: [200, 200, 150, 120],
        Qk: [1, 2, 3, 5],
        Xo: 1.1,
        ir: [.25, .5, 1, 2],
        jr: 256,
        hr: 256,
        gr: 200,
        Yo: [40, 80, 200, 500],
        Zo: [35, 45, 80, 120],
        yl: !0,
        zl: "CCW"
    };
    function Ia(a, b) {
        return a[0] * (1 - b) + a[1] * b
    }
    function Ja(a, b) {
        var d = new XMLHttpRequest;
        d.open("GET", a, !0);
        d.withCredentials = !1;
        d.onreadystatechange = function() {
            4 !== d.readyState || 200 !== d.status && 0 !== d.status || b(d.responseText)
        }
        ;
        d.send()
    }
    function Ka(a, b) {
        Ja(a + "", function(d) {
            b(JSON.parse(d))
        })
    }
    function Pa(a, b) {
        if (0 === b || "object" !== typeof a)
            return a;
        a = Object.assign({}, a);
        b = void 0 === b || -1 === b ? -1 : b - 1;
        for (var d in a)
            a[d] = Pa(a[d], b);
        return a
    }
    function Qa(a) {
        return .5 > a ? 4 * a * a * a : (a - 1) * (2 * a - 2) * (2 * a - 2) + 1
    }
    var Ra = {};
    function Xa(a) {
        switch (a) {
        case "relu":
            return "gl_FragColor=max(vec4(0.),gl_FragColor);";
        case "elu":
            return "gl_FragColor=mix(exp(-abs(gl_FragColor))-vec4(1.),gl_FragColor,step(0.,gl_FragColor));";
        case "elu01":
            return "gl_FragColor=mix(0.1*exp(-abs(gl_FragColor))-vec4(0.1),gl_FragColor,step(0.,gl_FragColor));";
        case "arctan":
            return "gl_FragColor=atan(3.14159265359*texture2D(u0,vUV))/3.14159265359;";
        case "copy":
            return "";
        case "gelu":
            return "gl_FragColor=gl_FragColor;\n          vec4 zou=gl_FragColor;\n          vec4 polyZou=0.7978845608028654*(zou+0.044715*zou*zou*zou);\n          vec4 exZou=exp(-abs(polyZou));\n          vec4 exZou2=exZou*exZou;\n          vec4 tanhZou=sign(polyZou)*(vec4(1.)-exZou2)/(vec4(1.)+exZou2);\n          gl_FragColor=0.5*zou*(vec4(1.)+tanhZou);";
        default:
            return !1
        }
    }
    function db(a, b) {
        return a[b >> 3] >> 7 - (b & 7) & 1
    }
    function eb(a, b, d) {
        for (var f = 0, n = 0; n < d; n++)
            f = f << 1 | db(a, b + n);
        return f
    }
    function gb(a) {
        var b = null;
        a = a.data;
        "undefined" === typeof btoa && "undefined" !== typeof Buffer ? b = Buffer.from(a, "base64").toString("latin1") : b = atob(a);
        a = b.length;
        for (var d = new Uint8Array(a), f = 0; f < a; ++f)
            d[f] = b.charCodeAt(f);
        return d
    }
    function hb(a) {
        return "string" === typeof a ? JSON.parse(a) : a
    }
    function ib(a) {
        return "undefined" === typeof hb(a).nb ? jb(a) : lb(a)
    }
    function lb(a) {
        var b = hb(a);
        a = b.nb;
        if (0 === a)
            return new Uint8Array(b.nb);
        var d = b.n;
        b = gb(b);
        for (var f = new Uint32Array(d), n = 0; n < d; ++n)
            f[n] = eb(b, n * a, a);
        return f
    }
    function jb(a) {
        var b = hb(a);
        a = b.ne;
        var d = b.nf
          , f = b.n;
        b = gb(b);
        for (var n = new Float32Array(f), t = new Float32Array(d), p = a + d + 1, g = new Float32Array(d), k = .5, r = 0; r < d; r++)
            g[r] = k,
            k *= .5;
        for (k = 0; k < f; ++k) {
            var w = p * k;
            r = 0 === db(b, w) ? 1 : -1;
            var H = eb(b, w + 1, a)
              , v = b;
            w = w + 1 + a;
            for (var x = t.length, y = 0, m = w; m < w + x; ++m)
                t[y] = db(v, m),
                ++y;
            for (w = v = 0; w < d; ++w)
                v += t[w] * g[w];
            n[k] = 0 === v && 0 === H ? 0 : r * (1 + v) * Math.pow(2, 1 + H - Math.pow(2, a - 1))
        }
        return n
    }
    var J = function() {
        function a(A, u, N) {
            u = A.createShader(u);
            A.shaderSource(u, N);
            A.compileShader(u);
            return A.getShaderParameter(u, A.COMPILE_STATUS) ? u : null
        }
        function b(A, u, N) {
            u = a(A, A.VERTEX_SHADER, u);
            N = a(A, A.FRAGMENT_SHADER, N);
            A === C && g.push(u, N);
            var R = A.createProgram();
            A.attachShader(R, u);
            A.attachShader(R, N);
            A.linkProgram(R);
            return R
        }
        function d(A) {
            return ["float", "sampler2D", "int"].map(function(u) {
                return "precision " + A + " " + u + ";\n"
            }).join("")
        }
        function f(A, u) {
            u.R = u.R ? !0 : !1;
            if (!u.R) {
                u.v = u.v || "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5);}";
                u.K = u.K || ["a0"];
                u.S = u.S || [2];
                u.precision = u.precision || v;
                u.id = w++;
                void 0 !== u.uj && (u.uj.forEach(function(T, aa) {
                    u.g = u.g.replace(T, u.Ka[aa])
                }),
                u.uj.splice(0));
                u.hh = 0;
                u.S.forEach(function(T) {
                    u.hh += 4 * T
                });
                var N = d(u.precision);
                u.ra = b(A, N + u.v, N + u.g);
                u.B = {};
                u.i.forEach(function(T) {
                    u.B[T] = A.getUniformLocation(u.ra, T)
                });
                u.attributes = {};
                u.ya = [];
                u.K.forEach(function(T) {
                    var aa = A.getAttribLocation(u.ra, T);
                    u.attributes[T] = aa;
                    u.ya.push(aa)
                });
                if (u.o) {
                    A.useProgram(u.ra);
                    r = u;
                    k = u.id;
                    for (var R in u.o)
                        A.uniform1i(u.B[R], u.o[R])
                }
                u.Qa = !0
            }
        }
        function n(A) {
            mb.Lj(I);
            k !== A.id && (I.M(),
            k = A.id,
            r = A,
            C.useProgram(A.ra),
            A.ya.forEach(function(u) {
                0 !== u && C.enableVertexAttribArray(u)
            }))
        }
        function t(A, u, N) {
            f(A, u, N);
            A.useProgram(u.ra);
            A.enableVertexAttribArray(u.attributes.a0);
            k = -1;
            return r = u
        }
        function p() {
            return {
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1"],
                o: {
                    u1: 0
                }
            }
        }
        var g = []
          , k = -1
          , r = null
          , w = 0
          , H = !1
          , v = "highp"
          , x = ["u1"]
          , y = ["u0"]
          , m = {
            u1: 0
        }
          , l = {
            u0: 0
        }
          , E = {
            u1: 0,
            u2: 1
        }
          , L = {
            u1: 0,
            u3: 1
        }
          , B = ["u1", "u3", "u4"]
          , D = ["u5", "u6"]
          , e = {
            u5: 0
        }
          , q = ["u7", "u8", "u9", "u10"]
          , z = {
            u7: 0,
            u8: 1
        }
          , O = {
            s0: p(),
            s1: {
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: x,
                o: m,
                precision: "lowp"
            },
            s2: {
                g: "uniform sampler2D u1,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a*b;}",
                i: ["u1", "u2"],
                o: E
            },
            s3: {
                g: "uniform sampler2D u1;uniform vec2 u11,u12;varying vec2 vv0;void main(){vec2 a=vv0*u11+u12;gl_FragColor=texture2D(u1,a);}",
                i: ["u1", "u11", "u12"],
                o: m,
                R: !0
            },
            s4: {
                g: "uniform sampler2D u1;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a.r*f;}",
                i: x,
                o: m
            },
            s5: {
                g: "uniform sampler2D u1,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u1,vv0);gl_FragColor=a.a*b.r*f;}",
                i: ["u1", "u2"],
                o: E
            },
            s6: {
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(1.-vv0.x,vv0.y));}",
                i: x,
                o: m
            },
            s7: {
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(vv0.x,1.-vv0.y));}",
                i: x,
                o: m
            },
            s8: {
                g: "uniform sampler2D u0;uniform float u11;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*u11;}",
                i: ["u0", "u11"],
                o: l
            },
            s9: {
                g: "uniform sampler2D u0;uniform float u11;varying vec2 vv0;const vec4 f=vec4(.25),g=vec4(1.);void main(){vec4 a=texture2D(u0,vv0);float b=dot(a*u11,f);gl_FragColor=b*g;}",
                i: ["u0", "u11"],
                o: l
            },
            s10: {
                g: "uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u1,vv0));gl_FragColor=a*e;}",
                i: x,
                o: m
            },
            s11: {
                g: "uniform sampler2D u1,u13;uniform float u14;const vec4 f=vec4(1.);varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u13,vv0);gl_FragColor=mix(b,a,u14*f);}",
                i: ["u1", "u13", "u14"],
                o: {
                    u1: 0,
                    u13: 1
                }
            },
            s12: {
                g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u1,vv0+u15)+texture2D(u1,vv0+u15*vec2(1.,-1.))+texture2D(u1,vv0+u15*vec2(-1.,-1.))+texture2D(u1,vv0+u15*vec2(-1.,1.)));}",
                i: ["u1", "u15"],
                o: m
            },
            s13: {
                g: "uniform sampler2D u1;varying vec2 vv0;vec4 f(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),g=exp2(c);vec3 h=clamp(b/g,0.,1.);return vec4(h,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=f(a);}",
                i: x,
                o: m,
                R: !0
            },
            s14: {
                g: "uniform sampler2D u1;varying vec2 vv0;vec3 f(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=vec4(f(a),1.);}",
                i: x,
                o: m,
                R: !0
            },
            s15: {
                g: "uniform sampler2D u1;uniform vec4 u16;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 j(float a){if(a==0.)return vec4(0.,0.,0.,0.);float k=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),l=c+127.,b=(a/exp2(c)-1.)*8388608.,d=l/2.,m=fract(d)*2.,n=floor(d),o=e(b,0.,8.),p=e(b,8.,16.),q=m*128.+e(b,16.,23.),r=k+n;return vec4(o,p,q,r)/255.;}void main(){float a=dot(texture2D(u1,vv0),u16);gl_FragColor=j(a);}",
                i: ["u1", "u16"],
                o: m
            },
            s16: {
                g: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u0,vv0),b=e/(e+exp(-a));gl_FragColor=b;}",
                i: y,
                o: l,
                R: !0
            },
            s17: {
                g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=max(f,a);}",
                i: y,
                o: l,
                R: !0
            },
            s18: {
                g: "uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.);const float g=.797885,h=.044715;vec4 i(vec4 a){vec4 b=exp(-abs(a)),c=b*b,d=sign(a)*(e-c)/(e+c);return d;}void main(){vec4 a=texture2D(u0,vv0),b=a+h*a*a*a,c=i(g*b);gl_FragColor=.5*a*(e+c);}",
                i: y,
                o: l,
                R: !0
            },
            s19: {
                g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=mix(exp(-abs(a))-f,a,step(0.,a));}",
                i: y,
                o: l,
                R: !0
            },
            s20: {
                g: "uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.);void main(){vec4 a=texture2D(u0,vv0),b=exp(a)-f;gl_FragColor=mix(.1*b,a,step(0.,a));}",
                i: y,
                o: l
            },
            s21: {
                g: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=atan(e*texture2D(u0,vv0))/e;}",
                i: y,
                o: l
            },
            s22: {
                g: "uniform sampler2D u0;const float e=3.141593;varying vec2 vv0;void main(){gl_FragColor=2.*atan(e*texture2D(u0,vv0))/e;}",
                i: y,
                o: l,
                R: !0
            },
            s23: {
                g: "uniform sampler2D u0,u17;uniform float u18;const vec2 e=vec2(.5);const float f=1e-5;const vec4 g=vec4(1.),i=vec4(0.);varying vec2 vv0;void main(){vec4 a=texture2D(u17,e);float b=u18*u18;vec4 c=max(b*a,f*g);gl_FragColor=texture2D(u0,vv0)/c;}",
                i: ["u0", "u17", "u18"],
                o: {
                    u0: 0,
                    u17: 1
                },
                R: !0
            },
            s24: {
                g: "uniform sampler2D u1;uniform vec2 u19;varying vec2 vv0;void main(){float a=u19.x*u19.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u19.y),f=floor(u19.x*fract(b*u19.y)),g=(f*u19.y+d)/a;gl_FragColor=texture2D(u1,g+c/a);}",
                i: ["u1", "u19"],
                o: m
            },
            s25: {
                g: "uniform sampler2D u8,u7,u20;varying vec2 vv0;void main(){vec4 a=texture2D(u20,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u8,b),f=texture2D(u7,c);gl_FragColor=d*f;}",
                i: ["u8", "u7", "u20"],
                o: Object.assign({
                    u20: 2
                }, z),
                R: !0
            },
            s26: {
                g: "uniform float u9,u10;uniform sampler2D u8,u7;varying vec2 vv0;void main(){vec2 b=fract(vv0*u9);float a=u9*u10;vec2 c=(vec2(.5)+floor(a*vv0))/a;vec4 d=texture2D(u8,c),f=texture2D(u7,b);gl_FragColor=d*f;}",
                i: q,
                o: z
            },
            s27: {
                g: "uniform float u9,u10;uniform vec2 u21;uniform sampler2D u8,u7;varying vec2 vv0;void main(){float a=u9*u10;vec2 b=mod(vv0*u21,vec2(1.)),c=floor(vv0*u21)/u21,d=c+fract(b*u9)/u21,f=(vec2(.5)+floor(a*b))/a;vec4 g=texture2D(u8,f),h=texture2D(u7,d);gl_FragColor=g*h;}",
                i: ["u21"].concat(q),
                o: z,
                R: !0
            },
            s28: {
                g: "uniform float u9,u10;uniform sampler2D u8,u7,u23,u24,u25,u26;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 c=fract(vv0*u9),d=vv0;float h=u9*u10;d=(.5+floor(h*vv0))/h;vec4 l=texture2D(u8,d),m=texture2D(u7,c),a=texture2D(u26,d);a=floor(.5+a*255.);vec4 n=texture2D(u23,c),o=texture2D(u24,c),p=texture2D(u25,c),i=step(-g,-a),b=e-i,j=b*step(-e-g,-a);b*=e-j;vec4 k=b*step(-2.*e-g,-a);b*=e-k;vec4 q=b,r=i*m+j*n+k*o+q*p;gl_FragColor=l*r;}",
                i: ["u26", "u23", "u24", "u25"].concat(q),
                o: Object.assign({
                    u26: 3,
                    u23: 4,
                    u24: 5,
                    u25: 6
                }, z),
                R: !0
            },
            s29: {
                g: "uniform sampler2D u8,u7,u3;uniform float u9,u27,u28,u10;uniform vec2 u29;varying vec2 vv0;const vec2 f=vec2(1.),l=vec2(0.);void main(){vec2 c=floor(u27*vv0),d=u27*vv0-c;float g=u9/u27;vec2 h=floor(d*g),i=d*g-h,j=(c+i)/u27;float m=u27*u10/u9;vec2 b=m*h,n=floor(.5*(u10-1.)*(f-u29));b=floor(u29*b+n);vec2 a=(b+i*u28)/u10;a+=.25/u10;vec2 k=step(a,f)*step(l,a);vec4 o=texture2D(u8,j),p=texture2D(u7,a),q=o*p,r=texture2D(u3,j);gl_FragColor=(q*u28*u28+r)*k.x*k.y;}",
                i: ["u27", "u28", "u3", "u29"].concat(q),
                o: Object.assign({
                    u3: 2
                }, z)
            },
            s30: {
                g: "uniform sampler2D u8,u7;varying vec2 vv0;void main(){vec4 a=texture2D(u8,vv0),b=texture2D(u7,vv0);gl_FragColor=a*b;}",
                i: ["u8", "u7"],
                o: z,
                R: !0
            },
            s31: {
                g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0)+u4*texture2D(u1,vv0);}",
                i: B,
                o: L
            },
            s32: {
                g: "uniform sampler2D u1,u3;uniform vec2 u21;uniform float u4;varying vec2 vv0;void main(){gl_FragColor=texture2D(u3,vv0*u21)+u4*texture2D(u1,vv0);}",
                i: ["u21"].concat(B),
                o: L,
                R: !0
            },
            s33: {
                g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}",
                i: B,
                o: L,
                R: !0
            },
            s34: {
                g: "uniform sampler2D u1,u3;uniform vec2 u21;uniform float u4;varying vec2 vv0;const vec4 e=vec4(1.);void main(){vec4 a=texture2D(u3,vv0*u21)+u4*texture2D(u1,vv0);vec2 h=mod(gl_FragCoord.xy,vec2(2.)),d=step(h,vec2(.75));float b=d.x+2.*d.y,c=step(2.5,b),g=(1.-c)*step(1.5,b),i=(1.-c)*(1.-g)*step(.5,b);a=mix(a,a.argb,i*e),a=mix(a,a.barg,g*e),a=mix(a,a.gbar,c*e),gl_FragColor=a;}",
                i: ["u21"].concat(B),
                o: L,
                R: !0
            },
            s35: {
                g: "uniform sampler2D u1,u3;uniform float u4;varying vec2 vv0;const vec4 h=vec4(1.);void main(){vec4 a=texture2D(u3,vv0)+u4*texture2D(u1,vv0);vec2 b=floor(gl_FragCoord.xy);vec3 d=b.x*vec3(1.)+vec3(0.,1.,2.);float c=mod(b.y,2.);vec4 f=vec4(c,(1.-c)*step(mod(d,vec3(3.)),vec3(.5)));mat4 g=mat4(a.rgba,a.gbar,a.barg,a.argb);gl_FragColor=g*f;}",
                i: B,
                o: L,
                R: !0
            },
            s36: {
                g: "varying vec2 vv0;uniform sampler2D u1;const vec4 f=vec4(1.,1.,1.,1.),g=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=dot(a,g)*f;}",
                i: x,
                o: m,
                precision: "lowp"
            },
            s37: {
                g: "varying vec2 vv0;uniform sampler2D u1;uniform float u30;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u30)).rgb,c=texture2D(u1,vv0+vec2(u30,u30)).rgb,d=texture2D(u1,vv0+vec2(u30,0.)).rgb;gl_FragColor=vec4(dot(a,f),dot(b,f),dot(c,f),dot(d,f));}",
                i: ["u1", "u30"],
                o: m,
                precision: "lowp"
            },
            s38: {
                g: "varying vec2 vv0;uniform sampler2D u1;uniform float u30;const vec3 f=vec3(.299,.587,.114);void main(){vec3 a=texture2D(u1,vv0).rgb,b=texture2D(u1,vv0+vec2(0.,u30)).rgb,c=texture2D(u1,vv0+vec2(u30,u30)).rgb,d=texture2D(u1,vv0+vec2(u30,0.)).rgb;gl_FragColor=vec4(a.r,b.g,c.b,dot(d,f));}",
                i: ["u1", "u30"],
                o: m,
                precision: "lowp"
            },
            s39: {
                g: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u31;const vec4 f=vec4(1.);void main(){vec4 a=vec4(0.);a-=texture2D(u1,vec2(vv0.x-u31,vv0.y-u31))*1.,a-=texture2D(u1,vec2(vv0.x-u31,vv0.y))*2.,a-=texture2D(u1,vec2(vv0.x-u31,vv0.y+u31))*1.,a+=texture2D(u1,vec2(vv0.x+u31,vv0.y-u31))*1.,a+=texture2D(u1,vec2(vv0.x+u31,vv0.y))*2.,a+=texture2D(u1,vec2(vv0.x+u31,vv0.y+u31))*1.;vec4 b=vec4(0.);b-=texture2D(u1,vec2(vv0.x-u31,vv0.y-u31))*1.,b-=texture2D(u1,vec2(vv0.x,vv0.y-u31))*2.,b-=texture2D(u1,vec2(vv0.x+u31,vv0.y-u31))*1.,b+=texture2D(u1,vec2(vv0.x-u31,vv0.y+u31))*1.,b+=texture2D(u1,vec2(vv0.x,vv0.y+u31))*2.,b+=texture2D(u1,vec2(vv0.x+u31,vv0.y+u31))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u1,vv0).a),g=texture2D(u2,vv0);gl_FragColor=g.a*e.r*f;}",
                i: ["u1", "u2", "u31"],
                o: E,
                R: !0
            },
            s40: {
                g: "varying vec2 vv0;uniform sampler2D u1,u2;uniform float u31;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float h=0.;vec2 l=k*u31,a,b;float c,d,i=0.;for(float e=-4.;e<=4.;e+=1.)for(float f=-4.;f<=4.;f+=1.)a=vec2(e,f),c=length(a)/2.,d=exp(-c*c),b=vv0+l*a,h+=d*texture2D(u1,b).r,i+=d;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u1,b).r-h/i)*j;}",
                i: ["u1", "u2", "u31"],
                o: E,
                R: !0
            },
            s41: {
                g: "uniform sampler2D u5;uniform vec2 u6;varying vec2 vv0;const vec2 f=vec2(1.),g=vec2(.5),h=vec2(1.,0.),i=vec2(0.,1.);void main(){vec2 a=f/u6,c=u6/2.,d=floor(vv0*c)+g,j=d/c,b=j-a*.5;vec4 k=texture2D(u5,b),l=texture2D(u5,b+a*h),m=texture2D(u5,b+a*i),n=texture2D(u5,b+a),o=max(k,l),p=max(m,n);gl_FragColor=max(o,p);}",
                i: D,
                o: e,
                R: !0
            },
            s42: {
                g: "uniform sampler2D u5;uniform vec2 u6;varying vec2 vv0;const vec2 k=vec2(1.),l=vec2(1.,0.),m=vec2(0.,1.),n=vec2(2.,0.),o=vec2(0.,2.);vec4 e(vec2 b,vec2 a){vec4 c=texture2D(u5,a),d=texture2D(u5,a+b*l),f=texture2D(u5,a+b*m),g=texture2D(u5,a+b),h=max(c,d),i=max(f,g);return max(h,i);}void main(){vec2 a=k/u6,c=u6/4.,d=4.*floor(vv0*c),f=d/u6,b=f+a*.5;vec4 g=e(a,b),h=e(a,b+a*n),i=e(a,b+a*2.),p=e(a,b+a*o),q=max(g,h),r=max(i,p);gl_FragColor=max(q,r);}",
                i: D,
                o: e,
                R: !0
            },
            s43: {
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*a;}",
                i: ["u1"],
                o: m,
                precision: "lowp",
                R: !0
            },
            s44: {
                g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;const float e=15444.;void main(){vec4 a=1001./e*texture2D(u1,vv0-3.*u15)+2002./e*texture2D(u1,vv0-2.*u15)+3003./e*texture2D(u1,vv0-u15)+3432./e*texture2D(u1,vv0)+3003./e*texture2D(u1,vv0+u15)+2002./e*texture2D(u1,vv0+2.*u15)+1001./e*texture2D(u1,vv0+3.*u15);gl_FragColor=a;}",
                i: ["u15", "u1"],
                o: m,
                precision: "lowp",
                R: !0
            },
            s45: {
                g: "uniform sampler2D u1,u17,u32;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);const float g=.1;void main(){vec4 a=texture2D(u17,vv0),b=texture2D(u32,vv0),c=texture2D(u1,vv0),d=max(f*g,b-a*a),h=sqrt(d);gl_FragColor=(c-a)/h;}",
                i: ["u1", "u17", "u32"],
                o: {
                    u1: 0,
                    u17: 1,
                    u32: 2
                },
                R: !0
            }
        }
          , G = {
            s46: {
                g: "uniform float u9,u33;uniform sampler2D u8,u7,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.),ONE2=vec2(1.),HALF2=vec2(.5),EPS2=vec2(1e-5);void main(){vec4 sum=texture2D(u3,vv0);float toSparsity=1.1111;vec2 uvFrom,uvWeight,xyPatch=ZERO2,eps2=EPS2/u9,xyTo=floor(vv0*u9+eps2);float weightSize=toSparsity*u9;vec2 halfFromSparsity=ONE2*(toSparsity-1.)/2.;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.)xyPatch.y=patch_y,uvFrom=(xyTo+HALF2+u33*(xyPatch-halfFromSparsity))/u9,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),uvWeight=(xyTo*toSparsity+xyPatch+HALF2)/weightSize,sum+=texture2D(u8,uvWeight)*texture2D(u7,uvFrom);}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                i: ["u9", "u8", "u7", "u3", "u33"],
                Ka: ["1.1111", "gl_FragColor\\*=2.2222;"]
            },
            s47: {
                g: "uniform float u9,u33,u10;uniform sampler2D u8,u7,u3;varying vec2 vv0;const vec2 ZERO2=vec2(0.),ONE2=vec2(1.),HALF2=vec2(.5),EPS2=vec2(1e-4);void main(){vec4 sum=texture2D(u3,vv0);float fromSparsity=1.1111,shrinkFactor=3.3333;vec2 uvFrom,uvWeight,xyFrom,xyPatchTo,xyPatch=ZERO2,xyShrink=ZERO2,eps2=EPS2/u10,xyTo=floor(vv0*u9+eps2);float weightSize=fromSparsity*u10;vec2 halfFromSparsity=ONE2*(fromSparsity-1.)/2.;float toSparsity=weightSize/u9;vec2 xyFrom0=xyTo*shrinkFactor;for(float patch_x=0.;patch_x<1.1111;patch_x+=1.){xyPatch.x=patch_x;for(float patch_y=0.;patch_y<1.1111;patch_y+=1.){xyPatch.y=patch_y;for(float shrink_x=0.;shrink_x<3.3333;shrink_x+=1.){xyShrink.x=shrink_x;for(float shrink_y=0.;shrink_y<3.3333;shrink_y+=1.)xyShrink.y=shrink_y,xyFrom=xyFrom0+xyShrink+shrinkFactor*u33*(xyPatch-halfFromSparsity),uvFrom=(xyFrom+HALF2)/u10,uvFrom+=step(uvFrom,-eps2),uvFrom-=step(ONE2-eps2,uvFrom),xyPatchTo=xyPatch*shrinkFactor+xyShrink,uvWeight=(xyTo*toSparsity+xyPatchTo+HALF2)/weightSize,sum+=texture2D(u8,uvWeight)*texture2D(u7,uvFrom);}}}gl_FragColor=sum,gl_FragColor*=2.2222;}",
                i: "u9 u10 u8 u7 u3 u33".split(" "),
                Ka: ["1.1111", "gl_FragColor\\*=2.2222;", "3.3333"]
            }
        }
          , S = null
          , Q = null
          , I = {
            Db: function() {
                return H
            },
            m: function() {
                if (!H) {
                    S = Pa(O, 2);
                    Q = Pa(G, 2);
                    v = "highp";
                    C.getShaderPrecisionFormat && (C.getShaderPrecisionFormat(C.FRAGMENT_SHADER, C.MEDIUM_FLOAT),
                    C.getShaderPrecisionFormat(C.FRAGMENT_SHADER, C.LOW_FLOAT));
                    for (var A in S)
                        f(C, S[A], A);
                    J.set("s0");
                    C.enableVertexAttribArray(0);
                    H = !0
                }
            },
            xc: function(A) {
                A.forEach(function(u) {
                    I.pa(u)
                })
            },
            pa: function(A) {
                S[A.id] = A;
                f(C, A, A.id)
            },
            Sm: function(A, u, N) {
                u || (u = A);
                S[u] = Object.create(Q[A]);
                S[u].an = !0;
                Q[A].Ka && Q[A].Ka.forEach(function(R, T) {
                    var aa = "";
                    "gl_Frag" === R.substring(0, 7) ? (R = new RegExp("[,;]?" + R,"g"),
                    aa = ";") : R = new RegExp(R,"g");
                    S[u].g = S[u].g.replace(R, aa + N[T])
                });
                f(C, S[u], u)
            },
            set: function(A) {
                var u = S[A];
                u.R && (u.R = !1,
                f(C, u, A));
                n(u)
            },
            Ib: function(A) {
                return t(A, p(), "s48")
            },
            oe: function(A) {
                return t(A, {
                    g: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                    i: [],
                    precision: v
                }, "s49")
            },
            $l: function(A) {
                return "undefined" === typeof S[A] ? !1 : S[A].Qa
            },
            M: function() {
                -1 !== k && (k = -1,
                r.ya.forEach(function(A) {
                    0 !== A && C.disableVertexAttribArray(A)
                }))
            },
            re: function() {
                var A = 0;
                r.ya.forEach(function(u, N) {
                    N = r.S[N];
                    C.vertexAttribPointer(u, N, C.FLOAT, !1, r.hh, A);
                    A += 4 * N
                })
            },
            Yl: function() {
                C.enableVertexAttribArray(0)
            },
            jc: function() {
                I.kc(C)
            },
            kc: function(A) {
                A.vertexAttribPointer(r.ya[0], 2, A.FLOAT, !1, 8, 0)
            },
            pe: function(A, u) {
                C.uniform1i(r.B[A], u)
            },
            D: function(A, u) {
                C.uniform1f(r.B[A], u)
            },
            O: function(A, u, N) {
                C.uniform2f(r.B[A], u, N)
            },
            Ig: function(A, u) {
                C.uniform2fv(r.B[A], u)
            },
            Jg: function(A, u) {
                C.uniform3fv(r.B[A], u)
            },
            qe: function(A, u, N, R) {
                C.uniform3f(r.B[A], u, N, R)
            },
            Qo: function(A, u, N, R, T) {
                C.uniform4f(r.B[A], u, N, R, T)
            },
            Da: function(A, u) {
                C.uniform4fv(r.B[A], u)
            },
            Ro: function(A, u) {
                C.uniformMatrix2fv(r.B[A], !1, u)
            },
            So: function(A, u) {
                C.uniformMatrix3fv(r.B[A], !1, u)
            },
            $c: function(A, u) {
                C.uniformMatrix4fv(r.B[A], !1, u)
            },
            j: function(A, u) {
                I.set(A);
                u.forEach(function(N) {
                    switch (N.type) {
                    case "4f":
                        C.uniform4fv(r.B[N.name], N.value);
                        break;
                    case "3f":
                        C.uniform3fv(r.B[N.name], N.value);
                        break;
                    case "2f":
                        C.uniform2fv(r.B[N.name], N.value);
                        break;
                    case "1f":
                        C.uniform1f(r.B[N.name], N.value);
                        break;
                    case "1i":
                        C.uniform1i(r.B[N.name], N.value);
                        break;
                    case "mat2":
                        C.uniformMatrix2fv(r.B[N.name], !1, N.value);
                        break;
                    case "mat3":
                        C.uniformMatrix3fv(r.B[N.name], !1, N.value);
                        break;
                    case "mat4":
                        C.uniformMatrix4fv(r.B[N.name], !1, N.value)
                    }
                })
            },
            rq: function() {
                return "lowp"
            },
            A: function() {
                I.M();
                C.disableVertexAttribArray(0);
                for (var A in S) {
                    var u = S[A];
                    u.Qa && (u.Qa = !1,
                    C.deleteProgram(u.ra));
                    u.an && delete S[A]
                }
                g.forEach(function(N) {
                    C.deleteShader(N)
                });
                g.splice(0);
                w = 0;
                H = !1;
                r = null;
                k = -1
            }
        };
        return I
    }()
      , C = null
      , xb = function() {
        function a(x) {
            console.log("ERROR in ContextFF: ", x);
            return !1
        }
        function b() {
            return navigator.userAgent && -1 !== navigator.userAgent.indexOf("forceWebGL1")
        }
        function d(x, y, m) {
            x.setAttribute("width", y);
            x.setAttribute("height", m)
        }
        function f(x) {
            if (b())
                return !1;
            var y = document.createElement("canvas");
            d(y, 5, 5);
            var m = null;
            try {
                m = y.getContext("webgl2", x)
            } catch (l) {
                return !1
            }
            if (!m)
                return !1;
            n(m);
            ob.Uh(m);
            x = ob.ff(m);
            if (!x.$a && !x.bb)
                return rb.A(),
                ob.reset(),
                !1;
            m = rb.zh(m, x);
            rb.A();
            ob.reset();
            return m ? !0 : !1
        }
        function n(x) {
            x.clearColor(0, 0, 0, 0);
            x.disable(x.DEPTH_TEST);
            x.disable(x.BLEND);
            x.disable(x.DITHER);
            x.disable(x.STENCIL_TEST);
            x.disable(x.CULL_FACE);
            x.GENERATE_MIPMAP_HINT && x.FASTEST && x.hint(x.GENERATE_MIPMAP_HINT, x.FASTEST);
            x.disable(x.SAMPLE_ALPHA_TO_COVERAGE);
            x.disable(x.SAMPLE_COVERAGE);
            x.depthFunc(x.LEQUAL);
            x.clearDepth(1)
        }
        var t = null
          , p = null
          , g = null
          , k = !0
          , r = null
          , w = null
          , H = []
          , v = {
            P: function() {
                return t.width
            },
            aa: function() {
                return t.height
            },
            xb: function() {
                return t
            },
            fm: function() {
                return C
            },
            oa: function() {
                return k
            },
            flush: function() {
                C.flush()
            },
            zq: function() {
                sb.reset();
                sb.ca();
                v.jo()
            },
            jo: function() {
                vb.reset();
                V.reset();
                J.M();
                J.Yl();
                C.disable(C.DEPTH_TEST);
                C.disable(C.BLEND);
                V.pd();
                J.jc()
            },
            km: function() {
                r || (r = new Uint8Array(t.width * t.height * 4));
                C.readPixels(0, 0, t.width, t.height, C.RGBA, C.UNSIGNED_BYTE, r);
                return r
            },
            nq: function() {
                return t.toDataURL("image/jpeg")
            },
            oq: function() {
                sb.ba();
                p || (p = document.createElement("canvas"),
                g = p.getContext("2d"));
                d(p, t.width, t.height);
                for (var x = v.km(), y = g.createImageData(p.width, p.height), m = p.width, l = p.height, E = y.data, L = 0; L < l; ++L)
                    for (var B = l - L - 1, D = 0; D < m; ++D) {
                        var e = 4 * (L * m + D)
                          , q = 4 * (B * m + D);
                        E[e] = x[q];
                        E[e + 1] = x[q + 1];
                        E[e + 2] = x[q + 2];
                        E[e + 3] = x[q + 3]
                    }
                g.putImageData(y, 0, 0);
                return p.toDataURL("image/png")
            },
            gi: function(x) {
                !p && x && (p = document.createElement("canvas"),
                g = p.getContext("2d"));
                var y = x ? p : document.createElement("canvas");
                d(y, t.width, t.height);
                (x ? g : y.getContext("2d")).drawImage(t, 0, 0);
                return y
            },
            m: function(x) {
                x = Object.assign({
                    ab: null,
                    kg: null,
                    ta: null,
                    af: null,
                    width: 512,
                    height: 512,
                    premultipliedAlpha: !1,
                    Ym: !0,
                    antialias: !1,
                    debug: !1,
                    $p: !1
                }, x);
                x.ab ? (C = x.ab,
                t = x.ab.canvas) : x.af && !x.ta ? t = document.getElementById(x.af) : x.ta && (t = x.ta);
                t || (t = document.createElement("canvas"));
                t.width = x.width;
                t.height = x.height;
                if (C)
                    k = C instanceof WebGL2RenderingContext;
                else {
                    k = !0;
                    var y = {
                        antialias: x.antialias,
                        alpha: !0,
                        preserveDrawingBuffer: !0,
                        premultipliedAlpha: x.premultipliedAlpha,
                        stencil: !1,
                        depth: x.Ym,
                        failIfMajorPerformanceCaveat: !0,
                        powerPreference: "high-performance"
                    };
                    navigator && navigator.userAgent && -1 !== navigator.userAgent.indexOf("noAntialiasing") && (y.antialias = !1);
                    var m = f(y);
                    m || !y.antialias || b() || (y.antialias = !1,
                    m = f(y));
                    m && (C = t.getContext("webgl2", y));
                    C ? k = !0 : ((C = t.getContext("webgl", y)) || (C = t.getContext("experimental-webgl", y)),
                    k = !1)
                }
                if (!C)
                    return a("WebGL1 and 2 are not enabled");
                x.kg && t.addEventListener && (w = x.kg,
                t.addEventListener("webglcontextlost", w, !1));
                if (!ob.m())
                    return a("Not enough GL capabilities");
                n(C);
                J.m();
                V.m();
                rb.zh(C, ob.hm());
                H.forEach(function(l) {
                    l(C)
                });
                H.splice(0);
                return !0
            },
            Qp: function() {
                return new Promise(function(x) {
                    C ? x(C) : H.push(x)
                }
                )
            },
            A: function() {
                C && (ob.A(),
                J.A(),
                rb.A());
                w && (t.removeEventListener("webglcontextlost", w, !1),
                w = null);
                C = r = g = p = t = null;
                H.splice(0)
            }
        };
        return v
    }()
      , mb = function() {
        function a() {
            null === b && ("undefined" !== typeof J ? b = J : "undefined" !== typeof X && (b = X))
        }
        var b = null;
        return {
            reset: function() {
                b = null
            },
            Lj: function(d) {
                b !== d && (b && b.M(),
                b = d)
            },
            Db: function() {
                return b.Db()
            },
            jc: function() {
                return b.jc()
            },
            kc: function(d) {
                return b.kc(d)
            },
            re: function() {
                return b.re()
            },
            M: function() {
                return b.M()
            },
            set: function(d) {
                a();
                return b.set(d)
            },
            Ib: function(d) {
                a();
                return b.Ib(d)
            },
            oe: function(d) {
                a();
                return b.oe(d)
            }
        }
    }()
      , vb = function() {
        function a(u) {
            C.bindTexture(C.TEXTURE_2D, u)
        }
        function b() {
            return g ? C.NO_ERROR : C.getError()
        }
        function d(u) {
            S[0] = u;
            u = Q[0];
            var N = u >> 16 & 32768
              , R = u >> 12 & 2047
              , T = u >> 23 & 255;
            return 103 > T ? N : 142 < T ? N | 31744 | ((255 == T ? 0 : 1) && u & 8388607) : 113 > T ? (R |= 2048,
            N | (R >> 114 - T) + (R >> 113 - T & 1)) : N = (N | T - 112 << 10 | R >> 1) + (R & 1)
        }
        function f(u) {
            var N = new Uint16Array(u.length);
            u.forEach(function(R, T) {
                N[T] = d(R)
            });
            return N
        }
        function n() {
            if (null !== I.Hf)
                return I.Hf;
            var u = p(f([.5, .5, .5, .5]), !0);
            return null === u ? !0 : I.Hf = u
        }
        function t() {
            if (null !== I.If)
                return I.If;
            var u = p(new Uint8Array([127, 127, 127, 127]), !1);
            return null === u ? !0 : I.If = u
        }
        function p(u, N) {
            if (!mb.Db() || !E)
                return null;
            var R = null
              , T = Math.sqrt(u.length / 4);
            try {
                var aa = C.getError();
                if ("FUCKING_BIG_ERROR" === aa)
                    return !1;
                R = A.instance({
                    isFloat: !1,
                    U: N,
                    array: u,
                    width: T
                });
                aa = C.getError();
                if (aa !== C.NO_ERROR)
                    return !1
            } catch (ka) {
                return !1
            }
            sb.ba();
            C.viewport(0, 0, T, T);
            C.clearColor(0, 0, 0, 0);
            C.clear(C.COLOR_BUFFER_BIT);
            mb.set("s0");
            R.za(0);
            V.l(!0, !0);
            u = 4 * T * T;
            N = new Uint8Array(u);
            C.readPixels(0, 0, T, T, C.RGBA, C.UNSIGNED_BYTE, N);
            T = !0;
            for (aa = 0; aa < u; ++aa)
                T = T && 3 > Math.abs(N[aa] - 127);
            R.remove();
            sb.ca();
            return T
        }
        var g = !1
          , k = 0
          , r = null
          , w = 0
          , H = null
          , v = null
          , x = null
          , y = null
          , m = null
          , l = null
          , E = !1
          , L = []
          , B = {
            isFloat: !1,
            isPot: !0,
            isLinear: !1,
            isMipmap: !1,
            Gi: !1,
            isAnisotropicFiltering: !1,
            isMirrorX: !1,
            isMirrorY: !1,
            isSrgb: !1,
            isKeepArray: !1,
            isFlipY: null,
            width: 0,
            height: 0,
            url: null,
            array: null,
            data: null,
            ma: null,
            si: null,
            $m: !1,
            U: !1,
            C: null,
            L: 4,
            bg: 0
        }
          , D = !1
          , e = null
          , q = null
          , z = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]
          , O = !1
          , G = !1
          , S = new Float32Array(1)
          , Q = new Int32Array(S.buffer)
          , I = {
            Hf: null,
            If: null
        }
          , A = {
            m: function() {
                E || (m = [C.RGBA, null, C.RGBA, C.RGBA],
                l = [C.RGBA, null, C.RGBA, C.RGBA],
                r = [C.TEXTURE0, C.TEXTURE1, C.TEXTURE2, C.TEXTURE3, C.TEXTURE4, C.TEXTURE5, C.TEXTURE6, C.TEXTURE7],
                O = "undefined" !== typeof yb,
                G = "undefined" !== typeof ob,
                H = [-1, -1, -1, -1, -1, -1, -1, -1],
                y = [C.UNSIGNED_BYTE, C.FLOAT, C.FLOAT],
                E = !0)
            },
            Go: function() {
                C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MAG_FILTER, C.LINEAR);
                C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MIN_FILTER, C.LINEAR)
            },
            Jo: function() {
                C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MAG_FILTER, C.NEAREST);
                C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MIN_FILTER, C.NEAREST)
            },
            Qm: function() {
                if (!v) {
                    for (var u = new Float32Array(16384), N = 0; 16384 > N; ++N)
                        u[N] = 2 * Math.random() - 1;
                    v = {
                        random: A.instance({
                            isFloat: !0,
                            isPot: !0,
                            array: u,
                            width: 64
                        }),
                        ak: A.instance({
                            isFloat: !1,
                            isPot: !0,
                            width: 1,
                            array: new Uint8Array([0, 0, 0, 0])
                        })
                    }
                }
                A.np()
            },
            Gj: function(u) {
                C.framebufferTexture2D(sb.xf(), C.COLOR_ATTACHMENT0, C.TEXTURE_2D, u, 0)
            },
            ri: function() {
                return v.ak
            },
            np: function() {
                y[1] = ob.wf(C)
            },
            Lo: function() {
                l = m = [C.RGBA, C.RGBA, C.RGBA, C.RGBA]
            },
            oj: function(u) {
                J.set("s1");
                sb.ba();
                var N = u.P()
                  , R = u.aa();
                C.viewport(0, 0, N, R);
                u.h(0);
                V.l(!1, !1)
            },
            Rq: function(u, N) {
                A.oj(u);
                C.readPixels(0, 0, u.P(), u.aa(), C.RGBA, C.UNSIGNED_BYTE, N)
            },
            Sq: function(u, N) {
                A.oj(u);
                return ob.vg(0, 0, u.P(), u.aa(), N)
            },
            ai: function(u, N, R, T, aa, ka, Aa) {
                u.activeTexture(u.TEXTURE0);
                var F = u.createTexture();
                u.bindTexture(u.TEXTURE_2D, F);
                aa = aa instanceof Float32Array ? aa : new Float32Array(aa);
                u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE);
                u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE);
                u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, u.NEAREST);
                u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.NEAREST);
                u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL, ka);
                u.texImage2D(u.TEXTURE_2D, 0, u.RGBA, R, T, 0, u.RGBA, u.FLOAT, aa);
                u.bindTexture(u.TEXTURE_2D, null);
                u.pixelStorei(u.UNPACK_FLIP_Y_WEBGL, !1);
                Aa && (sb.ca(),
                J.Ib(u));
                u.viewport(0, 0, R, T);
                u.framebufferTexture2D(u.FRAMEBUFFER, u.COLOR_ATTACHMENT0, u.TEXTURE_2D, N, 0);
                u.bindTexture(u.TEXTURE_2D, F);
                Aa ? V.l(!0, !0) : V.Ub(u);
                u.deleteTexture(F);
                E && (H[0] = -1,
                x = null,
                k = 0)
            },
            Me: function(u) {
                u !== k && (C.activeTexture(r[u]),
                k = u)
            },
            er: function(u) {
                g = u
            },
            instance: function(u) {
                var N;
                function R() {
                    U = void 0 !== h.ma.videoWidth ? h.ma.videoWidth : h.ma.width;
                    da = void 0 !== h.ma.videoHeight ? h.ma.videoHeight : h.ma.height
                }
                function T(ea) {
                    var wa = b();
                    if ("FUCKING_BIG_ERROR" === wa)
                        return !1;
                    C.texImage2D(C.TEXTURE_2D, 0, na, oa, Ga, ea);
                    wa = b();
                    wa !== C.NO_ERROR && oa !== C.RGBA && (oa = C.RGBA,
                    C.texImage2D(C.TEXTURE_2D, 0, na, oa, Ga, ea));
                    return !0
                }
                function aa() {
                    if (!Wa) {
                        a(xa);
                        Ya && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, Ya);
                        h.isPot ? (C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_S, h.isMirrorX ? C.MIRRORED_REPEAT : C.REPEAT),
                        C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_T, h.isMirrorY ? C.MIRRORED_REPEAT : C.REPEAT)) : (C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_S, C.CLAMP_TO_EDGE),
                        C.texParameteri(C.TEXTURE_2D, C.TEXTURE_WRAP_T, C.CLAMP_TO_EDGE));
                        h.isAnisotropicFiltering && "undefined" !== typeof c && C.texParameterf(C.TEXTURE_2D, yb.lm().TEXTURE_MAX_ANISOTROPY_EXT, c.Ik);
                        C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MAG_FILTER, h.isLinear ? C.LINEAR : C.NEAREST);
                        var ea = h.isMipmap && !Ta;
                        C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MIN_FILTER, h.Gi ? C.LINEAR_MIPMAP_LINEAR : h.isLinear ? ea ? C.NEAREST_MIPMAP_LINEAR : C.LINEAR : ea ? C.NEAREST_MIPMAP_NEAREST : C.NEAREST);
                        oa = m[h.L - 1];
                        na = l[h.L - 1];
                        Ga = y[ca];
                        ob.oa() && (ea = ob.nm(),
                        oa === C.RGBA && Ga === C.FLOAT ? h.isMipmap || h.isLinear ? na = rb.pm(C) : ob.ka() ? ea && (na = ea) : na = C.RGBA16F || C.RGBA : oa === C.RGB && Ga === C.FLOAT && ea && (na = ea,
                        oa = C.RGBA));
                        if (h.U && !h.isFloat || h.isFloat && h.isMipmap && rb.kn())
                            na = ob.om(),
                            Ga = ob.wf(C);
                        h.bg && (tb = h.bg);
                        h.isSrgb && 4 === h.L && (oa = yb.Im());
                        if (h.ma)
                            T(h.ma);
                        else if (h.url)
                            T(ra);
                        else if (W) {
                            ea = W;
                            try {
                                "FUCKING_BIG_ERROR" !== C.getError() && (C.texImage2D(C.TEXTURE_2D, 0, na, U, da, 0, oa, Ga, ea),
                                b() !== C.NO_ERROR && (C.texImage2D(C.TEXTURE_2D, 0, na, U, da, 0, oa, Ga, null),
                                b() !== C.NO_ERROR && C.texImage2D(C.TEXTURE_2D, 0, C.RGBA, U, da, 0, C.RGBA, C.UNSIGNED_BYTE, null)))
                            } catch (pb) {
                                C.texImage2D(C.TEXTURE_2D, 0, na, U, da, 0, oa, Ga, null)
                            }
                            h.isKeepArray || (W = null)
                        } else
                            ea = b(),
                            "FUCKING_BIG_ERROR" !== ea && (C.texImage2D(C.TEXTURE_2D, 0, na, U, da, 0, oa, Ga, null),
                            ea = b(),
                            ea !== C.NO_ERROR && (oa = C.RGBA,
                            h.U && Ga !== C.FLOAT && (Ga = C.FLOAT,
                            C.texImage2D(C.TEXTURE_2D, 0, na, U, da, 0, oa, Ga, null))));
                        if (h.isMipmap)
                            if (!Ta && Ha)
                                Ha.Hc(),
                                ub = !0;
                            else if (Ta) {
                                ea = Math.log2(Math.min(U, da));
                                nb = Array(1 + ea);
                                nb[0] = xa;
                                for (var wa = 1; wa <= ea; ++wa) {
                                    var Ma = Math.pow(2, wa)
                                      , za = U / Ma;
                                    Ma = da / Ma;
                                    var ab = C.createTexture();
                                    a(ab);
                                    C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MIN_FILTER, C.NEAREST);
                                    C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MAG_FILTER, C.NEAREST);
                                    C.texImage2D(C.TEXTURE_2D, 0, na, za, Ma, 0, oa, Ga, null);
                                    a(null);
                                    nb[wa] = ab
                                }
                                ub = !0
                            }
                        a(null);
                        H[k] = -1;
                        Ya && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, !1);
                        Na = !0;
                        h.C && Ha && (h.C(Ha),
                        h.C = null)
                    }
                }
                function ka() {
                    for (var ea = U * da, wa = 2 * ea, Ma = 3 * ea, za = 0; za < ea; ++za)
                        sa[0][za] = Oa[za],
                        sa[1][za] = Oa[za + ea],
                        sa[2][za] = Oa[za + wa],
                        sa[3][za] = Oa[za + Ma]
                }
                function Aa() {
                    var ea = U * da * 4;
                    cb = [new Uint8Array(ea), new Uint8Array(ea), new Uint8Array(ea), new Uint8Array(ea)];
                    sa = [new Float32Array(cb[0].buffer), new Float32Array(cb[1].buffer), new Float32Array(cb[2].buffer), new Float32Array(cb[3].buffer)];
                    qb = new Uint8Array(4 * ea);
                    Oa = new Float32Array(qb.buffer);
                    Fa = !0
                }
                function F() {
                    N = new Uint8Array(U * da * 4);
                    Cb = new Float32Array(N.buffer);
                    wb = !0
                }
                var h = Object.assign({}, B, u)
                  , M = w++;
                null === h.isFlipY && (h.isFlipY = h.url ? !0 : !1);
                h.data && (h.array = "string" === typeof h.data ? ib(h.data) : h.isFloat ? new Float32Array(h.data) : new Uint8Array(h.data),
                h.isFlipY = !1);
                var ca = 0
                  , la = h.ma ? !0 : !1
                  , ja = null
                  , pa = null
                  , Da = !1;
                h.U = h.U || h.isFloat;
                h.U && (ca = 1);
                !h.$m && h.isFloat && G && !ob.ka() && (h.isFloat = !1);
                h.isFloat && (ca = 2);
                h.isAnisotropicFiltering && O && !yb.hn() && (h.isAnisotropicFiltering = !1);
                var xa = h.si || C.createTexture()
                  , ra = null
                  , W = !1
                  , U = 0
                  , da = 0
                  , Na = !1
                  , Wa = !1
                  , Fa = !1
                  , sa = null
                  , cb = null
                  , qb = null
                  , Oa = null
                  , na = null
                  , oa = null
                  , Ga = null
                  , Ya = h.isFlipY
                  , La = (u = h.U && h.isMipmap) && rb.pl()
                  , Ta = u && !La ? !0 : !1
                  , nb = null
                  , tb = -1
                  , Db = -1
                  , ub = !1;
                var wb = !1;
                var Cb = N = null;
                h.width && (U = h.width,
                da = h.height ? h.height : U);
                var Ha = {
                    get: function() {
                        return xa
                    },
                    P: function() {
                        return U
                    },
                    aa: function() {
                        return da
                    },
                    Jm: function() {
                        return h.url
                    },
                    jn: function() {
                        return h.isFloat
                    },
                    Fq: function() {
                        return h.U
                    },
                    dr: function(ea) {
                        xa = ea
                    },
                    Hq: function() {
                        return h.isLinear
                    },
                    Hc: function() {
                        C.generateMipmap(C.TEXTURE_2D)
                    },
                    hl: function(ea, wa) {
                        Ta ? (ea || (ea = Ha.ni()),
                        A.Me(wa),
                        a(nb[ea]),
                        H[wa] = -1) : Ha.h(wa)
                    },
                    ni: function() {
                        -1 === tb && (tb = Math.log2(U));
                        return tb
                    },
                    Ij: function(ea) {
                        C.TEXTURE_MAX_LEVEL && C.texParameteri(C.TEXTURE_2D, C.TEXTURE_MAX_LEVEL, ea)
                    },
                    em: function(ea) {
                        ea || (ea = Ha.ni());
                        if (Ta) {
                            J.set("s12");
                            A.Me(0);
                            for (var wa = U, Ma = da, za = 1; za <= ea; ++za)
                                wa /= 2,
                                Ma /= 2,
                                J.O("u15", .25 / wa, .25 / Ma),
                                C.viewport(0, 0, wa, Ma),
                                a(nb[za - 1]),
                                C.framebufferTexture2D(sb.xf(), C.COLOR_ATTACHMENT0, C.TEXTURE_2D, nb[za], 0),
                                V.l(!1, 1 === za);
                            H[0] = -1
                        } else
                            ea !== Db && (Db = ea,
                            Ha.Ij(ea)),
                            Ha.Hc()
                    },
                    fr: function(ea) {
                        (la = !(Array.isArray(ea) || ea.constructor === Float32Array || ea.constructor === Uint8Array)) ? (W = null,
                        h.ma = ea,
                        R()) : W = ea
                    },
                    h: function(ea) {
                        if (!Na)
                            return !1;
                        A.Me(ea);
                        if (H[ea] === M)
                            return !1;
                        a(xa);
                        H[ea] = M;
                        return !0
                    },
                    za: function(ea) {
                        C.activeTexture(r[ea]);
                        k = ea;
                        a(xa);
                        H[ea] = M
                    },
                    u: function() {
                        x = Ha;
                        A.Gj(xa)
                    },
                    J: function() {
                        C.viewport(0, 0, U, da);
                        x = Ha;
                        A.Gj(xa)
                    },
                    ze: A.ze,
                    Do: function(ea, wa) {
                        U = ea;
                        da = wa
                    },
                    resize: function(ea, wa) {
                        Ha.Do(ea, wa);
                        aa()
                    },
                    clone: function(ea) {
                        ea = A.instance({
                            width: U,
                            height: da,
                            U: h.U,
                            isFloat: h.isFloat,
                            isLinear: h.isLinear,
                            isMirrorY: h.isMirrorY,
                            isFlipY: ea ? !Ya : Ya,
                            isPot: h.isPot
                        });
                        mb.set("s0");
                        sb.ca();
                        ea.J();
                        Ha.h(0);
                        V.l(!0, !0);
                        return ea
                    },
                    ad: function() {
                        C.viewport(0, 0, U, da)
                    },
                    remove: function() {
                        C.deleteTexture(xa);
                        Wa = !0;
                        L.splice(L.indexOf(Ha), 1);
                        Ha = null
                    },
                    refresh: function() {
                        Ha.za(0);
                        Ya && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, !0);
                        la ? C.texImage2D(C.TEXTURE_2D, 0, na, oa, Ga, h.ma) : C.texImage2D(C.TEXTURE_2D, 0, na, U, da, 0, oa, Ga, W);
                        Ya && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, !1)
                    },
                    mj: function() {
                        Fa || Aa();
                        C.readPixels(0, 0, U, 4 * da, C.RGBA, C.UNSIGNED_BYTE, qb);
                        ka();
                        return sa
                    },
                    Yn: function() {
                        Fa || Aa();
                        return ob.vg(0, 0, U, 4 * da, qb).then(function() {
                            ka();
                            return sa
                        })
                    },
                    $n: function() {
                        wb || F();
                        C.readPixels(0, 0, U, da, C.RGBA, C.UNSIGNED_BYTE, N);
                        return Cb
                    },
                    Zn: function() {
                        wb || F();
                        return ob.vg(0, 0, U, da, N)
                    },
                    Nh: function(ea) {
                        sb.ba();
                        J.set("s15");
                        Ha.h(0);
                        if (ea)
                            C.viewport(0, 0, U, da),
                            J.Qo("u16", .25, .25, .25, .25),
                            V.l(!1, !0);
                        else
                            for (ea = 0; 4 > ea; ++ea)
                                C.viewport(0, da * ea, U, da),
                                J.Da("u16", z[ea]),
                                V.l(!1, 0 === ea)
                    },
                    bh: function(ea) {
                        var wa = Ga === y[0] && !t();
                        a(xa);
                        Ya && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, !0);
                        wa ? (Da || (ja = document.createElement("canvas"),
                        ja.width = U,
                        ja.height = da,
                        pa = ja.getContext("2d"),
                        pa.createImageData(U, da),
                        Da = !0),
                        null.data.set(ea),
                        pa.putImageData(null, 0, 0),
                        C.texImage2D(C.TEXTURE_2D, 0, na, oa, Ga, ja)) : C.texImage2D(C.TEXTURE_2D, 0, na, U, da, 0, oa, Ga, ea);
                        H[k] = M;
                        Ya && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, !1)
                    },
                    ur: function(ea, wa) {
                        a(xa);
                        wa && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, !0);
                        C.texImage2D(C.TEXTURE_2D, 0, na, oa, Ga, ea);
                        H[k] = M;
                        wa && C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL, !1)
                    },
                    fc: function(ea, wa) {
                        var Ma = U * da
                          , za = 4 * Ma;
                        ea = h.U ? ea ? "RGBE" : "JSON" : "RGBA";
                        wa && (ea = wa);
                        wa = ob.oa() && !1;
                        var ab = null;
                        switch (ea) {
                        case "RGBE":
                            ab = "s13";
                            break;
                        case "JSON":
                            ab = wa ? "s0" : "s15";
                            break;
                        case "RGBA":
                        case "RGBAARRAY":
                            ab = "s7"
                        }
                        Fa || ("RGBA" === ea || "RGBE" === ea || "RGBAARRAY" === ea ? (cb = new Uint8Array(za),
                        Fa = !0) : "JSON" !== ea || wa || Aa());
                        sb.ba();
                        J.set(ab);
                        Ha.h(0);
                        za = null;
                        if ("RGBA" === ea || "RGBE" === ea || "RGBAARRAY" === ea) {
                            C.viewport(0, 0, U, da);
                            V.l(!0, !0);
                            C.readPixels(0, 0, U, da, C.RGBA, C.UNSIGNED_BYTE, cb);
                            if ("RGBAARRAY" === ea)
                                return {
                                    data: cb
                                };
                            D || (e = document.createElement("canvas"),
                            q = e.getContext("2d"),
                            D = !0);
                            e.width = U;
                            e.height = da;
                            Ma = q.createImageData(U, da);
                            Ma.data.set(cb);
                            q.putImageData(Ma, 0, 0);
                            za = e.toDataURL("image/png")
                        } else if ("JSON" === ea)
                            if (wa)
                                za = new Float32Array(Ma),
                                C.viewport(0, 0, U, da),
                                V.l(!0, !0),
                                C.readPixels(0, 0, U, da, C.RGBA, C.FLOAT, za);
                            else {
                                for (za = 0; 4 > za; ++za)
                                    C.viewport(0, da * za, U, da),
                                    J.Da("u16", z[za]),
                                    V.l(!za, !za);
                                Ha.mj();
                                za = Array(Ma);
                                for (wa = 0; wa < Ma; ++wa)
                                    za[4 * wa] = sa[0][wa],
                                    za[4 * wa + 1] = sa[1][wa],
                                    za[4 * wa + 2] = sa[2][wa],
                                    za[4 * wa + 3] = sa[3][wa]
                            }
                        return {
                            format: ea,
                            data: za,
                            width: U,
                            height: da,
                            isMirrorY: h.isMirrorY,
                            isFlipY: "RGBA" === ea ? h.isFlipY : !h.isFlipY
                        }
                    }
                };
                h.isMipmap && !Ta && Na && !ub && (Ha.Hc(),
                ub = !0);
                if (h.url)
                    a(xa),
                    C.texImage2D(C.TEXTURE_2D, 0, C.RGBA, 1, 1, 0, C.RGBA, C.UNSIGNED_BYTE, null),
                    ra = new Image,
                    ra.crossOrigin = "anonymous",
                    ra.src = h.url,
                    ra.onload = function() {
                        U = ra.width;
                        da = ra.height;
                        aa()
                    }
                    ;
                else if (h.ma) {
                    var Eb = function() {
                        R();
                        U ? aa() : setTimeout(Eb, 1)
                    };
                    Eb()
                } else
                    h.array ? (h.U && !h.isFloat ? h.array instanceof Uint16Array ? (W = h.array,
                    aa()) : n() ? (W = f(h.array),
                    aa()) : (aa(),
                    A.ai(C, xa, Ha.P(), Ha.aa(), h.array, Ya, !0)) : (W = h.isFloat ? h.array instanceof Float32Array ? h.array : new Float32Array(h.array) : h.array instanceof Uint8Array ? h.array : new Uint8Array(h.array),
                    aa()),
                    h.isKeepArray || (W && W !== h.array && (W = null),
                    delete h.array)) : h.si ? Na = !0 : aa();
                Ha.vq = Ha.P;
                h.C && Na && (h.C(Ha),
                h.C = null);
                L.push(Ha);
                return Ha
            },
            ba: function(u) {
                u !== k && (C.activeTexture(r[u]),
                k = u);
                H[u] = -1;
                a(null)
            },
            jl: function(u) {
                v.random.h(u)
            },
            ze: function() {
                x = null;
                C.framebufferTexture2D(sb.xf(), C.COLOR_ATTACHMENT0, C.TEXTURE_2D, null, 0)
            },
            reset: function() {
                0 !== k && C.activeTexture(r[0]);
                for (var u = 0; u < r.length; ++u)
                    H[u] = -1;
                k = -1
            },
            Vq: function() {
                k = -1
            },
            dk: function() {
                for (var u = 0; u < r.length; ++u)
                    A.ba(u)
            },
            I: function() {
                v && (v.random.remove(),
                v.ak.remove())
            },
            dd: function(u, N) {
                if ("RGBA" === u.format || "RGBE" === u.format) {
                    var R = new Image;
                    R.src = u.data;
                    R.onload = function() {
                        A.instance({
                            isMirrorY: u.isMirrorY,
                            isFlipY: u.isFlipY,
                            isFloat: !1,
                            ma: R,
                            C: function(T) {
                                if ("RGBA" === u.format)
                                    N(T);
                                else {
                                    var aa = u.width
                                      , ka = u.height
                                      , Aa = A.instance({
                                        isMirrorY: u.isMirrorY,
                                        isFloat: !0,
                                        width: aa,
                                        height: ka,
                                        isFlipY: u.isFlipY
                                    });
                                    sb.ca();
                                    C.viewport(0, 0, aa, ka);
                                    J.set("s14");
                                    Aa.u();
                                    T.h(0);
                                    V.l(!0, !0);
                                    A.ba(0);
                                    N(Aa);
                                    ob.flush();
                                    T.remove()
                                }
                            }
                        })
                    }
                } else
                    "JSON" === u.format ? N(A.instance({
                        isFloat: !0,
                        isFlipY: u.isFlipY,
                        width: u.width,
                        height: u.height,
                        array: new Float32Array(u.data)
                    })) : N(!1)
            },
            vl: f,
            A: function() {
                x && (sb.ca(),
                A.ze(),
                sb.ba());
                A.dk();
                L.slice(0).forEach(function(u) {
                    u.remove()
                });
                L.splice(0);
                E = !1;
                w = 0;
                "undefined" !== typeof rb && rb.A();
                v = null
            }
        };
        return A
    }()
      , zb = {
        instance: function(a) {
            var b = [vb.instance(a), vb.instance(a)]
              , d = [b[1], b[0]]
              , f = d
              , n = {
                Bj: function(t) {
                    f[1].u();
                    f[0].h(t);
                    n.Pj()
                },
                Cj: function(t) {
                    f[1].J();
                    f[0].h(t);
                    n.Pj()
                },
                Pj: function() {
                    f = f === b ? d : b
                },
                refresh: function() {
                    f[0].refresh();
                    f[1].refresh()
                },
                h: function(t) {
                    f[0].h(t)
                },
                za: function(t) {
                    f[0].za(t)
                },
                il: function(t) {
                    f[1].h(t)
                },
                ji: function() {
                    return f[0]
                },
                tq: function() {
                    return f[1]
                },
                bh: function(t) {
                    f[0].bh(t);
                    f[1].bh(t)
                },
                remove: function() {
                    f[0].remove();
                    f[1].remove();
                    f = null
                },
                sync: function() {
                    n.Cj(0);
                    J.set("s0");
                    V.l(!1, !1)
                }
            };
            return n
        }
    }
      , V = function() {
        function a(k) {
            var r = {
                la: null,
                indices: null
            };
            r.la = k.createBuffer();
            k.bindBuffer(k.ARRAY_BUFFER, r.la);
            k.bufferData(k.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), k.STATIC_DRAW);
            r.indices = k.createBuffer();
            k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, r.indices);
            k.bufferData(k.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2]), k.STATIC_DRAW);
            return r
        }
        var b = null
          , d = 0
          , f = !1
          , n = []
          , t = -2
          , p = -2
          , g = {
            reset: function() {
                p = t = -2
            },
            m: function() {
                f || (b = a(C),
                g.pd(),
                f = !0)
            },
            instance: function(k) {
                var r = d++
                  , w = k.indices ? k.indices.length : 0
                  , H = "undefined" === typeof k.mode ? C.STATIC_DRAW : k.mode
                  , v = C.createBuffer();
                C.bindBuffer(C.ARRAY_BUFFER, v);
                C.bufferData(C.ARRAY_BUFFER, k.la instanceof Float32Array ? k.la : new Float32Array(k.la), H);
                t = r;
                var x = null
                  , y = null
                  , m = null;
                if (k.indices) {
                    x = C.createBuffer();
                    C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, x);
                    var l = null;
                    65536 > k.indices.length ? (l = Uint16Array,
                    y = C.UNSIGNED_SHORT,
                    m = 2) : (l = Uint32Array,
                    y = C.UNSIGNED_INT,
                    m = 4);
                    l = k.indices instanceof l ? k.indices : new l(k.indices);
                    C.bufferData(C.ELEMENT_ARRAY_BUFFER, l, H);
                    p = r
                }
                var E = {
                    Bc: function(L) {
                        t !== r && (C.bindBuffer(C.ARRAY_BUFFER, v),
                        t = r);
                        L && mb.re()
                    },
                    fl: function() {
                        p !== r && (C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, x),
                        p = r)
                    },
                    bind: function(L) {
                        E.Bc(L);
                        E.fl()
                    },
                    W: function() {
                        C.drawElements(C.TRIANGLES, w, y, 0)
                    },
                    Pa: function(L, B) {
                        C.drawElements(C.TRIANGLES, L, y, B * m)
                    },
                    remove: function() {
                        C.deleteBuffer(v);
                        k.indices && C.deleteBuffer(x);
                        E = null
                    }
                };
                n.push(E);
                return E
            },
            pd: function() {
                -1 !== t && (C.bindBuffer(C.ARRAY_BUFFER, b.la),
                t = -1);
                -1 !== p && (C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, b.indices),
                p = -1)
            },
            l: function(k, r) {
                k && V.pd();
                r && mb.jc();
                C.drawElements(C.TRIANGLES, 3, C.UNSIGNED_SHORT, 0)
            },
            Ub: function(k) {
                k = k || C;
                var r = a(k);
                k.bindBuffer(k.ARRAY_BUFFER, r.la);
                k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, r.indices);
                mb.kc(k);
                k.clear(k.COLOR_BUFFER_BIT);
                k.drawElements(k.TRIANGLES, 3, k.UNSIGNED_SHORT, 0);
                k.flush();
                k.bindBuffer(k.ARRAY_BUFFER, null);
                k.bindBuffer(k.ELEMENT_ARRAY_BUFFER, null);
                k.deleteBuffer(r.la);
                k.deleteBuffer(r.indices);
                g.reset();
                f && (g.pd(),
                mb.jc())
            },
            I: function() {
                var k = C
                  , r = b;
                k.deleteBuffer(r.la);
                k.deleteBuffer(r.indices)
            },
            A: function() {
                g.I();
                n.forEach(function(k) {
                    k.remove()
                });
                C.bindBuffer(C.ARRAY_BUFFER, null);
                C.bindBuffer(C.ELEMENT_ARRAY_BUFFER, null);
                g.reset();
                f = !1;
                n.splice(0);
                d = 0
            }
        };
        return g
    }()
      , sb = function() {
        var a = null
          , b = null
          , d = null
          , f = !1
          , n = []
          , t = {
            na: -2,
            $h: 1
        }
          , p = {
            Db: function() {
                return f
            },
            m: function() {
                if (!f) {
                    a = C.createFramebuffer();
                    var g = ob.oa();
                    b = g && C.DRAW_FRAMEBUFFER ? C.DRAW_FRAMEBUFFER : C.FRAMEBUFFER;
                    d = g && C.READ_FRAMEBUFFER ? C.READ_FRAMEBUFFER : C.FRAMEBUFFER;
                    f = !0
                }
            },
            mm: function() {
                return b
            },
            hi: function() {
                return d
            },
            xf: function() {
                return C.FRAMEBUFFER
            },
            uq: function() {
                return t
            },
            kq: function() {
                return a
            },
            instance: function(g) {
                void 0 === g.Kc && (g.Kc = !1);
                var k = g.V ? g.V : null
                  , r = g.width
                  , w = void 0 !== g.height ? g.height : g.width
                  , H = a
                  , v = null
                  , x = !1
                  , y = !1
                  , m = 0;
                k && (r = r ? r : k.P(),
                w = w ? w : k.aa());
                var l = {
                    vj: function() {
                        x || (H = C.createFramebuffer(),
                        x = !0,
                        m = t.$h++)
                    },
                    kd: function() {
                        l.vj();
                        l.u();
                        v = C.createRenderbuffer();
                        C.bindRenderbuffer(C.RENDERBUFFER, v);
                        C.renderbufferStorage(C.RENDERBUFFER, C.DEPTH_COMPONENT16, r, w);
                        C.framebufferRenderbuffer(b, C.DEPTH_ATTACHMENT, C.RENDERBUFFER, v);
                        C.clearDepth(1)
                    },
                    bind: function(E, L) {
                        m !== t.na && (C.bindFramebuffer(b, H),
                        t.na = m);
                        k && k.u();
                        L && C.viewport(0, 0, r, w);
                        E && C.clear(C.COLOR_BUFFER_BIT | C.DEPTH_BUFFER_BIT)
                    },
                    uh: function() {
                        m !== t.na && (C.bindFramebuffer(b, H),
                        t.na = m)
                    },
                    clear: function() {
                        C.clear(C.COLOR_BUFFER_BIT | C.DEPTH_BUFFER_BIT)
                    },
                    Xe: function() {
                        C.clear(C.COLOR_BUFFER_BIT)
                    },
                    Bh: function() {
                        C.clear(C.DEPTH_BUFFER_BIT)
                    },
                    ad: function() {
                        C.viewport(0, 0, r, w)
                    },
                    u: function() {
                        m !== t.na && (C.bindFramebuffer(b, H),
                        t.na = m)
                    },
                    rtt: function(E) {
                        k = E;
                        t.na !== m && (C.bindFramebuffer(C.FRAMEBUFFER, H),
                        t.na = m);
                        E.u()
                    },
                    ba: function() {
                        C.bindFramebuffer(b, null);
                        t.na = -1
                    },
                    resize: function(E, L) {
                        r = E;
                        w = L;
                        v && (C.bindRenderbuffer(C.RENDERBUFFER, v),
                        C.renderbufferStorage(C.RENDERBUFFER, C.DEPTH_COMPONENT16, r, w))
                    },
                    remove: function() {
                        H === a || y || (C.bindFramebuffer(b, H),
                        C.framebufferTexture2D(b, C.COLOR_ATTACHMENT0, C.TEXTURE_2D, null, 0),
                        v && C.framebufferRenderbuffer(b, C.DEPTH_ATTACHMENT, C.RENDERBUFFER, null),
                        C.bindFramebuffer(b, null),
                        t.na = -1,
                        C.deleteFramebuffer(H),
                        v && C.deleteRenderbuffer(v));
                        y = !0
                    }
                };
                g.Kc && l.kd();
                n.push(l);
                return l
            },
            ba: function() {
                C.bindFramebuffer(b, null);
                t.na = -1
            },
            sr: function() {
                C.bindFramebuffer(b, null);
                C.clear(C.COLOR_BUFFER_BIT | C.DEPTH_BUFFER_BIT);
                ob.Mj();
                t.na = -1
            },
            reset: function() {
                t.na = -2
            },
            ca: function() {
                0 !== t.na && (C.bindFramebuffer(b, a),
                t.na = 0)
            },
            clear: function() {
                ob.Mj();
                C.clear(C.COLOR_BUFFER_BIT)
            },
            A: function() {
                p.ba();
                n.forEach(function(g) {
                    g.remove()
                });
                null !== a && (C.deleteFramebuffer(a),
                a = null);
                p.reset();
                f = !1;
                n.splice(0);
                t.$h = 1
            }
        };
        return p
    }()
      , ob = function() {
        function a() {
            g = "undefined" === typeof xb ? yb : xb;
            k = !0
        }
        function b(e, q, z) {
            for (var O = 0; O < q.length; ++O) {
                var G = z.getExtension(q[O] + "_" + e);
                if (G)
                    return G
            }
            return null
        }
        function d() {
            null !== l.ye && (clearTimeout(l.ye),
            l.ye = null);
            l.Xb = !1
        }
        function f(e) {
            if (0 === l.Ab.length) {
                l.Fa = C.PIXEL_PACK_BUFFER;
                l.Ab.splice(0);
                l.Kd.splice(0);
                for (var q = 0; q < l.Ec; ++q)
                    l.Ab.push(C.createBuffer()),
                    l.Kd.push(-1);
                l.Ya = 0;
                l.jg = 0
            }
            C.bindBuffer(l.Fa, l.Ab[l.Ya]);
            e.byteLength !== l.Kd[l.Ya] && (C.bufferData(l.Fa, e.byteLength, C.STREAM_READ),
            l.Kd[l.Ya] = e.byteLength);
            l.Aq = !0
        }
        function n() {
            C.bindBuffer(l.Fa, null)
        }
        function t() {
            l.Wb.forEach(function(e) {
                C.deleteSync(e)
            });
            l.Wb.splice(0)
        }
        function p() {
            l.Ya = (l.Ya + 1) % l.Ec;
            ++l.jg
        }
        var g = null
          , k = !1
          , r = {
            Ci: !1,
            Ug: null,
            Vg: null,
            Ji: !1,
            fn: !1,
            Wg: null,
            Ki: !1,
            Xg: null,
            Di: !1,
            Ye: null,
            Wm: !1,
            Ze: null,
            Xm: !1
        }
          , w = null
          , H = {
            $a: !0,
            bb: !0,
            qf: !0,
            lj: !1
        }
          , v = null
          , x = !0
          , y = null
          , m = null
          , l = {
            wl: 1,
            Ec: -1,
            Ya: 0,
            jg: 0,
            Xb: !1,
            Ab: [],
            Wb: [],
            Kd: [],
            Fa: null,
            ye: null
        }
          , E = "EXT WEBGL OES MOZ_OES WEBKIT_OES KHR".split(" ")
          , L = ["OES", "MOZ_OES", "WEBKIT_OES"]
          , B = "undefined" === typeof window ? {} : window
          , D = {
            m: function() {
                if (k)
                    return !0;
                D.reset();
                k || a();
                var e = C;
                if (!w.Ci) {
                    w.Ug = D.Xh(e);
                    B.GL_EXT_FLOAT = w.Ug;
                    w.Ji = w.Ug ? !0 : !1;
                    if (w.Ji || D.oa())
                        w.Vg = D.Yh(e),
                        w.fn = w.Vg ? !0 : !1,
                        B.GL_EXT_FLOATLINEAR = w.Vg;
                    w.Ci = !0
                }
                if (!w.Di) {
                    w.Wg = D.Cd(e);
                    w.Wg && (w.Ki = !0,
                    B.GL_EXT_HALFFLOAT = w.Wg);
                    if (w.Ki || D.oa())
                        w.Xg = D.Zh(e),
                        B.GL_EXT_HALFFLOATLINEAR = w.Xg;
                    w.Dq = w.Xg ? !0 : !1;
                    w.Di = !0
                }
                w.Ye = D.Vh(e);
                w.Wm = w.Ye ? !0 : !1;
                B.GL_EXT_COLORBUFFERFLOAT = w.Ye;
                w.Ze = D.Wh(e);
                w.Xm = w.Ze ? !0 : !1;
                B.GL_EXT_COLORBUFFERHALFFLOAT = w.Ze;
                sb.m();
                vb.m();
                if (!D.Gl())
                    return !1;
                V.m();
                vb.Qm();
                return !0
            },
            reset: function() {
                w = Object.assign({}, r);
                v = Object.assign({}, H)
            },
            P: function() {
                k || a();
                return g.P()
            },
            aa: function() {
                k || a();
                return g.aa()
            },
            oa: function() {
                k || a();
                return g.oa()
            },
            Uh: function(e) {
                D.Vh(e);
                D.Wh(e);
                D.Xh(e);
                D.Yh(e);
                D.Cd(e);
                D.Zh(e)
            },
            Vh: b.bind(null, "color_buffer_float", E),
            Wh: b.bind(null, "color_buffer_half_float", E),
            Xh: b.bind(null, "texture_float", L),
            Yh: b.bind(null, "texture_float_linear", L),
            Cd: b.bind(null, "texture_half_float", L),
            Zh: b.bind(null, "texture_half_float_linear", L),
            wf: function(e) {
                var q = D.Cd(e);
                return q && q.HALF_FLOAT_OES ? q.HALF_FLOAT_OES : e.HALF_FLOAT || e.FLOAT
            },
            nm: function() {
                return m || C.RGBA32F || C.RGBA
            },
            om: function() {
                return y || C.RGBA16F || C.RGBA
            },
            hm: function() {
                return v
            },
            ka: function() {
                return v.$a
            },
            Up: function() {
                return v.bb
            },
            ol: function() {
                return v.qf
            },
            rl: function() {
                return v.lj && x
            },
            $j: function(e) {
                x = e;
                !e && l.Xb && (t(),
                C.bindBuffer(l.Fa, null),
                l.Xb = !1)
            },
            Iq: function() {
                return l.Xb
            },
            we: function(e, q, z) {
                function O() {
                    e.bindTexture(e.TEXTURE_2D, null);
                    e.bindFramebuffer(G, null);
                    e.deleteTexture(I);
                    e.deleteFramebuffer(Q)
                }
                var G = e.FRAMEBUFFER
                  , S = e.NEAREST
                  , Q = e.createFramebuffer();
                e.bindFramebuffer(G, Q);
                var I = e.createTexture();
                e.activeTexture(e.TEXTURE0);
                e.bindTexture(e.TEXTURE_2D, I);
                e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL, !1);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.CLAMP_TO_EDGE);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, S);
                e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, S);
                e.texImage2D(e.TEXTURE_2D, 0, q, 3, 3, 0, e.RGBA, z, null);
                e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, I, 0);
                if (e.checkFramebufferStatus(e.READ_FRAMEBUFFER || e.FRAMEBUFFER) !== e.FRAMEBUFFER_COMPLETE)
                    return O(),
                    !1;
                mb.oe(e);
                e.clearColor(0, 0, 0, 0);
                e.viewport(0, 0, 3, 3);
                e.disable(e.DEPTH_TEST);
                e.clear(e.COLOR_BUFFER_BIT);
                V.Ub(e);
                e.bindFramebuffer(G, null);
                mb.Ib(e);
                e.activeTexture(e.TEXTURE0);
                e.bindTexture(e.TEXTURE_2D, I);
                V.Ub(e);
                q = new Uint8Array(36);
                e.readPixels(0, 0, 3, 3, e.RGBA, e.UNSIGNED_BYTE, q);
                O();
                for (z = 0; 36 > z; ++z)
                    if (3 !== z % 4 && 3 < Math.abs(q[z] - 127))
                        return !1;
                return !0
            },
            ff: function(e) {
                var q = {
                    $a: !1,
                    bb: !1
                };
                e.disable(e.BLEND);
                e.clearColor(0, 0, 0, 0);
                e.clear(e.COLOR_BUFFER_BIT);
                e.RGBA32F && D.we(e, e.RGBA32F, e.FLOAT) && (q.$a = !0,
                m = e.RGBA32F);
                !q.$a && D.we(e, e.RGBA, e.FLOAT) && (q.$a = !0,
                m = e.RGBA);
                var z = D.wf(e);
                y = null;
                e.RGBA16F && D.we(e, e.RGBA16F, z) && (q.bb = !0,
                y = e.RGBA16F);
                !q.bb && D.we(e, e.RGBA, z) && (q.bb = !0,
                y = e.RGBA);
                return q
            },
            Il: function() {
                var e = sb.instance({
                    width: 2
                });
                e.vj();
                var q = vb.instance({
                    width: 2,
                    isFloat: !0,
                    L: 3
                });
                e.u();
                q.u();
                D.flush();
                C.checkFramebufferStatus(sb.hi()) !== C.FRAMEBUFFER_COMPLETE ? (vb.Lo(),
                v.qf = !1) : v.qf = !0;
                e.remove();
                q.remove()
            },
            Jl: function() {
                var e = !1;
                D.oa() && (e = "PIXEL_PACK_BUFFER STREAM_READ SYNC_GPU_COMMANDS_COMPLETE WAIT_FAILED fenceSync deleteSync createBuffer".split(" ").every(function(q) {
                    return "undefined" !== typeof C[q]
                }));
                v.lj = e
            },
            Gl: function() {
                var e = D.ff(C);
                Object.assign(v, e);
                if (!v.$a && !v.bb)
                    return !1;
                D.Il();
                D.Jl();
                return !0
            },
            ao: function(e, q, z, O, G) {
                C.readPixels(e, q, z, O, C.RGBA, C.UNSIGNED_BYTE, G);
                return Promise.resolve(G, !1)
            },
            vg: function(e, q, z, O, G, S, Q) {
                if (!D.rl())
                    return D.ao(e, q, z, O, G);
                l.Ec = Q || l.wl;
                f(G);
                C.readPixels(e, q, z, O, C.RGBA, C.UNSIGNED_BYTE, 0);
                l.Wb[l.Ya] = C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE, 0);
                D.flush();
                var I = !1;
                return new Promise(function(A, u) {
                    function N() {
                        if (!l.Xb)
                            return d(),
                            n(),
                            p(),
                            u(),
                            !1;
                        var R = (l.Ya + 1) % l.Ec;
                        switch (C.clientWaitSync(l.Wb[R], 0, 0)) {
                        case C.TIMEOUT_EXPIRED:
                        case C.WAIT_FAILED:
                            break;
                        default:
                            return d(),
                            C.deleteSync(l.Wb[R]),
                            l.Wb[R] = null,
                            C.bindBuffer(l.Fa, l.Ab[R]),
                            C.getBufferSubData(l.Fa, 0, G),
                            n(),
                            p(),
                            A(G, I),
                            !0
                        }
                        l.ye = setTimeout(N, 0);
                        return !1
                    }
                    d();
                    l.jg + 1 < l.Ec ? (n(),
                    p(),
                    A(G, !1)) : (l.Xb = !0,
                    N() || !S || I || (I = !0,
                    S()))
                }
                )
            },
            Mj: function() {
                C.viewport(0, 0, D.P(), D.aa())
            },
            flush: function() {
                C.flush()
            },
            A: function() {
                d();
                t();
                vb.A();
                sb.A();
                V.A();
                l.Ab.forEach(function(e) {
                    C.deleteBuffer(e)
                });
                l.Ab.splice(0);
                mb.reset();
                k = !1
            }
        };
        return D
    }()
      , rb = function() {
        function a(e, q, z, O) {
            l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, O ? l.NEAREST_MIPMAP_NEAREST : l.LINEAR);
            var G = null;
            if (null !== z)
                try {
                    G = l.getError();
                    if ("FUCKING_BIG_ERROR" === G)
                        return !1;
                    l.texImage2D(l.TEXTURE_2D, 0, e, 4, 4, 0, l.RGBA, q, z);
                    G = l.getError();
                    if (G !== l.NO_ERROR)
                        return !1
                } catch (S) {
                    return !1
                }
            O && l.generateMipmap(l.TEXTURE_2D);
            l.clear(l.COLOR_BUFFER_BIT);
            V.Ub(l);
            G = l.getError();
            if ("FUCKING_BIG_ERROR" === G)
                return !1;
            l.readPixels(0, 0, 2, 2, l.RGBA, l.UNSIGNED_BYTE, w);
            G = l.getError();
            G === l.INVALID_OPERATION && "undefined" !== typeof l.PIXEL_PACK_BUFFER && (l.bindBuffer(l.PIXEL_PACK_BUFFER, null),
            l.readPixels(0, 0, 2, 2, l.RGBA, l.UNSIGNED_BYTE, w),
            G = l.getError());
            if (G !== l.NO_ERROR)
                return !1;
            z = !0;
            for (O = 0; 16 > O; ++O)
                z = z && 4 > Math.abs(w[O] - 127);
            z && (k.hj = q,
            k.Bi = e);
            return z
        }
        function b(e, q) {
            return E.$a && a(e, l.FLOAT, new Float32Array(H), q) ? (g = p.ph,
            !0) : !1
        }
        function d(e, q, z) {
            if (!E.bb)
                return !1;
            var O = vb.vl(H)
              , G = ob.Cd(l);
            if (G && G.HALF_FLOAT_OES && a(e, G.HALF_FLOAT_OES, O, q) || l.HALF_FLOAT && a(e, l.HALF_FLOAT, O, q))
                return g = p.wc,
                !0;
            O = new Float32Array(H);
            if (a(e, l.FLOAT, O, q))
                return g = p.wc,
                !0;
            l.bindTexture(l.TEXTURE_2D, z);
            l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, 2, 2, 0, l.RGBA, l.UNSIGNED_BYTE, null);
            l.bindFramebuffer(k.xd, D);
            vb.ai(l, z, 2, 2, O, !1, !1);
            l.bindFramebuffer(k.xd, null);
            l.bindTexture(l.TEXTURE_2D, z);
            return a(e, null, null, q) ? (g = p.wc,
            !0) : !1
        }
        function f(e, q, z) {
            r = !0;
            if (d(e, !0, z) || b(q, !0))
                return !0;
            r = !1;
            return d(e, !1, z) || b(q, !1) ? !0 : !1
        }
        function n(e) {
            if (g === p.M) {
                l = e || C;
                g = p.RGBA8;
                r = !0;
                ob.Uh(l);
                E || (E = ob.ff(l));
                sb.reset();
                D = l.createFramebuffer();
                k.xd = l.DRAW_FRAMEBUFFER || l.FRAMEBUFFER;
                l.bindFramebuffer(k.xd, null);
                l.clearColor(0, 0, 0, 0);
                l.viewport(0, 0, 2, 2);
                J.M();
                L = J.Ib(l);
                e = l.createTexture();
                l.activeTexture(l.TEXTURE0);
                l.bindTexture(l.TEXTURE_2D, e);
                l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.REPEAT);
                l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.REPEAT);
                l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST);
                B = e;
                var q = e = l.RGBA
                  , z = l.RGBA16F
                  , O = l.RGBA32F;
                O && (e = O);
                z && (q = z);
                if ((z || O) && f(q, e, B))
                    return t(),
                    !0;
                e = q = l.RGBA;
                if (f(q, e, B))
                    return t(),
                    !0;
                g = p.RGBA8;
                t();
                return !1
            }
        }
        function t() {
            l.deleteProgram(L.ra);
            l.deleteTexture(B);
            B = L = null
        }
        for (var p = {
            M: -1,
            ph: 3,
            wc: 2,
            RGBA8: 0
        }, g = p.M, k = {
            hj: null,
            Bi: null,
            xd: null
        }, r = !0, w = new Uint8Array(16), H = Array(64), v = 0; 4 > v; ++v)
            for (var x = 0; 4 > x; ++x) {
                var y = 0 === (x + v) % 2 ? 1 : 0
                  , m = 4 * v + x;
                H[4 * m] = y;
                H[4 * m + 1] = y;
                H[4 * m + 2] = y;
                H[4 * m + 3] = y
            }
        var l = null
          , E = null
          , L = null
          , B = null
          , D = null;
        return {
            pl: function(e) {
                n(e);
                return r
            },
            zh: function(e, q) {
                g === p.M && (typeof ("undefined" !== q) && (E = q),
                n(e));
                return g !== p.RGBA8
            },
            Eq: function(e) {
                n(e);
                return g === p.ph
            },
            kn: function(e) {
                n(e);
                return g === p.wc
            },
            qq: function(e) {
                n(e);
                return k.hj
            },
            pm: function(e) {
                n(e);
                return k.Bi
            },
            A: function() {
                l = null;
                r = !0;
                g = p.M;
                E = null
            }
        }
    }()
      , Hb = {
        instance: function(a) {
            function b() {
                w && w.remove();
                w = vb.instance({
                    isFloat: !1,
                    isPot: !1,
                    width: d.size * d.Aa[0],
                    height: d.size * d.Aa[1],
                    isLinear: d.isLinear
                })
            }
            var d = Object.assign({
                mask: null,
                size: -1,
                preprocessing: "none",
                preprocessingSize: a.size,
                customInputShader: null,
                isLinear: !0,
                nBlurPass: 1,
                varianceMin: .1,
                blurKernelSizePx: 5,
                gain: 1,
                overlap: 0,
                isNormalized: !1,
                tilt: -1,
                Aa: [1, 1]
            }, a)
              , f = null
              , n = !1
              , t = !1
              , p = null
              , g = !1;
            a = !1;
            var k = null;
            d.mask && (n = !0,
            "undefined" !== typeof Z && Z && void 0 !== Z.ea && (d.mask = Z.ea + d.mask),
            f = vb.instance({
                isFloat: !1,
                url: d.mask
            }));
            var r = null;
            d.customInputShader && (r = "s50",
            J.pa({
                name: "_",
                id: r,
                g: d.customInputShader,
                tr: ["uSource"],
                precision: "lowp"
            }),
            J.j(r, [{
                type: "1i",
                name: "_",
                value: 0
            }]));
            switch (d.preprocessing) {
            case "sobel":
                k = "s39";
                g = !0;
                break;
            case "meanNormalization":
                k = "s40";
                g = !0;
                break;
            case "grayScale":
                k = "s36";
                g = !1;
                break;
            case "grayScaleTilt":
                k = "s37";
                a = !0;
                g = !1;
                break;
            case "rgbGrayTilt":
                k = "s38";
                a = !0;
                g = !1;
                break;
            case "copy":
                k = r ? r : "s0";
                break;
            case "inputLightRegulation":
                k = r ? r : "s36";
                p = Ab.instance({
                    Ai: d.preprocessingSize,
                    bj: d.size,
                    Xi: d.nBlurPass,
                    Ga: !1
                });
                t = !0;
                break;
            case "inputMix0":
                k = "none";
                p = Bb.instance({
                    Y: d.preprocessingSize,
                    ob: d.varianceMin,
                    Xa: d.blurKernelSizePx,
                    gain: d.gain || 1,
                    Ga: !1,
                    isLinear: d.isLinear
                });
                t = !0;
                break;
            case "inputMix1":
                k = "none";
                p = Fb.instance({
                    Y: d.preprocessingSize,
                    ob: d.varianceMin,
                    Xa: d.blurKernelSizePx,
                    gain: d.gain || 1,
                    Ga: !1
                });
                t = !0;
                break;
            case "inputCut4":
                k = "none";
                p = Gb.instance({
                    Y: d.preprocessingSize,
                    ob: d.varianceMin,
                    Xa: d.blurKernelSizePx,
                    gain: d.gain || 1,
                    Mc: d.isNormalized || !1,
                    pg: d.overlap || 0,
                    Ga: !1
                });
                d.preprocessingSize *= p.qm();
                t = !0;
                break;
            case "direct":
            case "none":
            case "abort":
                k = "abort";
                break;
            default:
                k = "s4"
            }
            d.preprocessingSize = Math.ceil(d.preprocessingSize);
            a && J.j(k, [{
                name: "u30",
                type: "1f",
                value: d.tilt
            }]);
            n && (k += "Mask");
            var w = null;
            b();
            var H = {
                P: function() {
                    return d.size
                },
                rm: function() {
                    return d.preprocessingSize
                },
                yf: function() {
                    return H.P()
                },
                vm: function() {
                    return t ? p.Ic() : w
                },
                Ae: function(v) {
                    d.Aa = v;
                    b()
                },
                Ca: function(v) {
                    sb.ca();
                    if ("abort" === k)
                        return v.h(0),
                        v;
                    "none" !== k && (J.set(k),
                    g && J.D("u31", 1 / d.size),
                    w.J(),
                    n && f.h(1),
                    V.l(!1, !1),
                    w.h(0),
                    v = w);
                    t && p.process(v)
                },
                A: function() {
                    w.remove();
                    n && f.remove()
                }
            };
            return H
        }
    }
      , Ob = {
        instance: function(a) {
            function b() {
                if (D.oc) {
                    n.input && (n.input.remove(),
                    n.Nd.remove());
                    var q = a.size * a.sparsity;
                    B = Math.log(q / a.size) / Math.log(2);
                    n.input = vb.instance({
                        isMipmap: !0,
                        isFloat: !0,
                        isPot: !0,
                        width: q * a.Aa[0],
                        height: q * a.Aa[1],
                        bg: B
                    });
                    n.Nd = vb.instance({
                        isFloat: !0,
                        isPot: !0,
                        width: a.size * a.Aa[0],
                        height: a.size * a.Aa[1]
                    })
                }
            }
            function d() {
                n.output && n.output.remove();
                n.output = vb.instance({
                    isFloat: !0,
                    isPot: !p,
                    isLinear: !p && g.isLinear,
                    width: a.size * a.Aa[0],
                    height: a.size * a.Aa[1]
                })
            }
            function f(q) {
                g.buffer.forEach(function(z, O) {
                    g.results[O][0] = q[0][z];
                    g.results[O][1] = q[1][z];
                    g.results[O][2] = q[2][z];
                    g.results[O][3] = q[3][z]
                });
                return g.results
            }
            a.normalize = a.normalize || !1;
            var n = {
                input: null,
                bias: null,
                Nd: null,
                output: null,
                og: null,
                mg: null,
                ng: null
            }
              , t = null
              , p = !0
              , g = {
                type: "undef",
                C: null,
                isLinear: !1,
                buffer: [],
                results: [],
                Rd: !1
            }
              , k = -1
              , r = a.isReorganize ? a.isReorganize : !1
              , w = a.kernelsCount ? !0 : !1
              , H = [a.Lc ? "s32" : "s31", a.Lc ? "s34" : "s33", "s35"][a.shiftRGBAMode || 0]
              , v = {
                isEnabled: !1
            }
              , x = 1 / a.size;
            a.bn ? (a.sparsity = "undefined" !== typeof a.sparsity ? a.sparsity : a.je.yf(),
            p = !1) : "full" === a.connectivityUp && (a.sparsity = a.je.yf());
            var y = {
                elu: "s19",
                elu01: "s20",
                relu: "s17",
                gelu: "s18",
                arctan: "s21",
                arctan2: "s22",
                sigmoid: "s16",
                copy: "s0"
            }[a.activation]
              , m = a.sparsity * a.sparsity
              , l = !1
              , E = a.size
              , L = "";
            if (a.maxPooling) {
                switch (a.maxPooling.size) {
                case 2:
                    L = "s41";
                    break;
                case 4:
                    L = "s42"
                }
                l = !0;
                E /= a.maxPooling.size;
                n.mg = vb.instance({
                    isFloat: !0,
                    isPot: !1,
                    width: E
                })
            }
            var B = -1
              , D = null;
            p && d();
            n.bias = vb.instance(a.bias);
            var e = {
                P: function() {
                    return a.size
                },
                yf: function() {
                    return E
                },
                ei: function() {
                    return a.classesCount
                },
                gl: function(q) {
                    t.h(q)
                },
                Sn: function() {
                    a.remap && a.remap.isEnabled && (v = {
                        isEnabled: !0,
                        yn: vb.instance(a.remap.maskTexture),
                        Qc: a.remap.layers.map(function(q) {
                            return a.parent.sm(q)
                        }),
                        depth: a.remap.depth
                    })
                },
                Mo: function() {
                    switch (a.connectivityUp) {
                    case "direct":
                        D = Ib.instance(a.connectivity);
                        break;
                    case "square":
                        D = Jb.instance(a.connectivity);
                        break;
                    case "squareFast":
                        D = Kb.instance(a.connectivity, a.activation);
                        break;
                    case "full":
                        D = Lb.instance(Object.assign({
                            Lc: a.Lc
                        }, a.connectivity));
                        break;
                    case "conv":
                        k = a.kernelsCount,
                        D = Nb.instance(a.connectivity),
                        r && (n.og = vb.instance({
                            width: E,
                            isFloat: !0,
                            isFlipY: !1,
                            isPot: !1
                        }))
                    }
                    b()
                },
                Ca: function(q, z) {
                    t = q;
                    D.oc ? (n.input.J(),
                    w && n.bias.h(2),
                    D.Ca(v),
                    n.input.h(0),
                    n.input.em(B),
                    n.Nd.J(),
                    w ? J.set("s0") : (J.set(H),
                    J.D("u4", m),
                    n.bias.h(1)),
                    n.input.hl(B, 0),
                    V.l(!1, !1),
                    J.set(y),
                    n.output.u(),
                    n.Nd.h(0),
                    V.l(!1, !1)) : (n.output.J(),
                    n.bias.h(1),
                    D.Ca());
                    if (p)
                        return z = n.output,
                        l && (n.mg.J(),
                        z.h(0),
                        J.set(L),
                        J.O("u6", a.size, a.size),
                        V.l(!1, !1),
                        z = n.mg),
                        r && (n.og.u(),
                        J.set("s24"),
                        J.O("u19", k, E / k),
                        z.h(0),
                        V.l(!1, !1),
                        z = n.og),
                        z.h(0),
                        z;
                    var O = n.output;
                    if (a.normalize || g.Rd)
                        q = a.normalize,
                        J.set(g.Rd ? "s9" : "s8"),
                        J.D("u11", q ? x : 1),
                        n.ng.J(),
                        O.h(0),
                        V.l(!1, !1),
                        O = n.ng;
                    q = null;
                    switch (g.type) {
                    case "cpuRGBA2Float":
                        O.Nh(!1);
                        z ? q = e.Wn(O).then(g.C) : (O = e.Xn(O),
                        g.C(O));
                        break;
                    case "cpuMeanFloat":
                        O.Nh(!0);
                        if (z)
                            q = O.Zn().then(g.C);
                        else {
                            O = O.$n();
                            for (var G = 0; G < O.length; ++G)
                                ;
                            g.C(O)
                        }
                        break;
                    case "gpuRawAvg":
                    case "gpuRaw":
                        O.h(0);
                    case "none":
                        null !== g.C && g.C(O)
                    }
                    z && null === q && (q = Promise.resolve());
                    return q
                },
                Ae: function(q) {
                    a.Aa = q;
                    b();
                    d()
                },
                Uo: function(q) {
                    q && (g.type = q.ee || "none",
                    g.C = q.de || null,
                    g.isLinear = q.lg ? !0 : !1);
                    d();
                    q = "undefined" !== typeof a.classesCount && a.classesCount ? a.classesCount : a.size * a.size;
                    for (var z = 0, O = 0, G = 0; z < q; ++z)
                        g.buffer.push(O + (a.size - 1 - G) * a.size),
                        g.results.push([-1, -1, -1, -1]),
                        ++O,
                        O === a.size && (O = 0,
                        ++G);
                    g.Rd = "gpuRawAvg" === g.type || "cpuMeanFloat" === g.type;
                    if (a.normalize || g.Rd)
                        n.ng = vb.instance({
                            isFloat: !0,
                            isPot: !0,
                            width: a.size
                        })
                },
                Wn: function(q) {
                    return q.Yn().then(f)
                },
                Xn: function(q) {
                    q = q.mj();
                    f(q);
                    return g.results
                },
                A: function() {
                    for (var q in n) {
                        var z = n[q];
                        z && z.remove()
                    }
                    D && (D.A(),
                    D = null)
                }
            };
            a.je && e.Mo(a.je);
            return e
        }
    };
    function Pb(a) {
        var b = null
          , d = null
          , f = null
          , n = 0
          , t = this
          , p = null
          , g = {
            Qc: [],
            ee: "none",
            lg: !1,
            de: null,
            grid: null
        };
        this.m = function() {
            this.ll(p.Qc);
            f.Uo({
                ee: p.ee,
                lg: p.lg,
                de: p.de
            })
        }
        ;
        this.sm = function(k) {
            return b[k]
        }
        ;
        this.Ae = function(k) {
            ["s32", "s34", "s27"].forEach(function(r) {
                J.j(r, [{
                    type: "2f",
                    name: "u21",
                    value: k
                }])
            });
            b && b.forEach(function(r) {
                r.Ae(k)
            })
        }
        ;
        this.ll = function(k) {
            var r = null;
            n = k.length;
            var w = null !== p.grid && a.grid.length && !(1 === a.grid[0] && 1 === a.grid[1])
              , H = w ? p.grid : [1, 1];
            w && this.Ae(H);
            b = k.map(function(v, x) {
                v = Object.assign({}, v, {
                    index: x,
                    parent: t,
                    je: r,
                    bn: x === n - 1,
                    Lc: w,
                    Aa: H
                });
                return r = x = 0 === x ? Hb.instance(v) : Ob.instance(v)
            });
            d = b[0];
            f = b[n - 1];
            b.forEach(function(v, x) {
                0 !== x && v.Sn()
            })
        }
        ;
        this.Ca = function(k) {
            k.h(0);
            var r = k;
            b.forEach(function(w) {
                r = w.Ca(r, !1)
            });
            return r
        }
        ;
        this.ii = function() {
            return d.rm()
        }
        ;
        this.Ic = function() {
            return f.vm()
        }
        ;
        this.ei = function() {
            return f.ei()
        }
        ;
        this.A = function() {
            b && (b.forEach(function(k) {
                k.A()
            }),
            f = d = b = null,
            n = 0)
        }
        ;
        "undefined" !== typeof a && (p = Object.assign({}, g, a),
        this.m())
    }
    var Ib = {
        instance: function(a) {
            var b = vb.instance(a.weights);
            return {
                oc: !0,
                Hd: function() {
                    return 1
                },
                A: function() {
                    b.remove()
                },
                Km: function() {
                    return b
                },
                Ca: function() {
                    J.set("s30");
                    b.h(1);
                    V.l(!1, !1)
                }
            }
        }
    }
      , Lb = {
        instance: function(a) {
            var b = a.fromLayerSize
              , d = vb.instance(a.weights)
              , f = a.Lc ? "s27" : "s26";
            return {
                oc: !0,
                Hd: function() {
                    return b
                },
                A: function() {
                    d.remove()
                },
                Ca: function(n) {
                    if (n.isEnabled) {
                        J.set("s28");
                        n.yn.h(3);
                        for (var t = Math.min(n.Qc.length, n.depth), p = 0; p < t; ++p)
                            n.Qc[p].gl(4 + p)
                    } else
                        J.set(f);
                    J.D("u9", a.toLayerSize);
                    J.D("u10", a.fromLayerSize);
                    d.h(1);
                    V.l(!1, !1)
                }
            }
        }
    }
      , Jb = {
        instance: function(a) {
            for (var b = a.fromLayerSize, d = a.toLayerSize, f = a.toSparsity, n = f * d, t = n / b, p = b / d, g = 0, k = 0, r = 0, w = Array(f * d * f * d * 4), H = Array(f * d * f * d * 4), v = Array(b * b), x = 0; x < v.length; ++x)
                v[x] = 0;
            x = Math.floor(f / 2);
            for (var y = .5 / d, m = .5 / b, l = .5 / n, E = 0; E < d; ++E)
                for (var L = Math.round(E * p), B = 0; B < d; ++B) {
                    var D = Math.round(B * p)
                      , e = E / d
                      , q = B / d;
                    e += y;
                    q += y;
                    for (var z = 0; z < f; ++z) {
                        var O = L + z - x;
                        0 > O && (O += b);
                        O >= b && (O -= b);
                        for (var G = 0; G < f; ++G) {
                            var S = g / n
                              , Q = k / n
                              , I = D + G - x;
                            0 > I && (I += b);
                            I >= b && (I -= b);
                            var A = O / b
                              , u = I / b;
                            Q = 1 - Q - 1 / n;
                            A += m;
                            u += m;
                            S += l;
                            Q += l;
                            var N = E * f + z
                              , R = B * f + G;
                            R = d * f - R - 1;
                            N = R * d * f + N;
                            w[4 * N] = S;
                            w[4 * N + 1] = Q;
                            w[4 * N + 2] = A;
                            w[4 * N + 3] = u;
                            u = v[I * b + O]++;
                            N = u % t;
                            A = O * t + N;
                            I = I * t + (u - N) / t;
                            I = b * t - 1 - I;
                            I = I * b * t + A;
                            H[4 * I] = S;
                            H[4 * I + 1] = Q;
                            H[4 * I + 2] = e;
                            H[4 * I + 3] = q;
                            ++g >= n && (g = 0,
                            ++k);
                            ++r
                        }
                    }
                }
            v = null;
            var T = vb.instance(a.weights);
            delete a.weights.data;
            var aa = vb.instance({
                width: n,
                isFloat: !0,
                array: new Float32Array(H),
                isPot: !0
            });
            H = null;
            var ka = vb.instance({
                width: n,
                isFloat: !0,
                array: new Float32Array(w),
                isPot: !0
            });
            w = null;
            return {
                oc: !0,
                Hd: function() {
                    return t
                },
                A: function() {
                    aa.remove();
                    ka.remove();
                    T.remove()
                },
                Ca: function() {
                    J.set("s25");
                    T.h(1);
                    ka.h(2);
                    V.l(!1, !1)
                }
            }
        }
    }
      , Nb = {
        instance: function(a) {
            var b = a.kernelsCount
              , d = a.toSparsity
              , f = d * a.toLayerSize / a.fromLayerSize
              , n = a.inputScale || [1, 1]
              , t = vb.instance(a.weights);
            return {
                oc: !0,
                Hd: function() {
                    return f
                },
                xq: function() {
                    return d
                },
                Km: function() {
                    return t
                },
                A: function() {
                    t.remove()
                },
                Ca: function() {
                    J.set("s29");
                    J.Ig("u29", n);
                    J.D("u27", b);
                    J.D("u28", d);
                    J.D("u9", a.toLayerSize);
                    J.D("u10", a.fromLayerSize);
                    t.h(1);
                    V.l(!1, !1)
                }
            }
        }
    }
      , Kb = {
        instance: function(a, b) {
            var d = a.fromLayerSize
              , f = a.toLayerSize
              , n = a.toSparsity
              , t = a.stride ? a.stride : 1
              , p = n * f / d
              , g = f < d
              , k = d / f
              , r = vb.instance(a.weights)
              , w = "s51" + [d.toString(), f.toString(), n.toString(), t.toString(), b].join("_");
            J.$l(w) || (a = Xa(b),
            f = [{
                type: "1f",
                name: "u9",
                value: f
            }, {
                type: "1f",
                name: "u33",
                value: t
            }],
            g && f.push({
                type: "1f",
                name: "u10",
                value: d
            }),
            d = [(g ? p : n).toFixed(1), a],
            g && d.push(k.toFixed(1)),
            J.Sm(g ? "s47" : "s46", w, d),
            J.j(w, f.concat([{
                type: "1i",
                name: "u7",
                value: 0
            }, {
                type: "1i",
                name: "u3",
                value: 1
            }, {
                type: "1i",
                name: "u8",
                value: 3
            }])));
            return {
                oc: !1,
                Hd: function() {
                    return p
                },
                A: function() {
                    r.remove()
                },
                Ca: function() {
                    J.set(w);
                    r.h(3);
                    V.l(!1, !1)
                }
            }
        }
    }
      , Ab = {
        instance: function(a) {
            var b = a.Xi ? a.Xi : 3
              , d = a.Ai ? a.Ai : 64
              , f = a.bj ? a.bj : 64
              , n = a.Ga ? !0 : !1;
            a = {
                isFloat: !1,
                width: d,
                isPot: !1,
                isFlipY: !1
            };
            var t = vb.instance(a)
              , p = vb.instance(a)
              , g = vb.instance(a)
              , k = vb.instance(a)
              , r = vb.instance({
                isFloat: !0,
                width: f,
                isPot: !1,
                isFlipY: !1
            })
              , w = 1 / d;
            return {
                process: function(H) {
                    J.set("s43");
                    k.u();
                    V.l(n, !1);
                    J.set("s44");
                    for (var v = 0; v < b; ++v)
                        t.u(),
                        J.O("u15", w, 0),
                        V.l(n, !1),
                        g.u(),
                        k.h(0),
                        V.l(n, !1),
                        p.u(),
                        t.h(0),
                        J.O("u15", 0, w),
                        V.l(n, !1),
                        k.u(),
                        g.h(0),
                        V.l(n, !1),
                        v !== b - 1 && p.h(0);
                    J.set("s45");
                    r.u();
                    H.h(0);
                    p.h(1);
                    k.h(2);
                    V.l(n, !1);
                    r.h(0)
                },
                Ic: function() {
                    return r
                }
            }
        }
    }
      , Bb = {
        instance: function(a) {
            function b(k, r) {
                return vb.instance({
                    isFloat: k,
                    width: d.Y,
                    isPot: !1,
                    isFlipY: !1,
                    isLinear: r
                })
            }
            var d = Object.assign({
                ob: .1,
                Xa: 9,
                Y: 128,
                gain: 1,
                Ga: !1,
                isLinear: !0
            }, a)
              , f = b(!1, !1)
              , n = [b(!1, d.isLinear), b(!1, d.isLinear), b(!1, d.isLinear)]
              , t = [b(!1, d.isLinear), b(!1, d.isLinear), b(!1, d.isLinear)]
              , p = b(!0, d.isLinear)
              , g = [f, t[0], t[1]];
            a = {
                u1: 0
            };
            J.xc([{
                id: "s53",
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 a=texture2D(u1,vv0).rgb;float b=dot(a,f);gl_FragColor=vec4(b);}",
                o: a,
                i: ["u1"],
                precision: "lowp"
            }, {
                id: "s54",
                name: "_",
                g: "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u34;varying vec2 vv0;void main(){float b=0.,c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u34*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).r,c+=f;}b/=c,gl_FragColor=vec4(b,0.,0.,1.);}".replace("1.1111", Math.round((d.Xa - 1) / 2).toFixed(2)).replace("2.2222", (1 / d.Y).toFixed(6)),
                o: a,
                i: ["u1", "u34"],
                precision: "lowp"
            }, {
                id: "s55",
                name: "_",
                g: "uniform sampler2D u35,u36,u37,u38;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec3 a=texture2D(u35,vv0).rgb;float c=texture2D(u36,vv0).r,d=texture2D(u37,vv0).r,i=texture2D(u38,vv0).r,j=a.r*a.r;vec3 b=vec3(c,d,i),k=max(g*f,abs(vec3(j)-b*b)),l=sqrt(k);gl_FragColor=vec4(a.r,h*(a-b)/l);}".replace("1.1111", d.ob.toFixed(4)).replace("2.2222", d.gain.toFixed(4)),
                o: {
                    u35: 0,
                    u36: 1,
                    u37: 2,
                    u38: 3
                },
                i: ["u35", "u36", "u37", "u38"],
                precision: "highp"
            }]);
            return {
                process: function() {
                    J.set("s53");
                    f.J();
                    V.l(d.Ga, !1);
                    J.set("s54");
                    for (var k = 0; 3 > k; ++k)
                        J.O("u34", 1, 0),
                        n[k].u(),
                        g[k].h(0),
                        V.l(!1, !1),
                        J.O("u34", 0, 1),
                        t[k].u(),
                        n[k].h(0),
                        V.l(!1, !1);
                    J.set("s55");
                    p.u();
                    f.h(0);
                    t[0].h(1);
                    t[1].h(2);
                    t[2].h(3);
                    V.l(!1, !1);
                    p.h(0)
                },
                Ic: function() {
                    return p
                }
            }
        }
    }
      , Fb = {
        instance: function(a) {
            function b(g) {
                return vb.instance({
                    isFloat: g,
                    width: d.Y,
                    isPot: !1,
                    isFlipY: !1
                })
            }
            var d = Object.assign({
                ob: .1,
                Xa: 9,
                Y: 128,
                gain: 1,
                Ga: !1
            }, a)
              , f = b(!1)
              , n = b(!1)
              , t = b(!1)
              , p = b(!0);
            a = {
                u1: 0
            };
            J.xc([{
                id: "s56",
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(.2126,.7152,.0722),g=vec3(1.);void main(){vec3 a=texture2D(u1,vv0).rgb;float b=dot(a,f);gl_FragColor=vec4(a.rgb,b);}",
                o: a,
                i: ["u1"],
                precision: "lowp"
            }, {
                id: "s57",
                name: "_",
                g: "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u34;varying vec2 vv0;void main(){vec3 b=vec3(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u34*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j).rgb,c+=f;}b/=c,gl_FragColor=vec4(b,1.);}".replace("1.1111", Math.round((d.Xa - 1) / 2).toFixed(2)).replace("2.2222", (1 / d.Y).toFixed(6)),
                o: a,
                i: ["u1", "u34"],
                precision: "lowp"
            }, {
                id: "s58",
                name: "_",
                g: "uniform sampler2D u0,u39;const float f=1.1111;const vec3 g=vec3(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);vec3 c=texture2D(u39,vv0).rgb;float d=a.a*a.a;vec3 b=c.rgb,i=max(g*f,abs(vec3(d)-b*b)),j=sqrt(i);gl_FragColor=vec4(a.a,h*(a.rgb-b)/j);}".replace("1.1111", d.ob.toFixed(4)).replace("2.2222", d.gain.toFixed(4)),
                o: {
                    u0: 0,
                    u39: 1
                },
                i: ["u0", "u39"],
                precision: "highp"
            }]);
            return {
                process: function() {
                    J.set("s56");
                    f.J();
                    V.l(d.Ga, !1);
                    J.set("s57");
                    J.O("u34", 1, 0);
                    n.u();
                    f.h(0);
                    V.l(!1, !1);
                    J.O("u34", 0, 1);
                    t.u();
                    n.h(0);
                    V.l(!1, !1);
                    J.set("s58");
                    p.u();
                    f.h(0);
                    t.h(1);
                    V.l(!1, !1);
                    p.h(0)
                },
                Ic: function() {
                    return p
                }
            }
        }
    }
      , Gb = {
        instance: function(a) {
            function b(k) {
                return vb.instance({
                    isFloat: k,
                    width: d.Y,
                    isPot: !1,
                    isFlipY: !1
                })
            }
            var d = Object.assign({
                ob: .1,
                Xa: 9,
                Y: 128,
                gain: 1,
                pg: 0,
                Mc: !1,
                Ga: !1
            }, a)
              , f = b(!1)
              , n = null
              , t = null
              , p = null;
            d.Mc && (n = b(!1),
            t = b(!1),
            p = b(!0));
            a = {
                u1: 0
            };
            var g = [{
                id: "s59",
                name: "_",
                g: "uniform sampler2D u1;const float f=1.1111;varying vec2 vv0;const vec3 e=vec3(.2126,.7152,.0722);void main(){vec2 a=vv0*.5*(f+1.);float b=.5*(1.-f),c=dot(texture2D(u1,a).rgb,e),d=dot(texture2D(u1,a+vec2(0.,b)).rgb,e),h=dot(texture2D(u1,a+vec2(b,0.)).rgb,e),i=dot(texture2D(u1,a+vec2(b,b)).rgb,e);gl_FragColor=vec4(c,d,h,i);}".replace("1.1111", d.pg.toFixed(4)),
                o: a,
                i: ["u1"],
                precision: "lowp"
            }];
            d.Mc && g.push({
                id: "s60",
                name: "_",
                g: "uniform sampler2D u1;const float e=1.1111,g=2.2222;uniform vec2 u34;varying vec2 vv0;void main(){vec4 b=vec4(0.);float c=0.;for(float a=-e;a<=e;a+=1.){vec2 i=u34*a,j=vv0+i*g;float d=1.2*a/e,f=exp(-d*d);b+=f*texture2D(u1,j),c+=f;}gl_FragColor=b/c;}".replace("1.1111", Math.round((d.Xa - 1) / 2).toFixed(2)).replace("2.2222", (1 / d.Y).toFixed(6)),
                o: a,
                i: ["u1", "u34"],
                precision: "lowp"
            }, {
                id: "s61",
                name: "_",
                g: "uniform sampler2D u0,u39;const float f=1.1111;const vec4 g=vec4(1.);const float h=2.2222;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0),c=texture2D(u39,vv0),d=a*a,b=c,i=max(g*f,abs(d-b*b)),j=sqrt(i);gl_FragColor=h*(a-b)/j;}".replace("1.1111", d.ob.toFixed(4)).replace("2.2222", d.gain.toFixed(4)),
                o: {
                    u0: 0,
                    u39: 1
                },
                i: ["u0", "u39"],
                precision: "highp"
            });
            J.xc(g);
            return {
                process: function() {
                    J.set("s59");
                    f.J();
                    V.l(d.Ga, !1);
                    d.Mc ? (J.set("s60"),
                    J.O("u34", 1, 0),
                    n.u(),
                    f.h(0),
                    V.l(!1, !1),
                    J.O("u34", 0, 1),
                    t.u(),
                    n.h(0),
                    V.l(!1, !1),
                    J.set("s61"),
                    p.u(),
                    f.h(0),
                    t.h(1),
                    V.l(!1, !1),
                    p.h(0)) : f.h(0)
                },
                qm: function() {
                    return 2 - d.pg
                },
                Ic: function() {
                    return d.Mc ? p : f
                }
            }
        }
    };
    function Qb(a, b) {
        a[b] = !0;
        a.setAttribute(b, "true")
    }
    function Rb() {
        var a = !1
          , b = navigator.userAgent || navigator.vendor || window.opera;
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(b) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(b.substr(0, 4)))
            a = !0;
        return a
    }
    function Sb(a, b) {
        window.addEventListener("beforeunload", function() {
            b && b.getTracks && b.getTracks().forEach(function(d) {
                b.removeTrack(d)
            });
            a.videoStream && a.videoStream.stop();
            a.videoStream = null
        }, !1)
    }
    function Tb() {
        var a = navigator.userAgent.toLowerCase();
        return -1 !== a.indexOf("safari") && -1 === a.indexOf("chrome") ? !0 : !1
    }
    function Ub() {
        return navigator.mediaDevices && navigator.mediaDevices.getUserMedia ? !0 : !1
    }
    function Vb(a) {
        if (!a)
            return a;
        var b = null;
        if (a.video) {
            var d = function(f) {
                return f && "object" === typeof f ? Object.assign({}, f) : f
            };
            b = {};
            "undefined" !== typeof a.video.width && (b.width = d(a.video.width));
            "undefined" !== typeof a.video.height && (b.height = d(a.video.height));
            "undefined" !== typeof a.video.facingMode && (b.facingMode = d(a.video.facingMode))
        }
        b = {
            audio: a.audio,
            video: b
        };
        "undefined" !== typeof a.deviceId && Wb(b, a.deviceId);
        return b
    }
    function Wb(a, b) {
        b && (a.video = a.video || {},
        a.video.deviceId = {
            exact: b
        },
        a.video.facingMode && delete a.video.facingMode)
    }
    function Xb(a) {
        var b = a.video.width;
        a.video.width = a.video.height;
        a.video.height = b;
        return a
    }
    function Yb(a) {
        function b(v) {
            return [480, 576, 640, 648, 720, 768, 800, 960, 1080, 1152, 1280, 1366, 1920].sort(function(x, y) {
                return Math.abs(x - v) - Math.abs(y - v)
            })
        }
        function d(v) {
            var x = Vb(a);
            v = v(x);
            n.push(v);
            f(v)
        }
        function f(v) {
            if (v.video && v.video.facingMode && v.video.facingMode.exact) {
                var x = v.video.facingMode.exact;
                v = Vb(v);
                delete v.video.facingMode.exact;
                v.video.facingMode.ideal = x;
                n.push(v)
            }
        }
        var n = [];
        if (!a || !a.video)
            return n;
        f(a);
        if (a.video.width && a.video.height) {
            if (a.video.width.ideal && a.video.height.ideal) {
                var t = b(a.video.width.ideal).slice(0, 3)
                  , p = b(a.video.height.ideal).slice(0, 3)
                  , g = {}
                  , k = 0;
                for (g.Mb = void 0; k < t.length; g = {
                    Mb: g.Mb
                },
                ++k) {
                    g.Mb = t[k];
                    var r = {}
                      , w = 0;
                    for (r.Bb = void 0; w < p.length; r = {
                        Bb: r.Bb
                    },
                    ++w)
                        if (r.Bb = p[w],
                        g.Mb !== a.video.width.ideal || r.Bb !== a.video.height.ideal) {
                            var H = Math.max(g.Mb, r.Bb) / Math.min(g.Mb, r.Bb);
                            H < 4 / 3 - .1 || H > 16 / 9 + .1 || d(function(v, x) {
                                return function(y) {
                                    y.video.width.ideal = v.Mb;
                                    y.video.height.ideal = x.Bb;
                                    return y
                                }
                            }(g, r))
                        }
                }
            }
            d(function(v) {
                return Xb(v)
            })
        }
        a.video.width && a.video.height && (a.video.width.ideal && a.video.height.ideal && d(function(v) {
            delete v.video.width.ideal;
            delete v.video.height.ideal;
            return v
        }),
        d(function(v) {
            delete v.video.width;
            delete v.video.height;
            return v
        }));
        a.video.facingMode && (d(function(v) {
            delete v.video.facingMode;
            return v
        }),
        a.video.width && a.video.height && d(function(v) {
            Xb(v);
            delete v.video.facingMode;
            return v
        }));
        n.push({
            audio: a.audio,
            video: !0
        });
        return n
    }
    function Zb(a) {
        a.volume = 0;
        Qb(a, "muted");
        if (Tb()) {
            if (1 === a.volume) {
                var b = function() {
                    a.volume = 0;
                    window.removeEventListener("mousemove", b, !1);
                    window.removeEventListener("touchstart", b, !1)
                };
                window.addEventListener("mousemove", b, !1);
                window.addEventListener("touchstart", b, !1)
            }
            setTimeout(function() {
                a.volume = 0;
                Qb(a, "muted")
            }, 5)
        }
    }
    function $b(a) {
        var b = bc.element
          , d = bc.Eh;
        return null === b ? Promise.resolve() : new Promise(function(f, n) {
            if (b.srcObject && b.srcObject.getVideoTracks) {
                var t = b.srcObject.getVideoTracks();
                1 !== t.length ? n("INVALID_TRACKNUMBER") : (t = t[0],
                a ? cc(b, f, n, d) : (t.stop(),
                f()))
            } else
                n("BAD_IMPLEMENTATION")
        }
        )
    }
    function dc(a, b, d, f) {
        function n(p) {
            t || (t = !0,
            d(p))
        }
        var t = !1;
        navigator.mediaDevices.getUserMedia(f).then(function(p) {
            function g() {
                setTimeout(function() {
                    if (a.currentTime) {
                        var r = a.videoHeight;
                        if (0 === a.videoWidth || 0 === r)
                            n("VIDEO_NULLSIZE");
                        else {
                            r = {
                                tl: null,
                                Lg: null,
                                An: null
                            };
                            try {
                                var w = p.getVideoTracks()[0];
                                w && (r.An = w,
                                r.tl = w.getCapabilities(),
                                r.Lg = w.getSettings())
                            } catch (H) {}
                            t || (Sb(a, p),
                            b(a, p, r))
                        }
                    } else
                        n("VIDEO_NOTSTARTED")
                }, 700)
            }
            function k() {
                a.removeEventListener("loadeddata", k, !1);
                var r = a.play();
                Zb(a);
                "undefined" === typeof r ? g() : r.then(function() {
                    g()
                }).catch(function() {
                    n("VIDEO_PLAYPROMISEREJECTED")
                })
            }
            "undefined" !== typeof a.srcObject ? a.srcObject = p : (a.src = window.URL.createObjectURL(p),
            a.videoStream = p);
            Zb(a);
            a.addEventListener("loadeddata", k, !1)
        }).catch(function(p) {
            n(p)
        })
    }
    function cc(a, b, d, f) {
        a ? Ub() ? (Qb(a, "autoplay"),
        Qb(a, "playsinline"),
        f && f.audio ? a.volume = 0 : Qb(a, "muted"),
        ec(f).then(function() {
            dc(a, b, function() {
                function n(p) {
                    if (0 === p.length)
                        d("NO_VALID_MEDIASTREAM_FALLBACK_CONSTRAINTS");
                    else {
                        var g = p.shift();
                        dc(a, b, function() {
                            n(p)
                        }, g)
                    }
                }
                var t = Yb(f);
                n(t)
            }, f)
        })) : d && d("MEDIASTREAMAPI_NOT_FOUND") : d && d("VIDEO_NOT_PROVIDED")
    }
    function ec(a) {
        if (!a || !a.video || !a.video.facingMode)
            return Promise.resolve("NO_VIDEO_CONSTRAINTS");
        if (a.video.deviceId)
            return Promise.resolve("DEVICEID_ALREADY_SET");
        var b = a.video.facingMode;
        b = b.exact || b.ideal;
        if (!b)
            return Promise.resolve("NO_FACINGMODE");
        var d = {
            user: [],
            environment: ["camera2 0"]
        }[b];
        return d && 0 !== d.length ? new Promise(function(f) {
            fc(function(n) {
                n ? (n = n.find(function(t) {
                    var p = t.label;
                    return p ? d.some(function(g) {
                        return p.includes(g)
                    }) : !1
                })) ? (a.video.deviceId = {
                    exact: n.deviceId
                },
                f("SUCCESS")) : f("NO_PREFERRED_DEVICE_FOUND") : f("NO_DEVICES_FOUND")
            })
        }
        ) : Promise.resolve("NO_PREFERRED_CAMERAS")
    }
    function fc(a) {
        navigator.mediaDevices && navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices().then(function(b) {
            (b = b.filter(function(d) {
                return d.kind && -1 !== d.kind.toLowerCase().indexOf("video") && d.label && d.deviceId
            })) && b.length && 0 < b.length ? a(b, !1) : a(!1, "NODEVICESFOUND")
        }).catch(function() {
            a(!1, "PROMISEREJECTED")
        }) : a(!1, "NOTSUPPORTED")
    }
    var gc = function() {
        function a(l, E, L, B, D, e, q) {
            if (!y)
                if (q === e.length)
                    D();
                else {
                    switch (e[q]) {
                    case "A":
                        L();
                        break;
                    case "D":
                        l();
                        break;
                    case "S":
                        E().then(function(z, O) {
                            m.Zj();
                            a(l, E, L, O ? null : B, D, e, ++q)
                        }).catch(function(z) {
                            console.log("An error occurred in the WebAR loop: ", z);
                            D()
                        });
                        return;
                    case "R":
                        B && B()
                    }
                    a(l, E, L, B, D, e, ++q)
                }
        }
        var b = {
            n: 5,
            ig: 1,
            Sf: 0,
            dm: [25, 39],
            Jh: 45,
            Bd: [2, 200],
            k: .7,
            kp: 200,
            Mn: .05
        }
          , d = -1
          , f = null
          , n = -1
          , t = -1
          , p = 0
          , g = -1
          , k = -1
          , r = 0
          , w = null
          , H = 0
          , v = b.Bd[1]
          , x = Math.log(2)
          , y = !0
          , m = {
            X: function() {
                switch (d) {
                case -1:
                    return -1;
                case 0:
                    return k + f.Sf;
                case 1:
                    return r
                }
            },
            fi: function(l) {
                switch (d) {
                case -1:
                    return 1;
                case 0:
                    return Math.pow(Math.min(Math.max(g, 0), f.n - 1) / (f.n - 1), l || 1);
                case 1:
                    return (r - f.Sf) / (f.n - 1)
                }
            },
            m: function(l) {
                f = Object.assign({}, b, l);
                g = k = f.ig;
                d = 0;
                w = f.dm.slice(0);
                m.reset();
                m.Zl().then(function(E) {
                    E >= f.Jh || (E /= f.Jh,
                    w[0] *= E,
                    w[1] *= E)
                })
            },
            Zj: function(l) {
                l = ("undefined" === typeof l ? Date.now() : l) || 0;
                var E = Math.min(Math.max(l - H, f.Bd[0]), f.Bd[1]);
                v = E;
                H = l;
                var L = -1 === n ? 0 : f.k;
                n = Math.min(Math.max(1E3 / E, 5), 120) * (1 - L) + n * L;
                l - t > f.kp && 5 < ++p && (E = f.k,
                g = g * (1 - E) + (n < w[0] ? k - 1 : n > w[1] ? k + 1 : k) * E,
                Math.abs(g - k) > 1 - f.Mn && (E = Math.min(Math.max(Math.round(g), 0), f.n - 1),
                E !== k && (g = k = E,
                n = .5 * (w[1] - w[0]))),
                t = l)
            },
            xg: function(l, E, L, B, D, e) {
                y = !1;
                a(l, E, L, B, D, e, 0)
            },
            stop: function() {
                y = !0
            },
            Fo: function(l) {
                r = l;
                d = 1
            },
            jp: function() {
                d = 0;
                m.reset()
            },
            reset: function() {
                v = b.Bd[1];
                t = n = -1;
                p = 0
            },
            lr: function(l, E, L) {
                L = Math.exp(-x * v / L);
                return (1 - L) * l + L * E
            },
            pq: function() {
                return v
            },
            Zl: function() {
                return new Promise(function(l) {
                    function E(q) {
                        q = q || Date.now();
                        var z = Math.max(0, q - B);
                        B = q;
                        0 !== D++ && 0 < z && (L = Math.min(L, z),
                        ++e);
                        10 >= D ? window.requestAnimationFrame(E) : l(Math.round(1E3 / L))
                    }
                    var L = Infinity
                      , B = 0
                      , D = 0
                      , e = 0;
                    setTimeout(E, 1)
                }
                )
            }
        };
        return m
    }()
      , hc = function() {
        function a(H, v) {
            var x = H[0] - .5;
            H = H[1] - .5;
            var y = v[0] - .5;
            v = v[1] - .5;
            return x * x + H * H - (y * y + v * v)
        }
        var b = {
            Yi: 4,
            fe: [1.5, 1.5, 2],
            ua: [.1, .1, .1],
            tj: 1,
            Y: -1,
            cb: -1,
            cp: 2,
            Jn: 1,
            yg: !0,
            dn: !1,
            Xl: .8
        }
          , d = null
          , f = []
          , n = []
          , t = []
          , p = [0]
          , g = [.5, .5, 1]
          , k = null
          , r = 0
          , w = [0, 0, 0];
        return {
            m: function(H) {
                d = Object.assign({}, b, H);
                f.splice(0);
                n.splice(0);
                t.splice(0);
                r = 0;
                H = d.fe[0] * d.ua[0];
                var v = d.fe[1] * d.ua[1]
                  , x = 1 / (1 + d.fe[2] * d.ua[2])
                  , y = Math.min(d.Y, d.cb)
                  , m = d.Y / d.cb
                  , l = d.tj * y
                  , E = l / d.Y;
                l /= d.cb;
                var L = .5 * y / d.Y;
                y = .5 * y / d.cb;
                var B = .5 * d.Xl;
                B *= B;
                for (var D = 0; D < d.Yi; ++D) {
                    var e = [];
                    n.push(e);
                    var q = Math.pow(x, D)
                      , z = E * q
                      , O = l * q;
                    q = z * d.Jn;
                    t.push(q);
                    var G = z * H
                      , S = O * v;
                    z /= 2;
                    O /= 2;
                    for (var Q = 1 + (1 - z - z) / G, I = 1 + (1 - O - O) / S, A = 0; A < I; ++A)
                        for (var u = O + A * S, N = u - .5, R = 0; R < Q; ++R) {
                            var T = z + R * G
                              , aa = T - .5;
                            if (!(aa * aa + N * N > B)) {
                                if (d.dn) {
                                    var ka = Math.abs(N) + .5 * q * m;
                                    if (Math.abs(aa) + .5 * q > L || ka > y)
                                        continue
                                }
                                T = [T, u, q];
                                f.push(T);
                                e.push(T)
                            }
                        }
                    d.yg && e.sort(a);
                    k = f
                }
                d.yg && f.sort(a)
            },
            get: function(H) {
                var v = k.length;
                if (0 === v)
                    return g;
                for (; H >= p.length; )
                    p.push(0);
                p[H] >= v && (p[H] = 0);
                var x = k[Math.floor(p[H]) % v];
                p[H] = (p[H] + 1 / d.cp) % v;
                if (0 === r)
                    return x;
                w[0] = x[0];
                w[1] = x[1];
                w[2] = r;
                return w
            },
            Qq: function(H) {
                H >= p.length || (p[H] = Math.floor(Math.random() * k.length))
            },
            cr: function(H) {
                r = H;
                if (0 === r)
                    k = f;
                else {
                    for (var v = t.length, x = v - 1, y = 0; y < v; ++y)
                        if (t[y] <= H) {
                            x = y;
                            break
                        }
                    k = n[x]
                }
            },
            reset: function() {
                for (var H = f.length / p.length, v = 0; v < p.length; ++v)
                    p[v] = Math.floor(v * H);
                r = 0;
                k = f
            }
        }
    }()
      , ic = function() {
        function a() {
            d(m + x.cg);
            l.port.postMessage("DONE")
        }
        function b() {
            D.ld = 0 === x.Ea ? L(d) : L(f)
        }
        function d(G) {
            B.$b && null !== y && (G -= m,
            G = Math.min(Math.max(G, x.Rh[0]), x.Rh[1]),
            m += G,
            t(),
            e.isEnabled && e.Nc && B.Ra && m - e.Pf > x.oh && (r(),
            e.Pf = m),
            y(m))
        }
        function f(G) {
            B.$b && (D.timeout = setTimeout(d.bind(null, G), x.Ea))
        }
        function n() {
            y = null;
            B.$b = !1;
            t()
        }
        function t() {
            D.ld && (window.cancelAnimationFrame(D.ld),
            D.ld = null);
            D.timeout && (window.clearTimeout(D.timeout),
            D.timeout = null)
        }
        function p(G) {
            G && !B.Ra ? (B.Ra = !0,
            E && gc.jp(),
            l.port.postMessage("STOP"),
            ob.$j(!0),
            b()) : !G && B.Ra && (B.Ra = !1,
            E && gc.Fo(1),
            ob.$j(!1),
            l.port.postMessage("START"))
        }
        function g(G) {
            G.target.hidden ? z() : q()
        }
        function k(G, S, Q) {
            S = G.createShader(S);
            G.shaderSource(S, Q);
            G.compileShader(S);
            return S
        }
        function r() {
            e.Nc = !1;
            var G = e.ab
              , S = e.Ld
              , Q = e.Md
              , I = e.Fa;
            G.uniform1f(e.ti, Math.random());
            e.ac ? S.beginQueryEXT(I, Q) : G.beginQuery(I, Q);
            G.drawElements(G.POINTS, 1, G.UNSIGNED_SHORT, 0);
            e.ac ? S.endQueryEXT(I) : G.endQuery(I);
            ob.flush();
            H().then(function(A) {
                0 === A || isNaN(A) ? (e.isEnabled = !1,
                console.log("WARNING in benchmark_GPUClock: WebGL timer queries is not working properly. timeElapsedNs =", A)) : (A = x.wk * x.nh * 1E3 / A,
                e.Ee = (e.Ee + 1) % x.vc,
                e.Qf[e.Ee] = A,
                ++e.Ni > x.vc && (e.Td.set(e.Qf),
                e.Td.sort(function(u, N) {
                    return u - N
                }),
                A = e.Td[Math.floor(x.vc / 2)],
                e.Ed = Math.max(e.Ed, A),
                x.mh(A / e.Ed)),
                e.Nc = !0)
            }).catch(function() {
                e.Nc = !0
            })
        }
        function w(G) {
            var S = e.ab
              , Q = e.Ld
              , I = e.Md;
            I = e.ac ? Q.jq(I, Q.QUERY_RESULT_AVAILABLE_EXT) : S.getQueryParameter(I, S.QUERY_RESULT_AVAILABLE);
            S = S.getParameter(Q.GPU_DISJOINT_EXT);
            I ? G(!S) : setTimeout(w.bind(null, G), .1)
        }
        function H() {
            return new Promise(function(G, S) {
                w(function(Q) {
                    if (Q) {
                        Q = e.ab;
                        var I = e.Ld
                          , A = e.Md;
                        Q = e.ac ? I.getQueryObjectEXT(A, I.QUERY_RESULT_EXT) : Q.getQueryParameter(A, Q.QUERY_RESULT);
                        G(Q)
                    } else
                        S()
                })
            }
            )
        }
        var v = {
            Ei: !0,
            Rh: [1, 200],
            cg: 20,
            Ea: 0,
            nh: 50,
            wk: 240,
            oh: 3E3,
            vc: 3,
            mh: null
        }
          , x = null
          , y = null
          , m = 0
          , l = null
          , E = !1
          , L = null
          , B = {
            Qa: !1,
            Ra: !0,
            Of: !1,
            Mf: !1,
            Lf: !1,
            $b: !1
        }
          , D = {
            ld: null,
            timeout: null
        }
          , e = {
            isEnabled: !1,
            Nc: !1,
            ab: null,
            Ld: null,
            Md: null,
            Fa: null,
            ti: null,
            ac: !0,
            Pf: 0,
            Ni: 0,
            Qf: null,
            Td: null,
            Ee: 0,
            Ed: 0
        }
          , q = p.bind(null, !0)
          , z = p.bind(null, !1)
          , O = {
            m: function(G) {
                x = Object.assign(v, G);
                Object.assign(B, {
                    Ra: !0,
                    Qa: !0,
                    $b: !1
                });
                L = window.requestPostAnimationFrame || window.requestAnimationFrame;
                if (null !== x.mh) {
                    G = document.createElement("canvas");
                    G.setAttribute("width", "1");
                    G.setAttribute("height", "1");
                    var S = {
                        antialias: !1
                    };
                    G = G.getContext("webgl2", S) || G.getContext("webgl", S);
                    if (S = G.getExtension("EXT_disjoint_timer_query") || G.getExtension("EXT_disjoint_timer_query_webgl2")) {
                        e.ab = G;
                        e.Ld = S;
                        e.isEnabled = !0;
                        e.ac = S.beginQueryEXT ? !0 : !1;
                        var Q = k(G, G.VERTEX_SHADER, "attribute vec4 a0;void main(){gl_Position=a0;}")
                          , I = k(G, G.FRAGMENT_SHADER, "precision lowp float;uniform float u40;void main(){vec4 a=u40*vec4(1.,2.,3.,4.);for(int b=0;b<666;b+=1)a=cos(a);gl_FragColor=a;}".replace("666", x.nh.toString()))
                          , A = G.createProgram();
                        G.attachShader(A, Q);
                        G.attachShader(A, I);
                        G.linkProgram(A);
                        Q = G.getAttribLocation(A, "a0");
                        e.ti = G.getUniformLocation(A, "u40");
                        G.useProgram(A);
                        G.enableVertexAttribArray(Q);
                        A = G.createBuffer();
                        G.bindBuffer(G.ARRAY_BUFFER, A);
                        G.bufferData(G.ARRAY_BUFFER, new Float32Array([.5, .5, 0, 1]), G.STATIC_DRAW);
                        G.vertexAttribPointer(Q, 4, G.FLOAT, !1, 16, 0);
                        A = G.createBuffer();
                        G.bindBuffer(G.ELEMENT_ARRAY_BUFFER, A);
                        G.bufferData(G.ELEMENT_ARRAY_BUFFER, new Uint16Array([0]), G.STATIC_DRAW);
                        G.disable(G.DEPTH_TEST);
                        G.disable(G.DITHER);
                        G.disable(G.STENCIL_TEST);
                        G.viewport(0, 0, 1, 1);
                        A = e.ac ? S.createQueryEXT() : G.createQuery();
                        e.Md = A;
                        e.Fa = S.TIME_ELAPSED_EXT || G.TIME_ELAPSED;
                        e.Pf = -x.oh;
                        e.Qf = new Float32Array(x.vc);
                        e.Td = new Float32Array(x.vc);
                        e.Ed = 0;
                        e.Ee = 0;
                        e.Ni = 0;
                        e.Nc = !0
                    }
                }
                if (x.Ei) {
                    G = !1;
                    try {
                        if ("undefined" === typeof SharedWorker) {
                            var u = URL.createObjectURL(new Blob(["let handler = null;\n      self.addEventListener('message', function(e){\n        if (handler !== null){\n          clearTimeout(handler);\n          handler = null;\n        }\n        switch (e.data) {\n          case 'START':\n          case 'DONE':\n            handler = setTimeout(function(){\n              self.postMessage('TICK');\n            }, " + x.cg.toString() + ");\n            break;\n          case 'STOP':\n            break;\n        };\n      }, false);"],{
                                type: "text/javascript"
                            }))
                              , N = new Worker(u);
                            N.addEventListener("message", a);
                            l = {
                                kj: N,
                                port: N
                            };
                            B.Of = !0
                        } else {
                            var R = URL.createObjectURL(new Blob(["let handler = null;\n      onconnect = function(e) {\n        const port = e.ports[0];\n        port.addEventListener('message', function(e) {\n          \n          if (handler !== null){\n            clearTimeout(handler);\n            handler = null;\n          }\n          switch (e.data) {\n            case 'START':\n            case 'DONE':\n              handler = setTimeout(function(){\n                port.postMessage('TICK');\n              }, " + x.cg.toString() + ");\n              break;\n            case 'STOP':\n              break;\n          };\n          \n        });\n        \n        port.start();\n      } // end onconnect()"],{
                                type: "text/javascript"
                            }))
                              , T = new SharedWorker(R);
                            T.port.start();
                            T.port.addEventListener("message", a);
                            l = {
                                kj: T,
                                port: T.port
                            };
                            B.Mf = !0
                        }
                        G = !0
                    } catch (aa) {}
                    G && ("onvisibilitychange"in document ? document.addEventListener("visibilitychange", g) : (window.addEventListener("blur", z),
                    window.addEventListener("focus", q)),
                    window.addEventListener("pagehide", z),
                    window.addEventListener("pageshow", q),
                    B.Lf = !0)
                }
                E = "undefined" !== typeof gc
            },
            A: function() {
                n();
                B.Lf && ("onvisibilitychange"in document ? document.removeEventListener("visibilitychange", g) : (window.removeEventListener("blur", z),
                window.removeEventListener("focus", q)),
                window.removeEventListener("pagehide", z),
                window.removeEventListener("pageshow", q),
                B.Lf = !1);
                B.Mf ? (l.port.close(),
                B.Mf = !1) : B.Of && (l.kj.terminate(),
                B.Of = !1);
                Object.assign(B, {
                    Ra: !0,
                    Qa: !1,
                    $b: !1
                });
                y = null
            },
            Lq: function() {
                return B.Ra
            },
            update: function(G) {
                Object.assign(x, G)
            },
            xg: function(G) {
                B.Qa || O.m({});
                t();
                B.$b = !0;
                y = G;
                B.Ra && b()
            },
            stop: n
        };
        return O
    }()
      , jc = {
        vf: function() {
            return Date.now()
        },
        mq: function() {
            return performance.now()
        }
    }
      , kc = function() {
        var a = {
            Zm: !0,
            isLinear: !0,
            dg: [4, 11]
        };
        return {
            hq: function(b, d, f) {
                return d.isDetected ? Math.floor(d.s * b) : (b = Math.floor(Math.log2(b / 4)),
                b = Math.min(Math.max(b, 4), 9),
                Math.max(f, Math.pow(2, b)))
            },
            instance: function(b) {
                var d = Object.assign({}, a, b)
                  , f = []
                  , n = null
                  , t = -1
                  , p = null
                  , g = !1;
                for (b = d.dg[0]; b <= d.dg[1]; ++b)
                    f[b] = null;
                return {
                    J: function(k, r) {
                        r !== t && (n && n.remove(),
                        n = vb.instance({
                            isLinear: d.isLinear,
                            isPot: !0,
                            width: r
                        }));
                        if (g = d.Zm && r < .5 * k) {
                            k = Math.floor(Math.log2(k));
                            var w = d.dg;
                            k = Math.min(Math.max(k, w[0]), w[1]);
                            w = k;
                            if (!f[w]) {
                                var H = vb.instance({
                                    isPot: !0,
                                    isMipmap: !0,
                                    Gi: !0,
                                    width: Math.pow(2, w)
                                });
                                f[w] = {
                                    V: H,
                                    Wi: -1
                                }
                            }
                            k = f[k];
                            p = k.V;
                            k.Wi !== r && (w = Math.log2(r),
                            p.h(0),
                            p.Ij(w),
                            vb.ba(0),
                            k.Wi = r)
                        } else
                            p = n;
                        t = r;
                        p.J()
                    },
                    h: function(k) {
                        p.h(k);
                        g && p.Hc()
                    },
                    za: function(k) {
                        p.za(k)
                    },
                    remove: function() {
                        n && n.remove();
                        f.forEach(function(k) {
                            k && k.V.remove()
                        })
                    }
                }
            }
        }
    }()
      , lc = function() {
        function a(W) {
            switch (q) {
            case e.movePinch:
                var U = -W.deltaY;
                0 === z && m("pinch", -1, .001 * U, null)
            }
            W.deltaY;
            W.preventDefault()
        }
        function b(W) {
            if (-1 !== z)
                switch (q) {
                case e.swipe:
                    if (1 !== z)
                        break;
                    k();
                    w(W, G);
                    var U = G[0] - O[0];
                    n(U);
                    W = U / (20 * L.offsetWidth / 100);
                    m("swipeMove", Math.min(Math.max(W, -1), 1), W, null);
                    break;
                case e.movePinch:
                    if (2 === z || 3 === z) {
                        w(W, G);
                        U = G[0] - O[0];
                        var da = G[1] - O[1];
                        2 === z ? (M += Math.sqrt(U * U + da * da),
                        10 > M ? (O[0] = G[0],
                        O[1] = G[1]) : (ja || (ja = !0,
                        m("moveStart", null, null, null)),
                        ca[0] = U,
                        ca[1] = da,
                        Q[0] = U - S[0],
                        Q[1] = da - S[1],
                        m("move", ca, Q, null),
                        S[0] = ca[0],
                        S[1] = ca[1])) : 3 === z && (W = r(W) / la,
                        m("pinch", W, W - pa, null),
                        pa = W)
                    }
                }
        }
        function d(W) {
            if (-1 !== z)
                switch (q) {
                case e.swipe:
                    if (1 !== z)
                        break;
                    k();
                    w(W, G);
                    W = G[0] - O[0];
                    var U = 0 > W;
                    (W = 20 < 100 * Math.abs(W) / L.offsetWidth) && U ? m("swipeLeft", I, null, null) : W && !U && m("swipeRight", I, null, null);
                    var da = function() {
                        setTimeout(function() {
                            g();
                            z = 0;
                            m("swipeEnd", null, null, null)
                        }, 202)
                    };
                    W ? (W = function() {
                        var Na = (U ? -1 : 1) * L.width
                          , Wa = (U ? 1 : -1) * Na / L.width;
                        I.style.transitionDuration = (400).toString() + "ms";
                        I.style.left = (T[0] + Na).toString() + "px";
                        I.style.top = T[1].toString() + "px";
                        I.style.transform = "rotate( " + Wa.toString() + "rad )";
                        da()
                    }
                    ,
                    R ? W() : aa = W) : (I.style.transitionDuration = (200).toString() + "ms",
                    I.style.opacity = "0",
                    I.style.left = T[0].toString() + "px",
                    I.style.top = T[1].toString() + "px",
                    I.style.transform = "",
                    da());
                    z = -1;
                    break;
                case e.movePinch:
                    if (2 === z || 3 === z)
                        z === z.move ? m("moveEnd", null, null, null) : 3 === z && m("pinchEnd", null, null, null),
                        z = 0
                }
        }
        function f(W) {
            W.preventDefault();
            if (-1 !== z)
                switch (q) {
                case e.swipe:
                    if (0 !== z)
                        break;
                    k();
                    z = 1;
                    ka = setTimeout(function() {
                        g();
                        ka = null;
                        1 === z && (z = 0,
                        m("swipeEnd", null, null, null))
                    }, 1E3);
                    t();
                    m("swipeStart", null, null, null);
                    m("swipeGetCanvas", I, u, A);
                    w(W, O);
                    break;
                case e.movePinch:
                    0 !== z ? 2 !== z || ja || void 0 === W.changedTouches && void 0 === W.touches || (la = r(W),
                    20 < la && (z = 3,
                    pa = 1,
                    m("pinchStart", null, null, null))) : 3 !== z && (ja = !1,
                    w(W, O),
                    S[0] = 0,
                    S[1] = 0,
                    z = 2,
                    M = 0)
                }
        }
        function n(W) {
            var U = 0 > W;
            I.style.left = T[0] + W + "px";
            I.style.transformOrigin = U ? F : Aa;
            I.style.transform = "rotate( " + ((U ? 1 : -1) * W / L.width).toString() + "rad )"
        }
        function t() {
            R = !1;
            var W = L.getBoundingClientRect();
            T[0] = W.left;
            T[1] = W.top;
            I.width = Math.round(L.width / 4);
            I.height = Math.round(L.height / 4);
            A.width = I.width;
            A.height = I.height;
            I.style.width = L.offsetWidth + "px";
            I.style.height = L.offsetHeight + "px";
            I.style.left = T[0] + "px";
            I.style.top = T[1] + "px";
            setTimeout(p, 0)
        }
        function p() {
            u.drawImage(L, 0, 0, I.width, I.height);
            N.drawImage(I, 0, 0);
            R = !0;
            document.body.appendChild(I);
            aa && (aa(),
            aa = !1)
        }
        function g() {
            I.style.transitionDuration = "0ms";
            I.style.opacity = "1";
            I.style.transform = "";
            R && (document.body.removeChild(I),
            R = !1)
        }
        function k() {
            ka && (window.clearTimeout(ka),
            ka = null)
        }
        function r(W) {
            H(W, Da, 0);
            H(W, xa, 1);
            return Math.sqrt(Da[0] * Da[0] + xa[0] * xa[0])
        }
        function w(W, U) {
            void 0 !== W.changedTouches || void 0 !== W.touches ? H(W, U, 0) : (U[0] = W.pageX,
            U[1] = W.pageY)
        }
        function H(W, U, da) {
            W.touches.length > da ? (U[0] = W.touches[da].pageX,
            U[1] = W.touches[da].pageY) : (U[0] = W.changedTouches[da].pageX,
            U[1] = W.changedTouches[da].pageY)
        }
        function v() {
            D.forEach(function(W) {
                L.removeEventListener(W.type, W.wb, !1)
            });
            return D.splice(0, D.length)
        }
        function x(W) {
            W.forEach(function(U) {
                y(U.type, U.wb)
            })
        }
        function y(W, U) {
            L.removeEventListener(W, U, !1);
            I.removeEventListener(W, U, !1);
            L.addEventListener(W, U, !1);
            I.addEventListener(W, U, !1);
            0 === D.filter(function(da) {
                return da.type === W && da.wb === U
            }).length && D.push({
                type: W,
                wb: U
            })
        }
        function m(W, U, da, Na) {
            B[W].forEach(function(Wa) {
                Wa.wb(U, da, Na)
            })
        }
        function l(W) {
            return W[0] + "% " + (100 - W[1]).toString() + "%"
        }
        var E = !1
          , L = null
          , B = {
            swipeStart: [],
            swipeEnd: [],
            swipeLeft: [],
            swipeRight: [],
            swipeMove: [],
            swipeGetCanvas: [],
            pinch: [],
            pinchStart: [],
            pinchEnd: [],
            move: [],
            moveStart: [],
            moveEnd: []
        }
          , D = []
          , e = {
            idle: 0,
            swipe: 1,
            movePinch: 2
        }
          , q = e.idle
          , z = 0
          , O = [0, 0]
          , G = [0, 0]
          , S = [0, 0]
          , Q = [0, 0]
          , I = document.createElement("canvas")
          , A = document.createElement("canvas")
          , u = I.getContext("2d")
          , N = A.getContext("2d");
        I.style.position = "fixed";
        I.style.zIndex = "800";
        I.style.cursor = "move";
        I.style.pointerEvents = "none";
        I.className = "swipeImage";
        I.setAttribute("draggable", !1);
        var R = !1
          , T = [0, 0]
          , aa = null
          , ka = null
          , Aa = l([50, 100])
          , F = l([50, 0])
          , h = null
          , M = 0
          , ca = [0, 0]
          , la = 0
          , ja = !1
          , pa = 1
          , Da = [0, 0]
          , xa = [0, 0]
          , ra = {
            init: function(W) {
                if (E)
                    ra.switch_canvas(W.ta);
                else
                    return L = W.ta,
                    y("mousedown", f),
                    y("mouseup", d),
                    y("mouseout", d),
                    y("mousemove", b),
                    y("mousemove", b),
                    y("wheel", a),
                    y("touchstart", f),
                    y("touchend", d),
                    y("touchmove", b),
                    E = !0,
                    ra
            },
            switch_canvas: function(W) {
                if (!E)
                    ra.init({
                        ta: W
                    });
                else if (L !== W) {
                    var U = v();
                    L = W;
                    x(U);
                    for (var da in B)
                        for (W = B[da],
                        U = W.length - 1; 0 <= U; --U)
                            W[U].co && W.splice(U, 1)
                }
            },
            get_mode: function() {
                for (var W in e)
                    if (e[W] === q)
                        return W;
                return !1
            },
            switch_mode: function(W) {
                E && "undefined" !== typeof e[W] && (W = e[W],
                q !== W && (k(),
                q = W,
                z = 0))
            },
            add_listener: function(W, U, da) {
                B[W].push({
                    wb: U,
                    co: "undefined" === typeof da ? !1 : da
                });
                return ra
            },
            remove_listener: function(W) {
                B[W].splice(0, B[W].length);
                return ra
            },
            animate_swipe: function(W, U) {
                h && (clearInterval(h),
                h = null);
                t();
                var da = L.width / (U / 1E3) * ("left" === W ? -1 : 1), Na = 0, Wa, Fa = Date.now();
                h = setInterval(function() {
                    h && (Wa = Date.now(),
                    Na += (Wa - Fa) / 1E3 * da,
                    n(Na),
                    Fa = Wa,
                    Math.abs(Na) > .75 * L.width && h && (clearInterval(h),
                    h = null,
                    g()))
                }, 16)
            }
        };
        return ra
    }();
    window.CanvasListeners = lc;
    var mc = {
        VERSION: "4.9.7",
        ready: !1,
        isBusy: !1
    }
      , nc = {
        idealWidth: 800,
        idealHeight: 600,
        minWidth: 480,
        maxWidth: 1280,
        minHeight: 480,
        maxHeight: 1280,
        FOVdesktop: 60,
        rotate: 0,
        FOVmobile: 60,
        FOVforced: 0,
        Le: 80,
        Ke: 5E3
    }
      , Z = Object.assign({}, {
        Oc: !0,
        be: "models3D",
        ae: "materials",
        hp: "tweakers",
        neuralNetworkPath: "built/jeefitNNC_66_0.json",
        neuralNetworkVersion: "66_0",
        ea: "",
        xa: "",
        fd: "",
        Ea: 0,
        Hk: 20,
        width: 1024,
        height: 1024,
        Hi: !0,
        Ln: [2, 3.5],
        rj: 300,
        gd: [1, 6],
        scanOverlapFactors: [1.4, 1.4, 3],
        scanNScaleLevels: 2,
        scanScale0Factor: .5,
        ua: [.2, .2, .3],
        rc: [[.8, .5], [.8, .5], [1, 1]],
        ep: 30,
        El: 1,
        Vn: [.35, .7],
        Un: 1,
        fp: [.01, .035],
        no: [.003, .007],
        Sg: [0, .6],
        bm: .2,
        Ua: [1 / .698111, 1 / 1.047166, 1 / .122169],
        Yj: [-.1, 0, 0],
        ie: [0, -62, 8],
        Qn: 1.03,
        Ja: [0, -60, 0],
        gg: 48,
        gp: .2,
        hg: 20,
        Fc: .4,
        rf: 73,
        Oe: [.033, 1],
        Fk: [4, 1],
        kl: [0, .5],
        po: .05,
        mo: 1,
        io: [1, 4.5],
        vp: 20,
        gq: !1,
        Jc: 145,
        Gf: -18,
        Ef: 20,
        Ff: 3,
        Sc: [-110, 0],
        mc: 1,
        Nj: .4,
        Oj: 3,
        te: [0, 0, 0],
        nc: [1.1, 1],
        ud: 0,
        ef: .95,
        df: 90,
        cf: 50,
        md: 25,
        Qb: .1,
        Cf: !0,
        Yd: !0,
        Yf: "images/masks/target.jpg",
        Zf: !1,
        Xd: [1 / 255, 175 / 255, 236 / 255, 0],
        Zd: -.001,
        Xf: 3.14,
        Se: 0,
        Re: "images/masks/burka.png",
        Pe: Math.PI - Math.PI / 4,
        bf: Math.PI / 4,
        wg: [.3, .2, .1],
        bc: !0,
        Pi: [700, 90],
        rn: [.2, .04],
        wp: "images/backgrounds/viewer3D.png",
        jh: [0, 0, 0],
        ih: [0, 15, 60],
        Ie: .3,
        Ep: 50,
        Ap: Ra ? Qa : !1,
        Bp: Ra ? Qa : !1,
        Dp: 1E3,
        Gp: 1E3,
        Cp: 40,
        zp: [0, 0, -400],
        Si: .1,
        vn: .5,
        Ti: [.5, 1.5],
        $d: 30,
        un: !0
    });
    c.Hh = !0;
    c.Ih = !0;
    c.Gh = !1;
    c.Ta = !0;
    var oc = {
        ke: 3.5,
        Hb: "images/debug/picsou.png",
        Yc: 45,
        Vf: .785,
        Wf: .3925,
        Vd: 5,
        Ud: 2,
        Uf: 0,
        Tf: 0,
        xp: "images/backgrounds/bg1.jpg",
        yp: "images/backgrounds/bg1_light.jpg",
        nk: 1,
        pk: 2
    };
    Z.fx = [4, 50];
    Z.Sc = [-110, 0];
    Z.Nj = .2;
    Z.Oj = 3;
    Z.te = [0, -2, 20];
    Z.nc = [.85, 1];
    c.Wc = 2.1289;
    c.qg = 1;
    oc.ke = 2.5858;
    oc.Vf = .4388;
    oc.Wf = .118;
    oc.Hb = "images/debug/hdri2.png";
    oc.Yc = 180;
    oc.zg = .8065;
    oc.Vd = 5.3887;
    oc.Ud = .5351;
    oc.Uf = -.3019;
    oc.Tf = 0;
    oc.nk = 3.5288;
    oc.pk = 6.2168;
    var pc = {
        element: null,
        Th: null,
        Sd: !1,
        Eh: null,
        V: null,
        Yg: null,
        deviceId: -1,
        sf: -1,
        Ad: 0,
        ij: null,
        He: -1
    }, bc = Object.assign({}, pc), qc = null, rc = [], sc = [], tc = null, uc = null, vc = null, wc = null, xc, yc = Z.Ln, zc = window.devicePixelRatio || 1;
    xc = {
        am: Math.max(yc[0] / zc, 1),
        pf: Math.min(zc, yc[1])
    };
    function Ac() {
        var a, b;
        function d(K) {
            K = K ? xc.pf : 1;
            ka.width = K * Z.width;
            ka.height = K * Z.height;
            return ka
        }
        function f(K) {
            var P = K.length - 1
              , Y = K[P];
            if ("data:" === Y.substring(0, 5))
                return Y;
            for (Y = ""; 0 <= P; --P) {
                var ma = K[P]
                  , Ca = "http" === ma.substring(0, 4).toLowerCase();
                Y = ma + Y;
                if (Ca)
                    break
            }
            return Y
        }
        function n(K, P, Y) {
            return new Promise(function(ma) {
                Bc.Sj(P);
                sb.ca();
                Ta.isEnabled = !0;
                La.isEnabled = !1;
                Ta.qa || (Ta.qa = Cc.instance({}));
                K.ki() && (Ta.qa.Dg(K.ki()),
                Bc.sa(Ta.qa));
                K.set();
                La.isEnabled = !1;
                y();
                var Ca = xb.gi(Y);
                setTimeout(function() {
                    Ta.isEnabled = !1;
                    Bc.Sj(!1);
                    ma(Ca)
                }, 1)
            }
            )
        }
        function t(K, P) {
            sa.bd = .5;
            return new Promise(function(Y) {
                La.ec = K;
                La.isEnabled = !0;
                La.C = function() {
                    var ma = Dc.instance(P());
                    La.C = null;
                    Y(ma)
                }
            }
            )
        }
        function p(K, P) {
            return new Promise(function(Y, ma) {
                Ka(P + K, function(Ca) {
                    Ca.error ? ma("SKU_NOT_FOUND") : Y({
                        Bn: Ca.intrinsic.mod + ".json",
                        zn: Ca.intrinsic.mats
                    })
                })
            }
            )
        }
        function g(K, P) {
            var Y = f([Z.ea, Z.xa, Z.ae + "/"]);
            P = P.map(function(ma) {
                return Y + ma
            });
            c.model = {
                url: f([Z.ea, Z.xa, Z.be + "/" + K]),
                dc: P,
                rh: !1,
                qh: !1
            };
            return new Promise(function(ma) {
                Ea.Qi(c.model, function() {
                    mc.isBusy = !1;
                    ma()
                })
            }
            )
        }
        function k(K, P) {
            if (!P)
                return K;
            K = K.slice(0);
            var Y = wc.zf().map(function(Ua) {
                return Ua.toLowerCase()
            }), ma;
            for (ma in P) {
                var Ca = P[ma]
                  , $a = -1;
                "number" === typeof ma ? $a = ma : $a = Y.indexOf(ma.toLowerCase());
                -1 !== $a && (K[$a] = Ca)
            }
            return K
        }
        function r(K, P) {
            return new Promise(function(Y, ma) {
                mc.set_model(K, function() {
                    mc.set_materials(P, function() {
                        mc.isBusy = !1;
                        Y()
                    })
                }, function() {
                    mc.isBusy = !1;
                    ma("CANNOT_LOAD_MODEL")
                })
            }
            )
        }
        function w(K, P) {
            K && (P && l(),
            K.preOffset && (Ma = K.preOffset),
            K.preScale && (za = K.preScale),
            void 0 !== K.rx && (a = K.rx),
            void 0 !== K.beginBendZ && (b = K.beginBendZ),
            void 0 !== K.bendStrength && (ab = K.bendStrength),
            K.maskBranchStartEnd && (pb = K.maskBranchStartEnd),
            mc.ready && Ea.De())
        }
        function H(K) {
            K.tweaker ? w(K.tweaker, !0) : (l(),
            mc.ready && Ea.De())
        }
        function v() {
            mc.load_model = function(K, P, Y, ma, Ca, $a) {
                if (mc.isBusy)
                    return !1;
                mc.isBusy = !0;
                P = k(P, Ca);
                (c.model ? r(K, P) : g(K, P)).then(Y).catch($a);
                return !0
            }
            ;
            mc.set_offset = function(K) {
                Da = K;
                Ea.Be()
            }
            ;
            mc.set_scale = function(K) {
                xa = K;
                Ea.Ce()
            }
            ;
            mc.set_rx = function(K) {
                ra = K;
                Ea.hk()
            }
            ;
            mc.switch_shadow = Bc.Qg;
            mc.switch_bgBlur = Bc.Pg;
            mc.set_zoom = Bc.Cg;
            mc.is_viewer3D = function() {
                return oa === na.Ma
            }
            ;
            mc.switch_viewer3D = function(K, P) {
                if (oa === na.pc || oa === na.qc || oa === na.Z && !K || oa === na.Ma && K || La.isEnabled)
                    return !1;
                if (oa === na.wa)
                    return Ya !== na.Ma || K ? Ya === na.Z && K ? (Ya = na.Ma,
                    Bc.sa(sa.Lb),
                    Bc.hb(1),
                    P && P(),
                    !0) : !1 : (Ya = na.Z,
                    Bc.sa(sa.La),
                    Bc.hb(0),
                    P && P(),
                    !0);
                var Y = 0
                  , ma = -1
                  , Ca = 0;
                oa === na.Z ? (oa = na.pc,
                ma = Z.Dp) : oa === na.Ma && (oa = na.qc,
                ma = Z.Gp);
                var $a = jc.vf();
                Ga = setInterval(function() {
                    var Ua = jc.vf();
                    Y += (Ua - $a) / ma;
                    1 <= Y && (Y = 1,
                    oa === na.pc ? (oa = na.Ma,
                    Bc.sa(sa.Lb)) : (oa = na.Z,
                    Bc.sa(sa.La)),
                    P && P(),
                    clearInterval(Ga),
                    Ga = null);
                    var kb = 0;
                    oa === na.qc || oa === na.Z ? kb = 1 - Z.Bp(Y) : kb = Z.Ap(Y);
                    Bc.hb(kb);
                    oa !== na.qc && oa !== na.pc || 0 !== Ca++ % 2 || (Bc.sa(sa.eg),
                    sa.eg.Oo(kb));
                    $a = Ua
                }, .016);
                return !0
            }
            ;
            mc.capture_image = function(K, P, Y, ma) {
                La.ec = K;
                La.isEnabled = !0;
                "undefined" === typeof isAllocate && (Y = !1);
                (ma = "undefined" === typeof ma ? !1 : ma) && Bc.ue(!1);
                D();
                La.C = function() {
                    Bc.nj(0);
                    C.flush();
                    var Ca = xb.gi(Y);
                    P(Ca);
                    ma && Bc.ue(!0)
                }
            }
            ;
            mc.capture_detection = function(K, P) {
                var Y = null === U.Ob ? U.pb : U.ed;
                t(K, function() {
                    return {
                        td: da.sc.clone(),
                        fg: wc.oi(),
                        ag: wc.mi(),
                        background: Y.clone(),
                        qa: Ec.Na.pi().clone(),
                        $f: Za
                    }
                }).then(P)
            }
            ;
            mc.process_image = function(K) {
                function P() {
                    return new Promise(function(fb, bb) {
                        La.$g = Ua.updateLightInterval;
                        t(Ua.nSteps, Y).then(function(Va) {
                            La.$g = 3;
                            Va ? 1 >= Va.xm().data[0] ? (Va.I(),
                            bb("FACE_NOT_FOUND")) : n(Va, Ua.isMask, !0).then(function(jd) {
                                Bc.sa(sa.La);
                                Va.I();
                                fb(jd)
                            }) : bb("CRITICAL")
                        });
                        y()
                    }
                    )
                }
                function Y() {
                    return {
                        td: da.sc.clone(),
                        fg: !1,
                        ag: !1,
                        background: U.pb.clone(!0),
                        qa: Ec.Na.pi().clone()
                    }
                }
                function ma() {
                    return new Promise(function(fb, bb) {
                        p(Ua.modelSKU, Ua.glassesDBURL).then(function(Va) {
                            mc.load_model(Va.Bn, Va.zn, function() {
                                fb()
                            }, Ua.modelSKU, null, function() {
                                bb("CANNOT_LOAD_MODEL")
                            })
                        }).catch(function(Va) {
                            bb(Va)
                        })
                    }
                    )
                }
                function Ca() {
                    if (Ua.image) {
                        var fb = Ua.image;
                        $a(fb);
                        return Promise.resolve(fb)
                    }
                    return new Promise(function(bb) {
                        var Va = new Image;
                        Va.onload = function() {
                            $a(Va);
                            bb()
                        }
                        ;
                        Va.src = Ua.imageBase64
                    }
                    )
                }
                function $a(fb) {
                    var bb = fb.width
                      , Va = fb.height;
                    if (bb !== Z.width || Va !== Z.height)
                        bc.Sd && (bc.element.width = bb,
                        bc.element.height = Va),
                        u(bb, Va, Ua.overSamplingFactor);
                    bc.Th.drawImage(fb, 0, 0);
                    D()
                }
                var Ua = Object.assign({
                    imageBase64: null,
                    image: null,
                    FOVHztDeg: 0,
                    nSteps: 50,
                    updateLightInterval: 3,
                    overSamplingFactor: 2,
                    modelSKU: "undef",
                    glassesDBURL: "https://glassesdbcached.jeeliz.com/sku/",
                    isMask: !0
                }, K);
                if (Z.Oc)
                    throw Error("This feature cannot be called");
                var kb = nc.FOVforced;
                Ua.FOVHztDeg && (nc.FOVforced = Ua.FOVHztDeg);
                Bc.sa(sa.La);
                return new Promise(function(fb, bb) {
                    return ma().then(Ca).then(function() {
                        P().then(function(Va) {
                            nc.FOVforced = kb;
                            fb(Va)
                        }).catch(bb)
                    }).catch(bb).catch(bb)
                }
                )
            }
            ;
            mc.process_offlineRendering = function(K, P, Y, ma, Ca) {
                Ea.oo();
                ma && (pa.xn.drawImage(xb.xb(), 0, 0),
                xb.xb().parentNode.insertBefore(pa.Eb, xb.xb()),
                pa.Eb.setAttribute("class", "jeefitMask"));
                mc.set_model(P, function() {
                    mc.set_materials(Y, function() {
                        setTimeout(function() {
                            n(K, ma).then(Ca);
                            Ea.lo(ma ? function() {
                                xb.xb().parentNode.removeChild(pa.Eb)
                            }
                            : !1)
                        }, 1)
                    })
                })
            }
            ;
            mc.serialize_detection = function(K) {
                return K.fc()
            }
            ;
            mc.unserialize_detection = function(K, P, Y) {
                return Dc.dd(K, P, Y)
            }
            ;
            mc.do_instantDetection = function(K, P) {
                Fc.m(da.sc);
                Fc.start(K, P)
            }
            ;
            mc.relieve_DOM = function(K, P) {
                if (F.Zb)
                    return !1;
                E(P || 160);
                Oa.isEnabled = !1;
                la && clearTimeout(la);
                la = setTimeout(function() {
                    E(Z.Ea);
                    la = !1;
                    B()
                }, K);
                return !0
            }
            ;
            mc.switch_slow = function(K, P) {
                if (F.Zb)
                    return !1;
                "undefined" === typeof P && (P = Z.Hk);
                la && (E(Z.Ea),
                B(),
                clearTimeout(la),
                la = !1);
                K ? Oa.isEnabled = !1 : B();
                E(K ? P : Z.Ea);
                return !0
            }
            ;
            mc.switch_sleep = function(K, P) {
                function Y() {
                    mc.isBusy = !1;
                    K ? (Ya = oa,
                    oa = na.wa) : (oa = Ya,
                    y())
                }
                if (F.Zb || mc.isBusy)
                    return P ? Promise.reject() : null;
                if (K && oa === na.wa || !K && oa !== na.wa)
                    return P ? Promise.resolve(!1) : !1;
                Ga && (clearInterval(Ga),
                Ga = null);
                oa === na.qc ? (oa = na.Z,
                Bc.sa(sa.La),
                Bc.hb(0)) : oa === na.pc && (oa = na.Ma,
                Bc.sa(sa.Lb),
                Bc.hb(1));
                ic.stop();
                var ma = null;
                mc.isBusy = !0;
                P ? ma = $b(!K).then(Y) : Y();
                return P ? ma : !0
            }
            ;
            mc.set_modelStandalone = function(K, P) {
                Bc.ve(!1);
                Gc.instance({
                    rd: H,
                    url: K.model,
                    dc: K.materials,
                    Te: function(Y) {
                        m(Y);
                        P && P();
                        Ea.Ng();
                        Bc.ve(!0)
                    }
                })
            }
            ;
            mc.start_rendering = Ea.Ng;
            mc.get_partsNames = function() {
                return wc ? wc.zf() : []
            }
            ;
            mc.update_material = function(K, P, Y) {
                if (!wc)
                    return Promise.reject("MODEL_NOT_LOADED");
                var ma = -1;
                switch (typeof K) {
                case "number":
                    ma = K;
                    break;
                case "string":
                    ma = wc.zf().findIndex(function(Ca) {
                        return Ca.includes(K)
                    });
                    if (-1 === ma)
                        return Promise.reject("PART_NOT_FOUND");
                    break;
                default:
                    return Promise.reject("INVALID_PART_ID")
                }
                void 0 === Y && (Y = !0);
                wc.gk(ma, P, Y);
                return Promise.resolve()
            }
            ;
            mc.set_model = function(K, P, Y) {
                wc && (K = f([Z.ea, Z.xa, Z.be + "/", K]),
                wc.replace(K, function() {
                    P && P(wc.xl())
                }, Y))
            }
            ;
            mc.update_tweaker = function(K) {
                w(K, !1)
            }
            ;
            mc.set_tweaker = function(K, P) {
                function Y(ma) {
                    w(ma, !0);
                    P && P()
                }
                "string" === typeof K ? Ja(Z.ea + Z.xa + Z.hp + "/" + K, Y) : Y(K)
            }
            ;
            mc.get_tweaker = function() {
                return {
                    preOffset: Ma,
                    preScale: za,
                    rx: a,
                    beginBendZ: b,
                    bendStrength: ab,
                    maskBranchStartEnd: pb
                }
            }
            ;
            mc.get_materialsSpec = function() {
                return wc ? wc.li() : Promise.reject("NOT_READY")
            }
            ;
            mc.set_materials = function(K, P) {
                if (wc) {
                    var Y = f([Z.ea, Z.xa, Z.ae + "/"]);
                    K = K.map(function(ma) {
                        var Ca = ma;
                        "string" === typeof ma && (Ca = Y + ma,
                        Ca = Ca.replace(/([^:])\/\//, "$1/"));
                        return Ca
                    });
                    wc.Eg(K, P)
                }
            }
            ;
            mc.replace_material = function(K, P) {
                if (wc)
                    return wc.li().then(function(Y) {
                        Y = Object.assign({
                            isReplaced: !0
                        }, Y[P]);
                        wc.gk(P, K, !0);
                        return Y
                    })
            }
        }
        function x() {
            yb.dh(xc.am);
            Ea.cd();
            Z.bc && (sb.reset(),
            Ec.Na.wh(bc.V),
            Ec.Na.vh());
            mc.ready = !0;
            rc.forEach(function(K) {
                K()
            });
            rc.splice(0)
        }
        function y() {
            gc.reset();
            ic.stop();
            sb.ca();
            L(0)
        }
        function m(K) {
            wc && (Bc.eo(wc),
            wc.remove());
            Bc.Ck(K);
            wc = K
        }
        function l() {
            Ma = [0, 0, 0];
            za = 1;
            ab = b = a = 0;
            pb = Z.Sc
        }
        function E(K) {
            ca = K;
            ic.update({
                Ea: ca
            })
        }
        function L(K) {
            Oa.Fb = -1;
            if (La.isEnabled)
                Oa.Fb = La.ec;
            else if (Ta.isEnabled)
                Oa.Fb = Ta.ec;
            else if (Oa.isEnabled) {
                if (!D())
                    return;
                Oa.Fb = oa === na.Z ? gc.X() : 1
            } else if (Oa.Fb = Z.gd[0],
            !D())
                return;
            sb.ca();
            if (!Ta.isEnabled)
                for (var P = 0; P < Oa.Fb; ++P)
                    J.set("s64"),
                    U.Kf.J(.25 * ka.width, ja.ii()),
                    U.pb.h(0),
                    da.Vc.h(1),
                    V.l(!1, !1),
                    ja.Ca(U.Kf),
                    La.isEnabled && 0 === (P + 1) % La.$g && O();
            La.isEnabled ? (La.C && La.C(),
            La.isEnabled = !1,
            C.flush(),
            oa !== na.wa && ic.xg(L)) : (Bc.animate(K),
            U.tg && Math.abs(Na - sa.Oi) > sa.Vj && Z.bc && oa === na.Z && (sb.ca(),
            O(),
            sb.ba()),
            Ta.isEnabled || (Oa.isEnabled && (gc.Zj(),
            P = gc.fi(1),
            Oa.th = P,
            Oa.Ne = Ia(Z.Fk, P),
            Z.bc && oa === na.Z && (sa.Vj = Ia(Z.Pi, P),
            sa.bd = Ia(Z.rn, P),
            sa.bd = Math.min(sa.bd, .5))),
            Na = K,
            oa !== na.wa && ic.xg(L)))
        }
        function B() {
            Na = jc.vf();
            Oa.isEnabled = !0
        }
        function D() {
            var K = 15;
            if (!bc.Sd) {
                if (!bc.element.videoWidth)
                    return ic.stop(),
                    mc.request_cameraVideoStream().then(y),
                    !1;
                var P = bc.element.currentTime;
                if (!P)
                    return !0;
                K = P - ac;
                0 > K && (ac = P);
                if (1E3 * K < Z.vp)
                    return !0
            }
            bc.V.refresh();
            ac += K;
            bc.Ad = K;
            Wa = !0;
            sb.ca();
            J.set("s0");
            da.ug.J();
            da.Vc.il(0);
            V.l(!0, !0);
            J.set("s62");
            U.pb.J();
            bc.V.h(0);
            V.l(!1, !1);
            null !== U.Ob && (J.set("s63"),
            U.ed.u(),
            U.pb.h(0),
            U.Ob.h(1),
            V.l(!1, !1));
            return !0
        }
        function e() {
            U.mk = vb.instance({
                isPot: !0,
                isLinear: !0,
                isFloat: !1,
                url: Z.ea + Z.xa + Z.wp
            });
            var K = {
                isPot: !1,
                isLinear: !0,
                isFloat: !1,
                width: ka.width,
                height: ka.height
            };
            U.pb = vb.instance(K);
            U.ed = vb.instance(K);
            F.Wj.push(U.pb, U.ed);
            U.Kf = kc.instance({});
            Z.Yd && (nb = vb.instance({
                isPot: !1,
                isFloat: !1,
                isLinear: !0,
                url: (Z.Zf || -1 !== Z.Yf.indexOf("//") ? "" : Z.ea + Z.xa) + Z.Yf
            }))
        }
        function q() {
            function K() {
                return {
                    width: 3,
                    height: 1,
                    isFloat: !0,
                    isPot: !1,
                    array: new Float32Array([0, .5, .5, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                }
            }
            var P = {
                width: 3,
                height: 1,
                isFloat: !0,
                isPot: !1,
                array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
            };
            da.Vc = zb.instance(K());
            da.ug = vb.instance(K());
            da.sc = vb.instance(K());
            da.ge = zb.instance(K());
            da.gf = vb.instance(P);
            P = {
                width: 2,
                height: 1,
                isFloat: !0,
                isPot: !1,
                array: new Float32Array([0, 0, 0, 0, 0, 0, 0, 0])
            };
            da.eh = vb.instance(P);
            da.Fe = vb.instance(P);
            sa.he = vb.instance({
                width: 1,
                height: 1,
                isFloat: !0,
                isPot: !1,
                array: new Float32Array([0, 0, 0, 0])
            })
        }
        function z(K) {
            U.tg = K;
            if (Wa) {
                Wa = !1;
                J.set("s70");
                da.eh.J();
                da.Fe.h(2);
                var P = Ia(Z.kl, gc.fi(.5));
                J.D("u72", P);
                da.ug.h(1);
                J.D("u73", 1E3 * bc.Ad);
                V.l(!1, !1);
                J.set("s71");
                da.Fe.u();
                da.eh.h(0);
                V.l(!1, !1)
            }
            K.h(0);
            da.Vc.Bj(1);
            C.viewport(0, 0, 1, 1);
            J.set("s65");
            J.Jg("u48", hc.get(0));
            V.l(!1, !1);
            J.set("s66");
            C.viewport(1, 0, 2, 1);
            V.l(!1, !1);
            da.gf.J();
            J.set("s67");
            J.O("u59", Z.Oe[0] * Oa.Ne, Z.Oe[1]);
            J.D("u62", Oa.th);
            da.Vc.h(0);
            da.ge.h(1);
            V.l(!1, !1);
            J.set("s68");
            da.ge.Bj(1);
            da.gf.h(0);
            da.Fe.h(2);
            da.Vc.h(3);
            V.l(!1, !1);
            J.set("s69");
            da.ge.h(0);
            da.sc.u();
            V.l(!1, !1)
        }
        function O() {
            sa.Oi = Na;
            sa.he.J();
            J.set(M.Fi ? "s73" : "s72");
            U.tg.h(0);
            V.l(!1, !1);
            Ec.Na.kk(bc.V, sa.he, sa.bd)
        }
        function G() {
            return new Promise(function(K) {
                Ja(Hc(), function(P) {
                    P = JSON.parse(P);
                    if (P.exportData) {
                        var Y = P.exportData;
                        M.Ua = Y.rotationEulerAnglesFactors ? [-Y.rotationEulerAnglesFactors[0], -Y.rotationEulerAnglesFactors[1], Y.rotationEulerAnglesFactors[2]] : M.Ua;
                        M.Fc = void 0 === Y.deformScaleXFactor ? M.Fc : Y.deformScaleXFactor;
                        M.ua = Y.translationScalingFactors || M.ua;
                        M.Sh = Y.dyOffset || 0;
                        M.Qh = Y.dsOffset || 0;
                        M.Fi = Y.isLThetaSplitCosSin || !1;
                        I()
                    }
                    ja = new Pb({
                        Qc: P.layers,
                        ee: "gpuRawAvg",
                        de: z
                    });
                    K()
                })
            }
            )
        }
        function S(K) {
            d(K);
            K = Z.width;
            var P = Z.height;
            R.sb[0] = 1;
            R.sb[1] = K / P;
            hc.m({
                fe: Z.scanOverlapFactors,
                Yi: Z.scanNScaleLevels,
                Y: K,
                cb: P,
                tj: Z.scanScale0Factor,
                ua: M.ua,
                yg: !0
            });
            tb = K > P ? [K / P, 1] : [1, P / K];
            F.Qa = !0
        }
        function Q() {
            J.j("s65", [{
                type: "3f",
                name: "u49",
                value: [M.ua[0] * R.sb[0], M.ua[1] * R.sb[1], M.ua[2]]
            }])
        }
        function I() {
            J.j("s64", [{
                type: "1f",
                name: "u44",
                value: M.Fc
            }, {
                type: "1f",
                name: "u46",
                value: M.Sh
            }, {
                type: "1f",
                name: "u45",
                value: M.Qh
            }]);
            Q();
            var K = [1 / M.Ua[0], 1 / M.Ua[1], 1 / M.Ua[2]];
            J.j("s66", [{
                type: "3f",
                name: "u54",
                value: K
            }]);
            J.j("s70", [{
                type: "3f",
                name: "u54",
                value: K
            }])
        }
        function A() {
            J.j("s64", [{
                type: "1i",
                name: "u1",
                value: 0
            }, {
                type: "1i",
                name: "u42",
                value: 1
            }, {
                type: "2f",
                name: "u43",
                value: R.sb
            }]);
            J.j("s65", [{
                type: "1i",
                name: "u47",
                value: 0
            }, {
                type: "1i",
                name: "u42",
                value: 1
            }, {
                type: "1f",
                name: "u52",
                value: Z.ep
            }, {
                type: "1f",
                name: "u53",
                value: Z.El
            }, {
                type: "3f",
                name: "u50",
                value: [Z.rc[0][0], Z.rc[1][0], Z.rc[2][0]]
            }, {
                type: "3f",
                name: "u51",
                value: [Z.rc[0][1], Z.rc[1][1], Z.rc[2][1]]
            }]);
            J.j("s66", [{
                type: "1i",
                name: "u47",
                value: 0
            }, {
                type: "1i",
                name: "u42",
                value: 1
            }, {
                type: "2f",
                name: "u56",
                value: Z.Vn
            }, {
                type: "3f",
                name: "u55",
                value: Z.Yj
            }, {
                type: "1f",
                name: "u57",
                value: Z.bm
            }]);
            J.j("s67", [{
                type: "1i",
                name: "u42",
                value: 0
            }, {
                type: "1i",
                name: "u58",
                value: 1
            }, {
                type: "2f",
                name: "u59",
                value: Z.Oe
            }, {
                type: "1f",
                name: "u60",
                value: Z.mo
            }, {
                type: "1f",
                name: "u61",
                value: Z.Un
            }]);
            J.j("s68", [{
                type: "1i",
                name: "u58",
                value: 1
            }, {
                type: "1i",
                name: "u63",
                value: 0
            }, {
                type: "1i",
                name: "u64",
                value: 2
            }, {
                type: "1i",
                name: "u65",
                value: 3
            }, {
                type: "2f",
                name: "u43",
                value: R.sb
            }, {
                type: "1f",
                name: "u67",
                value: ja.ii()
            }, {
                type: "2f",
                name: "u66",
                value: Z.io
            }]);
            J.j("s69", [{
                type: "1i",
                name: "u42",
                value: 0
            }, {
                type: "1f",
                name: "u68",
                value: Z.po
            }, {
                type: "1f",
                name: "u69",
                value: Z.gp
            }]);
            J.j("s70", [{
                type: "1i",
                name: "u47",
                value: 0
            }, {
                type: "1i",
                name: "u42",
                value: 1
            }, {
                type: "1i",
                name: "u64",
                value: 2
            }, {
                type: "3f",
                name: "u55",
                value: Z.Yj
            }]);
            J.j("s71", [{
                type: "1i",
                name: "u64",
                value: 0
            }, {
                type: "2f",
                name: "u74",
                value: Z.fp
            }, {
                type: "2f",
                name: "u75",
                value: Z.no
            }]);
            J.j("s72", [{
                type: "1i",
                name: "u47",
                value: 0
            }]);
            J.j("s73", [{
                type: "1i",
                name: "u47",
                value: 0
            }]);
            J.j("s63", [{
                type: "1i",
                name: "u1",
                value: 0
            }, {
                type: "1i",
                name: "u76",
                value: 1
            }])
        }
        function u(K, P, Y) {
            var ma = 0 === Y
              , Ca = d(ma);
            Z.width = K;
            Z.height = P;
            S(ma);
            A();
            Q();
            F.Wj.forEach(function($a) {
                $a.resize(K, P)
            });
            Y = ma ? 1 : Y;
            yb.resize(Ca.width * Y, Ca.height * Y);
            Ea.cd();
            Ic.Kg(bc.element.videoWidth || bc.element.width, bc.element.videoHeight || bc.element.height);
            Ic.Rg();
            Ic.Tj()
        }
        function N() {
            ic.stop();
            F.lb && (clearTimeout(F.lb),
            F.lb = null);
            if (!F.Zb) {
                var K = F.width
                  , P = F.height;
                if (Z.width === K && Z.height === P)
                    y();
                else if (oa !== na.Z && oa !== na.Ma)
                    F.lb = setTimeout(N, Z.rj);
                else {
                    var Y = "undefined" === typeof lc ? !1 : lc.get_mode()
                      , ma = oa;
                    oa = na.wa;
                    F.Zb = !0;
                    La.isEnabled = !0;
                    La.C = function() {
                        La.isEnabled = !1;
                        F.Zb = !1;
                        B();
                        E(Z.Ea);
                        la && clearTimeout(la);
                        la = !1;
                        oa = ma
                    }
                    ;
                    u(K, P, 0);
                    y();
                    oa === na.Ma && (oa = na.Z,
                    mc.switch_viewer3D(!0, !1));
                    Y && lc.switch_mode(Y)
                }
            }
        }
        var R = {
            sb: [-1, -1]
        }
          , T = null
          , aa = [.5, 0, 0, .5]
          , ka = {
            width: -1,
            height: -1
        }
          , Aa = {
            width: -1,
            height: -1,
            lb: null,
            Zb: !1,
            Qa: !1,
            Wj: []
        }
          , F = Object.assign({}, Aa)
          , h = [0, Z.ie[1], Z.ie[2]]
          , M = {
            Ua: [-Z.Ua[0], -Z.Ua[1], Z.Ua[2]],
            Fc: Z.Fc,
            ua: Z.ua,
            Sh: 0,
            Qh: 0,
            Fi: !1
        }
          , ca = Z.Ea
          , la = null
          , ja = null
          , pa = {
            Nb: null,
            tc: null,
            Eb: null,
            Nq: null
        };
        d(!0);
        var Da = [0, 0, 0];
        var xa = 1;
        var ra = 0;
        var W = {
            pb: null,
            ed: null,
            Kf: null,
            mk: null,
            tg: null,
            Ob: null
        }
          , U = Object.assign({}, W)
          , da = {
            ug: null,
            sc: null,
            ge: null,
            gf: null,
            eh: null,
            Fe: null
        }
          , Na = 0
          , Wa = !1
          , Fa = {
            La: null,
            Lb: null,
            eg: null,
            Oi: 0,
            Vj: Z.Pi[1],
            bd: .1,
            he: null
        }
          , sa = Object.assign({}, Fa)
          , cb = !1
          , qb = !1
          , Oa = {
            isEnabled: !0,
            Ne: 1,
            Fb: -1,
            th: 1
        }
          , na = {
            wa: -1,
            Z: 0,
            Ma: 1,
            pc: 2,
            qc: 3
        }
          , oa = na.Z
          , Ga = null
          , Ya = na.Z
          , La = {
            isEnabled: !1,
            ec: 1,
            $g: 3,
            C: null
        }
          , Ta = {
            isEnabled: !1,
            qa: null,
            ec: 0
        };
        var nb = null;
        var tb = -1;
        var Db = !1, ub = !1, wb = !1, Cb = [0, 0, 0], Ha = 1, Eb, ea, wa;
        var Ma = [0, 0, 0];
        var za = 1;
        var ab = b = a = 0;
        var pb = Z.Sc;
        var Mb = [0, 0, 0]
          , Za = {
            scale: 1,
            offsetX: 0,
            offsetY: 0
        }
          , ac = 0
          , Ea = {
            m: function() {
                J.xc([{
                    id: "s62",
                    name: "_",
                    v: "attribute vec2 a0;uniform mat2 u41;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=vec2(.5)+u41*a0;}",
                    K: ["a0"],
                    S: [2],
                    g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                    i: ["u1", "u41"],
                    precision: "lowp"
                }, {
                    id: "s64",
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                    v: "attribute vec2 a0;uniform sampler2D u42;uniform vec2 u43;uniform float u44,u45,u46;const vec2 h=vec2(.16,.5),i=vec2(.5,.5),j=vec2(.84,.5),q=vec2(.5);varying vec2 vv0;void main(){vec4 b=texture2D(u42,h);vec2 c=b.gb,a=b.a*u43;vec4 l=texture2D(u42,i);float m=l.y;vec2 n=vec2(mix(1.,1./cos(m),u44),1.);a*=n,a*=1.+u45;vec2 o=a0*.5;float d=texture2D(u42,j).r,e=cos(d),f=sin(d);mat2 g=mat2(e,f,-f,e);vec2 p=g*o;c+=vec2(-.5)*a*(g*vec2(0.,u46)),vv0=c+p*a,gl_Position=vec4(a0,0.,1.);}",
                    K: ["a0"],
                    S: [2],
                    i: "u1 u42 u43 u44 u45 u46".split(" "),
                    precision: "lowp"
                }, {
                    id: "s65",
                    name: "_",
                    v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                    g: "uniform sampler2D u47,u42;uniform vec3 u48,u49,u50,u51;uniform float u52,u53;const vec4 e=vec4(.25,.25,.25,.25);const vec2 f=vec2(.16,.5),g=vec2(.5,.5),h=vec2(.83,.5);const vec3 i=vec3(1.,1.,1.);void main(){vec4 j=texture2D(u47,vec2(.625,.625)),k=texture2D(u47,vec2(.875,.625));float l=dot(j-k,e);bool m=l>u53;vec4 a=texture2D(u42,f);m?a.r=2.:a.r>u52?a.r=0.:a.r>1.9?a.r+=1.:0.;if(a.r<.9)a=vec4(1.,u48);else{float n=dot(e,texture2D(u47,vec2(.875,.875))),o=dot(e,texture2D(u47,vec2(.125,.625))),p=dot(e,texture2D(u47,vec2(.375,.625))),b=texture2D(u42,h).r,c=cos(b),d=sin(b);vec2 q=mat2(c,d,-d,c)*vec2(n,o);float r=texture2D(u42,g).a;vec3 s=mix(u50,u51,r*i);a.r*=step(1.9,a.r),a.gba+=vec3(q,p)*u49*s*a.a;}gl_FragColor=a;}",
                    i: "u47 u42 u48 u52 u49 u53 u50 u51".split(" ")
                }, {
                    id: "s66",
                    name: "_",
                    g: "uniform sampler2D u47,u42;uniform vec3 u54,u55;uniform vec2 u56;uniform float u57;const vec4 v=vec4(1.),f=vec4(0.),e=vec4(.25);const vec2 g=vec2(.16,.5),h=vec2(.5,.5),i=vec2(.84,.5);varying vec2 vv0;void main(){float k=step(vv0.x,.5);vec4 l=texture2D(u42,g);if(l.r<1.9){gl_FragColor=f;return;}float m=dot(texture2D(u47,vec2(.125,.125)),e),a=smoothstep(u56.x,u56.y,m);vec4 n=texture2D(u42,h);float o=n.a;a=mix(a,o,.3);float p=dot(e,texture2D(u47,vec2(.125,.875))),q=dot(e,texture2D(u47,vec2(.375,.875))),r=dot(e,texture2D(u47,vec2(.625,.875)));vec3 s=vec3(p,q,r),b=u55+s*u54;float c=texture2D(u42,i).r,d=b.z*u57;c+=d,b.z-=d;vec4 t=vec4(b,a),u=vec4(c,0.,0.,0.);gl_FragColor=mix(u,t,k);}",
                    i: "u47 u42 u56 u54 u55 u57".split(" ")
                }, {
                    id: "s67",
                    name: "_",
                    g: "uniform sampler2D u42,u58;uniform vec2 u59;uniform float u60,u61,u62;const vec4 f=vec4(1.),h=vec4(1.,0.,0.,0.),i=vec4(0.,0.,0.,1.);const vec2 g=vec2(.5,.5);varying vec2 vv0;void main(){vec4 j=vec4(max(.1,1.-u62),0.,0.,0.),k=texture2D(u42,vv0),l=texture2D(u58,vv0),q=texture2D(u42,g),m=texture2D(u58,g);float n=pow(m.a,u61),o=mix(u59.y,u59.x,n),b=step(.66,vv0.x),c=step(.34,vv0.x)*(1.-b);vec4 a=mix(h,i,c);a=mix(a,j,b);vec4 d=max(o*f,a);d*=mix(f,u60*vec4(1.,1.,1.,0.)+vec4(0.,0.,0.,1.),c);vec4 p=k-l;gl_FragColor=p*d;}",
                    i: "u42 u58 u59 u60 u61 u62".split(" "),
                    precision: "highp"
                }, {
                    id: "s68",
                    name: "_",
                    g: "uniform sampler2D u58,u63,u64,u65;uniform vec2 u43,u66;uniform float u67;const vec4 w=vec4(0.),x=vec4(1.);const vec2 j=vec2(.25,.5),k=vec2(.75,.5),g=vec2(.16,.5),l=vec2(.5,.5);varying vec2 vv0;bool f(float a){return (a<0.||0.<a||a==0.)&&a+1.!=a?false:true;}void main(){float y=step(vv0.x,.33),m=step(.33,vv0.x)*step(vv0.x,.66),z=step(.66,vv0.x);vec4 n=texture2D(u65,l);float b=n.a;b*=texture2D(u64,j).a,b*=texture2D(u64,k).a;vec4 o=texture2D(u58,vv0),p=texture2D(u63,vv0),c=o+p;c.a=mix(c.a,b,m);vec4 e=texture2D(u58,g),q=texture2D(u65,g);vec2 r=e.gb,s=q.gb;float t=e.a;vec2 h=u67*abs(r-s)/(u43*t);float u=max(h.x,h.y),v=smoothstep(u66.x,u66.y,u);vec4 i=texture2D(u65,vv0),a=mix(c,i,v);if(f(a.x)||f(a.y)||f(a.z)||f(a.w)){gl_FragColor=i;return;}gl_FragColor=a;}",
                    i: "u58 u63 u64 u65 u43 u67 u66".split(" "),
                    precision: "highp"
                }, {
                    id: "s69",
                    name: "_",
                    g: "uniform sampler2D u42;uniform float u68,u69;const vec2 f=vec2(.5,.5);const float h=-.4;varying vec2 vv0;void main(){vec4 a=texture2D(u42,vv0);float b=step(vv0.x,.33),g=(1.-b)*step(.66,vv0.x),c=texture2D(u42,f).r,d=texture2D(u42,f).g;a.a+=b*a.a*u68*abs(sin(d)),a.r-=u69*g*step(c,0.)*sin(c)*sin(d),gl_FragColor=a;}",
                    i: ["u42", "u68", "u69"],
                    precision: "highp"
                }, {
                    id: "s70",
                    name: "_",
                    g: "uniform sampler2D u42,u64,u47;uniform vec3 u54,u55;uniform float u72,u73;const vec4 e=vec4(.25);const vec3 g=vec3(1.);const vec2 h=vec2(.5,.5);const vec3 i=vec3(1.,1.,4.);varying vec2 vv0;void main(){vec4 c=texture2D(u42,h);float d=step(vv0.x,.5),a=1.-d;vec4 j=texture2D(u64,vv0);float t=c.a;vec2 k=mix(vec2(.875,.875),vec2(.125,.875),a),l=mix(vec2(.125,.625),vec2(.375,.875),a),m=mix(vec2(.375,.625),vec2(.625,.875),a);float n=dot(e,texture2D(u47,k)),o=dot(e,texture2D(u47,l)),p=dot(e,texture2D(u47,m));vec3 q=mix(i,u54,a),b=q*vec3(n,o,p),r=c.rgb;b=mix(b,u55+b-r,a)/u73;vec4 s=mix(vec4(b,0.),j,vec4(u72*g,0.));gl_FragColor=s;}",
                    i: "u42 u64 u47 u72 u73 u54 u55".split(" "),
                    precision: "highp"
                }, {
                    id: "s71",
                    name: "_",
                    g: "uniform sampler2D u64;uniform vec2 u74,u75;const vec4 h=vec4(.25,.25,.25,.25);varying vec2 vv0;void main(){float a=step(.5,vv0.x),c=mix(u74.x,u75.x,a),d=mix(u74.y,u75.y,a);vec3 b=texture2D(u64,vv0).rgb;float f=length(b),g=1.-smoothstep(c,d,f);gl_FragColor=vec4(b,g);}",
                    i: ["u64", "u74", "u75"],
                    precision: "highp"
                }, {
                    id: "s72",
                    name: "_",
                    v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                    g: "uniform sampler2D u47;const vec4 e=vec4(.25);const float f=3.1415;void main(){float a=dot(texture2D(u47,vec2(.375,.375)),e),b=dot(texture2D(u47,vec2(.625,.375)),e),c=f/2.*dot(texture2D(u47,vec2(.875,.375)),e),d=.75*f*dot(texture2D(u47,vec2(.125,.375)),e);gl_FragColor=vec4(d,a,b,c);}",
                    i: ["u47"]
                }, {
                    id: "s73",
                    name: "_",
                    v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                    g: "uniform sampler2D u47;const vec4 e=vec4(.25);const float f=3.1415,g=1e-7;void main(){float b=dot(texture2D(u47,vec2(.875,.375)),e),c=dot(texture2D(u47,vec2(.375,.125)),e),d=f/2.*dot(texture2D(u47,vec2(.625,.375)),e),a=dot(texture2D(u47,vec2(.125,.375)),e),h=dot(texture2D(u47,vec2(.375,.375)),e);a+=(step(0.,a)-.5)*g;float i=atan(h,a);gl_FragColor=vec4(i,b,c,d);}",
                    i: ["u47"]
                }, {
                    id: "s63",
                    name: "_",
                    g: "uniform sampler2D u1,u76;varying vec2 vv0;vec4 i(vec4 a,sampler2D g){mediump float b=a.b*63.;mediump vec2 c;c.y=floor(floor(b)/8.),c.x=floor(b)-c.y*8.;mediump vec2 d;d.y=floor(ceil(b)/8.),d.x=ceil(b)-d.y*8.;highp vec2 e;e.x=c.x*.125+9.765625e-4+.123047*a.r,e.y=c.y*.125+9.765625e-4+.123047*a.g;highp vec2 f;f.x=d.x*.125+9.765625e-4+.123047*a.r,f.y=d.y*.125+9.765625e-4+.123047*a.g;lowp vec4 j=texture2D(g,e),k=texture2D(g,f),l=mix(j,k,fract(b));return l;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=i(a,u76);}",
                    i: ["u1", "u76"]
                }]);
                q();
                ic.m({
                    Ei: !1,
                    Ea: ca
                });
                gc.m({
                    ig: 1,
                    n: Z.gd[1] - Z.gd[0] + 1,
                    Sf: Z.gd[0]
                });
                mc.set_videoRotation = function(K) {
                    nc.rotate = K;
                    mc.ready && (Ic.Kg(bc.element.videoWidth, bc.element.videoHeight),
                    Ic.Rg())
                }
                ;
                mc.set_viewRotation = function() {}
                ;
                mc.set_LUT = function(K) {
                    return new Promise(function(P) {
                        K ? vb.instance({
                            url: K,
                            isFloat: !1,
                            isFlipY: !1,
                            C: function(Y) {
                                U.Ob = Y;
                                Ea.cd();
                                P()
                            }
                        }) : (U.Ob = null,
                        Ea.cd(),
                        P())
                    }
                    )
                }
                ;
                mc.resize = function(K, P, Y, ma) {
                    mc.ready && (F.lb && (clearTimeout(F.lb),
                    F.lb = null),
                    ic.stop(),
                    Y = Y ? xc.pf : 1,
                    F.width = K * Y,
                    F.height = P * Y,
                    F.lb = setTimeout(N, ma ? 0 : Z.rj))
                }
                ;
                return G()
            },
            cm: u,
            ap: function() {
                e();
                S(!0);
                A();
                I();
                Ea.Tj();
                v();
                sc.forEach(function(K) {
                    K()
                });
                sc.splice(0);
                c.model && !mc.isBusy ? Ea.Qi(c.model) : Z.Oc || x();
                return Promise.resolve()
            },
            wm: function() {
                return ka
            },
            A: function() {
                return new Promise(function(K, P) {
                    mc.ready ? (ic.A(),
                    mc.switch_sleep(!0, !0).finally(function() {
                        ja && ja.A();
                        yb.A();
                        xb.A();
                        C && (C = null);
                        ja = null;
                        Z.Zf = !1;
                        wc = null;
                        qb = cb = !1;
                        Oa.isEnabled = !0;
                        Oa.Ne = 1;
                        Oa.Fb = -1;
                        oa = na.Z;
                        Ga = null;
                        Ya = na.Z;
                        Object.assign(F, Aa);
                        Object.assign(bc, pc);
                        Object.assign(U, W);
                        Object.assign(sa, Fa);
                        mc.ready = !1;
                        mc.isBusy = !1;
                        mc.load_model = null;
                        K()
                    }).catch(function(Y) {
                        P(Y)
                    })) : P("NOT_READY")
                }
                )
            },
            cd: function() {
                Bc.zj(da.sc, null === U.Ob ? U.pb : U.ed, sa.he, U.mk)
            },
            um: function() {
                return Za
            },
            Hj: function(K) {
                Za = K
            },
            Be: function() {
                Mb[0] = Da[0] - Za.offsetX;
                Mb[1] = Da[1] + Za.offsetY;
                Mb[2] = Da[2];
                Bc.vo(h, Ma, Mb)
            },
            Ce: function() {
                Bc.wo(xa * Z.Qn, za, Za.scale)
            },
            hk: function() {
                Bc.xo(ra + a)
            },
            mp: function() {
                Bc.to(Z.md + b, Z.Qb + ab)
            },
            op: function() {
                Bc.uo(pb)
            },
            De: function() {
                Ea.Be();
                Ea.Ce();
                Ea.hk();
                Ea.mp();
                Ea.op()
            },
            oo: function() {
                ic.stop();
                Ga && (clearInterval(Ga),
                Ga = null);
                Ta.isEnabled = !0;
                Ta.ec = 0;
                Db = Bc.tm();
                ub = wc.oi();
                wb = wc.mi();
                Ha = za;
                Cb = Ma;
                Eb = pb;
                ea = b;
                wa = ab;
                La.isEnabled = !1;
                Bc.ue(!1)
            },
            lo: function(K) {
                function P() {
                    2 === ++Y && (Ta.isEnabled = !1,
                    za = Ha,
                    Ma = Cb,
                    pb = Eb,
                    b = ea,
                    ab = wa,
                    Ea.De(),
                    Bc.sa(Db),
                    y(),
                    K && K())
                }
                var Y = 0;
                oa === na.pc ? oa = na.Ma : oa === na.qc && (oa = na.Z);
                Bc.hb(oa === na.Z ? 0 : 1);
                wc.replace(ub, P);
                wc.Eg(wb, P);
                Ea.cd();
                Bc.ue(!0)
            },
            Tj: function() {
                var K = Math.tan(bc.sf / 2);
                Bc.yj({
                    rf: Z.rf / K,
                    qo: K,
                    Tn: bc.ij,
                    Ja: Z.Ja,
                    gg: Z.gg,
                    hg: Z.hg,
                    qk: R.sb,
                    Ak: Z.zp,
                    Jc: Z.Jc,
                    Gf: Z.Gf,
                    Ef: Z.Ef,
                    Ff: Z.Ff,
                    Sc: pb,
                    Pe: Z.Pe,
                    bf: Z.bf,
                    wg: Z.wg,
                    mc: Z.mc,
                    Vo: Z.Nj,
                    Wo: Z.Oj,
                    te: Z.te,
                    nc: Z.nc,
                    ud: Z.ud,
                    ef: Z.ef,
                    df: Z.df,
                    cf: Z.cf,
                    Se: Z.Se,
                    Re: Z.ea + Z.xa + Z.Re,
                    md: Z.md + b,
                    Qb: Z.Qb + ab,
                    Cf: Z.Cf,
                    jh: Z.jh,
                    ih: Z.ih,
                    Ie: Z.Ie,
                    Fp: Z.Ep,
                    He: bc.He,
                    Yd: Z.Yd,
                    tn: nb,
                    Xd: Z.Xd,
                    Zd: Z.Zd,
                    Xf: Z.Xf,
                    sn: tb,
                    Sg: Z.Sg
                })
            },
            ul: function() {
                var K = nc.Le
                  , P = nc.Ke
                  , Y = 1 / Math.tan(.5 * bc.sf)
                  , ma = xb.aa() / xb.P();
                bc.ij = [Y, 0, 0, 0, 0, Y / ma, 0, 0, 0, 0, -(P + K) / (P - K), -1, 0, 0, -2 * K * P / (P - K), 0];
                bc.He = 1 / Math.tan(Z.Cp * Math.PI / 360) / Y
            },
            Kg: function(K, P) {
                T = [.5, .5];
                K = P / K;
                P = xb.aa() / xb.P();
                90 === Math.abs(nc.rotate) && (K = 1 / K);
                K > P ? T[1] *= P / K : T[0] *= K / P;
                aa[0] = 0;
                aa[1] = 0;
                aa[2] = 0;
                aa[3] = 0;
                switch (nc.rotate) {
                case 0:
                    aa[0] = T[0];
                    aa[3] = T[1];
                    break;
                case 180:
                    aa[0] = -T[0];
                    aa[3] = -T[1];
                    break;
                case 90:
                    aa[1] = T[0];
                    aa[2] = -T[1];
                    break;
                case -90:
                    aa[1] = -T[0],
                    aa[2] = T[1]
                }
                Z.Hi || (aa[0] *= -1,
                aa[1] *= -1);
                P = T;
                var Y = Rb()
                  , ma = nc.FOVforced;
                Y = (ma ? ma : Y ? nc.FOVmobile : nc.FOVdesktop) * Math.PI / 180;
                Y = 2 * Math.atan(Math.max(K, 1 / K) / (16 / 9) * Math.tan(.5 * Y));
                bc.sf = 2 * Math.atan(2 * P[0] * Math.tan(.5 * (1 < K ? 2 * Math.atan(1 / K * Math.tan(.5 * Y)) : Y)));
                Ea.ul()
            },
            Rg: function() {
                J.j("s62", [{
                    type: "1i",
                    name: "u1",
                    value: 0
                }, {
                    type: "mat2",
                    name: "u41",
                    value: aa
                }])
            },
            Jf: function(K, P) {
                return qb ? Promise.resolve() : new Promise(function(Y, ma) {
                    Ea.Om(K, P);
                    Promise.all([Ea.m(), Ea.Pm()]).then(function() {
                        Ea.yi();
                        qb = !0;
                        Y()
                    }).catch(function(Ca) {
                        qc && qc("GL_INCOMPATIBLE", "Cannot init JEELIZVTO");
                        ma(Ca)
                    })
                }
                )
            },
            Om: function(K, P) {
                pa.Nb = document.createElement("canvas");
                pa.Eb = document.createElement("canvas");
                pa.Eb.width = Z.width;
                pa.Eb.height = Z.height;
                pa.xn = pa.Eb.getContext("2d");
                mc.replace_video = function(Y) {
                    bc.element = Y;
                    bc.Yg.ma = bc.element;
                    return !0
                }
                ;
                pa.tc = pa.Nb.getContext("2d");
                mc.capture_background = function(Y, ma) {
                    Y = "undefined" === typeof Y ? K : Y;
                    ma = "undefined" === typeof ma ? P : ma;
                    pa.Nb.width = Y;
                    pa.Nb.height = ma;
                    var Ca = Y / ma
                      , $a = 0
                      , Ua = 0;
                    if (K / P > Ca) {
                        var kb = P * Ca;
                        Ca = P;
                        $a = Math.round((K - kb) / 2)
                    } else
                        kb = K,
                        Ca = K / Ca,
                        Ua = Math.round((P - Ca) / 2);
                    pa.tc.save();
                    pa.tc.translate(Y, 0);
                    pa.tc.scale(-1, 1);
                    pa.tc.drawImage(bc.element, $a, Ua, kb, Ca, 0, 0, Y, ma);
                    pa.tc.restore();
                    Y = document.createElement("canvas");
                    Y.width = pa.Nb.width;
                    Y.height = pa.Nb.height;
                    Y.getContext("2d").drawImage(pa.Nb, 0, 0);
                    return Y
                }
            },
            yi: function() {
                window.CanvasListeners && (lc.init({
                    ta: xb.xb()
                }),
                mc.init_listeners = Ea.yi,
                mc.add_listener = lc.add_listener,
                mc.remove_listener = lc.remove_listener,
                mc.animate_swipe = lc.animate_swipe,
                mc.switch_modeInteractor = lc.switch_mode,
                mc.get_modeInteractor = lc.get_mode,
                lc.add_listener("move", function(K, P) {
                    oa === na.Z && (Z.un && (Za.offsetX -= P[0] * Z.Si,
                    Za.offsetX = Math.min(Math.max(Za.offsetX, -Z.$d), Z.$d)),
                    Za.offsetY -= P[1] * Z.Si,
                    Za.offsetY = Math.min(Math.max(Za.offsetY, -Z.$d), Z.$d),
                    Ea.Be())
                }, !0).add_listener("pinch", function(K, P) {
                    oa === na.Z && (Za.scale += P * Z.vn,
                    Za.scale = Math.min(Math.max(Za.scale, Z.Ti[0]), Z.Ti[1]),
                    Ea.Ce())
                }, !0))
            },
            Pm: function() {
                return new Promise(function(K, P) {
                    yb.m({
                        Od: !1,
                        sl: !1,
                        expand: !1,
                        ta: xb.xb(),
                        Vb: xb,
                        onload: function() {
                            sa.Lb = Cc.instance({
                                Pb: Z.ea + Z.xa + oc.xp,
                                zc: Z.ea + Z.xa + oc.yp,
                                yc: oc.nk,
                                Ac: oc.pk
                            });
                            Z.bc ? (sa.La = Cc.instance({}),
                            Ec.Na.sa(sa.La)) : sa.La = sa.Lb;
                            Bc.sa(sa.La);
                            sa.eg = Z.bc ? Jc.instance({
                                qn: sa.La,
                                on: sa.Lb
                            }) : sa.Lb;
                            K()
                        }
                    }) || P("CANNOT_INIT_JE3D")
                }
                )
            },
            Ng: function() {
                cb || (cb = !0,
                Ea.De(),
                x(),
                Na = 0,
                Z.Oc && y())
            },
            Qi: function(K, P) {
                K = Gc.instance({
                    Te: function() {
                        Ea.Ng();
                        P && P()
                    },
                    rd: H,
                    url: K.url,
                    dc: K.dc
                });
                m(K)
            },
            Uj: function() {
                if (Z.bc) {
                    var K = Object.assign({}, oc, {
                        Hb: f([Z.ea, Z.xa, oc.Hb])
                    });
                    Ec.Na.mb(K)
                }
            }
        };
        return Ea
    }
    var Ic = null;
    mc.onLoad = function(a) {
        mc.ready ? a() : rc.push(a)
    }
    ;
    mc.onHalfLoad = function(a) {
        mc.load_model ? a() : sc.push(a)
    }
    ;
    mc.onWebcamAsk = function(a) {
        tc = a
    }
    ;
    mc.onContextLost = function(a) {
        uc = a
    }
    ;
    mc.onWebcamGet = function(a) {
        vc = a
    }
    ;
    mc.get_onHalfLoadCallstack = function() {
        return sc
    }
    ;
    mc.set_size = function(a, b, d) {
        d = d ? xc.pf : 1;
        Z.width = a * d;
        Z.height = b * d
    }
    ;
    mc.get_videoDevices = function(a) {
        fc(a)
    }
    ;
    mc.set_videoDevice = function(a) {
        bc.deviceId = a
    }
    ;
    mc.set_videoSizes = function(a, b, d, f, n, t) {
        nc.idealWidth = a;
        nc.idealHeight = b;
        nc.minWidth = d;
        nc.maxWidth = f;
        nc.minHeight = n;
        nc.maxHeight = t
    }
    ;
    mc.set_loading = function(a, b, d) {
        a && (Z.Zf = !0,
        Z.Yf = a);
        "number" === typeof b && (a = new Kc(b),
        Z.Xd = [a.r, a.$, a.b, 0]);
        "number" === typeof d && (Z.Zd = d)
    }
    ;
    mc.set_settings = function(a, b, d) {
        a && Object.assign(Z, a);
        b && Object.assign(nc, b);
        d && Object.assign(oc, d)
    }
    ;
    mc.get_size = function() {
        return {
            width: Z.width,
            height: Z.height
        }
    }
    ;
    mc.get_cv = function() {
        return xb.xb()
    }
    ;
    mc.set_NNCPath = function(a) {
        Z.fd = a
    }
    ;
    mc.set_materialsPath = function(a) {
        Z.ae = a
    }
    ;
    mc.set_modelsPath = function(a) {
        Z.be = a
    }
    ;
    mc.destroy = function() {
        return Ic ? Ic.A() : Promise.resolve()
    }
    ;
    mc.update_lightSettings = function(a) {
        a = Object.assign({
            screenTextureURL: null,
            screenLuminosity: -1,
            lightDirFactor: -1,
            lightAmbFactor: -1,
            screenWidthAngle: -1
        }, a);
        0 <= a.lightDirFactor && (oc.Vd = a.lightDirFactor);
        0 <= a.lightAmbFactor && (oc.Ud = a.lightAmbFactor);
        0 <= a.screenLuminosity && (oc.ke = a.screenLuminosity);
        0 <= a.screenWidthAngle && (oc.Yc = a.screenWidthAngle);
        a.screenTextureURL && (oc.Hb = a.screenTextureURL);
        mc.ready && (Ic.Uj(),
        Ec.Na.wh(bc.V))
    }
    ;
    mc.preFetch = function(a, b) {
        b = b || [];
        b.push(Hc(a));
        b.forEach(Lc)
    }
    ;
    mc.check_isMobile = Rb;
    mc.init2 = function(a) {
        var b = Object.assign({
            basePath: null,
            modelsPath: null,
            materialsPath: null,
            materialTextureBasePath: null,
            NNCPath: null,
            cv: null,
            isRequestCamera: !0,
            width: 512,
            height: 512,
            isMirror: !0,
            isApplyOverSampling: !1,
            scanOverlapFactors: null,
            scanNScaleLevels: null,
            scanScale0Factor: null,
            callbackReady: null
        }, a);
        Z.Oc = b.isRequestCamera;
        mc.set_size(b.width, b.height, b.isApplyOverSampling);
        mc.update_lightSettings(a);
        b.modelsPath && (Z.be = b.modelsPath);
        b.materialsPath && (Z.ae = b.materialsPath);
        b.materialTextureBasePath && (c.Vi = b.materialTextureBasePath);
        b.NNCPath && (Z.fd = b.NNCPath);
        Z.scanOverlapFactors = b.scanOverlapFactors || Z.scanOverlapFactors;
        Z.scanNScaleLevels = b.scanNScaleLevels || Z.scanNScaleLevels;
        Z.scanScale0Factor = b.scanScale0Factor || Z.scanScale0Factor;
        Z.Hi = b.isMirror;
        return new Promise(function(d, f) {
            mc.onHalfLoad(d);
            mc.init(b.basePath, function() {
                b.callbackReady && b.callbackReady()
            }, f, b.cv)
        }
        )
    }
    ;
    mc.init = function(a, b, d, f) {
        Ic = Ac();
        qc = d ? function(n, t) {
            d(n, t);
            qc = null
        }
        : function() {}
        ;
        a && (Z.ea = a);
        b && rc.push(b);
        Ic.Uj();
        a = Ic.wm();
        return xb.m({
            af: "jeefitCanvas",
            ta: f,
            width: a.width,
            height: a.height,
            debug: !1,
            kg: function() {
                uc && uc()
            },
            premultipliedAlpha: !0
        }) ? Z.Oc ? Mc() : Nc() : (qc && qc("GL_INCOMPATIBLE", "Cannot init Context"),
        !1)
    }
    ;
    function Lc(a) {
        var b = document.createElement("link");
        b.setAttribute("href", a);
        "json" === a.split(".").pop().toLowerCase() ? (b.setAttribute("rel", "preload"),
        b.setAttribute("as", "fetch"),
        b.setAttribute("type", "application/json"),
        b.setAttribute("crossorigin", "")) : b.setAttribute("rel", "prefetch");
        document.head.appendChild(b)
    }
    function Hc(a) {
        if (!a) {
            a = Z.ea;
            var b = Z.fd.split("://").shift();
            if ("http" === b || "https" === b)
                a = ""
        }
        a += Z.fd;
        "json" !== a.split(".").pop() && (a += Z.neuralNetworkPath);
        return a
    }
    function Mc() {
        return new Promise(function(a, b) {
            tc && tc();
            bc.Sd = !1;
            var d = {
                width: {
                    min: nc.minWidth,
                    max: nc.maxWidth,
                    ideal: nc.idealWidth
                },
                height: {
                    min: nc.minHeight,
                    max: nc.maxHeight,
                    ideal: nc.idealHeight
                },
                facingMode: {
                    ideal: "user"
                }
            }
              , f = {
                video: d,
                audio: !1
            };
            bc.Eh = f;
            d && -1 !== bc.deviceId && Wb(f, bc.deviceId);
            cc(Ub() ? document.createElement("video") : !1, function(n) {
                vc && vc(n);
                Oc(n).then(a).catch(b)
            }, function(n) {
                qc && qc("WEBCAM_UNAVAILABLE", n);
                b(n)
            }, f)
        }
        )
    }
    mc.request_cameraVideoStream = function() {
        return Mc().then(function() {
            Ic.cm(Z.width, Z.height, 0)
        })
    }
    ;
    function Oc(a) {
        bc.element = a;
        a = bc.element.videoWidth || bc.element.width;
        var b = bc.element.videoHeight || bc.element.height;
        bc.Yg = {
            ma: bc.element,
            isPot: !1,
            isFloat: !1,
            isFlipY: !0
        };
        bc.V = vb.instance(bc.Yg);
        Ic.Kg(a, b);
        return Ic.Jf(a, b).then(function() {
            Ic.Rg();
            return Ic.ap()
        }).catch(function(d) {
            return Promise.reject(d)
        })
    }
    function Nc() {
        var a = document.createElement("canvas");
        a.width = Z.width;
        a.height = Z.height;
        bc.Th = a.getContext("2d");
        bc.Sd = !0;
        return Oc(a)
    }
    window.JEELIZVTO = mc;
    var Fc = function() {
        function a() {
            sb.ba();
            C.viewport(0, 0, 1, 1);
            J.set("s74");
            f.h(0);
            V.l(!1);
            C.readPixels(0, 0, 1, 1, C.RGBA, C.UNSIGNED_BYTE, t);
            b(0 < t[0])
        }
        var b = null
          , d = !1
          , f = null
          , n = !1
          , t = null
          , p = {
            m: function(g) {
                if (n)
                    return !1;
                f = g;
                J.xc([{
                    id: "s74",
                    name: "_",
                    g: "uniform sampler2D u42;const vec2 e=vec2(.16,.5);void main(){vec4 a=texture2D(u42,e);float b=step(1.99,a.r);gl_FragColor=vec4(b,0.,0.,1.);}",
                    i: ["u42"],
                    precision: "lowp"
                }]);
                J.j("s74", [{
                    type: "1i",
                    name: "u42",
                    value: 0
                }]);
                t = new Uint8Array(4);
                return n = !0
            },
            start: function(g, k) {
                p.stop();
                b = k;
                d = window.setInterval(a, g)
            },
            stop: function() {
                d && (window.clearInterval(a),
                d = !1)
            }
        };
        return p
    }()
      , Pc = {};
    function Kc(a) {
        return 3 === arguments.length ? this.vb(arguments) : this.set(a)
    }
    function Qc(a, b) {
        b = Math.floor(b);
        a.r = (b >> 16 & 255) / 255;
        a.$ = (b >> 8 & 255) / 255;
        a.b = (b & 255) / 255
    }
    function Rc(a, b) {
        function d(g) {
            void 0 !== g && 1 > parseFloat(g) && console.warn("JETHREE.Color: Alpha component of " + b + " will be ignored.")
        }
        var f;
        if (f = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(b)) {
            var n = f[2];
            switch (f[1]) {
            case "rgb":
            case "rgba":
                if (f = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(n)) {
                    a.r = Math.min(255, parseInt(f[1], 10)) / 255;
                    a.$ = Math.min(255, parseInt(f[2], 10)) / 255;
                    a.b = Math.min(255, parseInt(f[3], 10)) / 255;
                    d(f[5]);
                    return
                }
                if (f = /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(n)) {
                    a.r = Math.min(100, parseInt(f[1], 10)) / 100;
                    a.$ = Math.min(100, parseInt(f[2], 10)) / 100;
                    a.b = Math.min(100, parseInt(f[3], 10)) / 100;
                    d(f[5]);
                    return
                }
                break;
            case "hsl":
            case "hsla":
                if (f = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(n)) {
                    n = parseFloat(f[1]) / 360;
                    var t = parseInt(f[2], 10) / 100
                      , p = parseInt(f[3], 10) / 100;
                    d(f[5]);
                    a.so(n, t, p);
                    return
                }
            }
        } else if (f = /^#([A-Fa-f0-9]+)$/.exec(b)) {
            f = f[1];
            n = f.length;
            if (3 === n) {
                a.r = parseInt(f.charAt(0) + f.charAt(0), 16) / 255;
                a.$ = parseInt(f.charAt(1) + f.charAt(1), 16) / 255;
                a.b = parseInt(f.charAt(2) + f.charAt(2), 16) / 255;
                return
            }
            if (6 === n) {
                a.r = parseInt(f.charAt(0) + f.charAt(1), 16) / 255;
                a.$ = parseInt(f.charAt(2) + f.charAt(3), 16) / 255;
                a.b = parseInt(f.charAt(4) + f.charAt(5), 16) / 255;
                return
            }
        }
        b && 0 < b.length && (f = Sc[b],
        void 0 !== f ? Qc(a, f) : console.warn("JETHREE.Color: Unknown color " + b))
    }
    Kc.prototype = {
        constructor: Kc,
        r: 1,
        $: 1,
        b: 1,
        set: function(a) {
            a instanceof Kc ? this.N(a) : "number" === typeof a ? Qc(this, a) : "string" === typeof a && Rc(this, a);
            return this
        },
        so: function() {
            function a(b, d, f) {
                0 > f && (f += 1);
                1 < f && --f;
                return f < 1 / 6 ? b + 6 * (d - b) * f : .5 > f ? d : f < 2 / 3 ? b + 6 * (d - b) * (2 / 3 - f) : b
            }
            return function(b, d, f) {
                b = Pc.Math.iq(b, 1);
                d = Pc.Math.We(d, 0, 1);
                f = Pc.Math.We(f, 0, 1);
                0 === d ? this.r = this.$ = this.b = f : (d = .5 >= f ? f * (1 + d) : f + d - f * d,
                f = 2 * f - d,
                this.r = a(f, d, b + 1 / 3),
                this.$ = a(f, d, b),
                this.b = a(f, d, b - 1 / 3));
                return this
            }
        }(),
        clone: function() {
            return new this.constructor(this.r,this.$,this.b)
        },
        N: function(a) {
            this.r = a.r;
            this.$ = a.$;
            this.b = a.b;
            return this
        },
        add: function(a) {
            this.r += a.r;
            this.$ += a.$;
            this.b += a.b;
            return this
        },
        multiply: function(a) {
            this.r *= a.r;
            this.$ *= a.$;
            this.b *= a.b;
            return this
        },
        Ha: function(a) {
            this.r *= a;
            this.$ *= a;
            this.b *= a;
            return this
        },
        vb: function(a, b) {
            void 0 === b && (b = 0);
            this.r = a[b];
            this.$ = a[b + 1];
            this.b = a[b + 2];
            return this
        }
    };
    var Sc = {};
    function Tc(a, b, d, f) {
        this.F = a || 0;
        this.G = b || 0;
        this.H = d || 0;
        this.T = void 0 !== f ? f : 1
    }
    function Uc(a, b, d) {
        var f = b.F
          , n = b.G
          , t = b.H;
        b = b.T;
        var p = d.F
          , g = d.G
          , k = d.H;
        d = d.T;
        a.F = f * d + b * p + n * k - t * g;
        a.G = n * d + b * g + t * p - f * k;
        a.H = t * d + b * k + f * g - n * p;
        a.T = b * d - f * p - n * g - t * k;
        return a
    }
    Tc.prototype = {
        constructor: Tc,
        get x() {
            return this.F
        },
        set x(a) {
            this.F = a
        },
        get y() {
            return this.G
        },
        set y(a) {
            this.G = a
        },
        get z() {
            return this.H
        },
        set z(a) {
            this.H = a
        },
        get w() {
            return this.T
        },
        set w(a) {
            this.T = a
        },
        set: function(a, b, d, f) {
            this.F = a;
            this.G = b;
            this.H = d;
            this.T = f;
            return this
        },
        clone: function() {
            return new this.constructor(this.F,this.G,this.H,this.T)
        },
        N: function(a) {
            this.F = a.x;
            this.G = a.y;
            this.H = a.z;
            this.T = a.w;
            return this
        },
        inverse: function() {
            this.F *= -1;
            this.G *= -1;
            this.H *= -1;
            this.normalize();
            return this
        },
        wd: function(a) {
            return this.F * a.F + this.G * a.G + this.H * a.H + this.T * a.T
        },
        Rf: function() {
            return this.F * this.F + this.G * this.G + this.H * this.H + this.T * this.T
        },
        length: function() {
            return Math.sqrt(this.F * this.F + this.G * this.G + this.H * this.H + this.T * this.T)
        },
        normalize: function() {
            var a = this.length();
            0 === a ? (this.H = this.G = this.F = 0,
            this.T = 1) : (a = 1 / a,
            this.F = this.F * a,
            this.G = this.G * a,
            this.H = this.H * a,
            this.T = this.T * a);
            return this
        },
        multiply: function(a, b) {
            return void 0 !== b ? (console.warn("JETHREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
            Uc(this, a, b)) : Uc(this, this, a)
        },
        vb: function(a, b) {
            void 0 === b && (b = 0);
            this.F = a[b];
            this.G = a[b + 1];
            this.H = a[b + 2];
            this.T = a[b + 3];
            return this
        }
    };
    function Vc(a, b) {
        this.x = a || 0;
        this.y = b || 0
    }
    Vc.prototype = {
        constructor: Vc,
        get width() {
            return this.x
        },
        set width(a) {
            this.x = a
        },
        get height() {
            return this.y
        },
        set height(a) {
            this.y = a
        },
        set: function(a, b) {
            this.x = a;
            this.y = b;
            return this
        },
        wj: function(a) {
            this.x = a;
            return this
        },
        xj: function(a) {
            this.y = a;
            return this
        },
        clone: function() {
            return new this.constructor(this.x,this.y)
        },
        N: function(a) {
            this.x = a.x;
            this.y = a.y;
            return this
        },
        add: function(a, b) {
            if (void 0 !== b)
                return console.warn("JETHREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
                this.jd(a, b);
            this.x += a.x;
            this.y += a.y;
            return this
        },
        jd: function(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            return this
        },
        sub: function(a, b) {
            if (void 0 !== b)
                return console.warn("JETHREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
                this.kb(a, b);
            this.x -= a.x;
            this.y -= a.y;
            return this
        },
        kb: function(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            return this
        },
        multiply: function(a) {
            this.x *= a.x;
            this.y *= a.y;
            return this
        },
        Ha: function(a) {
            isFinite(a) ? (this.x *= a,
            this.y *= a) : this.y = this.x = 0;
            return this
        },
        hf: function(a) {
            return this.Ha(1 / a)
        },
        min: function(a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            return this
        },
        max: function(a) {
            this.x = Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            return this
        },
        We: function(a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            return this
        },
        floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            return this
        },
        ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            return this
        },
        round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            return this
        },
        wd: function(a) {
            return this.x * a.x + this.y * a.y
        },
        Rf: function() {
            return this.x * this.x + this.y * this.y
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y)
        },
        normalize: function() {
            return this.hf(this.length())
        },
        vb: function(a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b + 1];
            return this
        }
    };
    function Wc(a, b, d) {
        this.x = a || 0;
        this.y = b || 0;
        this.z = d || 0
    }
    function Xc(a, b) {
        var d = a.x
          , f = a.y
          , n = a.z;
        a.x = f * b.z - n * b.y;
        a.y = n * b.x - d * b.z;
        a.z = d * b.y - f * b.x
    }
    Wc.prototype = {
        constructor: Wc,
        set: function(a, b, d) {
            this.x = a;
            this.y = b;
            this.z = d;
            return this
        },
        wj: function(a) {
            this.x = a;
            return this
        },
        xj: function(a) {
            this.y = a;
            return this
        },
        clone: function() {
            return new this.constructor(this.x,this.y,this.z)
        },
        N: function(a) {
            this.x = a.x;
            this.y = a.y;
            this.z = a.z;
            return this
        },
        add: function(a, b) {
            if (void 0 !== b)
                return console.warn("JETHREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
                this.jd(a, b);
            this.x += a.x;
            this.y += a.y;
            this.z += a.z;
            return this
        },
        jd: function(a, b) {
            this.x = a.x + b.x;
            this.y = a.y + b.y;
            this.z = a.z + b.z;
            return this
        },
        sub: function(a, b) {
            if (void 0 !== b)
                return console.warn("JETHREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
                this.kb(a, b);
            this.x -= a.x;
            this.y -= a.y;
            this.z -= a.z;
            return this
        },
        kb: function(a, b) {
            this.x = a.x - b.x;
            this.y = a.y - b.y;
            this.z = a.z - b.z;
            return this
        },
        multiply: function(a, b) {
            if (void 0 !== b)
                return console.warn("JETHREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
                this.x = a.x * b.x,
                this.y = a.y * b.y,
                this.z = a.z * b.z,
                this;
            this.x *= a.x;
            this.y *= a.y;
            this.z *= a.z;
            return this
        },
        Ha: function(a) {
            isFinite(a) ? (this.x *= a,
            this.y *= a,
            this.z *= a) : this.z = this.y = this.x = 0;
            return this
        },
        hf: function(a) {
            return this.Ha(1 / a)
        },
        min: function(a) {
            this.x = Math.min(this.x, a.x);
            this.y = Math.min(this.y, a.y);
            this.z = Math.min(this.z, a.z);
            return this
        },
        max: function(a) {
            this.x = Math.max(this.x, a.x);
            this.y = Math.max(this.y, a.y);
            this.z = Math.max(this.z, a.z);
            return this
        },
        We: function(a, b) {
            this.x = Math.max(a.x, Math.min(b.x, this.x));
            this.y = Math.max(a.y, Math.min(b.y, this.y));
            this.z = Math.max(a.z, Math.min(b.z, this.z));
            return this
        },
        floor: function() {
            this.x = Math.floor(this.x);
            this.y = Math.floor(this.y);
            this.z = Math.floor(this.z);
            return this
        },
        ceil: function() {
            this.x = Math.ceil(this.x);
            this.y = Math.ceil(this.y);
            this.z = Math.ceil(this.z);
            return this
        },
        round: function() {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
            this.z = Math.round(this.z);
            return this
        },
        wd: function(a) {
            return this.x * a.x + this.y * a.y + this.z * a.z
        },
        Rf: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z
        },
        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
        },
        normalize: function() {
            return this.hf(this.length())
        },
        vb: function(a, b) {
            void 0 === b && (b = 0);
            this.x = a[b];
            this.y = a[b + 1];
            this.z = a[b + 2];
            return this
        }
    };
    function Yc(a, b, d, f) {
        this.F = a || 0;
        this.G = b || 0;
        this.H = d || 0;
        this.Wa = f || Yc.tk
    }
    Yc.tk = "XYZ";
    Yc.prototype = {
        constructor: Yc,
        get x() {
            return this.F
        },
        set x(a) {
            this.F = a
        },
        get y() {
            return this.G
        },
        set y(a) {
            this.G = a
        },
        get z() {
            return this.H
        },
        set z(a) {
            this.H = a
        },
        get order() {
            return this.Wa
        },
        set order(a) {
            this.Wa = a
        },
        set: function(a, b, d, f) {
            this.F = a;
            this.G = b;
            this.H = d;
            this.Wa = f || this.Wa;
            return this
        },
        clone: function() {
            return new this.constructor(this.F,this.G,this.H,this.Wa)
        },
        N: function(a) {
            this.F = a.F;
            this.G = a.G;
            this.H = a.H;
            this.Wa = a.Wa;
            return this
        },
        vb: function(a) {
            this.F = a[0];
            this.G = a[1];
            this.H = a[2];
            void 0 !== a[3] && (this.Wa = a[3]);
            return this
        }
    };
    function Zc(a, b) {
        this.min = void 0 !== a ? a : new Wc(Infinity,Infinity,Infinity);
        this.max = void 0 !== b ? b : new Wc(-Infinity,-Infinity,-Infinity)
    }
    function $c(a) {
        return (new Wc).jd(a.min, a.max).Ha(.5)
    }
    function ad(a, b) {
        a.min.min(b);
        a.max.max(b)
    }
    Zc.prototype = {
        constructor: Zc,
        set: function(a, b) {
            this.min.N(a);
            this.max.N(b);
            return this
        },
        clone: function() {
            return (new this.constructor).N(this)
        },
        N: function(a) {
            this.min.N(a.min);
            this.max.N(a.max);
            return this
        },
        empty: function() {
            return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
        },
        size: function(a) {
            return (a || new Wc).kb(this.max, this.min)
        },
        getParameter: function(a, b) {
            return (b || new Wc).set((a.x - this.min.x) / (this.max.x - this.min.x), (a.y - this.min.y) / (this.max.y - this.min.y), (a.z - this.min.z) / (this.max.z - this.min.z))
        },
        translate: function(a) {
            this.min.add(a);
            this.max.add(a);
            return this
        }
    };
    function bd() {
        this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
        0 < arguments.length && console.error("JETHREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
    }
    function cd(a, b, d) {
        var f = b.elements
          , n = d.elements;
        d = a.elements;
        b = f[0];
        var t = f[4]
          , p = f[8]
          , g = f[12]
          , k = f[1]
          , r = f[5]
          , w = f[9]
          , H = f[13]
          , v = f[2]
          , x = f[6]
          , y = f[10]
          , m = f[14]
          , l = f[3]
          , E = f[7]
          , L = f[11];
        f = f[15];
        var B = n[0]
          , D = n[4]
          , e = n[8]
          , q = n[12]
          , z = n[1]
          , O = n[5]
          , G = n[9]
          , S = n[13]
          , Q = n[2]
          , I = n[6]
          , A = n[10]
          , u = n[14]
          , N = n[3]
          , R = n[7]
          , T = n[11];
        n = n[15];
        d[0] = b * B + t * z + p * Q + g * N;
        d[4] = b * D + t * O + p * I + g * R;
        d[8] = b * e + t * G + p * A + g * T;
        d[12] = b * q + t * S + p * u + g * n;
        d[1] = k * B + r * z + w * Q + H * N;
        d[5] = k * D + r * O + w * I + H * R;
        d[9] = k * e + r * G + w * A + H * T;
        d[13] = k * q + r * S + w * u + H * n;
        d[2] = v * B + x * z + y * Q + m * N;
        d[6] = v * D + x * O + y * I + m * R;
        d[10] = v * e + x * G + y * A + m * T;
        d[14] = v * q + x * S + y * u + m * n;
        d[3] = l * B + E * z + L * Q + f * N;
        d[7] = l * D + E * O + L * I + f * R;
        d[11] = l * e + E * G + L * A + f * T;
        d[15] = l * q + E * S + L * u + f * n;
        return a
    }
    bd.prototype = {
        constructor: bd,
        set: function(a, b, d, f, n, t, p, g, k, r, w, H, v, x, y, m) {
            var l = this.elements;
            l[0] = a;
            l[4] = b;
            l[8] = d;
            l[12] = f;
            l[1] = n;
            l[5] = t;
            l[9] = p;
            l[13] = g;
            l[2] = k;
            l[6] = r;
            l[10] = w;
            l[14] = H;
            l[3] = v;
            l[7] = x;
            l[11] = y;
            l[15] = m;
            return this
        },
        clone: function() {
            return (new bd).vb(this.elements)
        },
        N: function(a) {
            this.elements.set(a.elements);
            return this
        },
        multiply: function(a, b) {
            return void 0 !== b ? (console.warn("JETHREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),
            cd(this, a, b)) : cd(this, this, a)
        },
        Ha: function(a) {
            var b = this.elements;
            b[0] *= a;
            b[4] *= a;
            b[8] *= a;
            b[12] *= a;
            b[1] *= a;
            b[5] *= a;
            b[9] *= a;
            b[13] *= a;
            b[2] *= a;
            b[6] *= a;
            b[10] *= a;
            b[14] *= a;
            b[3] *= a;
            b[7] *= a;
            b[11] *= a;
            b[15] *= a;
            return this
        },
        setPosition: function(a) {
            var b = this.elements;
            b[12] = a.x;
            b[13] = a.y;
            b[14] = a.z;
            return this
        },
        translate: function() {
            console.error("JETHREE.Matrix4: .translate() has been removed.")
        },
        scale: function(a) {
            var b = this.elements
              , d = a.x
              , f = a.y;
            a = a.z;
            b[0] *= d;
            b[4] *= f;
            b[8] *= a;
            b[1] *= d;
            b[5] *= f;
            b[9] *= a;
            b[2] *= d;
            b[6] *= f;
            b[10] *= a;
            b[3] *= d;
            b[7] *= f;
            b[11] *= a;
            return this
        },
        vb: function(a) {
            this.elements.set(a);
            return this
        }
    };
    function dd(a, b, d, f, n, t) {
        this.a = a;
        this.b = b;
        this.c = d;
        this.Ia = f instanceof Wc ? f : new Wc;
        this.Ge = Array.isArray(f) ? f : [];
        this.color = n instanceof Kc ? n : new Kc;
        this.gh = Array.isArray(n) ? n : [];
        this.cc = void 0 !== t ? t : 0
    }
    dd.prototype = {
        constructor: dd,
        clone: function() {
            return (new this.constructor).N(this)
        },
        N: function(a) {
            this.a = a.a;
            this.b = a.b;
            this.c = a.c;
            this.Ia.N(a.Ia);
            this.color.N(a.color);
            this.cc = a.cc;
            for (var b = 0, d = a.Ge.length; b < d; b++)
                this.Ge[b] = a.Ge[b].clone();
            b = 0;
            for (d = a.gh.length; b < d; b++)
                this.gh[b] = a.gh[b].clone();
            return this
        }
    };
    function ed(a, b, d) {
        var f = new XMLHttpRequest;
        f.open("GET", a, !0);
        var n = f.withCredentials = !1;
        f.onreadystatechange = function() {
            404 !== f.status || n || (n = !0,
            d && d(404));
            if (4 === f.readyState && 200 === f.status) {
                var t = null;
                try {
                    t = JSON.parse(f.responseText)
                } catch (p) {
                    d && d(-1)
                }
                b && t && b(t)
            }
        }
        ;
        f.onerror = function() {
            d && d(0)
        }
        ;
        f.send()
    }
    function fd(a, b, d) {
        "object" === typeof a ? b(a) : ed(a, b, d)
    }
    function gd(a) {
        return new Promise(function(b, d) {
            fd(a, b, d)
        }
        )
    }
    function hd(a, b) {
        for (var d = new Wc, f = new Wc, n = 0, t = b.length; n < t; n++) {
            var p = b[n]
              , g = a[p.a]
              , k = a[p.b]
              , r = a[p.c];
            g && k && r && (d.kb(r, k),
            f.kb(g, k),
            Xc(d, f),
            0 !== d.Rf() && (d.normalize(),
            p.Ia.N(d)))
        }
    }
    function id(a, b) {
        for (var d = Array(a.length), f = 0, n = a.length; f < n; ++f)
            d[f] = new Wc;
        f = new Wc;
        n = new Wc;
        for (var t = 0, p = b.length; t < p; ++t) {
            var g = b[t]
              , k = a[g.a]
              , r = a[g.b]
              , w = a[g.c];
            k && r && w && (f.kb(w, r),
            n.kb(k, r),
            Xc(f, n),
            d[g.a].add(f),
            d[g.b].add(f),
            d[g.c].add(f))
        }
        f = 0;
        for (a = a.length; f < a; ++f)
            d[f].normalize();
        a = 0;
        for (f = b.length; a < f; ++a)
            g = b[a],
            n = g.Ge,
            t = d[g.a],
            p = d[g.b],
            g = d[g.c],
            t && p && g && (3 === n.length ? (n[0].N(t),
            n[1].N(p),
            n[2].N(g)) : (n[0] = t.clone(),
            n[1] = p.clone(),
            n[2] = g.clone()));
        return d
    }
    function kd(a, b, d, f) {
        function n(q) {
            D.N(b[q]);
            e.N(D);
            var z = g[q];
            L.N(z);
            L.sub(D.Ha(D.wd(z))).normalize();
            var O = e.x
              , G = e.y
              , S = e.z
              , Q = z.x
              , I = z.y;
            z = z.z;
            B.x = G * z - S * I;
            B.y = S * Q - O * z;
            B.z = O * I - G * Q;
            O = 0 > B.wd(k[q]) ? -1 : 1;
            p[4 * q] = L.x;
            p[4 * q + 1] = L.y;
            p[4 * q + 2] = L.z;
            p[4 * q + 3] = O
        }
        for (var t = a.length, p = new Float32Array(4 * t), g = Array(t), k = Array(t), r = 0; r < t; r++)
            g[r] = new Wc,
            k[r] = new Wc;
        var w = new Wc
          , H = new Wc
          , v = new Wc
          , x = new Vc
          , y = new Vc
          , m = new Vc
          , l = new Wc
          , E = new Wc;
        f.forEach(function(q) {
            var z = q.a
              , O = q.b;
            q = q.c;
            w.N(a[z]);
            H.N(a[O]);
            v.N(a[q]);
            x.N(d[z]);
            y.N(d[O]);
            m.N(d[q]);
            var G = H.x - w.x
              , S = v.x - w.x
              , Q = H.y - w.y
              , I = v.y - w.y
              , A = H.z - w.z
              , u = v.z - w.z
              , N = y.x - x.x
              , R = m.x - x.x
              , T = y.y - x.y
              , aa = m.y - x.y
              , ka = 1 / (N * aa - R * T);
            l.set((aa * G - T * S) * ka, (aa * Q - T * I) * ka, (aa * A - T * u) * ka);
            E.set((N * S - R * G) * ka, (N * I - R * Q) * ka, (N * u - R * A) * ka);
            g[z].add(l);
            g[O].add(l);
            g[q].add(l);
            k[z].add(E);
            k[O].add(E);
            k[q].add(E)
        });
        var L = new Wc
          , B = new Wc
          , D = new Wc
          , e = new Wc;
        f.forEach(function(q) {
            n(q.a);
            n(q.b);
            n(q.c)
        });
        return p
    }
    function ld(a, b, d, f) {
        return Math.sqrt((a - d) * (a - d) + (b - f) * (b - f))
    }
    var X = function() {
        function a(e, q, z) {
            q = e.createShader(q);
            e.shaderSource(q, z);
            e.compileShader(q);
            return e.getShaderParameter(q, e.COMPILE_STATUS) ? q : !1
        }
        function b(e, q) {
            yb.oa() && (q.g = q.g.replace(/gl_FragData\[([0-3])\]/g, "gbuf$1"));
            q.Bf = a(e, e.VERTEX_SHADER, q.v, q.name + " VERTEX");
            q.Af = a(e, e.FRAGMENT_SHADER, q.g, q.name + " FRAGMENT");
            var z = e.createProgram();
            e.attachShader(z, q.Bf);
            e.attachShader(z, q.Af);
            e.linkProgram(z);
            return z
        }
        function d(e) {
            e.v = "#version 300 es\n" + e.v.replace(/varying/g, "out");
            e.g = "#version 300 es\n" + e.g.replace(/varying/g, "in");
            e.v = e.v.replace(/texture2D\(/g, "texture(");
            e.g = e.g.replace(/texture2D\(/g, "texture(");
            e.fa || (e.g = e.g.replace(/void main/g, "out vec4 FragColor;\nvoid main"),
            e.g = e.g.replace(RegExp("gl_FragColor", "g"), "FragColor"));
            var q = 0
              , z = [];
            e.v = e.v.replace(/attribute ([a-z]+[0-4]*) ([_a-zA-Z,0-9\s]+);/g, function(O, G, S) {
                var Q = "";
                S.split(",").forEach(function(I) {
                    I = I.trim();
                    Q += "layout(location = " + q + ") in " + G + " " + I + ";\n";
                    z.push(I);
                    ++q
                });
                return Q
            });
            e.Bk = z
        }
        function f(e) {
            return ["float", "sampler2D", "int"].map(function(q) {
                return "precision " + e + " " + q + ";\n"
            }).join("")
        }
        function n(e, q) {
            if (q.zi)
                return !1;
            var z = yb.oa();
            c.Cq || z || e.enableVertexAttribArray(0);
            void 0 === q.fa && (q.fa = !1);
            q.fa && (q.hd = z ? 3 : 2);
            q.id = L++;
            void 0 === q.hd && (q.hd = 2);
            void 0 === q.precision && (q.precision = B.high);
            q.fa && (q.g = (yb.oa() ? "precision highp float;\n          layout(location = 0) out vec4 gbuf0;\n          layout(location = 1) out vec4 gbuf1;\n          layout(location = 2) out vec4 gbuf2;\n          layout(location = 3) out vec4 gbuf3;\n" : "#extension GL_EXT_draw_buffers : require\n") + q.g);
            void 0 === q.v && (q.v = "precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}");
            var O = f(q.precision);
            q.g = O + q.g;
            q.v = O + q.v;
            z && 3 <= q.hd && d(q);
            q.Ka && q.Ka.forEach(function(G) {
                q.v = q.v.replace(G.search, G.replace);
                q.g = q.g.replace(G.search, G.replace)
            });
            q.ra = b(e, q);
            q.B = {};
            q.i.forEach(function(G) {
                q.B[G] = e.getUniformLocation(q.ra, G)
            });
            q.attributes = {};
            q.ya = [];
            q.fh = 0;
            void 0 === q.K && (q.K = ["a0"]);
            void 0 === q.S && (q.S = [2]);
            q.K.forEach(function(G, S) {
                var Q = z && 3 <= q.hd ? q.Bk.indexOf(G) : e.getAttribLocation(q.ra, G);
                q.attributes[G] = Q;
                q.ya.push(Q);
                q.fh += 4 * q.S[S]
            });
            q.set = function() {
                l !== q.id && (-1 !== l && E.M(),
                l = q.id,
                E = q,
                e.useProgram(q.ra),
                q.ya.forEach(function(G) {
                    0 !== G && e.enableVertexAttribArray(G)
                }))
            }
            ;
            q.M = function() {
                l = -1;
                q.ya.forEach(function(G) {
                    0 !== G && e.disableVertexAttribArray(G)
                })
            }
            ;
            q.zi = !0
        }
        function t(e, q) {
            n(e, q);
            q.set();
            l = -1;
            return q
        }
        function p() {
            return {
                name: "_",
                g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                i: ["u1"],
                precision: B.high
            }
        }
        function g() {
            D.j("s107", [{
                type: "1i",
                name: "u1",
                value: 0
            }]);
            D.j("s108", [{
                type: "1i",
                name: "u161",
                value: 0
            }]);
            D.j("s109", [{
                type: "1i",
                name: "u81",
                value: 0
            }])
        }
        function k() {
            var e = "u42 u152 u153 u154 u155 u43 u86".split(" ").concat(x, y);
            m.s110 = {
                name: "_",
                g: "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
                v: "attribute vec3 a0;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u158,u159,u154,u155,u71;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.);const vec3 o=vec3(1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,p);vec2 f=u93*e;vec3 c=u93*o;vec2 t=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,q).rgb+vec3(u87,0.,0.),u90,c);float u=mix(texture2D(u42,r).r,0.,u93);a.z+=u;mat3 v=s(a);vec3 w=mix(u152,u91,c);float x=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 y=mat2(h,i,-i,h);b.xy=y*b.xy;float z=mix(u89,1.,u93);vec2 j=u88/t;vec3 k=a0;float A=max(0.,-a0.z-u154)*u155;k.x+=A*sign(a0.x)*(1.-u93);vec3 l=v*(k+w)*x+b;vec2 B=j*z;vec3 C=vec3(g*B,-j)+l*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(C,1.)),vv0=l,vv1=smoothstep(u158,u159,a0.z);}",
                i: ["u158", "u159"].concat(e),
                K: ["a0"],
                precision: B.high
            };
            m.s111 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec3 u156,u77;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 f=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,f,u77.x);float c=a.a,g=dot(a.rgb,vec3(.333)),d=1.-u77.y*g;c*=d;float h=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(h),b,vec3(d));vec3 i=u77.z*vec3(.25);b=max(b,i);vec4 j=vec4(b,c);gl_FragColor=j;}",
                v: "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u154,u155,u71;varying vec2 vv0;const vec2 e=vec2(1.);const vec3 m=vec3(1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,n);vec2 f=u93*e;vec3 c=u93*m;vec2 r=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,o).rgb+vec3(u87,0.,0.),u90,c);float s=mix(texture2D(u42,p).r,0.,u93);a.z+=s;mat3 t=q(a);vec3 u=mix(u152,u91,c);float v=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u89,1.,u93);vec2 j=u88/r;vec3 k=a0;float y=max(0.,-a0.z-u154)*u155;k.x+=y*sign(a0.x)*(1.-u93);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(B,1.)),vv0=a1;}",
                i: ["u156"].concat(H, e),
                K: ["a0", "a1"],
                S: [3, 2],
                precision: B.low
            };
            m.s112 = {
                name: "_",
                g: "uniform vec3 u156;void main(){gl_FragColor=vec4(u156,1.);}",
                v: "attribute vec3 a0;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u154,u155,u71;const vec2 e=vec2(1.);const vec3 l=vec3(1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,m);vec2 f=u93*e;vec3 c=u93*l;vec2 q=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,n).rgb+vec3(u87,0.,0.),u90,c);float r=mix(texture2D(u42,o).r,0.,u93);a.z+=r;mat3 s=p(a);vec3 t=mix(u152,u91,c);float u=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u89,1.,u93);vec2 j=u88/q;vec3 k=a0;float x=max(0.,-a0.z-u154)*u155;k.x+=x*sign(a0.x)*(1.-u93);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(A,1.));}",
                i: ["u156"].concat(e),
                S: [3],
                precision: B.low
            };
            m.s113 = {
                name: "_",
                g: "uniform vec4 u14;varying vec3 vv0;varying float vv1;void main(){float a=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv1);gl_FragColor=vec4(normalize(vv0),a);}",
                v: "attribute vec3 a0,a2;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u154,u155,u71;varying vec3 vv0;varying float vv1;const vec2 e=vec2(1.);const vec3 o=vec3(1.);const vec2 D=vec2(-1.,1.),p=vec2(.16,.5),q=vec2(.5,.5),r=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 s(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,p);vec2 f=u93*e;vec3 c=u93*o;vec2 t=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,q).rgb+vec3(u87,0.,0.),u90,c);float u=mix(texture2D(u42,r).r,0.,u93);a.z+=u;mat3 h=s(a);vec3 v=mix(u152,u91,c);float w=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 x=mat2(i,j,-j,i);b.xy=x*b.xy;float y=mix(u89,1.,u93);vec2 k=u88/t;vec3 l=a0;float z=max(0.,-a0.z-u154)*u155;l.x+=z*sign(a0.x)*(1.-u93);vec3 A=h*(l+v)*w+b;vec2 B=k*y;vec3 C=vec3(g*B,-k)+A*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(C,1.)),vv0=h*a2*vec3(1.,-1.,-1.),vv1=a0.y;}",
                i: ["u14", "u86"].concat(e),
                K: ["a0", "a2"],
                precision: B.high
            };
            m.s114 = {
                name: "_",
                g: "uniform sampler2D u161;uniform vec4 u14;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=vec3(0.,0.,-1.),c=normalize(vv1),b=texture2D(u161,vv2).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv1:a;float m=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv3);gl_FragColor=vec4(a,m);}",
                v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u154,u155,u71;varying vec4 vv0;varying vec3 vv1;varying vec2 vv2;varying float vv3;const vec2 e=vec2(1.);const vec3 q=vec3(1.);const vec2 F=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,r);vec2 f=u93*e;vec3 c=u93*q;vec2 v=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,s).rgb+vec3(u87,0.,0.),u90,c);float w=mix(texture2D(u42,t).r,0.,u93);a.z+=w;mat3 h=u(a);vec3 x=mix(u152,u91,c);float y=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 z=mat2(i,j,-j,i);b.xy=z*b.xy;float A=mix(u89,1.,u93);vec2 k=u88/v;vec3 l=a0;float B=max(0.,-a0.z-u154)*u155;l.x+=B*sign(a0.x)*(1.-u93);vec3 C=h*(l+x)*y+b;vec2 D=k*A;vec3 E=vec3(g*D,-k)+C*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv0=a3,vv2=a1,vv3=a0.y;}",
                i: ["u14", "u86", "u161"].concat(e),
                K: ["a3", "a0", "a2", "a1"],
                S: [4, 3, 3, 2],
                precision: B.high
            };
            m.s115 = {
                name: "_",
                g: "uniform vec4 u120;uniform float u157;void main(){float b=u157;vec4 a=u120;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
                v: "attribute vec3 a0;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u154,u155,u71;const vec2 e=vec2(1.);const vec3 l=vec3(1.);const vec2 B=vec2(-1.,1.),m=vec2(.16,.5),n=vec2(.5,.5),o=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 p(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,m);vec2 f=u93*e;vec3 c=u93*l;vec2 q=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,n).rgb+vec3(u87,0.,0.),u90,c);float r=mix(texture2D(u42,o).r,0.,u93);a.z+=r;mat3 s=p(a);vec3 t=mix(u152,u91,c);float u=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 v=mat2(h,i,-i,h);b.xy=v*b.xy;float w=mix(u89,1.,u93);vec2 j=u88/q;vec3 k=a0;float x=max(0.,-a0.z-u154)*u155;k.x+=x*sign(a0.x)*(1.-u93);vec3 y=s*(k+t)*u+b;vec2 z=j*w;vec3 A=vec3(g*z,-j)+y*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(A,1.));}",
                i: ["u120", "u157"].concat(e),
                precision: B.low
            };
            m.s116 = {
                name: "_",
                g: "uniform sampler2D u81;uniform vec4 u120,u82;uniform float u157;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u157;vec4 a=u120,d=texture2D(u81,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u82*e),c=mix(c,l,u82.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
                v: "attribute vec3 a0;attribute vec2 a1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u154,u155,u71;varying vec2 vv0;const vec2 e=vec2(1.);const vec3 m=vec3(1.);const vec2 C=vec2(-1.,1.),n=vec2(.16,.5),o=vec2(.5,.5),p=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 q(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,n);vec2 f=u93*e;vec3 c=u93*m;vec2 r=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,o).rgb+vec3(u87,0.,0.),u90,c);float s=mix(texture2D(u42,p).r,0.,u93);a.z+=s;mat3 t=q(a);vec3 u=mix(u152,u91,c);float v=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 w=mat2(h,i,-i,h);b.xy=w*b.xy;float x=mix(u89,1.,u93);vec2 j=u88/r;vec3 k=a0;float y=max(0.,-a0.z-u154)*u155;k.x+=y*sign(a0.x)*(1.-u93);vec3 z=t*(k+u)*v+b;vec2 A=j*x;vec3 B=vec3(g*A,-j)+z*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(B,1.)),vv0=a1;}",
                i: ["u120", "u157"].concat(v, e),
                K: ["a0", "a1"],
                S: [3, 2],
                precision: B.low
            };
            e = ["u145", "u133", "u146"];
            m.s117 = {
                name: "_",
                g: "varying vec3 vv0;varying float vv1;void main(){gl_FragColor=vec4(vv0,vv1);}",
                v: "attribute vec3 a0;uniform mat4 u145,u133,u146;varying vec3 vv0;varying float vv1;void main(){vec4 a=u146*vec4(a0,1.);gl_Position=u145*u133*a,vv0=a.xyz,vv1=1.;}",
                i: e,
                precision: B.high
            };
            m.s118 = {
                name: "_",
                g: "varying vec3 vv0;void main(){gl_FragColor=vec4(normalize(vv0),1.);}",
                v: "attribute vec3 a0,a2;uniform mat4 u145,u133,u146;varying vec3 vv0;varying float vv1;void main(){vec4 a=u146*vec4(a2,0.);gl_Position=u145*u133*u146*vec4(a0,1.),vv0=a.xyz,vv1=a0.y;}",
                i: e,
                K: ["a0", "a2"],
                precision: B.high
            };
            m.s108 = {
                name: "_",
                g: "uniform sampler2D u161;uniform vec3 u162;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;const vec3 i=vec3(1.,1.,1.);void main(){vec3 j=normalize(vv1+u162),c=normalize(vv2),b=texture2D(u161,vv3).xyz;b=normalize(b*255./127.-1.007874*i);vec3 d=vv0.xyz,k=cross(c,d)*vv0.w;mat3 l=mat3(d,k,c);vec3 a=l*b;a=dot(a,j)>0.?vv2:a,gl_FragColor=vec4(a,1.);}",
                v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u145,u133,u146;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;void main(){vec4 b=u146*vec4(a2,0.),a=u146*vec4(a0,1.);gl_Position=u145*u133*a,vv0=a3,vv2=b.xyz,vv3=a1,vv1=a.xyz;}",
                i: ["u161", "u162"].concat(e),
                K: ["a0", "a2", "a1", "a3"],
                precision: B.high
            };
            m.s107 = {
                name: "_",
                g: "uniform sampler2D u1;uniform vec3 u156,u77;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);vec3 f=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,f,u77.x);float c=a.a,g=dot(a.rgb,vec3(.333)),d=1.-u77.y*g;c*=d;float h=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(h),b,vec3(d));vec3 i=u77.z*vec3(.25);b=max(b,i);vec4 j=vec4(b,c);gl_FragColor=j;}",
                v: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u145,u133,u146;varying vec2 vv0;const vec4 f=vec4(0.,0.,5e-4,0.);void main(){gl_Position=u145*u133*u146*vec4(a0,1.)+f,vv0=a1;}",
                i: ["u156"].concat(H, e),
                K: ["a0", "a1"],
                Ka: [{
                    search: "0.0005",
                    replace: ob.ka() ? "0.0005" : "0.0"
                }],
                precision: B.low
            };
            m.s119 = {
                name: "_",
                g: "uniform vec4 u120;uniform float u157;void main(){float b=u157;vec4 a=u120;float c=floor(15.99*b),d=floor(15.99*a.b);a.b=(c+16.*d)/255.,gl_FragColor=a;}",
                v: "attribute vec3 a0;uniform mat4 u145,u133,u146;void main(){gl_Position=u145*u133*u146*vec4(a0,1.);}",
                i: ["u120"].concat(e),
                precision: B.high
            };
            m.s109 = {
                name: "_",
                g: "uniform sampler2D u81;uniform vec4 u120,u82;uniform float u157;varying vec2 vv0;vec2 i(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float c=u157;vec4 a=u120,d=texture2D(u81,vv0);vec2 b=i(d.b,4.);float f=1.-b.x,g=b.y;b=i(d.a,1.);float h=b.x,e=b.y;vec4 k=vec4(d.rg,g,h);float l=f;a=mix(a,k,u82*e),c=mix(c,l,u82.b*e);float m=floor(15.99*c),n=floor(15.99*a.b);a.b=(m+16.*n)/255.,gl_FragColor=a;}",
                v: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u145,u133,u146;varying vec2 vv0;void main(){gl_Position=u145*u133*u146*vec4(a0,1.),vv0=a1;}",
                i: ["u120"].concat(v, e),
                K: ["a0", "a1"],
                S: [3, 2],
                precision: B.high
            }
        }
        function r() {
            for (var e in m)
                n(C, m[e])
        }
        var w = !1
          , H = ["u1", "u77"]
          , v = ["u81", "u82"]
          , x = "u83 u84 u85 u86 u87 u88 u89".split(" ")
          , y = "u90 u91 u92 u93 u94 u95".split(" ")
          , m = {}
          , l = -1
          , E = null
          , L = 0
          , B = {
            high: "highp",
            Oq: "mediump",
            low: "lowp"
        }
          , D = {
            pa: function(e, q) {
                m[e] = q;
                w && n(C, m[e])
            },
            Uq: function(e, q) {
                m[e] = q;
                q.zi = !1;
                n(C, m[e])
            },
            Db: function() {
                return w
            },
            m: function() {
                m.s0 = p();
                m.s75 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u96;uniform float u97;varying vec2 vv0;void main(){vec4 a=texture2D(u1,u96*vv0);gl_FragColor=vec4(pow(a.rgb,u97*vec3(1.)),a.a);}",
                    i: ["u1", "u97", "u96"],
                    precision: B.high
                };
                m.s1 = {
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                    i: ["u1"],
                    precision: B.low
                };
                m.s76 = {
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vec2(-1.,1.)*vv0+vec2(1.,0.));}",
                    i: ["u1"],
                    precision: B.low
                };
                m.s77 = {
                    name: "_",
                    g: "uniform sampler2D u1,u13;uniform float u14;varying vec2 vv0;const vec3 f=vec3(1.);void main(){gl_FragColor=vec4(mix(texture2D(u13,vv0).rgb,texture2D(u1,vv0).rgb,u14*f),1.);}",
                    i: ["u1", "u13", "u14"],
                    precision: B.high
                };
                m.s78 = {
                    name: "_",
                    g: "uniform sampler2D u1,u13;uniform float u14;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){gl_FragColor=mix(texture2D(u13,vv0),texture2D(u1,vv0),u14*f);}",
                    i: ["u1", "u13", "u14"],
                    precision: B.high
                };
                m.s12 = {
                    name: "_",
                    g: "uniform sampler2D u1,u98;uniform vec2 u99;uniform float u100;varying vec2 vv0;const vec4 f=vec4(1.);void main(){vec4 b=texture2D(u98,vv0*u99),c=texture2D(u1,vv0*u99);float a=smoothstep(u100,0.,vv0.y);a+=smoothstep(1.-u100,1.,vv0.y),gl_FragColor=mix(c,b,a*f);}",
                    i: ["u1", "u99", "u98", "u100"],
                    precision: B.high
                };
                m.s80 = {
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);if(a.a<.5)discard;gl_FragColor=a;}",
                    i: ["u1"],
                    precision: B.low
                };
                m.s81 = {
                    name: "_",
                    g: "uniform sampler2D u1,u101;uniform vec2 u15;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u15*f).rgb+texture2D(u1,a+u15*g).rgb+texture2D(u1,a+u15*h).rgb+texture2D(u1,a+u15*i).rgb;gl_FragColor=vec4(b/5.,1.);}",
                    i: ["u1", "u15"],
                    precision: B.low
                };
                m.s82 = {
                    name: "_",
                    g: "uniform sampler2D u1,u101,u42;uniform vec2 u15,u102;varying vec2 vv0;const vec3 k=vec3(1.,1.,1.);const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec3 b=texture2D(u1,a).rgb+texture2D(u1,a+u15*f).rgb+texture2D(u1,a+u15*g).rgb+texture2D(u1,a+u15*h).rgb+texture2D(u1,a+u15*i).rgb;float c=texture2D(u42,vec2(.5,.5)).a,d=u102.x+pow(c,2.)*(u102.y-u102.x);vec3 j=mix(b/5.,texture2D(u101,a).rgb,d);gl_FragColor=vec4(j,1.);}",
                    i: ["u1", "u101", "u15", "u42", "u102"],
                    precision: B.low
                };
                m.s83 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;const vec3 f=vec3(.299,.587,.114);const float m=.007813,n=.125,h=8.;void main(){vec2 x=vv0;vec3 o=texture2D(u1,vv0+vec2(-1.,-1.)*u15).xyz,p=texture2D(u1,vv0+vec2(1.,-1.)*u15).xyz,q=texture2D(u1,vv0+vec2(-1.,1.)*u15).xyz,r=texture2D(u1,vv0+vec2(1.,1.)*u15).xyz,s=texture2D(u1,vv0).xyz;float b=dot(o,f),c=dot(p,f),e=dot(q,f),g=dot(r,f),i=dot(s,f),t=min(i,min(min(b,c),min(e,g))),u=max(i,max(max(b,c),max(e,g)));vec2 a;a.x=-(b+c-(e+g)),a.y=b+e-(c+g);float v=max((b+c+e+g)*(.25*n),m),w=1./(min(abs(a.x),abs(a.y))+v);a=min(vec2(h,h),max(vec2(-h,-h),a*w))*u15;vec3 j=.5*(texture2D(u1,vv0+a*-.166667).rgb+texture2D(u1,vv0+a*.166667).rgb),k=j*.5+.25*(texture2D(u1,vv0+a*-.5).rgb+texture2D(u1,vv0+a*.5).rgb);float l=dot(k,f);gl_FragColor=l<t||l>u?vec4(j,1.):vec4(k,1.);}",
                    i: ["u1", "u15"],
                    precision: B.low
                };
                m.s84 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4);void main(){vec2 a=vv0;vec4 b=texture2D(u1,a)+texture2D(u1,a+u15*f)+texture2D(u1,a+u15*g)+texture2D(u1,a+u15*h)+texture2D(u1,a+u15*i);gl_FragColor=b/5.;}",
                    i: ["u1", "u15"],
                    precision: B.low
                };
                m.RGBEtoRGB = {
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;vec3 f(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=vec4(f(a),1.);}",
                    i: ["u1"],
                    precision: B.high
                };
                m.s13 = {
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(0.);vec4 g(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),h=exp2(c);vec3 i=clamp(b/h,0.,1.);return vec4(i,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0).rgb;gl_FragColor=g(max(a,f));}",
                    i: ["u1"],
                    precision: B.high
                };
                m.s85 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u96;uniform float u97;varying vec2 vv0;const vec3 j=vec3(0.),f=vec3(1.);vec4 g(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),h=exp2(c);vec3 i=clamp(b/h,0.,1.);return vec4(i,(c+128.)/256.);}void main(){vec3 a=texture2D(u1,vv0*u96).rgb,b=pow(a,u97*f);gl_FragColor=g(b);}",
                    i: ["u1", "u97", "u96"],
                    precision: B.high
                };
                m.s86 = {
                    name: "_",
                    g: "uniform sampler2D u103,u104;uniform float u105,u106;varying vec2 vv0;void main(){vec3 a=texture2D(u104,vv0).rgb,b=texture2D(u103,vv0).rgb;gl_FragColor=vec4(b*u106+u105*a,1.);}",
                    i: ["u103", "u104", "u105", "u106"],
                    precision: B.high
                };
                m.s87 = {
                    name: "_",
                    g: "uniform sampler2D u107,u108;uniform float u97;varying vec2 vv0;const int j=8888;const float e=3.141592;const vec2 k=vec2(0.,0.);const vec3 n=vec3(1.,1.,1.),o=vec3(0.,0.,0.);void main(){float p=e*(vv0.x*2.-1.),q=e/2.*(vv0.y*2.-1.),b,c,r,l,m;vec4 d;vec3 f=o;vec2 g=k,a=k;for(int h=0;h<j;h+=1)a.x=float(h),a.y=floor(a.x/64.),d=texture2D(u108,a/64.),b=e*d.r,c=2.*asin(sqrt(.25+d.g*.25)),l=p+c*cos(b),m=q+c*sin(b),g.x=.5+.5*l/e,g.y=.5+m/e,f+=pow(texture2D(u107,g).rgb,u97*n);f/=float(j),gl_FragColor=vec4(f,1.);}",
                    i: ["u107", "u108", "u97"],
                    precision: B.low,
                    Ka: [{
                        search: "8888",
                        replace: c.Vm[yb.X()]
                    }]
                };
                m.s88 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);float b=.031496*texture2D(u1,vv0-3.*u15).a+.110236*texture2D(u1,vv0-2.*u15).a+.220472*texture2D(u1,vv0-u15).a+.275591*a.a+.220472*texture2D(u1,vv0+u15).a+.110236*texture2D(u1,vv0+2.*u15).a+.031496*texture2D(u1,vv0+3.*u15).a;gl_FragColor=vec4(a.rgb,4.*b);}",
                    i: ["u1", "u15"],
                    precision: B.low
                };
                m.s89 = {
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);float b=.3*pow(a.a,2.);gl_FragColor=vec4(a.rgb+b*f,1.);}",
                    i: ["u1"],
                    precision: B.low
                };
                m.s90 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;void main(){vec4 a=.031496*texture2D(u1,vv0-3.*u15)+.110236*texture2D(u1,vv0-2.*u15)+.220472*texture2D(u1,vv0-u15)+.275591*texture2D(u1,vv0)+.220472*texture2D(u1,vv0+u15)+.110236*texture2D(u1,vv0+2.*u15)+.031496*texture2D(u1,vv0+3.*u15);gl_FragColor=a;}",
                    i: ["u1", "u15"],
                    precision: B.low
                };
                m.s91 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0-3.*u15)+texture2D(u1,vv0-2.*u15)+texture2D(u1,vv0-u15)+texture2D(u1,vv0)+texture2D(u1,vv0+u15)+texture2D(u1,vv0+2.*u15)+texture2D(u1,vv0+3.*u15);gl_FragColor=a/7.;}",
                    i: ["u1", "u15"],
                    precision: B.low
                };
                m.s92 = {
                    name: "_",
                    g: "uniform sampler2D u1;varying vec2 vv0;const vec4 g=vec4(0.,0.,0.,0.);const float e=256.;void main(){vec4 b=g;float c=0.;vec2 d;for(float a=0.;a<e;a+=1.)d=vec2((a+.5)/e,vv0.y),b+=texture2D(u1,d),c+=1.;gl_FragColor=b/c;}",
                    i: ["u1"],
                    precision: B.high
                };
                m.s93 = {
                    name: "_",
                    g: "uniform sampler2D u1,u98;varying vec2 vv0;const vec4 h=vec4(1.,1.,1.,1.);const float f=0.,g=.3;void main(){vec4 b=texture2D(u98,vv0),c=texture2D(u1,vv0);float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=mix(c,b,a*h);}",
                    i: ["u1", "u98"],
                    precision: B.high
                };
                m.s94 = {
                    name: "_",
                    g: "uniform sampler2D u1,u98;varying vec2 vv0;const vec3 h=vec3(1.,1.,1.);const float f=0.,g=.3;vec4 i(vec3 d){vec3 b=d/65536.,a=clamp(ceil(log2(b)),-128.,127.);float c=max(max(a.r,a.g),a.b),j=exp2(c);vec3 k=clamp(b/j,0.,1.);return vec4(k,(c+128.)/256.);}void main(){vec3 b=texture2D(u98,vv0).rgb,c=texture2D(u1,vv0).rgb;float a=smoothstep(g,f,vv0.y);a+=smoothstep(1.-g,1.-f,vv0.y),gl_FragColor=i(mix(c,b,a*h));}",
                    i: ["u1", "u98"],
                    precision: B.high
                };
                m.s95 = {
                    name: "_",
                    g: "uniform sampler2D u1,u109,u2,u110;uniform vec4 u111;uniform vec2 u112;uniform float u113,u114,u115,u116;varying vec2 vv0;const vec2 g=vec2(1.,1.),h=vec2(.5,.5);const float e=3.141592;void main(){vec4 d=texture2D(u1,vv0),i=texture2D(u109,vec2(1.-vv0.x,vv0.y));float j=step(texture2D(u110,vec2(.25,.5)).r,1.);vec2 a=vv0*2.-g;float k=texture2D(u2,a*u112*.5+h).r,l=atan(a.x,a.y),m=-(mod(u113,2.*e)-e),b=mod(l-m+e,2.*e)-e,n=smoothstep(0.,u114,b),c=.5+u116*(.5-n);c*=(sign(b)+1.)/2.;vec4 o=i+c*u111*k;gl_FragColor=mix(d,o,j*u115);}",
                    i: "u1 u2 u110 u109 u111 u113 u114 u115 u112 u116".split(" "),
                    precision: B.low
                };
                var e = "u117 u118 u119 u120 u107 u121 u3 u122 u109 u123 u124 u125 u126 u127 u15".split(" ");
                c.ga_ && (m.s96 = {
                    name: "_",
                    g: "uniform sampler2D u117,u118,u119,u120,u107,u121,u128,u109;uniform vec3 u122,u125;uniform vec2 u15;uniform float u3,u129,u124,u126,u123;varying vec2 vv0;const float i=3.141592;const vec3 u=vec3(0.,0.,0.),v=vec3(.299,.587,.114);const float w=2.;vec3 l(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 x(vec3 a){float b=atan(a.x,a.z),c=acos(-a.y);return vec2(.5-.5*b/i,1.-c/i);}vec2 y(vec3 a,float b){vec2 d=vec2(1.,.5)/pow(2.,b),f=vec2(0.,1.-pow(.5,b));float g=atan(a.x,a.z),h=acos(-a.y),c=.5+.5*g/i,j=h/i,k=pow(2.,b)/u123;c=(1.-k)*c;return f+vec2(c,j)*d;}void main(){vec4 c=texture2D(u117,vv0);vec3 j=texture2D(u109,vec2(1.-vv0.x,vv0.y)).rgb;if(c.a<.01){gl_FragColor=vec4(j,0.);return;}float z=c.a;vec3 A=c.rgb,B=A+u122;vec4 b=texture2D(u120,vv0),k=texture2D(u118,vv0);vec3 d=k.rgb;float m=k.a;vec4 n=texture2D(u119,vv0);vec3 C=n.rgb;float o=b.r,D=b.g,p=floor(b.b*255.),f=floor(p/16.),E=(p-16.*f)/16.;f/=16.;float F=b.a;vec2 G=x(-d);vec3 q=(1.-F)*l(texture2D(u121,G)),r=normalize(B),g=u,s=reflect(-r,d);vec2 H=y(s,floor(D*u3));float I=acos(-s.z),J=smoothstep(u124-u126,u124+u126,I);g=mix(l(texture2D(u107,H)),u125,J);float a=o+(E-o)*pow(1.-dot(d,-r),f*16.);a=clamp(a,0.,1.),m*=n.a;float t=1.-u129*texture2D(u128,vv0).r;g*=pow(t,2.),q*=t;vec3 h=C*mix(q,g,a),M=mix(j,h,z*(m*(1.-a)+a));float K=dot(h,v),L=max(0.,(K-1.)/(w-1.));gl_FragColor=vec4(h,L);}",
                    i: e.concat(["u128", "u129"]),
                    precision: B.high
                });
                m.s97 = {
                    name: "_",
                    g: "uniform sampler2D u117,u118,u119,u120,u107,u121,u109;uniform vec3 u122,u125;uniform vec2 u15;uniform float u3,u124,u126,u127,u130,u131,u123,u132;varying vec2 vv0;const float g=3.141592;const vec3 G=vec3(0.),l=vec3(1.),H=vec3(.299,.587,.114);const float I=2.;vec3 q(vec4 a){float b=a.a*256.-128.;vec3 c=a.rgb;return exp2(b)*c*65536.;}vec2 J(vec3 a){float b=atan(a.x,-a.z),c=acos(-a.y);return vec2(.5-.5*b/g,1.-c/g);}vec2 K(vec3 b,float c){float a=pow(2.,c),e=u123/8.;a=min(a,e);vec2 f=vec2(1.,.5)/a,h=vec2(-.5/u123,1.-1./a-.5/u123);float i=atan(b.x,b.z),j=acos(-b.y);vec2 k=vec2(.5+.5*i/g,j/g);return h+k*f;}float m(vec3 a,vec3 b){return abs(acos(dot(a,b)));}float n(vec2 a){float b=texture2D(u117,a).a;return step(.01,b);}vec3 o(vec2 a){return texture2D(u109,vec2(1.-a.x,a.y)).rgb;}void main(){vec4 h=texture2D(u117,vv0);if(h.a<.01)gl_FragColor=vec4(o(vv0),0.);float i=h.a;vec3 L=h.rgb,M=L+u122;vec4 c=texture2D(u120,vv0),r=texture2D(u118,vv0);vec3 a=r.rgb;float s=r.a;vec4 j=texture2D(u119,vv0);vec3 e=j.rgb;if(i>1.){gl_FragColor=vec4(mix(o(vv0),e,j.a),1.);return;}e=pow(e,u130*l);float t=c.r,N=c.g,O=c.a,u=floor(c.b*255.),k=floor(u/16.),P=(u-16.*k)/16.;k/=16.;vec2 v=vv0+vec2(-1.,0.)*u15,w=vv0+vec2(1.,0.)*u15,x=vv0+vec2(0.,1.)*u15,y=vv0+vec2(0.,-1.)*u15;vec3 Q=texture2D(u118,v).rgb,R=texture2D(u118,w).rgb,S=texture2D(u118,x).rgb,T=texture2D(u118,y).rgb;float U=m(a,Q)*n(v),V=m(a,R)*n(w),W=m(a,S)*n(x),X=m(a,T)*n(y),Y=2.*max(max(U,V),max(W,X)),Z=1.2*clamp(Y/g,0.,1.),_=max(N,Z);vec2 aa=J(a);vec3 ba=q(texture2D(u121,aa)),ca=(1.-O)*ba,z=normalize(M),A=G,B=reflect(-z,a);float da=floor(_*u3);vec2 ea=K(B,da);float fa=acos(-B.z),ga_=smoothstep(u124-u126,u124+u126,fa);vec3 ha=q(texture2D(u107,ea));A=mix(ha,u125,ga_*u127);float b=t+(P-t)*pow(1.+dot(a,z),k*15.);b=clamp(b,0.,1.);vec2 C=vv0;vec3 D=refract(vec3(0.,0.,-1.),a,.666667);float ia=smoothstep(.1,.3,length(D.xy)),E=sqrt(u15.y/u15.x),ja=smoothstep(.3,.8,i);C+=ja*D.xy*vec2(1./E,E)*ia*.03,s*=j.a;vec3 ka=e*mix(ca,A,b);float p=i*(s*(1.-b)+b);vec3 f=mix(o(C),pow(ka,l/u130),p);float F=dot(f,H),la=max(0.,(F-1.)/(I-1.));f=mix(F*l,f,mix(1.,u131,p)*l);float ma=mix(la,p,u132);gl_FragColor=vec4(f,ma);}",
                    i: e.concat(["u132", "u130", "u131"]),
                    precision: B.high
                };
                c.ga_ && (m.s98 = {
                    name: "_",
                    g: "uniform sampler2D u117,u118;uniform mat4 u133;uniform vec2 u134,u15,u135;uniform float u136,u137,u138,u139,u140,u141,u142,u143,u129;varying vec2 vv0;const float PI=3.141593,HALFPI=1.570796,N=8888.8;void main(){vec2 uvt=vv0+u135;vec4 pos=texture2D(u117,uvt);if(pos.a<.01){gl_FragColor=vec4(0.,0.,0.,1.);return;}vec3 co0=pos.rgb;float c=cos(u136),s=sin(u136);vec3 no0=texture2D(u118,uvt).rgb;float zv=(u133*vec4(co0,1.)).z;vec3 co;vec2 scale=u134/abs(zv),uv,duv=u15*vec2(c,s)*scale;vec3 dp,dpn;float dzMax=0.,angleMin=0.,angle;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u117,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u142,u143,length(dp)),angleMin=max(angleMin,angle),dzMax=max(dzMax,sin(angle)*length(dp));float angleMinInv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u117,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u142,u143,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMinInv=max(angleMinInv,angle);duv=u15*vec2(s,c)*scale;float angleMin2=0.;for(float i=0.;i<N;i+=1.)uv=uvt+i*duv,co=texture2D(u117,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u142,u143,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2=max(angleMin2,angle);float angleMin2Inv=0.;for(float i=0.;i<N;i+=1.)uv=uvt-i*duv,co=texture2D(u117,uv).rgb,dp=co-co0,dpn=normalize(dp),angle=atan(dot(no0,dpn),length(cross(no0,dpn))),angle*=1.-smoothstep(u142,u143,length(dp)),dzMax=max(dzMax,sin(angle)*length(dp)),angleMin2Inv=max(angleMin2Inv,angle);float omegaMin=PI/4.*(angleMin+angleMinInv)*(angleMin2+angleMin2Inv),dzFactor=clamp(dzMax/u139,u140,1.),ao=dzFactor*clamp(u138*omegaMin*u141,0.,u129);gl_FragColor=vec4(ao,ao,ao,u137);}",
                    i: "u117 u118 u138 u137 u136 u15 u144 u139 u140 u141 u142 u143 u133 u134 u129".split(" "),
                    Ka: [{
                        search: "8888.8",
                        replace: c.Vk[yb.X()].toFixed(1)
                    }],
                    precision: B.low
                },
                m.s99 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;const vec2 f=vec2(-.9,.4),g=vec2(.4,.9),h=vec2(-.4,-.9),i=vec2(.9,-.4),j=vec2(-1.9,.9),k=vec2(.9,1.9),l=vec2(-.9,-1.9),m=vec2(1.9,-.9);void main(){vec2 a=vv0;vec4 b=texture2D(u1,a)+texture2D(u1,a+u15*f)+texture2D(u1,a+u15*g)+texture2D(u1,a+u15*h)+texture2D(u1,a+u15*i);b+=texture2D(u1,a+u15*j)+texture2D(u1,a+u15*k)+texture2D(u1,a+u15*l)+texture2D(u1,a+u15*m),gl_FragColor=b/9.;}",
                    i: ["u1", "u15"],
                    precision: B.low
                });
                m.s100 = {
                    name: "_",
                    g: "varying vec3 vv0;void main(){gl_FragColor=vec4(vv0,1.);}",
                    v: "attribute vec3 a0;uniform mat4 u145,u133,u146;varying vec3 vv0;void main(){vec4 a=u145*u133*u146*vec4(a0,1.);gl_Position=a,vv0=a.xyz/a.w;}",
                    i: ["u145", "u133", "u146"],
                    precision: B.low
                };
                m.s101 = {
                    name: "_",
                    g: "uniform sampler2D u147,u121,u108;uniform mat4 u145,u148;uniform vec2 u149;uniform float u150;varying vec2 vv0;const float n=8888.8,o=9999.9,p=25.,v=50.,w=1.2,e=3.141592;const vec4 x=vec4(0.,0.,0.,0.),A=vec4(1.,1.,1.,1.);const vec2 f=vec2(.5,.5);vec2 y(vec3 a){float b=atan(a.x,a.z),c=acos(a.y);return vec2(.5-.5*b/e,1.-c/e);}void main(){float d,a,q;vec2 z=vec2(vv0.x,1.-vv0.y),b;vec3 r=vec3(u149*(z-f),0.),B=vec3(u148*vec4(r,1.)),g,s;vec4 t=x,h,c,u;vec3 i;int j;for(float k=0.;k<n;k+=1.){b.x=k,b.y=floor(b.x/64.),c=texture2D(u108,b/64.),d=e*c.r,a=2.*asin(sqrt(.25+c.g*.25)),g=vec3(cos(d)*sin(a),sin(d)*sin(a),-cos(a)),q=p+(.5+.5*c.b)*(v-p),j=0;for(float l=0.;l<=o;l+=1.){u=vec4(r+g*q*pow(l/o,w),1.),h=u145*u,i=h.xyz/h.w;if(texture2D(u147,f+f*i.xy).z<i.z){j=1;break;}}if(j==1)continue;s=vec3(u148*vec4(g,0.)),t+=texture2D(u121,y(s));}gl_FragColor=vec4(u150*t.rgb/n,1.);}",
                    i: "u147 u121 u108 u145 u148 u149 u150".split(" "),
                    Ka: [{
                        search: "8888.8",
                        replace: c.Yo[yb.X()].toFixed(1)
                    }, {
                        search: "9999.9",
                        replace: c.Zo[yb.X()].toFixed(1)
                    }],
                    precision: B.low
                };
                m.s102 = {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;void main(){vec4 a=.285714*texture2D(u1,vv0-u15)+.428571*texture2D(u1,vv0)+.285714*texture2D(u1,vv0+u15);gl_FragColor=a;}",
                    i: ["u1", "u15"],
                    precision: B.low
                };
                m.s103 = {
                    name: "_",
                    g: "uniform sampler2D u1,u151;varying vec2 vv0;void main(){gl_FragColor=texture2D(u1,vv0);}",
                    v: "attribute vec3 a0;attribute vec2 a1;uniform mat4 u145,u133;varying vec2 vv0;void main(){vec4 a=u145*u133*vec4(a0,1.);gl_Position=a,vv0=a1;}",
                    i: ["u145", "u133", "u1"],
                    K: ["a0", "a1"],
                    precision: B.low
                };
                if (yb.da()) {
                    e = "u42 u152 u153 u154 u155 u43 u120 u156 u157 u14 u158 u159 u86".split(" ").concat(x, y);
                    yb.Li() || (m.s104 = {
                        name: "_",
                        v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                        g: "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,0.,0.),gl_FragData[2]=vec4(0.,0.,0.,0.),gl_FragData[3]=vec4(0.,0.,0.,0.);}",
                        i: [],
                        precision: B.low,
                        fa: !0
                    });
                    m.s105 = {
                        name: "_",
                        v: "attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}",
                        g: "uniform vec4 color;void main(){gl_FragData[0]=color,gl_FragData[1]=color,gl_FragData[2]=color,gl_FragData[3]=color;}",
                        i: ["color"],
                        fa: !0
                    };
                    m.s106NNGLcolor = {
                        name: "_",
                        g: "uniform vec4 u120,u14;uniform vec3 u156;uniform float u157;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv3),c=u157;vec4 a=u120;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u156,1.),gl_FragData[3]=a;}",
                        v: "attribute vec3 a0,a2;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u158,u159,u154,u155,u71;varying vec3 vv0,vv1;varying float vv2,vv3;const vec2 e=vec2(1.);const vec3 r=vec3(1.);const vec2 F=vec2(-1.,1.),s=vec2(.16,.5),t=vec2(.5,.5),u=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 v(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,s);vec2 f=u93*e;vec3 c=u93*r;vec2 w=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,t).rgb+vec3(u87,0.,0.),u90,c);float x=mix(texture2D(u42,u).r,0.,u93);a.z+=x;mat3 h=v(a);vec3 y=mix(u152,u91,c);float z=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 A=mat2(i,j,-j,i);b.xy=A*b.xy;float B=mix(u89,1.,u93);vec2 k=u88/w;vec3 l=a0;float C=max(0.,-a0.z-u154)*u155;l.x+=C*sign(a0.x)*(1.-u93);vec3 m=h*(l+y)*z+b;vec2 D=k*B;vec3 E=vec3(g*D,-k)+m*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(E,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv2=smoothstep(u158,u159,a0.z),vv0=m,vv3=a0.y;}",
                        i: e,
                        K: ["a0", "a2"],
                        S: [3, 3],
                        fa: !0
                    };
                    m.s106NNGLtexture = {
                        name: "_",
                        g: "uniform sampler2D u1;uniform vec4 u120,u14;uniform vec3 u156,u77;uniform float u157;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float k=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv4),l=u157;vec4 c=u120;float m=floor(15.99*l),n=floor(15.99*c.b);c.b=(m+16.*n)/255.;vec4 a=texture2D(u1,vv2);vec3 o=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,o,u77.x);float d=a.a,p=dot(a.rgb,vec3(.333)),e=1.-u77.y*p;d*=e;float q=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(q),b,vec3(e));vec3 r=u77.z*vec3(.25);b=max(b,r);vec4 s=vec4(b,d);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),k),gl_FragData[2]=s,gl_FragData[3]=c;}",
                        v: "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u158,u159,u154,u155,u71;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.);const vec3 s=vec3(1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,t);vec2 f=u93*e;vec3 c=u93*s;vec2 x=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,u).rgb+vec3(u87,0.,0.),u90,c);float y=mix(texture2D(u42,v).r,0.,u93);a.z+=y;mat3 h=w(a);vec3 z=mix(u152,u91,c);float A=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u89,1.,u93);vec2 k=u88/x;vec3 l=a0;float D=max(0.,-a0.z-u154)*u155;l.x+=D*sign(a0.x)*(1.-u93);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u158,u159,a0.z),vv2=a1,vv0=m,vv4=a0.y;}",
                        i: e.concat(H),
                        K: ["a0", "a2", "a1"],
                        S: [3, 3, 2],
                        fa: !0
                    };
                    m.s106NNGLtextureNormalMap = {
                        name: "_",
                        g: "uniform sampler2D u1,u161;uniform vec4 u120,u14;uniform vec3 u156,u77;uniform float u157;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 o=vec3(1.);void main(){float p=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv5);vec3 B=vec3(0.,0.,-1.),g=normalize(vv2),c=texture2D(u161,vv3).xyz;c=normalize(c*255./127.-1.007874*o);vec3 h=vv0.xyz,q=cross(g,h)*vv0.w;mat3 r=mat3(h,q,g);vec3 s=r*c;float t=u157;vec4 d=u120;float u=floor(15.99*t),v=floor(15.99*d.b);d.b=(u+16.*v)/255.;vec4 a=texture2D(u1,vv3);vec3 w=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,w,u77.x);float i=a.a,x=dot(a.rgb,vec3(.333)),j=1.-u77.y*x;i*=j;float y=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(y),b,vec3(j));vec3 z=u77.z*vec3(.25);b=max(b,z);vec4 A=vec4(b,i);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(s,p),gl_FragData[2]=A,gl_FragData[3]=d;}",
                        v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u158,u159,u154,u155,u71;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.);const vec3 t=vec3(1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,u);vec2 f=u93*e;vec3 c=u93*t;vec2 y=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,v).rgb+vec3(u87,0.,0.),u90,c);float z=mix(texture2D(u42,w).r,0.,u93);a.z+=z;mat3 h=x(a);vec3 A=mix(u152,u91,c);float B=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u89,1.,u93);vec2 k=u88/y;vec3 l=a0;float E=max(0.,-a0.z-u154)*u155;l.x+=E*sign(a0.x)*(1.-u93);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u158,u159,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}",
                        i: e.concat(H, ["u161"]),
                        K: ["a3", "a0", "a2", "a1"],
                        S: [4, 3, 3, 2],
                        fa: !0
                    };
                    m.s106NNGLtextureParamsMap = {
                        name: "_",
                        g: "uniform sampler2D u1,u81;uniform vec4 u120,u14,u82;uniform vec3 u156,u77;uniform float u157;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float p=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv4),e=u157;vec4 c=u120,f=texture2D(u81,vv2);vec2 d=j(f.b,4.);float q=1.-d.x,r=d.y;d=j(f.a,1.);float s=d.x,g=d.y;vec4 t=vec4(f.rg,r,s);float u=q;c=mix(c,t,u82*g),e=mix(e,u,u82.b*g);float v=floor(15.99*e),w=floor(15.99*c.b);c.b=(v+16.*w)/255.;vec4 a=texture2D(u1,vv2);vec3 x=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,x,u77.x);float h=a.a,y=dot(a.rgb,vec3(.333)),k=1.-u77.y*y;h*=k;float z=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(z),b,vec3(k));vec3 A=u77.z*vec3(.25);b=max(b,A);vec4 B=vec4(b,h);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),p),gl_FragData[2]=B,gl_FragData[3]=c;}",
                        v: "attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u158,u159,u154,u155,u71;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;const vec2 e=vec2(1.);const vec3 s=vec3(1.);const vec2 G=vec2(-1.,1.),t=vec2(.16,.5),u=vec2(.5,.5),v=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 w(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,t);vec2 f=u93*e;vec3 c=u93*s;vec2 x=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,u).rgb+vec3(u87,0.,0.),u90,c);float y=mix(texture2D(u42,v).r,0.,u93);a.z+=y;mat3 h=w(a);vec3 z=mix(u152,u91,c);float A=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 B=mat2(i,j,-j,i);b.xy=B*b.xy;float C=mix(u89,1.,u93);vec2 k=u88/x;vec3 l=a0;float D=max(0.,-a0.z-u154)*u155;l.x+=D*sign(a0.x)*(1.-u93);vec3 m=h*(l+z)*A+b;vec2 E=k*C;vec3 F=vec3(g*E,-k)+m*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(F,1.)),vv1=h*a2*vec3(1.,-1.,-1.),vv3=smoothstep(u158,u159,a0.z),vv2=a1,vv0=m,vv4=a0.y;}",
                        i: e.concat(H, v),
                        K: ["a0", "a2", "a1"],
                        S: [3, 3, 2],
                        fa: !0
                    };
                    m.s106NNGLtextureNormalParamsMap = {
                        name: "_",
                        g: "uniform sampler2D u1,u161,u81;uniform vec4 u120,u14,u82;uniform vec3 u156,u77;uniform float u157;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 t=vec3(1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float u=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv5);vec3 K=vec3(0.,0.,-1.),h=normalize(vv2),e=texture2D(u161,vv3).xyz;e=normalize(e*255./127.-1.007874*t);vec3 l=vv0.xyz,v=cross(h,l)*vv0.w;mat3 w=mat3(l,v,h);vec3 x=w*e;float f=u157;vec4 c=u120,g=texture2D(u81,vv3);vec2 d=k(g.b,4.);float y=1.-d.x,z=d.y;d=k(g.a,1.);float A=d.x,m=d.y;vec4 B=vec4(g.rg,z,A);float C=y;c=mix(c,B,u82*m),f=mix(f,C,u82.b*m);float D=floor(15.99*f),E=floor(15.99*c.b);c.b=(D+16.*E)/255.;vec4 a=texture2D(u1,vv3);vec3 F=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,F,u77.x);float n=a.a,G=dot(a.rgb,vec3(.333)),o=1.-u77.y*G;n*=o;float H=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(H),b,vec3(o));vec3 I=u77.z*vec3(.25);b=max(b,I);vec4 J=vec4(b,n);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(x,u),gl_FragData[2]=J,gl_FragData[3]=c;}",
                        v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u160;uniform float u153,u158,u159,u154,u155,u71;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec2 e=vec2(1.);const vec3 t=vec3(1.);const vec2 H=vec2(-1.,1.),u=vec2(.16,.5),v=vec2(.5,.5),w=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 x(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,u);vec2 f=u93*e;vec3 c=u93*t;vec2 y=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,v).rgb+vec3(u87,0.,0.),u90,c);float z=mix(texture2D(u42,w).r,0.,u93);a.z+=z;mat3 h=x(a);vec3 A=mix(u152,u91,c);float B=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float i=cos(a.z),j=sin(a.z);mat2 C=mat2(i,j,-j,i);b.xy=C*b.xy;float D=mix(u89,1.,u93);vec2 k=u88/y;vec3 l=a0;float E=max(0.,-a0.z-u154)*u155;l.x+=E*sign(a0.x)*(1.-u93);vec3 m=h*(l+A)*B+b;vec2 F=k*D;vec3 G=vec3(g*F,-k)+m*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(G,1.)),vv2=h*a2*vec3(1.,-1.,-1.),vv4=smoothstep(u158,u159,a0.z),vv0=a3,vv3=a1,vv1=m,vv5=a0.y;}",
                        i: e.concat(H, ["u161"], v),
                        K: ["a3", "a0", "a2", "a1"],
                        S: [4, 3, 3, 2],
                        fa: !0
                    };
                    e = "u145 u133 u146 u120 u156 u157 u14".split(" ");
                    m.s106color = {
                        name: "_",
                        g: "uniform vec4 u120,u14;uniform vec3 u156;uniform float u157;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){float b=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv3),c=u157;vec4 a=u120;float d=floor(15.99*c),i=floor(15.99*a.b);a.b=(d+16.*i)/255.,gl_FragData[0]=vec4(vv0,vv2),gl_FragData[1]=vec4(normalize(vv1),b),gl_FragData[2]=vec4(u156,1.),gl_FragData[3]=a;}",
                        v: "attribute vec3 a0,a2;uniform mat4 u145,u133,u146;varying vec3 vv0,vv1;varying float vv2,vv3;void main(){vec4 a=u146*vec4(a0,1.),b=u146*vec4(a2,0.);gl_Position=u145*u133*a,vv0=a.xyz,vv1=b.xyz,vv2=1.,vv3=a0.y;}",
                        i: e,
                        K: ["a0", "a2"],
                        fa: !0
                    };
                    m.s106 = {
                        name: "_",
                        g: "uniform sampler2D u1;uniform vec4 u120,u14;uniform vec3 u156,u77;uniform float u157;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){float k=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv4),l=u157;vec4 c=u120;float m=floor(15.99*l),n=floor(15.99*c.b);c.b=(m+16.*n)/255.;vec4 a=texture2D(u1,vv2);vec3 o=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,o,u77.x);float d=a.a,p=dot(a.rgb,vec3(.333)),e=1.-u77.y*p;d*=e;float q=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(q),b,vec3(e));vec3 r=u77.z*vec3(.25);b=max(b,r);vec4 s=vec4(b,d);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),k),gl_FragData[2]=s,gl_FragData[3]=c;}",
                        v: "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u145,u133,u146;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u146*vec4(a0,1.),b=u146*vec4(a2,0.);gl_Position=u145*u133*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                        i: e.concat(H),
                        K: ["a0", "a2", "a1"],
                        fa: !0
                    };
                    var q = ["u161", "u162"];
                    m.s106NormalMap = {
                        name: "_",
                        g: "uniform sampler2D u1,u161;uniform vec4 u120,u14;uniform vec3 u162,u156,u77;uniform float u157;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 o=vec3(1.);void main(){float p=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv5);vec3 B=vec3(0.,0.,-1.),g=normalize(vv2),c=texture2D(u161,vv3).xyz;c=normalize(c*255./127.-1.007874*o);vec3 h=vv0.xyz,q=cross(g,h)*vv0.w;mat3 r=mat3(h,q,g);vec3 s=r*c;float t=u157;vec4 d=u120;float u=floor(15.99*t),v=floor(15.99*d.b);d.b=(u+16.*v)/255.;vec4 a=texture2D(u1,vv3);vec3 w=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,w,u77.x);float i=a.a,x=dot(a.rgb,vec3(.333)),j=1.-u77.y*x;i*=j;float y=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(y),b,vec3(j));vec3 z=u77.z*vec3(.25);b=max(b,z);vec4 A=vec4(b,i);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(s,p),gl_FragData[2]=A,gl_FragData[3]=d;}",
                        v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u145,u133,u146;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u146*vec4(a0,1.),b=u146*vec4(a2,0.);gl_Position=u145*u133*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                        i: e.concat(H, q),
                        K: ["a0", "a2", "a1", "a3"],
                        fa: !0
                    };
                    m.s106ParamsMap = {
                        name: "_",
                        g: "uniform sampler2D u1,u81;uniform vec4 u120,u14,u82;uniform vec3 u156,u77;uniform float u157;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;vec2 j(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float p=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv4),e=u157;vec4 c=u120,f=texture2D(u81,vv2);vec2 d=j(f.b,4.);float q=1.-d.x,r=d.y;d=j(f.a,1.);float s=d.x,g=d.y;vec4 t=vec4(f.rg,r,s);float u=q;c=mix(c,t,u82*g),e=mix(e,u,u82.b*g);float v=floor(15.99*e),w=floor(15.99*c.b);c.b=(v+16.*w)/255.;vec4 a=texture2D(u1,vv2);vec3 x=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,x,u77.x);float h=a.a,y=dot(a.rgb,vec3(.333)),k=1.-u77.y*y;h*=k;float z=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(z),b,vec3(k));vec3 A=u77.z*vec3(.25);b=max(b,A);vec4 B=vec4(b,h);gl_FragData[0]=vec4(vv0,vv3),gl_FragData[1]=vec4(normalize(vv1),p),gl_FragData[2]=B,gl_FragData[3]=c;}",
                        v: "attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u145,u133,u146;varying vec3 vv0,vv1;varying vec2 vv2;varying float vv3,vv4;void main(){vec4 a=u146*vec4(a0,1.),b=u146*vec4(a2,0.);gl_Position=u145*u133*a,vv2=a1,vv0=a.xyz,vv1=b.xyz,vv3=1.,vv4=a0.y;}",
                        i: e.concat(H, v),
                        K: ["a0", "a2", "a1"],
                        fa: !0
                    };
                    m.s106NormalParamsMap = {
                        name: "_",
                        g: "uniform sampler2D u1,u161,u81;uniform vec4 u120,u14,u82;uniform vec3 u162,u156,u77;uniform float u157;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;const vec3 t=vec3(1.);vec2 k(float d,float e){float f=floor(d*255.+.01),a=pow(2.,e),g=256./a,b=f/a,c=floor(b),h=(b-c)*a;return vec2(c/(g-1.),h/(a-1.));}void main(){float u=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv5);vec3 K=vec3(0.,0.,-1.),h=normalize(vv2),e=texture2D(u161,vv3).xyz;e=normalize(e*255./127.-1.007874*t);vec3 l=vv0.xyz,v=cross(h,l)*vv0.w;mat3 w=mat3(l,v,h);vec3 x=w*e;float f=u157;vec4 c=u120,g=texture2D(u81,vv3);vec2 d=k(g.b,4.);float y=1.-d.x,z=d.y;d=k(g.a,1.);float A=d.x,m=d.y;vec4 B=vec4(g.rg,z,A);float C=y;c=mix(c,B,u82*m),f=mix(f,C,u82.b*m);float D=floor(15.99*f),E=floor(15.99*c.b);c.b=(D+16.*E)/255.;vec4 a=texture2D(u1,vv3);vec3 F=mix(u156,a.rgb,a.a),b=mix(a.rgb*u156,F,u77.x);float n=a.a,G=dot(a.rgb,vec3(.333)),o=1.-u77.y*G;n*=o;float H=min(a.b,min(a.r,a.g));b=mix(b-.5*vec3(H),b,vec3(o));vec3 I=u77.z*vec3(.25);b=max(b,I);vec4 J=vec4(b,n);gl_FragData[0]=vec4(vv1,vv4),gl_FragData[1]=vec4(x,u),gl_FragData[2]=J,gl_FragData[3]=c;}",
                        v: "attribute vec4 a3;attribute vec3 a0,a2;attribute vec2 a1;uniform mat4 u145,u133,u146;varying vec4 vv0;varying vec3 vv1,vv2;varying vec2 vv3;varying float vv4,vv5;void main(){vec4 a=u146*vec4(a0,1.),b=u146*vec4(a2,0.);gl_Position=u145*u133*a,vv0=a3,vv3=a1,vv1=a.xyz,vv2=b.xyz,vv4=1.,vv5=a0.y;}",
                        i: e.concat(H, q, v),
                        K: ["a0", "a2", "a1", "a3"],
                        fa: !0
                    }
                } else
                    k();
                r();
                e = [{
                    type: "1i",
                    name: "u1",
                    value: 0
                }];
                D.j("s0", e);
                D.j("s75", e);
                D.j("s1", e);
                D.j("s77", [{
                    type: "1i",
                    name: "u13",
                    value: 1
                }].concat(e));
                D.j("s78", [{
                    type: "1i",
                    name: "u13",
                    value: 1
                }].concat(e));
                D.j("s12", [{
                    type: "1i",
                    name: "u98",
                    value: 1
                }].concat(e));
                D.j("s80", e);
                D.j("s81", e);
                D.j("s82", [{
                    type: "1i",
                    name: "u101",
                    value: 1
                }, {
                    type: "1i",
                    name: "u42",
                    value: 2
                }].concat(e));
                D.j("s83", e);
                D.j("s84", e);
                D.j("s13", e);
                D.j("s85", e);
                D.j("s86", [{
                    type: "1i",
                    name: "u103",
                    value: 0
                }, {
                    type: "1i",
                    name: "u104",
                    value: 1
                }]);
                D.j("s87", [{
                    type: "1i",
                    name: "u107",
                    value: 0
                }, {
                    type: "1i",
                    name: "u108",
                    value: 1
                }]);
                D.j("s88", e);
                D.j("s89", e);
                D.j("s90", e);
                D.j("s91", e);
                D.j("s92", e);
                D.j("s93", [{
                    type: "1i",
                    name: "u98",
                    value: 1
                }].concat(e));
                D.j("s94", [{
                    type: "1i",
                    name: "u98",
                    value: 1
                }].concat(e));
                c.ga_ && (D.j("s98", [{
                    type: "1i",
                    name: "u117",
                    value: 0
                }, {
                    type: "1i",
                    name: "u118",
                    value: 1
                }, {
                    type: "1f",
                    name: "u139",
                    value: c.Jk
                }, {
                    type: "1f",
                    name: "u140",
                    value: c.Kk
                }, {
                    type: "1f",
                    name: "u141",
                    value: c.Wk
                }, {
                    type: "1f",
                    name: "u142",
                    value: c.Nk
                }, {
                    type: "1f",
                    name: "u143",
                    value: c.Ok
                }, {
                    type: "1f",
                    name: "u138",
                    value: 1
                }, {
                    type: "1f",
                    name: "u129",
                    value: 1
                }]),
                D.j("s99", e));
                q = [{
                    type: "1i",
                    name: "u117",
                    value: 0
                }, {
                    type: "1i",
                    name: "u118",
                    value: 1
                }, {
                    type: "1i",
                    name: "u119",
                    value: 2
                }, {
                    type: "1i",
                    name: "u107",
                    value: 3
                }, {
                    type: "1i",
                    name: "u121",
                    value: 4
                }, {
                    type: "1i",
                    name: "u120",
                    value: 6
                }, {
                    type: "1i",
                    name: "u109",
                    value: 7
                }, {
                    type: "1f",
                    name: "u127",
                    value: 0
                }, {
                    type: "1f",
                    name: "u124",
                    value: 0
                }, {
                    type: "1f",
                    name: "u126",
                    value: 0
                }];
                c.ga_ && D.j("s96", q.concat([{
                    type: "1f",
                    name: "u129",
                    value: c.Mk[yb.X()]
                }, {
                    type: "1i",
                    name: "u128",
                    value: 5
                }]));
                D.j("s97", q.concat([{
                    type: "1f",
                    name: "u130",
                    value: c.Wc
                }, {
                    type: "1f",
                    name: "u131",
                    value: c.qg
                }, {
                    type: "1f",
                    name: "u132",
                    value: 0
                }]));
                D.j("s101", [{
                    type: "1i",
                    name: "u147",
                    value: 0
                }, {
                    type: "1i",
                    name: "u121",
                    value: 1
                }, {
                    type: "1i",
                    name: "u108",
                    value: 2
                }, {
                    type: "1f",
                    name: "u150",
                    value: c.Xo
                }]);
                D.j("s102", e);
                D.j("s103", e);
                D.j("s95", [{
                    type: "1i",
                    name: "u2",
                    value: 1
                }, {
                    type: "1i",
                    name: "u110",
                    value: 2
                }, {
                    type: "1i",
                    name: "u109",
                    value: 3
                }, {
                    type: "1f",
                    name: "u115",
                    value: 1
                }, {
                    type: "2f",
                    name: "u112",
                    value: [0, 0]
                }].concat(e));
                yb.da() ? (D.j("s106", e),
                D.j("s106NormalMap", [{
                    type: "1i",
                    name: "u161",
                    value: 1
                }].concat(e)),
                D.j("s106ParamsMap", [{
                    type: "1i",
                    name: "u81",
                    value: 1
                }].concat(e)),
                D.j("s106NormalParamsMap", [{
                    type: "1i",
                    name: "u161",
                    value: 1
                }, {
                    type: "1i",
                    name: "u81",
                    value: 2
                }].concat(e))) : g();
                w = !0
            },
            Ko: function() {
                k();
                r();
                g()
            },
            Gd: function() {
                return E.id
            },
            Id: function() {
                return x
            },
            Jd: function() {
                return y
            },
            set: function(e) {
                mb.Lj(D);
                m[e].set()
            },
            Ib: function(e) {
                return t(e, p())
            },
            oe: function(e) {
                return t(e, {
                    name: "_",
                    g: "void main(){gl_FragColor=vec4(.5,.5,.5,.5);}",
                    i: [],
                    precision: B.high
                })
            },
            No: function(e) {
                return t(e, {
                    name: "_",
                    g: "const vec4 d=vec4(.5,.5,.5,.5);void main(){gl_FragData[0]=d,gl_FragData[1]=d,gl_FragData[2]=d,gl_FragData[3]=d;}",
                    i: [],
                    precision: B.high,
                    fa: !0
                })
            },
            M: function() {
                -1 !== l && E.M()
            },
            re: function() {
                var e = 0;
                E.ya.forEach(function(q, z) {
                    z = E.S[z];
                    C.vertexAttribPointer(q, z, C.FLOAT, !1, E.fh, e);
                    e += 4 * z
                })
            },
            jc: function() {
                D.kc(C)
            },
            kc: function(e) {
                e.vertexAttribPointer(E.ya[0], 2, e.FLOAT, !1, 8, 0)
            },
            Yq: function() {
                C.vertexAttribPointer(E.attributes.a0, 3, C.FLOAT, !1, 12, 0)
            },
            Va: function() {
                C.vertexAttribPointer(E.attributes.a0, 3, C.FLOAT, !1, 32, 0)
            },
            gb: function() {
                C.vertexAttribPointer(E.attributes.a0, 3, C.FLOAT, !1, 24, 0)
            },
            Dj: function() {
                C.vertexAttribPointer(E.attributes.a2, 3, C.FLOAT, !1, 32, 12)
            },
            Ej: function() {
                C.vertexAttribPointer(E.attributes.a2, 3, C.FLOAT, !1, 24, 12)
            },
            Zc: function() {
                C.vertexAttribPointer(E.attributes.a1, 2, C.FLOAT, !1, 32, 24)
            },
            Zq: function() {
                C.vertexAttribPointer(E.attributes.a0, 3, C.FLOAT, !1, 20, 0);
                C.vertexAttribPointer(E.attributes.a1, 2, C.FLOAT, !1, 20, 12)
            },
            yo: function() {
                C.vertexAttribPointer(E.attributes.a0, 3, C.FLOAT, !1, 32, 0);
                C.vertexAttribPointer(E.attributes.a2, 3, C.FLOAT, !1, 32, 12);
                C.vertexAttribPointer(E.attributes.a1, 2, C.FLOAT, !1, 32, 24)
            },
            zo: function() {
                C.vertexAttribPointer(E.attributes.a0, 3, C.FLOAT, !1, 32, 0);
                C.vertexAttribPointer(E.attributes.a2, 3, C.FLOAT, !1, 32, 12)
            },
            Ao: function() {
                C.vertexAttribPointer(E.attributes.a0, 3, C.FLOAT, !1, 24, 0);
                C.vertexAttribPointer(E.attributes.a2, 3, C.FLOAT, !1, 24, 12)
            },
            le: function() {
                C.vertexAttribPointer(E.attributes.a3, 4, C.FLOAT, !1, 16, 0)
            },
            pe: function(e, q) {
                C.uniform1i(E.B[e], q)
            },
            D: function(e, q) {
                C.uniform1f(E.B[e], q)
            },
            O: function(e, q, z) {
                C.uniform2f(E.B[e], q, z)
            },
            Ig: function(e, q) {
                C.uniform2fv(E.B[e], q)
            },
            qe: function(e, q, z, O) {
                C.uniform3f(E.B[e], q, z, O)
            },
            Jg: function(e, q) {
                C.uniform3fv(E.B[e], q)
            },
            Da: function(e, q) {
                C.uniform4fv(E.B[e], q)
            },
            Ro: function(e, q) {
                C.uniformMatrix2fv(E.B[e], !1, q)
            },
            So: function(e, q) {
                C.uniformMatrix3fv(E.B[e], !1, q)
            },
            $c: function(e, q) {
                C.uniformMatrix4fv(E.B[e], !1, q)
            },
            j: function(e, q) {
                D.set(e);
                q.forEach(function(z) {
                    switch (z.type) {
                    case "4f":
                        C.uniform4fv(E.B[z.name], z.value);
                        break;
                    case "3f":
                        C.uniform3fv(E.B[z.name], z.value);
                        break;
                    case "2f":
                        C.uniform2fv(E.B[z.name], z.value);
                        break;
                    case "1f":
                        C.uniform1f(E.B[z.name], z.value);
                        break;
                    case "1i":
                        C.uniform1i(E.B[z.name], z.value);
                        break;
                    case "mat2":
                        C.uniformMatrix2fv(E.B[z.name], !1, z.value);
                        break;
                    case "mat4":
                        C.uniformMatrix4fv(E.B[z.name], !1, z.value)
                    }
                })
            },
            I: function() {
                for (var e in m) {
                    var q = m[e];
                    C.detachShader(q.ra, q.Bf);
                    C.detachShader(q.ra, q.Af);
                    C.deleteShader(q.Bf);
                    C.deleteShader(q.Af);
                    C.deleteProgram(q.ra)
                }
            },
            A: function() {
                C.disableVertexAttribArray(0);
                D.M();
                D.I();
                L = 0;
                w = !1;
                E = null;
                l = -1
            }
        };
        return D
    }()
      , od = function() {
        var a = {}, b = [], d = !1, f = 0, n = 0, t = -1, p = -1, g = 1, k = null, r = !1, w = null, H = !1, v = !1, x = !1, y = !1, m = !1, l = !1, E = -1, L = -1, B = !1, D = !1, e = null, q = null, z = -1, O = -1, G = null, S = -1, Q, I = null, A = null, u = null, N = null, R = null, T = null, aa = null, ka = [{
            type: "1f",
            name: "u93",
            value: 0
        }, {
            type: "1f",
            name: "u158",
            value: 0
        }, {
            type: "1f",
            name: "u159",
            value: 0
        }, {
            type: "1f",
            name: "u88",
            value: 1
        }, {
            type: "1f",
            name: "u84",
            value: 0
        }, {
            type: "1f",
            name: "u85",
            value: 0
        }, {
            type: "1f",
            name: "u95",
            value: 1
        }], Aa = {
            m: function(F, h) {
                a.Lg = F;
                yb.ah();
                md.mf();
                nd.mf(F.Ie);
                t = F.rf;
                p = F.Fp;
                g = F.He;
                E = F.gg;
                L = F.hg;
                var M = [{
                    type: "1f",
                    name: "u88",
                    value: t
                }, {
                    type: "1f",
                    name: "u84",
                    value: E
                }, {
                    type: "1f",
                    name: "u85",
                    value: L
                }, {
                    type: "1f",
                    name: "u89",
                    value: F.qo
                }, {
                    type: "mat4",
                    name: "u83",
                    value: F.Tn
                }, {
                    type: "2f",
                    name: "u43",
                    value: F.qk
                }];
                F.Zg = M;
                var ca = [{
                    type: "3f",
                    name: "u90",
                    value: [0, 0, 0]
                }, {
                    type: "3f",
                    name: "u91",
                    value: F.jh
                }, {
                    type: "3f",
                    name: "u92",
                    value: F.ih
                }, {
                    type: "1f",
                    name: "u93",
                    value: 0
                }, {
                    type: "1f",
                    name: "u94",
                    value: F.Ie
                }, {
                    type: "1f",
                    name: "u95",
                    value: 1
                }];
                F.ek = ca;
                Aa.Rm(F, h);
                d || void 0 !== F.Ja || (F.Ja = [0, 0, 120]);
                D = B = Z.Cf;
                if (!d && B) {
                    h = 1 * yb.zb();
                    var la = 1 * yb.yb()
                      , ja = {
                        isLinear: !0,
                        isPot: !1,
                        width: h,
                        height: la
                    };
                    e = vb.instance(ja);
                    q = vb.instance(ja);
                    z = 1 / h;
                    O = 1 / la
                }
                M = [{
                    type: "1i",
                    name: "u42",
                    value: 1
                }, {
                    type: "3f",
                    name: "u86",
                    value: F.Ja
                }, {
                    type: "1f",
                    name: "u154",
                    value: F.md
                }, {
                    type: "1f",
                    name: "u155",
                    value: F.Qb
                }].concat(M, ca);
                k = F.Sc;
                ca = [{
                    type: "1f",
                    name: "u158",
                    value: k[0]
                }, {
                    type: "1f",
                    name: "u159",
                    value: k[1]
                }];
                yb.da() ? (h = [{
                    type: "1i",
                    name: "u1",
                    value: 0
                }],
                la = [{
                    type: "1i",
                    name: "u161",
                    value: 2
                }],
                X.j("s106NNGLcolor", M.concat(ca)),
                X.j("s106NNGLtexture", [].concat(h, M, ca)),
                X.j("s106NNGLtextureNormalMap", [].concat(h, la, M, ca)),
                X.j("s106NNGLtextureParamsMap", [{
                    type: "1i",
                    name: "u81",
                    value: 2
                }].concat(h, M, ca)),
                X.j("s106NNGLtextureNormalParamsMap", [{
                    type: "1i",
                    name: "u81",
                    value: 3
                }].concat(h, la, M, ca))) : (X.j("s110", M.concat(ca)),
                X.j("s111", [{
                    type: "1i",
                    name: "u1",
                    value: 0
                }].concat(M)),
                X.j("s112", M),
                X.j("s113", M),
                X.j("s114", M.concat([{
                    type: "1i",
                    name: "u161",
                    value: 0
                }])),
                X.j("s115", M),
                X.j("s116", M.concat([{
                    type: "1i",
                    name: "u81",
                    value: 0
                }])));
                X.j("s82", [{
                    type: "2f",
                    name: "u102",
                    value: F.Sg
                }]);
                X.j(c.ga_ ? "s96" : "s97", [{
                    type: "1f",
                    name: "u124",
                    value: F.Pe
                }, {
                    type: "3f",
                    name: "u125",
                    value: F.wg
                }, {
                    type: "1f",
                    name: "u126",
                    value: F.bf
                }, {
                    type: "1f",
                    name: "u127",
                    value: 1
                }, {
                    type: "3f",
                    name: "u122",
                    value: F.Ak
                }]);
                if (Q = F.Yd)
                    G = F.tn,
                    S = F.Zd,
                    X.j("s95", [{
                        type: "4f",
                        name: "u111",
                        value: F.Xd
                    }, {
                        type: "1f",
                        name: "u114",
                        value: F.Xf
                    }, {
                        type: "2f",
                        name: "u112",
                        value: F.sn
                    }, {
                        type: "1f",
                        name: "u116",
                        value: Math.sign(S)
                    }]);
                b.forEach(function(pa) {
                    pa.yj(F)
                });
                d = !0
            },
            hc: function(F) {
                v && Ec.ja.hc(F);
                y && Ec.va.hc(F)
            },
            Rm: function(F, h) {
                void 0 !== Ec.ja && F.mc && yb.da() && (Ec.ja.m(F),
                H = !0,
                h.push(function(M) {
                    Ec.ja.hc(M);
                    v = !x
                }));
                void 0 !== Ec.va && F.ud && (Ec.va.m(F),
                h.push(function(M) {
                    Ec.va.hc(M);
                    y = !0
                }));
                void 0 !== Ec.uc && F.Se && (Ec.uc.m(F),
                l = m = !0);
                void 0 !== Ec.rb && (Ec.rb.m(F),
                w = Ec.rb.Tm({
                    width: F.Jc,
                    height: 2 * F.Jc,
                    depth: 1.5 * F.Jc,
                    Wl: -F.Gf,
                    Za: F.Ef,
                    Al: F.Ff
                }),
                r = !0)
            },
            Po: function(F, h, M, ca) {
                F && (aa = F,
                H && Ec.ja.ic(F),
                y && Ec.va.ic(F),
                m && Ec.uc.ic(F),
                b.forEach(function(la) {
                    la.ic(F)
                }));
                M && (N = M);
                ca && (R = ca)
            },
            Jb: function(F) {
                yb.da() ? (X.j("s106NNGLcolor", F),
                X.j("s106NNGLtexture", F),
                X.j("s106NNGLtextureNormalMap", F),
                X.j("s106NNGLtextureParamsMap", F),
                X.j("s106NNGLtextureNormalParamsMap", F)) : (X.j("s110", F),
                X.j("s111", F),
                X.j("s112", F),
                X.j("s113", F),
                X.j("s114", F),
                X.j("s115", F),
                X.j("s116", F))
            },
            ib: function(F, h, M) {
                var ca = [F[0] + h[0], F[1] + h[1], F[2] + h[2]];
                ca = [ca[0] + M[0], ca[1] + M[1], ca[2] + M[2]];
                a.ie = ca;
                a.Cn = h;
                a.sp = M;
                Aa.Jb([{
                    type: "3f",
                    name: "u152",
                    value: ca
                }]);
                yb.da() && (H && Ec.ja.ib(F, h, M),
                y && Ec.va.ib(ca));
                r && Ec.rb.ib(F, M)
            },
            jb: function(F, h, M) {
                var ca = F * h * M;
                a.Dn = h;
                a.tp = M;
                a.Lm = F;
                Aa.Jb([{
                    type: "1f",
                    name: "u153",
                    value: ca
                }]);
                yb.da() && (H && Ec.ja.jb(F * h, M),
                y && Ec.va.jb(ca));
                r && Ec.rb.jb(F, M)
            },
            sj: function() {
                Aa.ib(a.ie, a.Cn, a.sp);
                Aa.jb(a.Lm, a.Dn, a.tp);
                Aa.Jj(a.rx);
                Aa.m(a.Lg);
                Aa.Fj(a.dl, a.Qb)
            },
            Jj: function(F) {
                a.rx = F;
                Aa.Jb([{
                    type: "1f",
                    name: "u87",
                    value: F
                }]);
                yb.da() && (H && Ec.ja.Gg(F),
                y && Ec.va.Gg(F))
            },
            Fj: function(F, h) {
                a.dl = F;
                a.Qb = h;
                Aa.Jb([{
                    type: "1f",
                    name: "u154",
                    value: F
                }, {
                    type: "1f",
                    name: "u155",
                    value: h
                }])
            },
            Ho: function(F) {
                k = F;
                0 === f && Aa.Jb([{
                    type: "1f",
                    name: "u158",
                    value: k[0]
                }, {
                    type: "1f",
                    name: "u159",
                    value: k[1]
                }])
            },
            hb: function(F) {
                function h() {
                    r && Ec.rb.toggle(!1);
                    Q && X.j("s95", [{
                        type: "1f",
                        name: "u115",
                        value: 0
                    }])
                }
                0 >= F ? (n = 0,
                0 !== f && (f = 0,
                nd.ko(),
                r && Ec.rb.toggle(!0),
                Q && X.j("s95", [{
                    type: "1f",
                    name: "u115",
                    value: 1
                }]))) : 1 <= F ? (n = 1,
                1 !== f && (f = 1,
                nd.Rj(!0)),
                h()) : (n = F,
                2 !== f && (nd.Rj(!1),
                f = 2,
                h()));
                X.j("s97", [{
                    type: "1f",
                    name: "u127",
                    value: 1 - F
                }]);
                var M = 1 - F;
                ka[0].value = n;
                ka[1].value = k[0] * M + -300 * F;
                ka[2].value = k[1] * M + -300 * F;
                ka[3].value = t * M + F * p;
                ka[4].value = E * M;
                ka[5].value = L * M;
                ka[6].value = M + F * g;
                v && Ec.ja.Hg(n, ka);
                y && Ec.va.Hg(n, ka);
                Aa.Jb(ka)
            },
            Tl: function(F) {
                aa.h(1);
                F.forEach(function(h) {
                    h.Ol()
                });
                r && w.W()
            },
            mn: function() {
                return 1 === f
            },
            Qe: function(F) {
                aa.za(F)
            },
            Dk: function(F) {
                b.push(F)
            },
            Qg: function(F) {
                x = !F;
                v = F && H
            },
            Pg: function(F) {
                l = F && m
            },
            Cg: function(F) {
                y && yb.da() && Ec.va.To(F)
            },
            Kb: function(F) {
                yb.da() && (H && Ec.ja.Kb(F),
                y && Ec.va.Kb(F))
            },
            Ql: function(F, h) {
                if (!D)
                    return !1;
                e.J();
                F.h(0);
                X.set("s88");
                X.O("u15", 0, O);
                V.l(!1, !1);
                q.u();
                e.h(0);
                X.O("u15", z, 0);
                V.l(!1, !1);
                X.set("s89");
                h.J();
                q.h(0);
                V.l(!1, !1);
                return !0
            },
            Qj: function(F) {
                D = F && B
            },
            resize: function(F, h, M) {
                F *= M;
                h *= M;
                B && (e.resize(F, h),
                q.resize(F, h),
                z = 1 / F,
                O = 1 / h)
            },
            Ag: function(F, h) {
                var M = F.P()
                  , ca = F.aa()
                  , la = {
                    width: M,
                    height: ca,
                    isPot: !1
                };
                H && (u && u.remove(),
                u = vb.instance(la));
                I && I.remove();
                I = sb.instance({
                    width: M,
                    height: ca
                });
                m || y ? (Ec.uc.Bg(M, ca),
                A && A.remove(),
                A = vb.instance(la)) : A = F;
                H && Ec.ja.Bg(M, ca);
                h && (T && T.remove(),
                T = vb.instance(la))
            },
            Ml: function(F) {
                var h = null;
                switch (f) {
                case 0:
                    h = F;
                    break;
                case 2:
                    I.bind(!1, !0);
                    T.u();
                    X.set("s77");
                    X.D("u14", n);
                    F.h(1);
                    R.h(0);
                    V.l(!0, !0);
                    h = T;
                    break;
                case 1:
                    h = R
                }
                if (!v || 1 === f || !yb.da())
                    return h;
                h.za(0);
                l && Ec.uc.W(h, A);
                I.bind(!1, !l);
                y && (l ? h.h(0) : (A.u(),
                X.set("s1"),
                V.l(!0, !0)),
                Ec.va.W());
                A.h(0);
                N.za(2);
                Ec.ja.W();
                u.u();
                X.set("s1");
                l || y ? A.h(0) : h.h(0);
                V.l(!0, !c.ga_);
                Ec.ja.add();
                return u
            },
            Ek: function(F, h) {
                if (!v)
                    return F;
                N.za(2);
                Ec.ja.W();
                sb.ca();
                X.set("s76");
                h.J();
                Ec.ja.Em().h(0);
                V.l(!0, !0);
                X.set("s1");
                C.enable(C.BLEND);
                C.blendFunc(C.ONE, C.ONE_MINUS_SRC_ALPHA);
                F.h(0);
                V.l(!1, !1);
                C.disable(C.BLEND);
                return h
            },
            Rl: function(F, h) {
                if (!Q)
                    return !1;
                X.set("s95");
                X.D("u113", F * S);
                G.h(1);
                od.Qe(2);
                A ? A.h(3) : h.h(3);
                return !0
            },
            A: function() {
                d = !1;
                n = f = 0;
                p = t = -1;
                g = 1;
                k = null;
                L = E = -1;
                r = !1;
                w = null;
                l = m = y = x = v = H = !1;
                Ec.ja.A();
                Ec.Na.A()
            }
        };
        return Aa
    }()
      , Bc = function() {
        function a() {
            g.forEach(function(h) {
                h.Ul(A)
            })
        }
        function b() {
            g.forEach(function(h) {
                h.yd(A)
            })
        }
        function d() {
            g.forEach(function(h) {
                h.Sl(A)
            })
        }
        function f() {
            g.forEach(function(h) {
                h.zd(A)
            })
        }
        function n() {
            A ? od.Tl(g) : g.forEach(function(h) {
                h.Pl()
            })
        }
        function t() {
            S && clearTimeout(S);
            S = setTimeout(function() {
                e = !1;
                S = null
            }, 16)
        }
        function p(h) {
            h()
        }
        var g = []
          , k = []
          , r = {
            ha: !1,
            position: !1,
            Gb: !1
        }
          , w = []
          , H = []
          , v = null
          , x = 0
          , y = null
          , m = null
          , l = null
          , E = null
          , L = !1
          , B = !1
          , D = !1
          , e = !1
          , q = !1
          , z = !1
          , O = null
          , G = null
          , S = null
          , Q = null
          , I = !1
          , A = !1
          , u = !1
          , N = !1
          , R = !0
          , T = !1
          , aa = !1
          , ka = null
          , Aa = null
          , F = {
            m: function() {
                C.enable(C.DEPTH_TEST);
                C.depthFunc(C.LEQUAL);
                C.clearDepth(1);
                c.yl ? (C.enable(C.CULL_FACE),
                C.frontFace("CCW" === c.zl ? C.CCW : C.CW),
                C.cullFace(C.BACK)) : C.disable(C.CULL_FACE);
                F.Fh();
                var h = {
                    isPot: !1,
                    isLinear: !1,
                    width: yb.zb(),
                    height: yb.yb(),
                    L: 4,
                    isFloat: !1
                };
                y = vb.instance(h);
                h = Object.assign({}, h, {
                    isLinear: !0,
                    width: yb.P(),
                    height: yb.aa()
                });
                m = vb.instance(h);
                l = vb.instance(h);
                c.Ta && (h = Object.assign({}, h, {
                    isLinear: !1
                }),
                E = vb.instance(h));
                z = ob.ka();
                c.Ta || (v = Cc.instance({
                    Pb: c.Pb,
                    zc: c.zc,
                    Ac: c.Ac,
                    yc: c.yc
                }));
                L = !0
            },
            Fh: function() {
                yb.da() ? r = pd.instance({}) : (r.ha = qd.instance({
                    lc: c.Ta ? !1 : "s107",
                    isFloat: !1,
                    Yb: !0,
                    clearColor: [0, 0, 0, 0],
                    L: 4
                }),
                r.position = qd.instance({
                    lc: c.Ta ? !1 : "s117",
                    isFloat: !0,
                    Yb: !0,
                    clearColor: [0, 0, 0, 0],
                    L: 4
                }),
                r.Gb = qd.instance({
                    lc: !1,
                    isFloat: !0,
                    Yb: !0,
                    clearColor: [0, 0, 0, 0],
                    L: 4
                }),
                r.Tc = qd.instance({
                    lc: !1,
                    isFloat: !1,
                    Yb: !0,
                    clearColor: [0, 0, 0, 0],
                    L: 4
                }))
            },
            tm: function() {
                return v
            },
            sa: function(h) {
                v = h
            },
            rr: function() {},
            Kb: function(h) {
                od.Kb(h)
            },
            yj: function(h) {
                od.m(h, w);
                yb.da() || (r.ha.Kj(!1),
                r.position.Kj("s110"));
                A = N = !0
            },
            Wq: function() {
                od.sj()
            },
            Lp: function(h) {
                od.Dk(h)
            },
            vo: function(h, M, ca) {
                od.ib(h, M, ca)
            },
            wo: function(h, M, ca) {
                od.jb(h, M, ca)
            },
            to: function(h, M) {
                od.Fj(h, M)
            },
            uo: function(h) {
                od.Ho(h)
            },
            xo: function(h) {
                od.Jj(h)
            },
            hb: function(h) {
                od.hb(h)
            },
            zj: function(h, M, ca, la) {
                od.Po(h, M, ca, la);
                M && F.Ag(M, la ? !0 : !1);
                u = !0
            },
            Qg: function(h) {
                od.Qg(h)
            },
            Cg: function(h) {
                od.Cg(h)
            },
            Pg: function(h) {
                od.Pg(h)
            },
            Qj: function(h) {
                od.Qj(h)
            },
            Mp: function(h) {
                I && (aa = !0,
                ka && ka.remove(),
                ka = vb.instance({
                    width: Q.P(),
                    height: Q.aa(),
                    isPot: !1
                }),
                Aa = h)
            },
            Ag: function(h, M) {
                Q = "string" === typeof h ? vb.instance({
                    url: h,
                    isFloat: !1
                }) : h;
                A && od.Ag(Q, M);
                I = !0
            },
            Ck: function(h) {
                g.push(h);
                0 !== w.length && (w.forEach(function(M) {
                    M(h)
                }),
                w.splice(0, w.length))
            },
            eo: function(h) {
                h = g.indexOf(h);
                -1 !== h && g.splice(h, 1)
            },
            Np: function(h) {
                k.push(h)
            },
            Tq: function(h) {
                h = k.indexOf(h);
                -1 !== h && k.splice(h, 1)
            },
            ve: function(h) {
                A && (B = h)
            },
            animate: function(h) {
                !c.Ta || A && u ? B && (e || x > c.En && q ? (O && clearTimeout(O),
                ++x,
                window.cancelAnimationFrame(F.animate),
                O = setTimeout(function() {
                    window.requestAnimationFrame(F.animate)
                }, 16)) : (F.nj(h),
                ++x,
                A || B && window.requestAnimationFrame(F.animate))) : setTimeout(F.animate, 100)
            },
            Pp: function(h) {
                H.push(h)
            },
            nj: function(h) {
                if ((!c.Ta || A && u) && L) {
                    H.forEach(p);
                    yb.da() ? r.set() || yb.oa() ? (A || Gc.ho(),
                    n(),
                    r.M(),
                    z && C.depthMask(!1)) : (yb.ip(),
                    F.Fh(),
                    qd.kd(),
                    X.Ko(),
                    c.Ta && od.sj(),
                    C.flush(),
                    window.requestAnimationFrame(F.animate)) : (A && od.Qe(1),
                    r.ha.set(!0, !0, !0),
                    b(),
                    r.ha.M(),
                    z && C.depthMask(!1),
                    r.Tc.set(!1, !z, !1),
                    d(),
                    r.Tc.M(),
                    r.position.set(!0, !z, !1),
                    rd.W(),
                    a(),
                    r.position.M(),
                    r.Gb.set(!1, !z, !1),
                    f(),
                    r.Gb.M());
                    C.disable(C.DEPTH_TEST);
                    z || C.depthMask(!1);
                    c.ga_ && sd.W();
                    var M = F.ci();
                    if (null !== M) {
                        M.h(7);
                        X.set(c.ga_ ? "s96" : "s97");
                        X.O("u15", 1 / yb.zb(), 1 / yb.yb());
                        qd.el();
                        y.J();
                        T ? (C.enable(C.BLEND),
                        C.clearColor(0, 0, 0, 0),
                        C.clear(C.COLOR_BUFFER_BIT),
                        C.blendFunc(C.ONE, C.ONE_MINUS_SRC_ALPHA),
                        X.D("u132", 1)) : C.disable(C.BLEND);
                        A || rd.lf();
                        r.position.h(0);
                        r.Gb.h(1);
                        r.ha.h(2);
                        v.nd(3);
                        r.Tc.h(6);
                        v.od(4);
                        v.Kh();
                        c.ga_ && sd.h(5);
                        V.l(!0, !0);
                        T && X.D("u132", 0);
                        sb.ca();
                        if (T) {
                            C.disable(C.BLEND);
                            var ca = od.Ek(y, m);
                            X.set("s84");
                            l.J();
                            ca.h(0);
                            V.l(!1, !1);
                            m.u();
                            l.h(0);
                            V.l(!1, !1);
                            m.h(0)
                        } else
                            od.Ql(y, m) || (X.set("s1"),
                            m.J(),
                            y.h(0),
                            V.l(!1, !1)),
                            R ? (X.set("s83"),
                            l.J(),
                            m.h(0),
                            V.l(!1, !1),
                            m.u(),
                            l.h(0),
                            N && A ? (X.set("s82"),
                            E.h(1),
                            od.Qe(2),
                            V.l(!1, !1),
                            X.set("s1"),
                            E.J(),
                            m.h(0),
                            V.l(!1, !1)) : (X.set("s81"),
                            V.l(!1, !1),
                            m.h(0))) : m.h(0);
                        sb.ba();
                        C.viewport(0, 0, yb.P(), yb.aa());
                        !T && A && od.Rl(h, M) || X.set("s1");
                        V.l(!1, !1);
                        C.enable(C.DEPTH_TEST);
                        C.depthMask(!0);
                        C.flush()
                    }
                }
            },
            ci: function() {
                if (!I || T)
                    return vb.ri();
                if (!A)
                    return Q;
                if (aa && !od.mn()) {
                    X.set(Aa);
                    sb.ca();
                    ka.ad();
                    ka.u();
                    Q.h(0);
                    var h = ka;
                    V.l(!0, !0)
                } else
                    h = Q;
                return od.Ml(h)
            },
            mr: function() {
                c.Dl || B || (B = !0,
                F.animate(Date.now()),
                D || td.bp(),
                D || nd.mb(!1),
                G && clearTimeout(G),
                c.ga_ && sd.me(),
                G = setTimeout(F.wa, c.al),
                D || yb.Nm(),
                D = !0)
            },
            nr: function() {
                B && (q = B = !1,
                cancelAnimationFrame(F.animate))
            },
            wa: function() {
                q || !D || e || c.Hh || (q = e = !0,
                G && clearTimeout(G),
                S && clearTimeout(S),
                rd.uf().pj(),
                G = setTimeout(function() {
                    yb.dh(c.Kn);
                    c.ga_ && sd.fk();
                    x = 0;
                    t()
                }, 24))
            },
            wake: function() {
                q && D && !e && (e = !0,
                q = !1,
                x = 0,
                rd.uf().pj(),
                G && clearTimeout(G),
                S && clearTimeout(S),
                G = setTimeout(function() {
                    yb.dh(1);
                    c.ga_ && sd.me();
                    t()
                }, 16))
            },
            yq: function() {},
            eq: function() {},
            ue: function(h) {
                N = h
            },
            qr: function(h) {
                R = h
            },
            Sj: function(h) {
                T = h
            },
            vr: function() {
                X.j("s97", [{
                    type: "1f",
                    name: "u130",
                    value: c.Wc
                }, {
                    type: "1f",
                    name: "u131",
                    value: c.qg
                }])
            },
            resize: function(h, M, ca) {
                y.resize(h * ca, M * ca);
                m.resize(h, M);
                l.resize(h, M);
                c.Ta && E.resize(h, M);
                od.resize(h, M, ca);
                h = [{
                    type: "2f",
                    name: "u15",
                    value: [1 / h, 1 / M]
                }];
                X.j("s83", h);
                X.j("s81", h);
                X.j("s84", h)
            },
            I: function() {
                O && clearTimeout(O);
                G && clearTimeout(G);
                S && clearTimeout(S);
                g.concat(k).forEach(function(h) {
                    h.I()
                });
                g.splice(0, g.length);
                k.splice(0, k.length);
                r.ha.remove();
                r.Gb.remove();
                r.Tc.remove();
                r.position.remove();
                y.remove();
                m.remove();
                l.remove();
                E && E.remove();
                e = !0
            },
            A: function() {
                F.I();
                z = q = e = D = B = A = u = e = !1
            }
        };
        return F
    }()
      , Ec = {}
      , yb = function() {
        function a() {
            qd.resize(d * k, f * k);
            y.da() && pd.resize(d * k, f * k);
            Bc.resize(d, f, k);
            c.ga_ && sd.resize(d * k, f * k, k);
            y.ah()
        }
        var b = null
          , d = 0
          , f = 0
          , n = -1
          , t = !1
          , p = {
            xe: !1,
            Tg: !1,
            ck: !1,
            Mg: !1,
            drawBuffers: !1,
            en: !1,
            Ii: !1,
            gn: !1,
            Nf: !1,
            eb: !1
        }
          , g = Object.assign({}, p)
          , k = 1
          , r = !1
          , w = !1
          , H = !1
          , v = !1
          , x = !1
          , y = {
            m: function(m) {
                void 0 !== m.onload && m.onload && (w = m.onload);
                void 0 === m.expand && (m.expand = !1);
                void 0 === m.Od && (m.Od = !1);
                void 0 === m.ta && (m.ta = !1);
                void 0 === m.Vb && (m.Vb = !1);
                void 0 === m.alpha && (m.alpha = !1);
                void 0 === m.preserveDrawingBuffer && (m.preserveDrawingBuffer = !1);
                m.Od && (t = !0);
                m.ta ? b = m.ta : b = document.getElementById(m.sl);
                m.expand && y.expand();
                try {
                    C = m.Vb ? m.Vb.fm() : b.getContext("webgl", {
                        antialias: !1,
                        alpha: m.alpha,
                        depth: !0,
                        premultipliedAlpha: !1,
                        stencil: !1,
                        preserveDrawingBuffer: m.preserveDrawingBuffer
                    });
                    window.ia || (window.ia = C);
                    v = m.Vb ? m.Vb.oa() : !1;
                    H = !v;
                    8 > C.getParameter(C.MAX_TEXTURE_IMAGE_UNITS) && y.vd("too few texture image units");
                    if (!ob.m())
                        return y.vd("invalid config");
                    c.pp && (g.Tg = C.getExtension("EXT_texture_filter_anisotropic"),
                    g.Tg && (g.Ii = !0));
                    c.qp && (g.xe = C.getExtension("WEBGL_compressed_texture_s3tc"),
                    g.xe && void 0 !== g.xe.COMPRESSED_RGBA_S3TC_DXT5_EXT && g.xe.COMPRESSED_RGBA_S3TC_DXT5_EXT && (g.en = !0));
                    H && (g.ck = C.getExtension("OES_element_index_uint") || C.getExtension("MOZ_OES_element_index_uint") || C.getExtension("WEBKIT_OES_element_index_uint"),
                    g.ck && (g.gn = !0));
                    !v && c.rp && (g.Mg = C.getExtension("EXT_sRGB"),
                    g.Mg && (g.Nf = !0));
                    H ? (g.drawBuffers = C.getExtension("WEBGL_draw_buffers"),
                    g.drawBuffers && !c.Gh && (g.eb = !0)) : g.eb = 4 <= C.getParameter(C.MAX_DRAW_BUFFERS);
                    if (g.eb) {
                        var l = y.Fl();
                        g.eb = g.eb && l
                    }
                } catch (E) {
                    return y.vd(E)
                }
                if (null === C || !C)
                    return y.vd("NO_GL");
                m.expand && window.addEventListener("resize", y.expand, !1);
                b.addEventListener("contextmenu", function(E) {
                    E.preventDefault();
                    return !1
                }, !1);
                d = b.width;
                f = b.height;
                y.Jf();
                return !0
            },
            Jf: function() {
                n = t ? 3 : 2;
                ob.ka() || (n = Math.min(n, 1));
                ob.ol() || (n = Math.min(n, 0));
                md.m();
                qd.m();
                for (var m in Ec)
                    Ec[m].Xc();
                X.m();
                rd.m();
                nd.m();
                Bc.m();
                td.m();
                c.ga_ && sd.m();
                y.ah();
                y.Hl();
                r = !0;
                w && w();
                return !0
            },
            Hl: function() {
                if (g.eb) {
                    var m = pd.instance({
                        width: 256,
                        height: 1
                    });
                    m.bind();
                    C.viewport(0, 0, 256, 1);
                    X.set("s105");
                    X.Da("color", [1, 0, 0, 1]);
                    V.l(!0, !0);
                    C.clearColor(0, 0, 0, 0);
                    C.clear(C.COLOR_BUFFER_BIT || C.DEPTH_BUFFER_BIT);
                    sb.ba();
                    X.set("s1");
                    m.Gb.h(0);
                    V.l(!1, !1);
                    m = new Uint8Array(1024);
                    C.readPixels(0, 0, 256, 1, C.RGBA, C.UNSIGNED_BYTE, m);
                    x = 1 >= m[1020]
                }
            },
            Fl: function() {
                var m = pd.instance({
                    width: 1,
                    height: 1
                });
                if (!m.set())
                    return m.remove(),
                    !1;
                X.No(C);
                V.Ub(C);
                C.bindFramebuffer(C.FRAMEBUFFER, null);
                X.Ib(C);
                m.ha.za(0);
                V.Ub(C);
                var l = new Uint8Array(4);
                C.readPixels(0, 0, 1, 1, C.RGBA, C.UNSIGNED_BYTE, l);
                m.remove();
                return 3 < Math.abs(l[0] - 127) ? !1 : !0
            },
            oa: function() {
                return v
            },
            P: function() {
                return d
            },
            aa: function() {
                return f
            },
            zb: function() {
                return k * y.P()
            },
            yb: function() {
                return k * y.aa()
            },
            gm: function() {
                return d / f
            },
            X: function() {
                return n
            },
            Gq: function() {
                return 3 === n
            },
            Db: function() {
                return r
            },
            Li: function() {
                return x
            },
            da: function() {
                return g.eb
            },
            ip: function() {
                g.eb = !1
            },
            Jq: function() {
                return !1
            },
            ql: function() {
                return 0 < y.X()
            },
            Vp: function() {
                return y.da() && 0 < y.X()
            },
            tf: function(m) {
                var l = C
                  , E = "";
                v || (l = g.drawBuffers,
                E = "_WEBGL");
                return [l["COLOR_ATTACHMENT0" + E], l["COLOR_ATTACHMENT1" + E], l["COLOR_ATTACHMENT2" + E], l["COLOR_ATTACHMENT3" + E]].splice(0, m)
            },
            Fd: function(m) {
                return y.tf(4)[m]
            },
            Im: function() {
                return v ? C.SRGB ? C.SRGB : C.RGBA : g.Nf ? g.Mg.SRGB_ALPHA_EXT : C.RGBA
            },
            hn: function() {
                return g.Ii
            },
            lm: function() {
                return g.Tg
            },
            wn: function(m) {
                y.oa() ? C.drawBuffers(y.tf(m)) : g.drawBuffers.drawBuffersWEBGL(y.tf(m))
            },
            expand: function() {
                Bc.wake();
                y.resize(window.innerWidth, window.innerHeight);
                Bc.wa()
            },
            resize: function(m, l) {
                !b || m === d && l === f || (d = m,
                f = l,
                b.width = d,
                b.height = f,
                r && (rd.resize(),
                a()))
            },
            ah: function() {
                var m = [{
                    type: "2f",
                    name: "u15",
                    value: [1 / yb.zb(), 1 / yb.yb()]
                }];
                X.j("s83", m);
                X.j("s81", m)
            },
            dh: function(m) {
                k = m;
                a()
            },
            Oa: function(m, l) {
                b.addEventListener(m, l, !1)
            },
            vd: function() {
                n = -1;
                return !1
            },
            Ah: function() {
                return 0 <= n
            },
            Mq: function() {},
            Xq: function() {},
            kr: function() {
                var m = document.getElementById("loading");
                m && (m.style.display = "block")
            },
            Nm: function() {
                var m = document.getElementById("loading");
                m && (m.style.display = "none")
            },
            I: function() {
                y.Ah() && (vb.dk(),
                Bc.I(),
                V.I(),
                qd.I(),
                c.ga_ && sd.I(),
                Cc.I(),
                td.I(),
                X.I(),
                vb.I(),
                C.flush(),
                C = null)
            },
            A: function() {
                Bc.A();
                od.A();
                X.A();
                pd.A();
                qd.A();
                Object.assign(g, p);
                r = H = !1
            }
        };
        return y
    }()
      , rd = function() {
        var a = !1
          , b = !1
          , d = [];
        return {
            m: function() {},
            instance: function(f) {
                void 0 === f.qj && (f.qj = !0);
                void 0 === f.Le && (f.Le = .1);
                void 0 === f.Ke && (f.Ke = 100);
                void 0 === f.direction && (f.direction = [0, 0, -1]);
                void 0 === f.bi && (f.bi = 45);
                var n = new bd
                  , t = new Wc(50,-50,-400)
                  , p = null;
                n.setPosition(t);
                var g = new Int8Array(20)
                  , k = new Int8Array(20)
                  , r = 0
                  , w = 0
                  , H = 0
                  , v = 0
                  , x = {
                    W: function() {
                        k[X.Gd()] || (X.$c("u133", n.elements),
                        k[X.Gd()] = 1);
                        g[X.Gd()] || (X.$c("u145", p),
                        g[X.Gd()] = 1)
                    },
                    kf: function() {
                        w || (X.$c("u133", n.elements),
                        w = 1);
                        r || (X.O("u134", p[0], p[5]),
                        r = 1)
                    },
                    lf: function() {
                        H || (X.qe("u122", t.x, t.y, t.z),
                        H = 1)
                    },
                    Rb: function() {
                        v || (X.qe("u162", t.x, t.y, t.z),
                        v = 1)
                    },
                    Ch: function() {
                        var y = f.Le
                          , m = f.Ke
                          , l = Math.tan(.5 * f.bi * Math.PI / 180);
                        p = [1 / l, 0, 0, 0, 0, yb.gm() / l, 0, 0, 0, 0, -(m + y) / (m - y), -1, 0, 0, -2 * m * y / (m - y), 0];
                        for (y = 0; 20 > y; ++y)
                            g[y] = 0;
                        r = 0
                    },
                    Io: function(y, m) {
                        t.wj(m[0]).xj(m[1]).z = m[2];
                        n.elements.set(y);
                        for (y = 0; 20 > y; ++y)
                            k[y] = 0;
                        v = H = w = 0
                    },
                    pj: function() {
                        for (var y = v = H = 0; 20 > y; ++y)
                            k[y] = 0
                    }
                };
                x.Ch();
                a = x;
                b = !0;
                f.qj && d.push(x);
                return x
            },
            W: function() {
                b && a.W()
            },
            kf: function() {
                b && a.kf()
            },
            lf: function() {
                b && a.lf()
            },
            Rb: function() {
                b && a.Rb()
            },
            resize: function() {
                d.forEach(function(f) {
                    f.Ch()
                })
            },
            uf: function() {
                return a
            }
        }
    }()
      , qd = function() {
        var a = []
          , b = null;
        return {
            m: function() {
                b = sb.instance({
                    width: yb.zb(),
                    height: yb.yb(),
                    Kc: !yb.da()
                })
            },
            instance: function(d) {
                void 0 === d.width && (d.width = yb.zb());
                void 0 === d.height && (d.height = yb.yb());
                void 0 === d.isFloat && (d.isFloat = !1);
                void 0 === d.Yb && (d.Yb = !1);
                void 0 === d.clearColor && (d.clearColor = [0, 0, 0, 0]);
                void 0 === d.L && (d.L = 4);
                var f = vb.instance({
                    isFloat: d.isFloat && ob.ka(),
                    U: d.isFloat,
                    width: d.width,
                    height: d.height,
                    isPot: !1,
                    isLinear: !1,
                    L: d.L
                })
                  , n = void 0 !== d.lc && d.lc ? !0 : !1
                  , t = d.lc
                  , p = {
                    set: function(g, k, r) {
                        r && b.bind(!1, r);
                        f.u();
                        g && (C.clearColor(d.clearColor[0], d.clearColor[1], d.clearColor[2], d.clearColor[3]),
                        b.Xe());
                        k && b.Bh();
                        n && X.set(t)
                    },
                    Kj: function(g) {
                        n = (t = g) ? !0 : !1
                    },
                    M: function() {
                        f.ze()
                    },
                    h: function(g) {
                        f.h(g)
                    },
                    resize: function(g, k) {
                        f.resize(g, k)
                    },
                    debug: function() {
                        f.debug()
                    },
                    remove: function() {
                        f.remove()
                    }
                };
                d.Yb && a.push(p);
                return p
            },
            resize: function(d, f) {
                b.resize(d, f);
                a.forEach(function(n) {
                    n.resize(d, f)
                })
            },
            el: function() {
                b.uh()
            },
            kd: function() {
                b.kd()
            },
            ad: function() {
                b.ad()
            },
            Yp: function() {
                b.Bh()
            },
            Xp: function() {
                b.Xe()
            },
            Wp: function() {
                b.clear()
            },
            I: function() {
                b.remove()
            },
            A: function() {
                b.remove();
                a.forEach(function(d) {
                    d.remove()
                });
                a.splice(0)
            }
        }
    }()
      , pd = function() {
        var a = [];
        return {
            instance: function(b) {
                void 0 === b.width && (b.width = yb.zb());
                void 0 === b.height && (b.height = yb.yb());
                var d = C.createFramebuffer()
                  , f = b.width
                  , n = b.height
                  , t = !0;
                b = {
                    isFloat: ob.ka(),
                    U: !0,
                    width: f,
                    height: n,
                    isPot: !1,
                    isLinear: !1,
                    L: 4
                };
                var p = vb.instance(b)
                  , g = vb.instance(b)
                  , k = vb.instance(b)
                  , r = vb.instance(b)
                  , w = sb.mm()
                  , H = sb.hi();
                C.bindFramebuffer(w, d);
                var v = C.createRenderbuffer();
                C.bindRenderbuffer(C.RENDERBUFFER, v);
                C.renderbufferStorage(C.RENDERBUFFER, C.DEPTH_COMPONENT16, f, n);
                C.framebufferRenderbuffer(w, C.DEPTH_ATTACHMENT, C.RENDERBUFFER, v);
                C.clearDepth(1);
                C.framebufferTexture2D(w, yb.Fd(0), C.TEXTURE_2D, p.get(), 0);
                C.framebufferTexture2D(w, yb.Fd(1), C.TEXTURE_2D, g.get(), 0);
                C.framebufferTexture2D(w, yb.Fd(2), C.TEXTURE_2D, r.get(), 0);
                C.framebufferTexture2D(w, yb.Fd(3), C.TEXTURE_2D, k.get(), 0);
                yb.wn(4);
                C.bindFramebuffer(w, null);
                sb.reset();
                var x = {
                    position: p,
                    Gb: g,
                    Tc: k,
                    ha: r,
                    bind: function() {
                        C.bindFramebuffer(w, d);
                        sb.reset()
                    },
                    set: function() {
                        t && C.checkFramebufferStatus(H);
                        C.bindFramebuffer(w, d);
                        sb.reset();
                        if (t) {
                            if (C.checkFramebufferStatus(H) !== C.FRAMEBUFFER_COMPLETE)
                                return !1;
                            t = !1
                        }
                        C.viewport(0, 0, f, n);
                        C.clearColor(0, 0, 0, 0);
                        X.Db() && !yb.Li() && (X.set("s104"),
                        V.l(!1, !1));
                        C.clear(C.COLOR_BUFFER_BIT | C.DEPTH_BUFFER_BIT);
                        return !0
                    },
                    M: function() {},
                    resize: function(y, m) {
                        f = y;
                        n = m;
                        p.resize(y, m);
                        g.resize(y, m);
                        r.resize(y, m);
                        k.resize(y, m);
                        C.bindRenderbuffer(C.RENDERBUFFER, v);
                        C.renderbufferStorage(C.RENDERBUFFER, C.DEPTH_COMPONENT16, f, n);
                        C.bindRenderbuffer(C.RENDERBUFFER, null)
                    },
                    remove: function() {
                        p.remove();
                        g.remove();
                        r.remove();
                        k.remove();
                        C.deleteRenderbuffer(v);
                        C.deleteFramebuffer(d);
                        var y = a.indexOf(x);
                        -1 !== y && a.splice(y, 1)
                    }
                };
                a.push(x);
                return x
            },
            resize: function(b, d) {
                a.forEach(function(f) {
                    f.resize(b, d)
                })
            },
            A: function() {
                a.forEach(function(b) {
                    b.remove()
                });
                a.splice(0)
            }
        }
    }()
      , Cc = function() {
        var a = []
          , b = c.sh;
        return {
            instance: function(d) {
                function f() {
                    k ? n() : (r = ud.instance({
                        V: v.tb,
                        cn: b
                    }),
                    g = c.bl[yb.X()],
                    v.Cb = vb.instance({
                        isFloat: ob.ka(),
                        U: !0,
                        isPot: !0,
                        isLinear: !1,
                        isMirrorY: !0,
                        width: g,
                        height: g / 2,
                        L: 3
                    }),
                    v.Pd = vb.instance({
                        isFloat: ob.ka(),
                        U: !0,
                        isPot: !0,
                        isLinear: !1,
                        isMirrorY: !0,
                        width: g,
                        height: g / 2,
                        L: 3
                    }),
                    v.Wd = vb.instance({
                        isFloat: ob.ka(),
                        U: !0,
                        isPot: !0,
                        width: 1,
                        height: g / 2,
                        L: 3
                    }),
                    v.Qd = vb.instance({
                        isFloat: ob.ka() && !b,
                        U: !b,
                        isPot: !1,
                        isLinear: !0,
                        isMirrorY: !0,
                        isMipmap: !1,
                        width: g,
                        height: g / 2,
                        L: b ? 4 : 3
                    }),
                    k = !0,
                    n(),
                    H.forEach(function(x) {
                        x()
                    }),
                    H.splice(0, H.length))
                }
                function n() {
                    if (k) {
                        sb.ca();
                        r.Bo(v.tb);
                        r.bo();
                        v.Cb.J();
                        X.set("s87");
                        v.tb.h(0);
                        X.D("u97", c.Wc);
                        vb.jl(1);
                        V.l(!0, !0);
                        for (var x = c.Um[yb.X()], y = 0; y < x; ++y)
                            v.Pd.u(),
                            X.set("s90"),
                            X.O("u15", 1 / g, 0),
                            v.Cb.h(0),
                            V.l(!1, !1),
                            v.Cb.u(),
                            X.O("u15", 0, 2 / g),
                            v.Pd.h(0),
                            V.l(!1, !1);
                        v.Wd.J();
                        X.set("s92");
                        v.Cb.h(0);
                        V.l(!1, !1);
                        X.set(b ? "s94" : "s93");
                        v.Qd.J();
                        v.Cb.h(0);
                        v.Wd.h(1);
                        V.l(!1, !1);
                        vb.ba(0);
                        vb.ba(1)
                    }
                }
                var t = Object.assign({
                    Pb: null,
                    zc: null,
                    yc: 0,
                    Ac: 0
                }, d)
                  , p = 0
                  , g = 0
                  , k = !1
                  , r = null
                  , w = 0
                  , H = []
                  , v = {
                    Dd: null,
                    qa: null,
                    tb: null,
                    Cb: null,
                    Pd: null,
                    Qd: null,
                    Wd: null
                };
                d = {
                    m: function() {
                        function x() {
                            2 === ++y && (v.tb = vb.instance({
                                isFloat: ob.ka(),
                                U: !0,
                                isPot: !1,
                                isLinear: !0,
                                width: p,
                                height: p / 2,
                                L: 3
                            }),
                            sb.ca(),
                            v.tb.J(),
                            X.set("s86"),
                            X.D("u105", t.Ac),
                            X.D("u106", t.yc),
                            v.Dd.h(0),
                            v.qa.h(1),
                            V.l(!0, !0),
                            f())
                        }
                        var y = 0;
                        p = c.cl[yb.X()];
                        w = Math.log2(p) - 1;
                        t.Pb && (v.Dd = vb.instance({
                            isPot: !1,
                            url: t.Pb,
                            C: x,
                            L: 3,
                            isFlipY: !1
                        }),
                        v.qa = vb.instance({
                            isPot: !1,
                            url: t.zc,
                            C: x,
                            L: 3,
                            isFlipY: !1
                        }))
                    },
                    Dg: function(x) {
                        v.tb = x;
                        f()
                    },
                    nd: function(x) {
                        k && (r.h(x),
                        X.D("u123", r.P()))
                    },
                    od: function(x) {
                        k && v.Qd.h(x)
                    },
                    Kh: function() {
                        X.D("u3", w)
                    },
                    di: function() {
                        return w
                    },
                    P: function() {
                        return p
                    },
                    Cc: function(x) {
                        k ? x() : H.push(x)
                    },
                    I: function() {
                        v.Dd && v.Dd.remove();
                        v.qa && v.qa.remove();
                        v.Cb.remove();
                        v.Wd.remove();
                        v.Pd.remove();
                        r.remove();
                        v.Qd.remove();
                        v.tb.remove()
                    }
                };
                a.push(d);
                d.m();
                return d
            },
            I: function() {
                a.forEach(function(d) {
                    d.I()
                })
            }
        }
    }()
      , Jc = {
        instance: function(a) {
            var b = a.qn
              , d = a.on
              , f = 0
              , n = b.P();
            a = c.sh;
            var t = vb.instance({
                isFloat: ob.ka() && !a,
                U: !a,
                isLinear: !0,
                isMipmap: !1,
                isPot: !1,
                width: n,
                L: a ? 4 : 3,
                isFlipY: !1
            })
              , p = vb.instance({
                isFloat: ob.ka() && !a,
                U: !a,
                isPot: !1,
                isLinear: !0,
                Bq: !0,
                isMipmap: !1,
                width: n,
                height: n / 2,
                L: a ? 4 : 3
            })
              , g = sb.instance({
                width: n,
                height: n
            })
              , k = a ? "s78" : "s77";
            return {
                Oo: function(r) {
                    f = r;
                    X.set(k);
                    C.viewport(0, 0, n, n);
                    g.u();
                    t.u();
                    X.D("u14", f);
                    b.nd(1);
                    d.nd(0);
                    V.l(!0, !0);
                    C.viewport(0, 0, n, n / 2);
                    p.u();
                    b.od(1);
                    d.od(0);
                    V.l(!1, !1);
                    C.flush()
                },
                nd: function(r) {
                    t.h(r)
                },
                od: function(r) {
                    p.h(r)
                },
                Kh: function() {
                    X.D("u3", b.di() * (1 - f) + d.di() * f)
                }
            }
        }
    }
      , nd = function() {
        function a(Q) {
            var I = (e - c.Ve) / (c.xh - c.Ve);
            I = 1 - Math.pow(1 - I, c.Jp);
            e += Q * (1 + I * c.Kp);
            e = Math.min(Math.max(e, c.Ve), c.xh);
            S.mb()
        }
        function b(Q) {
            -1 !== g && (E = l = 0,
            p(),
            a(c.Hp * Q.deltaY / window.innerHeight),
            Q.preventDefault())
        }
        function d() {
            B += l;
            D += E;
            D = Math.min(Math.max(D, c.On), c.Nn);
            S.mb()
        }
        function f(Q) {
            if (0 === g || -1 === g)
                return !1;
            var I = void 0 !== Q.touches && Q.touches.length;
            Q.preventDefault();
            if (2 === g) {
                var A = ld(Q.touches[0].pageX, Q.touches[0].pageY, Q.touches[1].pageX, Q.touches[1].pageY);
                a(-(y - A) * c.Pn);
                y = A
            } else
                A = I ? Q.touches[0].clientX : Q.clientX,
                Q = I ? Q.touches[0].clientY : Q.clientY,
                l = 2 * (A - v) * Math.PI / yb.P(),
                E = 2 * (Q - x) * Math.PI / yb.aa(),
                4 === g ? (G[0] += l * c.cj,
                G[1] -= E * c.cj,
                G[0] = Math.min(Math.max(G[0], -c.fj), c.fj),
                G[1] = Math.min(Math.max(G[1], -c.gj), c.gj),
                S.mb()) : d(),
                v = A,
                x = Q
        }
        function n() {
            0 !== g && -1 !== g && (0 === l && 0 === E || 1 !== g || !z ? Bc.wa() : (p(),
            m = Date.now(),
            q = setInterval(S.nn, L)),
            g = 0)
        }
        function t(Q) {
            if (2 !== g && -1 !== g) {
                E = l = 0;
                p();
                Bc.wake();
                var I = void 0 !== Q.changedTouches && Q.touches.length;
                Q.preventDefault();
                I && 2 === Q.touches.length ? (g = 2,
                y = ld(Q.touches[0].pageX, Q.touches[0].pageY, Q.touches[1].pageX, Q.touches[1].pageY)) : (g = I || 2 !== Q.button ? 1 : 4,
                v = I ? Q.touches[0].clientX : Q.clientX,
                x = I ? Q.touches[0].clientY : Q.clientY);
                return !1
            }
        }
        function p() {
            q && (clearInterval(q),
            q = !1)
        }
        var g = 0
          , k = !1
          , r = !1
          , w = !1
          , H = 1
          , v = 0
          , x = 0
          , y = 0
          , m = 0
          , l = 0
          , E = 0
          , L = 16
          , B = c.Xj
          , D = c.ej
          , e = c.Ue
          , q = !1
          , z = 0
          , O = new Float32Array([0, 0, 0, 0, 0])
          , G = [c.ml, c.nl]
          , S = {
            m: function() {
                z = c.Gk[yb.X()];
                L = c.Ad[yb.X()];
                yb.Oa("mousedown", t);
                yb.Oa("mouseup", n);
                yb.Oa("mouseout", n);
                yb.Oa("mousemove", f);
                yb.Oa("mousemove", f);
                yb.Oa("wheel", b);
                yb.Oa("touchstart", t);
                yb.Oa("touchend", n);
                yb.Oa("touchmove", f)
            },
            mb: function(Q) {
                k ? (r[0] = -D,
                r[1] = B,
                w[1].value = H / c.Ue * e,
                od.Jb(w)) : (O[0] = B,
                O[1] = D,
                O[2] = e,
                O[3] = G[0],
                O[4] = G[1],
                td.ro(O, Q))
            },
            nn: function() {
                if (1E-4 > l && 1E-4 > E || -1 === g)
                    p(),
                    E = l = 0,
                    0 === g && Bc.wa();
                var Q = Date.now()
                  , I = Q - m;
                m = Q;
                Q = Math.pow(z, I / L);
                l *= Q;
                E *= Q;
                d()
            },
            mf: function(Q) {
                k || (k = !0,
                g = -1,
                r = [0, 0, 0],
                w = [{
                    name: "u90",
                    type: "3f",
                    value: r
                }, {
                    name: "u94",
                    type: "1f",
                    value: 1
                }],
                H = Q)
            },
            Rj: function(Q) {
                -1 === g && Q && (g = 0);
                Q || (g = -1)
            },
            ko: function() {
                E = l = 0;
                B = c.Xj;
                D = c.ej;
                e = c.Ue;
                S.mb()
            },
            ar: function(Q) {
                e = Q
            },
            br: function(Q) {
                G[0] = Q[0];
                G[1] = Q[1];
                c.yh = Q[2]
            },
            $q: function(Q, I) {
                B = Q;
                D = I
            }
        };
        return S
    }()
      , Gc = function() {
        var a = {
            s106: !1,
            s106color: !1,
            s106NormalMap: !1,
            s106ParamsMap: !1,
            s106NormalParamsMap: !1
        };
        return {
            instance: function(b) {
                function d(h) {
                    if (!F)
                        return Promise.reject("REMOVED");
                    x.rd && x.rd(h);
                    Q = h.partsNames || [];
                    S.splice(0);
                    S.push({
                        n: 0,
                        offset: 0
                    });
                    z.min.set(Infinity, Infinity, Infinity);
                    z.max.set(-Infinity, -Infinity, -Infinity);
                    var M = h.uvs;
                    M && (M = M.filter(function(Fa) {
                        return Fa
                    }));
                    aa = M && 0 < M.length && 0 < M[0].length ? !0 : !1;
                    var ca = h.normals && h.normals.length ? !0 : !1;
                    "undefined" !== typeof lb && "string" === typeof h.faces && (h.faces = lb(h.faces));
                    "undefined" !== typeof jb && ("string" === typeof h.vertices && (h.vertices = jb(h.vertices)),
                    ca && "string" === typeof h.normals && (h.normals = jb(h.normals)),
                    M && M.length && M.forEach(function(Fa, sa) {
                        "string" === typeof Fa && (M[sa] = jb(Fa))
                    }));
                    var la = h.metadata.faces;
                    var ja = 1 + (aa ? 1 : 0);
                    la = (h.faces.length - la) / (h.metadata.faces * ja);
                    6 !== la && 8 !== la || aa || (++ja,
                    la /= 2);
                    if (4 === la) {
                        la = 6 * ja + 2;
                        for (var pa = 4 * ja + 1, Da = Array(h.metadata.faces * la), xa = 0; xa < h.metadata.faces; ++xa)
                            for (var ra = 0; ra < ja; ++ra)
                                Da[xa * la + 4 * ra] = h.faces[xa * pa + 5 * ra],
                                Da[xa * la + 4 * ra + 1] = h.faces[xa * pa + 5 * ra + 1],
                                Da[xa * la + 4 * ra + 2] = h.faces[xa * pa + 5 * ra + 2],
                                0 === ra && (Da[xa * la + 3] = h.faces[xa * pa + 4]),
                                Da[xa * la + 4 * ra + 3 * ja + 1] = h.faces[xa * pa + 5 * ra],
                                Da[xa * la + 4 * ra + 3 * ja + 2] = h.faces[xa * pa + 5 * ra + 2],
                                Da[xa * la + 4 * ra + 3 * ja + 3] = h.faces[xa * pa + 5 * ra + 3],
                                0 === ra && (Da[xa * la + 3 * ja + 4] = h.faces[xa * pa + 4]);
                        h.faces = Da;
                        h.metadata.faces *= 2
                    }
                    la = h.metadata.vertices;
                    y = Array(la);
                    for (pa = 0; pa < la; ++pa)
                        y[pa] = new Wc(h.vertices[3 * pa],h.vertices[3 * pa + 1],h.vertices[3 * pa + 2]),
                        ad(z, y[pa]);
                    la = h.metadata.faces;
                    m = Array(la);
                    ja = 3 * ja + 1;
                    for (pa = 0; pa < la; ++pa)
                        m[pa] = new dd(h.faces[ja * pa],h.faces[ja * pa + 1],h.faces[ja * pa + 2]),
                        m[pa].cc = h.faces[ja * pa + 3];
                    if (ca)
                        for (ca = h.metadata.normals,
                        l = Array(ca),
                        ja = 0; ja < ca; ++ja)
                            l[ja] = new Wc(h.normals[3 * ja],h.normals[3 * ja + 1],h.normals[3 * ja + 2]);
                    else
                        hd(y, m),
                        l = id(y, m);
                    A = 3 < y.length;
                    F && (F.visible = A);
                    if (aa) {
                        ca = Array(y.length);
                        ja = ["a", "b", "c"];
                        for (la = 0; la < h.metadata.faces; ++la)
                            for (pa = 0; 3 > pa; ++pa)
                                if (Da = h.faces[7 * la + pa],
                                xa = h.faces[7 * la + 1 + pa + 3],
                                "undefined" === typeof ca[Da])
                                    ca[Da] = [[Da, xa]];
                                else if (ca[Da][0][1] !== xa) {
                                    ra = -1;
                                    for (var W = 1; W < ca[Da].length; ++W)
                                        if (ca[Da][W][1] === xa) {
                                            ra = ca[Da][W][0];
                                            break
                                        }
                                    W = -1;
                                    -1 === ra ? (W = y.length,
                                    y.push(y[Da].clone()),
                                    l.push(l[Da].clone()),
                                    ca[Da].push([W, xa]),
                                    ca[W] = [[W, xa]]) : W = ra;
                                    h.faces[7 * la + pa] = W;
                                    m[la][ja[pa]] = W
                                }
                        E = Array(y.length);
                        for (h = 0; h < y.length; ++h)
                            ja = "undefined" === typeof ca[h] ? h : ca[h][0][1],
                            E[h] = new Vc(M[0][2 * ja],M[0][2 * ja + 1])
                    }
                    var U = $c(z);
                    x.qh && (y.forEach(function(Fa) {
                        Fa.x -= U.x;
                        Fa.z -= U.z;
                        Fa.y -= z.min.y
                    }),
                    z.min.x -= U.x,
                    z.max.x -= U.x,
                    z.min.z -= U.z,
                    z.max.z -= U.z,
                    z.max.y -= z.min.y,
                    z.min.y = 0);
                    if (x.rh) {
                        var da = c.$k / Math.max(z.max.x - z.min.x, z.max.y - z.min.y, z.max.z - z.min.z);
                        y.forEach(function(Fa) {
                            Fa.Ha(da)
                        });
                        z.min.Ha(da);
                        z.max.Ha(da)
                    }
                    h = aa ? 8 : 6;
                    ca = new Float32Array(y.length * h);
                    for (ja = 0; ja < y.length; ++ja)
                        ca[h * ja] = y[ja].x,
                        ca[h * ja + 1] = y[ja].y,
                        ca[h * ja + 2] = y[ja].z,
                        ca[h * ja + 3] = l[ja].x,
                        ca[h * ja + 4] = l[ja].y,
                        ca[h * ja + 5] = l[ja].z,
                        aa && (ca[h * ja + 6] = E[ja].x,
                        ca[h * ja + 7] = E[ja].y);
                    m.sort(function(Fa, sa) {
                        return Fa.cc - sa.cc
                    });
                    var Na = new (65536 > 3 * m.length ? Uint16Array : Uint32Array)(3 * m.length)
                      , Wa = 0;
                    m.forEach(function(Fa, sa) {
                        Fa.cc === Wa ? S[Wa].n += 3 : (S.push({
                            n: 3,
                            offset: 3 * sa
                        }),
                        ++Wa);
                        Na[3 * sa] = Fa.a;
                        Na[3 * sa + 1] = Fa.b;
                        Na[3 * sa + 2] = Fa.c
                    });
                    L && L.remove();
                    L = V.instance({
                        la: ca,
                        indices: Na
                    });
                    e = D = !1;
                    T && F.Dh();
                    u = !0;
                    F.jf();
                    return Promise.resolve()
                }
                function f(h) {
                    L.Pa(h.n, h.offset)
                }
                function n(h, M) {
                    R[M] && (X.set(R[M].Cm()),
                    L.bind(!1),
                    aa ? (X.Va(),
                    X.Dj()) : (X.gb(),
                    X.Ej()),
                    R[M].Pc() && (X.Zc(),
                    D.Bc(!1),
                    X.le(),
                    rd.Rb()),
                    R[M].Kl(),
                    R[M].zd(),
                    L.Pa(h.n, h.offset))
                }
                function t(h, M) {
                    R[M] && (X.set(R[M].Dm()),
                    L.bind(!1),
                    aa ? (X.Va(),
                    X.Dj()) : (X.gb(),
                    X.Ej()),
                    R[M].Pc() && (X.Zc(),
                    D.Bc(!1),
                    X.le(),
                    rd.Rb()),
                    F.Gc(),
                    R[M].zd(),
                    L.Pa(h.n, h.offset))
                }
                function p(h, M) {
                    ka && R[M] && (R[M].Ll(),
                    L.Pa(h.n, h.offset))
                }
                function g(h, M) {
                    ka && R[M] && (R[M].Nl(aa),
                    L.Pa(h.n, h.offset))
                }
                function k(h, M) {
                    R[M] && (X.set(R[M].ym()),
                    R[M].Ph(),
                    L.Pa(h.n, h.offset))
                }
                function r(h, M) {
                    R[M] && (X.set(R[M].zm()),
                    F.Gc(),
                    R[M].Ph(),
                    L.Pa(h.n, h.offset))
                }
                function w(h, M) {
                    R[M] && (X.set(R[M].Am()),
                    R[M].Pc() && (D.Bc(!1),
                    X.le(),
                    rd.Rb()),
                    L.bind(!1),
                    R[M].Mh(aa),
                    L.Pa(h.n, h.offset))
                }
                function H(h, M) {
                    if (R[M]) {
                        var ca = R[M].Bm();
                        X.set(ca);
                        R[M].Pc() && (D.Bc(!1),
                        X.le(),
                        rd.Rb(),
                        L.bind(!1));
                        a[ca] || (F.Gc(),
                        L.bind(!1),
                        a[ca] = !0);
                        R[M].Mh(aa);
                        L.Pa(h.n, h.offset)
                    }
                }
                function v(h, M) {
                    return new Promise(function(ca, la) {
                        h ? (h.C = function(ja) {
                            ja ? (R[M] && R[M].I(),
                            R[M] = ja,
                            T = T || ja.Pc(),
                            ca()) : la()
                        }
                        ,
                        md.instance(h)) : la()
                    }
                    )
                }
                if (!yb.Ah())
                    return !1;
                var x = Object.assign({
                    qh: !1,
                    rh: !1,
                    dc: null,
                    url: "",
                    C: null,
                    rd: null,
                    Te: null
                }, b)
                  , y = null
                  , m = null
                  , l = null
                  , E = null
                  , L = null
                  , B = null
                  , D = null
                  , e = !1
                  , q = new bd
                  , z = new Zc
                  , O = []
                  , G = null
                  , S = [{
                    n: 0,
                    offset: 0
                }]
                  , Q = []
                  , I = []
                  , A = !1
                  , u = !1
                  , N = []
                  , R = []
                  , T = !1
                  , aa = !1
                  , ka = !1
                  , Aa = !1
                  , F = {
                    visible: A,
                    xl: function() {
                        return S.length
                    },
                    zf: function() {
                        return Q
                    },
                    Dh: function() {
                        !e && aa && (m = m.filter(function(h) {
                            return null !== h
                        }),
                        B = kd(y, l, E, m),
                        D = V.instance({
                            la: B,
                            indices: !1
                        }),
                        E = l = m = y = B = null,
                        e = !0)
                    },
                    Gc: function() {
                        rd.W();
                        F.Oh()
                    },
                    Oh: function() {
                        X.$c("u146", q.elements)
                    },
                    fq: function() {
                        A && (F.Oh(),
                        L.bind(!1),
                        aa ? X.Va() : X.gb(),
                        L.W())
                    },
                    Ul: function(h) {
                        A && (h || F.Gc(),
                        L.bind(!1),
                        aa ? X.Va() : X.gb(),
                        L.W())
                    },
                    Vl: function() {
                        A && (L.bind(!1),
                        aa ? X.Va() : X.gb(),
                        S.forEach(p))
                    },
                    Lh: function() {
                        A && (L.bind(!1),
                        aa ? X.Va() : X.gb(),
                        I.forEach(f))
                    },
                    Sl: function(h) {
                        ka && A && (L.bind(!1),
                        aa ? X.Va() : X.gb(),
                        h ? S.forEach(k) : S.forEach(r))
                    },
                    yd: function(h) {
                        A && (h || F.Gc(),
                        L.bind(!1),
                        h || (X.Va(),
                        X.Zc()),
                        ka && S.forEach(g))
                    },
                    zd: function(h) {
                        ka && A && (h ? S.forEach(n) : S.forEach(t))
                    },
                    Pl: function() {
                        ka && A && S.forEach(H)
                    },
                    Ol: function() {
                        ka && A && S.forEach(w)
                    },
                    oi: function() {
                        return G
                    },
                    mi: function() {
                        return N
                    },
                    gk: function(h, M, ca) {
                        h = R[h];
                        if (!h)
                            return !1;
                        h.update(M, ca);
                        F.ik();
                        return !0
                    },
                    li: function() {
                        return new Promise(function(h) {
                            F.Cc(function() {
                                h(R.map(function(M) {
                                    return M.Hm()
                                }))
                            })
                        }
                        )
                    },
                    Eg: function(h, M) {
                        N = h;
                        ka = !1;
                        Aa = !0;
                        R.forEach(function(ca) {
                            ca.I()
                        });
                        R = Array(h.length);
                        T = !1;
                        h = h.map(function(ca, la) {
                            return "string" === typeof ca ? gd(-1 === ca.indexOf(".json") ? ca + ".json" : ca).then(function(ja) {
                                ja.name = ca;
                                return v(ja, la, ca)
                            }) : v(ca, la, !1)
                        });
                        Promise.all(h).then(function() {
                            F && (ka = !0,
                            Aa = !1,
                            F.Cc(function() {
                                T && F.Dh();
                                F.ik();
                                Bc.Kb(F);
                                Bc.ve(!0);
                                M && M(F)
                            }, 4),
                            F.jf())
                        })
                    },
                    ik: function() {
                        I.splice(0);
                        S.forEach(function(h, M) {
                            R[M] && R[M].ln() && I.push(h)
                        })
                    },
                    Cc: function(h, M) {
                        u && ka && !Aa ? h(F) : O.push({
                            wb: h,
                            order: M ? M : 0
                        })
                    },
                    jf: function() {
                        u && ka && !Aa && (O.sort(function(h, M) {
                            return 0 > h.order - M.order ? 1 : -1
                        }),
                        O.forEach(function(h) {
                            h.wb(F)
                        }),
                        O.splice(0))
                    },
                    remove: function() {
                        F.I();
                        F = null
                    },
                    I: function() {
                        A = u = !1;
                        L && L.remove();
                        R.forEach(function(h) {
                            h.I()
                        });
                        e && D.remove();
                        S.splice(0)
                    },
                    Fm: function() {
                        return z.size().x
                    },
                    Gm: function() {
                        return z.size().y
                    },
                    wq: function() {
                        return z.size().z
                    },
                    im: function() {
                        return $c(z).x
                    },
                    jm: function() {
                        return $c(z).y
                    },
                    lq: function() {
                        return $c(z).z
                    },
                    sq: function() {
                        return z.min.y
                    },
                    replace: function(h, M, ca) {
                        if (h === G)
                            return M && F && (F.jf(),
                            M(F)),
                            !1;
                        G = h;
                        Bc.ve(!1);
                        fd(h, function(la) {
                            d(la).then(function() {
                                M && M(F)
                            }).catch(function(ja) {
                                ca && ca(ja)
                            })
                        }, ca);
                        return !0
                    }
                };
                x.dc && F.Eg(x.dc, x.Te);
                G = x.url;
                fd(x.url, function(h) {
                    d(h).then(function() {
                        x.C && x.C(F)
                    })
                });
                return F
            },
            ho: function() {
                a.s106 = !1;
                a.s106color = !1;
                a.s106NormalMap = !1;
                a.s106ParamsMap = !1;
                a.s106NormalParamsMap = !1
            }
        }
    }()
      , td = function() {
        var a = null
          , b = !1
          , d = !1
          , f = null
          , n = new Float32Array(16)
          , t = new Float32Array(3)
          , p = {
            data: 0
        }
          , g = {
            m: function() {
                c.Sb ? a = new Worker("js/worker.php") : a = {
                    postMessage: function(k) {
                        p.data = k;
                        vd.In(p)
                    },
                    terminate: function() {}
                };
                a.onmessage = function(k) {
                    switch (k.data[0]) {
                    case 3:
                        for (var r = 0; 16 > r; ++r)
                            n[r] = k.data[r + 1];
                        for (r = 0; 3 > r; ++r)
                            t[r] = k.data[r + 17];
                        rd.uf().Io(n, t);
                        break;
                    case 6:
                        g.Co(),
                        b = !0,
                        nd.mb(!1),
                        c.ga_ && (sd.enable(),
                        sd.me())
                    }
                }
                ;
                f = new Float32Array(6);
                f[0] = 2;
                c.Sb || vd.Eo(a)
            },
            bp: function() {
                c.Ih || (d = !0)
            },
            pr: function() {
                d = !1
            },
            ro: function(k, r) {
                if (r || b && d)
                    f[1] = k[0],
                    f[2] = k[1],
                    f[3] = k[2],
                    f[4] = k[3],
                    f[5] = k[4],
                    a.postMessage(f)
            },
            Co: function() {
                a.postMessage([5, c.yh])
            },
            I: function() {
                c.Sb && a.terminate()
            }
        };
        return g
    }()
      , vd = function() {
        var a = 0
          , b = 0
          , d = 0
          , f = [0, 0]
          , n = new bd
          , t = new Tc
          , p = new Tc
          , g = new Wc
          , k = new Wc
          , r = new Yc
          , w = 0
          , H = new Float32Array(20);
        H[0] = 3;
        var v = null
          , x = {
            data: !1
        }
          , y = {
            m: function() {
                "undefined" === typeof c && (self.Sa = {
                    Sb: !0
                });
                c.Sb && y.rg([6])
            },
            In: function(m) {
                switch (m.data[0]) {
                case 2:
                    y.Fg(m.data);
                    break;
                case 5:
                    w = m.data[1]
                }
            },
            rg: function(m) {
                c.Sb ? postMessage(m) : (x.data = m,
                v.onmessage(x))
            },
            Fg: function(m) {
                a = m[1];
                b = m[2];
                d = m[3];
                f[0] = m[4];
                f[1] = m[5];
                g.set(f[0], f[1], -d);
                r.set(b, a, 0, "XYZ");
                if (!1 === r instanceof Yc)
                    throw Error("JETHREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
                m = Math.cos(r.F / 2);
                var l = Math.cos(r.G / 2)
                  , E = Math.cos(r.H / 2)
                  , L = Math.sin(r.F / 2)
                  , B = Math.sin(r.G / 2)
                  , D = Math.sin(r.H / 2)
                  , e = r.order;
                "XYZ" === e ? (t.F = L * l * E + m * B * D,
                t.G = m * B * E - L * l * D,
                t.H = m * l * D + L * B * E,
                t.T = m * l * E - L * B * D) : "YXZ" === e ? (t.F = L * l * E + m * B * D,
                t.G = m * B * E - L * l * D,
                t.H = m * l * D - L * B * E,
                t.T = m * l * E + L * B * D) : "ZXY" === e ? (t.F = L * l * E - m * B * D,
                t.G = m * B * E + L * l * D,
                t.H = m * l * D + L * B * E,
                t.T = m * l * E - L * B * D) : "ZYX" === e ? (t.F = L * l * E - m * B * D,
                t.G = m * B * E + L * l * D,
                t.H = m * l * D - L * B * E,
                t.T = m * l * E + L * B * D) : "YZX" === e ? (t.F = L * l * E + m * B * D,
                t.G = m * B * E + L * l * D,
                t.H = m * l * D - L * B * E,
                t.T = m * l * E - L * B * D) : "XZY" === e && (t.F = L * l * E - m * B * D,
                t.G = m * B * E - L * l * D,
                t.H = m * l * D + L * B * E,
                t.T = m * l * E + L * B * D);
                g.y -= w;
                m = n.elements;
                D = t.x;
                var q = t.y
                  , z = t.z;
                L = t.w;
                var O = D + D
                  , G = q + q;
                B = z + z;
                l = D * O;
                E = D * G;
                D *= B;
                e = q * G;
                q *= B;
                z *= B;
                O = L * O;
                G = L * G;
                L *= B;
                m[0] = 1 - (e + z);
                m[4] = E - L;
                m[8] = D + G;
                m[1] = E + L;
                m[5] = 1 - (l + z);
                m[9] = q - O;
                m[2] = D - G;
                m[6] = q + O;
                m[10] = 1 - (l + e);
                m[3] = 0;
                m[7] = 0;
                m[11] = 0;
                m[12] = 0;
                m[13] = 0;
                m[14] = 0;
                m[15] = 1;
                n.setPosition(g);
                p.N(t).inverse();
                m = k.N(g);
                q = m.x;
                O = m.y;
                z = m.z;
                l = p.x;
                E = p.y;
                L = p.z;
                B = p.w;
                D = B * q + E * z - L * O;
                e = B * O + L * q - l * z;
                G = B * z + l * O - E * q;
                q = -l * q - E * O - L * z;
                m.x = D * B + q * -l + e * -L - G * -E;
                m.y = e * B + q * -E + G * -l - D * -L;
                m.z = G * B + q * -L + D * -E - e * -l;
                for (m = 1; 17 > m; ++m)
                    H[m] = n.elements[m - 1];
                H[17] = k.x;
                H[18] = k.y;
                H[19] = k.z;
                y.rg(H)
            },
            Eo: function(m) {
                v = m;
                y.rg([6])
            }
        };
        return y
    }();
    vd.m();
    var md = function() {
        function a(p) {
            var g = p.split(":").shift();
            return "data" === g || "blob" === g ? p : ("undefined" !== typeof Z && Z.ea ? Z : c).ea + c.Vi + p
        }
        function b(p, g) {
            return Math.min(g + p + g * p, 1)
        }
        var d = !1
          , f = null
          , n = 1
          , t = {
            diffuseTexture: null,
            normalTexture: null,
            paramsTexture: null,
            isDisableColorTexture: !1,
            colorTextureUsage: 0,
            metalness: .5,
            roughness: .5,
            fresnelMin: 0,
            fresnelMax: 1,
            fresnelPow: 5,
            alpha: 1,
            whiteToAlpha: 0,
            diffuseColor: [255, 255, 255],
            paramsMapMask: [0, 0, 0, 0],
            C: null
        };
        return {
            m: function() {
                f = vb.instance({
                    width: 1,
                    height: 1,
                    isMipmap: !1,
                    L: 4,
                    array: new Uint8Array([255, 255, 255, 255]),
                    Nf: !1
                })
            },
            mf: function() {
                d = !0;
                n = 2
            },
            instance: function(p) {
                var g, k;
                function r() {
                    "number" === typeof l.alpha ? (y[0] = l.alpha,
                    y[1] = 0,
                    y[2] = 0,
                    y[3] = 0) : (y[0] = l.alpha[0],
                    y[1] = l.alpha[1] - l.alpha[0],
                    y[2] = l.alpha[2],
                    y[3] = l.alpha[3]);
                    var A = 1 <= l.fresnelPow ? l.fresnelMin : l.fresnelMax;
                    m[0] = b(y[0], A);
                    m[1] = b(y[1], A);
                    m[2] = y[2];
                    m[3] = y[3];
                    e = {
                        dj: l.fresnelMax,
                        Ri: [l.fresnelMin, l.roughness, l.fresnelPow / 15, l.metalness],
                        Ui: l.paramsMapMask
                    };
                    E = [l.diffuseColor[0] / 255, l.diffuseColor[1] / 255, l.diffuseColor[2] / 255]
                }
                function w() {
                    return new Promise(function(A) {
                        (g = l.normalTexture && yb.ql() ? !0 : !1) && !B.Ia ? B.Ia = vb.instance({
                            url: a(l.normalTexture),
                            isLinear: !0,
                            isMipmap: !0,
                            isAnisotropicFiltering: !1,
                            isPot: !0,
                            L: 3,
                            C: A
                        }) : A()
                    }
                    )
                }
                function H() {
                    return new Promise(function(A) {
                        (k = l.diffuseTexture && "" !== l.diffuseTexture ? !0 : !1) && !B.ha ? (B.ha = vb.instance({
                            url: a(l.diffuseTexture),
                            isMipmap: !0,
                            isLinear: !0,
                            isPot: !0,
                            isAnisotropicFiltering: !0,
                            isSrgb: !1,
                            isMirrorY: !1,
                            isMirrorX: !1,
                            L: 4,
                            C: A
                        }),
                        L = "s111") : (B.ha || (L = "s112",
                        B.ha = f),
                        A())
                    }
                    )
                }
                function v() {
                    return new Promise(function(A) {
                        (D = l.paramsTexture ? !0 : !1) && !B.fb ? l.paramsTexture === l.diffuseTexture ? (B.fb = B.ha,
                        A()) : B.fb = vb.instance({
                            url: a(l.paramsTexture),
                            isMipmap: !0,
                            isLinear: !0,
                            isPot: !0,
                            isAnisotropicFiltering: !1,
                            isSrgb: !1,
                            isMirrorY: !1,
                            isMirrorX: !1,
                            L: 4,
                            C: A
                        }) : A()
                    }
                    )
                }
                function x(A, u) {
                    r();
                    Promise.all([w(), H(), v()]).then(function() {
                        g || D || k ? g || D ? g && !D ? (q = "s106NormalMap",
                        z = "s106NNGLtextureNormalMap") : !g && D ? (q = "s106ParamsMap",
                        z = "s106NNGLtextureParamsMap") : (q = "s106NormalParamsMap",
                        z = "s106NNGLtextureNormalParamsMap") : (q = "s106",
                        z = "s106NNGLtexture") : (q = "s106color",
                        z = "s106NNGLcolor");
                        O = g ? "s114" : "s113";
                        G = g ? "s108" : "s118";
                        S = D ? "s116" : "s115";
                        Q = D ? "s109" : "s119";
                        u && l.C && setTimeout(l.C.bind(null, A), 1)
                    })
                }
                var y = [1, 0, 0, 0]
                  , m = [0, 0, 0, 0]
                  , l = Object.assign({}, t, p)
                  , E = null
                  , L = null
                  , B = {
                    ha: null,
                    Ia: null,
                    fb: null
                };
                var D = g = k = !1;
                var e = null
                  , q = null
                  , z = null
                  , O = null
                  , G = null
                  , S = null
                  , Q = null
                  , I = {
                    update: function(A, u) {
                        void 0 === u && (u = !0);
                        Object.assign(l, A);
                        u ? (I.I(),
                        x(I, !1)) : r()
                    },
                    Pc: function() {
                        return g
                    },
                    ln: function() {
                        return .99 > y[0]
                    },
                    Hm: function() {
                        return l
                    },
                    Dm: function() {
                        return G
                    },
                    Cm: function() {
                        return O
                    },
                    zm: function() {
                        return Q
                    },
                    ym: function() {
                        return S
                    },
                    Bm: function() {
                        return q
                    },
                    Am: function() {
                        return z
                    },
                    zd: function() {
                        g && B.Ia.h(0)
                    },
                    Nl: function(A) {
                        d && X.set(L);
                        A ? X.Va() : X.gb();
                        k && X.Zc();
                        I.yd()
                    },
                    yd: function() {
                        k && (X.qe("u77", l.colorTextureUsage, l.whiteToAlpha, l.fresnelMin),
                        (l.isDisableColorTexture ? f : B.ha).h(0));
                        X.Jg("u156", E)
                    },
                    Ph: function() {
                        D && (B.fb.h(0),
                        X.Da("u82", e.Ui),
                        X.Zc());
                        X.Da("u120", e.Ri);
                        X.D("u157", e.dj)
                    },
                    Mh: function(A) {
                        D && !g ? B.fb.h(n) : g && (k || f.h(0),
                        B.Ia.h(n),
                        D && B.fb.h(n + 1));
                        D && X.Da("u82", e.Ui);
                        k || g ? X.yo() : A ? X.zo() : X.Ao();
                        I.yd();
                        X.Da("u14", y);
                        X.Da("u120", e.Ri);
                        X.D("u157", e.dj)
                    },
                    Kl: function() {
                        X.Da("u14", y)
                    },
                    Ll: function() {
                        X.Da("u14", m)
                    },
                    I: function() {
                        k && B.ha.remove();
                        g && B.Ia.remove();
                        D && l.paramsTexture !== l.diffuseTexture && B.fb.remove();
                        Object.assign(B, {
                            ha: null,
                            Ia: null,
                            fb: null
                        })
                    }
                };
                x(I, !0);
                return I
            }
        }
    }()
      , sd = function() {
        var a = 0
          , b = 0
          , d = 0
          , f = 0
          , n = 0
          , t = 0
          , p = c.Yk
          , g = c.Xk
          , k = c.Zk
          , r = 0
          , w = 0
          , H = null
          , v = null
          , x = 0
          , y = 0
          , m = 0
          , l = 0
          , E = 0
          , L = null
          , B = 0
          , D = 0
          , e = 0
          , q = Date.now()
          , z = null
          , O = !1
          , G = !1
          , S = !1
          , Q = 1
          , I = !1
          , A = {
            m: function() {
                a = c.Tk[yb.X()];
                b = c.Sk[yb.X()];
                d = c.Rk[yb.X()];
                D = c.Uk[yb.X()];
                f = c.Lk[yb.X()];
                n = c.Pk[yb.X()];
                m = c.Qk[yb.X()];
                l = yb.P();
                E = yb.aa();
                r = Math.round(l * a);
                w = Math.round(E * a);
                v = sb.instance({
                    width: r,
                    height: w,
                    Kc: !1
                });
                H = vb.instance({
                    width: r,
                    height: w,
                    isPot: !1,
                    isLinear: !0
                });
                L = vb.instance({
                    width: r,
                    height: w,
                    isPot: !1,
                    isLinear: !0,
                    L: 1
                });
                O = !0
            },
            resize: function(u, N, R) {
                Q = R;
                l = u;
                E = N;
                r = Math.round(u * a);
                w = Math.round(N * a);
                v.resize(r, w);
                G = !0
            },
            W: function() {
                var u = Math.exp(-(Date.now() - q) / D);
                S ? B = e + (1 - u) * (1 - e) : B = e * u;
                x = b + B * (d - b);
                y = f + (1 - B) * (1 - f);
                t = n + (1 - B) * (1 - n);
                vb.ba(5);
                if (G && O)
                    vb.ba(6),
                    L.resize(r, w),
                    X.set("s0"),
                    X.pe("u1", 6),
                    v.bind(!1, !0),
                    L.u(),
                    v.Xe(),
                    H.h(6),
                    V.l(!0, !0),
                    H.resize(r, w),
                    H.u(),
                    L.h(6),
                    V.l(!1, !1),
                    X.pe("u1", 0),
                    G = !1;
                else {
                    C.enable(C.BLEND);
                    C.blendFunc(C.CONSTANT_ALPHA, C.ONE_MINUS_SRC_ALPHA);
                    u = x / m;
                    C.blendColor(u, u, u, u);
                    C.colorMask(!0, !1, !1, !0);
                    X.set("s98");
                    rd.kf();
                    X.D("u137", x);
                    D && (X.D("u138", y),
                    X.D("u129", t));
                    var N = Q * (p + Math.pow(Math.random(), k) * (g - p));
                    X.O("u15", N / l, N / E);
                    v.uh();
                    v.ad();
                    H.u();
                    N = 2 * Math.PI * Math.random();
                    for (var R = !0, T = 0; T < m; ++T)
                        1 === T && (C.blendFunc(C.SRC_ALPHA, C.ONE),
                        X.D("u137", u)),
                        X.D("u136", N + T / m * (Math.PI / 2)),
                        X.O("u135", (Math.random() - .5) / l, (Math.random() - .5) / E),
                        V.l(R, R),
                        R = !1;
                    C.disable(C.BLEND);
                    X.set("s99");
                    X.O("u15", 1 / r, 1 / w);
                    L.u();
                    H.h(7);
                    V.l(!1, !1);
                    C.colorMask(!0, !0, !0, !0)
                }
            },
            h: function(u) {
                L.h(u)
            },
            enable: function() {
                I = !0
            },
            Rn: function() {
                if (S || !I)
                    return !1;
                z && clearTimeout(z);
                A.me();
                z = setTimeout(A.fk, 400)
            },
            me: function() {
                z && (clearTimeout(z),
                z = !1);
                !S && I && (window.Ba.disable(),
                S = !0,
                q = Date.now(),
                e = B)
            },
            fk: function() {
                S && I && (z && (clearTimeout(z),
                z = null),
                window.Ba.enable(),
                S = !1,
                q = Date.now(),
                e = B)
            },
            I: function() {
                H.remove();
                L.remove();
                v.remove()
            }
        };
        A.Rn();
        return A
    }()
      , ud = {
        instance: function(a) {
            var b = a.V.P()
              , d = a.cn ? !0 : !1
              , f = d ? "s85" : "s75"
              , n = a.V
              , t = a.V.jn() && ob.ka()
              , p = vb.instance({
                isFloat: t && !d,
                isLinear: !0,
                isMipmap: !1,
                isPot: !0,
                width: b,
                height: b,
                L: d ? 4 : 3
            })
              , g = vb.instance({
                isFloat: t,
                isLinear: !0,
                isPot: !0,
                width: 1,
                height: b / 2,
                L: 3
            });
            d = Math.round(Math.log(b) / Math.log(2));
            for (var k = [], r = 0, w = 0; w <= d; ++w) {
                var H = Math.pow(2, d - w)
                  , v = H / 2;
                if (4 > v)
                    break;
                k.push({
                    up: b / H,
                    Y: H,
                    cb: v,
                    Ip: r,
                    V: 0 === w ? a.V : vb.instance({
                        isFloat: t,
                        isPot: !0,
                        isLinear: !0,
                        width: H,
                        height: v
                    })
                });
                r += v;
                if (0 !== r % 1)
                    break
            }
            p.Bo = function(x) {
                n = x;
                k[0].V = x
            }
            ;
            p.bo = function() {
                g.J();
                X.set("s92");
                n.h(0);
                V.l(!0, !0);
                X.set("s12");
                g.h(1);
                var x = n;
                k.forEach(function(y, m) {
                    0 !== m && (y.V.J(),
                    x.h(0),
                    vb.Go(),
                    X.O("u99", 1, 1),
                    X.D("u100", Math.min(6 / y.cb, .5)),
                    V.l(!1, !1),
                    x = y.V)
                });
                X.set(f);
                X.D("u97", c.Wc);
                p.u();
                k.forEach(function(y) {
                    C.viewport(0, y.Ip, b, y.cb);
                    X.O("u96", y.up, 1);
                    y.V.h(0);
                    vb.Jo();
                    V.l(!1, !1)
                })
            }
            ;
            p.fo = p.remove;
            p.remove = function() {
                p.fo();
                g.remove();
                k.forEach(function(x) {
                    x.V.remove()
                });
                k.splice(0)
            }
            ;
            return p
        }
    };
    Ec.Na = function() {
        var a = {
            Yc: 45,
            zg: 1,
            Hb: "../../images/debug/picsou.png",
            ke: .8,
            Vf: 3.14 / 6,
            Wf: .314,
            Vd: 4,
            Ud: .5,
            Uf: -.25,
            pn: 1,
            Y: 256,
            Tf: .15
        }
          , b = {
            ub: null,
            Tb: null,
            screen: null
        }
          , d = !1
          , f = !1
          , n = -1
          , t = null
          , p = null
          , g = null
          , k = Math.PI / 180
          , r = [1, 1]
          , w = !1
          , H = {
            m: function(v) {
                n = v.width;
                v = {
                    isFloat: ob.ka(),
                    U: !0,
                    isPot: !1,
                    isMipmap: !1,
                    width: n,
                    height: n / 2,
                    L: 3
                };
                b.ub && (b.ub.remove(),
                b.Tb.remove());
                b.Tb = vb.instance(Object.assign({
                    isLinear: !1
                }, v));
                b.ub = zb.instance(Object.assign({
                    isLinear: !0
                }, v));
                X.j("s120", [{
                    type: "1i",
                    name: "u164",
                    value: 0
                }]);
                X.j("s121", [{
                    type: "1i",
                    name: "u101",
                    value: 0
                }, {
                    type: "1i",
                    name: "u109",
                    value: 1
                }, {
                    type: "1i",
                    name: "u169",
                    value: 2
                }]);
                H.jk();
                w = !0
            },
            jk: function() {
                X.j("s121", [{
                    type: "1f",
                    name: "u170",
                    value: a.Vf
                }, {
                    type: "1f",
                    name: "u171",
                    value: a.Wf
                }, {
                    type: "1f",
                    name: "u172",
                    value: a.Vd
                }, {
                    type: "1f",
                    name: "u173",
                    value: a.Ud
                }, {
                    type: "1f",
                    name: "u174",
                    value: a.Uf
                }])
            },
            Kq: function() {
                return f
            },
            sa: function(v) {
                t = v
            },
            Xc: function() {
                p = "uniform sampler2D u164;uniform vec2 u165,u166,u11;uniform int u167;uniform float u168,u150;varying vec2 vv0;const float h=3.141593;const vec2 i=vec2(.5);const float e=1.2;const vec3 g=vec3(1.);void main(){vec2 c=vec2(vv0.x*2.,-vv0.y+.5)*h,a=i+u11*(c-u165)/u166;float b=1.;if(u167==0){if(a.x<0.||a.x>1.||a.y<0.||a.y>1.)discard;}else b*=smoothstep(-e,0.,a.x),b*=1.-smoothstep(1.,1.+e,a.x),b*=smoothstep(-e,0.,a.y),b*=1.-smoothstep(1.,1.+e,a.y);vec3 d=mix(u168*g,texture2D(u164,a).rgb*u150,b*g);gl_FragColor=vec4(d,1.);}";
                g = "uniform sampler2D u101,u109,u169;uniform float u170,u171,u172,u173,u174,u175;varying vec2 vv0;const float f=3.141593;const vec2 h=vec2(.5);const vec3 i=vec3(1.);void main(){float j=(vv0.x*2.-1.)*f,c=(-vv0.y+.5)*f;vec4 a=texture2D(u169,h);float d=a.r,k=u172*a.g,l=u173*(a.b+u174),b=a.a,g=asin(cos(b)*cos(d)),m=atan(cos(b)*sin(d),-sin(b)),n=acos(sin(c)*sin(g)+cos(c)*cos(g)*cos(j-m)),o=1.-smoothstep(u170-u171,u170+u171,n);vec3 p=i*(max(l,0.)+max(k,0.)*o),q=texture2D(u101,vv0).rgb,r=texture2D(u109,vv0).rgb;gl_FragColor=vec4(mix(p+r,q,u175),1.);}";
                X.pa("s120", {
                    name: "_",
                    g: p,
                    i: "u164 u165 u167 u166 u168 u150 u11".split(" "),
                    precision: "highp"
                });
                X.pa("s121", {
                    name: "_",
                    g: g,
                    i: "u169 u170 u171 u172 u173 u174 u109 u101 u175".split(" "),
                    precision: "highp"
                })
            },
            Og: function(v, x, y, m, l, E, L, B) {
                X.O("u165", x, y);
                X.pe("u167", m ? 1 : 0);
                X.O("u166", l, l / E);
                X.Ig("u11", L);
                v.h(0);
                V.l(B, B)
            },
            pi: function() {
                return b.ub.ji()
            },
            wh: function(v) {
                H.m({
                    width: a.Y
                });
                H.kk(v, !1, 1);
                f = !0
            },
            vh: function() {
                d && b.screen.Jm() === a.Hb || (d = !1,
                b.screen && b.screen.remove(),
                b.screen = vb.instance({
                    url: a.Hb,
                    isFloat: !1,
                    C: function() {
                        d = !0
                    }
                }))
            },
            Fg: function(v) {
                Object.assign(a, v)
            },
            mb: function(v) {
                H.Fg(v);
                w && (H.jk(),
                H.vh())
            },
            kk: function(v, x, y) {
                sb.ca();
                b.Tb.J();
                X.set("s120");
                X.D("u168", a.Tf);
                X.D("u150", a.pn);
                H.Og(v, Math.PI, 0, !0, 90 * k, v.P() / v.aa(), r, !0);
                d && (v = a.Y,
                X.D("u150", a.ke),
                C.viewport(0, 0, v / 2, v / 2),
                H.Og(b.screen, 0, 0, !1, 2 * a.Yc * k, 2 * a.zg, r, !1),
                C.viewport(v / 2, 0, v / 2, v / 2),
                H.Og(b.screen, 2 * Math.PI, 0, !1, 2 * a.Yc * k, 2 * a.zg, r, !1));
                x ? (X.set("s121"),
                X.D("u175", 1 - y),
                b.ub.Cj(0),
                b.Tb.h(1),
                x.h(2),
                V.l(!1, !1),
                t.Dg(b.ub.ji())) : t.Dg(b.Tb)
            },
            A: function() {
                w = !1;
                Object.assign(b, {
                    ub: null,
                    Tb: null,
                    screen: null
                });
                f = d = !1;
                n = -1;
                t = null
            }
        };
        return H
    }();
    Ec.rb = function() {
        var a = !1
          , b = !0
          , d = null
          , f = null
          , n = 1
          , t = null
          , p = {
            Xc: function() {
                yb.da() && (X.pa("s122", {
                    name: "_",
                    v: "attribute vec3 a0;uniform sampler2D u42;uniform float u153;uniform vec2 u43;uniform vec3 u152;const float l=0.,m=0.,D=1.;const vec2 e=vec2(1.);const vec3 n=vec3(1.);const vec2 E=vec2(-1.,1.),o=vec2(.16,.5),p=vec2(.5,.5),q=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 r(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,o);vec2 f=u93*e;vec3 c=u93*n;vec2 s=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,p).rgb+vec3(u87,0.,0.),u90,c);float t=mix(texture2D(u42,q).r,0.,u93);a.z+=t;mat3 u=r(a);vec3 v=mix(u152,u91,c);float w=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 x=mat2(h,i,-i,h);b.xy=x*b.xy;float y=mix(u89,1.,u93);vec2 j=u88/s;vec3 k=a0;float z=max(0.,-a0.z-l)*m;k.x+=z*sign(a0.x)*(1.-u93);vec3 A=u*(k+v)*w+b;vec2 B=j*y;vec3 C=vec3(g*B,-j)+A*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(C,1.));}",
                    g: "void main(){gl_FragData[0]=vec4(0.,0.,0.,0.),gl_FragData[1]=vec4(0.,0.,1.,1.),gl_FragData[2]=vec4(1.,0.,0.,0.),gl_FragData[3]=vec4(0.,.5,1.,0.);}",
                    i: ["u42", "u43", "u86", "u152", "u153"].concat(X.Id(), X.Jd()),
                    K: ["a0"],
                    S: [3],
                    fa: !0
                }),
                a = !0)
            },
            m: function(g) {
                a && X.j("s122", [{
                    type: "1i",
                    name: "u42",
                    value: 1
                }, {
                    type: "3f",
                    name: "u86",
                    value: g.Ja
                }, {
                    type: "1f",
                    name: "u153",
                    value: 1
                }, {
                    type: "1f",
                    name: "u87",
                    value: 0
                }, {
                    type: "1f",
                    name: "u95",
                    value: 1
                }].concat(g.Zg))
            },
            jb: function(g, k) {
                f = g;
                n = k;
                p.xi()
            },
            ib: function(g, k) {
                d = g;
                t = k;
                p.xi()
            },
            xi: function() {
                if (yb.da() && f && d) {
                    var g = [d[0] * f, d[1] * f, d[2] * f]
                      , k = t;
                    g[0] += k[0];
                    g[1] += k[1];
                    g[2] += k[2];
                    X.j("s122", [{
                        type: "1f",
                        name: "u153",
                        value: n
                    }, {
                        type: "3f",
                        name: "u152",
                        value: g
                    }]);
                    X.M()
                }
            },
            Tm: function(g) {
                for (var k = g.width / 2, r = g.height / 2, w = g.depth, H = g.Wl, v = g.height / 4, x = g.Al, y = 2 * x + 4, m = [], l = [], E = -k + g.Za, L = -H - g.Za, B = k - g.Za, D = -H - g.Za, e = 0; e < y; ++e) {
                    var q = 0
                      , z = 0;
                    0 === e ? (q = -k,
                    z = -H - w) : 1 <= e && e <= 1 + x ? (z = (e - 1) / x * Math.PI / 2,
                    q = E - Math.cos(z) * g.Za,
                    z = L + Math.sin(z) * g.Za) : e >= 2 + x && e <= 2 + 2 * x ? (z = (e - 2 - x) / x * Math.PI / 2,
                    q = B + Math.sin(z) * g.Za,
                    z = D + Math.cos(z) * g.Za) : e === y - 1 && (q = k,
                    z = -H - w);
                    m.push(q, r + v, z, q, -r + v, z);
                    0 !== e && l.push(2 * e, 2 * e - 2, 2 * e - 1, 2 * e, 2 * e - 1, 2 * e + 1)
                }
                return p.instance({
                    la: m,
                    indices: l
                })
            },
            toggle: function(g) {
                b = g
            },
            instance: function(g) {
                var k = V.instance({
                    la: g.la,
                    indices: g.indices
                });
                return {
                    W: function() {
                        a && b && (X.set("s122"),
                        k.bind(!0),
                        k.W())
                    }
                }
            }
        };
        return p
    }();
    Ec.ja = function() {
        function a(I) {
            X.j("s125", I);
            X.j("s126", I)
        }
        var b = {
            Df: -87,
            Mm: [85, 95],
            vi: [90, 90],
            ui: [85, 70],
            sd: 24,
            Zp: 12,
            Bl: 2,
            sg: [-80, 40],
            $i: [0, -10],
            Fn: 40,
            Hn: 20,
            aj: [70, 50],
            Gn: 90,
            lp: 2,
            se: [0, -15],
            Je: 1024,
            qb: 512,
            ce: 4,
            $o: [6, 30],
            Zi: 1.2
        };
        b.jj = b.sg;
        var d = !1
          , f = !1
          , n = !1
          , t = null
          , p = null
          , g = null
          , k = null
          , r = null
          , w = null
          , H = !1
          , v = !1
          , x = null
          , y = null
          , m = null
          , l = null
          , E = .5
          , L = [{
            type: "1f",
            name: "u177",
            value: 1
        }]
          , B = null
          , D = null
          , e = 0
          , q = ["u42", "u43", "u153", "u152"]
          , z = null
          , O = null
          , G = null
          , S = null
          , Q = {
            Xc: function() {
                X.pa("s123", {
                    name: "_",
                    v: "attribute vec3 a0;uniform vec3 u152;uniform vec2 u178,u179;uniform float u153,u180,u181,u182;varying float vv0,vv1;void main(){vec3 a=(a0+u152)*u153;float b=atan(a.x,a.z-u180),d=2.*(a.y-u181)/(u182-u181)-1.;vv0=a0.y;float g=1.-u178.x*u178.x/(u178.y*u178.y),c=u178.x/sqrt(1.-g*pow(cos(b),2.));vec3 h=vec3(c*sin(b),a.y,c*cos(b)+u180);vv1=smoothstep(u179.x,u179.y,length(h-a)),gl_Position=vec4(b,d,0.,1.);}",
                    g: "uniform float u183;uniform vec4 u14;varying float vv0,vv1;void main(){float a=u14.x+u14.y*smoothstep(-u14.w,-u14.z,vv0),b=min(a,1.)*u183;gl_FragColor=vec4(b,vv1,1.,1.);}",
                    i: "u153 u152 u178 u179 u180 u181 u182 u14 u183".split(" "),
                    K: ["a0"],
                    S: [3],
                    precision: "highp"
                });
                X.pa("s124", {
                    name: "_",
                    g: "uniform sampler2D u1;uniform vec2 u15;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u1,vv0-3.*u15),c=texture2D(u1,vv0-2.*u15),d=texture2D(u1,vv0-u15),f=texture2D(u1,vv0+u15),g=texture2D(u1,vv0+2.*u15),h=texture2D(u1,vv0+3.*u15);float j=.031496*b.r+.110236*c.r+.220472*d.r+.275591*a.r+.220472*f.r+.110236*g.r+.031496*h.r;vec2 i=b.gb*b.b+c.gb*c.b+d.gb*d.b+a.gb*a.b+f.gb*f.b+g.gb*g.b+h.gb*h.b;i/=b.b+c.b+d.b+a.b+f.b+g.b+h.b,gl_FragColor=vec4(mix(j,a.r,1.-i.x),i,1);}",
                    i: ["u1", "u15"],
                    precision: "lowp"
                });
                X.pa("s125", {
                    name: "_",
                    v: "attribute vec3 a0,a2;attribute vec2 a1;varying vec2 vv0;varying float vv1;uniform sampler2D u42;uniform vec2 u43;uniform float u153;uniform vec3 u152;const float o=0.,p=0.;const vec2 e=vec2(1.);const vec3 q=vec3(1.);const vec2 G=vec2(-1.,1.),r=vec2(.16,.5),s=vec2(.5,.5),t=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 u(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,r);vec2 g=u93*e;vec3 c=u93*q;vec2 v=mix(d.a*u43,e,g),h=(2.*d.gb-e)*(1.-g);h.x*=-1.;vec3 a=mix(texture2D(u42,s).rgb+vec3(u87,0.,0.),u90,c);float w=mix(texture2D(u42,t).r,0.,u93);a.z+=w;mat3 i=u(a);vec3 x=mix(u152,u91,c);float y=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float j=cos(a.z),k=sin(a.z);mat2 z=mat2(j,k,-k,j);b.xy=z*b.xy;float A=mix(u89,1.,u93);vec2 l=u88/v;vec3 m=a0;float B=max(0.,-a0.z-o)*p;m.x+=B*sign(a0.x)*(1.-u93);vec3 C=i*(m+x)*y+b;vec2 D=l*A;vec3 E=vec3(h*D,-l)+C*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(E,1.)),vv0=a1,gl_Position*=vec4(-1.,1.,1.,1.);vec3 F=i*a2;vv1=-F.z,vv1*=vv1*1e-5+smoothstep(5.,50.,abs(a0.x));}",
                    g: "uniform sampler2D u184,u169;uniform vec2 u99,u185;uniform float u186,u177;varying vec2 vv0;varying float vv1;void main(){vec2 b=u185*u186+u99*vv0;vec4 a=u177*texture2D(u184,b);a.r*=step(0.,vv0.y),gl_FragColor=vec4(0.,0.,0.,a.r*vv1);}",
                    i: "u184 u169 u86 u186 u185 u99 u177".split(" ").concat(X.Id(), X.Jd(), q),
                    K: ["a0", "a2", "a1"],
                    S: [3, 3, 2],
                    precision: "lowp"
                });
                X.pa("s126", {
                    name: "_",
                    v: "attribute vec3 a0;uniform sampler2D u42;uniform vec2 u43;uniform float u153;uniform vec3 u152;const float l=0.,m=0.;const vec2 e=vec2(1.);const vec3 n=vec3(1.);const vec2 D=vec2(-1.,1.),o=vec2(.16,.5),p=vec2(.5,.5),q=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 r(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,o);vec2 f=u93*e;vec3 c=u93*n;vec2 s=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,p).rgb+vec3(u87,0.,0.),u90,c);float t=mix(texture2D(u42,q).r,0.,u93);a.z+=t;mat3 u=r(a);vec3 v=mix(u152,u91,c);float w=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 x=mat2(h,i,-i,h);b.xy=x*b.xy;float y=mix(u89,1.,u93);vec2 j=u88/s;vec3 k=a0;float z=max(0.,-a0.z-l)*m;k.x+=z*sign(a0.x)*(1.-u93);vec3 A=u*(k+v)*w+b;vec2 B=j*y;vec3 C=vec3(g*B,-j)+A*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(C,1.)),gl_Position*=vec4(-1.,1.,1.,1.);}",
                    g: "void main(){gl_FragColor=vec4(0.);}",
                    i: ["u86"].concat(X.Id(), X.Jd(), q),
                    K: ["a0"],
                    S: [3],
                    precision: "lowp"
                });
                d = !0
            },
            m: function(I) {
                if (d) {
                    if (void 0 === I.mc || !I.mc)
                        return !1;
                    if (f)
                        Q.Aj(I);
                    else {
                        k = vb.instance({
                            isFloat: !1,
                            isPot: !1,
                            isMipmap: !1,
                            isLinear: !0,
                            width: b.Je,
                            height: b.Je / 4
                        });
                        var A = b.qb / 4
                          , u = {
                            isFloat: !1,
                            isPot: !1,
                            isMipmap: !1,
                            isLinear: !1,
                            width: b.qb,
                            height: A
                        };
                        g = vb.instance(u);
                        w = vb.instance(u);
                        r = vb.instance({
                            isFloat: !1,
                            isPot: !1,
                            isMipmap: !1,
                            isLinear: !0,
                            width: b.qb,
                            height: A * b.ce
                        });
                        A = [];
                        u = [];
                        var N = b.$i[0]
                          , R = b.$i[1]
                          , T = b.Fn
                          , aa = b.Hn
                          , ka = -b.aj[0] + N
                          , Aa = b.aj[1] + R
                          , F = b.Gn;
                        A.push(0, N, R, .5 * -aa, ka, Aa, .5 * aa, ka, Aa, .5 * -T, N - F, R, .5 * T, N - F, R);
                        u.push(0, 2, 1, 0, 1, 3, 1, 4, 3, 1, 2, 4, 0, 4, 2);
                        G = V.instance({
                            la: new Float32Array(A),
                            indices: new Uint16Array(u)
                        });
                        A = .5 - .5 / I.nc[1];
                        u = .5 + .5 / I.nc[1];
                        N = new Float32Array(16 * b.sd);
                        R = new Uint16Array(6 * (b.sd - 1));
                        for (T = 0; T < b.sd; ++T) {
                            aa = 2 * T / (b.sd - 1) - 1;
                            aa = Math.sign(aa) * Math.pow(Math.abs(aa), b.Bl);
                            F = Math.PI * (aa + 1) / 2 - Math.PI / 2;
                            aa = Math.sin(F);
                            var h = Math.cos(F);
                            ka = Math.sin(F * b.Zi);
                            Aa = Math.cos(F * b.Zi);
                            var M = F / (Math.PI * I.nc[0]) + .5;
                            F = b.ui[0] * aa;
                            var ca = b.jj[0]
                              , la = b.ui[1] * h + b.Df
                              , ja = M
                              , pa = A
                              , Da = b.jj[1];
                            h = b.vi[1] * h + b.Df;
                            var xa = u
                              , ra = 16 * T;
                            N[ra] = b.vi[0] * aa;
                            N[ra + 1] = Da;
                            N[ra + 2] = h;
                            N[ra + 3] = ka;
                            N[ra + 4] = 0;
                            N[ra + 5] = Aa;
                            N[ra + 6] = M;
                            N[ra + 7] = xa;
                            N[ra + 8] = F;
                            N[ra + 9] = ca;
                            N[ra + 10] = la;
                            N[ra + 11] = ka;
                            N[ra + 12] = 0;
                            N[ra + 13] = Aa;
                            N[ra + 14] = ja;
                            N[ra + 15] = pa;
                            0 !== T && (aa = 2 * T,
                            ka = 6 * (T - 1),
                            R[ka] = aa,
                            R[ka + 1] = aa - 1,
                            R[ka + 2] = aa - 2,
                            R[ka + 3] = aa,
                            R[ka + 4] = aa + 1,
                            R[ka + 5] = aa - 1)
                        }
                        S = V.instance({
                            la: N,
                            indices: R
                        });
                        Q.Aj(I);
                        X.j("s124", [{
                            type: "1i",
                            name: "u1",
                            value: 0
                        }]);
                        f = !0
                    }
                }
            },
            Aj: function(I) {
                E = I.Vo;
                l = I.te;
                var A = [{
                    type: "1i",
                    name: "u42",
                    value: 1
                }, {
                    type: "3f",
                    name: "u86",
                    value: [I.Ja[0], I.Ja[1] - b.se[0], I.Ja[2] + b.se[1]]
                }].concat(I.Zg, I.ek);
                B = [{
                    type: "1i",
                    name: "u184",
                    value: 0
                }, {
                    type: "1i",
                    name: "u169",
                    value: 2
                }, {
                    type: "1f",
                    name: "u186",
                    value: I.Wo
                }, {
                    type: "2f",
                    name: "u99",
                    value: [1, 1 / b.ce]
                }, {
                    type: "2f",
                    name: "u185",
                    value: [0, 1 / b.ce]
                }, {
                    type: "1f",
                    name: "u177",
                    value: 1
                }].concat(A);
                D = A;
                X.j("s125", B);
                X.j("s126", D)
            },
            ic: function(I) {
                t = I
            },
            hc: function(I) {
                z = I;
                z.Cc(Q.Dc)
            },
            Mi: function() {
                return n && null !== z && null !== O
            },
            Dc: function() {
                if (!(n || v && H) || null === z || null === O)
                    return !1;
                e = 0;
                C.viewport(0, 0, b.Je, b.Je / 4);
                sb.ca();
                k.u();
                C.clearColor(0, 0, 0, 0);
                C.clear(C.COLOR_BUFFER_BIT);
                X.j("s123", [{
                    type: "1f",
                    name: "u180",
                    value: b.Df
                }, {
                    type: "1f",
                    name: "u181",
                    value: b.sg[0]
                }, {
                    type: "1f",
                    name: "u182",
                    value: b.sg[1]
                }, {
                    type: "3f",
                    name: "u152",
                    value: [x[0] + y[0], x[1] + y[1], x[2] + y[2]]
                }, {
                    type: "1f",
                    name: "u183",
                    value: E
                }, {
                    type: "2f",
                    name: "u178",
                    value: b.Mm
                }, {
                    type: "2f",
                    name: "u179",
                    value: b.$o
                }]);
                z.Vl();
                X.set("s1");
                var I = b.qb / 4;
                C.viewport(0, 0, b.qb, I);
                g.u();
                k.h(0);
                k.Hc();
                V.l(!0, !0);
                for (var A = 0; A < b.ce; ++A)
                    X.set("s124"),
                    0 !== A && C.viewport(0, 0, b.qb, I),
                    w.u(),
                    g.h(0),
                    X.O("u15", 1 / b.qb, 0),
                    V.l(!1, !1),
                    g.u(),
                    w.h(0),
                    X.O("u15", 0, 1 / I),
                    V.l(!1, !1),
                    b.Cl && C.colorMask(0 === A, 1 === A, 2 === A, !0),
                    X.set("s1"),
                    r.u(),
                    g.h(0),
                    C.viewport(0, A * I, b.qb, I),
                    V.l(!1, !1),
                    b.Cl && C.colorMask(!0, !0, !0, !0);
                return n = !0
            },
            W: function() {
                Q.Mi() && 0 === e++ % b.lp && (O.bind(!1, !1),
                p.J(),
                C.clearColor(0, 0, 0, 0),
                C.enable(C.DEPTH_TEST),
                C.depthMask(!0),
                C.clear(C.COLOR_BUFFER_BIT | C.DEPTH_BUFFER_BIT),
                X.set("s126"),
                t.h(1),
                G.bind(!0),
                G.W(),
                X.set("s125"),
                r.h(0),
                S.bind(!0),
                S.W(),
                C.disable(C.DEPTH_TEST),
                C.depthMask(!1))
            },
            Em: function() {
                return p
            },
            add: function() {
                Q.Mi() && (C.enable(C.BLEND),
                C.blendFunc(C.ONE, C.ONE_MINUS_SRC_ALPHA),
                p.h(0),
                V.l(!1, !1),
                C.disable(C.BLEND))
            },
            Bg: function(I, A) {
                O && O.remove();
                O = sb.instance({
                    width: I,
                    height: A,
                    Kc: !0
                });
                p && p.remove();
                p = vb.instance({
                    width: I,
                    height: A,
                    isFloat: !1,
                    isPot: !1
                });
                Q.Dc()
            },
            ib: function(I, A, u) {
                I || (I = x,
                A = y,
                u = m);
                a([{
                    type: "3f",
                    name: "u152",
                    value: [u[0] + l[0], u[1] + l[1] - b.se[0], u[2] + l[2] + b.se[1]]
                }]);
                x = I;
                y = A;
                m = u;
                v = !0;
                !n && H && Q.Dc();
                X.M()
            },
            jb: function(I, A) {
                X.j("s123", [{
                    type: "1f",
                    name: "u153",
                    value: I
                }]);
                a([{
                    type: "1f",
                    name: "u153",
                    value: A
                }]);
                H = !0;
                !n && v && Q.Dc();
                X.M()
            },
            Gg: function(I) {
                a([{
                    type: "1f",
                    name: "u87",
                    value: I
                }]);
                X.M()
            },
            Kb: function(I) {
                I && (z = I);
                Q.Dc()
            },
            Hg: function(I, A) {
                L[0].value = 1 - I;
                a(L);
                a(A)
            },
            I: function() {},
            A: function() {
                [O, G, S].forEach(function(I) {
                    I && I.remove()
                });
                e = 0;
                v = H = !1;
                S = G = O = l = m = y = x = null;
                n = f = d = !1;
                w = r = k = g = p = t = null
            }
        };
        return Q
    }();
    Ec.va = function() {
        var a = !1
          , b = null
          , d = 0
          , f = 0
          , n = 0
          , t = [{
            type: "1f",
            name: "u177",
            value: 1
        }]
          , p = null
          , g = null
          , k = null
          , r = {
            Xc: function() {
                X.pa("s127", {
                    name: "_",
                    v: "attribute vec3 a0;uniform vec2 u187,u188;varying vec2 vv0;void main(){vec2 a=2.*(a0.xy-u188)/u187;gl_Position=vec4(a,0.,1.),vv0=a0.xy;}",
                    g: "uniform vec2 u96;uniform float u189,u190,u191;varying vec2 vv0;void main(){vec2 b=vec2(sign(vv0.x)*.5*u189,u190),a=vv0-b,c=u191*a,d=(c-a)*u96;gl_FragColor=vec4(d,0.,1.);}",
                    i: "u187 u188 u189 u190 u191 u96".split(" "),
                    K: ["a0"],
                    S: [3],
                    precision: "highp"
                });
                X.pa("s128", {
                    name: "_",
                    v: "attribute vec3 a0;varying vec2 vv0,vv1;uniform sampler2D u42;uniform vec3 u152;uniform vec2 u43,u187,u188;uniform float u153;const float n=0.,o=0.;const vec2 e=vec2(1.);const vec3 p=vec3(1.);const vec2 F=vec2(-1.,1.),q=vec2(.16,.5),r=vec2(.5,.5),s=vec2(.84,.5);uniform mat4 u83;uniform vec3 u86,u90,u91,u92;uniform float u84,u85,u93,u94,u87,u88,u89,u95;mat3 t(vec3 c){vec3 b=cos(c),a=sin(c);return mat3(b.y*b.z,b.y*a.z,a.y,-a.x*a.y*b.z+b.x*a.z,-a.x*a.y*a.z-b.x*b.z,a.x*b.y,b.x*a.y*b.z+a.x*a.z,b.x*a.y*a.z-a.x*b.z,-b.x*b.y);}void main(){vec4 d=texture2D(u42,q);vec2 f=u93*e;vec3 c=u93*p;vec2 u=mix(d.a*u43,e,f),g=(2.*d.gb-e)*(1.-f);g.x*=-1.;vec3 a=mix(texture2D(u42,r).rgb+vec3(u87,0.,0.),u90,c);float v=mix(texture2D(u42,s).r,0.,u93);a.z+=v;mat3 w=t(a);vec3 x=mix(u152,u91,c);float y=mix(u153,u94,u93);vec3 b=mix(u86,u92,c);b.x+=u84*sin(a.y),b.y+=u85*sin(a.x)*step(0.,a.x);float h=cos(a.z),i=sin(a.z);mat2 z=mat2(h,i,-i,h);b.xy=z*b.xy;float A=mix(u89,1.,u93);vec2 j=u88/u;vec3 k=a0;float B=max(0.,-a0.z-n)*o;k.x+=B*sign(a0.x)*(1.-u93);vec3 C=w*(k+x)*y+b;vec2 D=j*A;vec3 E=vec3(g*D,-j)+C*vec3(1.,-1.,-1.);gl_Position=u83*(vec4(u95*e,e)*vec4(E,1.)),gl_Position*=vec4(-1.,1.,1.,1.),vv0=vec2(.5,.5)+(a0.xy-u188)/u187,vv1=vec2(.5,.5)+.5*gl_Position.xy/gl_Position.w;}",
                    g: "uniform sampler2D u192,u193;uniform float u177;varying vec2 vv0,vv1;void main(){vec2 a=u177*texture2D(u192,vv0).rg;gl_FragColor=texture2D(u193,a+vv1);}",
                    i: "u177 u42 u192 u193 u187 u188 u43 u86 u153 u152".split(" ").concat(X.Id(), X.Jd()),
                    K: ["a0"],
                    S: [3],
                    precision: "lowp"
                });
                a = !0
            },
            m: function(w) {
                if (a) {
                    if (void 0 === w.mc || !w.ud)
                        return !1;
                    g = vb.instance({
                        isFloat: !0,
                        isPot: !1,
                        isMipmap: !1,
                        isLinear: !1,
                        width: 256,
                        height: 128,
                        L: 4
                    });
                    k = sb.instance({
                        width: 256,
                        height: 128
                    });
                    X.j("s128", [{
                        type: "1i",
                        name: "u42",
                        value: 1
                    }, {
                        type: "1i",
                        name: "u192",
                        value: 2
                    }, {
                        type: "1i",
                        name: "u193",
                        value: 0
                    }, {
                        type: "3f",
                        name: "u86",
                        value: w.Ja
                    }, {
                        type: "1f",
                        name: "u177",
                        value: 1
                    }].concat(w.ek, w.Zg));
                    f = w.df;
                    n = w.cf;
                    d = w.ef
                }
            },
            ic: function(w) {
                b = w
            },
            hc: function(w) {
                p = w;
                p.Cc(r.$e)
            },
            $e: function() {
                C.viewport(0, 0, 256, 128);
                k.u();
                g.u();
                var w = p.Fm()
                  , H = p.Gm()
                  , v = [{
                    type: "2f",
                    name: "u187",
                    value: [w, H]
                }, {
                    type: "2f",
                    name: "u188",
                    value: [p.im(), p.jm()]
                }];
                X.j("s127", v.concat([{
                    type: "1f",
                    name: "u189",
                    value: f
                }, {
                    type: "1f",
                    name: "u190",
                    value: n
                }, {
                    type: "1f",
                    name: "u191",
                    value: d
                }, {
                    type: "2f",
                    name: "u96",
                    value: [1 / w, -1 / H]
                }]));
                p.Lh();
                X.j("s128", v)
            },
            W: function() {
                X.set("s128");
                b.h(1);
                g.h(2);
                p.Lh()
            },
            ib: function(w) {
                X.j("s128", [{
                    type: "3f",
                    name: "u152",
                    value: w
                }]);
                X.M()
            },
            jb: function(w) {
                X.j("s128", [{
                    type: "1f",
                    name: "u153",
                    value: w
                }]);
                X.M()
            },
            Gg: function(w) {
                X.j("s128", [{
                    type: "1f",
                    name: "u87",
                    value: w
                }]);
                X.M()
            },
            To: function(w) {
                d = w;
                r.$e();
                X.M();
                Bc.animate(Date.now())
            },
            Kb: function(w) {
                w && (p = w);
                r.$e()
            },
            Hg: function(w, H) {
                t.u177 = 1 - w;
                X.j("s128", t);
                X.j("s128", H)
            },
            I: function() {}
        };
        return r
    }();
    Ec.uc = function() {
        var a = [0, -.5]
          , b = !1
          , d = !1
          , f = null
          , n = null
          , t = null
          , p = null
          , g = null
          , k = -1
          , r = -1;
        return {
            Xc: function() {
                X.pa("s129", {
                    name: "_",
                    v: "attribute vec2 a0;uniform sampler2D u42;uniform vec2 u43,u12;uniform float u11;varying vec2 vv0;const vec2 f=vec2(1.,1.);void main(){vec4 a=texture2D(u42,vec2(.25,.5));vec2 b=a.a*u43,c=2.*a.gb-f,d=u12+a0*u11;gl_Position=vec4(c+b*d,0.,1.),vv0=vec2(.5,.5)+.5*a0;}",
                    g: "uniform sampler2D u194;varying vec2 vv0;void main(){gl_FragColor=texture2D(u194,vv0);}",
                    i: ["u42", "u194", "u43", "u12", "u11"],
                    precision: "lowp"
                });
                X.pa("s130", {
                    name: "_",
                    g: "uniform sampler2D u2,u195,u196;varying vec2 vv0;const vec3 f=vec3(1.,1.,1.);void main(){float a=texture2D(u2,vv0).r;vec3 b=texture2D(u196,vv0).rgb,c=texture2D(u195,vv0).rgb;gl_FragColor=vec4(mix(b,c,a*f),1.);}",
                    i: ["u2", "u196", "u195"],
                    precision: "lowp"
                });
                b = !0
            },
            m: function(w) {
                b && (g = vb.instance({
                    isFloat: !1,
                    isPot: !0,
                    url: w.Re,
                    C: function() {
                        d = !0
                    }
                }),
                X.j("s129", [{
                    type: "1i",
                    name: "u42",
                    value: 1
                }, {
                    type: "1i",
                    name: "u194",
                    value: 0
                }, {
                    type: "2f",
                    name: "u43",
                    value: w.qk
                }, {
                    type: "2f",
                    name: "u12",
                    value: a
                }, {
                    type: "1f",
                    name: "u11",
                    value: 3.8
                }]),
                X.j("s130", [{
                    type: "1i",
                    name: "u195",
                    value: 0
                }, {
                    type: "1i",
                    name: "u2",
                    value: 1
                }, {
                    type: "1i",
                    name: "u196",
                    value: 2
                }]))
            },
            ic: function(w) {
                n = w
            },
            Bg: function(w, H) {
                var v = {
                    isFloat: !1,
                    isPot: !1,
                    isMipmap: !1,
                    isLinear: !1,
                    width: w,
                    height: H,
                    L: 4
                };
                k = 2 / w;
                r = 2 / H;
                t = vb.instance(v);
                p = vb.instance(v);
                f = sb.instance({
                    width: w,
                    height: H
                })
            },
            W: function(w, H) {
                if (d) {
                    f.bind(!1, !0);
                    X.set("s91");
                    for (var v = 0; 2 > v; ++v) {
                        X.O("u15", k, 0);
                        t.u();
                        0 !== v && p.h(0);
                        var x = 0 === v && !c.ga_;
                        V.l(x, x);
                        X.O("u15", 0, r);
                        p.u();
                        t.h(0);
                        V.l(!1, !1)
                    }
                    X.set("s129");
                    n.h(1);
                    g.h(0);
                    t.u();
                    C.clearColor(1, 0, 0, 1);
                    C.clear(C.COLOR_BUFFER_BIT);
                    V.l(!1, !1);
                    X.set("s130");
                    H.u();
                    p.h(0);
                    t.h(1);
                    w.h(2);
                    V.l(!1, !1)
                }
            },
            I: function() {}
        }
    }();
    var Dc = function() {
        var a = {
            instance: function(b) {
                var d = b.fg
                  , f = b.ag
                  , n = b.td
                  , t = b.background ? b.background : vb.ri()
                  , p = b.qa
                  , g = {
                    scale: 1,
                    offsetX: 0,
                    offsetY: 0
                }
                  , k = null;
                b.$f && (g.scale = b.$f.scale,
                g.offsetY = b.$f.offsetY);
                return {
                    ki: function() {
                        return p
                    },
                    ci: function() {
                        return t
                    },
                    set: function() {
                        k = Ic.um();
                        Ic.Hj(g);
                        Ic.Be();
                        Ic.Ce();
                        Bc.zj(n, t, !1, !1)
                    },
                    M: function() {
                        Ic.Hj(k)
                    },
                    fc: function() {
                        return {
                            modelURL: d,
                            materialsURLs: f,
                            background: t.fc(!1),
                            td: n.fc(!1),
                            qa: p.fc(!0)
                        }
                    },
                    xm: function() {
                        return n.fc(!1)
                    },
                    Op: function(r) {
                        t.h(r)
                    },
                    I: function() {
                        n.remove();
                        p.remove();
                        b.background && t.remove()
                    }
                }
            },
            dd: function(b, d, f) {
                function n() {
                    if (3 === ++k && d) {
                        var r = a.instance({
                            fg: b.modelURL,
                            ag: b.materialsURLs,
                            background: t,
                            td: p,
                            qa: g
                        });
                        d(r)
                    }
                }
                var t = null
                  , p = null
                  , g = null
                  , k = 0;
                vb.dd(b.background, function(r) {
                    !r && f ? f() : (t = r,
                    n())
                });
                vb.dd(b.dataState, function(r) {
                    !r && f ? f() : (p = r,
                    n())
                });
                vb.dd(b.light, function(r) {
                    !r && f ? f() : (g = r,
                    n())
                })
            }
        };
        return a
    }();
    ;return JEELIZVTO || window.JEELIZVTO;
}
)();
