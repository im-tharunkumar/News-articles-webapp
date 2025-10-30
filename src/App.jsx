import { useState } from 'react'

import './App.css'
import Index from './NewsContent/Index'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Rethink+Sans:wght@400;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300&display=swap');
        
        .font-rethink {
          font-family: 'Rethink Sans', sans-serif;
        }
        
        .font-urbanist {
          font-family: 'Urbanist', sans-serif;
        }
        
        .card-shadow {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }
        
        .card-shadow:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
        }
        
        .dark .card-shadow {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
        }
        
        .dark .card-shadow:hover {
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }
        
        .card-hover {
          transition: all 250ms ease;
        }
        
        .card-hover:hover {
          transform: translateY(-4px);
        }
        
        .cta-button {
          transition: all 250ms ease;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
        
        .dark .cta-button:hover {
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
        }

        .modal-overlay {
          animation: fadeIn 250ms ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          animation: slideUp 300ms ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    <Index/>
    </>
  )
}

export default App
