import * as React from "react";
import "../css/add-item.css";

type propsT = {
  addProductFn: (event: React.FormEvent<HTMLFormElement>) => void;
};

type attrT = {
  name: string,
  price: string;
};

export function AddItem(props: propsT) {
  const [attrSt, setAttrSt] = React.useState<attrT>({ name: "", price: "" });

  let { addProductFn } = props;

  const editAttrFn = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setAttrSt({ ...attrSt, name: value });
        break;
      case "price":
        setAttrSt({ ...attrSt, price: value });
        break;
      default:
        break;
    }
  };

  return (
    <section>
      <h1>Add Product</h1>
      <form
        className="product-add-form"
        onSubmit={addProductFn}>
        <input
          type="text"
          name="name"
          value={attrSt.name}
          onChange={editAttrFn} />
        <input
          type="text"
          name="price"
          value={attrSt.price}
          onChange={editAttrFn} />
        <button
          className="submit"
          type="submit">
          Add
        </button>
      </form>
    </section>
  );
}