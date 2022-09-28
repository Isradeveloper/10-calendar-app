
export const Spinner = () => {
  return (
    <div style={{ width: '100 vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className='lds-ring'><div /><div /><div /><div /></div>
    </div>
  )
}
