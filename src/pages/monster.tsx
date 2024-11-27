'use client';
import type React from 'react';
import { useState } from 'react';

const Monster: React.FC = () => {
  const [fileContent, setFileContent] = useState<string | null>(null);

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
    <div>
      <input type="file" accept=".json" onChange={handleFileUpload} />
      {fileContent ? (
        <div>
          <button onClick={() => setFileContent(null)}>Clear File</button>
          <pre>{JSON.stringify(JSON.parse(fileContent), null, 2)}</pre>
        </div>
      ) : null}
    </div>
  );
};

export default Monster;
