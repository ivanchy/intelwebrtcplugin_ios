//
//  intelwebrtcplugin.h
//  IntelWebrtc
//
//  Created by hkt on 31/10/2022.
//


#import "AppDelegate.h"

#import "ConferenceConnectionViewController.h"


@interface AppDelegate (intelwebrtcplugin) <UIApplicationDelegate,OWTConferenceClientDelegate, OWTRemoteMixedStreamDelegate, OWTRemoteStreamDelegate, OWTConferenceParticipantDelegate>

@property (strong, nonatomic) UIWindow *window;
@property (strong, nonatomic) OWTConferenceClient *conferenceClient;
@property (strong, nonatomic) OWTRemoteMixedStream* mixedStream;
@property (strong, nonatomic) OWTRemoteStream* screenStream;
@property (strong, nonatomic) NSString* conferenceId;

@end
