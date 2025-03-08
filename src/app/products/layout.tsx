import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product',
  description:
    'Explore our wide range of products, including the latest and greatest in technology, fashion, and more. Find the perfect product to suit your needs and preferences.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
