import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { addPost } from './postsSlice';

import { selectAllUsers } from '../users/usersSlice';

const AddPostForm = () => {
	const [data, setData] = useState({
		title: '',
		content: '',
		userId: '',
	});

	const dispatch = useDispatch();

	const users = useSelector(selectAllUsers);

	const handleOnChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (data.title && data.content && data.userId) {
			dispatch(addPost(data));
			setData({
				title: '',
				content: '',
				userId: '',
			});
		}
	};
	const userOptions = users.map((user) => (
		<option key={user.id} value={user.id}>
			{user.name}
		</option>
	));
	const canSave =
		Boolean(data.title) && Boolean(data.content) && Boolean(data.userId);
	return (
		<section>
			<h2>Add a New Post</h2>
			<form onSubmit={submitHandler}>
				<label htmlFor='postTitle'>Post Title:</label>
				<input
					type='text'
					id='postTitle'
					name='title'
					value={data.title}
					onChange={handleOnChange}
				/>
				<label htmlFor='postAuthor'>Author:</label>
				<select
					name='userId'
					id='postAuthor'
					value={data.userId}
					onChange={handleOnChange}
				>
					<option value=''>Select User</option>
					{userOptions}
				</select>
				<label htmlFor='postContent'>Post Content:</label>
				<textarea
					type='text'
					id='postContent'
					name='content'
					value={data.content}
					onChange={handleOnChange}
				></textarea>
				<button type='submit' disabled={!canSave}>
					Save Post
				</button>
			</form>
		</section>
	);
};

export default AddPostForm;
