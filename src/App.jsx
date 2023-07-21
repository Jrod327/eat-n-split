/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useState } from "react";
import "./index.css";

const initialFriends = [
	{
		id: 118836,
		name: "Clark",
		image: "https://i.pravatar.cc/48?u=118836",
		balance: -7
	},
	{
		id: 933372,
		name: "Sarah",
		image: "https://i.pravatar.cc/48?u=933372",
		balance: 20
	},
	{
		id: 499476,
		name: "Anthony",
		image: "https://i.pravatar.cc/48?u=499476",
		balance: 0
	}
];

export default function App() {
	const [friendFormOpen, setFriendFormOpen] = useState(false);
	const [friendList, setFriendList] = useState(initialFriends);

	function toggleFriendForm() {
		setFriendFormOpen(!friendFormOpen);
	}

	function handleAddFriend(newFriend) {
		setFriendList([...friendList, newFriend]);
		toggleFriendForm();
	}

	return (
		<div className="app">
			<div className="sidebar">
				<FriendList friendList={friendList} />
				{friendFormOpen && <NewFriendForm onSubmit={handleAddFriend} />}

				<Button onClick={toggleFriendForm}>
					{friendFormOpen ? "Close" : "Add Friend"}
				</Button>
			</div>
			<BillForm />
		</div>
	);
}

function FriendList({ friendList }) {
	return (
		<ul>
			{friendList.map(friend => (
				<Friend friend={friend} key={friend.id} />
			))}
		</ul>
	);
}

function Friend({ friend }) {
	return (
		<li>
			<img src={friend.image} alt={friend.name} />
			<h3>{friend.name}</h3>

			{friend.balance > 0 ? (
				<p className="red">
					You owe {friend.name} ${Math.abs(friend.balance)}
				</p>
			) : friend.balance < 0 ? (
				<p className="green">
					{friend.name} owes you ${Math.abs(friend.balance)}
				</p>
			) : (
				<p>You and {friend.name} are even</p>
			)}
			<Button>Select</Button>
		</li>
	);
}

function NewFriendForm({ onSubmit }) {
	const [friendName, setFriendName] = useState("");
	const [imgURL, setImgURL] = useState("");

	const newFriend = {
		id: Math.floor(Math.random() * 100000),
		name: friendName,
		image: imgURL,
		balance: 0
	};

	function handleSubmit(e) {
		e.preventDefault();
		onSubmit(newFriend);
		setFriendName("");
		setImgURL("");
	}
	return (
		<>
			<form className="form-add-friend" onSubmit={handleSubmit}>
				<label>🧍Friend name</label>
				<input
					type="text"
					value={friendName}
					onChange={e => setFriendName(e.target.value)}
				/>
				<label>🖼️Image URL</label>
				<input
					type="text"
					value={imgURL}
					onChange={e => setImgURL(e.target.value)}
				/>
				<Button>Add</Button>
			</form>
		</>
	);
}

function BillForm() {
	return (
		<form className="form-split-bill">
			<h2>SPLIT A BILL WITH SARAH</h2>
			<label>💰Bill value</label>
			<input type="text" />
			<label>🤵Your expense</label>
			<input type="text" />
			<label>🧑Sarah expense</label>
			<input type="text" disabled />
			<label>🤑Who is paying the bill?</label>
			<select>
				<option value="">You</option>
				<option value="">Sarah</option>
			</select>
			<Button>Split Bill</Button>
		</form>
	);
}

function Button({ children, onClick }) {
	return (
		<button className="button" onClick={onClick}>
			{children}
		</button>
	);
}
