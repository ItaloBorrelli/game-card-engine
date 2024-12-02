'use client';
import { Button } from '@/components/ui/button';
import { customFrom5eTools } from '@/lib/custom-from-5e-tools';
import { mapToCard } from '@/lib/hardcodex-from-custom';
import type Monster5eTools from '@/types/monster-5e-tools';
import type React from 'react';

type DownloadFileProps = {
  fileContent: Monster5eTools[];
  fileName: string;
  className?: string;
};

const DownloadFileButton: React.FC<DownloadFileProps> = ({
  fileContent,
  fileName,
  className,
}: DownloadFileProps) => {
  const handleDownload = () => {
    const mapJson = (json: Monster5eTools[]) =>
      json.map(customFrom5eTools).map(mapToCard).join('\n');

    const data = mapJson(fileContent);

    const blob = new Blob([data], { type: 'application/text' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);

    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Button className={className} onClick={handleDownload}>
      Download Hardcodex File
    </Button>
  );
};

export default DownloadFileButton;
