let t;
let __tla = (async () => {
  t = function() {
    import.meta.url, import("_").then(async (m) => {
      await m.__tla;
      return m;
    }).catch(() => 1), async function* () {
    }().next();
  };
})();
export {
  __tla,
  t as __vite_legacy_guard
};
