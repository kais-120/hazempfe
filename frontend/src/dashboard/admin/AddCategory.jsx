import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AxiosToken } from "../../Api/Api";

export default function AddCategory() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    libelle: Yup.string().required("Libelle is required"),
    min_age: Yup.number()
      .required("Min age is required")
      .min(1, "Invalid age"),
    max_age: Yup.number()
      .required("Max age is required")
      .moreThan(Yup.ref("min_age"), "Max age must be greater than min age"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Invalid price"),
  });

  return (
    <div className="max-w-xl mx-auto bg-black/40 p-6 rounded-xl text-white">
      <h2 className="text-xl font-semibold mb-4">
        Add Pricing Category
      </h2>

      <Formik
        initialValues={{
          libelle: "",
          min_age: "",
          max_age: "",
          price: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm, setErrors }) => {
          setLoading(true);
          try {
            const res = await AxiosToken.post("/pricing", values);
            alert(res.data.message);
            resetForm();
          } catch (err) {
            if (err.response?.data?.errors) {
              // errors array from backend
              const formatted = {};
              err.response.data.errors.forEach((msg, i) => {
                formatted[`error_${i}`] = msg;
              });
              setErrors(formatted);
            } else {
              alert(err.response?.data?.message || "Error");
            }
          } finally {
            setLoading(false);
          }
        }}
      >
        {() => (
          <Form className="space-y-4">

            {/* Libelle */}
            <div>
              <Field
                name="libelle"
                placeholder="Category name (Young, Adult...)"
                className="w-full p-2 rounded bg-black border border-white/20"
              />
              <ErrorMessage
                name="libelle"
                component="p"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Ages */}
            <div className="flex gap-3">
              <div className="w-full">
                <Field
                  type="number"
                  name="min_age"
                  placeholder="Min age"
                  className="w-full p-2 rounded bg-black border border-white/20"
                />
                <ErrorMessage
                  name="min_age"
                  component="p"
                  className="text-red-400 text-sm"
                />
              </div>

              <div className="w-full">
                <Field
                  type="number"
                  name="max_age"
                  placeholder="Max age"
                  className="w-full p-2 rounded bg-black border border-white/20"
                />
                <ErrorMessage
                  name="max_age"
                  component="p"
                  className="text-red-400 text-sm"
                />
              </div>
            </div>

            {/* Price */}
            <div>
              <Field
                type="number"
                name="price"
                placeholder="Price (TND)"
                className="w-full p-2 rounded bg-black border border-white/20"
              />
              <ErrorMessage
                name="price"
                component="p"
                className="text-red-400 text-sm"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 text-black py-2 rounded font-semibold hover:bg-yellow-300"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}