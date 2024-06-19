export const evidenceConfiguration = [
  {
    textHelp: null,
    required: false,
    evidenceType: {
      id: 1,
      description: 'Imagen',
      key: 'image',
    },
    config: {
      sizes: null,
      types: ['png', 'jpg', 'jpeg'],
      amounts: null,
    },
  },
  {
    textHelp: null,
    required: false,
    evidenceType: {
      id: 2,
      description: 'Video',
      key: 'video',
    },
    config: {
      sizes: null,
      types: [],
      amounts: null,
    },
  },
  {
    textHelp: null,
    required: false,
    evidenceType: {
      id: 3,
      description: 'Firma',
      key: 'sign',
    },
    config: {
      sizes: null,
      types: [],
      amounts: null,
    },
  },
  {
    textHelp: null,
    required: false,
    evidenceType: {
      id: 4,
      description: 'Documento',
      key: 'file',
    },
    config: {
      sizes: 0,
      types: ['pdf', 'csv', 'docx', 'xlsx', 'pptx', 'txt'],
      amounts: null,
    },
  },
  {
    textHelp: null,
    required: false,
    evidenceType: {
      id: 5,
      description: 'Comentario',
      key: 'comment',
    },
    config: {
      sizes: null,
      types: [],
      amounts: null,
    },
  },
  {
    textHelp: null,
    required: false,
    evidenceType: {
      id: 6,
      description: 'Cámara',
      key: 'camera',
    },
    config: {
      sizes: null,
      types: ['png', 'jpeg'],
      amounts: null,
    },
  },
  {
    textHelp: null,
    required: false,
    evidenceType: {
      id: 7,
      description: 'Video (Galería)',
      key: 'video_gallery',
    },
    config: {
      sizes: null,
      types: ['mp4', 'wmv', 'wma'],
      amounts: null,
    },
  },
]
