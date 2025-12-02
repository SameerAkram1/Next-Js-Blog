const AddComment = ({ commentBody, setCommentBody, handleAddComment }) => {
  return (
    <div className="flex flex-col gap-4 mb-6 bg-white p-5 rounded-xl shadow-sm border">

      <textarea
        placeholder="Your Comment"
        value={commentBody}
        onChange={(e) => setCommentBody(e.target.value)}
        className="p-3 text-black min-h-[100px] border rounded-lg focus:outline-none focus:ring-2  bg-gray-100  focus:ring-blue-500"
      />

      <button
        onClick={handleAddComment}
        className="
          bg-blue-400 
          text-white 
          py-2 
          px-4 
          rounded-lg 
          hover:bg-blue-500 
          transition 
          duration-200
        "
      >
        Add Comment
      </button>
    </div>
  );
};

export default AddComment;
