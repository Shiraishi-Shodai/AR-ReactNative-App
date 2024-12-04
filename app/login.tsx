import React from "react";
import { Text, View } from "react-native";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import {
  CancelledResponse,
  GoogleSignin,
  SignInSuccessResponse,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { StyleSheet } from "react-native";

const Login = () => {
  //   サインアップボタンが押されたとき
  async function onGoogleButtonPress() {
    try {
      const oldUser = GoogleSignin.getCurrentUser();

      if (oldUser) {
        if (oldUser.idToken) {
          await GoogleSignin.clearCachedAccessToken(oldUser.idToken);
        }
      }

      // デバイスがGoogle Playを利用できるか確認
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Googleサインイン画面を表示し、ユーザーにサインインしてもらいます。これにより、idToken が取得されます。
      const userInfo: SignInSuccessResponse | CancelledResponse =
        await GoogleSignin.signIn();

      // キャンセルされたら何もせずにこの関数を抜ける
      if ("cancelled" == userInfo.type) {
        return;
      }
      // ユーザー情報などを暗号化したJWT取得
      const { idToken } = await GoogleSignin.getTokens();

      // Googleの idToken を使って、Firebaseに認証用の資格情報を作成します。
      // AuthCredentialオブジェクトを取得.AuthCredentialは、様々な認証プロバイダ（Google、Facebook、メール/パスワードなど）からの認証情報を統一的に扱うためのオブジェクト
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      //FirebaseにGoogle認証情報を使ってログインします。この際、Firebaseユーザーオブジェクト (userCredential.user) を取得できます。
      await auth().signInWithCredential(googleCredential);
    } catch (e: any) {
      if (e.message == "NETWORK_ERROR") {
        console.log(e.code, e.message);
      }
      console.error(e);
    }
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={onGoogleButtonPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Login;
