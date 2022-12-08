var exec = require('cordova/exec');

exports.new_activity = function (arg0, success, error) {
    exec(success, error, 'intelwebrtcplugin', 'coolMethod', [arg0]);
};
