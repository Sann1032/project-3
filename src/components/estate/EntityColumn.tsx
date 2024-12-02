import React from 'react';
import { Building2 } from 'lucide-react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import { EntityCard } from './EntityCard';
import { Entity, EntityType } from '../../types/estate';

interface EntityColumnProps {
  title: string;
  type: EntityType;
  entities: Entity[];
  onDragEnd: (result: any) => void;
  holdingCompany: {
    name: string;
    description: string;
    colorClass: 'blue' | 'green';
  };
}

export const EntityColumn: React.FC<EntityColumnProps> = ({
  title,
  type,
  entities,
  onDragEnd,
  holdingCompany
}) => {
  const filteredEntities = entities.filter(entity => entity.type === type);
  const colorClasses = {
    blue: {
      icon: 'text-blue-600',
      bg: 'bg-blue-50',
      title: 'text-blue-800',
      desc: 'text-blue-600'
    },
    green: {
      icon: 'text-green-600',
      bg: 'bg-green-50',
      title: 'text-green-800',
      desc: 'text-green-600'
    }
  };

  const colors = colorClasses[holdingCompany.colorClass];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Building2 className={`w-5 h-5 ${colors.icon}`} />
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>

      <div className={`p-4 ${colors.bg} rounded-lg mb-4`}>
        <h3 className={`font-medium ${colors.title}`}>
          {holdingCompany.name}
        </h3>
        <p className={`text-sm ${colors.desc}`}>
          {holdingCompany.description}
        </p>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={type}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {filteredEntities.map((entity, index) => (
                <div key={entity.id}>
                  <EntityCard entity={entity} />
                </div>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};