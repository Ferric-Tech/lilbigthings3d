import { Validators } from '@angular/forms';
import { AppMultiColumnForm } from 'src/app/form-templates/models/form-template.interface';
import { FormLineType } from 'src/app/form-templates/models/form-templates.enum';
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
              name: ProductFormFields.PriimaryImage,
              type: FormLineType.MainImage,
            },
            {
              name: ProductFormFields.Description,
              type: FormLineType.InputLong,
              placeholder: ProductFormPlaceholders.Description,
              validators: [Validators.required],
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
              type: FormLineType.UploaderSingleFilePlain,
              label: ProductFormLabels.FilePrintFast,
            },
            {
              name: ProductFormFields.FilePrintStandard,
              type: FormLineType.UploaderSingleFilePlain,
              label: ProductFormLabels.FilePrintStandard,
            },
            {
              name: ProductFormFields.FilePrintOptimised,
              type: FormLineType.UploaderSingleFilePlain,
              label: ProductFormLabels.FilePrintOptimised,
            },
            {
              name: ProductFormFields.FilePrintCustom,
              type: FormLineType.UploaderSingleFilePlain,
              label: ProductFormLabels.FilePrintCustom,
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
