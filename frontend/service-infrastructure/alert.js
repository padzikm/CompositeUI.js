import { _ as __extends } from './chunk-f3039857.js';
import React__default from 'react';

var Alert = /** @class */ (function (_super) {
    __extends(Alert, _super);
    function Alert() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Alert.prototype.componentDidMount = function () {
        alert(this.props.message);
    };
    Alert.prototype.render = function () {
        return this.props.children;
    };
    return Alert;
}(React__default.Component));

export default Alert;
