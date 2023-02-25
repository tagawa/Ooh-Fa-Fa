// Human-friendly names for traffic sources.
const referrer_lookup = {
  'alohafind.com': {
    name: 'AlohaFind',
    type: 'search'
  },
  'search.aol.com': {
    name: 'AOL',
    type: 'search'
  },
  'search.aol.co.uk': {
    name: 'AOL (UK)',
    type: 'search'
  },
  'sp-web.search.auone.jp': {
    name: 'AU',
    type: 'search'
  },
  'avito.ru': {
    name: 'Avito',
    type: 'website'
  },
  'link.avito.ru': {
    name: 'Avito',
    type: 'website'
  },
  'Baidu': {
    type: 'search'
  },
  'cgi.search.biglobe.ne.jp': {
    name: 'Biglobe',
    type: 'search'
  },
  'Bing': {
    type: 'search'
  },
  'search.brave.com': {
    name: 'Brave',
    type: 'search'
  },
  'dogpile.com': {
    name: 'Dogpile',
    type: 'search'
  },
  'DuckDuckGo': {
    type: 'search'
  },
  'html.duckduckgo.com': {
    name: 'DuckDuckGo (HTML)',
    type: 'search'
  },
  'lite.duckduckgo.com': {
    name: 'DuckDuckGo (Lite)',
    type: 'search'
  },
  'ecosia.org': {
    name: 'Ecosia',
    type: 'search'
  },
  'websearch.excite.co.jp': {
    name: 'Excite',
    type: 'search'
  },
  'Facebook': {
    type: 'social'
  },
  'search.goo.ne.jp': {
    name: 'Goo',
    type: 'search'
  },
  'Google': {
    type: 'search'
  },
  'mail.google.com': {
    name: 'Gmail',
    type: 'mail'
  },
  'indiehackers.com': {
    name: 'Indie Hackers',
    type: 'social'
  },
  'Instagram': {
    type: 'social'
  },
  'search.lilo.org': {
    name: 'Lilo',
    type: 'search'
  },
  'LinkedIn': {
    type: 'social'
  },
  'messenger.com': {
    name: 'Messenger',
    type: 'mail'
  },
  'l.messenger.com': {
    name: 'Messenger',
    type: 'mail'
  },
  'metacrawler.com': {
    name: 'MetaCrawler',
    type: 'search'
  },
  'metager.de': {
    name: 'MetaGer (Germany)',
    type: 'search'
  },
  'metager.org': {
    name: 'MetaGer',
    type: 'search'
  },
  'neeva.com': {
    name: 'Neeva',
    type: 'search'
  },
  'search.nifty.com': {
    name: 'Nifty',
    type: 'search'
  },
  'petalsearch.com': {
    name: 'Petal',
    type: 'search'
  },
  'presearch.com': {
    name: 'Presearch',
    type: 'search'
  },
  'presearch.org': {
    name: 'Presearch',
    type: 'search'
  },
  'engine.presearch.org': {
    name: 'Presearch',
    type: 'search'
  },
  'producthunt.com': {
    name: 'Product Hunt',
    type: 'social'
  },
  'qwant.com': {
    name: 'Qwant',
    type: 'search'
  },
  'lite.qwant.com': {
    name: 'Qwant (Lite)',
    type: 'search'
  },
  'websearch.rakuten.co.jp': {
    name: 'Rakuten',
    type: 'search'
  },
  'Reddit': {
    type: 'social'
  },
  'out.reddit.com': {
    name: 'Reddit',
    type: 'social'
  },
  'seekr.com': {
    name: 'Seekr',
    type: 'search'
  },
  'startpage.com': {
    name: 'Startpage',
    type: 'search'
  },
  'eu.startpage.com': {
    name: 'Startpage (Europe)',
    type: 'search'
  },
  'us.startpage.com': {
    name: 'Startpage (US)',
    type: 'search'
  },
  'startsiden.no': {
    name: 'Startsiden',
    type: 'search'
  },
  'swisscows.com': {
    name: 'Swisscows',
    type: 'search'
  },
  'android-app://org.telegram.messenger': {
    name: 'Telegram (App)',
    type: 'mail'
  },
  'Twitter': {
    type: 'social'
  },
  'wordpress.com': {
    name: 'WordPress',
    type: 'website'
  },
  'Yahoo': {
    type: 'search'
  },
  'mail.yahoo.co.jp': {
    name: 'Yahoo Mail',
    type: 'mail'
  },
  'Yandex': {
    type: 'search'
  },
  'yandex.eu': {
    name: 'Yandex (Europe)',
    type: 'search'
  },
  'news.ycombinator.com': {
    name: 'Hacker News',
    type: 'social'
  },
  'you.com': {
    name: 'You.com',
    type: 'search'
  },
  'YouTube': {
    type: 'social'
  },
  'youtube.com': {
    name: 'YouTube',
    type: 'social'
  },
  'm.youtube.com': {
    name: 'YouTube (Mobile)',
    type: 'social'
  },
  'search.xfinity.com': {
    name: 'Xfinity',
    type: 'search'
  }
};

