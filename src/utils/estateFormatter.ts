import { Entity } from '../types/estate';

export const formatEstateData = (entities: Entity[]): string => {
  const grouped = groupEntitiesByType(entities);
  const totalValue = calculateTotalValue(entities);

  let report = 'Estate Planning Summary Report\n\n';

  Object.entries(grouped).forEach(([type, typeEntities]) => {
    const typeTotal = calculateTotalValue(typeEntities);
    const percentage = (typeTotal / totalValue) * 100;

    report += `${type.toUpperCase()} ENTITIES\n`;
    report += `Total Value: $${typeTotal.toLocaleString()}\n`;
    report += `Percentage of Portfolio: ${percentage.toFixed(2)}%\n`;
    report += `Number of Entities: ${typeEntities.length}\n\n`;

    typeEntities.forEach(entity => {
      report += `- ${entity.name}: $${entity.revenue.toLocaleString()}\n`;
      report += `  Description: ${entity.description}\n`;
      report += `  Ownership: ${entity.ownership}\n\n`;
    });

    report += '\n';
  });

  report += `TOTAL PORTFOLIO VALUE: $${totalValue.toLocaleString()}\n`;

  return report;
};

const calculateTotalValue = (entities: Entity[]): number => {
  return entities.reduce((total, entity) => total + (entity.revenue || 0), 0);
};

const groupEntitiesByType = (entities: Entity[]) => {
  return entities.reduce((groups, entity) => {
    const type = entity.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(entity);
    return groups;
  }, {} as Record<string, Entity[]>);
};