const fs = require('fs');
//const util = require('util');
//const stat = util.promisify(fs.stat);
var path = require('path');
const { exec } = require("child_process");

module.exports = function(ctx) {
    // Make sure android platform is part of build
    if (!ctx.opts.platforms.includes('ios')) return;

    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/ios');
    const apkFileLocation = path.join(platformRoot, 'IntelWebrtc/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework');
    
    exec("du -h "+ apkFileLocation, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });

//    return stat(apkFileLocation).then(stats => {
//      console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
//    });
};
