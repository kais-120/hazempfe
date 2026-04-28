import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { AxiosToken } from "../../Api/Api";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  titre: Yup.string().required("Titre est requis"),
  description: Yup.string().required("Description est requis"),
  price: Yup.number().required("Price est requis"),
  discount: Yup.number(),
});

export default function CreateProduct() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      titre: "",
      description: "",
      price: "",
      discount: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      try{
      const data = new FormData();

      data.append("titre", values.titre);
      data.append("description", values.description);
      data.append("price", values.price);
      data.append("discount", values.discount);
      data.append("image", image);

      await AxiosToken.post("/product", data);

      alert("Product created");
      navigate(-1)
      }catch{
        console.error("error")
      }
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Create Product</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <input
          type="text"
          name="titre"
          placeholder="Titre"
          onChange={formik.handleChange}
          value={formik.values.titre}
          className="border p-2 w-full"
        />
        {formik.touched.titre && <p className="text-red-500">{formik.errors.titre}</p>}

        <input
          type="text"
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className="border p-2 w-full"
        />
        {formik.touched.description && (
          <p className="text-red-500">{formik.errors.description}</p>
        )}

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={formik.handleChange}
          value={formik.values.price}
          className="border p-2 w-full"
        />
        {formik.touched.price && <p className="text-red-500">{formik.errors.price}</p>}

        <input
          type="number"
          name="discount"
          placeholder="Discount"
          onChange={formik.handleChange}
          value={formik.values.discount}
          className="border p-2 w-full"
        />

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}