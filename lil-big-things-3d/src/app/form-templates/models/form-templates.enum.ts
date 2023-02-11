export enum FormLineType {
  MainLabel,
  LabelSub,
  UnderlinedLabel,
  PlainLabel,
  InputTitle,
  InputPlain,
  InputLong,
  UploaderSingleFileUnderlined,
  UploaderSingleFilePlain,
  UploaderMultiFileUnderlined,
  UploaderMultiFilePlain,
  ImageUploader,
}

export const FORM_FIELD_TYPES = [
  FormLineType.InputLong,
  FormLineType.InputPlain,
  FormLineType.InputTitle,
  FormLineType.UploaderMultiFilePlain,
  FormLineType.UploaderMultiFileUnderlined,
  FormLineType.UploaderSingleFilePlain,
  FormLineType.UploaderSingleFileUnderlined,
  FormLineType.ImageUploader,
];
