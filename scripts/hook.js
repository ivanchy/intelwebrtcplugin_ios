const fs = require('fs');
const util = require('util');
const getSize = require('get-folder-size');
const stat = util.promisify(fs.stat);
var path = require('path');

const admZip = require('adm-zip');
const request = require('superagent');

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
//    fs.readdir('./plugins/owt.sample.conference.intelwebrtcplugin/src/ios/libs', (err, files) => {
//      files.forEach(file => {
//        console.log(file);
//      });
//    });
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
    
//    stat('./plugins/owt.sample.conference.intelwebrtcplugin/src/ios/libs/OWT.framework/OWT').then(stats => {
//          console.log(`Size of OWT.framework is ${stats.size} bytes`);
//        });
//
//    stat('./plugins/owt.sample.conference.intelwebrtcplugin/src/ios/libs/WebRTC.framework/WebRTC').then(stats => {
//          console.log(`Size of WebRTC.framework is ${stats.size} bytes`);
//        });
//    getSize('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework/WebRTC', (err, size) => {
//        if (err) { throw err; }
//
//          console.log(`The folder is ${size} bytes large`);
//          console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
//      });

//
    
    const href_webrtc = `https://github.com/ivanchy/intelwebrtcplugin_ios/raw/main/src/ios/libs/WebRTC.framework.zip`;
    const zipFile_webrtc = 'WebRTC.framework.zip';
    const source_webrtc = `${href_webrtc}`;
    const outputDir_webrtc = './platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin';
    console.log('href', href_webrtc);
    console.log('source', source_webrtc);
    console.log('outputDir', outputDir_webrtc);

    request
      .get(source_webrtc)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile_webrtc))
      .on('finish', function() {
        console.log('finished dowloading');
        var zip_webrtc = new admZip(zipFile_webrtc);
        console.log('start unzip');
          zip_webrtc.extractAllTo(/*target path*/ outputDir_webrtc, /*overwrite*/ true);
        console.log('finished unzip');
      });
    
    
    
    const href = `https://github.com/ivanchy/intelwebrtcplugin_ios/raw/main/src/ios/libs/OWT.framework.zip`;
    const zipFile = 'OWT.framework.zip';
    const source = `${href}`;
    const outputDir = './platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin';
    console.log('href', href);
    console.log('source', source);
    console.log('outputDir', outputDir);

    request
      .get(source)
      .on('error', function(error) {
        console.log(error);
      })
      .pipe(fs.createWriteStream(zipFile))
      .on('finish', function() {
        console.log('finished dowloading');
        var zip = new admZip(zipFile);
        console.log('start unzip');
        zip.extractAllTo(/*target path*/ outputDir, /*overwrite*/ true);
        console.log('finished unzip');
      });
    
        console.log("----------------OWT---------------");
    
        getSize('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/OWT.framework', (err, size) => {
            if (err) { throw err; }
    
              console.log(`The folder is ${size} bytes large`);
              console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
          });
    
        console.log("----------------WebRTC---------------");
    
        getSize('./platforms/ios/intelwebrtc_ios/Plugins/owt.sample.conference.intelwebrtcplugin/WebRTC.framework', (err, size) => {
            if (err) { throw err; }
    
              console.log(`The folder is ${size} bytes large`);
              console.log(`That is the same as ${(size / 1000 / 1000).toFixed(2)} MB`);
          });
    
};
