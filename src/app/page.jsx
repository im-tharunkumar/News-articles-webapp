import { useState, useEffect } from "react";
import NewsCard from "../components/NewsCard";
import ArticleModal from "../components/ArticleModal";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error("Error fetching articles:", err);
        setError("Failed to load articles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#121212]">
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

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#121212]/90 backdrop-blur-sm border-b border-[#E5E5E5] dark:border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <h1 className="font-rethink font-bold text-[28px] md:text-[32px] text-black dark:text-white">
            News Hub
          </h1>
          <p className="font-urbanist text-[14px] text-black/60 dark:text-white/70 mt-1">
            Stay updated with the latest stories
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {error && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-lg p-4 mb-8">
            <p className="font-urbanist text-[14px] text-red-700 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#1E1E1E] rounded-[10px] border border-[#E5E5E5] dark:border-white/10 overflow-hidden h-96 animate-pulse"
              >
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-urbanist text-[16px] text-black/60 dark:text-white/70">
              No articles found. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <NewsCard
                key={article.id}
                article={article}
                onReadMore={() => setSelectedArticle(article)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {selectedArticle && (
        <ArticleModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </div>
  );
}
