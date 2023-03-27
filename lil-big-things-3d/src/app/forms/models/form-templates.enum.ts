export enum FormLineType {
  MainLabel,
  LabelSub,
  UnderlinedLabel,
  PlainLabel,
  InputTitle,
  InputPlain,
  InputLong,
  InputMultiColumn,
  UploaderSingleFileUnderlined,
  UploaderSingleFilePlain,
  UploaderMultiFileUnderlined,
  UploaderMultiFilePlain,
  ImageUploader,
  MainImage,
}

export const FORM_FIELD_TYPES = [
  FormLineType.InputLong,
  FormLineType.InputPlain,
  FormLineType.InputTitle,
  FormLineType.InputMultiColumn,
  FormLineType.UploaderMultiFilePlain,
  FormLineType.UploaderMultiFileUnderlined,
  FormLineType.UploaderSingleFilePlain,
  FormLineType.UploaderSingleFileUnderlined,
  FormLineType.ImageUploader,
  FormLineType.MainImage,
];
