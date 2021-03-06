/*
 * @Project Bluezone
 * @Author Bluezone Global (contact@bluezone.ai)
 * @Createdate 04/26/2020, 16:36
 *
 * This file is part of Bluezone (https://bluezone.ai)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

'use strict';

import Service from './core/apis/service';
import {
  getConfiguration as getConfigurationAPI,
  registerTokenFirebase as registerTokenFirebaseApi,
  retryRegisterTokenFirebase as retryRegisterTokenFirebaseApi,
  retryRegisterTokenFirebaseAgain as retryRegisterTokenFirebaseAgainApi,
  retryUpdateTokenFirebase as retryUpdateTokenFirebaseApi,
  updateTokenFirebase as updateTokenFirebaseApi,
} from './core/apis/bluezone';
import {
  setConfiguration as setConfigurationStorage,
  setLanguage as setLanguageStorage,
  setPhoneNumber as setPhoneNumberStorage,
  setStatusNotifyRegister as setStatusNotifyRegisterStorage,
  setTokenFirebase as setTokenFirebaseStorage,
  multiGet,
} from './core/storage';
import {getTokenFirebase} from './core/fcm';
import {
  scheduleNotificationChangeLanguageListener,
  scheduleNotificationSetConfigurationListener,
} from './core/notifyScheduler';
import log from './core/log';
import * as msg from './const/log';

const configuration = {
  PhoneNumber: '',
  LinkQRAndroid:
    'https://play.google.com/store/apps/details?id=com.mic.bluezone',
  LinkQRIOS: 'https://apps.apple.com/us/app/bluezone/id1508062685?ls=1',
  LinkShareAndroid:
    'https://play.google.com/store/apps/details?id=com.mic.bluezone',
  LinkShareIOS: 'https://apps.apple.com/us/app/bluezone/id1508062685?ls=1',
  Introduce: 'https://bluezone.vn',
  Introduce_en: 'https://bluezone.ai',
  TimeSaveLog: 10000,
  TimeShowLog: 30000,
  RssiThreshold: -88, //  -69,
  RssiThreshold_Android_Android: -86,
  RssiThreshold_Android_iOS: -69,
  RssiThreshold_iOS_Android: -88,
  RssiThreshold_iOS_iOS: -74,
  PeriodDay: 14,
  DbMaxRow: 100000,
  DbMaxDay: 180,
  ScanBleRun: 40000,
  ScanBleSleep: 260000,
  BroadcastBleRun: 15000,
  BroadcastBleSleep: 15000,
  ScanDevicesRun: 40000,
  ScanDevicesSleep: 260000,
  MaxNumberSubKeyPerDay: 96,
  Beta: true,
  ShareAppText: 'Chia s??? ???ng d???ng',
  ShareAppText_en: 'Share the app',
  JoinGroupFaceText: 'Tham gia group tr??n Facebook',
  JoinGroupFaceText_en: 'Join the group on Facebook',
  ShareMessageText:
    'B??? Y t???: B???o v??? m??nh, b???o v??? c???ng ?????ng ch???ng COVID-19 ????a cu???c s???ng tr??? l???i b??nh th?????ng. B???n ???? c??i ???ng d???ng ph??t hi???n ti???p x??c g???n Bluezone v?? c??i ti???p cho 3 ng?????i kh??c ch??a? C??i ?????t t???i www.Bluezone.gov.vn \n\n#Ungdungphathientiepxucgan\n#Bluezone\n#Baoveminh\n#Baovecongdong\n#Caicho3nguoi',
  ShareMessageText_en:
    'Ministry of Health: Protect yourself, protect the community against COVID-19, bringing life back to normal. Have you installed Close  application Bluezone and got 3 others to install the app? Get the app at www.Bluezone.ai \n\n#Closecontactdetectorapp\n#Bluezone\n#Protectyourself\n#Protectcommunity\n#Installfor3people',
  NOTIFI_BLE_IOS_TEXT:
    'Bluezone kh??ng th??? ghi nh???n c??c "ti???p x??c g???n" v?? thi???t b??? ch??a B???t Bluetooth.\n\nBluezone s??? d???ng Bluetooth n??ng l?????ng th???p BLE. C??ng ngh??? n??y kh??ng t???n pin ngay c??? khi lu??n b???t.\n\nB???n c???n b???t Bluetooth b???ng c??ch v??o B???ng ??i???u khi???n ho???c v??o C??i ?????t ????? c???u h??nh.',
  NOTIFI_BLE_IOS_TEXT_en:
    'Bluezone cannot record "close contact" because the device has not turned Bluetooth on.\n\nBluezone uses Bluetooth Low Energy (BLE). This technology does not drain the battery even when it is turned on.\n\nYou need to turn on Bluetooth by going to Control Panel or Settings to configure.',
  NOTIFI_PERMISSION_BLE_IOS_TEXT:
    'Bluezone s??? d???ng Bluetooth n??ng l?????ng th???p BLE ????? ghi nh???n nh???ng ng?????i "ti???p x??c g???n" v???i b???n. C??ng ngh??? n??y kh??ng t???n pin ngay c??? khi lu??n b???t.\n\nB???n c???n c???p quy???n truy c???p Bluetooth ????? c?? th??? ghi nh???n c??c "ti???p x??c g???n".',
  NOTIFI_PERMISSION_BLE_IOS_TEXT_en:
    'Bluezone uses Bluetooth Low Energy BLE to recognize people who are in "close contact" with you. This technology does not drain the battery even when it is turned on.\n\nYou need to agree to turn on Bluetooth to record "close contact".',
  NOTIFI_PERMISSION_TEXT:
    'B???n c???n ?????ng ?? c???p quy???n th??ng b??o ????? ???ng d???ng c?? th??? g???i c???nh b??o n???u b???n "ti???p x??c g???n" ng?????i nhi???m COVID-19 trong t????ng lai.',
  NOTIFI_PERMISSION_TEXT_en:
    'You need to accept notification permission so that the application can send alerts if you have ???close contact" with people infected with COVID-19 in the future.',
  NOTIFI_PERMISSION_LOCATION_ANDROID_TEXT:
    'Bluezone kh??ng s??? d???ng v??? tr?? c???a thi???t b???. Bluezone ch??? b???t Bluetooth n??ng l?????ng th???p BLE ????? ghi nh???n c??c "ti???p x??c g???n".\n\nM???c d?? v???y, theo ch??nh s??ch c???a Google, khi b???t Bluetooth BLE thi???t b??? s??? t??? ?????ng ????? ngh??? truy c???p v??? tr?? thi???t b???, ngay c??? khi Bluezone kh??ng s??? d???ng t???i quy???n ????.\n\nB???n c???n c???p quy???n ????? c?? th??? ghi nh???n c??c "ti???p x??c g???n"',
  NOTIFI_PERMISSION_LOCATION_ANDROID_TEXT_en:
    'Bluezone does not use the device location. Bluezone only turns on Bluetooth Low Energy (BLE) to record "close contact".\n\nHowever, according to Google policy, when BLE is turned on the device will automatically offer to access the device location, even if Bluezone does not use that permission.\n\nYou need to accept the permission to record "close contact".',
  NOTIFI_LOCATION_ANDROID_TEXT:
    'Bluezone kh??ng th??? ghi nh???n c??c "ti???p x??c g???n" v?? thi???t b??? ch??a B???t v??? tr??.\n\nBluezone ch??? s??? d???ng Bluetooth n??ng l?????ng th???p BLE ????? ghi nh???n c??c "ti???p x??c g???n". Tuy nhi??n, theo ch??nh s??ch c???a Google, khi b???t Bluetooth BLE thi???t b??? s??? t??? ?????ng ????? ngh??? truy c???p v??? tr?? thi???t b???, ngay c??? khi Bluezone kh??ng s??? d???ng t???i quy???n ????.\n\nB???n c???n c???p quy???n B???t v??? tr?? ????? c?? th??? ghi nh???n c??c "ti???p x??c g???n".',
  NOTIFI_LOCATION_ANDROID_TEXT_en:
    'Bluezone cannot record "close contact" because the device has not enabled location.\n\nBluezone only turns on Bluetooth Low Energy (BLE) to record "close contact". However, according to Google policy, when BLE is turned on the device will automatically offer the access to device location, even if Bluezone does not use that permission.\n\nYou need to accept the permission to enable location to record "close contact".',
  NOTIFI_PERMISSION_WRITE_FILE_TEXT:
    'Bluezone ch??? s??? d???ng quy???n "truy c???p t???p" ????? ghi l???ch s??? "ti???p x??c g???n" l??n b??? nh??? thi???t b???.\n\nM???c d?? v???y, theo ch??nh s??ch c???a Google, thi???t b??? v???n t??? ?????ng ????? ngh??? "cho ph??p truy c???p v??o ???nh, ph????ng ti???n v?? t???p" ngay c??? khi Bluezone kh??ng s??? d???ng c??c quy???n c??n l???i.\n\nB???n c???n c???p quy???n ????? c?? th??? ghi nh???n c??c "ti???p x??c g???n".',
  NOTIFI_PERMISSION_WRITE_FILE_TEXT_en:
    'Bluezone only uses ???access to file" permission to write the history of "close contact??? on device memory.\n\nHowever, according to Google policy, the device automatically recommends "access to photos, media and files??? even if Bluezone does not use the two first permissions.\n\nYou need to accept permissions to record "close contact".',
  NOTIFI_BLUETOOTH_ANDROID_TEXT:
    'Bluezone kh??ng th??? ghi nh???n c??c "ti???p x??c g???n" v?? thi???t b??? ch??a B???t Bluetooth.\n\nBluezone s??? d???ng Bluetooth n??ng l?????ng th???p BLE. C??ng ngh??? n??y kh??ng t???n pin ngay c??? khi lu??n b???t.\n\nB???n c???n b???t Bluetooth b???ng c??ch v??o B???ng ??i???u khi???n ho???c v??o C??i ?????t ????? c???u h??nh.',
  NOTIFI_BLUETOOTH_ANDROID_TEXT_en:
    'Bluezone cannot record "close contact" because the device has not turned Bluetooth on.\n\nBluezone uses Bluetooth Low Energy (BLE). This technology does not drain the battery even when it is turned on.\n\nYou need to turn on Bluetooth by going to Control Panel or Settings to configure.',
  NOTIFI_PERMISSION_BLOCK_LOCATION_ANDROID_TEXT:
    'Bluezone kh??ng th??? ghi nh???n c??c "ti???p x??c g???n" v?? thi???t b??? ch??a B???t v??? tr??.\n\nBluezone ch??? s??? d???ng Bluetooth n??ng l?????ng th???p BLE ????? ghi nh???n c??c "ti???p x??c g???n". Tuy nhi??n, theo ch??nh s??ch c???a Google, khi b???t Bluetooth BLE thi???t b??? s??? t??? ?????ng ????? ngh??? truy c???p v??? tr?? thi???t b???, ngay c??? khi Bluezone kh??ng s??? d???ng t???i quy???n ????.\n\nB???n c???n c???p quy???n B???t v??? tr?? b???ng c??ch v??o "C??i ?????t / ???ng d???ng / Bluezone / Quy???n"',
  NOTIFI_PERMISSION_BLOCK_LOCATION_ANDROID_TEXT_en:
    'Bluezone cannot record "close contact" because the device has not turned on Location.\n\nBluezone only turns on Bluetooth Low Energy (BLE) to record "close contact". However, according to Google policy, when BLE is turned on the device will automatically offer the access to device location, even if Bluezone does not use that permission.\n\nYou need to accept the permission to turn on location by going to "Settings / Applications / Bluezone / Permissions".',
  NOTIFI_PERMISSION_WRITE_FILE_BLOCK_TEXT:
    'Bluezone kh??ng th??? ghi nh???n c??c "ti???p x??c g???n" v?? thi???t b??? ch??a B???t quy???n truy c???p t???p.\n\nM???c d?? v???y, theo ch??nh s??ch c???a Google, thi???t b??? v???n t??? ?????ng ????? ngh??? "cho ph??p truy c???p v??o ???nh, ph????ng ti???n v?? t???p" ngay c??? khi Bluezone kh??ng s??? d???ng c??c quy???n c??n l???i.\n\nB???n c???n c???p quy???n B???t l??u tr??? b???ng c??ch v??o "C??i ?????t / ???ng d???ng / Bluezone / Quy???n"',
  NOTIFI_PERMISSION_WRITE_FILE_BLOCK_TEXT_en:
    'Bluezone cannot record "close contact" because the device has not enabled access to file.\n\nHowever, according to Google policy, the device automatically recommends "access to photos, media and files??? even if Bluezone does not use the two first permissions.\n\nYou need to accept the permissions to enable storage by going to "Settings / pplications / Bluezone / Permissions".',
  LinkGroupFace: 'http://facebook.com/groups/bluezonevn',
  LinkGroupFace_en: 'http://facebook.com/groups/bluezonevn',
  TimeEnableBluetooth: 300000,
  BatteryEnableBluetooth: 15,
  Notifications: [],
  PermissionNotificationsAndroid: [],
  PermissionNotificationsIos: [],
  Language: null,
  ScheduleNotifyDay: 1,
  ScheduleNotifyHour: [8, 13, 20],
  TimeCountDownOTP: 900,
  TurnContact: {
    vi: {
      id: '38',
      index: 16,
    },
    en: {
      id: '39',
      index: 15,
    },
  },

  // L??u g???i AsyncStorage
  TokenFirebase: '',
  Register_Phone: 'FirstOTP',
  FirstOTP: null,
  StatusNotifyRegister: null,
  SupportPhoneNumber: '0888128896',
  LinkDetail: 'https://www.bluezone.gov.vn',
  LinkDetailEn: 'https://bluezone.ai/',
  LinkRulesVi: 'https://bluezone.gov.vn/dieu-khoan-su-dung',
  LinkRulesEn: 'https://bluezone.ai/terms-of-use',
  MailTo: 'lienhe@bluezone.gov.vn',
  ScheduleRegisterNotification: {
    itemRepeat: [
      {
        id: '100',
        dayStartTime: 28800000,
        repeatTime: 86400000,
      },
      {
        id: '102',
        dayStartTime: 32400000,
        repeatTime: 86400000,
      },
      {
        id: '104',
        dayStartTime: 36000000,
        repeatTime: 86400000,
      },
      {
        id: '106',
        dayStartTime: 39600000,
        repeatTime: 86400000,
      },
      {
        id: '108',
        dayStartTime: 43200000,
        repeatTime: 86400000,
      },
      {
        id: '110',
        dayStartTime: 46800000,
        repeatTime: 86400000,
      },
      {
        id: '112',
        dayStartTime: 50400000,
        repeatTime: 86400000,
      },
      {
        id: '114',
        dayStartTime: 54000000,
        repeatTime: 86400000,
      },
      {
        id: '116',
        dayStartTime: 57600000,
        repeatTime: 86400000,
      },
      {
        id: '118',
        dayStartTime: 61200000,
        repeatTime: 86400000,
      },
      {
        id: '119',
        dayStartTime: 64800000,
        repeatTime: 86400000,
      },
      {
        id: '119',
        dayStartTime: 72000000,
        repeatTime: 86400000,
      },
      {
        id: '119',
        dayStartTime: 75600000,
        repeatTime: 86400000,
      },
    ],
    title: 'C???p nh???t s??? ??i???n tho???i.',
    titleEn: 'Declare your phone number.',
    message: 'B???n h??y v??o ???ng d???ng v?? c???p nh???t s??? ??i???n tho???i nh??.',
    messageEn: 'Please open Bluezone and add your mobile number.',
    bigText: 'B???n h??y v??o ???ng d???ng v?? c???p nh???t s??? ??i???n tho???i nh??.',
    bigTextEn: 'Please open Bluezone and add your mobile number.',
  },
  ScheduleUpdateAppNotification: {
    itemRepeat: [
      {
        id: '102',
        dayStartTime: 32400000,
        repeatTime: 86400000,
      },
    ],
    title: 'Phi??n b???n m???i.',
    titleEn: 'New version.',
    message: '???? c?? phi??n b???n m???i. B???n h??y truy c???p ???ng d???ng ????? c???p nh???t.',
    messageEn: 'New version is available. Please open Bluezone to get the update.',
    bigText: '???? c?? phi??n b???n m???i. B???n h??y truy c???p ???ng d???ng ????? c???p nh???t.',
    bigTextEn: 'New version is available. Please open Bluezone to get the update.',
  },
  AndroidScanNotification: {
    title: 'Bluezone ??ang kh??ng th??? ho???t ?????ng ch??nh x??c !',
    titleEn: 'Bluezone not working properly !',
    message: 'Bluetooth c???n ???????c b???t ????? Bluezone c?? th??? c???nh b??o t???i b???n.',
    messageEn: 'Bluetooth needs to be turned on for Bluezone to send you the alerts.',
    bigText: 'Bluetooth c???n ???????c b???t ????? Bluezone c?? th??? c???nh b??o t???i b???n.',
    bigTextEn: 'Bluetooth needs to be turned on for Bluezone to send you the alerts.',
  },
  iOSScanNotification: {
    title: 'Bluezone ??ang kh??ng th??? ho???t ?????ng ch??nh x??c !',
    titleEn: 'Bluezone not working properly !',
    message: 'Bluetooth c???n ???????c b???t ????? Bluezone c?? th??? c???nh b??o t???i b???n.',
    messageEn: 'Bluetooth needs to be turned on for Bluezone to send you the alerts.',
    bigText: 'Bluetooth c???n ???????c b???t ????? Bluezone c?? th??? c???nh b??o t???i b???n.',
    bigTextEn: 'Bluetooth needs to be turned on for Bluezone to send you the alerts.',
  },
  AndroidEnableBluetoothNotification: {
    title: 'Bluezone ??ang kh??ng th??? ho???t ?????ng ch??nh x??c.',
    titleEn: 'Bluezone not working properly.',
    message: 'Bluetooth ???? t???t. Bluetooth s??? t??? ?????ng b???t l???i sau 1 ti???ng n???a.',
    messageEn:
      'Bluetooth is off. Bluezone will automatically turn Bluetooth on in 1 hour.',
    bigText: 'Bluetooth ???? t???t. Bluetooth s??? t??? ?????ng b???t l???i sau 1 ti???ng n???a.',
    bigTextEn:
      'Bluetooth is off. Bluezone will automatically turn Bluetooth on in 1 hour.',
    buttonText: 'B???t Bluetooth',
    buttonTextEn: 'Enable Bluetooth',
  },
  TimeAutoEnableBluetooth: 3600000,
};

const _defaultFunc = () => {};

const mergeConfiguration = (
  configObject,
  TokenFirebase,
  Language,
  FirstOTP,
  StatusNotifyRegister,
  PhoneNumber,
) => {
  Object.assign(configuration, configObject, {
    TokenFirebase: TokenFirebase || '',
    Language: Language || 'vi',
    FirstOTP: FirstOTP || null,
    StatusNotifyRegister: StatusNotifyRegister || null,
    PhoneNumber: PhoneNumber || '',
  });
};

const initConfiguration = async callBack => {
  multiGet([
    'Configuration',
    'TokenFirebase',
    'Language',
    'FirstOTP',
    'StatusNotifyRegister',
    'PhoneNumber',
  ]).then(results => {
    const {
      Configuration,
      TokenFirebase,
      Language,
      FirstOTP,
      StatusNotifyRegister,
      PhoneNumber,
    } = results;

    console.log('TokenFirebase', TokenFirebase);
    mergeConfiguration(
      Configuration,
      TokenFirebase,
      Language,
      FirstOTP,
      StatusNotifyRegister,
      PhoneNumber,
    );

    callBack(configuration);
  });
};

/**
 * Luu so dien thoai
 * @param PhoneNumber
 */
