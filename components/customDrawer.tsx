import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';

import HouseIcon from '../assets/house.svg';
import HelpIcon from '../assets/help.svg';
import LogoutIcon from '../assets/logout.svg';

interface DrawerItemType {
  label: string;
  icon: React.ComponentType<any>;
  onPress: () => void;
}

const CustomDrawer: React.FC<DrawerContentComponentProps> = (props) => {
  const drawerItems: DrawerItemType[] = [
    {
      label: 'Documents',
      icon: HouseIcon,
      onPress: () => props.navigation.navigate('Document'),
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 50,
              backgroundColor: '#649DD6',
              alignItems: 'center',
              justifyContent: 'center',
              right: 16,
              alignSelf: 'center',
            }}>
            <Text style={{ fontSize: 20, color: '#FFFFFF', fontWeight: '600' }}>VS</Text>
          </View>
          <Text numberOfLines={1} style={styles.profileName}>
            Vangipurappu V. S.
          </Text>
        </View>

        <View style={{ flex: 1, margin: 5 }}>
          {drawerItems.map((item, index) => (
            <View key={index} style={styles.drawerItemContainer}>
              <DrawerItem
                label={item.label}
                onPress={item.onPress}
                icon={({ size }) => <item.icon width={size} height={size} />}
                labelStyle={[styles.drawerItemLabel, { color: '#444CE7' }]}
              />
            </View>
          ))}
        </View>
      </DrawerContentScrollView>

      <View style={styles.footerContainer}>
        <View style={styles.HelpContainer}>
          <DrawerItem
            label="Help"
            onPress={() => {}}
            icon={({ size }) => <HelpIcon width={size} height={size} />}
            labelStyle={styles.drawerItemLabel}
          />
        </View>
        <View style={styles.LogoutContainer}>
          <DrawerItem
            label="Logout"
            onPress={() => props.navigation.navigate('Login')}
            icon={({ size }) => <LogoutIcon width={size} height={size} />}
            labelStyle={[styles.drawerItemLabel, { color: 'red' }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#202124',
    right: 5,
  },
  footerContainer: {
    borderTopWidth: 0,
    paddingVertical: 10,
  },
  drawerItemContainer: {
    width: 220,
    left: 10,
    backgroundColor: '#C4E4FF',
    borderRadius: 16,
    marginVertical: 5,
  },
  HelpContainer: {
    width: 230,
    left: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    marginVertical: 5,
  },
  LogoutContainer: {
    width: 230,
    left: 10,
    backgroundColor: '#f2b0b0',
    borderRadius: 16,
    marginVertical: 5,
  },
  drawerItemLabel: {
    color: '#000',
    right: 20,
  },
});

export default CustomDrawer;
