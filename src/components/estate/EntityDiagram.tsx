import React, { useRef, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Entity } from '../../types/estate';
import { EntityNode } from './EntityNode';
import { DiagramConnector } from './DiagramConnector';

interface EntityDiagramProps {
  entities: Entity[];
  onDragEnd: (result: any) => void;
  onPositionUpdate: (id: string, position: { x: number; y: number }) => void;
}

export const EntityDiagram: React.FC<EntityDiagramProps> = ({
  entities,
  onDragEnd,
  onPositionUpdate
}) => {
  const diagramRef = useRef<HTMLDivElement>(null);
  const activeEntities = entities.filter(e => e.type === 'active');
  const passiveEntities = entities.filter(e => e.type === 'passive');

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = diagramRef.current;

    if (!container || !ctx) return;

    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    container.appendChild(canvas);

    // Draw connections
    const drawConnections = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      entities.forEach(entity => {
        if (entity.position) {
          // Draw connection to trust
          ctx.beginPath();
          ctx.moveTo(entity.position.x, entity.position.y);
          ctx.lineTo(canvas.width / 2, canvas.height / 2);
          ctx.strokeStyle = entity.type === 'active' ? '#3B82F6' : '#10B981';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });
    };

    drawConnections();

    return () => {
      container.removeChild(canvas);
    };
  }, [entities]);

  return (
    <div ref={diagramRef} className="relative h-[800px]">
      {/* Trust Node in Center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg border-2 border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800">Family Trust</h3>
          <p className="text-sm text-purple-600">Asset Protection & Estate Planning</p>
        </div>
      </div>

      {/* Active Business Column */}
      <div className="absolute left-0 top-0 w-1/3 p-4">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Active Businesses</h3>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-blue-700">S Corporation Holdings</h4>
          <p className="text-sm text-blue-600">Consolidated active business management</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="active">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {activeEntities.map((entity, index) => (
                  <Draggable key={entity.id} draggableId={entity.id} index={index}>
                    {(provided, snapshot) => (
                      <EntityNode
                        entity={entity}
                        provided={provided}
                        snapshot={snapshot}
                        onPositionUpdate={onPositionUpdate}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Passive Investment Column */}
      <div className="absolute right-0 top-0 w-1/3 p-4">
        <h3 className="text-lg font-semibold text-green-800 mb-4">Passive Investments</h3>
        <div className="bg-green-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-green-700">LLC Holdings</h4>
          <p className="text-sm text-green-600">Passive investment management</p>
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="passive">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-4"
              >
                {passiveEntities.map((entity, index) => (
                  <Draggable key={entity.id} draggableId={entity.id} index={index}>
                    {(provided, snapshot) => (
                      <EntityNode
                        entity={entity}
                        provided={provided}
                        snapshot={snapshot}
                        onPositionUpdate={onPositionUpdate}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};