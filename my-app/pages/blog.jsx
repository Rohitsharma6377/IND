import React from 'react';

export default function Blog() {
  return (
    <div className="min-h-screen bg-white">
        <div className="py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Blog</h1>
          <p className="text-lg text-gray-600">test</p>
        </div>
    </div>
  );
}

export async function getStaticProps({ params }) {
  // Fetch data for SSG here
  return { props: {} };
}

export const metadata = {
  title: 'Blog',
  description: 'test'
};
