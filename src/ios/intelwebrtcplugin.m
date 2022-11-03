/********* intelwebrtcplugin.m Cordova Plugin Implementation *******/


#import <OWT/OWT.h>
#import <WebRTC/WebRTC.h>

#import "intelwebrtcplugin.h"
//#import "ConferenceConnectionViewController.h"

//@interface intelwebrtcplugin : CDVPlugin{
  // Member variables go here.
//}

//@property (nonatomic,strong) ConferenceConnectionViewController *view;  //声明一个ViewController

//- (void)coolMethod:(CDVInvokedUrlCommand*)command;
//@end

@implementation intelwebrtcplugin

- (id) init{
    NSLog(@"=========================初始化");
    self = [super init];
    _mixedStream = [[OWTRemoteMixedStream alloc] init];
    [self.window setBackgroundColor:[UIColor colorWithPatternImage:[UIImage imageNamed:@"bg.jpg"]]];
    return self;
}

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
    UIStoryboard *storyboard = [UIStoryboard storyboardWithName:@"Conf_Main" bundle:nil];
    //Now write your next view controller and write your storyboard id.
    ConferenceConnectionViewController *myNewVC = (ConferenceConnectionViewController *)[storyboard instantiateViewControllerWithIdentifier:@"conf_connect"];
    [self.viewController presentViewController:myNewVC animated:YES completion:nil];
    

    //[self.viewController presentViewController:self.view animated:YES completion:nil];
    //CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];;
    //[self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
    
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
  if (_conferenceClient==nil){
    //NSString* path=[[NSBundle mainBundle]pathForResource:@"audio_long16" ofType:@"pcm"];
    //FileAudioFrameGenerator* generator=[[FileAudioFrameGenerator alloc]initWithPath:path sampleRate:16000 channelNumber:1];
    //[RTCGlobalConfiguration setCustomizedAudioInputEnabled:YES audioFrameGenerator:generator];
    OWTConferenceClientConfiguration* config=[[OWTConferenceClientConfiguration alloc]init];
    NSArray *ice=[[NSArray alloc]initWithObjects:[[RTCIceServer alloc]initWithURLStrings:[[NSArray alloc]initWithObjects:@"stun:61.152.239.47:3478", nil]], nil];
    config.rtcConfiguration=[[RTCConfiguration alloc] init];
    config.rtcConfiguration.iceServers=ice;
    _conferenceClient=[[OWTConferenceClient alloc]initWithConfiguration:config];
    _conferenceClient.delegate=self;
  }
  return _conferenceClient;
}

-(void)onVideoLayoutChanged{
  NSLog(@"OnVideoLayoutChanged.");
}

-(void)conferenceClient:(OWTConferenceClient *)client didAddStream:(OWTRemoteStream *)stream{
  NSLog(@"AppDelegate on stream added");
  stream.delegate=self;
  if ([stream isKindOfClass:[OWTRemoteMixedStream class]]) {
    _mixedStream = (OWTRemoteMixedStream *)stream;
    _mixedStream.delegate=self;
  }
  if(stream.source.video==OWTVideoSourceInfoScreenCast){
    _screenStream=stream;
  }
  [[NSNotificationCenter defaultCenter] postNotificationName:@"OnStreamAdded" object:self userInfo:[NSDictionary dictionaryWithObject:stream forKey:@"stream"]];
}

-(void)conferenceClientDidDisconnect:(OWTConferenceClient *)client{
  NSLog(@"Server disconnected");
  _mixedStream = nil;
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