const setPhoneNumber = PhoneNumber => {
  if (!PhoneNumber) {
    throw new Error('setPhoneNumber::PhoneNumber is required !');
  }
  Object.assign(configuration, {PhoneNumber});
  setPhoneNumberStorage(PhoneNumber);
};

/**
 * Luu ngon ngu hien tai
 * @param Language
 */
const setLanguage = Language => {
  Object.assign(configuration, {Language});
  setLanguageStorage(Language);
  Service.setLanguage(Language);
  scheduleNotificationChangeLanguageListener(Language);
};

// TODO xem xet bo ham nay di
const setStatusNotifyRegister = StatusNotifyRegister => {
  Object.assign(configuration, {StatusNotifyRegister});
  setStatusNotifyRegisterStorage(StatusNotifyRegister);
};

/**
 * Dang ki token firebase voi server. Thanh cong thi luu vao cau hinh.
 * @param TokenFirebase
 * @param success
 * @param failure
 * @description Chi dung local, khong export ham nay
 */
const registerTokenFirebase = (
  TokenFirebase,
  success = _defaultFunc,
  failure = _defaultFunc,
) => {
  const _success = data => {
    Object.assign(configuration, {TokenFirebase});
    setTokenFirebaseStorage(TokenFirebase);

    success(data);
  };
  registerTokenFirebaseApi(TokenFirebase, _success, failure);
};

