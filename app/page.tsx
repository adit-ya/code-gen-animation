'use client';

import { useState } from 'react';
import CodeTypewriter from '@/components/CodeTypewriter';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';

export default function Home() {
    const [code, setCode] = useState(`function multiply(num1, num2) {
  let result = num1 * num2;
  return result;
}
`);

    return (
        <main className='min-h-screen bg-gray-900 text-gray-100 py-12 px-4 font-mono'>
            <div className='max-w-4xl mx-auto space-y-8'>
                <div className='space-y-4'>
                    <h1 className='text-4xl font-bold text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent'>
                        Code Generation Animation Tool
                    </h1>
                    <p className='text-gray-400 text-center max-w-2xl mx-auto'>
                        Simple code generation animation. Useful for demos and
                        presentations. Paste code below, choose a language and
                        speed, and hit play. Use your device&apos;s screen
                        recorder to record animation.
                    </p>
                </div>

                <div className='space-y-6'>
                    <div className='space-y-2'>
                        <label
                            htmlFor='codeInput'
                            className='block text-sm font-medium text-gray-300'
                        >
                            Enter your code
                        </label>
                        <Textarea
                            id='codeInput'
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className='min-h-[200px] w-full bg-gray-800 text-gray-100 border-gray-700 font-mono resize-y'
                            placeholder='Paste your code here...'
                        />
                    </div>

                    <div className='rounded-lg overflow-hidden'>
                        <CodeTypewriter code={code} speed={50} />
                    </div>
                </div>

                <footer className='text-center text-gray-500 text-sm mt-8 flex gap-2 justify-center'>
                    <p>Built by</p>
                    <Image
                        src='/stickfigurehead.svg'
                        alt='aditya'
                        width={12}
                        height={12}
                    />
                </footer>
            </div>
        </main>
    );
}
