import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  CreateProduct,
  createProduct,
  createProductSchema,
  deleteProduct,
  getProducts,
} from "./api/products/products.api";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  const queryClient = useQueryClient();

  const query = useQuery({ queryKey: ["products"], queryFn: getProducts });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const { register, handleSubmit, reset } = useForm<CreateProduct>({
    resolver: zodResolver(createProductSchema),
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    reset();
  });

  return (
    <div className=" dark:bg-gray-600 min-h-full">
      <div className="container mx-auto">
        <div className="flex flex-col sm:grid sm:grid-cols-3">
          {/* products list */}
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Products</h2>

            <div className="mt-4">
              {query.isLoading ? (
                <div>Loading...</div>
              ) : query.isError ? (
                <div>Error: {(query as any).error.message}</div>
              ) : (
                <ul className="text-gray-900 dark:text-white">
                  {query.data.data?.map((product) => (
                    <li className="flex justify-between" key={product.id}>
                      <div className="flex flex-col gap-4">
                        <p className="text-xl">{product.name}</p>
                        <p className="text-md">{product.description}</p>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          onClick={() => deleteProductMutation.mutate(product.id)}
                          className="
                          h-[50px]
                          text-white bg-red-700 hover:bg-red-800 
                          focus:outline-none focus:ring-4 focus:ring-red-300 
                          font-medium rounded-md text-sm px-5 py-2.5 text-center 
                          mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                        >
                          remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* create product form */}
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Name
              </label>
              <input
                type="text"
                {...register("name")}
                className="bg-gray-50 border border-gray-300 text-gray-900 
                  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Leave a comment..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="
              ml-auto
              text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 
            focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 
              dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
