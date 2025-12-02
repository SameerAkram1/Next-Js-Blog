import EditPost from "./EditPost";

export default async function Page({ params }) {
  const { postId } = await params;
  return <EditPost postId={postId} />;
}
