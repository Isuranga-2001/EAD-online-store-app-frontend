import React from 'react';
import ReactDOM from 'react-dom';
import VisitorLayout from "@/components/VisitorLayout";
import ProductList from './products';


export default function Home() {
  return (
    <VisitorLayout>
      <ProductList />
    </VisitorLayout>
  );
}
