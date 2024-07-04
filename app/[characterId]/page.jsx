'use client'

import {useCallback, useEffect, useState} from "react";
import ReactFlow, {Controls, applyNodeChanges, applyEdgeChanges} from 'reactflow';
import {fetchCharacter, fetchCharacterStarships, fetchFilms} from "@/utils/services";
import CustomNode from '@/components/CustomNode/CustomNode';
import 'reactflow/dist/style.css';

const nodeTypes = {
  custom: CustomNode
};

export default function CharacterPage({params}) {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const {characterId} = params;

  const generateFilmsAndStarships = (filmResponses, characterStarships, characterId) => {
    const filmNodes = [];
    const filmEdges = [];
    const starshipNodes = [];
    const starshipEdges = [];

    for (const filmResponse of filmResponses) {
      const film = filmResponse.data;
      const filmNode = {
        id: `film-${film.id}`,
        type: 'custom',
        data: {
          id: film.id,
          type: 'film',
          title: film.title
        },
        position: {
          x: 400 * (filmNodes.length + 1),
          y: 400
        }
      };

      filmNodes.push(filmNode);
      filmEdges.push({
        id: `character-${characterId}-film-${film.id}`,
        source: `character-${characterId}`,
        target: `film-${film.id}`
      });

      for (const starship of characterStarships) {
        if (film.starships.includes(starship.id)) {
          const starshipNode = {
            id: `starship-${starship.id}`,
            type: 'custom',
            data: {
              id: starship.id,
              type: 'starship',
              title: starship.name
            },
            position: {
              x: 300 * (starshipNodes.length + 1),
              y: 800
            }
          };

          starshipNodes.push(starshipNode);
          starshipEdges.push({
            id: `film-${film.id}-starship-${starship.id}`,
            source: `film-${film.id}`,
            target: `starship-${starship.id}`
          });
        }
      }
    }

    return {
      filmNodes,
      filmEdges,
      starshipNodes,
      starshipEdges
    };
  };

  useEffect(() => {
    (async () => {
      try {
        const character = await fetchCharacter(characterId);
        const filmResponses = await fetchFilms(character);
        const characterStarshipResponses = await fetchCharacterStarships(character);
        const characterStarships = characterStarshipResponses.map(res => res.data);

        const characterNode = {
          id: `character-${characterId}`,
          type: 'custom',
          data: {
            id: character.id,
            type: 'character',
            title: character.name
          },
          position: {
            x: 10,
            y: 10
          }
        };

        const {
          filmNodes,
          starshipNodes,
          filmEdges,
          starshipEdges
        } = generateFilmsAndStarships(filmResponses, characterStarships, characterId);

        setNodes([characterNode, ...filmNodes, ...starshipNodes]);
        setEdges([...filmEdges, ...starshipEdges]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();
  }, [characterId]);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);

  return (
    <div style={{width: '100vw', height: '100vh'}}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        defaultViewport={{
          x: 0,
          y: 0,
          zoom: 0.56
        }}
      >
        <Controls/>
      </ReactFlow>
    </div>
  );
};
