
import { Poppins } from 'next/font/google';
import Image from 'next/image';
import { cn } from '../../../lib/utils';

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800'], 
})

export const Logo = () => {
    return (
        <div className='flex flex-col items-center gap-y-4'>
            <div className='bg-white rounded-full p-1 mr-12 shrink-0'>
                <Image
                    src='/spooky.svg'
                    alt='Gamehub'
                    height={80}
                    width={80}
                />
            </div>
            <div className={cn(
                'hidden lg:block',
                font.className
            )} >
                <p className='text-xl font-semibold '>
                    Gamehub
                </p>
                <p className='text-sm text-muted-foreground'>
                    Let&apos;s play
                </p>
            </div>
        </div>
    )
}