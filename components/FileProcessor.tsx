import React from 'react';
import { ArrowLeftIcon, FileIcon } from './icons';
import type { FileState, OutputFormat } from '../types';

interface FileProcessorProps {
  fileState: FileState;
  onConvert: (format: OutputFormat) => void;
  onDownload: () => void;
  onReset: () => void;
}

const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const ConversionButton: React.FC<{
    format: 'CSV' | 'JSON' | 'Parquet' | 'Avro';
    emoji: string;
    name: string;
    description: string;
    onClick: (format: OutputFormat) => void;
}> = ({ format, emoji, name, description, onClick }) => (
    <button 
        onClick={() => onClick(format)}
        className="w-full text-left p-4 border rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
    >
        <span className="text-3xl" aria-hidden="true">{emoji}</span>
        <h3 className="font-bold text-gray-800 mt-2">{name}</h3>
        <p className="text-sm text-gray-500">{description}</p>
    </button>
);


const FileProcessor: React.FC<FileProcessorProps> = ({ fileState, onConvert, onDownload, onReset }) => {
    const { file, conversionState, outputFormat, progress } = fileState;

    if (!file) return null;
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

  return (
    <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
            <button onClick={onReset} className="p-2 rounded-full hover:bg-gray-200 mr-4">
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
            </button>
            <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Processar Arquivo</h1>
                <p className="text-gray-500 mt-1">Converta seu arquivo para o formato desejado.</p>
            </div>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
            <div className="flex items-center bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
                <FileIcon className="w-8 h-8 text-gray-500 mr-4 flex-shrink-0" />
                <div>
                    <p className="font-bold text-gray-800 truncate" title={file.name}>{file.name}</p>
                    <p className="text-sm text-gray-500">{formatBytes(file.size)}</p>
                </div>
            </div>

            {conversionState === 'idle' && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Selecione o formato de saída:</h2>
                    
                    {(fileExtension === 'json' || fileExtension === 'csv') && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           <ConversionButton format="Parquet" emoji="📦" name="Parquet" description="Formato colunar otimizado." onClick={onConvert} />
                           <ConversionButton format="Avro" emoji="🕊️" name="Avro" description="Formato baseado em schema." onClick={onConvert} />
                        </div>
                    )}

                    {fileExtension === 'parquet' && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ConversionButton format="CSV" emoji="📊" name="CSV" description="Valores separados por vírgula." onClick={onConvert} />
                            <ConversionButton format="JSON" emoji="📄" name="JSON" description="Notação de Objeto JavaScript." onClick={onConvert} />
                            <ConversionButton format="Avro" emoji="🕊️" name="Avro" description="Formato baseado em schema." onClick={onConvert} />
                        </div>
                    )}

                     {fileExtension === 'avro' && (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ConversionButton format="CSV" emoji="📊" name="CSV" description="Valores separados por vírgula." onClick={onConvert} />
                            <ConversionButton format="JSON" emoji="📄" name="JSON" description="Notação de Objeto JavaScript." onClick={onConvert} />
                            <ConversionButton format="Parquet" emoji="📦" name="Parquet" description="Formato colunar otimizado." onClick={onConvert} />
                        </div>
                    )}
                </div>
            )}

            {conversionState === 'converting' && (
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">Convertendo para {outputFormat}...</h2>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.2s ease-in-out' }}></div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">{progress}%</p>
                </div>
            )}

            {conversionState === 'success' && (
                <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Conversão Concluída!</h2>
                    <p className="text-gray-500 mb-6">Seu arquivo foi convertido para {outputFormat} com sucesso.</p>
                    <div className="flex justify-center space-x-4">
                        <button 
                            onClick={onReset} 
                            className="bg-gray-200 text-gray-800 font-semibold py-2.5 px-6 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Converter Outro
                        </button>
                        <button 
                            onClick={onDownload}
                            className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Download
                        </button>
                    </div>
                </div>
            )}

        </div>
    </div>
  );
};

export default FileProcessor;
