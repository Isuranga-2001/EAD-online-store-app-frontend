import React, { useState, useEffect } from "react";
import SidebarLayout from "@/components/SidebarLayout";
import Toast from "@/components/Toast";
import Spinner from "@/components/Spinner";
import TextBox from "@/components/TextBox";
import TextArea from "@/components/TextArea";
import Dropdown from "@/components/Dropdown";
import MultipleImageUpload from "@/components/MultipleImageUpload";
import Button from "@/components/Button";
import { toast } from "react-toastify";
import { CreateProduct } from "@/interfaces/productInterface";
import { createProduct } from "@/services/productService";
import { getAllProductTypes } from "@/services/productTypeService";

const AdminAddProductPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
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

  const clearFields = () => {
    setName("");
    setDescription("");
    setPrice(0);
    setStock(0);
    setProductTypeId(undefined);
    setImages([]);
  };

  const addProduct = async () => {
    if (
      name.trim() === "" ||
      description.trim() === "" ||
      price <= 0 ||
      stock <= 0 ||
      !productTypeId ||
      images.length === 0
    ) {
      toast.error("Please fill all the required fields.");
      return;
    }

    setLoading(true);
    const newProduct: CreateProduct = {
      name,
      description,
      price,
      stock,
      product_type_id: productTypeId,
      images: images,
    };

    try {
      await createProduct(newProduct);
      toast.success("Product added successfully!");
      clearFields();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SidebarLayout selectedSidebarItem="addProducts">
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
          caption="Clear Fields"
          onClick={clearFields}
          background="bg-light-green"
        />
        <Button caption="Add Product" onClick={addProduct} />
      </div>
      <Toast />
      <Spinner isVisible={loading} />
    </SidebarLayout>
  );
};

export default AdminAddProductPage;
