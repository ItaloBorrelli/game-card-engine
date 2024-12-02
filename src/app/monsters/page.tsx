'use client';
import MonsterManualCard from '@/components/card-block/5e-monster-manual-card/monster-manual-card';
import { Button } from '@/components/ui/button';
import DownloadFileButton from '@/components/ui/download-file-button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { customFrom5eTools } from '@/lib/custom-from-5e-tools';
import type Monster5eTools from '@/types/monster-5e-tools';
import monsters from 'content/default_monsters.json';
import type React from 'react';
import { useState } from 'react';

const DisplayMonsterManualCards: React.FC<{ monsters: Monster5eTools[] }> = ({
  monsters,
}: { monsters: Monster5eTools[] }) =>
  monsters
    .map(customFrom5eTools)
    .map((monster) => (
      <MonsterManualCard monster={monster} key={monster.name} />
    ));

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

  const [selectValue, setSelectValue] = useState<string>('5e');

  return (
    <>
      {!fileContent ? (
        <Input type="file" accept=".json" onChange={handleFileUpload} />
      ) : (
        <div className="space-y-2">
          <div className="mt-2 ml-4 space-x-2 flex items-center">
            <p className="text-sm font-medium">Card Style: </p>
            <Select value={selectValue} onValueChange={setSelectValue}>
              <SelectTrigger className="w-[180px]">
                <SelectValue defaultValue="5e" placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5e">5e Monster Manual</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <DownloadFileButton
              fileContent={JSON.parse(fileContent) as Monster5eTools[]}
              fileName="hardcodex.csv"
            />
            <Button onClick={() => setFileContent(null)}>Clear File</Button>
          </div>
          {selectValue === '5e' ? (
            <DisplayMonsterManualCards
              monsters={JSON.parse(fileContent) as Monster5eTools[]}
            />
          ) : (
            <></>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
