const RecordFormStructure = [
  {
    name: 'type',
    label: 'Type',
    options: [
      {
        value: 'digital resources',
        label: 'Digital Resources',
      },
      {
        value: 'directional',
        label: 'Directional',
      },
      {
        value: 'information services',
        label: 'Information Services',
      },
      {
        value: 'known item requests',
        label: 'Known Item Requests',
      },
      {
        value: 'tech help',
        label: 'Tech Help',
      },
    ],
  },
  {
    name: 'location',
    label: 'Location',
    options: [
      {
        value: 'circulation',
        label: 'Circulation',
      },
      {
        value: 'reference',
        label: 'Reference',
      },
      {
        value: 'childrens ',
        label: 'Childrens',
      },
    ],
  },
  {
    name: 'format',
    label: 'Format',
    options: [
      {
        value: 'in-person',
        label: 'In-Person',
      },
      {
        value: 'phone',
        label: 'Phone',
      },
      {
        value: 'virtual ',
        label: 'Virtual',
      },
    ],
  },
];

export default RecordFormStructure;
