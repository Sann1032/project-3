import { useCallback, useState } from 'react';
import {
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from 'reactflow';

const initialNodes: Node[] = [
  {
    id: 'trust',
    type: 'trust',
    position: { x: 400, y: 300 },
    data: { label: 'Revocable Living Trust' }
  },
  {
    id: 'scorp',
    type: 'holding',
    position: { x: 100, y: 200 },
    data: { 
      label: 'LLC Holdings',
      type: 'active',
      isLLC: false
    }
  },
  {
    id: 'llc',
    type: 'holding',
    position: { x: 700, y: 200 },
    data: { 
      label: 'LLC Holdings',
      type: 'passive'
    }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1', source: 'scorp', target: 'trust' },
  { id: 'e2', source: 'llc', target: 'trust' }
];

export const useEntityDiagram = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [totalActiveRevenue, setTotalActiveRevenue] = useState(0);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const calculateHoldingType = useCallback((activeBusinesses: any[]) => {
    const totalRevenue = activeBusinesses.reduce((sum, business) => sum + (business.revenue || 0), 0);
    setTotalActiveRevenue(totalRevenue);
    return totalRevenue < 45000 ? 'LLC' : 'S Corporation';
  }, []);

  const addEntity = useCallback(
    (entity: {
      name: string;
      type: 'active' | 'real estate' | 'retirement' | 'investment';
      description: string;
      revenue?: number;
      hasRealEstate?: boolean;
      realEstateDetails?: {
        name: string;
        value: number;
        description: string;
      };
      trustOnly?: boolean;
    }) => {
      const newId = `entity-${Date.now()}`;
      let position = { x: 0, y: 0 };
      let targetId = '';

      if (entity.type === 'active') {
        position = { x: 100, y: 100 };
        targetId = 'scorp';
      } else {
        position = { x: 700, y: 100 };
        targetId = entity.trustOnly ? 'trust' : 'llc';
      }

      const newNode: Node = {
        id: newId,
        type: 'entity',
        position,
        data: {
          name: entity.name,
          type: entity.type,
          description: entity.description,
          revenue: entity.revenue,
          ownership: entity.trustOnly ? 'Trust Owned' : `${calculateHoldingType(nodes)} Holdings`
        }
      };

      setNodes((nds) => [...nds, newNode]);
      if (!entity.trustOnly) {
        setEdges((eds) => [...eds, { 
          id: `e-${newId}`, 
          source: newId, 
          target: targetId 
        }]);
      }

      // Add real estate entity if applicable
      if (entity.hasRealEstate && entity.realEstateDetails) {
        const realEstateId = `re-${Date.now()}`;
        const realEstateNode: Node = {
          id: realEstateId,
          type: 'entity',
          position: { x: 700, y: 100 },
          data: {
            name: entity.realEstateDetails.name,
            type: 'real estate',
            description: entity.realEstateDetails.description,
            revenue: entity.realEstateDetails.value,
            ownership: 'LLC Holdings'
          }
        };

        setNodes((nds) => [...nds, realEstateNode]);
        setEdges((eds) => [...eds, { 
          id: `e-${realEstateId}`, 
          source: realEstateId, 
          target: 'llc'
        }]);
      }

      // Update holding company type based on total revenue
      if (entity.type === 'active') {
        const newTotalRevenue = totalActiveRevenue + (entity.revenue || 0);
        const holdingType = newTotalRevenue < 45000 ? 'LLC' : 'S Corporation';
        
        setNodes((nds) => nds.map(node => 
          node.id === 'scorp' 
            ? { 
                ...node, 
                data: { 
                  ...node.data, 
                  label: `${holdingType} Holdings`,
                  isLLC: holdingType === 'LLC'
                } 
              }
            : node
        ));
      }
    },
    [nodes, setNodes, setEdges, totalActiveRevenue, calculateHoldingType]
  );

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addEntity,
    calculateHoldingType
  };
};