export enum CurrencyCodeEnum {
  AED = 'AED',
  AFN = 'AFN',
  ALL = 'ALL',
  AMD = 'AMD',
  ANG = 'ANG',
  AOA = 'AOA',
  ARS = 'ARS',
  AUD = 'AUD',
  AWG = 'AWG',
  AZN = 'AZN',
  BAM = 'BAM',
  BBD = 'BBD',
  BDT = 'BDT',
  BGN = 'BGN',
  BHD = 'BHD',
  BIF = 'BIF',
  BMD = 'BMD',
  BND = 'BND',
  BOB = 'BOB',
  BRL = 'BRL',
  BSD = 'BSD',
  BTC = 'BTC',
  BTN = 'BTN',
  BWP = 'BWP',
  BYN = 'BYN',
  BYR = 'BYR',
  BZD = 'BZD',
  CAD = 'CAD',
  CDF = 'CDF',
  CHF = 'CHF',
  CLF = 'CLF',
  CLP = 'CLP',
  CNY = 'CNY',
  COP = 'COP',
  CRC = 'CRC',
  CUC = 'CUC',
  CUP = 'CUP',
  CVE = 'CVE',
  CZK = 'CZK',
  DJF = 'DJF',
  DKK = 'DKK',
  DOP = 'DOP',
  DZD = 'DZD',
  EGP = 'EGP',
  ERN = 'ERN',
  ETB = 'ETB',
  EUR = 'EUR',
  FJD = 'FJD',
  FKP = 'FKP',
  GBP = 'GBP',
  GEL = 'GEL',
  GGP = 'GGP',
  GHS = 'GHS',
  GIP = 'GIP',
  GMD = 'GMD',
  GNF = 'GNF',
  GTQ = 'GTQ',
  GYD = 'GYD',
  HKD = 'HKD',
  HNL = 'HNL',
  HRK = 'HRK',
  HTG = 'HTG',
  HUF = 'HUF',
  IDR = 'IDR',
  ILS = 'ILS',
  IMP = 'IMP',
  INR = 'INR',
  IQD = 'IQD',
  IRR = 'IRR',
  ISK = 'ISK',
  JEP = 'JEP',
  JMD = 'JMD',
  JOD = 'JOD',
  JPY = 'JPY',
  KES = 'KES',
  KGS = 'KGS',
  KHR = 'KHR',
  KMF = 'KMF',
  KPW = 'KPW',
  KRW = 'KRW',
  KWD = 'KWD',
  KYD = 'KYD',
  KZT = 'KZT',
  LAK = 'LAK',
  LBP = 'LBP',
  LKR = 'LKR',
  LRD = 'LRD',
  LSL = 'LSL',
  LYD = 'LYD',
  MAD = 'MAD',
  MDL = 'MDL',
  MGA = 'MGA',
  MKD = 'MKD',
  MMK = 'MMK',
  MNT = 'MNT',
  MOP = 'MOP',
  MRU = 'MRU',
  MUR = 'MUR',
  MVR = 'MVR',
  MWK = 'MWK',
  MXN = 'MXN',
  MYR = 'MYR',
  MZN = 'MZN',
  NAD = 'NAD',
  NGN = 'NGN',
  NIO = 'NIO',
  NOK = 'NOK',
  NPR = 'NPR',
  NZD = 'NZD',
  OMR = 'OMR',
  PAB = 'PAB',
  PEN = 'PEN',
  PGK = 'PGK',
  PHP = 'PHP',
  PKR = 'PKR',
  PLN = 'PLN',
  PYG = 'PYG',
  QAR = 'QAR',
  RON = 'RON',
  RSD = 'RSD',
  RUB = 'RUB',
  RWF = 'RWF',
  SAR = 'SAR',
  SBD = 'SBD',
  SCR = 'SCR',
  SDG = 'SDG',
  SEK = 'SEK',
  SGD = 'SGD',
  SHP = 'SHP',
  SLL = 'SLL',
  SOS = 'SOS',
  SRD = 'SRD',
  SSP = 'SSP',
  STN = 'STN',
  SVC = 'SVC',
  SYP = 'SYP',
  SZL = 'SZL',
  THB = 'THB',
  TJS = 'TJS',
  TMT = 'TMT',
  TND = 'TND',
  TOP = 'TOP',
  TRY = 'TRY',
  TTD = 'TTD',
  TWD = 'TWD',
  TZS = 'TZS',
  UAH = 'UAH',
  UGX = 'UGX',
  USD = 'USD',
  UYU = 'UYU',
  UZS = 'UZS',
  VND = 'VND',
  VUV = 'VUV',
  VEF = 'VEF',
  WST = 'WST',
  XAF = 'XAF',
  XAG = 'XAG',
  XAU = 'XAU',
  XCD = 'XCD',
  XDR = 'XDR',
  XOF = 'XOF',
  XPD = 'XPD',
  XPF = 'XPF',
  XPT = 'XPT',
  YER = 'YER',
  ZAR = 'ZAR',
  ZMW = 'ZMW',
  ZWL = 'ZWL',
}