/**
 * Dang ki token firebase voi server, cho phep thu lai neu co loi xay ra. Thanh cong thi luu vao cau hinh.
 * @param TokenFirebase
 * @param success
 * @param failure
 * @param timeRetry
 * @description Chi dung local, khong export ham nay
 */
const retryRegisterTokenFirebase = (
  TokenFirebase,
  success = _defaultFunc,
  failure = _defaultFunc,
  timeRetry,
) => {
  const _success = data => {
    Object.assign(configuration, {TokenFirebase});
    setTokenFirebaseStorage(TokenFirebase);

    success(data);
  };
  retryRegisterTokenFirebaseApi(TokenFirebase, _success, failure, timeRetry);
};

/**
 * Cap nhat token firebase voi server. Thanh cong thi luu vao cau hinh.
 * @param TokenFirebaseNew
 * @param TokenFirebaseOld
 * @param success
 * @param failure
 * @description Chi dung local, khong export ham nay
 */
const updateTokenFirebase = (
  TokenFirebaseNew,
  TokenFirebaseOld,
  success = _defaultFunc,
  failure = _defaultFunc,
) => {
  const _success = data => {
    Object.assign(configuration, {TokenFirebase: TokenFirebaseNew});
    setTokenFirebaseStorage(TokenFirebaseNew);

    success(data);
  };

  updateTokenFirebaseApi(TokenFirebaseNew, TokenFirebaseOld, _success, failure);
};

