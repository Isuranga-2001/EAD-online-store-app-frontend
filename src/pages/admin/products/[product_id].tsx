import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SidebarLayout from "@/components/SidebarLayout";
import Toast from "@/components/Toast";
import Spinner from "@/components/Spinner";
import TextBox from "@/components/TextBox";
import TextArea from "@/components/TextArea";
import Dropdown from "@/components/Dropdown";
import MultipleImageUpload from "@/components/MultipleImageUpload";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { Product } from "@/interfaces/productInterface";
import {
  getProductById,
  updateProduct,
  deleteProductById,
} from "@/services/productService";
import { getAllProductTypes } from "@/services/productTypeService";

const AdminEditProductPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const { product_id } = router.query;

  const [product, setProduct] = useState<Product | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [productTypeId, setProductTypeId] = useState<number | undefined>(
    undefined
  );
  const [productTypes, setProductTypes] = useState<
    { value: number; label: string }[]
  >([]);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (product_id && !isNaN(Number(product_id))) {
      fetchProduct(Number(product_id));
    }
  }, [product_id]);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await getAllProductTypes();
        setProductTypes(
          response.map((type) => ({ value: type.ID, label: type.name }))
        );
      } catch (error) {
        console.error(error);
        toast.error("Failed to load product types.");
      }
    };
    fetchProductTypes();
  }, []);

  const fetchProduct = async (productID: number) => {
    setLoading(true);
    try {
      const response = await getProductById(productID);
      setProduct(response);
      setName(response.name);
      setDescription(response.description);
      setPrice(response.price);
      setStock(response.stock);
      setProductTypeId(response.product_type_id);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setName(product?.name || "");
    setDescription(product?.description || "");
    setPrice(product?.price || 0);
    setStock(product?.stock || 0);
    setProductTypeId(product?.product_type_id);
    setImages([]);
  };

  const updateProductDetails = async () => {
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price <= 0 ||
      stock <= 0 ||
      !productTypeId
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    setLoading(true);
    const updatedProduct = {
      name,
      description,
      price,
      stock,
      product_type_id: productTypeId,
      images: images,
    };

    try {
      await updateProduct(Number(product_id), updatedProduct);
      toast.success("Product updated successfully!");
      resetFields();
      fetchProduct(Number(product_id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async () => {
    if (!product_id) return;

    setLoading(true);
    try {
      await deleteProductById(Number(product_id));
      toast.success("Product deleted successfully!");
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout selectedSidebarItem="viewProducts">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextBox
          value={name}
          onChange={setName}
          placeholder="Enter product name"
          caption="Product Name"
          maxCharCount={100}
        />
        <TextBox
          value={price.toString()}
          onChange={(value) => setPrice(Number(value))}
          placeholder="Enter product price"
          caption="Price"
          type="number"
        />
        <TextBox
          value={stock.toString()}
          onChange={(value) => setStock(Number(value))}
          placeholder="Enter product stock"
          caption="Stock"
          type="number"
        />
        <Dropdown
          value={productTypeId}
          onChange={(value) => setProductTypeId(Number(value))}
          options={productTypes}
          caption="Product Type"
        />
      </div>
      <TextArea
        value={description}
        onChange={setDescription}
        placeholder="Enter product description"
        caption="Description"
        containerClassName="mt-3"
        rows={5}
        maxCharCount={200}
      />
      <label className="block mb-2 text-sm font-medium text-gray-700 mt-6">
        Existing Product Images
      </label>
      <div className={`flex flex-wrap`}>
        {product?.images.map((image, index) => (
          <div
            key={index}
            className="w-48 h-36 flex flex-col items-center me-2"
          >
            <img
              src={image.url}
              alt="Current Product Image"
              className="w-48 h-32 object-cover mb-1 rounded-lg border border-blue/70"
            />
          </div>
        ))}
      </div>
      <MultipleImageUpload
        name="product-images"
        files={images}
        setFiles={setImages}
        maxFileSize={5242880}
        maxImageCount={5}
        caption="Select Product Images"
        containerClassName="mt-6"
      />
      <hr className="my-2" />
      <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-2 mb-4">
        <Button
          caption="Reset Fields"
          onClick={resetFields}
          background="bg-light-green"
        />
        <Button caption="Update Product" onClick={updateProductDetails} />
        <Button
          caption="Delete Product"
          onClick={deleteProduct}
          background="bg-red"
        />
      </div>
      <Toast />
      <Spinner isVisible={loading} />
    </SidebarLayout>
  );
};

export default AdminEditProductPage;