// Country/region codes for flags.
const flags = {
  "Afghanistan": "AF",
  "Aland Islands": "AX",
  "Albania": "AL",
  "Algeria": "DZ",
  "American Samoa": "AS",
  "Andorra": "AD",
  "Angola": "AO",
  "Anguilla": "AI",
  "Antarctica": "AQ",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Aruba": "AW",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bermuda": "BM",
  "Bhutan": "BT",
  "Bolivia": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Bouvet Island": "BV",
  "Brazil": "BR",
  "British Virgin Islands": "VG",
  "British Indian Ocean Territory": "IO",
  "Brunei Darussalam": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Cape Verde": "CV",
  "Cayman Islands": "KY",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Hong Kong, SAR China": "HK",
  "Macao, SAR China": "MO",
  "Christmas Island": "CX",
  "Cocos (Keeling) Islands": "CC",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo (Brazzaville)": "CG",
  "Congo, (Kinshasa)": "CD",
  "Cook Islands": "CK",
  "Costa Rica": "CR",
  "Côte d'Ivoire": "CI",
  "Croatia": "HR",
  "Cuba": "CU",
  "Cyprus": "CY",
  "Czech Republic": "CZ",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Ethiopia": "ET",
  "Falkland Islands (Malvinas)": "FK",
  "Faroe Islands": "FO",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "French Guiana": "GF",
  "French Polynesia": "PF",
  "French Southern Territories": "TF",
  "Gabon": "GA",
  "Gambia": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Greenland": "GL",
  "Grenada": "GD",
  "Guadeloupe": "GP",
  "Guam": "GU",
  "Guatemala": "GT",
  "Guernsey": "GG",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Heard and Mcdonald Islands": "HM",
  "Holy See (Vatican City State)": "VA",
  "Honduras": "HN",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran, Islamic Republic of": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Isle of Man": "IM",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jersey": "JE",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Korea (North)": "KP",
  "Korea (South)": "KR",
  "Kosovo": "XK",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Lao PDR": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macedonia, Republic of": "MK",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Martinique": "MQ",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mayotte": "YT",
  "Mexico": "MX",
  "Micronesia, Federated States of": "FM",
  "Moldova": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Montserrat": "MS",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "Netherlands Antilles": "AN",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger": "NE",
  "Nigeria": "NG",
  "Niue": "NU",
  "Norfolk Island": "NF",
  "Northern Mariana Islands": "MP",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestinian Territory": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Pitcairn": "PN",
  "Poland": "PL",
  "Portugal": "PT",
  "Puerto Rico": "PR",
  "Qatar": "QA",
  "Réunion": "RE",
  "Romania": "RO",
  "Russian Federation": "RU",
  "Rwanda": "RW",
  "Saint-Barthélemy": "BL",
  "Saint Helena": "SH",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint-Martin (French part)": "MF",
  "Saint Pierre and Miquelon": "PM",
  "Saint Vincent and Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tome and Principe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Georgia and the South Sandwich Islands": "GS",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan": "SD",
  "Suriname": "SR",
  "Svalbard and Jan Mayen Islands": "SJ",
  "Swaziland": "SZ",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syrian Arab Republic (Syria)": "SY",
  "Taiwan, Republic of China": "TW",
  "Tajikistan": "TJ",
  "Tanzania, United Republic of": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tokelau": "TK",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Turkey": "TR",
  "Turkmenistan": "TM",
  "Turks and Caicos Islands": "TC",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom": "GB",
  "United States of America": "US",
  "US Minor Outlying Islands": "UM",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Venezuela (Bolivarian Republic)": "VE",
  "Viet Nam": "VN",
  "Virgin Islands, US": "VI",
  "Wallis and Futuna Islands": "WF",
  "Western Sahara": "EH",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW",
  "Bonaire, Saint Eustatius and Saba": "BQ",
  "Sint Maarten": "SX",
  "Curaçao": "CW"
};