// app/page.tsx or any component using Apollo hooks
"use client";

import { gql, useQuery } from '@apollo/client';

const GET_BLOGS = gql`
  query GetBlogs {
    getBlogs {
      _id
      title
      content
      author {
        name
      }
    }
  }
`;

export default function BlogList() {
  const { loading, error, data } = useQuery(GET_BLOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data.getBlogs.map((blog: any) => (
        <div key={blog._id} className="blog-card">
          <h2>{blog.title}</h2>
          <p>By: {blog.author.name}</p>
          <p>{blog.content.substring(0, 100)}...</p>
        </div>
      ))}
    </div>
  );
}
