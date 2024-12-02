'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Monster5eTools } from '@/types/monster_5etools';
import { mapToCard } from '@/lib/hardcodexFromCustom';
import { customFrom5eTools } from '@/lib/customFrom5eTools';
import type React from 'react';
import { useState } from 'react';
import MonsterCard from '@/components/card-block/monster-card';
import monsters from '@/../content/default_monsters.json';
type DownloadFileProps = { fileContent: Monster5eTools[] };

const DownloadFile: React.FC<DownloadFileProps> = ({
  fileContent,
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

  return <Button onClick={handleDownload}>Download Hardcodex File</Button>;
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
          {(JSON.parse(fileContent) as Monster5eTools[])
            .map(customFrom5eTools)
            .map((monster) => (
              <MonsterCard monster={monster} key={monster.name} />
            ))}
          <DownloadFile
            fileContent={JSON.parse(fileContent) as Monster5eTools[]}
          />
          <Button onClick={() => setFileContent(null)}>Clear File</Button>
        </div>
      ) : (
        <Input type="file" accept=".json" onChange={handleFileUpload} />
      )}
    </>
  );
};

export default Page;
