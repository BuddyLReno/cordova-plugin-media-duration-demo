# Cordova Media Plugin Duration Demo
Ionic app demonstrating the use of the new duration update callback for cordova-plugin-media and the difference between the old timer method.

## Why?
If you are running on a fast network like WiFi, duration is easy to obtain.

This is a screenshot from an iPhone X emulator (using a strong wifi connection).

![iPhone X with Strong WiFi](https://i.imgur.com/0NtAIVX.png)

If you are on a shoddy or slow connection, the timer method returns a duration of `-1` everytime it pings for duration and cannot obtain it.  You will then have to set an interval or timeout to constantly ping for it.  

This is a screenshot of the same iPhone X emulator connected to a 3G like network using Apple's Network Link Conditioner.

![iPhone X with 3G connection](https://i.imgur.com/na6I8cX.png)

The duration is not immediately available so it has to run a few times before it can actually obtain it. Recent changes in background processing on Android devices can prevent the setInterval or setTimeout method from working properly after about 5 minutes in the background. Both durations will become available at roughly the same time, but the update callback is more reliable.

## Testing on iOS

```
$ npm i -g ionic cordova
$ npm i // local dependencies
$ ionic cordova emulate ios
```

**Note:** The iOS build will likely fail as you will need to open the project and select a development team.  After doing so, re-run `$ ionic cordova build ios`.

## Testing on Android

```
$ npm i -g ionic cordova
$ npm i // local dependencies
$ ionic cordova emulate android
```

**Note:** You may need to have the android emulator started before it will properly attach to the emulator.
