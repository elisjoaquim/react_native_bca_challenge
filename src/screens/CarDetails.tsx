import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Platform,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { Button, InfoContainer } from '../components/Molecules';
import { CustomText } from '../components/Atoms';
import { Colors } from '../constants/Colors';
import { CarDetailsScreenProps } from './types';

const CARD_IMAGE_PLACEHOLDER = '../../assets/images/car1.jpg';

import Animated from 'react-native-reanimated';
import useVehicles from '../hooks/useVehicles';
import Countdown from '../components/Molecules/Countdown/Countdown';
import { getMissingTime, transformDateToISO } from '../helpers/DateHelpers';
import { formatPriceToCurrency } from '../helpers/StringHelpers';

const CarDetails = ({ navigation, route }: CarDetailsScreenProps) => {
  const { vehicleId } = route.params;

  const { getVehicleById, toggleFavourite } = useVehicles();

  const vehicleInfo = getVehicleById(vehicleId);

  const { isFinished: isCountdownFinished } = getMissingTime(
    vehicleInfo.auctionDateTime,
  );

  const { top } = useSafeAreaInsets();

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <View
        style={[
          styles.buttonHeaderContainer,
          {
            top,
          },
        ]}
      >
        <Button
          iconName="ChevronLeft"
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Button
          iconName="Heart"
          iconFill={vehicleInfo.favourite ? Colors.red : 'transparent'}
          onPress={() => {
            toggleFavourite(vehicleId);
          }}
        />
      </View>
      <ScrollView bounces={false}>
        <View style={styles.header}>
          <View style={styles.bgImageContainer}>
            <Animated.Image
              source={
                vehicleInfo.imageUrl
                  ? { uri: vehicleInfo.imageUrl }
                  : require(CARD_IMAGE_PLACEHOLDER)
              }
              style={styles.bgImage}
              resizeMode="cover"
            />
            {Platform.select({
              ios: <BlurView blurAmount={3} style={StyleSheet.absoluteFill} />,
              android: <View style={styles.bgImageBlurAndroid} />,
            })}
          </View>
          <View style={[StyleSheet.absoluteFill, styles.imageContainer]}>
            <Image
              source={
                vehicleInfo.imageUrl
                  ? { uri: vehicleInfo.imageUrl }
                  : require(CARD_IMAGE_PLACEHOLDER)
              }
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.carInfoBlurredContainer}>
              {Platform.select({
                ios: (
                  <BlurView
                    blurAmount={7}
                    blurType="dark"
                    style={StyleSheet.absoluteFill}
                  />
                ),
                android: <View style={styles.carInfoBlurAndroid} />,
              })}
              <View style={styles.carSimpleDescriptionContainer}>
                <CustomText style={styles.carModelLabel}>
                  {vehicleInfo.make} {vehicleInfo.model}
                </CustomText>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.centered}>
            {!isCountdownFinished ? (
              <>
                <CustomText style={styles.infoHeaders}>
                  Auctions starts in
                </CustomText>
                <Countdown
                  startTime={transformDateToISO(vehicleInfo.auctionDateTime)}
                />
              </>
            ) : (
              <View style={styles.auctionEndedContainer}>
                <CustomText style={styles.auctionEndedText}>
                  Auction ended
                </CustomText>
              </View>
            )}
          </View>

          <InfoContainer title="Specs">
            <View>
              <CustomText>Make: {vehicleInfo.make}</CustomText>
              <CustomText>Engine Size: {vehicleInfo.engineSize}</CustomText>
              <CustomText>Fuel Type: {vehicleInfo.fuel}</CustomText>
              <CustomText>Year: {vehicleInfo.year}</CustomText>
              <CustomText>Mileage: {vehicleInfo.mileage}</CustomText>
            </View>
          </InfoContainer>
          <InfoContainer title="Descriptions">
            <CustomText>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
              vitae odit porro iusto illo laborum sunt magni optio nulla.
              Cupiditate ullam dignissimos autem dolorem ipsa. Officia vero
              animi ex eveniet.
            </CustomText>
          </InfoContainer>
          <InfoContainer title="Bid details">
            <View>
              <CustomText>Bid starts at: </CustomText>
              <CustomText style={styles.bidStartTimeLabel}>
                {formatPriceToCurrency(vehicleInfo.startingBid)}
              </CustomText>
            </View>
          </InfoContainer>
          <TouchableOpacity
            disabled={isCountdownFinished}
            style={[
              styles.placeBidButton,
              { opacity: isCountdownFinished ? 0.5 : 1 },
            ]}
          >
            <CustomText style={styles.placeBidButtonText}>
              Place a bid
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  bgImageContainer: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    overflow: 'hidden',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  bgImageBlurAndroid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.7,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: 100 }],
  },
  image: {
    width: '85%',
    height: '80%',
    borderRadius: 20,
  },
  header: {
    height: 400,
    width: '100%',
    marginBottom: 70,
  },
  carInfoBlurredContainer: {
    position: 'absolute',
    width: '70%',
    bottom: 50,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 10,
  },
  carInfoBlurAndroid: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.black,
    opacity: 0.5,
  },
  carSimpleDescriptionContainer: {
    alignItems: 'center',
    gap: 3,
  },
  carModelLabel: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bidStartTimeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingBottom: 50,
  },
  buttonHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: 0,
    paddingTop: 15,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  infoHeaders: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  centered: {
    alignItems: 'center',
  },
  auctionEndedContainer: {
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 5,
  },
  auctionEndedText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  placeBidButton: {
    padding: 10,
    backgroundColor: Colors.cyanBlue,
    borderRadius: 10,
    marginVertical: 10,
  },
  placeBidButtonText: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CarDetails;
