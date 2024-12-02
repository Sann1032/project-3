import { marked } from 'marked';
import DOMPurify from 'dompurify';

export const formatAIResponse = (response: string): string => {
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true
  });

  // Parse markdown and sanitize HTML
  const formattedResponse = DOMPurify.sanitize(marked.parse(response));
  
  return formattedResponse;
};

// Format code blocks with syntax highlighting
export const formatCodeBlock = (code: string, language: string): string => {
  return `\`\`\`${language}\n${code}\n\`\`\``;
};

// Format lists
export const formatList = (items: string[]): string => {
  return items.map(item => `- ${item}`).join('\n');
};

// Format tables
export const formatTable = (headers: string[], rows: string[][]): string => {
  const headerRow = `| ${headers.join(' | ')} |`;
  const separator = `| ${headers.map(() => '---').join(' | ')} |`;
  const dataRows = rows.map(row => `| ${row.join(' | ')} |`);
  
  return [headerRow, separator, ...dataRows].join('\n');
};