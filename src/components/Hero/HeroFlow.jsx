import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { ReactFlow, useNodesState, useEdgesState } from '@xyflow/react';
import { FaInstagram, FaWhatsapp, FaFacebook, FaGlobe, FaTelegram } from 'react-icons/fa';
import './Hero.css';

function HeroFlow() {
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const canvasRef = useRef(null);
  const flowRef = useRef(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const iconSize = isMobile ? 24 : 28;
  const nodeSize = isMobile ? 48 : 56;

  const getIconStyle = (bgColor, borderColor) => ({
    width: nodeSize,
    height: nodeSize,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: bgColor,
    border: `2px solid ${borderColor}`,
    borderRadius: '50%',
  });

  const initialNodes = useMemo(() => [
    { id: 'wa', position: { x: 0, y: 0 }, data: { label: <FaWhatsapp size={iconSize} color="#1C403B" /> }, style: getIconStyle('transparent', '#1C403B') },
    { id: 'ig', position: { x: 0, y: 0 }, data: { label: <FaInstagram size={iconSize} color="#1C403B" /> }, style: getIconStyle('transparent', '#1C403B') },
    { id: 'fb', position: { x: 0, y: 0 }, data: { label: <FaFacebook size={iconSize} color="#1C403B" /> }, style: getIconStyle('transparent', '#1C403B') },
    { id: 'tg', position: { x: 0, y: 0 }, data: { label: <FaTelegram size={iconSize} color="#1C403B" /> }, style: getIconStyle('transparent', '#1C403B') },
    { id: 'web', position: { x: 0, y: 0 }, data: { label: <FaGlobe size={iconSize} color="#1C403B" /> }, style: getIconStyle('transparent', '#1C403B') },
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
  ], [nodeSize, iconSize, isMobile]);

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

    const padding = isMobile ? 8 : 0;
    const imageWidth = Math.min(1600, width - padding * 2);
    const centerX = width / 2;
    const spacing = isMobile ? 60 : 100;
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
        return { ...n, position: { x: centerX - imageWidth / 2, y: topY + nodeSize + 150 }, style: { ...n.style, width: imageWidth } };
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
    <section className="hero-flow-section section">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-lg">
            Todos os seus canais. Uma única caixa de entrada,  
            <span className={`hero-flow-heading-badge ${isScrolled ? 'animated' : ''}`}>
              <span className="hero-flow-label">zero caos.</span>
              <svg className="hand-drawn-circle" viewBox="0 0 260 60" preserveAspectRatio="none">
                <path
                  className="sketch-path"
                  d="M 20,40 
                     C 5,12 40,5 130,5 
                     C 220,5 255,12 255,30 
                     C 255,48 220,55 130,55 
                     C 40,55 5,48 10,30
                     C 15,15 50,10 130,10
                     C 210,10 240,18 245,30"
                  fill="none"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </h2>
          <p className="text-lg">
            Chega de abas abertas, mensagens perdidas e clientes esperando. <br />
            O Lemify organiza seu pré e pós-venda.
          </p>
        </div>
      </div>
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
    </section>
    );
  }

export default HeroFlow;
