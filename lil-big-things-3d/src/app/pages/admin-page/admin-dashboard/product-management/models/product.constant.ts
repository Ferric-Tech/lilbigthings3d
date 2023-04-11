import { Validators } from '@angular/forms';
import { AppMultiColumnForm } from 'src/app/forms/models/form-template.interface';
import { AppFieldType } from 'src/app/forms/models/form-templates.enum';
import {
  ProductFormFields,
  ProductFormLabels,
  ProductFormPlaceholders,
} from './product.enum';

export const PRODUCT_FORM_CONFIG: AppMultiColumnForm = {
  columns: [
    {
      name: 'Basic details and main image column',
      forms: [
        {
          name: 'Product basic details',
          fields: [
            {
              name: ProductFormFields.Title,
              type: AppFieldType.InputTitle,
              placeholder: ProductFormPlaceholders.Title,
              validators: [Validators.required],
            },
            {
              name: ProductFormFields.PrimaryImage,
              type: AppFieldType.MainImage,
            },
            {
              name: ProductFormFields.ShortDescription,
              type: AppFieldType.InputTextShort,
              placeholder: ProductFormPlaceholders.ShortDescription,
              validators: [Validators.required],
              characterLimit: 128,
            },
            {
              name: ProductFormFields.LongDescription,
              type: AppFieldType.InputTextLong,
              placeholder: ProductFormPlaceholders.LongDescription,
            },
            {
              name: ProductFormFields.Dimentions,
              type: AppFieldType.InputMultiColumn,
              label: ProductFormLabels.Dimentions,
              multiColumnFieldSetting: [
                {
                  name: ProductFormFields.DimentionX,
                  label: ProductFormLabels.DimentionX,
                  placeholder: '0',
                  validators: [Validators.required],
                },
                {
                  name: ProductFormFields.DimentionY,
                  label: ProductFormLabels.DimentionY,
                  placeholder: '0',
                  validators: [Validators.required],
                },
                {
                  name: ProductFormFields.DimentionZ,
                  label: ProductFormLabels.DimentionZ,
                  placeholder: '0',
                  validators: [Validators.required],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'Files and images column',
      forms: [
        {
          name: 'Product files',
          fields: [
            {
              name: ProductFormFields.FilesLabel,
              type: AppFieldType.LabelSub,
              label: ProductFormLabels.Files,
            },
            {
              name: ProductFormFields.FileDesign,
              type: AppFieldType.UploaderSingleFileUnderlined,
              label: ProductFormLabels.FileDesign,
              validators: [Validators.required],
            },
            {
              name: ProductFormFields.FilePrintLabel,
              type: AppFieldType.UnderlinedLabel,
              label: ProductFormLabels.FilePrintLabel,
            },
            {
              name: ProductFormFields.FilePrintFast,
              type: AppFieldType.UploaderSingleFileWithParams,
              label: ProductFormLabels.FilePrintFast,
            },
            {
              name: ProductFormFields.FilePrintStandard,
              type: AppFieldType.UploaderSingleFileWithParams,
              label: ProductFormLabels.FilePrintStandard,
            },
            {
              name: ProductFormFields.FilePrintOptimised,
              type: AppFieldType.UploaderSingleFileWithParams,
              label: ProductFormLabels.FilePrintOptimised,
            },
          ],
        },
        {
          name: 'Product images',
          fields: [
            {
              name: ProductFormFields.ImagesLabel,
              type: AppFieldType.LabelSub,
              label: ProductFormLabels.Images,
            },
            {
              name: ProductFormFields.ImagesDesign,
              type: AppFieldType.ImageUploader,
              label: ProductFormLabels.ImagesDeign,
            },
            {
              name: ProductFormFields.ImagesProduct,
              type: AppFieldType.ImageUploader,
              label: ProductFormLabels.ImagesProduct,
            },
          ],
        },
      ],
    },
  ],
};
