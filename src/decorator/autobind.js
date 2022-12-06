"use strict";
// autobind decorator
exports.__esModule = true;
exports.autobind = void 0;
function autobind(_, _2, descriptor) {
    var originalMethode = descriptor.value;
    var adjDescriptor = {
        configurable: true,
        get: function () {
            var boundFn = originalMethode.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}
exports.autobind = autobind;
