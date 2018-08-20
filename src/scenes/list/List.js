import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { observer } from 'mobx-react/native';
import ItemList from './itemList/ItemList';
import addIcon from '../../assets/icons/add.png';
import Button from '../../common/Button';
import styles from './List.styles';
import strings from '../../localization/en/strings';
import colors from '../../helpers/colors';
import scenes from '../../helpers/scenes';
import mobxStore from '../app/stores';

@observer
class List extends React.Component {
  static navigatorStyle = {
    navBarBackgroundColor: colors.blue,
    navBarTextColor: colors.white,
    navBarButtonColor: colors.white,
    statusBarTextColorScheme: 'light',
  };

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'goToDo',
        icon: addIcon,
        buttonColor: colors.white,
        buttonFontSize: 10,
      },
    ],
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }

  onNavigatorEvent = (event) => {
    const { navigator } = this.props;
    if (event.type === 'NavBarButtonPress') {
      if (event.id === 'goToDo') {
        navigator.push({
          screen: scenes.ADD_TODO_SCREEN,
          animated: true,
          animationType: 'fade',
          title: 'Todo',
          passProps: { addToDo: this.addToDo },
          backButtonTitle: 'Cancel',
        });
      }
    }
  }

  renderFooter = () => {
    const {
      footerContainer,
      clearButton,
    } = styles;
    const {
      clearAll,
    } = strings;
    return (
      <View
        style={footerContainer}
      >
        <Button
          onClickAction={mobxStore.clearAllDone}
        >
          <Text
            style={clearButton}
          >
            {clearAll}
          </Text>
        </Button>
      </View>
    );
  }

  render() {
    const {
      navigateAddTodo,
      handleToggle,
      clearAllDone,
    } = this.props;
    return (
      <View>
        <FlatList
          data={mobxStore.items.slice()}
          keyExtractor={item => item.id}
          renderItem={
            ({ item }) => (
              <ItemList
                item={item}
                handleToggle={mobxStore.handleToggle}
              />
            )
          }
          ListFooterComponent={
            this.renderFooter(clearAllDone)
          }
        />
      </View>
    );
  }
}

export default List;