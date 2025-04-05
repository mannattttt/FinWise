import { useState, useEffect } from 'react';
import { BarChart3, Newspaper, Wallet, Building, Users, TrendingUp, ArrowRight, Clock } from 'lucide-react';

const BankingNewsComponent = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleArticles, setVisibleArticles] = useState(6);
  
  const API_KEY = '34e6fa749e344039b429e3ca505cffa3';
  const filters = [
    { id: 'all', label: 'All News', icon: <Newspaper size={16} /> },
    { id: 'banking-schemes', label: 'Banking Schemes', icon: <BarChart3 size={16} /> },
    { id: 'financial-programs', label: 'Financial Programs', icon: <Wallet size={16} /> },
    { id: 'bank-initiatives', label: 'Bank Initiatives', icon: <Building size={16} /> },
    { id: 'financial-inclusion', label: 'Financial Inclusion', icon: <Users size={16} /> },
    { id: 'banking-reforms', label: 'Banking Reforms', icon: <TrendingUp size={16} /> }
  ];

  const getQueryForFilter = (filterId) => {
    switch(filterId) {
      case 'banking-schemes': return 'banking schemes';
      case 'financial-programs': return 'financial programs';
      case 'bank-initiatives': return 'bank initiatives';
      case 'financial-inclusion': return 'financial inclusion schemes';
      case 'banking-reforms': return 'banking sector reforms';
      default: return 'banking schemes OR financial programs OR bank initiatives OR financial inclusion schemes OR banking sector reforms';
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const query = getQueryForFilter(activeFilter);
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&apiKey=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.status === 'error') {
          throw new Error(data.message || 'Failed to fetch news');
        }
        
        setArticles(data.articles);
        setVisibleArticles(6); // Reset visible articles when filter changes
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [activeFilter, API_KEY]);

  const loadMoreArticles = () => {
    setVisibleArticles(prevCount => prevCount + 6);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;

    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const getCategoryTag = (article) => {
    const text = (article.title + ' ' + (article.description || '')).toLowerCase();
    if (text.includes('bank') || text.includes('banking')) return 'Banking';
    if (text.includes('invest') || text.includes('stock')) return 'Investment';
    if (text.includes('loan') || text.includes('credit')) return 'Lending';
    if (text.includes('policy') || text.includes('regulation')) return 'Regulation';
    if (text.includes('digital') || text.includes('tech')) return 'Technology';
    return 'Finance';
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Banking': return 'bg-green-900 text-green-300';
      case 'Investment': return 'bg-emerald-900 text-emerald-300';
      case 'Lending': return 'bg-lime-900 text-lime-300';
      case 'Regulation': return 'bg-yellow-900 text-yellow-300';
      case 'Technology': return 'bg-teal-900 text-teal-300';
      default: return 'bg-gray-800 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white p-1 overflow-hidden ">
      <div className="max-w-screen-2xl mx-auto rounded-xl shadow-lg ">
        <div className="text-center flex flex-col items-center justify-center p-6">
          <h2 className="text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">
            Financial Pulse
          </h2>
          <p className="text-gray-600 mb-8">Your real-time window into banking & financial developments worldwide</p>

          {/* Filters */}
          <div className="mb-8 overflow-x-auto pb-2">
            <div className="flex gap-2 bg-gray-900 p-2 rounded-xl min-w-max">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${
                    activeFilter === filter.id
                    ? 'bg-gray-700 text-white shadow-lg'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.icon}
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex justify-center py-16">
              <div className="relative">
                <div className="h-16 w-16 rounded-full border-t-4 border-b-4 border-green-500 animate-spin"></div>
                <div className="h-10 w-10 rounded-full border-t-4 border-b-4 border-emerald-500 animate-spin absolute top-3 left-3"></div>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-900/30 border-l-4 border-red-500 text-red-300 p-6 my-4 rounded-lg">
              <div className="flex items-center mb-2">
                <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="font-bold">Connection Error</p>
              </div>
              <p className="ml-8">{error}</p>
              <button 
                onClick={() => setActiveFilter(activeFilter)} 
                className="ml-8 mt-3 flex items-center text-red-300 font-medium hover:text-red-200"
              >
                Retry <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          )}

          {/* Articles Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.length > 0 ? (
                articles.slice(0, visibleArticles).map((article, index) => {
                  const categoryTag = getCategoryTag(article);
                  const categoryColor = getCategoryColor(categoryTag);

                  return (
                    <div 
                      key={index} 
                      className={`bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 group ${
                        hoveredCard === index ? 'shadow-xl shadow-green-900/30 scale-102' : 'shadow-md shadow-gray-900'
                      }`}
                      onMouseEnter={() => setHoveredCard(index)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div className="relative">
                        {article.urlToImage ? (
                          <img 
                            src={article.urlToImage} 
                            alt={article.title}
                            className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-105"
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className="w-full h-48 bg-gradient-to-r from-gray-800 to-gray-700 flex items-center justify-center">
                            <Newspaper size={48} className="text-gray-600" />
                          </div>
                        )}
                        <div className="absolute top-3 left-3 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full flex items-center">
                          <Clock size={12} className="mr-1" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <div className={`absolute top-3 right-3 ${categoryColor} text-xs px-2 py-1 rounded-full font-medium`}>
                          {categoryTag}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center mb-3">
                          <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center text-xs font-bold text-gray-300 mr-2">
                            {article.source.name?.charAt(0).toUpperCase() || 'N'}
                          </div>
                          <span className="text-sm text-gray-400 truncate">{article.source.name}</span>
                        </div>
                        <h3 className="text-lg font-bold mb-2 text-gray-100 line-clamp-2 group-hover:text-green-400 transition-colors">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                          {article.description || 'No description available'}
                        </p>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
                        >
                          Read Full Article <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-16 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800 text-gray-400 mb-4">
                    <Newspaper size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-200 mb-2">No articles found</h3>
                  <p className="text-gray-400">We couldn't find any articles matching your filter criteria.</p>
                  <button 
                    onClick={() => setActiveFilter('all')} 
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors inline-flex items-center"
                  >
                    View all news <ArrowRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Load More Button */}
          {!loading && !error && articles.length > visibleArticles && (
            <div className="text-center mt-10">
              <button 
                onClick={loadMoreArticles}
                className="group bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:shadow-green-900/20 transition-all flex items-center mx-auto"
              >
                <span className="mr-2">Explore More Articles</span>
                <ArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .scale-102 {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default BankingNewsComponent;
