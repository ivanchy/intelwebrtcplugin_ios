/********* intelwebrtcplugin.m Cordova Plugin Implementation *******/


#import <OWT/OWT.h>
#import <WebRTC/WebRTC.h>

#import "Intelwebrtcplugin.h"
//#import "ConferenceConnectionViewController.h"

//@interface intelwebrtcplugin : CDVPlugin{
  // Member variables go here.
//}

//@property (nonatomic,strong) ConferenceConnectionViewController *view;  //声明一个ViewController

//- (void)coolMethod:(CDVInvokedUrlCommand*)command;
//@end

@implementation intelwebrtcplugin

//- (id) init{
//    NSLog(@"=========================初始化");
//    self = [super init];
//    _mixedStream = [[OWTRemoteMixedStream alloc] init];
//    [self.window setBackgroundColor:[UIColor colorWithPatternImage:[UIImage imageNamed:@"bg.jpg"]]];
//    return self;
//}

- (void)pluginInitialize{
    NSLog(@"===========================初始化plugin");
    [super pluginInitialize];
    // 实例化ViewController
    self.view = [[ConferenceConnectionViewController alloc] init];
}

- (void)coolMethod:(CDVInvokedUrlCommand*)command
{
    //CDVPluginResult* pluginResult = nil;
    //NSString* echo = [command.arguments objectAtIndex:0];
    
//    if (echo != nil && [echo length] > 0) {
//        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:echo];
//    } else {
//        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
//    }
//
//    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
    //UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"CDVLaunchScreen" bundle:nil];
    //ConferenceConnectionViewController *yourViewController = [storyboard instantiateViewControllerWithIdentifier:@"conf_connect"] ;
    //[self.viewController                                  : yourViewController animated:YES completion:nil];
    
    //Write here your's storyboard name
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Main" bundle:nil];
    //Now write your next view controller and write your storyboard id.
    ConferenceConnectionViewController *myNewVC = (ConferenceConnectionViewController *)[storyboard instantiateViewControllerWithIdentifier:@"conf_connect"];
    [self.viewController presentViewController:myNewVC animated:YES completion:nil];
    

    //[self.viewController presentViewController:self.view animated:YES completion:nil];
    //CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];;
    //[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
}


@end


