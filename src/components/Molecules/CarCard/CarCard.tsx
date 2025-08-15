import { View, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { Colors } from '../../../constants/Colors';
import { CustomText } from '../../Atoms';
import Icon from '../../Atoms/Icon/Icon';
import { ICardProps } from './types';
import { getMissingTime } from '../../../helpers/DateHelpers';
import Animated from 'react-native-reanimated';
import { formatPriceToCurrency } from '../../../helpers/StringHelpers';

const CARD_IMAGE_PLACEHOLDER =
  '../../../../assets/images/car_img_placeholder.jpg';

const CarCard = ({ onPress, item, onFavoritePress }: ICardProps) => {
  const { imageUrl, model, startingBid, auctionDateTime, favourite, id, make } =
    item;
  const { days, hours } = getMissingTime(auctionDateTime);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={() => onFavoritePress?.(id)}
      >
        <Icon
          name="Heart"
          size={18}
          fill={favourite ? Colors.red : 'transparent'}
        />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={
            imageUrl ? { uri: imageUrl } : require(CARD_IMAGE_PLACEHOLDER)
          }
          style={styles.image}
          resizeMode="cover"
        />
      </View>

      <View style={styles.detailsContainer}>
        <CustomText style={styles.modelText}>
          {make} {model}
        </CustomText>
        <View style={styles.row}>
          <CustomText style={styles.detailsText}>Starting bid:</CustomText>
          <CustomText style={styles.boldText}>
            {formatPriceToCurrency(startingBid)}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText style={styles.detailsText}>Auction starts in:</CustomText>
          <CustomText style={styles.boldText}>
            {`${days}d ${hours}h`}
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 8,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    backgroundColor: Colors.white,
    right: 8,
    zIndex: 1,
    padding: 6,
    borderRadius: 50,
  },
  imageContainer: {
    width: '100%',
    height: 130,
    overflow: 'hidden',
    backgroundColor: Colors.cyanBlue,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  detailsContainer: {
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  modelText: {
    fontWeight: 'bold',
  },
  detailsText: {
    fontSize: 11,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default CarCard;
