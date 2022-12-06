// This hook expects that the framework dependency is defined on plugin.xml.
// Example:
// <platform name="ios">
//     <!-- .... -->
//     <framework src="path/to/FRAMEWORK_NAME.framework" custom="true" embed="true" />
// </platform>
// For the OutSystems platform it is better to add this hook on both events. As so:
// <platform name="ios">
//     <!-- .... -->
//     <hook type="after_plugin_install" src="path/to/thishook/embed_framework_hook.js" />
//     <hook type="before_build" src="path/to/thishook/embed_framework_hook.js" />
// </platform>

const fs = require('fs');
var path = require('path');
const xcode = require('xcode');

module.exports = function (ctx) {

    // IMPORTANT!!
    // Replace the following var with the correct name of the .framework file to be embed
    //var frameworkName = "OWT.framework"
    const frameworkNames = ["OWT.framework", "WebRTC.framework"];

    
    const platformRoot = path.join(ctx.opts.projectRoot, 'platforms/ios');
    const apkFileLocation = path.join(platformRoot, 'intelwebrtc/Plugins/owt.sample.conference.intelwebrtcplugin');
    //var fs = ctx.requireCordovaModule("fs");
    //var path = ctx.requireCordovaModule("path");
    //var xcode = ctx.requireCordovaModule("xcode");
    //var deferral = ctx.requireCordovaModule('q').defer();

    /**
     * Recursively search for file with the tiven filter starting on startPath
     */
    function searchRecursiveFromPath(startPath, filter, rec, multiple) {
        if (!fs.existsSync(startPath)) {
            console.log("no dir ", startPath);
            return;
        }

        var files = fs.readdirSync(startPath);
        var resultFiles = []
        for (var i = 0; i < files.length; i++) {
            var filename = path.join(startPath, files[i]);
            var stat = fs.lstatSync(filename);
            if (stat.isDirectory() && rec) {
                fromDir(filename, filter); //recurse
            }

            if (filename.indexOf(filter) >= 0) {
                if (multiple) {
                    resultFiles.push(filename);
                } else {
                    return filename;
                }
            }
        }
        if (multiple) {
            return resultFiles;
        }
    }
    
    function fromDir(startPath,filter, rec, multiple){
            if (!fs.existsSync(startPath)){
                console.log("no dir ", startPath);
                return;
            }

            const files=fs.readdirSync(startPath);
            var resultFiles = []
            for(var i=0;i<files.length;i++){
                var filename=path.join(startPath,files[i]);
                var stat = fs.lstatSync(filename);
                if (stat.isDirectory() && rec){
                    fromDir(filename,filter); //recurse
                }

                if (filename.indexOf(filter)>=0) {
                    if (multiple) {
                        resultFiles.push(filename);
                    } else {
                        return filename;
                    }
                }
            }
            if(multiple) {
                return resultFiles;
            }
        }

    /**
     * find a PBXFileReference on the provided project by its name
     */
    function findPbxFileReference(project, pbxFileName) {
        for (var uuid in project.hash.project.objects.PBXFileReference) {
            if (uuid.endsWith("_comment")) {
                continue;
            }
            var file = project.hash.project.objects.PBXFileReference[uuid];

            if (file.name !== undefined && file.name.indexOf(pbxFileName) != -1) {
                return file;
            }
        }
    }
    
    function addRunpathSearchBuildProperty(proj, build) {
          const LD_RUNPATH_SEARCH_PATHS =  proj.getBuildProperty("LD_RUNPATH_SEARCH_PATHS", build);
          if(!LD_RUNPATH_SEARCH_PATHS) {
             proj.addBuildProperty("LD_RUNPATH_SEARCH_PATHS", "\"$(inherited) @executable_path/Frameworks\"", build);
          } else if(LD_RUNPATH_SEARCH_PATHS.indexOf("@executable_path/Frameworks") == -1) {
             var newValue = LD_RUNPATH_SEARCH_PATHS.substr(0,LD_RUNPATH_SEARCH_PATHS.length-1);
             newValue += ' @executable_path/Frameworks\"';
             proj.updateBuildProperty("LD_RUNPATH_SEARCH_PATHS", newValue, build);
          }
       }

    if (process.length >= 5 && process.argv[1].indexOf('cordova') == -1) {
        if (process.argv[4] != 'ios') {
            return; // plugin only meant to work for ios platform.
        }
    }

    //var xcodeProjPath = searchRecursiveFromPath('platforms/ios', '.xcodeproj', false);
    const xcodeProjPath = fromDir('platforms/ios','.xcodeproj', false);
    //var projectPath = xcodeProjPath + '/project.pbxproj';
    const projectPath = xcodeProjPath + '/project.pbxproj';
    console.log("Found", projectPath);

    const proj = xcode.project(projectPath);
    proj.parseSync();
//    proj.parse(function (err) {
//            if(err) {
//                console.log('Error while parsing project');
//            }
    
    //addRunpathSearchBuildProperty(proj, "Debug");
    //addRunpathSearchBuildProperty(proj, "Release");
        
   const groupName = 'Embed Frameworks ' + ctx.opts.plugin.id;
        
   //proj.addBuildPhase(frameworkNames, 'PBXCopyFilesBuildPhase', groupName, proj.getFirstTarget().uuid, 'frameworks');

    // If the build phase doesn't exist, add it
    if (proj.pbxEmbedFrameworksBuildPhaseObj(proj.getFirstTarget().uuid) == undefined) {
        console.log("BuildPhase not found in XCode project. Adding PBXCopyFilesBuildPhase - Embed Frameworks");
        proj.addBuildPhase([], 'PBXCopyFilesBuildPhase', "Embed Frameworks", proj.getFirstTarget().uuid, 'frameworks');
    }

    frameworkNames.forEach(function(frameworkName) {

//    var frameworkPbxFileRef = findPbxFileReference(proj, frameworkName);
//    // Clean extra " on the start and end of the string
//    var frameworkPbxFileRefPath = frameworkPbxFileRef.path;
//    console.log("frameworkPbxFileRefPath : " + frameworkPbxFileRefPath);
     //var frameworkName =   path.basename(frmFileFullPath);
     var frameworkPbxFileRefPath =   `${apkFileLocation}/${frameworkName}`;
    if (frameworkPbxFileRefPath.endsWith("\"")) {
        frameworkPbxFileRefPath = frameworkPbxFileRefPath.substring(0, frameworkPbxFileRefPath.length - 1);
    }
    if (frameworkPbxFileRefPath.startsWith("\"")) {
        frameworkPbxFileRefPath = frameworkPbxFileRefPath.substring(1, frameworkPbxFileRefPath.length);
    }
//
//    // Now remove the framework
//    var removedPbxFile = proj.removeFramework(frameworkPbxFileRefPath, {
//        customFramework: true
//    });
    // Re-add the framework but with embed
        var addedPbxFile;
        if(frameworkName === "OWT.framework"){
              console.log("frameworkName == OWT");
             addedPbxFile = proj.addFramework(frameworkPbxFileRefPath, {
            customFramework: true
            });
        }else if(frameworkName === "WebRTC.framework"){
            console.log("frameworkName == WebRTC");
             addedPbxFile = proj.addFramework(frameworkPbxFileRefPath, {
            customFramework: true,
            embed: true,
            sign: true
            });
        }
        
        if (addedPbxFile){
            console.log("Framework " + frameworkPbxFileRefPath + " added");
        }  else {
            console.log("Framework " + frameworkPbxFileRefPath + " NOT added");
        }

        
    });

    
    fs.writeFileSync(projectPath, proj.writeSync());

    
//    fs.writeFile(proj.filepath, proj.writeSync(), 'utf8', function (err) {
//        if (err) {
//            //deferral.reject(err);
//            console.log("error writing xcodeproj");
//            //return;
//        }else{
//            console.log("finished writing xcodeproj");
//        }
//        //deferral.resolve();
//    });
    
    //return deferral.promise;
};
