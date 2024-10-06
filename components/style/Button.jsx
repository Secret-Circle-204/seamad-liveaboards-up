const sizes = {
    md: 'px-4 py-2 rounded-md text-base',
    lg: 'px-5 py-3 rounded-lg text-lg',
  }
  
  const colors = {
    indigo: 'bg-indigo-500 hover:bg-indigo-600 text-white',
    cyan: 'bg-cyan-600 hover:bg-cyan-700 text-white',
  }

  const hoverEffects = {
    hover: 'before:ease relative h-12 w-40 overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180',
  }
  
  export default function Button({ color, size, hoverEffect, children }) {
    let colorClasses = colors[color]
    let sizeClasses = sizes[size]
    let hoverEffectClasses = hoverEffects[hoverEffect]
  
    return (
      <button type="button" className={`font-bold ${sizeClasses} ${colorClasses} ${hoverEffectClasses}`}>
        <span className="relative z-10">{children}</span>
      </button>
    )
  }

{/* <button className="before:ease relative h-12 w-40 overflow-hidden border border-black shadow-2xl before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gray-900 before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180">
<span className="relative z-10">Slide hover</span>
</button> */}