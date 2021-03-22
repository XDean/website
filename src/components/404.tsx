export const NotFoundView = () => {
  return (
    <div className={'absolute top-0 bottom-0 w-full flex flex-col items-center justify-center text-center'}>
      <div className={'flex items-center w-max'}>
        <div className={'text-2xl md:text-4xl border-r-4 pr-2 mr-2 border-gray-700'}>404</div>
        <div className={'text-xl md:text-3xl'}>
          页面找不到
        </div>
      </div>
    </div>
  )
}