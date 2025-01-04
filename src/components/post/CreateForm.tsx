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

        //
        
      </form>
    </div>
  )
}

export default CreateForm