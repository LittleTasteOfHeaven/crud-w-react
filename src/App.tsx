import * as React from "react";
import "./App.css";
import { SingleItem } from "./components/SingleItem";
import { AddItem } from "./components/AddItem";

let products = [
	{
		id: "1",
		name: "abc",
		price: "100"
	},
	{
		id: "2",
		name: "def",
		price: "200"
	},
	{
		id: "3",
		name: "xyz",
		price: "300"
	}
];

function App() {
	let [productsSt, setProductsSt] = React.useState(products);

	let addProductFn =
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const formElements = (event.target as HTMLFormElement).elements;
			const nameInput = (formElements[0] as HTMLInputElement).value;
			const priceInput = (formElements[1] as HTMLInputElement).value;
			const productID = window.performance.now().toString();
			const products = [...productsSt];
			products.push({
				id: productID,
				name: nameInput,
				price: priceInput
			});
			setProductsSt(products);
		};

	let deleteProductFn =
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const productId = (event.target as HTMLButtonElement).value;
			setProductsSt(productsSt.filter(product => product.id !== productId));
		};

	let saveProductAttrFn =
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const productID = (event.target as HTMLFormElement).dataset['id'];
			const formElements = (event.target as HTMLFormElement).elements;
			const nameInput = (formElements[0] as HTMLInputElement).value;
			const priceInput = (formElements[1] as HTMLInputElement).value;
			const products = [...productsSt];
			const index = products.findIndex(item => item.id === productID);
			products[index] = { ...products[index], name: nameInput, price: priceInput };
			setProductsSt(products);
		};

	return (
		<div>
			<AddItem addProductFn={addProductFn} />
			<section>
				<h1>Products List</h1>
				<div>
					{productsSt.map(
						(product, idx) =>
							<SingleItem
								key={idx}
								id={product.id}
								name={product.name}
								price={product.price}
								deleteProductFn={deleteProductFn}
								saveProductAttrFn={saveProductAttrFn}
							/>
					)}
				</div>
			</section>
		</div>
	);
}

export default App;
