import React, { useEffect, useState } from 'react';
import Image from "next/image";
import localFont from "next/font/local";
import WalletConnectButton from '../components/WalletConnectButton';
import axios from 'axios';
import { FaHome, FaRocket, FaPlus, FaCoins, FaUser, FaShieldAlt, FaTwitter, FaTelegram, FaDiscord } from 'react-icons/fa';
import { motion } from 'framer-motion';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

interface Presale {
  nombre: string;
  suministroTotal: string;
  precioPreventas: string;
  fechaListado: string;
}

export default function Home() {
  const [presales, setPresales] = useState<Presale[]>([]);
  const [totalLiquidity, setTotalLiquidity] = useState("0");
  const [totalProjects, setTotalProjects] = useState("0");

  useEffect(() => {
    const fetchPresales = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/presales');
        setPresales(response.data);
        setTotalProjects(response.data.length.toString());
      } catch (error) {
        console.error('Error fetching presales:', error);
      }
    };
    fetchPresales();
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`${geistSans.variable} flex min-h-screen bg-gradient-to-br from-gray-900 to-indigo-900 text-white font-[family-name:var(--font-geist-sans)]`}
    >
      <aside className="w-64 bg-black bg-opacity-50 p-6 flex flex-col">
        <div className="flex items-center mb-8">
          <Image src="/NovaLaunch.png" alt="NovaLaunch logo" width={50} height={50} />
          <h1 className="text-2xl font-bold ml-2 leading-tight">
            <span className="text-purple-400 block">Nova</span>
            <span className="text-yellow-400 block">Launch</span>
          </h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-4">
            <li><a href="#" className="flex items-center text-purple-400 hover:text-purple-300 transition-colors"><FaHome className="mr-2" /> Inicio</a></li>
            <li><a href="#" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"><FaRocket className="mr-2" /> Proyectos</a></li>
            <li><a href="#" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"><FaPlus className="mr-2" /> Lanzar Token</a></li>
            <li><a href="#" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"><FaCoins className="mr-2" /> Mercado</a></li>
            <li><a href="#" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"><FaUser className="mr-2" /> Mi Perfil</a></li>
            <li><a href="#" className="flex items-center text-gray-300 hover:text-purple-400 transition-colors"><FaShieldAlt className="mr-2" /> Seguridad</a></li>
          </ul>
        </nav>
        <div className="mt-auto">
          <div className="bg-purple-900 bg-opacity-50 p-4 rounded-lg mt-8">
            <h3 className="font-semibold mb-2">¿Necesitas ayuda?</h3>
            <p className="text-sm mb-4">Consulta nuestra documentación</p>
            <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors">Documentación</button>
          </div>
          <div className="flex justify-center space-x-4 mt-4">
            <FaTwitter className="text-gray-400 hover:text-purple-400 transition-colors" />
            <FaTelegram className="text-gray-400 hover:text-purple-400 transition-colors" />
            <FaDiscord className="text-gray-400 hover:text-purple-400 transition-colors" />
          </div>
        </div>
      </aside>
      <main className="flex-grow p-8">
        <header className="flex justify-end items-center mb-8">
          <WalletConnectButton />
        </header>
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-gradient-to-r from-purple-800 to-indigo-600 rounded-lg p-8 mb-8 shadow-lg"
        >
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400"
          >
            ¡Despega Tu Futuro Blockchain!
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mb-6 text-gray-300"
          >
            NovaLaunch te permite crear y lanzar tokens personalizados en minutos. Únete a la revolución de la propiedad digital y aprovecha las oportunidades de inversión en el mundo blockchain.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-yellow-400 text-purple-900 py-2 px-6 rounded-full hover:bg-yellow-300 transition-colors font-bold"
          >
            Comprar Nova
          </motion.button>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 gap-8 mb-8"
        >
          {[
            { title: "LIQUIDEZ TOTAL GENERADA", value: `$${totalLiquidity}` },
            { title: "PROYECTOS LANZADOS", value: totalProjects },
            { title: "USUARIOS TOTALES", value: "2" },
            { title: "NOVA BLOQUEADOS", value: "0" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg"
            >
              <h3 className="text-xl mb-2 text-purple-400">{stat.title}</h3>
              <p className="text-4xl font-bold text-yellow-400">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400"
        >
          Proyectos Innovadores
        </motion.h2>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {presales.map((presale, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4 + index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="bg-black bg-opacity-50 rounded-lg p-6 flex flex-col shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-purple-400">{presale.nombre}</h3>
              <p className="text-sm mb-2 text-gray-300">Suministro: {presale.suministroTotal}</p>
              <p className="text-sm mb-2 text-gray-300">Precio Inicial: {presale.precioPreventas}</p>
              <p className="text-sm mb-4 text-gray-300">Lanzamiento: {presale.fechaListado}</p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-auto bg-yellow-400 text-purple-900 py-2 px-4 rounded-full hover:bg-yellow-300 transition-colors font-bold"
              >
                Explorar
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400">
            ¿Por qué elegir NovaLaunch?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🚀", title: "Lanzamiento Rápido", description: "Crea y lanza tu token en minutos, no en días." },
              { icon: "🛡️", title: "Seguridad Garantizada", description: "Contratos inteligentes auditados y seguros para tu tranquilidad." },
              { icon: "💰", title: "Costos Reducidos", description: "Tarifas competitivas para maximizar tu inversión." }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-black bg-opacity-50 p-6 rounded-lg shadow-lg"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-purple-400">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-semibold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-purple-400">
            Únete a nuestra comunidad
          </h2>
          <div className="flex justify-center space-x-8">
            {[
              { icon: <FaTwitter size={32} />, label: "Twitter" },
              { icon: <FaTelegram size={32} />, label: "Telegram" },
              { icon: <FaDiscord size={32} />, label: "Discord" }
            ].map((social, index) => (
              <motion.a
                key={index}
                href="#"
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center"
              >
                {social.icon}
                <span className="mt-2 text-gray-300">{social.label}</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </main>
    </motion.div>
  );
}
