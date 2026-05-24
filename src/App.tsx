import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PageLayout } from './components/layout/PageLayout';
import { HomePage } from './pages/HomePage';
import { WorkPage } from './pages/WorkPage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';
import { WritingPage } from './pages/WritingPage';
import { ContactPage } from './pages/ContactPage';
import { ScrollToTop } from './lib/ScrollToTop';
// import { useLenis } from './lib/useLenis';

function App() {
  // スムーズスクロールは検証時オフ。必要になったら useLenis() を再有効化
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<PageLayout><HomePage /></PageLayout>} />
        <Route path="/work" element={<PageLayout><WorkPage /></PageLayout>} />
        <Route path="/work/:id" element={<PageLayout><WorkDetailPage /></PageLayout>} />
        <Route path="/about" element={<PageLayout><AboutPage /></PageLayout>} />
        <Route path="/resume" element={<PageLayout><ResumePage /></PageLayout>} />
        <Route path="/writing" element={<PageLayout><WritingPage /></PageLayout>} />
        <Route path="/contact" element={<PageLayout><ContactPage /></PageLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
