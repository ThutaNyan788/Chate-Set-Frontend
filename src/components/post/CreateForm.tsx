import PostInput from "./PostInput";


interface PostFormData {
  attributes: {
    title: string;
    content: string;
    reading_time: number,
    schedule_date: string | null;
  },
  relationships: {
    tags: {
      data: [
        {
          id: number,
        }
      ]
    }
  }

}

const CreateForm = () => {
  return (
    <div className="border-[1.5px] border-gray-400 dark:border-gray-800 rounded-lg p-5">
      <form action="">

        {/* Title  */}
        <div className="mb-8">
          <label className="block font-semibold mb-3" htmlFor="title">Title</label>
          <PostInput
            type="text"
            id="title"
            placeholder="Enter post title"
          />
          <p className=" text-sm text-gray-600 dark:text-gray-300 dark:font-light">This is the main title of your post.</p>
        </div>
        <div>
          <label className="block font-semibold mb-3" htmlFor="reading_time">Reading Time (minutes)</label>
          <PostInput
            type="number"
            id="reading_time"
            min={1}
            defaultValue={1}
          />
          <p className=" text-sm text-gray-600 dark:text-gray-300 dark:font-light">Estimated time to read the post in minutes.</p>
        </div>
        
        
      </form>
    </div>
  )
}

export default CreateForm