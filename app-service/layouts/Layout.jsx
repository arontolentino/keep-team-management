import { Footer, Header } from './components';

export default function Layout({ children }) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
