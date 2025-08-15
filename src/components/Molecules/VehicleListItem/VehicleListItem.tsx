import { TouchableOpacity, View, Image, StyleSheet } from 'react-native';
import { Colors } from '../../../constants/Colors';
import {
  formatPriceToCurrency,
  highlightMatchingString,
} from '../../../helpers/StringHelpers';
import { TVehicles } from '../../../redux/store/reducers/vehicleReducer/type';
import { CustomText } from '../../Atoms';
import { memo } from 'react';

const CARD_IMAGE_PLACEHOLDER =
  '../../../../assets/images/car_img_placeholder.jpg';

const VehicleListItem = memo(
  ({
    item,
    searchTerm,
    onPress,
  }: {
    item: TVehicles;
    searchTerm: string;
    onPress?: (id: number) => void;
  }) => {
    const {
      firstPart: makeFirstPart,
      highLighted: makeHighLighted,
      lastPart: makeLastPart,
      text: makeText,
    } = highlightMatchingString(item.make, searchTerm);

    const {
      firstPart: modelFirstPart,
      highLighted: modelHighLighted,
      lastPart: modelLastPart,
      text: modelText,
    } = highlightMatchingString(item.model, searchTerm);

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPress?.(item.id)}
      >
        <Image
          source={
            item.imageUrl
              ? { uri: item.imageUrl }
              : require(CARD_IMAGE_PLACEHOLDER)
          }
          style={styles.itemImage}
        />
        <View style={styles.itemDetails}>
          <View style={styles.row}>
            <CustomText style={styles.boldText}>Make:</CustomText>
            <CustomText style={styles.makeModelText}>
              {makeFirstPart || makeText}
            </CustomText>
            {makeHighLighted && (
              <CustomText
                style={[styles.highlightedText, styles.makeModelText]}
              >
                {makeHighLighted}
              </CustomText>
            )}
            <CustomText style={styles.makeModelText}>{makeLastPart}</CustomText>
          </View>
          <View style={styles.row}>
            <CustomText style={styles.boldText}>Model:</CustomText>
            <CustomText style={styles.makeModelText}>
              {modelFirstPart || modelText}
            </CustomText>
            {modelHighLighted && (
              <CustomText
                style={[styles.highlightedText, styles.makeModelText]}
              >
                {modelHighLighted}
              </CustomText>
            )}
            <CustomText style={styles.makeModelText}>
              {modelLastPart}
            </CustomText>
          </View>
          <View style={styles.row}>
            <CustomText style={styles.boldText}>Year:</CustomText>
            <CustomText>{item.year}</CustomText>
          </View>
        </View>
        <View style={styles.bidContainer}>
          <CustomText style={styles.boldText}>Starting Bid</CustomText>
          <CustomText>{formatPriceToCurrency(item.startingBid)}</CustomText>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
    backgroundColor: Colors.white,
    padding: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    flexDirection: 'column',
    gap: 0,
  },
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  boldText: {
    fontWeight: 'bold',
  },
  bidContainer: {
    marginLeft: 'auto',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  highlightedText: {
    backgroundColor: Colors.cyanBlue,
  },
  makeModelText: {
    marginRight: -4,
  },
});

export default VehicleListItem;
