const fs = require('fs');
const util = require('util');
const getSize = require('get-folder-size');
//const stat = util.promisify(fs.stat);
var path = require('path');

module.exports = function(ctx) {
    // Make sure android platform is part of build
    if (!ctx.opts.platforms.includes('ios')) return;

//    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/ios');
//    const apkFileLocation = path.join(platformRoot, 'IntelWebrtc/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework');

//    return stat(apkFileLocation).then(stats => {
//      console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
//    });
    
    return getSize('IntelWebrtc/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework', (err, size) => {
        if (err) { throw err; }
          
          console.log(`The folder is ${size} bytes large`);
          console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
      });
};
