import 'react-native-gesture-handler'; // 이 코드가 제일 첫 줄에 있어야 합니다.
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {MenuProvider} from 'react-native-popup-menu';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {
  getResponsiveWidth,
  getResponsiveHeight,
  getResponsiveFontSize,
  getResponsiveIconSize,
} from './utils/responsive';
import store from './redux/store';
import {Platform} from 'react-native';

// 각 탭(화면)
import CommunicationScreen from './screens/communication/communicationScreen';
import MemoryScreen from './screens/memory/memoryScreen';
import ScheduleScreen from './screens/schedule/scheduleScreen';
import NotificationScreen from './components/notificationScreen';
import KinoChatRoom from './screens/communication/chatRoom/kinoChatRoom';
import OneToOneChatRoom from './screens/communication/chatRoom/oneToOneChatRoom';
import RecChallengeScreen from './screens/memory/challenge/recChallengeScreen';
import RecChallengeDetailScreen from './screens/memory/challenge/recChallengeDetailScreen';
import ChallengeScreen from './screens/memory/challenge/challengeScreen';
import FamilySetupScreen from './assets/images/family/familySetupScreen';
import FamilySetupFinishScreen from './assets/images/family/familySetupFinishScreen';
import OnboardingScreen from './screens/authentication/onboardingScreen';
import CreateFamilyScreen from './assets/images/family/createFamilyScreen';
import FamilyChatRoom from './screens/communication/chatRoom/familyChatRoom';
import GradeScreen from './screens/home/gradeScreen';
import ProfileScreen from './components/profileScreen';
import HomeScreen from './screens/home/hoemScreen';
import FamilySettingScreen from './components/familySettingScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const renderTabBarLabel = (label, focused) => (
  <Text
    style={{
      color: focused ? '#FFC84D' : 'gray',
      fontSize: getResponsiveFontSize(12),
      marginTop: getResponsiveHeight(11),
    }}>
    {label}
  </Text>
);

const renderTabBarIcon = (focused, focusedUri, defaultUri) => (
  <Image
    source={{uri: focused ? focusedUri : defaultUri}}
    style={{
      width: getResponsiveIconSize(25),
      height: getResponsiveIconSize(25),
      marginTop: getResponsiveHeight(15),
      resizeMode: 'contain',
    }} // 여기서 크기를 지정
  />
);

const renderHeaderRight = ({navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate('프로필화면')}>
    <Image
      source={{uri: 'https://i.postimg.cc/QxXMJCnz/Vector-2.jpg'}}
      style={{
        width: getResponsiveWidth(24),
        height: getResponsiveHeight(26),
        marginRight: getResponsiveWidth(30),
        resizeMode: 'contain',
      }}
    />
  </TouchableOpacity>
);

const renderHeaderRightHome = ({navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate('가족화면')}>
    <Image
      source={{uri: 'https://i.postimg.cc/QxXMJCnz/Vector-2.jpg'}}
      style={{
        width: getResponsiveWidth(24),
        height: getResponsiveHeight(26),
        marginRight: getResponsiveWidth(30),
        resizeMode: 'contain',
      }}
    />
  </TouchableOpacity>
);

const renderHeaderLeft = ({navigation}) => (
  <TouchableOpacity onPress={() => navigation.navigate('알림함')}>
    <Image
      source={{uri: 'https://i.postimg.cc/CKW1G4WC/Vector-1.jpg'}}
      style={{
        width: getResponsiveWidth(24),
        height: getResponsiveHeight(26),
        marginLeft: getResponsiveWidth(30),
        resizeMode: 'contain',
      }}></Image>
  </TouchableOpacity>
);

