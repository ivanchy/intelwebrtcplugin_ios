/********* intelwebrtcplugin.m Cordova Plugin Implementation *******/


#import <OWT/OWT.h>
#import <WebRTC/WebRTC.h>

#import <objc/runtime.h>

#import "AppDelegate+Intelwebrtcplugin.h"

#import "MainViewController.h"

@interface AppDelegate ()

@end

@implementation AppDelegate (intelwebrtcplugin)



- (void)setConferenceClient:(OWTConferenceClient *)conferenceClient {
    objc_setAssociatedObject(self, "conferenceClient", conferenceClient, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (void)setMixedStream:(OWTRemoteMixedStream *)mixedStream {
    objc_setAssociatedObject(self, "mixedStream", mixedStream, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (OWTRemoteMixedStream *)mixedStream {
    return objc_getAssociatedObject(self, "mixedStream");
}

- (void)setScreenStream:(OWTRemoteStream *)screenStream {
    objc_setAssociatedObject(self, "screenStream", screenStream, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (OWTRemoteStream *)screenStream {
    return objc_getAssociatedObject(self, "screenStream");
}

- (void)setConferenceId:(NSString *)conferenceId {
    objc_setAssociatedObject(self, "conferenceId", conferenceId, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
}

- (NSString *)conferenceId {
    return objc_getAssociatedObject(self, "conferenceId");
}


+ (void)load {
    Method original = class_getInstanceMethod(self, @selector(application:didFinishLaunchingWithOptions:));
    Method swizzled = class_getInstanceMethod(self, @selector(application:swizzledDidFinishLaunchingWithOptions:));
    method_exchangeImplementations(original, swizzled);
}

- (BOOL)application:(UIApplication *)application swizzledDidFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
    // Override point for customization after application launch.
  self.mixedStream = [[OWTRemoteMixedStream alloc] init];
    //[self.window setBackgroundColor:[UIColor colorWithPatternImage:[UIImage imageNamed:@"bg.jpg"]]];
    self.viewController = [[MainViewController alloc] init];
    return [super application:application didFinishLaunchingWithOptions:launchOptions];
    //return YES;
}


- (void)applicationWillResignActive:(UIApplication *)application {
    // Sent when the application is about to move from active to inactive state. This can occur for certain types of temporary interruptions (such as an incoming phone call or SMS message) or when the user quits the application and it begins the transition to the background state.
    // Use this method to pause ongoing tasks, disable timers, and throttle down OpenGL ES frame rates. Games should use this method to pause the game.
}

- (void)applicationDidEnterBackground:(UIApplication *)application {
    // Use this method to release shared resources, save user data, invalidate timers, and store enough application state information to restore your application to its current state in case it is terminated later.
    // If your application supports background execution, this method is called instead of applicationWillTerminate: when the user quits.
}

- (void)applicationWillEnterForeground:(UIApplication *)application {
    // Called as part of the transition from the background to the inactive state; here you can undo many of the changes made on entering the background.
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
    // Restart any tasks that were paused (or not yet started) while the application was inactive. If the application was previously in the background, optionally refresh the user interface.
}

- (void)applicationWillTerminate:(UIApplication *)application {
    // Called when the application is about to terminate. Save data if appropriate. See also applicationDidEnterBackground:.
}

- (OWTConferenceClient*)conferenceClient{
  if (objc_getAssociatedObject(self, "conferenceClient")==nil){
    //NSString* path=[[NSBundle mainBundle]pathForResource:@"audio_long16" ofType:@"pcm"];
    //FileAudioFrameGenerator* generator=[[FileAudioFrameGenerator alloc]initWithPath:path sampleRate:16000 channelNumber:1];
    //[RTCGlobalConfiguration setCustomizedAudioInputEnabled:YES audioFrameGenerator:generator];
    OWTConferenceClientConfiguration* config=[[OWTConferenceClientConfiguration alloc]init];
    NSArray *ice=[[NSArray alloc]initWithObjects:[[RTCIceServer alloc]initWithURLStrings:[[NSArray alloc]initWithObjects:@"stun:61.152.239.47:3478", nil]], nil];
    config.rtcConfiguration=[[RTCConfiguration alloc] init];
    config.rtcConfiguration.iceServers=ice;
    self.conferenceClient=[[OWTConferenceClient alloc]initWithConfiguration:config];
    self.conferenceClient.delegate=self;
  }
  return objc_getAssociatedObject(self, "conferenceClient");
}

-(void)onVideoLayoutChanged{
  NSLog(@"OnVideoLayoutChanged.");
}

-(void)conferenceClient:(OWTConferenceClient *)client didAddStream:(OWTRemoteStream *)stream{
  NSLog(@"AppDelegate on stream added");
  stream.delegate=self;
  if ([stream isKindOfClass:[OWTRemoteMixedStream class]]) {
    self.mixedStream = (OWTRemoteMixedStream *)stream;
    self.mixedStream.delegate=self;
  }
  if(stream.source.video==OWTVideoSourceInfoScreenCast){
    self.screenStream=stream;
  }
  [[NSNotificationCenter defaultCenter] postNotificationName:@"OnStreamAdded" object:self userInfo:[NSDictionary dictionaryWithObject:stream forKey:@"stream"]];
}

-(void)conferenceClientDidDisconnect:(OWTConferenceClient *)client{
  NSLog(@"Server disconnected");
  self.mixedStream = nil;
}

-(void)conferenceClient:(OWTConferenceClient *)client didReceiveMessage:(NSString *)message from:(NSString *)senderId{
  NSLog(@"AppDelegate received message: %@, from %@", message, senderId);
}

- (void)conferenceClient:(OWTConferenceClient *)client didAddParticipant:(OWTConferenceParticipant *)user{
  user.delegate=self;
  NSLog(@"A new participant joined the meeting.");
}

-(void)streamDidEnd:(OWTRemoteStream *)stream{
  NSLog(@"Stream did end");
}

-(void)participantDidLeave:(OWTConferenceParticipant *)participant{
  NSLog(@"Participant left conference.");
}

@end


