import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import TextBox from "@/components/TextBox";
import Dropdown from "@/components/Dropdown";
import Button from "@/components/Button";
import { Table, TableColumn } from "@/components/Table";
import { getAllProducts, searchProducts } from "@/services/productService";
import { getAllProductTypes } from "@/services/productTypeService";
import { Product } from "@/interfaces/productInterface";
import { ProductType } from "@/interfaces/productTypeInterface";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { toast } from "react-toastify";

interface GetAllProductsResponse {
  total: number;
  products: Product[];
}

export default function AdminProductsPage() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProductType, setSelectedProductType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchProductTypes();
  }, []);

  useEffect(() => {
    if (searchQuery || selectedProductType) {
      searchProductsByParams();
    } else {
      fetchProducts();
    }
  }, [currentPage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response: GetAllProductsResponse = await getAllProducts(
        currentPage,
        pageSize
      );
      console.log(response);
      setProducts(response.products);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const searchProductsByParams = async () => {
    try {
      const params: Record<string, any> = { page: currentPage, pageSize: 10 };
      if (searchQuery) params.name = searchQuery;
      if (selectedProductType) params.product_type_id = selectedProductType;
      if (minPrice) params.min_price = minPrice;
      if (maxPrice) params.max_price = maxPrice;
      if (inStock) params.in_stock = inStock;
      params.page = 1;
      params.page_size = pageSize;
      console.log(params);
      setLoading(true);
      const response: GetAllProductsResponse = await searchProducts(params);
      console.log(response);
      setProducts(response.products);
      setTotalPages(Math.ceil(response.total / 10));
    } catch (error) {
      console.error(error);
      toast.error("Failed to search products");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductTypes = async () => {
    try {
      setLoading(true);
      const response = await getAllProductTypes();
      setProductTypes(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewEditClick = (productID: number) => {
    router.push(`/admin/products/${productID}`);
  };

  const columns: TableColumn<Product>[] = [
    { header: "ID", accessor: "ID" },
    { header: "Name", accessor: "name" },
    { header: "Price", accessor: "price" },
    { header: "Stock", accessor: "stock" },
    {
      header: "Actions",
      accessor: "ID",
      isButton: true,
      buttonCaption: "View/Edit",
      onClick: (row: Product) => handleViewEditClick(row.ID),
    },
  ];

  return (
    <SidebarLayout selectedSidebarItem={"viewProducts"}>
      <div className="p-4">
        <div className="flex flex-wrap gap-4 mb-4">
          <TextBox
            caption="Search by Name"
            placeholder="Enter product name"
            value={searchQuery}
            onChange={setSearchQuery}
            width="flex-1"
          />
          <Dropdown
            caption="Filter by Product Type"
            value={selectedProductType}
            onChange={setSelectedProductType}
            options={productTypes.map((type) => ({
              value: type.ID.toString(),
              label: type.name,
            }))}
            width="flex-1"
          />
          <TextBox
            caption="Min Price"
            placeholder="Enter minimum price"
            value={minPrice}
            onChange={setMinPrice}
            width="flex-1"
            type="number"
          />
          <TextBox
            caption="Max Price"
            placeholder="Enter maximum price"
            value={maxPrice}
            onChange={setMaxPrice}
            width="flex-1"
            type="number"
          />
          <Dropdown
            caption="In Stock"
            value={inStock}
            onChange={setInStock}
            options={[
              { value: "", label: "All" },
              { value: "true", label: "In Stock" },
              { value: "false", label: "Out of Stock" },
            ]}
            width="flex-1"
          />
        </div>
        <div className="flex justify-center mb-4">
          <Button
            caption="Search"
            onClick={searchProductsByParams}
            width="flex-none"
          />
        </div>
        <Table
          columns={columns}
          data={products}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
      <Spinner isVisible={loading} />
      <Toast />
    </SidebarLayout>
  );
}
