import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, View, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { useEffect } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    };
  },
});

// //// START: NEWLY ADDED FUNCTIONS ////
// const allowsNotificationsAsync = async () => {
//   const settings = await Notifications.getPermissionsAsync();
//   return (
//     settings.granted ||
//     settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
//   );
// };

// const requestPermissionsAsync = async () => {
//   return await Notifications.requestPermissionsAsync({
//     ios: {
//       allowAlert: true,
//       allowBadge: true,
//       allowSound: true,
//       allowAnnouncements: true,
//     },
//   });
// };
// //// END: NEWLY ADDED FUNCTIONS ////

export default function App() {
  async function scheduleNotificationHandler() {
    // //// START: CALL FUNCTIONS HERE ////
    // const hasPushNotificationPermissionGranted =
    //   await allowsNotificationsAsync();

    // if (!hasPushNotificationPermissionGranted) {
    //   await requestPermissionsAsync();
    // }
    // //// END: CALL FUNCTIONS HERE ////

    Notifications.scheduleNotificationAsync({
      content: {
        title: "My first local notification!",
        body: "This is the body of the notification",
        data: {
          userName: "Bob",
        },
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        Alert.alert(
          "Permission required!",
          "Psh notification need appropriate permission"
        );
        return;
      }
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log("pushTokenData", pushTokenData);
      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT,
        });
      }
    }
    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("NOTIFICATION RECEIVED", notification);
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("NOTIFICATION RESPONSE RECEIVED", response);
        const userName = response.notification.request.content.data.userName;
        console.log(userName);
      }
    );
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, []);

  function setPushNotificationHandler() {
    fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "ExponentPushToken[ayq_eRJy0FMvX1kBinZbfm]",
        title: "Test - sent from a device",
        body: "This is a test",
      }),
    });
  }
  return (
    <View style={styles.container}>
      <Button
        title="Schedule Notification"
        onPress={scheduleNotificationHandler}
      />
      <Button title="Push Notification" onPress={setPushNotificationHandler} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
