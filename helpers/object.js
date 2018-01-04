function getValue() {
    Object.prototype.getValue = function () {
        var keys = Object.keys(this);
        for (var i = 0; i < arguments.length; i++) {

        }
    };
}
module.exports = getValue;