export const currencies = [
  { code: CurrencyCodeEnum.AED, sign: 'د.إ', title: 'United Arab Emirates Dirham' },
  { code: CurrencyCodeEnum.AFN, sign: '؋', title: 'Afghan Afghani' },
  { code: CurrencyCodeEnum.ALL, sign: 'L', title: 'Albanian Lek' },
  { code: CurrencyCodeEnum.AMD, sign: '֏', title: 'Armenian Dram' },
  { code: CurrencyCodeEnum.ANG, sign: 'ƒ', title: 'Netherlands Antillean Guilder' },
  { code: CurrencyCodeEnum.AOA, sign: 'Kz', title: 'Angolan Kwanza' },
  { code: CurrencyCodeEnum.ARS, sign: '$', title: 'Argentine Peso' },
  { code: CurrencyCodeEnum.AUD, sign: '$', title: 'Australian Dollar' },
  { code: CurrencyCodeEnum.AWG, sign: 'ƒ', title: 'Aruban Florin' },
  { code: CurrencyCodeEnum.AZN, sign: '₼', title: 'Azerbaijani Manat' },
  { code: CurrencyCodeEnum.BAM, sign: 'KM', title: 'Bosnia-Herzegovina Convertible Mark' },
  { code: CurrencyCodeEnum.BBD, sign: '$', title: 'Barbadian Dollar' },
  { code: CurrencyCodeEnum.BDT, sign: '৳', title: 'Bangladeshi Taka' },
  { code: CurrencyCodeEnum.BGN, sign: 'лв', title: 'Bulgarian Lev' },
  { code: CurrencyCodeEnum.BHD, sign: '.د.ب', title: 'Bahraini Dinar' },
  { code: CurrencyCodeEnum.BIF, sign: 'Fr', title: 'Burundian Franc' },
  { code: CurrencyCodeEnum.BMD, sign: '$', title: 'Bermudan Dollar' },
  { code: CurrencyCodeEnum.BND, sign: '$', title: 'Brunei Dollar' },
  { code: CurrencyCodeEnum.BOB, sign: 'Bs.', title: 'Bolivian Boliviano' },
  { code: CurrencyCodeEnum.BRL, sign: 'R$', title: 'Brazilian Real' },
  { code: CurrencyCodeEnum.BSD, sign: '$', title: 'Bahamian Dollar' },
  { code: CurrencyCodeEnum.BTC, sign: '₿', title: 'Bitcoin' },
  { code: CurrencyCodeEnum.BTN, sign: 'Nu.', title: 'Bhutanese Ngultrum' },
  { code: CurrencyCodeEnum.BWP, sign: 'P', title: 'Botswanan Pula' },
  { code: CurrencyCodeEnum.BYN, sign: 'Br', title: 'Belarusian Ruble' },
  { code: CurrencyCodeEnum.BYR, sign: 'Br', title: 'Belarusian Ruble' },
  { code: CurrencyCodeEnum.BZD, sign: '$', title: 'Belize Dollar' },
  { code: CurrencyCodeEnum.CAD, sign: '$', title: 'Canadian Dollar' },
  { code: CurrencyCodeEnum.CDF, sign: 'Fr', title: 'Congolese Franc' },
  { code: CurrencyCodeEnum.CHF, sign: 'CHF', title: 'Swiss Franc' },
  { code: CurrencyCodeEnum.CLF, sign: 'UF', title: 'Chilean Unit of Account' },
  { code: CurrencyCodeEnum.CLP, sign: '$', title: 'Chilean Peso' },
  { code: CurrencyCodeEnum.CNY, sign: '¥', title: 'Chinese Yuan' },
  { code: CurrencyCodeEnum.COP, sign: '$', title: 'Colombian Peso' },
  { code: CurrencyCodeEnum.CRC, sign: '₡', title: 'Costa Rican Colón' },
  { code: CurrencyCodeEnum.CUC, sign: '$', title: 'Cuban Convertible Peso' },
  { code: CurrencyCodeEnum.CUP, sign: '$', title: 'Cuban Peso' },
  { code: CurrencyCodeEnum.CVE, sign: '$', title: 'Cape Verdean Escudo' },
  { code: CurrencyCodeEnum.CZK, sign: 'Kč', title: 'Czech Republic Koruna' },
  { code: CurrencyCodeEnum.DJF, sign: 'Fdj', title: 'Djiboutian Franc' },
  { code: CurrencyCodeEnum.DKK, sign: 'kr', title: 'Danish Krone' },
  { code: CurrencyCodeEnum.DOP, sign: '$', title: 'Dominican Peso' },
  { code: CurrencyCodeEnum.DZD, sign: 'د.ج', title: 'Algerian Dinar' },
  { code: CurrencyCodeEnum.EGP, sign: '£', title: 'Egyptian Pound' },
  { code: CurrencyCodeEnum.ERN, sign: 'Nfk', title: 'Eritrean Nakfa' },
  { code: CurrencyCodeEnum.ETB, sign: 'Br', title: 'Ethiopian Birr' },
  { code: CurrencyCodeEnum.EUR, sign: '€', title: 'Euro' },
  { code: CurrencyCodeEnum.FJD, sign: '$', title: 'Fijian Dollar' },
  { code: CurrencyCodeEnum.FKP, sign: '£', title: 'Falkland Islands Pound' },
  { code: CurrencyCodeEnum.GBP, sign: '£', title: 'British Pound Sterling' },
  { code: CurrencyCodeEnum.GEL, sign: '₾', title: 'Georgian Lari' },
  { code: CurrencyCodeEnum.GGP, sign: '£', title: 'Guernsey Pound' },
  { code: CurrencyCodeEnum.GHS, sign: '₵', title: 'Ghanaian Cedi' },
  { code: CurrencyCodeEnum.GIP, sign: '£', title: 'Gibraltar Pound' },
  { code: CurrencyCodeEnum.GMD, sign: 'D', title: 'Gambian Dalasi' },
  { code: CurrencyCodeEnum.GNF, sign: 'Fr', title: 'Guinean Franc' },
  { code: CurrencyCodeEnum.GTQ, sign: 'Q', title: 'Guatemalan Quetzal' },
  { code: CurrencyCodeEnum.GYD, sign: '$', title: 'Guyanaese Dollar' },
  { code: CurrencyCodeEnum.HKD, sign: '$', title: 'Hong Kong Dollar' },
  { code: CurrencyCodeEnum.HNL, sign: 'L', title: 'Honduran Lempira' },
  { code: CurrencyCodeEnum.HRK, sign: 'kn', title: 'Croatian Kuna' },
  { code: CurrencyCodeEnum.HTG, sign: 'G', title: 'Haitian Gourde' },
  { code: CurrencyCodeEnum.HUF, sign: 'Ft', title: 'Hungarian Forint' },
  { code: CurrencyCodeEnum.IDR, sign: 'Rp', title: 'Indonesian Rupiah' },
  { code: CurrencyCodeEnum.ILS, sign: '₪', title: 'Israeli New Sheqel' },
  { code: CurrencyCodeEnum.IMP, sign: '£', title: 'Manx pound' },
  { code: CurrencyCodeEnum.INR, sign: '₹', title: 'Indian Rupee' },
  { code: CurrencyCodeEnum.IQD, sign: 'ع.د', title: 'Iraqi Dinar' },
  { code: CurrencyCodeEnum.IRR, sign: '﷼', title: 'Iranian Rial' },
  { code: CurrencyCodeEnum.ISK, sign: 'kr', title: 'Icelandic Króna' },
  { code: CurrencyCodeEnum.JEP, sign: '£', title: 'Jersey Pound' },
  { code: CurrencyCodeEnum.JMD, sign: '$', title: 'Jamaican Dollar' },
  { code: CurrencyCodeEnum.JOD, sign: 'د.ا', title: 'Jordanian Dinar' },
  { code: CurrencyCodeEnum.JPY, sign: '¥', title: 'Japanese Yen' },
  { code: CurrencyCodeEnum.KES, sign: 'Sh', title: 'Kenyan Shilling' },
  { code: CurrencyCodeEnum.KGS, sign: 'с', title: 'Kyrgystani Som' },
  { code: CurrencyCodeEnum.KHR, sign: '៛', title: 'Cambodian Riel' },
  { code: CurrencyCodeEnum.KMF, sign: 'Fr', title: 'Comorian Franc' },
  { code: CurrencyCodeEnum.KPW, sign: '₩', title: 'North Korean Won' },
  { code: CurrencyCodeEnum.KRW, sign: '₩', title: 'South Korean Won' },
  { code: CurrencyCodeEnum.KWD, sign: 'د.ك', title: 'Kuwaiti Dinar' },
  { code: CurrencyCodeEnum.KYD, sign: '$', title: 'Cayman Islands Dollar' },
  { code: CurrencyCodeEnum.KZT, sign: '₸', title: 'Kazakhstani Tenge' },
  { code: CurrencyCodeEnum.LAK, sign: '₭', title: 'Laotian Kip' },
  { code: CurrencyCodeEnum.LBP, sign: 'ل.ل', title: 'Lebanese Pound' },
  { code: CurrencyCodeEnum.LKR, sign: 'Rs', title: 'Sri Lankan Rupee' },
  { code: CurrencyCodeEnum.LRD, sign: '$', title: 'Liberian Dollar' },
  { code: CurrencyCodeEnum.LSL, sign: 'L', title: 'Lesotho Loti' },
  { code: CurrencyCodeEnum.LYD, sign: 'ل.د', title: 'Libyan Dinar' },
  { code: CurrencyCodeEnum.MAD, sign: 'د.م.', title: 'Moroccan Dirham' },
  { code: CurrencyCodeEnum.MDL, sign: 'L', title: 'Moldovan Leu' },
  { code: CurrencyCodeEnum.MGA, sign: 'Ar', title: 'Malagasy Ariary' },
  { code: CurrencyCodeEnum.MKD, sign: 'ден', title: 'Macedonian Denar' },
  { code: CurrencyCodeEnum.MMK, sign: 'Ks', title: 'Burmese Kyat' },
  { code: CurrencyCodeEnum.MNT, sign: '₮', title: 'Mongolian Tugrik' },
  { code: CurrencyCodeEnum.MOP, sign: 'P', title: 'Macanese Pataca' },
  { code: CurrencyCodeEnum.MRU, sign: 'UM', title: 'Mauritanian Ouguiya' },
  { code: CurrencyCodeEnum.MUR, sign: '₨', title: 'Mauritian Rupee' },
  { code: CurrencyCodeEnum.MVR, sign: '.ރ', title: 'Maldivian Rufiyaa' },
  { code: CurrencyCodeEnum.MWK, sign: 'MK', title: 'Malawian Kwacha' },
  { code: CurrencyCodeEnum.MXN, sign: '$', title: 'Mexican Peso' },
  { code: CurrencyCodeEnum.MYR, sign: 'RM', title: 'Malaysian Ringgit' },
  { code: CurrencyCodeEnum.MZN, sign: 'MT', title: 'Mozambican Metical' },
  { code: CurrencyCodeEnum.NAD, sign: '$', title: 'Namibian Dollar' },
  { code: CurrencyCodeEnum.NGN, sign: '₦', title: 'Nigerian Naira' },
  { code: CurrencyCodeEnum.NIO, sign: 'C$', title: 'Nicaraguan Córdoba' },
  { code: CurrencyCodeEnum.NOK, sign: 'kr', title: 'Norwegian Krone' },
  { code: CurrencyCodeEnum.NPR, sign: '₨', title: 'Nepalese Rupee' },
  { code: CurrencyCodeEnum.NZD, sign: '$', title: 'New Zealand Dollar' },
  { code: CurrencyCodeEnum.OMR, sign: 'ر.ع.', title: 'Omani Rial' },
  { code: CurrencyCodeEnum.PAB, sign: 'B/.', title: 'Panamanian Balboa' },
  { code: CurrencyCodeEnum.PEN, sign: 'S/.', title: 'Peruvian Nuevo Sol' },
  { code: CurrencyCodeEnum.PGK, sign: 'K', title: 'Papua New Guinean Kina' },
  { code: CurrencyCodeEnum.PHP, sign: '₱', title: 'Philippine Peso' },
  { code: CurrencyCodeEnum.PKR, sign: '₨', title: 'Pakistani Rupee' },
  { code: CurrencyCodeEnum.PLN, sign: 'zł', title: 'Polish Zloty' },
  { code: CurrencyCodeEnum.PYG, sign: '₲', title: 'Paraguayan Guarani' },
  { code: CurrencyCodeEnum.QAR, sign: 'ر.ق', title: 'Qatari Rial' },
  { code: CurrencyCodeEnum.RON, sign: 'lei', title: 'Romanian Leu' },
  { code: CurrencyCodeEnum.RSD, sign: 'дин.', title: 'Serbian Dinar' },
  { code: CurrencyCodeEnum.RUB, sign: '₽', title: 'Russian Ruble' },
  { code: CurrencyCodeEnum.RWF, sign: 'Fr', title: 'Rwandan Franc' },
  { code: CurrencyCodeEnum.SAR, sign: 'ر.س', title: 'Saudi Riyal' },
  { code: CurrencyCodeEnum.SBD, sign: '$', title: 'Solomon Islands Dollar' },
  { code: CurrencyCodeEnum.SCR, sign: '₨', title: 'Seychellois Rupee' },
  { code: CurrencyCodeEnum.SDG, sign: 'ج.س.', title: 'Sudanese Pound' },
  { code: CurrencyCodeEnum.SEK, sign: 'kr', title: 'Swedish Krona' },
  { code: CurrencyCodeEnum.SGD, sign: '$', title: 'Singapore Dollar' },
  { code: CurrencyCodeEnum.SHP, sign: '£', title: 'Saint Helena Pound' },
  { code: CurrencyCodeEnum.SLL, sign: 'Le', title: 'Sierra Leonean Leone' },
  { code: CurrencyCodeEnum.SOS, sign: 'Sh', title: 'Somali Shilling' },
  { code: CurrencyCodeEnum.SRD, sign: '$', title: 'Surinamese Dollar' },
  { code: CurrencyCodeEnum.SSP, sign: '£', title: 'South Sudanese Pound' },
  { code: CurrencyCodeEnum.STN, sign: 'Db', title: 'São Tomé and Príncipe Dobra' },
  { code: CurrencyCodeEnum.SVC, sign: '₡', title: 'Salvadoran Colón' },
  { code: CurrencyCodeEnum.SYP, sign: '£', title: 'Syrian Pound' },
  { code: CurrencyCodeEnum.SZL, sign: 'L', title: 'Swazi Lilangeni' },
  { code: CurrencyCodeEnum.THB, sign: '฿', title: 'Thai Baht' },
  { code: CurrencyCodeEnum.TJS, sign: 'ЅМ', title: 'Tajikistani Somoni' },
  { code: CurrencyCodeEnum.TMT, sign: 'm', title: 'Turkmenistani Manat' },
  { code: CurrencyCodeEnum.TND, sign: 'د.ت', title: 'Tunisian Dinar' },
  { code: CurrencyCodeEnum.TOP, sign: 'T$', title: 'Tongan Paʻanga' },
  { code: CurrencyCodeEnum.TRY, sign: '₺', title: 'Turkish Lira' },
  { code: CurrencyCodeEnum.TTD, sign: '$', title: 'Trinidad and Tobago Dollar' },
  { code: CurrencyCodeEnum.TWD, sign: '$', title: 'New Taiwan Dollar' },
  { code: CurrencyCodeEnum.TZS, sign: 'Sh', title: 'Tanzanian Shilling' },
  { code: CurrencyCodeEnum.UAH, sign: '₴', title: 'Ukrainian Hryvnia' },
  { code: CurrencyCodeEnum.UGX, sign: 'USh', title: 'Ugandan Shilling' },
  { code: CurrencyCodeEnum.USD, sign: '$', title: 'United States Dollar' },
  { code: CurrencyCodeEnum.UYU, sign: '$U', title: 'Uruguayan Peso' },
  { code: CurrencyCodeEnum.UZS, sign: 'лв', title: 'Uzbekistan Som' },
  { code: CurrencyCodeEnum.VEF, sign: 'Bs', title: 'Venezuelan Bolívar' },
  { code: CurrencyCodeEnum.VND, sign: '₫', title: 'Vietnamese đồng' },
  { code: CurrencyCodeEnum.VUV, sign: 'Vt', title: 'Vanuatu Vatu' },
  { code: CurrencyCodeEnum.WST, sign: 'WS$', title: 'Samoan tala' },
  { code: CurrencyCodeEnum.XAF, sign: 'Fr', title: 'Central African CFA franc' },
  { code: CurrencyCodeEnum.XCD, sign: '$', title: 'East Caribbean Dollar' },
  { code: CurrencyCodeEnum.XOF, sign: 'Fr', title: 'West African CFA franc' },
  { code: CurrencyCodeEnum.XPF, sign: '₣', title: 'CFP franc' },
  { code: CurrencyCodeEnum.YER, sign: '﷼', title: 'Yemeni Rial' },
  { code: CurrencyCodeEnum.ZAR, sign: 'R', title: 'South African Rand' },
  { code: CurrencyCodeEnum.ZMW, sign: 'ZK', title: 'Zambian Kwacha' },
  { code: CurrencyCodeEnum.ZWL, sign: '$', title: 'Zimbabwean Dollar' },
];

export const signByCurrencyCode = currencies.reduce(
  (acc, curr) => ({ ...acc, [curr.code]: curr.sign }),
  {} as Record<CurrencyCodeEnum, string>
);
