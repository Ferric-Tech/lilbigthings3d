import { Validators } from '@angular/forms';
import { AppMultiColumnForm } from 'src/app/forms/models/form-template.interface';
import { FormLineType } from 'src/app/forms/models/form-templates.enum';
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
              type: FormLineType.InputTitle,
              placeholder: ProductFormPlaceholders.Title,
              validators: [Validators.required],
            },
            {
              name: ProductFormFields.PrimaryImage,
              type: FormLineType.MainImage,
            },
            {
              name: ProductFormFields.ShortDescription,
              type: FormLineType.InputTextShort,
              placeholder: ProductFormPlaceholders.ShortDescription,
              validators: [Validators.required],
              characterLimit: 128,
            },
            {
              name: ProductFormFields.LongDescription,
              type: FormLineType.InputTextLong,
              placeholder: ProductFormPlaceholders.LongDescription,
            },
            {
              name: ProductFormFields.Dimentions,
              type: FormLineType.InputMultiColumn,
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
              type: FormLineType.LabelSub,
              label: ProductFormLabels.Files,
            },
            {
              name: ProductFormFields.FileDesign,
              type: FormLineType.UploaderSingleFileUnderlined,
              label: ProductFormLabels.FileDesign,
              validators: [Validators.required],
            },
            {
              name: ProductFormFields.FilePrintLabel,
              type: FormLineType.UnderlinedLabel,
              label: ProductFormLabels.FilePrintLabel,
            },
            {
              name: ProductFormFields.FilePrintFast,
              type: FormLineType.UploaderSingleFileWithParams,
              label: ProductFormLabels.FilePrintFast,
            },
            {
              name: ProductFormFields.FilePrintStandard,
              type: FormLineType.UploaderSingleFileWithParams,
              label: ProductFormLabels.FilePrintStandard,
            },
            {
              name: ProductFormFields.FilePrintOptimised,
              type: FormLineType.UploaderSingleFileWithParams,
              label: ProductFormLabels.FilePrintOptimised,
            },
          ],
        },
        {
          name: 'Product images',
          fields: [
            {
              name: ProductFormFields.ImagesLabel,
              type: FormLineType.LabelSub,
              label: ProductFormLabels.Images,
            },
            {
              name: ProductFormFields.ImagesDesign,
              type: FormLineType.ImageUploader,
              label: ProductFormLabels.ImagesDeign,
            },
            {
              name: ProductFormFields.ImagesProduct,
              type: FormLineType.ImageUploader,
              label: ProductFormLabels.ImagesProduct,
            },
          ],
        },
      ],
    },
  ],
};
