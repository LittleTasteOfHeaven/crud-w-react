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

type selectedStT = boolean[];

type productsStT = {
	id: string,
	name: string,
	price: string;
}[];

function App() {
	const [productsSt, setProductsSt] = React.useState<productsStT>(products);
	const initUnchecked: boolean[] = Array(products.length).fill(false);
	const [selectedSt, setSelectedSt] = React.useState<selectedStT>(initUnchecked);

	const alterCheckedFn =
		(event: React.ChangeEvent<HTMLInputElement>) => {
			const inputElement = event.target as HTMLInputElement;
			const productID = (event.target as HTMLInputElement).dataset['id'];
			const index = productsSt.findIndex(item => item!.id === productID);
			const selected = [...selectedSt];
			selected[index] = inputElement.checked;
			setSelectedSt(selected);
		};

	const deleteCheckedFn = () => {
		const products = [...productsSt];
		const selected = [...selectedSt];

		for (let idx = 0; idx < selected.length;) {
			if (selected[idx]) {
				products.splice(idx, 1);
				selected.splice(idx, 1);
			} else {
				idx += 1;
			}
		}

		setProductsSt(products);
		setSelectedSt(selected);
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
			const productId = (event.target as HTMLButtonElement).value;
			setProductsSt(productsSt.filter(product => product!.id !== productId));
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
						(product, idx) =>
							<SingleItem
								key={idx}
								id={product!.id}
								name={product!.name}
								price={product!.price}
								checked={selectedSt[idx]}
								deleteProductFn={deleteProductFn}
								saveProductAttrFn={saveProductAttrFn}
								alterCheckedFn={alterCheckedFn}
							/>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