/**
 * Cap nhat token firebase voi server, cho phep thu lai neu co loi xay ra. Thanh cong thi luu vao cau hinh.
 * @param TokenFirebaseNew
 * @param TokenFirebaseOld
 * @param success
 * @param failure
 * @param timeRetry
 * @description Chi dung local, khong export ham nay
 */
const retryUpdateTokenFirebase = (
  TokenFirebaseNew,
  TokenFirebaseOld,
  success = _defaultFunc,
  failure = _defaultFunc,
  timeRetry,
) => {
  const _success = data => {
    Object.assign(configuration, {TokenFirebase: TokenFirebaseNew});
    setTokenFirebaseStorage(TokenFirebaseNew);

    success(data);
  };
  retryUpdateTokenFirebaseApi(
    TokenFirebaseNew,
    TokenFirebaseOld,
    _success,
    failure,
    timeRetry,
  );
};

/**
 * Dang ki lai token firebase voi server, cho phep thu lai neu co loi xay ra. Thanh cong thi luu vao cau hinh.
 * @param TokenFirebaseOld
 * @param TokenFirebaseNew
 * @param PushGUID
 * @param success
 * @param failure
 * @param timeRetry
 * @description Chi dung local, khong export ham nay
 */
const retryRegisterTokenFirebaseAgain = (
  TokenFirebaseOld,
  TokenFirebaseNew,
  PushGUID,
  success = _defaultFunc,
  failure = _defaultFunc,
  timeRetry,
) => {
  const _success = data => {
    Object.assign(configuration, {TokenFirebase: TokenFirebaseNew});
    setTokenFirebaseStorage(TokenFirebaseNew);

    success(data);
  };
  retryRegisterTokenFirebaseAgainApi(
    TokenFirebaseOld,
    TokenFirebaseNew,
    PushGUID,
    _success,
    failure,
    timeRetry,
  );
};

