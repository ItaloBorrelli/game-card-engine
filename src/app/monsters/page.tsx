'use client';
import MonsterManualCard from '@/components/card-block/5e-monster-manual-card/monster-manual-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { customFrom5eTools } from '@/lib/custom-from-5e-tools';
import { mapToCard } from '@/lib/hardcodex-from-custom';
import type Monster5eTools from '@/types/monster-5e-tools';
import monsters from 'content/default_monsters.json';
import type React from 'react';
import { useState } from 'react';

type DownloadFileProps = { fileContent: Monster5eTools[]; className?: string };

const DownloadFile: React.FC<DownloadFileProps> = ({
  fileContent,
  className,
}: DownloadFileProps) => {
  const handleDownload = () => {
    // Create file content
    const mapJson = (json: Monster5eTools[]) =>
      json.map(customFrom5eTools).map(mapToCard).join('\n');

    const data = mapJson(fileContent);

    // Create a blob and URL
    const blob = new Blob([data], { type: 'application/text' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'hardcodex_monsters.txt'; // Set the desired file name
    document.body.appendChild(a);

    // Trigger the download and clean up
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Release memory
  };

  return (
    <Button className={className} onClick={handleDownload}>
      Download Hardcodex File
    </Button>
  );
};

const Page: React.FC = () => {
  const [fileContent, setFileContent] = useState<string | null>(
    JSON.stringify(monsters)
  );

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setFileContent(content);
      };
      reader.onerror = () => {
        alert('Error reading file. Please try again.');
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid JSON file.');
    }
  };

  return (
    <>
      {fileContent ? (
        <div>
          <div className="m-4 space-x-2">
            <DownloadFile
              fileContent={JSON.parse(fileContent) as Monster5eTools[]}
            />
            <Button onClick={() => setFileContent(null)}>Clear File</Button>
          </div>
          {(JSON.parse(fileContent) as Monster5eTools[])
            .map(customFrom5eTools)
            .map((monster) => (
              <MonsterManualCard monster={monster} key={monster.name} />
            ))}
        </div>
      ) : (
        <Input type="file" accept=".json" onChange={handleFileUpload} />
      )}
    </>
  );
};

export default Page;
