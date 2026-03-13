import React, { useState } from 'react';
import { 
  FaHome, 
  FaUsers, 
  FaChartBar, 
  FaFlask, 
  FaCogs, 
  FaBars, 
  FaTimes,
  FaDatabase,
  FaUserCircle
} from 'react-icons/fa';

const Pruebas = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { name: 'Inicio', icon: <FaHome />, active: false },
    { name: 'Equipo', icon: <FaUsers />, active: false },
    { name: 'Métricas', icon: <FaChartBar />, active: false },
    { name: 'Lab', icon: <FaFlask />, active: true },
    { name: 'Ajustes', icon: <FaCogs />, active: false },
  ];

  return (
    <div className="font-SnPro antialiased flex min-h-screen bg-[#0f0f0f] text-white">
      {/* --- SIDEBAR IZQUIERDO --- */}
      <aside 
        className={`bg-black transition-all duration-500 ease-in-out ${
          isOpen ? 'w-80' : 'w-24'
        } flex flex-col border-r border-white/10 shadow-[10px_0_30px_rgba(0,0,0,0.5)] z-20`}
      >
        {/* Header con Toggle */}
        <div className="h-24 flex items-center justify-between px-8">
          {isOpen && (
            <span className="text-white font-black text-2xl tracking-tighter uppercase">
              Pro <span className="text-orange-500">Dev</span>
            </span>
          )}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-orange-500 transition-colors p-2"
          >
            {isOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
          </button>
        </div>

        {/* Menú Principal */}
        <nav className="flex-1 mt-10 px-4 space-y-6">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className="group flex items-center cursor-pointer transition-all duration-300"
            >
              <div className={`text-3xl transition-all duration-300 flex-shrink-0 
                ${item.active ? 'text-orange-500' : 'text-white group-hover:text-orange-500'}`}
              >
                {item.icon}
              </div>
              
              {isOpen && (
                <span className={`ml-6 text-3xl font-light tracking-tight transition-all duration-300
                  ${item.active ? 'text-orange-500 font-medium' : 'text-white group-hover:text-orange-500'}`}
                >
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Perfil Inferior */}
        <div className="p-8 border-t border-white/5 bg-[#050505]">
          <div className="flex items-center gap-4">
            <FaUserCircle size={40} className="text-white group-hover:text-orange-500 transition-colors" />
            {isOpen && (
              <div className="flex flex-col">
                <span className="text-xl font-bold truncate">Manuel Dev</span>
                <span className="text-xs text-orange-500 font-bold tracking-[0.2em] uppercase">Senior Stack</span>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a]">
        {/* Navbar Superior */}
        <header className="h-24 border-b border-white/5 flex items-center justify-between px-12">
            <h2 className="text-white/40 font-medium text-lg tracking-widest uppercase">Dashboard / Pruebas</h2>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full">
                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                <span className="text-sm font-bold tracking-widest uppercase">Django Core Online</span>
            </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 p-12 overflow-y-auto">
          <div className="max-w-5xl">
            <header className="mb-12">
                <h1 className="text-7xl font-black mb-4 tracking-tighter">
                  MODO <span className="text-orange-500">TEST</span>
                </h1>
                <p className="text-2xl text-white/50 font-light max-w-2xl">
                  Interfaz personalizada con tipografía SnPro. Los componentes están listos para recibir datos de tu API en Django.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] hover:border-orange-500/50 transition-all duration-500 group">
                    <FaDatabase className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-500" />
                    <h3 className="text-3xl font-bold mb-4">Base de Datos</h3>
                    <p className="text-white/40 text-lg">Prueba la persistencia de datos y modelos directamente desde aquí.</p>
                </div>

                <div className="bg-orange-500 p-10 rounded-[3rem] text-black shadow-[0_20px_50px_rgba(249,115,22,0.3)]">
                    <FaFlask className="text-5xl mb-6" />
                    <h3 className="text-3xl font-black mb-4 uppercase">Lanzar Script</h3>
                    <p className="font-medium text-lg leading-tight">Ejecuta las funciones de prueba del backend con un solo click.</p>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Pruebas;