const tabBarStyle = {
  backgroundColor: 'white',
  shadowColor: 'rgba(0, 0, 0, 0.2)',
  shadowOffset: {width: 0, height: -4},
  shadowOpacity: 0.3,
  shadowRadius: getResponsiveHeight(6), // 그림자 반경을 좀 더 키움
  elevation: 20, // Android에서 elevation 값을 크게 설정하여 더 강한 그림자
};

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          borderBottomWidth: 0,
          shadowOpacity: 0,
          elevation: 0,
          height: getResponsiveHeight(110), // 헤더 높이 설정
          overflow: 'visible', // overflow 확인
        },
        headerTitleAlign: 'center',
        headerTitle: () => (
          <Image
            source={{
              uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
            }} // 헤더 이미지
            style={{
              width: getResponsiveWidth(50), // 원하는 크기로 조절
              height: getResponsiveHeight(47),
              paddingBottom:
                Platform.OS === 'ios'
                  ? getResponsiveHeight(10)
                  : getResponsiveHeight(15),
              resizeMode: 'contain', // 이미지 비율 유지
            }}
          />
        ),
        tabBarStyle: tabBarStyle,
      }}>
      {/* 첫 번째 탭: 감정기록 */}
      <Tab.Screen
        name="감정기록"
        component={HomeScreen}
        options={({navigation}) => ({
          tabBarLabel: ({focused}) => renderTabBarLabel('감정기록', focused),
          tabBarIcon: ({focused}) =>
            renderTabBarIcon(
              focused,
              'https://i.postimg.cc/SxNFGjZS/Vector-17.png',
              'https://i.postimg.cc/RFw0KNFS/Vector-20.png',
            ),
          headerRight: () => renderHeaderRightHome({navigation}),
          headerLeft: () => renderHeaderLeft({navigation}),
        })}
      />

      {/* 두 번째 탭: 소통기록 */}
      <Tab.Screen
        name="소통기록"
        component={CommunicationScreen}
        options={({navigation}) => ({
          tabBarLabel: ({focused}) => renderTabBarLabel('소통기록', focused),
          tabBarIcon: ({focused}) =>
            renderTabBarIcon(
              focused,
              'https://i.postimg.cc/zf4cV7s8/Group-1171276556-1.jpg',
              'https://i.postimg.cc/j5NkNNTN/Group-1171276556.jpg',
            ),
          headerRight: () => renderHeaderRight({navigation}),
          headerLeft: () => renderHeaderLeft({navigation}),
        })}
      />

      {/* 세 번째 탭: 일정기록 */}
      <Tab.Screen
        name="일정기록"
        component={ScheduleScreen}
        options={({navigation}) => ({
          tabBarLabel: ({focused}) => renderTabBarLabel('일정기록', focused),
          tabBarIcon: ({focused}) =>
            renderTabBarIcon(
              focused,
              'https://i.postimg.cc/RZHzbYXC/Vector-9.png',
              'https://i.postimg.cc/02K38wmc/Vector-10.png',
            ),
          headerRight: () => renderHeaderRight({navigation}),
          headerLeft: () => renderHeaderLeft({navigation}),
        })}
      />

      {/* 네 번째 탭: 추억기록 */}
      <Tab.Screen
        name="추억기록"
        component={MemoryScreen}
        options={{
          tabBarLabel: ({focused}) => renderTabBarLabel('추억기록', focused),
          tabBarIcon: ({focused}) =>
            renderTabBarIcon(
              focused,
              'https://i.postimg.cc/3NCVXHm0/Vector-16.png',
              'https://i.postimg.cc/sgz4hhgX/Vector-19.png',
            ),
        }}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="온보딩화면">
      {/* Stack Navigator에 채팅방 화면 추가 */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator} // 탭 네비게이터 화면
        options={{headerShown: false}} // 탭 화면에서는 헤더 숨김
      />

      <Stack.Screen
        name="온보딩화면"
        component={OnboardingScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: false,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13), // 이미지 크기 조절
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="가족설정화면"
        component={FamilySetupScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13), // 이미지 크기 조절
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="가족생성화면"
        component={CreateFamilyScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13), // 이미지 크기 조절
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="가족설정완료화면"
        component={FamilySetupFinishScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13), // 이미지 크기 조절
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="알림함"
        component={NotificationScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: '알림함', // 제목 비우기
          headerTitleStyle: {
            fontSize: getResponsiveFontSize(20),
            fontFamily: 'Pretendard-Light',
          },
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13), // 이미지 크기 조절
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="가족화면"
        component={FamilySettingScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                paddingBottom: getResponsiveHeight(10),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13), // 이미지 크기 조절
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="프로필화면"
        component={ProfileScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                paddingBottom: getResponsiveHeight(10),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13), // 이미지 크기 조절
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="등급화면"
        component={GradeScreen}
        options={({navigation}) => ({
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: '',
          headerTitleStyle: {
            fontSize: getResponsiveFontSize(20),
            fontFamily: 'Pretendard-Light',
          },
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13),
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="채팅방화면"
        component={OneToOneChatRoom}
        options={({navigation, chatRoom}) => ({
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: '채팅방',
          headerTitleStyle: {
            fontSize: getResponsiveFontSize(20),
            fontFamily: 'Pretendard-Light',
          },
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13),
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="키노상담소화면"
        component={KinoChatRoom}
        options={({navigation, chatRoom}) => ({
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: '키노상담소', // 제목 비우기
          headerTitleStyle: {
            fontSize: getResponsiveFontSize(20),
            fontFamily: 'Pretendard-Light',
          },
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13),
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />

      <Stack.Screen
        name="가족채팅방화면"
        component={FamilyChatRoom}
        options={({navigation, chatRoom}) => ({
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: '가족채팅방',
          headerTitleStyle: {
            fontSize: getResponsiveFontSize(20),
            fontFamily: 'Pretendard-Light',
          },
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13),
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                  
                }}
              />
            </TouchableOpacity>
          ),
          // headerRight: () => (
          //   <TouchableOpacity>
          //     <Image
          //       source={{
          //         uri: 'https://i.postimg.cc/3ryLhKKF/free-icon-message-5251132.png',
          //       }}
          //       style={{
          //         width: getResponsiveWidth(23),
          //         height: getResponsiveHeight(23),
          //         marginRight: getResponsiveWidth(30),
          //         resizeMode:'contain',
          //       }}></Image>
          //   </TouchableOpacity>
          // ),
        })}
      />

      <Stack.Screen
        name="추천 챌린지"
        component={RecChallengeScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                paddingBottom: getResponsiveHeight(10),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13),
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="추천 챌린지 세부화면"
        component={RecChallengeDetailScreen}
        options={{
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                paddingBottom: getResponsiveHeight(10),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13),
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />

      <Stack.Screen
        name="챌린지 화면"
        component={ChallengeScreen}
        options={({navigation}) => ({
          headerStyle: {
            borderBottomWidth: 0, // 하단 경계선 제거
            shadowOpacity: 0, // 그림자 제거
            elevation: 0, // 안드로이드에서 그림자 제거
            height: getResponsiveHeight(120), // 헤더 높이 설정
            backgroundColor: 'white', // 배경 색상
          },
          headerTitleAlign: 'center', // 제목을 가운데 정렬
          headerTitle: () => (
            <Image
              source={{
                uri: 'https://i.postimg.cc/NGPV5sR9/Group-1171276557-1.jpg',
              }} // 헤더 이미지
              style={{
                width: getResponsiveWidth(50), // 원하는 크기로 조절
                height: getResponsiveHeight(47),
                paddingBottom: getResponsiveHeight(10),
                resizeMode: 'contain', // 이미지 비율 유지
              }}
            />
          ),
          headerShown: true,
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={{uri: 'https://i.postimg.cc/05Ckjx20/Group-441.jpg'}}
                style={{
                  width: getResponsiveWidth(13),
                  height: getResponsiveHeight(26),
                  marginLeft: getResponsiveWidth(30),
                }}
              />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}

export default function MyApp() {
  return (
    <Provider store={store}>
      <MenuProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </MenuProvider>
    </Provider>
  );
}
