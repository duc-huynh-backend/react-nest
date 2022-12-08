import './loading.scss';

export default function Loading() {
  return (
    <>
      <div className='overlay'>
        <img src='/assets/images/loading.gif' alt='' id='loading-img' />
      </div>
    </>
  );
}
