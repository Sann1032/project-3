import React, { useState } from 'react';
import { Building2, Plus } from 'lucide-react';
import ReactFlow, { 
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  Panel
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useEntityDiagram } from '../../hooks/useEntityDiagram';
import { EntityNode } from './EntityNode';
import { TrustNode } from './TrustNode';
import { HoldingNode } from './HoldingNode';
import { AddEntityModal } from './AddEntityModal';
import { ExportButton } from './ExportButton';

const nodeTypes: NodeTypes = {
  entity: EntityNode,
  trust: TrustNode,
  holding: HoldingNode
};

export const EntityEstatePlanning: React.FC = () => {
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addEntity,
    calculateHoldingType
  } = useEntityDiagram();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-1 h-screen bg-gray-50">
      <div className="p-4 md:p-8">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <Building2 className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Entity Estate Planning
              </h1>
            </div>
            <ExportButton entities={nodes.map(node => node.data)} />
          </div>
        </div>

        <div className="h-[calc(100vh-180px)] bg-gray-100 rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
            minZoom={0.5}
            maxZoom={1.5}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
          >
            <Background />
            <Controls />
            <MiniMap />
            <Panel position="top-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Plus className="w-5 h-5" />
                <span>Add Entity</span>
              </button>
            </Panel>
          </ReactFlow>
        </div>
      </div>

      <AddEntityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addEntity}
        calculateHoldingType={calculateHoldingType}
      />
    </div>
  );
};