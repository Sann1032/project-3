export const generatePDF = async (data: string): Promise<Blob> => {
  // This is a placeholder for PDF generation
  // In a real application, you would use a library like pdfmake or jsPDF
  const content = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #f5f5f5; }
        </style>
      </head>
      <body>
        <h1>Estate Planning Report</h1>
        <pre>${data}</pre>
      </body>
    </html>
  `;

  // For now, return as HTML file
  return new Blob([content], { type: 'text/html' });
};