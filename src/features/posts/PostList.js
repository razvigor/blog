import { useSelector, useDispatch } from 'react-redux';
import {
	selectAllPosts,
	getPostsStatus,
	getPostsError,
	fetchPosts,
} from './postsSlice';

import PostsExcerpt from './PostExcerpt';
import { useEffect, useState, useMemo } from 'react';
import Pagination from '../../pagination/Pagination';
let PageSize = 6;
const PostList = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const posts = useSelector(selectAllPosts);
	const postStatus = useSelector(getPostsStatus);
	const error = useSelector(getPostsError);
	const currentTableData = useMemo(() => {
		if (posts !== null && posts.length > PageSize) {
			const firstPageIndex = (currentPage - 1) * PageSize;
			const lastPageIndex = firstPageIndex + PageSize;
			return posts.slice(firstPageIndex, lastPageIndex);
		} else {
			return posts;
		}
	}, [posts, currentPage]);
	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts());
		}
	}, [postStatus, dispatch]);
	let content;
	if (postStatus === 'loading') {
		content = <p>"Loading..."</p>;
	} else if (postStatus === 'succeeded') {
		content = currentTableData.map((post) => (
			<PostsExcerpt key={post.id} post={post} />
		));
	} else if (postStatus === 'failed') {
		content = <p>{error}</p>;
	}
	return (
		<section>
			<h2>Posts</h2>
			<div className='articles'>{content}</div>
			<Pagination
				className='pagination-bar'
				currentPage={currentPage}
				totalCount={posts !== null ? posts.length : 0}
				pageSize={PageSize}
				onPageChange={(page) => setCurrentPage(page)}
			/>
		</section>
	);
};

export default PostList;
