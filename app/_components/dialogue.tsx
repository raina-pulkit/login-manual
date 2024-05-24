import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef } from 'react'

interface DialogBoxProps {
  title: string,
  onClose: () => void,
  children: React.ReactNode
}

const DialogBox = ({title, onClose, children}: DialogBoxProps) => {
	// const searchParams = useSearchParams();
  const dialogRef = useRef<null | HTMLDialogElement>(null);
  // const showDialog = searchParams.get("showDialog");

  useEffect(() => {dialogRef.current?.show()}, []);

  // useEffect(() => {
  //   if(showDialog === "y") {
  //     dialogRef.current?.show();
  //   }
  //   else dialogRef.current?.close();
  // }, [showDialog]);

  const closeDialog = () => {
    dialogRef.current?.close();
    onClose();
  }

  const dialog: JSX.Element | null = (
    <dialog ref={dialogRef} className='w-[400px] p-10 bg-red-400 rounded-md z-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
      <div className='flex flex-col gap-4'>
        <div className="flex justify-between items-center text-3xl font-extrabold text-red-600 drop-shadow-[0_0.2px_1px_rgba(0,0,0,1)]">
          <h1>{title}</h1>
          <Button onClick={closeDialog} className='!p-0 w-10 h-10'><X  size={36}/></Button>
        </div>
        <div className='flex flex-col gap-6'>
          {children}
          <div>
            <Button onClick={closeDialog} variant={'secondary'}>OK</Button>
          </div>
        </div>
      </div>
    </dialog>
  );

  return dialog;
}

export default DialogBox
