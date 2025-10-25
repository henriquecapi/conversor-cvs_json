export type ViewType = 'dashboard' | 'upload' | 'files';

export type ConversionState = 'idle' | 'converting' | 'success' | 'error';

export type OutputFormat = 'Parquet' | 'Avro' | 'CSV' | 'JSON' | null;

export interface FileState {
  file: File | null;
  conversionState: ConversionState;
  outputFormat: OutputFormat;
  progress: number;
}