const setConfiguration = config => {
  const oldConfig = {...configuration};

  Object.assign(configuration, config);
  setConfigurationStorage(configuration);
  Service.setConfig(configuration);
  scheduleNotificationSetConfigurationListener(oldConfig, configuration);
};

/**
 * Lay cau hinh moi nhat tu server. Thanh cong thi luu vao cau hinh.
 * @param success
 * @param failure
 * @returns {Promise<void>}
 */
const syncConfiguration = (success = _defaultFunc, failure = _defaultFunc) => {
  const _success = _configuration => {
    setConfiguration(_configuration);
    success(configuration);
  };
  return getConfigurationAPI(_success, failure);
};

const _registerOrUpdateTokenFirebase = (
  NewTokenFirebase,
  TokenFirebase,
  registerTokenFirebase,
  updateTokenFirebase,
  success = _defaultFunc,
  failure = _defaultFunc,
  timeRetry,
) => {
  if (!NewTokenFirebase) {
    TokenFirebase
      ? success(TokenFirebase)
      : failure({
          error:
            'syncTokenFirebase::getTokenFirebase::NewTokenFirebase is null',
        });
    return;
  }

  if (!TokenFirebase) {
    log.info(msg.REGISTER_TOKEN_FIREBASE);
    registerTokenFirebase(NewTokenFirebase, success, failure, timeRetry);
    return;
  }

  if (NewTokenFirebase === TokenFirebase) {
    success(TokenFirebase);
    return;
  }

  log.info(msg.UPDATE_TOKEN_FIREBASE);
  updateTokenFirebase(
    NewTokenFirebase,
    TokenFirebase,
    success,
    failure,
    timeRetry,
  );
};

