import { useState, useRef, useEffect, useCallback, useMemo } from "react";

const BASE_URL = import.meta.env.BASE_URL;

// Skills data organized for mind map with simplified proficiency
const skillsData = {
  center: { label: "My Skills", imgSrc: "images/brain.svg" },
  nodes: [
    {
      id: "programming",
      label: "Langs",
      imgSrc: "images/code.svg",
      color: "#3B82F6", // blue
      skills: [
        { imgSrc: 'images/python.svg', label: 'Python', proficient: true },
        { imgSrc: 'images/cplusplus.svg', label: 'C++', proficient: true },
        { imgSrc: 'images/c.svg', label: 'C', proficient: false },
        { imgSrc: 'images/csharp.svg', label: 'C#', proficient: true },
        { imgSrc: 'images/typescript.svg', label: 'TypeScript', proficient: true },
        { imgSrc: 'images/javascript.svg', label: 'JavaScript', proficient: true },
        { imgSrc: 'images/java.png', label: 'Java', proficient: false },
        { imgSrc: 'images/kotlin.svg', label: 'Kotlin', proficient: false },
        { imgSrc: 'images/bash.svg', label: 'Bash', proficient: true },
        { imgSrc: 'images/racket.svg', label: 'Racket', proficient: false },
        { imgSrc: 'images/apps-script.svg', label: 'Apps Script', proficient: false },
      ]
    },
    {
      id: "web",
      label: "Web Dev",
      imgSrc: "images/globe.svg",
      color: "#EC4899", // pink
      skills: [
        { imgSrc: 'images/html.svg', label: 'HTML', proficient: true },
        { imgSrc: 'images/css3.svg', label: 'CSS', proficient: true },
        { imgSrc: 'images/angular.svg', label: 'Angular', proficient: true },
        { imgSrc: 'images/react.svg', label: 'React', proficient: true },
        { imgSrc: 'images/next.svg', label: 'Next.js', proficient: true },
        { imgSrc: 'images/nodejs.svg', label: 'Node.js', proficient: true },
        { imgSrc: 'images/dotnet.png', label: '.NET 9', proficient: true },
        { imgSrc: 'images/tailwindcss.svg', label: 'TailwindCSS', proficient: false },
        { imgSrc: 'images/flask.png', label: 'Flask', proficient: false },
        { imgSrc: 'images/figma.svg', label: 'Figma', proficient: false },
      ]
    },
    {
      id: "ai",
      label: "AI & Machine Learning",
      imgSrc: "images/chart.svg",
      color: "#10B981", // green
      featured: true, // Mark AI as featured category
      skills: [
        // AI and ML tools first
        { imgSrc: 'images/pytorch.png', label: 'PyTorch', proficient: true },
        { imgSrc: 'images/tensorflow.png', label: 'TensorFlow', proficient: false },
        { imgSrc: 'images/langchain.png', label: 'LangChain', proficient: false },
        { imgSrc: 'images/scikit-learn.png', label: 'Scikit-learn', proficient: true },
        { imgSrc: 'images/pandas.png', label: 'Pandas', proficient: true },
        { imgSrc: 'images/cornac.png', label: 'Cornac', proficient: false },
        { imgSrc: 'images/spark.png', label: 'Spark', proficient: true },
        // Data tools after
        // { imgSrc: 'images/powerbi.png', label: 'Power BI', proficient: true },
        // { imgSrc: 'images/m.svg', label: 'Power Query M', proficient: true },
        // { imgSrc: 'images/sql2.png', label: 'SQL', proficient: true },
        { imgSrc: 'images/postgresql.svg', label: 'PostgreSQL', proficient: false },
        { imgSrc: 'images/databricks.png', label: 'Databricks', proficient: true },
      ]
    },
    {
      id: "cloud",
      label: "Cloud",
      imgSrc: "images/cloud.svg",
      color: "#F59E0B", // amber
      skills: [
        { imgSrc: 'images/azure.svg', label: 'Azure', proficient: true },
        { imgSrc: 'images/google-cloud.svg', label: 'Google Cloud', proficient: false },
        { imgSrc: 'images/firebase.png', label: 'Firebase', proficient: false },
        { imgSrc: 'images/git.svg', label: 'Git', proficient: true },
        { imgSrc: 'images/gitlab.svg', label: 'GitLab', proficient: true },
      ]
    }
  ]
};

