import CurrencySelector from '@/components/Navigation/CurrencySelector'
import Navbar from '@/components/Navigation/Navbar'

export default function Header() {
  return (
    <div className='header'>
      <div className='title'>Spendings</div>
      <Navbar />
      <CurrencySelector />
    </div>
  )
}
