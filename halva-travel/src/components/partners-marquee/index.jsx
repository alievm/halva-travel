import React from 'react'
import Marquee from 'react-fast-marquee'

const PartnerLogosMarquee = () => {
  const logos = [
    '/01.jpg',
    '/logo.svg',
    '/01.jpg',
    '/logo.svg',
    '/01.jpg',
    '/logo.svg',
    '/01.jpg',
    '/logo.svg',
    '/01.jpg',
    '/logo.svg',
    '/01.jpg',
    '/logo.svg',
  ]

  return (
    <div className="py-6 bg-white">
      <Marquee speed={60} gradient={false}>
        {logos.map((logo, index) => (
          <div key={index} className="mx-8 flex items-center">
            <img
              src={logo}
              alt={`partner-${index}`}
              className="h-16 w-auto object-contain"
            />
          </div>
        ))}
      </Marquee>
    </div>
  )
}

export default PartnerLogosMarquee
