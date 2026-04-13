import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) return NextResponse.json([]);

  try {
    const mapsDir = path.join(process.cwd(), 'content', 'maps');
    if (!fs.existsSync(mapsDir)) return NextResponse.json([]);

    const files = fs.readdirSync(mapsDir).filter(f => f.endsWith('.json'));
    
    interface SearchResult {
      id: string;
      label: string;
      domain: string;
      domainName: string;
    }

    interface MapNode {
      id: string;
      data?: {
        label?: string;
      };
    }

    const allResults: SearchResult[] = [];

    for (const file of files) {
      try {
        const domainId = file.replace('.json', '');
        const filePath = path.join(mapsDir, file);
        const mapData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const domainName = mapData.name || domainId;

        const matches = (mapData.nodes || [])
          .filter((node: MapNode) => 
            node.data?.label?.toLowerCase().includes(query) || 
            node.id?.toLowerCase().includes(query)
          )
          .map((node: MapNode) => ({
            id: node.id,
            label: node.data?.label || node.id,
            domain: domainId,
            domainName: domainName
          }));
        
        allResults.push(...matches);
      } catch (fileErr) {
        console.error(`Error processing map file ${file}:`, fileErr);
        continue;
      }
    }

    return NextResponse.json(allResults);
  } catch (e) {
    console.error(`Global search error:`, e);
    return NextResponse.json([]);
  }
}