/**
 * Dang ki hoac Cap nhat token firebase voi server, cho phep thu lai neu co loi xay ra. Thanh cong thi luu vao cau hinh.
 * @param NewTokenFirebase
 * @param success
 * @param failure
 * @param timeRetry
 * @description Ham nay chi duoc phep su dung duy nhat trong fcm.js
 */
const retryRegisterOrUpdateTokenFirebase = (
  NewTokenFirebase,
  success,
  failure,
  timeRetry,
) => {
  // console.log('TokenFirebase: ' + NewTokenFirebase);
  const {TokenFirebase} = configuration;
  _registerOrUpdateTokenFirebase(
    NewTokenFirebase,
    TokenFirebase,
    retryRegisterTokenFirebase,
    retryUpdateTokenFirebase,
    success,
    failure,
    timeRetry,
  );
};

const _syncTokenFirebase = (
  _registerTokenFirebase,
  _updateTokenFirebase,
  success = _defaultFunc,
  failure = _defaultFunc,
  timeRetry,
) => {
  const {TokenFirebase} = configuration;

  getTokenFirebase(
    NewTokenFirebase => {
      console.log('NewTokenFirebase', NewTokenFirebase);
      _registerOrUpdateTokenFirebase(
        NewTokenFirebase,
        TokenFirebase,
        _registerTokenFirebase,
        _updateTokenFirebase,
        success,
        failure,
        timeRetry,
      );
    },
    e => {
      log.error(msg.GET_TOKEN_FIREBASE_FAILURE);
      TokenFirebase ? success(TokenFirebase) : failure(e);
    },
  );
};