const Skill = () => {
  // Change from null to "programming" for default expansion
  const [activeNode, setActiveNode] = useState("programming");
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isListMode, setIsListMode] = useState(false); // Replace isFocused with isListMode
  const [renderStage, setRenderStage] = useState(0);
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const centerRef = useRef(null);

  // Fix for line alignment - track center position
  const [centerPosition, setCenterPosition] = useState({ x: 0, y: 0 });
  
  // Handle skill hover
  const handleSkillHover = useCallback((skillLabel) => {
    setHoveredSkill(skillLabel);
  }, []);
  
  // Handle node click
  const handleNodeClick = useCallback((nodeId) => {
    if (activeNode === nodeId) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
    }
  }, [activeNode]);

  // Toggle view mode between graph and list
  const toggleViewMode = useCallback(() => {
    setIsListMode(!isListMode);
    // Reset active node when switching to list mode
    if (!isListMode) {
      setActiveNode(null);
    }
  }, [isListMode]);

  // Enhanced lazy loading with progressive rendering
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          
          // Stage 1: Basic structure (immediate)
          setTimeout(() => {
            setRenderStage(1);
          }, 100);
          
          // Stage 2: Main nodes (after slight delay)
          setTimeout(() => {
            setIsInitialized(true);
            setRenderStage(2);
            
            // Calculate center position for graph view
            if (centerRef.current && mapRef.current) {
              const rect = centerRef.current.getBoundingClientRect();
              const parentRect = mapRef.current.getBoundingClientRect();
              setCenterPosition({
                x: rect.left - parentRect.left + rect.width / 2,
                y: rect.top - parentRect.top + rect.height / 2
              });
            }
          }, 300);
          
          // Stage 3: Complete rendering (after user has seen the section)
          setTimeout(() => {
            setRenderStage(3);
          }, 800);
          
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "200px 0px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  // Update center position on window resize
  useEffect(() => {
    if (!isInitialized || isListMode) return; // Skip if in list mode
    
    let resizeTimer;
    const updateCenterPosition = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (centerRef.current && mapRef.current) {
          const rect = centerRef.current.getBoundingClientRect();
          const parentRect = mapRef.current.getBoundingClientRect();
          setCenterPosition({
            x: rect.left - parentRect.left + rect.width / 2,
            y: rect.top - parentRect.top + rect.height / 2
          });
        }
      }, 100);
    };
    
    updateCenterPosition();
    window.addEventListener('resize', updateCenterPosition);
    return () => {
      window.removeEventListener('resize', updateCenterPosition);
      clearTimeout(resizeTimer);
    };
  }, [isInitialized, isListMode]);

  // Pre-compute category positions with increased and standardized radius
  const categoryPositions = useMemo(() => {
    return skillsData.nodes.map((node, index) => {
      const angle = (index * (2 * Math.PI / skillsData.nodes.length)) - Math.PI/2;
      // Make all radii the same and larger - 200px for all categories
      const radius = 220;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      return { id: node.id, x, y, angle, radius };
    });
  }, []);

  // List view component - extracted for reuse
  const SkillListView = () => (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-4 text-zinc-300">Skills by Category</h3>
      {skillsData.nodes.map(category => (
        <div key={category.id} className="mb-8">
          <h4 
            className="text-lg font-medium mb-3 flex items-center gap-2" 
            style={{ color: category.color }}
          >
            <span className="material-symbols-rounded">
              {category.id === 'programming' && 'code'}
              {category.id === 'web' && 'language'}
              {category.id === 'ai' && 'smart_toy'}
              {category.id === 'cloud' && 'cloud'}
            </span>
            {category.label}
            {category.featured && (
              <span className="ml-1 text-xs px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Focus</span>
            )}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {category.skills.map(skill => (
              <div 
                key={skill.label}
                className={`flex items-center p-2 bg-zinc-800/50 border border-zinc-700/30 rounded-lg ${
                  skill.proficient ? 'border-l-4' : ''
                }`}
                style={{ borderLeftColor: skill.proficient ? category.color : '' }}
              >
                <div className="w-8 h-8 mr-2 bg-zinc-700/50 rounded flex items-center justify-center p-1.5">
                  <img 
                    src={`${BASE_URL}${skill.imgSrc}`}
                    alt={skill.label}
                    className="max-w-full max-h-full"
                    loading="lazy"
                    width="24"
                    height="24"
                  />
                </div>
                <div>
                  <span className="text-zinc-300 text-sm">{skill.label}</span>
                  <span className={`text-xs block ${
                    skill.proficient ? 'text-green-400' : 'text-blue-400'
                  }`}>
                    {skill.proficient ? 'Proficient' : 'Learning'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="section bg-zinc-900/80 backdrop-blur-sm overflow-hidden"
    >
      <div className="container">
        <h2 className="headline-2 reveal-up mb-6">
          My Toolbelt
        </h2>

        <p className="text-zinc-400 mt-3 mb-12 reveal-up">
          I have gained experience with a variety of tools throughout my education and career.
          Explore my skills below!
        </p>
        
        {isVisible && renderStage >= 1 && (
          <div className="flex flex-col items-center mb-8 md:mb-16">
            {/* Horizons text moved to top */}
            <div className="text-sm text-zinc-500 flex items-center mb-3">
              <span className="material-symbols-rounded text-green-500 mr-1 text-sm">
                insights
              </span>
              <span>Expanding my horizons</span>
            </div>
            
            {/* Toggle button below the text */}
            <button 
              onClick={toggleViewMode} 
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800/70 rounded-full border border-zinc-700/50 hover:bg-zinc-700/50 transition-all"
            >
              <span className="material-symbols-rounded">
                {isListMode ? 'hub' : 'format_list_bulleted'}
              </span>
              {isListMode ? 'Graph View' : 'List View'}
            </button>
          </div>
        )}

        {!isVisible ? (
          <div className="min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-16 h-16 bg-zinc-800 rounded-full mb-4"></div>
              <div className="h-2 w-24 bg-zinc-800 rounded"></div>
            </div>
          </div>
        ) : isListMode ? (
          // List View for both mobile and desktop when selected
          <SkillListView />
        ) : (
          // Graph View (Mind Map) - Only for desktop
          <div 
            ref={mapRef}
            className="hidden md:block relative min-h-[770px] transform transition-opacity duration-700 ease-out"
            style={{ 
              opacity: renderStage >= 1 ? 1 : 0,
              overflow: 'visible',
              padding: '80px'  // Add padding to prevent clipping
            }}
          >
            {renderStage >= 1 && (
              <>
                {/* SVG - All connection lines with LOWEST z-index */}
                {renderStage >= 2 && (
                  <svg 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ 
                      overflow: 'visible',
                      zIndex: -1, // Force to bottom layer with negative z-index
                      pointerEvents: 'none' // Ensure lines don't interfere with clicks
                    }}
                  >
                    {/* Main category connection lines */}
                    {categoryPositions.map(({id, x, y}) => {
                      const node = skillsData.nodes.find(n => n.id === id);
                      const isActive = activeNode === id;
                      
                      return (
                        <line 
                          key={`main-${id}`}
                          x1={centerPosition.x}
                          y1={centerPosition.y}
                          x2={centerPosition.x + x}
                          y2={centerPosition.y + y}
                          stroke={activeNode === id ? node.color : "#4b5563"}
                          strokeWidth={isActive ? "3" : "2"}
                          strokeDasharray={activeNode === id ? "none" : "4,4"}
                          className="transition-all duration-500"
                          style={{ 
                            opacity: activeNode && !isActive ? 0.3 : 1 
                          }}
                        />
                      );
                    })}
                  </svg>
                )}

                {/* Separate SVG for skill connection lines */}
                {renderStage >= 3 && activeNode && (
                  <svg 
                    className="absolute top-0 left-0 w-full h-full"
                    style={{ 
                      overflow: 'visible',
                      zIndex: -2, // Even lower than main lines
                      pointerEvents: 'none'
                    }}
                  >
                    {skillsData.nodes
                      .filter(node => node.id === activeNode)
                      .map(node => {
                        const nodePosition = categoryPositions.find(pos => pos.id === node.id);
                        const centerX = centerPosition.x + nodePosition.x;
                        const centerY = centerPosition.y + nodePosition.y;
                        
                        return node.skills.slice(0, 12).map((skill, skillIndex) => {
                          const angle = (skillIndex * (2 * Math.PI / Math.min(node.skills.length, 12)));
                          const radius = 105;
                          const x = Math.cos(angle) * radius;
                          const y = Math.sin(angle) * radius;
                          
                          return (
                            <line 
                              key={`skill-${skill.label}`}
                              x1={centerX}
                              y1={centerY}
                              x2={centerX + x}
                              y2={centerY + y}
                              stroke={hoveredSkill === skill.label ? node.color : "#4b5563"}
                              strokeWidth="1.5"
                              strokeDasharray="3,3"
                              className="transition-all duration-300"
                              style={{ opacity: hoveredSkill && hoveredSkill !== skill.label ? 0.3 : 1 }}
                            />
                          );
                        });
                      })}
                  </svg>
                )}

                {/* Center Node with solid background circle */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                  {/* Solid background circle that never changes opacity */}
                  <div 
                    className="absolute w-24 h-24 rounded-full bg-zinc-900"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)'
                    }}
                  ></div>
                  
                  {/* Actual center node that changes opacity */}
                  <div 
                    ref={centerRef}
                    className="relative z-30 transition-all duration-300"
                    style={{ opacity: activeNode ? 0.5 : 1 }}
                  >
                    <div className="w-24 h-24 bg-zinc-900 border-2 border-accent rounded-full flex items-center justify-center shadow-lg shadow-accent/10 cursor-pointer transition-transform hover:scale-105">
                      <div className="flex flex-col items-center">
                        <span className="material-symbols-rounded text-3xl text-accent mb-1">psychology</span>
                        <span className="text-sm font-medium text-white">My Skills</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Category Nodes - Progressive loading */}
                {renderStage >= 2 && categoryPositions.map(({id, x, y}) => {
                  const node = skillsData.nodes.find(n => n.id === id);
                  const isActive = activeNode === id;
                  const isFeatured = node.featured;
                  
                  return (
                    <div key={id} 
                      className={`absolute transition-all duration-500 ease-out ${
                        isActive ? 'z-30' : 'z-20'
                      }`}
                      style={{ 
                        left: `${centerPosition.x + x}px`,
                        top: `${centerPosition.y + y}px`,
                        transform: `translate(-50%, -50%) ${isActive ? 'scale(1.15)' : ''}`,
                        opacity: activeNode && !isActive ? 0.5 : 1
                      }}
                    >
                      {/* Solid background circle to prevent line bleed-through */}
                      <div 
                        className="absolute w-24 h-24 rounded-full bg-zinc-900"
                        style={{
                          left: '50%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)'
                        }}
                      ></div>
                      
                      {/* Category Node */}
                      <div 
                        className={`relative w-20 h-20 rounded-full flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isActive 
                            ? 'scale-110 shadow-lg' 
                            : 'border hover:scale-105 hover:border-opacity-80'
                        }`}
                        onClick={() => handleNodeClick(id)}
                        style={{ 
                          background: isActive 
                            ? `radial-gradient(circle, ${node.color}20 0%, ${node.color}60 100%)` 
                            : 'radial-gradient(circle, #27272a 0%, #18181b 100%)',
                          borderColor: node.color,
                          borderWidth: isFeatured ? '2px' : '1px',
                          borderOpacity: isActive ? '100%' : '50%',
                          boxShadow: isActive 
                            ? `0 0 20px 5px ${node.color}40` 
                            : isFeatured ? `0 0 8px 1px ${node.color}20` : '',
                        }}
                      >
                        <div className="flex flex-col items-center p-2">
                          <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center mb-1`}
                            style={{ 
                              background: isActive 
                                ? `linear-gradient(135deg, ${node.color} 0%, ${node.color}90 100%)`
                                : isFeatured ? `linear-gradient(135deg, ${node.color}40 0%, ${node.color}20 100%)` : 'rgba(39, 39, 42, 0.8)'
                            }}
                          >
                            <span className={`material-symbols-rounded ${isActive ? 'text-white' : isFeatured ? 'text-white' : 'text-zinc-300'}`}>
                              {id === 'programming' && 'code'}
                              {id === 'web' && 'language'}
                              {id === 'ai' && 'smart_toy'}
                              {id === 'cloud' && 'cloud'}
                            </span>
                          </div>
                          <span className={`text-xs font-medium text-center max-w-16 truncate px-1 ${
                            isActive ? 'text-white' : isFeatured ? 'text-zinc-100' : 'text-zinc-400'
                          }`}>
                            {node.id === 'ai' ? 'AI/ML' : node.label}
                          </span>
                        </div>

                        {/* Add an enlarged highlight behind active nodes */}
                        {isActive && renderStage >= 3 && (
                          <div 
                            className="absolute rounded-full -z-10 animate-ping-once"
                            style={{
                              width: '24rem',
                              height: '24rem',
                              left: '50%',
                              top: '50%',
                              transform: 'translate(-50%, -50%)',
                              background: `radial-gradient(circle, ${node.color}15 0%, transparent 70%)`,
                            }}
                          />
                        )}

                        {/* Only render skill nodes when necessary - improved performance */}
                        {renderStage >= 3 && isActive && node.id === activeNode && node.skills.slice(0, 12).map((skill, skillIndex) => {
                          const angle = (skillIndex * (2 * Math.PI / Math.min(node.skills.length, 12)));
                          const radius = 105;
                          const sx = Math.cos(angle) * radius;
                          const sy = Math.sin(angle) * radius;
                          
                          return (
                            <div
                              key={skill.label}
                              className="absolute transition-all duration-300 ease-out z-50"
                              style={{ 
                                left: '50%',
                                top: '50%',
                                transform: `translate(-50%, -50%) translate(${sx}px, ${sy}px)`,
                                opacity: hoveredSkill && hoveredSkill !== skill.label ? 0.4 : 1,
                                zIndex: hoveredSkill === skill.label ? 60 : 50
                              }}
                              onMouseEnter={() => handleSkillHover(skill.label)}
                              onMouseLeave={() => handleSkillHover(null)}
                            >
                              <div 
                                className={`w-11 h-11 rounded-full bg-zinc-800/90 border flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform ${
                                  skill.proficient ? 'border-2' : 'border-1'
                                }`}
                                style={{ 
                                  boxShadow: hoveredSkill === skill.label 
                                    ? `0 0 8px 1px ${node.color}30` 
                                    : '',
                                  borderColor: hoveredSkill === skill.label || skill.proficient 
                                    ? node.color 
                                    : 'rgba(63, 63, 70, 0.5)'
                                }}
                              >
                                <div className="relative">
                                  <img 
                                    src={`${BASE_URL}${skill.imgSrc}`}
                                    alt={skill.label}
                                    className="w-6 h-6 object-contain"
                                    loading="lazy"
                                    width="24"
                                    height="24"
                                  />
                                  
                                  {/* Tooltip with fixed overflow issues */}
                                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-normal break-words min-w-[100px] max-w-[150px] bg-zinc-800 border rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[100] ${
                                    isFeatured ? 'border-green-500/30' : 'border-zinc-700'
                                  }`}>
                                    <p className="text-white text-xs font-medium mb-1 break-words">{skill.label}</p>
                                    <span 
                                      className={`text-xs ${skill.proficient ? 'text-green-400' : 'text-blue-400'}`}
                                    >
                                      {skill.proficient ? 'Proficient' : 'Learning'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}
        
        {/* Mobile View - Always show list view */}
        {!isListMode && <div className="md:hidden mt-8"><SkillListView /></div>}
      </div>

      {/* Add keyframe animation for the ping-once effect */}
      <style jsx>{`
        @keyframes ping-once {
          0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
        }
        .animate-ping-once {
          animation: ping-once 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Skill;