import { Validators } from '@angular/forms';
import { AppMultiColumnForm } from 'src/app/form-templates/models/form-template.interface';
import { FormLineType } from 'src/app/form-templates/models/form-templates.enum';

export const ADD_PRODUCT_FORM_CONFIG: AppMultiColumnForm = {
  columns: [
    {
      name: 'Basic details and files column',
      forms: [
        {
          name: 'Product Basic details',
          fields: [
            {
              name: 'title',
              type: FormLineType.InputTitle,
              placeholder: 'New Product',
              validators: [Validators.required],
            },
            {
              name: 'description',
              type: FormLineType.InputLong,
              placeholder: 'Please provide a description',
              validators: [Validators.required],
            },
          ],
        },
        {
          name: 'Product files',
          fields: [
            {
              name: 'files-label',
              type: FormLineType.LabelSub,
              label: 'Files',
            },
            {
              name: 'design-file',
              type: FormLineType.UploaderSingleFileUnderlined,
              label: 'Design file',
              validators: [Validators.required],
            },
            {
              name: 'print-files-label',
              type: FormLineType.UnderlinedLabel,
              label: 'Print file',
            },
            {
              name: 'print-file-fast',
              type: FormLineType.UploaderSingleFilePlain,
              label: 'Fast',
            },
            {
              name: 'print-file-standard',
              type: FormLineType.UploaderSingleFilePlain,
              label: 'Standard',
            },
            {
              name: 'print-file-optimised',
              type: FormLineType.UploaderSingleFilePlain,
              label: 'Optimised',
            },
            {
              name: 'design-file-custom',
              type: FormLineType.UploaderSingleFilePlain,
              label: 'Custom',
            },
          ],
        },
      ],
    },
    {
      name: 'Images column',
      forms: [
        {
          name: 'Product images',
          fields: [
            {
              name: 'images-label',
              type: FormLineType.LabelSub,
              label: 'Images',
            },
            {
              name: 'images-design',
              type: FormLineType.ImageUploader,
              label: 'Design',
            },
            {
              name: 'images-product',
              type: FormLineType.ImageUploader,
              label: 'Product',
            },
          ],
        },
      ],
    },
  ],
};