/**
 * Lay token firebase moi nhat va dong bo len server. Thanh cong thi luu vao cau hinh.
 * @param success
 * @param failure
 * @description Dung khi dam bao token firebase duoc dong bo len server truoc khi goi mot API khac => Chi duong dung trong bluezone.js
 */
const syncTokenFirebase = (success, failure) => {
  const _success = token => {
    log.info(msg.SYNC_TOKEN_FIREBASE_SUCCESS, token);
    success(token);
  };
  const _failure = e => {
    log.error(msg.SYNC_TOKEN_FIREBASE_FAILURE, e);
    failure(e);
  };
  return _syncTokenFirebase(
    registerTokenFirebase,
    updateTokenFirebase,
    _success,
    _failure,
  );
};

/**
 * Lay token firebase moi nhat va dong bo len server, cho phep thu lai neu co loi xay ra. Thanh cong thi luu vao cau hinh.
 * @param success
 * @param failure
 * @param timeRetry
 * @description Dung khi can dam bao token firebase duoc dong bo len server.
 */
const retrySyncTokenFirebase = (success, failure, timeRetry) => {
  return _syncTokenFirebase(
    retryRegisterTokenFirebase,
    retryUpdateTokenFirebase,
    success,
    failure,
    timeRetry,
  );
};

