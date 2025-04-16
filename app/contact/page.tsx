import Header from '../components/Header';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* <Header /> */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold font-['Playfair_Display'] text-gray-900 mb-8">
            Contact Me
          </h1>
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-['Playfair_Display'] text-gray-700 mb-2">Email</h2>
              <a 
                href="mailto:colescarter@gmail.com" 
                className="text-lg text-[#895129] hover:text-yellow-950 transition-colors duration-150"
              >
                colescarter@gmail.com
              </a>
            </div>
            <div>
              <h2 className="text-xl font-['Playfair_Display'] text-gray-700 mb-2">Phone</h2>
              <a 
                href="tel:+18057547679" 
                className="text-lg text-[#895129] hover:text-yellow-950 transition-colors duration-150"
              >
                (805) 754-7679
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 