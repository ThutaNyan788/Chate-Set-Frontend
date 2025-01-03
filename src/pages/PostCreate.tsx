import CreateForm from '@/components/post/CreateForm'

type Props = {}

export const PostCreate = (props: Props) => {
    
  return (
      <div className='max-w-3xl mx-auto px-4 py-8'>
          <CreateForm />
      </div>
  )
}