import { _ as __extends, a as __assign } from './chunk-f3039857.js';
import React__default, { createElement, Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import loadable from '@loadable/component';
import Header from '@service/branding/Header';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".App_App__2okni {\n  text-align: center;\n}\n\n.App_App-logo__3-Vl9 {\n  animation: App_App-logo-spin__28cl0 infinite 20s linear;\n  height: 40vmin;\n  pointer-events: none;\n}\n\n.App_App-header__1kluZ {\n  background-color: #282c34;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  font-size: calc(10px + 2vmin);\n  color: white;\n}\n\n.App_App-link__1y8ZF {\n  color: #61dafb;\n}\n\n@keyframes App_App-logo-spin__28cl0 {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n";
styleInject(css);

var css$1 = ".Welcome_container__3Zs_6 {\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    justify-content: center;\n}";
var styles = {"container":"Welcome_container__3Zs_6"};
styleInject(css$1);

var Welcome = function () { return (createElement("div", { className: styles.container },
    createElement("h1", null, "Welcome to SOA CompositeUI.js"),
    createElement(Header, null,
        createElement("a", { href: 'https://github.com/padzikm/CompositeUI.js' }, "https://github.com/padzikm/CompositeUI.js")),
    createElement(Header, null,
        createElement("a", { href: 'mailto:padzikm@gmail.com' }, "mailto:padzikm@gmail.com")))); };

function Index() {
    return createElement(Welcome, null);
}
var Loading = function () { return createElement("div", null, "Loading..."); };
var ProductDetails = loadable(function () { return import('@service/components/productDetails/Description'); }, {
    fallback: createElement(Loading, null),
});
var ProductList = loadable(function () { return import('@service/components/productList/Body'); }, {
    fallback: createElement(Loading, null),
});
var AddProduct = loadable(function () { return import('@service/components/addProduct/Form'); }, {
    fallback: createElement(Loading, null),
});
function AppRouter() {
    return (createElement(BrowserRouter, null,
        createElement("div", null,
            createElement("nav", null,
                createElement("ul", null,
                    createElement("li", null,
                        createElement(Link, { to: "/" }, "Home")),
                    createElement("li", null,
                        createElement(Link, { to: "/products/" }, "Products List")),
                    createElement("li", null,
                        createElement(Link, { to: "/form/" }, "Add product")))),
            createElement(Route, { path: "/", exact: true, component: Index }),
            createElement(Route, { path: "/details/:id", component: ProductDetails }),
            createElement(Route, { path: "/products", render: function (props) { return createElement(ProductList, { detailsUrl: '/details' }); } }),
            createElement(Route, { path: "/form", render: function (props) { return createElement(AddProduct, { redirectUrl: '/products' }); } }))));
}

var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React__default.createElement(AppRouter, null));
    };
    return App;
}(Component));

function loadServiceStates() {
    var serviceStates;
    var cache = {};
    function importAll(r) {
        r.keys().forEach(function (key) { return cache[key] = r(key); });
    }
    importAll(require.context('@service-components', true, /serviceState\.js$/));
    serviceStates = Object.values(cache);
    return serviceStates;
}

function loadServiceReducers() {
    var _a;
    var serviceStates = loadServiceStates();
    var reducers = {};
    for (var _i = 0, serviceStates_1 = serviceStates; _i < serviceStates_1.length; _i++) {
        var serviceStateModule = serviceStates_1[_i];
        for (var ownProperty in serviceStateModule) {
            var serviceReducer = serviceStateModule[ownProperty];
            reducers = __assign({}, reducers, (_a = {}, _a[ownProperty] = serviceReducer, _a));
        }
    }
    return reducers;
}
var reducers = loadServiceReducers();
var rootReducer = combineReducers(reducers);

var configureStore = function () {
    var middlewareEnhancer = applyMiddleware(thunkMiddleware);
    var enhancers = [middlewareEnhancer];
    var composedEnhancers = composeWithDevTools.apply(void 0, enhancers);
    var store = createStore(rootReducer, composedEnhancers);
    return store;
};

var store = configureStore();
var Main = function () { return (React__default.createElement(Provider, { store: store },
    React__default.createElement(App, null))); };

export default Main;
