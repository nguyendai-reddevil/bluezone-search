import {Dimensions, Platform, PixelRatio} from 'react-native';
const guidelineBaseWidth = 360;
const guidelineBaseHeight = 720;

const {width, height} = Dimensions.get('window');
const SMALL_SCREEN = width < guidelineBaseWidth || height < guidelineBaseHeight;
const BIG_SCREEN = width > guidelineBaseWidth || height > guidelineBaseHeight;
const STANDARD_CREEN =
  width === guidelineBaseWidth || height === guidelineBaseHeight;
const SCALE = (size) => (width / guidelineBaseWidth) * size;
const VERTICAL_SCALE = (size) => (height / guidelineBaseHeight) * size;
const MODERATE_SCALE = (size, factor) => size + (SCALE(size) - size) * factor;
const MODERATE_VERTICAL_SCALE = (size, factor) =>
  size + (VERTICAL_SCALE(size) - size) * factor;

function isIphoneX() {
  const dim = Dimensions.get('window');

  return (
    // This has to be iOS
    Platform.OS === 'ios' &&
    // Check either, iPhone X or XR
    (isIPhoneXSize(dim) || isIPhoneXrSize(dim))
  );
}

function isIPhoneXSize(dim) {
  return dim.height === 812 || dim.width === 812;
}

function isIPhoneXrSize(dim) {
  return dim.height === 896 || dim.width === 896;
}

//RESPONSIVE VIEW
const MSCALE = (size, factor) => {
  const newSize = MODERATE_SCALE(size, factor || 1);
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};

//RESPONSIVE FONT
const FS = (size, factor) => {
  const newSize = MODERATE_SCALE(size, factor || 0.6);
  return newSize;
};

export {
  SMALL_SCREEN,
  BIG_SCREEN,
  STANDARD_CREEN,
  SCALE,
  VERTICAL_SCALE,
  MODERATE_SCALE,
  MODERATE_VERTICAL_SCALE,
  MSCALE,
  FS,
  isIphoneX,
};
