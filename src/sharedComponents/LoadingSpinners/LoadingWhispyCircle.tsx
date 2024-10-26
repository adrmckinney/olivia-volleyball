type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
}

const spinnerSize = {
  xs: 'w-5 h-5',
  sm: 'w-16 h-16',
  md: 'w-24 h-24',
  lg: 'w-40 h-40',
}

const LoadingWhispyCircle = ({ size = 'xs' }: Props) => {
  return (
    <>
      <div className='flex items-center justify-center '>
        <div
          className={[
            spinnerSize[size],
            'border-b-2 border-gray-900 rounded-full animate-spin',
          ].join(' ')}
        ></div>
      </div>
    </>
  )
}

export default LoadingWhispyCircle
