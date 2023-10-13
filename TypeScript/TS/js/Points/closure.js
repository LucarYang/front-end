// var foo = (function CoolModule(id) {
//   function change() {
//     // 修改公共API
//     publicAPI.identify = identify2;
//   }

//   function identify1() {
//     console.log(id);
//   }

//   function identify2() {
//     console.log(id.toUpperCase());
//   }

//   var publicAPI = {
//     change: change,
//     identify: identify1
//   };

//   return publicAPI;
// })("foo module");

// foo.identify(); // foo module
// foo.change();
// foo.identify(); // FOO MODULE

var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }
  return {
    define: define,
    get: get
  };
})();