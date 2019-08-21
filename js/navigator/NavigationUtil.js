export default class NavigationUtil {
  static goBack(navigation) {
    navigation.goBack();
  }

  static resetHome(params) {
    const {navigation} = params;
    if (!navigation) {
      console.error('navigation must in params');
      return;
    }
    navigation.navigate('Main');
  }

  static goPage(params, page) {
    const {navigation} = params;
    if (!navigation) {
      console.error('navigation must in params');
      return;
    }
    navigation.navigate(page, {...params});
  }
}
