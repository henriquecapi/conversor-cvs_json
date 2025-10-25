import React, { useState, useCallback, useRef } from 'react';
import { UploadIcon, InfoIcon, JsonIcon, CsvIcon, ArrowLeftIcon, CheckIcon, ParquetIcon, AvroIcon } from './icons';

interface UploadAreaProps {
  onFileSelect: (file: File) => void;
}

const UploadArea: React.FC<UploadAreaProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File | null | undefined) => {
    if (file && (file.type === 'application/json' || file.name.endsWith('.json') || file.type === 'text/csv' || file.name.endsWith('.csv') || file.name.endsWith('.parquet') || file.name.endsWith('.avro'))) {
      onFileSelect(file);
    } else {
      alert("Please upload a valid JSON, CSV, Parquet, or Avro file.");
    }
  }, [onFileSelect]);
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center mb-6">
        <button className="p-2 rounded-full hover:bg-gray-200 mr-4">
          <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Upload & Conversão</h1>
          <p className="text-gray-500 mt-1">Envie arquivos JSON/CSV e converta para qualquer formato</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 text-blue-800 rounded-lg p-4 flex items-start mb-8">
        <InfoIcon className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
        <div>
          <h3 className="font-semibold">Formatos suportados para upload: JSON, CSV, Parquet e Avro</h3>
          <p className="text-sm">Você pode converter entre formatos após o upload</p>
        </div>
      </div>

      <div 
        className={`bg-white rounded-xl border-2 border-dashed p-8 text-center transition-all duration-300 ${isDragging ? 'border-indigo-600 bg-indigo-50' : 'border-gray-300'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center shadow-lg">
                <UploadIcon className="w-8 h-8"/>
            </div>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Upload de Arquivo</h2>
        <p className="text-gray-500 mt-1 mb-6">Arraste e solte seu arquivo JSON, CSV, Parquet ou Avro</p>
        
        <input ref={fileInputRef} type="file" accept=".json,.csv,.parquet,.avro" className="hidden" onChange={onFileChange} />
        <button 
          onClick={onButtonClick} 
          className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center mx-auto"
        >
          <UploadIcon className="w-5 h-5 mr-2"/>
          Selecionar Arquivo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="bg-white border border-yellow-300 rounded-xl p-6 flex items-center shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 text-yellow-600 flex items-center justify-center mr-4">
                <JsonIcon className="w-7 h-7" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-gray-800">JSON</h3>
                <p className="text-sm text-green-600 font-medium flex items-center"><CheckIcon className="w-4 h-4 mr-1"/> Upload direto</p>
            </div>
        </div>
        <div className="bg-white border border-green-300 rounded-xl p-6 flex items-center shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-green-100 text-green-600 flex items-center justify-center mr-4">
                <CsvIcon className="w-7 h-7" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-gray-800">CSV</h3>
                <p className="text-sm text-green-600 font-medium flex items-center"><CheckIcon className="w-4 h-4 mr-1"/> Upload direto</p>
            </div>
        </div>
        <div className="bg-white border border-purple-300 rounded-xl p-6 flex items-center shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center mr-4">
                <ParquetIcon className="w-7 h-7" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-gray-800">Parquet</h3>
                <p className="text-sm text-green-600 font-medium flex items-center"><CheckIcon className="w-4 h-4 mr-1"/> Upload direto</p>
            </div>
        </div>
        <div className="bg-white border border-sky-300 rounded-xl p-6 flex items-center shadow-sm">
            <div className="w-12 h-12 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center mr-4">
                <AvroIcon className="w-7 h-7" />
            </div>
            <div>
                <h3 className="font-bold text-lg text-gray-800">Avro</h3>
                <p className="text-sm text-green-600 font-medium flex items-center"><CheckIcon className="w-4 h-4 mr-1"/> Upload direto</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default UploadArea;