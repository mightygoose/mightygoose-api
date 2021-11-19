const input = {
  country: 'UK',
  year: '1987',
  format: ['Vinyl', 'LP'],
  label: [
    'Mercury',
    'Phonogram Records Ltd. (London)',
    'CTS Studios',
    'CTS Studios',
    'EMI Studios Abbey Road',
  ],
  type: 'master',
  genre: ['Classical'],
  style: [],
  id: 208720,
  barcode: [],
  user_data: {
    in_wantlist: false,
    in_collection: false,
  },
  master_id: 208720,
  master_url: 'https://api.discogs.com/masters/208720',
  uri: '/master/208720-Sky-4-MozartAcademy-Of-St-Martin-in-the-Fields-Sir-Neville-Marriner-Mozart',
  catno: 'MERH 116',
  title:
    'Sky (4), Mozart*, The Academy Of St. Martin-in-the-Fields, Sir Neville Marriner - Mozart',
  thumb:
    'https://img.discogs.com/CVmSCKJHe1xRlzIrrcfA3QyHDOY=/fit-in/150x150/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-2017338-1265495627.jpeg.jpg',
  cover_image:
    'https://img.discogs.com/pvWYSXfY-QXGhB2_bckrFyt6k-8=/fit-in/600x597/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2017338-1265495627.jpeg.jpg',
  resource_url: 'https://api.discogs.com/masters/208720',
  community: {
    want: 150,
    have: 537,
  },
};

const getType = (value: unknown, key: string) => {
  if (key === 'id') {
    return 'ID';
  }
  if (typeof value === 'string') {
    return 'String';
  }
  if (typeof value === 'boolean') {
    return 'Boolean';
  }
  if (typeof value === 'number') {
    return Number.isInteger(value) ? 'Int' : 'Float';
  }
};

export const generateSchema = (input: Record<string, any>) => {
  const keys = Object.keys(input);

  return keys.map((key) => `${key}: ${getType(input[key], key)}`).join('\n');
};

// console.log(generateSchema(input));
