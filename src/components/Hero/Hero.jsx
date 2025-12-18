import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaGlobe, FaTelegram } from 'react-icons/fa';
import './Hero.css';

function Hero() {
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);
  const flowRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const iconSize = isMobile ? 24 : 28;
  const nodeSize = isMobile ? 48 : 56;

  const iconBoxStyle = useMemo(() => ({
    width: nodeSize,
    height: nodeSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fff',
    border: '1.5px solid #E5EBE8',
    borderRadius: '50%',
  }), [nodeSize]);

  const initialNodes = useMemo(() => [
    { id: 'wa', position: { x: 0, y: 0 }, data: { label: <FaWhatsapp size={iconSize} color="#25D366" /> }, style: iconBoxStyle },
    { id: 'ig', position: { x: 0, y: 0 }, data: { label: <FaInstagram size={iconSize} color="#E4405F" /> }, style: iconBoxStyle },
    { id: 'fb', position: { x: 0, y: 0 }, data: { label: <FaFacebook size={iconSize} color="#1877F2" /> }, style: iconBoxStyle },
    { id: 'tg', position: { x: 0, y: 0 }, data: { label: <FaTelegram size={iconSize} color="#0088CC" /> }, style: iconBoxStyle },
    { id: 'web', position: { x: 0, y: 0 }, data: { label: <FaGlobe size={iconSize} color="#1C403B" /> }, style: iconBoxStyle },
    {
      id: 'preview',
      position: { x: 0, y: 0 },
      style: { 
        background: '#fff', 
        border: '1px solid #E5EBE8', 
        padding: 0, 
        boxShadow: '0 20px 60px rgba(28, 64, 59, 0.08)',
        borderRadius: isMobile ? 12 : 20 
      },
      data: { label: <img src="banner.png" alt="Lemify" className="hero-preview" /> },
    },
  ], [iconBoxStyle, iconSize, isMobile]);

  const initialEdges = useMemo(() => [
    { id: 'e1', source: 'wa', target: 'preview', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 2 } },
    { id: 'e2', source: 'ig', target: 'preview', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 2 } },
    { id: 'e3', source: 'fb', target: 'preview', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 2 } },
    { id: 'e4', source: 'tg', target: 'preview', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 2 } },
    { id: 'e5', source: 'web', target: 'preview', animated: true, style: { stroke: '#1C403B', strokeDasharray: '8 6', strokeWidth: 2 } },
  ], []);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  const recenterNodes = useCallback(() => {
    const el = canvasRef.current;
    if (!el) return;
    
    const width = el.clientWidth;
    const height = el.clientHeight;
    if (!width || !height) return;

    const padding = isMobile ? 16 : 32;
    const imageWidth = Math.min(1200, width - padding * 2);
    const centerX = width / 2;
    const spacing = isMobile ? 70 : 120;
    const topY = 30;
    const halfNode = nodeSize / 2;

    const positions = {
      tg: centerX - spacing * 2,
      ig: centerX - spacing,
      wa: centerX,
      fb: centerX + spacing,
      web: centerX + spacing * 2
    };

    setNodes(ns => ns.map(n => {
      if (n.id === 'preview') {
        return { ...n, position: { x: centerX - imageWidth / 2, y: topY + nodeSize + 80 }, style: { ...n.style, width: imageWidth } };
      }
      if (positions[n.id]) {
        return { ...n, position: { x: positions[n.id] - halfNode, y: topY } };
      }
      return n;
    }));
  }, [setNodes, nodeSize, isMobile]);

  useEffect(() => {
    const timeout = setTimeout(recenterNodes, 100);
    window.addEventListener('resize', recenterNodes);
    return () => { clearTimeout(timeout); window.removeEventListener('resize', recenterNodes); };
  }, [recenterNodes]);

  return (
    <section className="hero">
      {/* Background sólido */}
      <div className="hero-bg"></div>

      <div className="hero-content container">
        <span className="badge">Plataforma de atendimento unificado</span>
        <h1 className="heading-xl hero-title">
          Atendimento que <span className="highlight">encanta</span> Resultados que <span className="highlight">impressionam</span>.
        </h1>
        <p className="text-lg hero-subtitle">
          Conecte WhatsApp, Instagram, Facebook e outros canais em uma única plataforma.
        </p>
        <div className="hero-actions">
          <a href="https://app.lemify.com.br/signup" className="btn btn-secondary btn-lg">Começar gratuitamente</a>
          <a href="#features" className="btn btn-outline btn-lg">Ver recursos</a>
        </div>
      </div>
      
      <div className="hero-flow">
        <p className="hero-flow-label">Todos os canais em um só lugar</p>
        <div className="xyflow-wrapper">
          <div className="xyflow-canvas" ref={canvasRef}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              nodesDraggable={false}
              nodesConnectable={false}
              elementsSelectable={false}
              panOnDrag={false}
              zoomOnScroll={false}
              zoomOnPinch={false}
              preventScrolling={false}
              proOptions={{ hideAttribution: true }}
              defaultViewport={{ x: 0, y: 0, zoom: 1 }}
              minZoom={1}
              maxZoom={1}
              onInit={(instance) => { flowRef.current = instance; setTimeout(recenterNodes, 50); }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
