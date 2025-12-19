import { useState } from 'react';
import { HelpCircle } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { Tutorial } from './components/Tutorial';
import { DashboardPage } from './pages/DashboardPage';
import { SalinityPage } from './pages/SalinityPage';
import { PostsPage } from './pages/PostsPage';
import { ProductsPage } from './pages/ProductsPage';
import { InvestPage } from './pages/InvestPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showTutorial, setShowTutorial] = useState(true);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToProduct = (productId: string) => {
    setCurrentPage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} />;
      case 'salinity':
        return <SalinityPage />;
      case 'posts':
        return <PostsPage onNavigateToProduct={handleNavigateToProduct} />;
      case 'products':
        return <ProductsPage />;
      case 'invest':
        return <InvestPage />;
      default:
        return <DashboardPage onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {showTutorial && <Tutorial onClose={() => setShowTutorial(false)} />}
      
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      <main>{renderPage()}</main>
      
      {/* Help Button */}
      <button
        onClick={() => setShowTutorial(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-green-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center gap-2"
        title="Mở hướng dẫn"
      >
        <HelpCircle className="w-6 h-6" />
        <span className="hidden md:inline font-bold">Trợ giúp</span>
      </button>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-2xl">💧</span>
                Nông nghiệp ĐBSCL
              </h3>
              <p className="text-gray-300 text-sm">
                Nền tảng hỗ trợ nông dân vượt qua thách thức xâm nhập mặn, 
                ứng dụng công nghệ để phát triển bền vững.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Liên kết nhanh</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <button 
                    onClick={() => handleNavigate('dashboard')}
                    className="hover:text-white transition-colors"
                  >
                    Trang chủ
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('salinity')}
                    className="hover:text-white transition-colors"
                  >
                    Dự đoán độ mặn
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('posts')}
                    className="hover:text-white transition-colors"
                  >
                    Cộng đồng
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleNavigate('invest')}
                    className="hover:text-white transition-colors"
                  >
                    Đầu tư & Hợp tác
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Liên hệ hỗ trợ</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>📞 Hotline: 1800-2468</li>
                <li>✉️ Email: support@dbscl.vn</li>
                <li>📍 Cần Thơ, Việt Nam</li>
                <li>🕐 8:00 - 20:00 hàng ngày</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-6 text-center text-sm text-gray-400">
            <p>© 2025 Nền tảng Nông nghiệp ĐBSCL. Phát triển bởi đội ngũ công nghệ vì nông dân.</p>
            <p className="mt-2">🌾 Cùng nhau xây dựng nông nghiệp bền vững 🌾</p>
          </div>
        </div>
      </footer>
    </div>
  );
}