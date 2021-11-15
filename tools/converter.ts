const input = {
  style: ['Interview', 'Grunge'],
  thumb: '',
  title: 'Nirvana - Nevermind',
  country: 'Australia',
  format: ['DVD', 'PAL'],
  uri: '/Nirvana-Nevermind-Classic-Albums/release/2028757',
  community: {
    want: 1,
    have: 5,
  },
  label: ['Eagle Vision', 'Rajon Vision', 'Classic Albums'],
  catno: 'RV0296',
  year: '2005',
  genre: ['Non-Music', 'Rock'],
  resource_url: 'http://api.discogs.com/releases/2028757',
  type: 'release',
  id: 2028757,
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

const generateSchema = (input: Record<string, any>) => {
  const keys = Object.keys(input);

  return keys.map((key) => `${key}: ${getType(input[key], key)}`).join('\n');
};

console.log(generateSchema(input));
