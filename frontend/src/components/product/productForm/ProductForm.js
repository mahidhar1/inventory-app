import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Card from "../../card/Card";

import "./ProductForm.scss";

const ProductForm = ({
  product,
  productImage,
  imagePreview,
  description,
  setDescription,
  handleInputChange,
  handleImageChange,
  saveProduct,
}) => {
  return (
    <div className="add-product">
      <Card cardClass={"card"}>
        <form onSubmit={saveProduct}>
          <div className={"--flex-between --align-start"}>
            <Card cardClass={"group"}>
              <div>
                <label>Product Name:</label>
                <input
                  type="text"
                  placeholder="Product name"
                  name="name"
                  value={product?.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>Product Category</label>
                <input
                  type="text"
                  placeholder="Product Category"
                  name="category"
                  value={product?.category}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label>{`Quantity (Total packs):`}</label>
                <input
                  type="text"
                  placeholder="Product Quantity"
                  name="quantity"
                  value={product?.quantity}
                  onChange={handleInputChange}
                />
              </div>
              <div className={"--flex-between"}>
                <div>
                  <label>Pack Size:</label>
                  <input
                    type="number"
                    placeholder="Product Pack Size"
                    name="packSize"
                    value={product?.packSize}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>{`Unit (kg/piece/litre)`}</label>
                  <input
                    type="text"
                    placeholder="Product Unit"
                    name="unit"
                    value={product?.unit}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="--flex-between">
                <div>
                  <label>{`Price per pack:`}</label>
                  <input
                    type="text"
                    placeholder="Product Price"
                    name="price"
                    value={product?.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>{`Discount in %: (optional)`}</label>
                  <input
                    type="number"
                    placeholder="Product Discount"
                    name="discount"
                    value={product?.discount}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </Card>
            <Card cardClass={"group"}>
              <div>
                <label>Product Image</label>
                <code className="--color-dark">
                  Supported Formats: jpg, jpeg, png
                </code>
                <input
                  type="file"
                  name="image"
                  onChange={(e) => handleImageChange(e)}
                />

                {imagePreview != null ? (
                  <div className="image-preview">
                    <img src={imagePreview} alt="product" />
                  </div>
                ) : (
                  <p>No image set for this poduct.</p>
                )}
              </div>
            </Card>
          </div>
          <div>
            <label>Product Description:</label>
            <ReactQuill
              theme="snow"
              value={description}
              onChange={setDescription}
              modules={ProductForm.modules}
              formats={ProductForm.formats}
            />
          </div>

          <div className="--my">
            <button type="submit" className="--btn --btn-primary">
              Save Product
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

ProductForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
  ],
};
ProductForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "color",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "video",
  "image",
  "code-block",
  "align",
];

export default ProductForm;
