const tako = {
    isEmail: function (e) {
        const r =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
        return r.test(e);
    },
    isPhoneNumber: function (p) {
        const r = /^\+?[0-9]{7,15}$/;
        return r.test(p);
    },
    pick: function (a) {
        if (!Array.isArray(a)) throw new Error("You must pass an array");
        let r = Math.floor(Math.random() * a.length);
        return typeof a[r] === "undefined" ? tako.pick(a) : a[r];
    },
    capitalize: function (s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    },
    kebab: function (s) {
        return s.trim().replaceAll(" ", "-");
    },
    parity: function (n) {
        let x = Number(n);
        return x % 2 !== 0 ? "Odd" : "Even";
    },
    convert: function (v) {
        return typeof v === "string" ? Number(v) : String(v);
    },
    isURL: function (u) {
        const r =
            /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return r.test(u);
    },
    run: function (c) {
        let f = new Function(c);
        return f();
    },
    log: function (x) {
        console.log(x);
    },
    wait: async function (m) {
        await new Promise((r) => setTimeout(r, m));
    },
    truncate: function (s, l) {
        const d = "...";
        if (s.length <= l) return s;
        return s.slice(0, l) + d;
    },
    debounce: async function (f, d) {
        await delay(d);
        let x = new Function(f);
        return x();
    },
    length: function (s) {
        return s.length;
    },
    hasValue: function (s) {
        return s.length !== 0;
    },
    isEmpty: function (s) {
        return s.length === 0;
    },
    isObject: function (o) {
        return typeof o === "object" && o !== null;
    },
    isArray: function (a) {
        return Array.isArray(a);
    },
    formatDate: function (d) {
        if (!(d instanceof Date))
            throw new Error("Input must be a Date object");
        const o = { year: "numeric", month: "long", day: "numeric" };
        return d.toLocaleDateString(undefined, o);
    },
    formatTime: function (d) {
        if (!(d instanceof Date))
            throw new Error("Input must be a Date object");
        const o = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
        return d.toLocaleTimeString(undefined, o);
    },
    error: function (m) {
        throw new Error(m);
    },
};
function delay(m) {
    return new Promise((r) => setTimeout(r, m));
}
