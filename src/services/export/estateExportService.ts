import { Entity } from '../../types/estate';
import { generatePDF } from '../../utils/pdfGenerator';
import { formatEstateData } from '../../utils/estateFormatter';

export const estateExportService = {
  async exportToPDF(entities: Entity[]) {
    try {
      const formattedData = formatEstateData(entities);
      const pdf = await generatePDF(formattedData);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdf);
      link.download = 'estate_planning.pdf';
      link.click();
    } catch (error) {
      console.error('Error exporting to PDF:', error);
      throw error;
    }
  }
};