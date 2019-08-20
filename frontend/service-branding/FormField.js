import React from 'react';

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

var css = ".FormField_error__2k0Di {\n    color: red;\n}\n\n.FormField_input__tbi-7 {\n    margin-left: 10px;\n    margin-right: 10px;\n}";
var styles = {"error":"FormField_error__2k0Di","input":"FormField_input__tbi-7"};
styleInject(css);

var FormField = function (props) {
    return (React.createElement("div", null,
        React.createElement("label", { htmlFor: props.id }, props.label),
        React.createElement("input", { id: props.id, type: "text", value: props.value, onChange: props.onValueChange, className: styles.input }),
        props.error ? React.createElement("span", { className: styles.error },
            "error: ",
            props.error) : null));
};

export default FormField;
