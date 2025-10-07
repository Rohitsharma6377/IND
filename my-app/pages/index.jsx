import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Hero />
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard title="File-based Routing" desc="Routes from files, dynamic params, layouts." delay={0} />
          <FeatureCard title="SSR + SSG" desc="Server-render or pre-render with revalidation." delay={120} />
          <FeatureCard title="API Routes" desc="Full HTTP methods with helpers and auth." delay={240} />
        </div>
      </section>
    </div>
  );
}