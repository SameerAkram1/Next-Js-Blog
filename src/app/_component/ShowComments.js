// components/ShowComments.jsx

export default function ShowComments({ comments }) {
  if (!comments || comments.length === 0)
    return <p>No comments yet</p>;

  return (
    <div>
      {comments.map((c) => (
        <div
          key={c._id}
          style={{
            border: "1px solid #ccc",
            padding: 10,
            marginBottom: 10,
            borderRadius: 5,
          }}
        >
          <b>{c.author?.name || 'Anonymous'}</b>
          <p>{c.body}</p>

          
          <button style={{ marginRight: 10 }}>👍 Like</button>
          <button>👎 Dislike</button>
        </div>
      ))}
    </div>
  );
}

