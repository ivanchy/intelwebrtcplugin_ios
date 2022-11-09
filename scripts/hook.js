const fs = require('fs');
const util = require('util');
const getSize = require('get-folder-size');
const stat = util.promisify(fs.stat);
var path = require('path');

module.exports = function(ctx) {
    // Make sure android platform is part of build
 //   if (!ctx.opts.platforms.includes('ios')) return;

//    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/ios');
//    const apkFileLocation = path.join(platformRoot, 'IntelWebrtc/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework');

//    return stat(apkFileLocation).then(stats => {
//      console.log(`Size of ${apkFileLocation} is ${stats.size} bytes`);
//    });
    
//    console.log("----------------OWT---------------");
//
//
    fs.readdir('./', (err, files) => {
      files.forEach(file => {
        console.log(file);
      });
    });
//
//    console.log("----------------WebRTC---------------");
//
//    fs.readdir('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework', (err, files) => {
//      files.forEach(file => {
//        console.log(file);
//      });
//    });
    
//   console.log("current path : "+ path.join('./platforms/ios/intelwebrtc_ios'));
    
//    getSize('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework/OWT', (err, size) => {
//        if (err) { throw err; }
//
//          console.log(`The folder is ${size} bytes large`);
//          console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
//      });
    
//    stat('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework.zip').then(stats => {
//          console.log(`Size of OWT.framework is ${stats.size} bytes`);
//        });
//
////    getSize('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework/WebRTC', (err, size) => {
//        if (err) { throw err; }
//
//          console.log(`The folder is ${size} bytes large`);
//          console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
//      });
    
//    stat('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework.zip').then(stats => {
//          console.log(`Size of WebRTC.framework is ${stats.size} bytes`);
//        });
//
    
};
