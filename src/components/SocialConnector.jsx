import React, { useEffect, useMemo, useRef } from 'react';
import { ReactFlow, Background, useNodesState, useEdgesState } from '@xyflow/react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaGlobe } from 'react-icons/fa';
import { SiMercadopago } from 'react-icons/si';

function SocialConnector({ onInteract }) {
  // Estilo comum dos nodeboxes (ícones)
  const iconBoxStyle = {
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    border: '1px solid var(--border)',
    borderRadius: '50%',
  };

  // Lê o valor do --container-max do CSS para sincronizar o limite visual
  const containerMaxPx = useMemo(() => {
    if (typeof window === 'undefined') return 1550; // fallback
    const root = document.documentElement;
    const val = getComputedStyle(root).getPropertyValue('--container-max').trim();
    if (val.endsWith('px')) return parseInt(val, 10) || 1550;
    const asNum = Number(val);
    return Number.isFinite(asNum) ? asNum : 1550;
  }, []);

  // Nodes com ícones + placeholder no nó "c"
  const initialNodes = [
    { id: 'ig', position: { x: 60, y: 20 }, data: { label: <FaInstagram size={44} color="#1C403B" /> }, type: 'default', style: iconBoxStyle },
    { id: 'wa', position: { x: 160, y: 20 }, data: { label: <FaWhatsapp size={44} color="#1C403B" /> }, type: 'default', style: iconBoxStyle },
    { id: 'fb', position: { x: 260, y: 20 }, data: { label: <FaFacebook size={44} color="#1C403B" /> }, type: 'default', style: iconBoxStyle },
    { id: 'ml', position: { x: 0, y: 20 }, data: { label: <SiMercadopago size={44} color="#1C403B" /> }, type: 'default', style: iconBoxStyle },
    { id: 'website', position: { x: 0, y: 20 }, data: { label: <FaGlobe size={44} color="#1C403B" /> }, type: 'default', style: iconBoxStyle },
    {
      id: 'c',
      position: { x: 160, y: 180 },
      type: 'default',
      style: { width: `min(${containerMaxPx}px, 96%)`, background: '#fff', border: 'none', padding: 0, boxShadow: 'none', borderRadius: 18 },
      data: {
        label: (
          <img
            src="banner.png"
            alt="Prévia do conteúdo"
            style={{ display: 'block', width: '100%', height: 'auto', borderRadius: 18 }}
          />
        ),
      },
    },
  ];

  // Edges tracejadas animadas conectando cada canal -> placeholder (c)
  const initialEdges = [
    { id: 'e-ig-c', source: 'ig', target: 'c', type: 'default', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 3 } },
    { id: 'e-wa-c', source: 'wa', target: 'c', type: 'default', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 3 } },
    { id: 'e-fb-c', source: 'fb', target: 'c', type: 'default', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 3 } },
    { id: 'e-ml-c', source: 'ml', target: 'c', type: 'default', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 3 } },
    { id: 'e-website-c', source: 'website', target: 'c', type: 'default', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 3 } },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const canvasRef = useRef(null);
  const flowRef = useRef(null);

  // Centraliza responsivamente: WA no centro do canvas, nós simétricos e o placeholder centralizados
  // Horizontal e vertical, para qualquer tamanho de tela
  useEffect(() => {
    let tries = 0;
    const recenter = () => {
      const el = canvasRef.current;
      if (!el) return;
      const width = el.clientWidth || 0;
      const height = el.clientHeight || 0;
      if (!width || !height) return;

      // Largura da imagem/placeholder
      const imageMax = containerMaxPx;
      const imageWidth = Math.min(imageMax, width * 0.96);
      const cX = Math.max(0, Math.floor((width - imageWidth) / 2));

      // Medir largura real do WA
      const waEl = el.querySelector('[data-id="wa"]');
      const waDomWidth = waEl ? Math.floor(waEl.getBoundingClientRect().width) : 0;
      const waModel = flowRef.current?.getNode?.('wa');
      const waModelWidth = (waModel && (waModel.width || waModel.measured?.width)) || 0;
      const waWidth = waDomWidth || waModelWidth || iconBoxStyle.width; // fallback coerente
      const waX = Math.max(0, Math.floor((width - waWidth) / 2));

      // Estimar altura do placeholder (nó "c") para centralizar verticalmente
      const cModel = flowRef.current?.getNode?.('c');
      const cMeasuredH = (cModel && (cModel.height || cModel.measured?.height)) || 0;
      const estimatedCHeight = Math.floor(imageWidth / 3); // ~1/3 de proporção
      const cHeight = cMeasuredH || estimatedCHeight;

      const nodeRowH = iconBoxStyle.height || 50;
      // Gap dinâmico entre a fileira de nós e a imagem
      const gapY = Math.max(60, Math.min(200, Math.floor(height * 0.22)));
      const groupH = nodeRowH + gapY + cHeight;
      const topY = Math.max(0, Math.floor((height - groupH) / 2));
      const cY = topY + nodeRowH + gapY;

      // Espaçamento lateral (garante que caibam os nós nas laterais)
      const baseSpacing = Math.floor(imageWidth / 10);
      const limitLeft = Math.floor((waX - 4) / 2);
      const limitRight = Math.floor(((width - (waX + waWidth)) - 4) / 2);
      const spacing = Math.max(48, Math.min(140, baseSpacing, limitLeft, limitRight));
      const igX = Math.max(0, Math.floor(waX - spacing));
      const fbX = Math.min(Math.floor(waX + spacing), Math.max(0, width - waWidth));
      const mlX = Math.max(0, Math.floor(waX - spacing * 2));
      const websiteX = Math.min(Math.floor(waX + spacing * 2), Math.max(0, width - waWidth));

      // Re-tentar após render se ainda não mediu largura/altura
      if ((!waDomWidth || !cMeasuredH) && tries < 5) {
        tries += 1;
        requestAnimationFrame(recenter);
      }

      setNodes(ns => ns.map(n => {
        if (n.id === 'c') return { ...n, position: { x: cX, y: cY } };
        if (n.id === 'wa') return { ...n, position: { x: waX, y: topY } };
        if (n.id === 'ig') return { ...n, position: { x: igX, y: topY } };
        if (n.id === 'fb') return { ...n, position: { x: fbX, y: topY } };
        if (n.id === 'ml') return { ...n, position: { x: mlX, y: topY } };
        if (n.id === 'website') return { ...n, position: { x: websiteX, y: topY } };
        return n;
      }));
    };

    const raf = requestAnimationFrame(recenter);
    window.addEventListener('resize', recenter);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', recenter);
    };
  }, [setNodes]);

  return (
    <section className="social-connector" onMouseEnter={onInteract} onTouchStart={onInteract}>
      {/* XYFlow com ícones e placeholder abaixo */}
      <div className="xyflow-demo">
        <div className="xyflow-canvas" ref={canvasRef}>
          <ReactFlow
            grid={false}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            edgesUpdatable={false}
            edgesFocusable={false}
            panOnDrag={false}
            panOnScroll={false}
            zoomOnScroll={false}
            zoomOnPinch={false}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            proOptions={{ hideAttribution: true }}
            defaultViewport={{ x: 0, y: 0, zoom: 1 }}
            minZoom={1}
            maxZoom={1}
            onInit={(instance) => { flowRef.current = instance; }}
            style={{ width: '100%', height: '100%' }}
          >
          </ReactFlow>
        </div>
      </div>
    </section>
  );
}

export default SocialConnector;
