import React from 'react';
import {mystore} from './redux/store';
import {Provider} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import Verse from './screens/Verse';
import LangChange from './screens/LangChange';
import SummaryView from './screens/SummaryView';
import Setting from './screens/Setting';

const App = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={mystore}>
      <NavigationContainer>
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
