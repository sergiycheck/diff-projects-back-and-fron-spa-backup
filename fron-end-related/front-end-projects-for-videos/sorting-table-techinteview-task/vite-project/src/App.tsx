import { useEffect, useMemo, useState } from "react";

const products = [
  {
    created_at: "2023-08-12T14:32:18.729Z",
    updated_at: "2023-05-12T14:32:18.729Z",
    id: "prod_001",
    name: "Smart Watch",
    description:
      "A sleek and stylish smartwatch with fitness tracking, notifications, and customizable watch faces.",
    status: "available",
  },
  {
    created_at: "2023-04-12T09:15:22.456Z",
    updated_at: "2023-05-12T09:15:22.456Z",
    id: "prod_002",
    name: "Wireless Headphones",
    description:
      "High-quality Bluetooth headphones with active noise cancellation and long battery life.",
    status: "available",
  },
  {
    created_at: "2023-03-11T18:42:03.789Z",
    updated_at: "2023-05-11T18:42:03.789Z",
    id: "prod_003",
    name: "Laptop Backpack",
    description:
      "A durable and water-resistant backpack designed to protect and carry your laptop and other essentials.",
    status: "out_of_stock",
  },
  {
    created_at: "2022-05-10T22:27:49.123Z",
    updated_at: "2023-05-10T22:27:49.123Z",
    id: "prod_004",
    name: "Portable Power Bank",
    description:
      "A high-capacity power bank with multiple USB ports for charging your devices on the go.",
    status: "available",
  },
  {
    created_at: "2023-05-11T16:53:24.678Z",
    updated_at: "2023-05-09T17:53:24.678Z",
    id: "prod_005",
    name: "Fitness Tracker",
    description:
      "A lightweight and water-resistant fitness tracker with heart rate monitoring and sleep tracking features.",
    status: "available",
  },
  {
    created_at: "2023-05-08T11:19:38.245Z",
    updated_at: "2023-05-08T11:19:38.245Z",
    id: "prod_006",
    name: "Wireless Speaker",
    description:
      "A powerful and portable Bluetooth speaker with rich sound quality and long battery life.",
    status: "available",
  },
  {
    created_at: "2023-05-07T06:42:51.912Z",
    updated_at: "2023-05-07T06:42:51.912Z",
    id: "prod_007",
    name: "External SSD",
    description:
      "A high-speed external solid-state drive with USB-C connectivity for fast data transfer and storage.",
    status: "out_of_stock",
  },
  {
    created_at: "2023-05-06T21:28:17.534Z",
    updated_at: "2023-05-06T21:28:17.534Z",
    id: "prod_008",
    name: "Wireless Charger",
    description:
      "A sleek and compact wireless charging pad compatible with Qi-enabled smartphones and devices.",
    status: "available",
  },
  {
    created_at: "2023-05-05T14:53:29.876Z",
    updated_at: "2023-05-05T14:53:29.876Z",
    id: "prod_009",
    name: "Smart Home Hub",
    description:
      "A versatile smart home hub that allows you to control and automate various connected devices and appliances.",
    status: "available",
  },
  {
    created_at: "2023-05-04T09:17:42.198Z",
    updated_at: "2023-05-04T09:17:42.198Z",
    id: "prod_010",
    name: "Action Camera",
    description:
      "A rugged and waterproof action camera with 4K video recording capabilities and various mounting accessories.",
    status: "out_of_stock",
  },
];

type Product = {
  created_at: string;
  updated_at: string;
  id: string;
  name: string;
  description: string;
  status: "available" | "out_of_stock";
};

type ProductWithFormattedTime = Product & {
  readable_created_at: string;
  readable_updated_at: string;
};

type AlphabeticallySortBy = keyof Pick<Product, "name" | "description">;

type SortByDate = keyof Pick<Product, "created_at" | "updated_at">;

