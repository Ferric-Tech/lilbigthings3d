export interface ProductForDisplay extends Product {
  id: string;
}

export interface Product {
  [key: string]: unknown;
  data: ProductData;
  files: ProductFiles;
  images: ProductImages;
}

export interface ProductData {
  [key: string]: unknown;
  title: string;
  description: string;
  dimentions: {
    x: number;
    y: number;
    z: number;
  };
  filesMetaData: ProductFilesMetaData;
  imagesMetaData: ProductImagesMetaData;
}

export interface ProductFiles {
  [key: string]: File | undefined;
  designFile?: File;
  printFileFast?: File;
  printFileStandard?: File;
  printFileOptimised?: File;
  printFileCustom?: File;
}

export interface ProductImages {
  [key: string]: File[] | undefined;
  design?: File[];
  product?: File[];
}

export interface ProductImageUrls {
  [key: string]: string[] | undefined;
  'images-design'?: string[];
  'images-product'?: string[];
}

export interface ProductFilesMetaData {
  [key: string]: string | undefined;
  designFile: string;
  printFileFast?: string;
  printFileStandard?: string;
  printFileOptimised?: string;
  printFileCustom?: string;
}

export interface ProductImagesMetaData {
  [key: string]: string[] | undefined;
  design?: string[];
  product?: string[];
}
