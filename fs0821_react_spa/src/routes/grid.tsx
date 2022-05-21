import Clock from '../components/clock'
export default function Grid() {
    return (
      <div className="container mx-auto py-4">
        <div className='flex flex-row justify-between'>
          <span>Grid</span>
          <Clock />
        </div>
      </div>
    );
  }