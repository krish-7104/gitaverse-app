import React from 'react';
import {mystore} from './redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './screens/Splash';
import Home from './screens/Home';
import Verse from './screens/Verse';
import LangChange from './screens/LangChange';
import Setting from './screens/Setting';
import Chapter from './screens/Chapter';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={mystore}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chapter" component={Chapter} />
          <Stack.Screen name="Verse" component={Verse} />
          <Stack.Screen name="LangChange" component={LangChange} />
          <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