function App() {
  const [productsList, setProductsList] = useState<ProductWithFormattedTime[]>();

  const formattedProducts = useMemo(() => {
    return products.map((product) => ({
      ...product,
      readable_created_at: new Date(product.created_at).toDateString(),
      readable_updated_at: new Date(product.updated_at).toDateString(),
    })) as ProductWithFormattedTime[];
  }, []);

  useEffect(() => {
    setProductsList(formattedProducts);
  }, [formattedProducts]);

  const [sortByAlphabeticallyName, setSortByAlphabeticallyName] = useState<"asc" | "desc" | null>(
    null
  );
  const [sortByAlphabeticallyDescription, setSortByAlphabeticallyDescription] = useState<
    "asc" | "desc" | null
  >(null);

  const [sortByCreatedAt, setSortByCreatedAt] = useState<"asc" | "desc" | null>("asc");
  const [sortByUpdatedAt, setSortByUpdatedAt] = useState<"asc" | "desc" | null>("asc");

  const handleAlphabeticallySortBy = (
    key: AlphabeticallySortBy,
    ascDescSorting: "asc" | "desc"
  ) => {
    const comparatorFn = (a: ProductWithFormattedTime, b: ProductWithFormattedTime) => {
      const nameA = a[key].toUpperCase();
      const nameB = b[key].toUpperCase();
      const comparison = nameA.localeCompare(nameB);
      return ascDescSorting === "asc" ? comparison : -comparison;
    };

    setProductsList(productsList?.slice().sort(comparatorFn));
  };

  const sortByDate = (key: SortByDate, ascDescSorting: "asc" | "desc") => {
    const compareDesc = (a: string, b: string) => {
      const aTime = new Date(a).getTime();
      const bTime = new Date(b).getTime();
      return aTime - bTime > 0 ? 1 : aTime == bTime ? 0 : -1;
    };

    const comparatorFn = (a: ProductWithFormattedTime, b: ProductWithFormattedTime) => {
      return ascDescSorting === "asc" ? compareDesc(a[key], b[key]) : -compareDesc(a[key], b[key]);
    };

    setProductsList(productsList?.slice().sort(comparatorFn));
  };

  const filterByStatus = (status: string) => {
    if (status) {
      const filteredProducts = formattedProducts.filter((product) => product.status === status);
      setProductsList(filteredProducts);
    } else {
      setProductsList(formattedProducts);
    }
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="w-full text-sm min-w-[700px] border-collapse table-auto">
          <thead>
            <tr>
              <th className="text-left">
                <p>ID</p>
              </th>
              <th className="text-left">
                <button
                  onClick={() => {
                    const ascOrDesc = sortByAlphabeticallyName === "asc" ? "desc" : "asc";
                    setSortByAlphabeticallyName(ascOrDesc);
                    handleAlphabeticallySortBy("name", ascOrDesc);
                  }}
                >
                  Name {sortByAlphabeticallyName === "asc" ? "⬆️" : "⬇️"}
                </button>
              </th>
              <th className="text-left">
                <button
                  onClick={() => {
                    const ascOrDesc = sortByAlphabeticallyDescription === "asc" ? "desc" : "asc";
                    setSortByAlphabeticallyDescription(ascOrDesc);
                    handleAlphabeticallySortBy("description", ascOrDesc);
                  }}
                >
                  Description {sortByAlphabeticallyDescription === "asc" ? "⬆️" : "⬇️"}
                </button>
              </th>
              <th className="text-left">
                <button
                  onClick={() => {
                    const ascOrDesc = sortByCreatedAt === "asc" ? "desc" : "asc";
                    setSortByCreatedAt(ascOrDesc);
                    sortByDate("created_at", ascOrDesc);
                  }}
                >
                  Created At {sortByCreatedAt === "asc" ? "⬆️" : "⬇️"}
                </button>
              </th>
              <th className="text-left">
                <button
                  onClick={() => {
                    const ascOrDesc = sortByUpdatedAt === "asc" ? "desc" : "asc";
                    setSortByUpdatedAt(ascOrDesc);
                    sortByDate("updated_at", ascOrDesc);
                  }}
                >
                  Updated At {sortByUpdatedAt === "asc" ? "⬆️" : "⬇️"}
                </button>
              </th>
              <th className="text-left">
                <select onChange={(e) => filterByStatus(e.target.value)}>
                  <option value="">All</option>
                  <option value="available">Available</option>
                  <option value="out_of_stock">Out of Stock</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {productsList?.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.description.slice(0, 15) + "..."}</td>
                <td>{product.readable_created_at}</td>
                <td>{product.readable_updated_at}</td>
                <td>{product.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