const _syncTokenFirebaseAgain = (
  pushGUID,
  _registerTokenFirebaseAgain,
  success = _defaultFunc,
  failure = _defaultFunc,
  timeRetry,
) => {
  const {TokenFirebase} = configuration;

  getTokenFirebase(
    NewTokenFirebase => {
      _registerTokenFirebaseAgain(
        TokenFirebase,
        NewTokenFirebase,
        pushGUID,
        success,
        failure,
        timeRetry,
      );
    },
    () => {
      _registerTokenFirebaseAgain(
        TokenFirebase,
        TokenFirebase,
        pushGUID,
        success,
        failure,
        timeRetry,
      );
    },
  );
};

const retrySyncTokenFirebaseAgain = (PushGUID, success, failure, timeRetry) => {
  return _syncTokenFirebaseAgain(
    PushGUID,
    retryRegisterTokenFirebaseAgain,
    success,
    failure,
    timeRetry,
  );
};

// TODO: can ra soat loai bo viec export truc tiep configuration de han che viec phu thuoc ngam va kho debug. Hoac can chi ra duoc nguyen tac nhung cho nao duoc su dung configuration cho nao khong?
export default configuration;

export {
  initConfiguration,
  syncConfiguration,
  setLanguage,
  setStatusNotifyRegister,
  setPhoneNumber,
  setConfiguration,
  retryRegisterTokenFirebaseAgain,
  retryRegisterOrUpdateTokenFirebase,
  syncTokenFirebase,
  retrySyncTokenFirebase,
  retrySyncTokenFirebaseAgain,
};
