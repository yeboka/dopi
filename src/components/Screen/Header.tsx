export const Header = ({ title }: { title: string }) => {
  return (
    <div
      className={
        'flex items-center justify-between px-4 py-1 text-white font-bold bg-linear-to-b from-[#8C8C8C80] from-5% via-[#C8C8C8] via-15% to-[#8C8C8C] to-100%'
      }
    >
      <h1>{title ?? 'dopi'}</h1>
    </div>
  )
}
