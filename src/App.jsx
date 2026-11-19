import { useState } from "react";
import Layout from "./components/Layout/Layout";
import Form from "./components/Form/Form";
import ProductList from "./components/ProductList/ProductList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = [
  {
    id: self.crypto.randomUUID(),
    category: "Clothes",
    productName: "Body suit",
    description: "0 to 1 month old body suit",
    price: "19.99",
    brand: "Asos",
    priority: "essential",
    source: "buy",
    bought: false,
  },
  {
    id: self.crypto.randomUUID(),
    category: "Personal Care",
    productName: "Stretch marks cream",
    description: "Prevent and reduce stretch marks during maternity",
    price: "14.99",
    brand: "Bio-Oil",
    priority: "nice",
    source: "gift",
    bought: true,
  },
];

const initialInput = {
  category: "",
  productName: "",
  description: "",
  price: "",
  brand: "",
  priority: "",
  source: "",
};

function App() {
  const [products, setProducts] = useState(initialState);
  const [input, setInput] = useState(initialInput);
  const [filter, setFilter] = useState("");

  const formatPrice = (value) => {
    const cleanedValue = value.trim();

    if (!isNaN(cleanedValue) && cleanedValue !== "") {
      const numericValue = parseFloat(cleanedValue);

      if (Number.isInteger(numericValue)) {
        return numericValue.toFixed(2);
      }
      return cleanedValue;
    }

    return "";
  };

  // Aggiorna lo stato input

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInput((prevState) => {
      return {
        ...prevState,
        [id]: value,
      };
    });
  };

  //Crea un nuovo prodotto con i dati che vengono presi dagli input della form

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !input.category ||
      !input.productName ||
      !input.description ||
      !input.price ||
      !input.brand ||
      !input.priority ||
      !input.source
    ) {
      toast.error("All fields must be filled!");
      return;
    }

    if (isNaN(input.price) || input.price.trim() === "") {
      toast.error("Price must be a valid number!");
      return;
    }

    const id = self.crypto.randomUUID();
    const category = input.category;
    const productName = input.productName;
    const description = input.description;
    const price = formatPrice(input.price);
    const brand = input.brand;
    const priority = input.priority;
    const source = input.source;

    setProducts([
      ...products,
      {
        id,
        category,
        productName,
        description,
        price,
        brand,
        priority,
        source,
        bought: false,
      },
    ]);

    setInput(initialInput);
    toast.success("Product added successfully!");
  };

  // Cancella un articolo dalla lista degli articoli e aggiorna lo stato

  const handleDelete = (e) => {
    const tmpProducts = products.filter(
      (product) => product.id !== e.target.id,
    );

    setProducts(tmpProducts);
    toast.success("Product deleted successfully!");
  };

  //Aggiorna lo stato che gestisce il filtering

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Layout>
      <Form
        input={input}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <ProductList
        products={products}
        filter={filter}
        handleFilter={handleFilter}
        handleDelete={handleDelete}
      />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Layout>
  );
}

export default App;
