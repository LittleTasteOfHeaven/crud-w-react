import "../css/single-item.css";
import * as React from "react";

export type propsT = {
	id: string,
	name: string,
	price: string,
	deleteProductFn:
	(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
	saveProductAttrFn:
	(event: React.FormEvent<HTMLFormElement>) => void,
	alterCheckedFn:
	(event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function SingleItem(props: propsT) {
	const {
		id,
		name,
		price,
		deleteProductFn,
		saveProductAttrFn,
		alterCheckedFn
	} = props;

	const [attrSt, setAttrSt] = React.useState({ id, name, price });

	const [editableSt, setEditableSt] = React.useState(false);

	const [checkedSt, setCheckedSt] = React.useState(false);

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
		<div className="product">
			<div className="details">

				{editableSt ?
					<form
						data-id={id}
						onSubmit={(event) => {
							saveProductAttrFn(event);
							setEditableSt(false);
						}}
					>
						<input
							name="name"
							value={attrSt.name}
							type="text"
							onChange={editAttrFn} />
						<input
							name="price"
							value={attrSt.price}
							type="text"
							onChange={editAttrFn} />
						<button
							type="submit"
							className="save"
						>
							Save
						</button>
					</form> :

					<div>
						<p>{name}</p>
						<p>{price}</p>
						<button
							type="button"
							data-id={id}
							className="edit"
							onClick={(() => setEditableSt(true))}>
							Edit
						</button>
					</div>}
			</div>

			<button
				data-id={id}
				className="delete"
				onClick={deleteProductFn}>
				Delete
			</button>
			<input
				type="checkbox"
				className="check"
				data-id={id}
				checked={checkedSt}
				onChange={(event) => {
					setCheckedSt(!checkedSt);
					alterCheckedFn(event);
				}} />
		</div>
	);
}