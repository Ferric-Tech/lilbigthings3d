export enum ProductFormFields {
  Title = 'title',
  PrimaryImage = 'primary-image-url',
  ShortDesc = 'shortDescription',
  LongDesc = 'longDescription',
  Dimentions = 'dimentions',
  DimentionX = 'x',
  DimentionY = 'y',
  DimentionZ = 'z',
  FilesLabel = 'files-label',
  FileDesign = 'designFile', // To align with ProductFilesMetaData keys
  FilePrintLabel = 'print-files-label',
  FilePrintFast = 'printFileFast', // To align with ProductFilesMetaData keys
  FilePrintStandard = 'printFileStandard', // To align with ProductFilesMetaData keys
  FilePrintOptimised = 'printFileOptimised', // To align with ProductFilesMetaData keys
  FilePrintCustom = 'printFileCustom', // To align with ProductFilesMetaData keys
  ImagesLabel = 'images-label',
  ImagesDesign = 'images-design',
  ImagesProduct = 'images-product',
}

export enum ProductFormPlaceholders {
  Title = 'New Product',
  ShortDescription = 'Please provide a short description (128 characters max)',
  LongDescription = 'Provide a longer extended description here',
}

export enum ProductFormLabels {
  Dimentions = 'Dimentions (mm)',
  DimentionX = 'X',
  DimentionY = 'Y',
  DimentionZ = 'Z',
  Files = 'Files',
  FileDesign = 'Design file',
  FilePrintLabel = 'Print files',
  FilePrintFast = 'Fast',
  FilePrintStandard = 'Standard',
  FilePrintOptimised = 'Optimised',
  FilePrintCustom = 'Custom',
  Images = 'Images',
  ImagesDeign = 'Design',
  ImagesProduct = 'Product',
}
