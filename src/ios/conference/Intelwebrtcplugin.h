//
//  intelwebrtcplugin.h
//  IntelWebrtc
//
//  Created by hkt on 31/10/2022.
//

#import <UIKit/UIKit.h>
#import "OWT/OWT.h"

#import <Cordova/CDV.h>


#import "ConferenceConnectionViewController.h"

//@interface Conf_AppDelegate : UIResponder <UIApplicationDelegate, OWTConferenceClientDelegate, OWTRemoteMixedStreamDelegate, OWTRemoteStreamDelegate, OWTConferenceParticipantDelegate>
@interface intelwebrtcplugin : CDVPlugin

@property (nonatomic,strong) ConferenceConnectionViewController *view;  //声明一个ViewController
- (void)coolMethod:(CDVInvokedUrlCommand*)command;
@end
