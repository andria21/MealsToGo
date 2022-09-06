import React from 'react'
import { AccountBackground, AccountCover, AccountContainer, AuthButton, Title } from '../components/account.styles';
import { Spacer } from '../../../components/spacer/spacer.component';

import LottieView from 'lottie-react-native';

export const AccountScreen = ({ navigation }) => {
  return (
    <AccountBackground>
      <AccountCover />
      <LottieView
        key="animation"
        autoPlay
        loop
        resizeMode='cover'
        source={require("../../../../assets/watermelon.json")}
      />
      <Title>Meals To Go</Title>
      <AccountContainer>
      <AuthButton
      icon="lock-open-outline"
      mode="contained"
      onPress={() => navigation.navigate("Login")}>
        Login
      </AuthButton>
      <Spacer size="large">
      <AuthButton
      icon="email"
      mode="contained"
      onPress={() => navigation.navigate("Register")}>
        Register
      </AuthButton>
      </Spacer>
      </AccountContainer>
    </AccountBackground>
  );
};