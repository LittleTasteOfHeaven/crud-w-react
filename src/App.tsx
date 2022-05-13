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

type productsStT = {
	id: string,
	name: string,
	price: string;
}[];

function App() {
	const [productsSt, setProductsSt] = React.useState<productsStT>(products);
	
	const selected: boolean[] = Array(products.length).fill(false);

	const alterCheckedFn =
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const inputElement = event.target as HTMLInputElement;
			const productID = (event.target as HTMLInputElement).dataset['id'];
			const index = productsSt.findIndex(item => item!.id === productID);
			selected[index] = inputElement.checked;
		};

	const deleteCheckedFn = () => {
		const products = [...productsSt];

		for (let idx = 0; idx < selected.length;) {
			if (selected[idx]) {
				products.splice(idx, 1);
				selected.splice(idx, 1);
			} else {
				idx += 1;
			}
		}
		setProductsSt(products);
	};

	const addProductFn =
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

	const deleteProductFn =
		(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
			const productID = (event.target as HTMLButtonElement).dataset['id'];
			const products = [...productsSt];
			const index = products.findIndex(item => item!.id === productID);
			products.splice(index, 1);
			setProductsSt(products);
		};

	const saveProductAttrFn =
		(event: React.FormEvent<HTMLFormElement>) => {
			event.preventDefault();
			const productID = (event.target as HTMLFormElement).dataset['id'];
			const formElements = (event.target as HTMLFormElement).elements;
			const nameInput = (formElements[0] as HTMLInputElement).value;
			const priceInput = (formElements[1] as HTMLInputElement).value;
			const products = [...productsSt];
			const index = products.findIndex(item => item!.id === productID);
			products[index] = { ...products[index]!, name: nameInput, price: priceInput };
			setProductsSt(products);
		};

	return (
		<div>
			<AddItem addProductFn={addProductFn} />
			<div>
				<div>
					<h1>Products List</h1>
					<button
						type="button"
						className="delete-bulk"
						onClick={deleteCheckedFn}>Delete Selected</button>
				</div>

				<div>
					{productsSt.map(
						product => {
							return <SingleItem
								key={product!.id}
								id={product!.id}
								name={product!.name}
								price={product!.price}
								deleteProductFn={deleteProductFn}
								saveProductAttrFn={saveProductAttrFn}
								alterCheckedFn={alterCheckedFn}
							/>;
						})}
				</div>
			</div>
		</div>
	);
}

export default App;
