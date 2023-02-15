export interface ProductForDisplay extends Product {
  id: string;
}

export interface Product {
  [key: string]: unknown;
  title: string;
  description: string;
  dimentions: { x: string; y: string; z: string };
  files: ProductFiles | ProductFilesMetaData;
  images: ProductImages;
}

export interface ProductFiles {
  [key: string]: File | undefined;
  designFile: File;
  printFileFast?: File;
  printFileStandard?: File;
  printFileOptimised?: File;
  printFileCustom?: File;
}

export interface ProductFilesMetaData {
  [key: string]: string | undefined;
  designFile: string;
  printFileFast?: string;
  printFileStandard?: string;
  printFileOptimised?: string;
  printFileCustom?: string;
}

export interface ProductImages {
  [key: string]: File[] | undefined;
  design?: File[];
  product?: File[];
}
