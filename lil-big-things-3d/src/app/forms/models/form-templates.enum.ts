export enum FormLineType {
  MainLabel,
  LabelSub,
  UnderlinedLabel,
  PlainLabel,
  InputTitle,
  InputPlain,
  InputTextShort,
  InputTextLong,
  InputMultiColumn,
  UploaderSingleFileUnderlined,
  UploaderSingleFilePlain,
  UploaderMultiFileUnderlined,
  UploaderMultiFilePlain,
  ImageUploader,
  MainImage,
}

export const FORM_FIELD_TYPES = [
  FormLineType.InputPlain,
  FormLineType.InputTitle,
  FormLineType.InputTextShort,
  FormLineType.InputTextLong,
  FormLineType.InputMultiColumn,
  FormLineType.UploaderMultiFilePlain,
  FormLineType.UploaderMultiFileUnderlined,
  FormLineType.UploaderSingleFilePlain,
  FormLineType.UploaderSingleFileUnderlined,
  FormLineType.ImageUploader,
  FormLineType.MainImage,
];
