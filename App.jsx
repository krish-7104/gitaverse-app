import React, {useEffect} from 'react';
import {mystore} from './redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Verse from './screens/Verse';
import LangChange from './screens/LangChange';
import SummaryView from './screens/SummaryView';
import Setting from './screens/Setting';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {ONESIGNAL} from './utils/apiKey';

const App = () => {
  const Stack = createNativeStackNavigator();
  useEffect(() => {
    OneSignal.Debug.setLogLevel(LogLevel.Verbose);
    OneSignal.initialize(ONESIGNAL);
    OneSignal.Notifications.requestPermission(true);
  }, []);
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();
  return (
    <Provider store={mystore}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => {
          routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        }}
        onStateChange={async () => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name;

          if (previousRouteName !== currentRouteName) {
            await analytics().logScreenView({
              screen_name: currentRouteName,
              screen_class: currentRouteName,
            });
          }
          routeNameRef.current = currentRouteName;
        }}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Verse" component={Verse} />
          <Stack.Screen name="LangChange" component={LangChange} />
          <Stack.Screen name="SummaryView" component={SummaryView} />
          <Stack.Screen name="Settings" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
