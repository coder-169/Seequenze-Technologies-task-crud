'use client'
import Card from '@/components/Card'
import DetailModal from '@/components/DetailModal'
import Modal from '@/components/Modal'
import DashboardLayout from '@/layout/DashboardLayout'
import { useGlobalHook } from '@/states/Context'
import Link from 'next/link'
import { useEffect, useState } from 'react'
export default function Home() {
  const { setOpen, cards, loadCards } = useGlobalHook()

  useEffect(() => {
    loadCards()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <DashboardLayout>
      <div className=" w-full py-8 px-12">
        <div className="grid grid-cols-12 gap-8">
          <div className="bg-white text-center col-span-6 sm:col-span-6 lg:col-span-4  px-5 py-2 rounded-lg">
            <button >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img onClick={() => setOpen(true)} src="/add.svg" alt="" className='mt-2 mx-auto' />
            </button>
            <button onClick={() => setOpen(true)} className='mx-auto block text-center'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/create.svg" alt="" className='mt-6 mx-auto' />
            </button>
            <Link href={'/'}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/try.svg" alt="" className='mt-4 mx-auto' />
            </Link>
          </div>
          {cards?.map(image => {
            return <Card key={image.id || image._id} id={image.id || image._id} author={image.author} url={image.download_url || image.url} />
          })}
        </div>
      </div>
      <Modal />
      <DetailModal />
    </DashboardLayout>
  )
}
